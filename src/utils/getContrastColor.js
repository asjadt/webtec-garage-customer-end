export function getContrastColor(hex) {
  const rgb = hex.replace(
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    function (m, r, g, b) {
      return parseInt(r, 16) + "," + parseInt(g, 16) + "," + parseInt(b, 16);
    }
  );

  const [r, g, b] = rgb.split(",");

  // Calculate relative luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Determine contrasting color
  return luminance > 100 ? "#000000" : "#FFFFFF";
}
