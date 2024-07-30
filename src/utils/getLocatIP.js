export function getLocalIP(callback) {
  const RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  const pc = new RTCPeerConnection({
    iceServers: [],
  });
  const noop = function () {};
  const localIPs = {};
  const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/g;
  let key;

  function ipIterate(ip) {
    if (!localIPs[ip]) callback(ip);
    localIPs[ip] = true;
  }

  // Create a bogus data channel
  pc.createDataChannel("");

  // Create an offer
  pc.createOffer()
    .then(function (sdp) {
      sdp.sdp.split("\n").forEach(function (line) {
        if (line.indexOf("candidate") < 0) return;
        line.match(ipRegex).forEach(ipIterate);
      });

      pc.setLocalDescription(sdp, noop, noop);
    })
    .catch(function (reason) {
      console.error("Error creating offer:", reason);
    });

  // Listen for candidate events
  pc.onicecandidate = function (ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate) return;
    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
  };
}
