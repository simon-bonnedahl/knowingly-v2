export function hexToHSL(H: string): string {
  let r: number = 0,
    g: number = 0,
    b: number = 0;
  if (H.length === 4) {
    r = parseInt(H[1] + H[1], 16);
    g = parseInt(H[2] + H[2], 16);
    b = parseInt(H[3] + H[3], 16);
  } else if (H.length === 7) {
    r = parseInt(H[1] + H[2], 16);
    g = parseInt(H[3] + H[4], 16);
    b = parseInt(H[5] + H[6], 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  let cmin: number = Math.min(r, g, b),
    cmax: number = Math.max(r, g, b),
    delta: number = cmax - cmin,
    h: number = 0,
    s: number = 0,
    l: number = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
}

export const adjustLightness = (hsl: string, amount: number) => {
  const [hue, saturation, lightness] = hsl.split(" ");
  let newLightness = parseInt(lightness!) + amount;
  newLightness = Math.max(0, Math.min(100, newLightness)); // Clamp lightness value between 0 and 100
  const adjustedColor = `${hue} ${saturation} ${newLightness}%`;
  return { adjustedColor, lightness: newLightness };
};
export const generateShades = (hsl: string, steps: number) => {
  const [hue, saturation, lightness] = hsl.split(" ");
  const shades = [];

  for (let i = 1; i <= steps; i++) {
    const newLightness = Math.min(20 + i * 11, 75); // Increase lightness by 10% for each step
    shades.push(`${hue} ${saturation} ${newLightness}%`);
  }
  return shades;
};
