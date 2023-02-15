interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

interface CMYKColor {
  cyan: number;
  magenta: number;
  yellow: number;
  black: number;
}

const color: RGBColor = {
  red: 255,
  green: 0,
  blue: 0,
};

console.log(color);

export default color;
