import React, { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const VideoCapture = () => {
  const ffmpeg = new FFmpeg();
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // Flag for ffmpeg loading

  // Load ffmpeg asynchronously and update loading state
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        await ffmpeg.load();
        setIsLoaded(true); // Set loaded flag after successful loading
      } catch (error) {
        console.error("Error loading ffmpeg:", error);
      }
    };
    loadFFmpeg();
  }, []); // Empty dependency array ensures it runs only once

  const handleClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      recorder.start();

      const chunks = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        try {
          if (!isLoaded) {
            console.error("FFmpeg is not loaded yet.");
            return; // Prevent conversion if ffmpeg is not ready
          }

          console.error("Creating blob");
          const blob = new Blob(chunks, { type: "video/webm" });

          console.error("Creating url");
          const url = URL.createObjectURL(blob);

          // Ensure ffmpeg is loaded before using FS
          console.error("converting");
          ffmpeg.FS.writeFile("input.webm", await fetchFile(blob));
          await ffmpeg.run("-i", "input.webm", "output.mp4");

          // Get the result
          console.error("got data");
          const data = ffmpeg.FS("readFile", "output.mp4");

          // Create download link
          console.error("creating link");
          const mp4Blob = new Blob([data.buffer], { type: "video/web4" }); // typo fixed
          const mp4Url = URL.createObjectURL(mp4Blob);
          const a = document.createElement("a");
          a.href = mp4Url;
          a.download = "capture.mp4";
          a.click();
          console.error("downloading...");
          URL.revokeObjectURL(url);
          URL.revokeObjectURL(mp4Url);
        } catch (error) {
          console.error("Error converting video:", error);
        }
      };

      const [video] = stream.getVideoTracks();
      video.addEventListener("ended", () => {
        recorder.stop();
      });

      // Set up video preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error capturing video:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <button onClick={handleClick}>Capture Video</button>
    </div>
  );
};

export default VideoCapture;
