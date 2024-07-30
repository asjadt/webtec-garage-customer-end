function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function adjustBrightness(hex, factor) {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.min(255, Math.max(0, r * factor));
  const newG = Math.min(255, Math.max(0, g * factor));
  const newB = Math.min(255, Math.max(0, b * factor));
  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));
}

export function colorShades(hexColor) {
  const exactColor = hexColor; // exact color

  const lighterColor10 = adjustBrightness(hexColor, 1.1); // Increase brightness by 10%
  const lighterColor20 = adjustBrightness(hexColor, 1.2); // Increase brightness by 20%
  const lighterColor30 = adjustBrightness(hexColor, 1.3); // Increase brightness by 30%
  const lighterColor40 = adjustBrightness(hexColor, 1.4); // Increase brightness by 40%
  const lighterColor50 = adjustBrightness(hexColor, 1.5); // Increase brightness by 50%
  const lighterColor60 = adjustBrightness(hexColor, 1.6); // Increase brightness by 60%
  const lighterColor70 = adjustBrightness(hexColor, 1.7); // Increase brightness by 70%
  const lighterColor80 = adjustBrightness(hexColor, 1.8); // Increase brightness by 80%
  const lighterColor90 = adjustBrightness(hexColor, 1.9); // Increase brightness by 90%

  const darkerColor10 = adjustBrightness(hexColor, 0.9); // Decrease brightness by 10%
  const darkerColor20 = adjustBrightness(hexColor, 0.8); // Decrease brightness by 20%
  const darkerColor30 = adjustBrightness(hexColor, 0.7); // Decrease brightness by 30%
  const darkerColor40 = adjustBrightness(hexColor, 0.6); // Decrease brightness by 40%
  const darkerColor50 = adjustBrightness(hexColor, 0.5); // Decrease brightness by 50%
  const darkerColor60 = adjustBrightness(hexColor, 0.4); // Decrease brightness by 60%
  const darkerColor70 = adjustBrightness(hexColor, 0.3); // Decrease brightness by 70%
  const darkerColor80 = adjustBrightness(hexColor, 0.2); // Decrease brightness by 80%
  const darkerColor90 = adjustBrightness(hexColor, 0.1); // Decrease brightness by 90%

  return {
    color: exactColor,
    lighterColor10: lighterColor10,
    lighterColor20: lighterColor20,
    lighterColor30: lighterColor30,
    lighterColor40: lighterColor40,
    lighterColor50: lighterColor50,
    lighterColor60: lighterColor60,
    lighterColor70: lighterColor70,
    lighterColor80: lighterColor80,
    lighterColor90: lighterColor90,

    darkerColor10: darkerColor10,
    darkerColor20: darkerColor20,
    darkerColor30: darkerColor30,
    darkerColor40: darkerColor40,
    darkerColor50: darkerColor50,
    darkerColor60: darkerColor60,
    darkerColor70: darkerColor70,
    darkerColor90: darkerColor90,
    darkerColor80: darkerColor80,
  };
}
