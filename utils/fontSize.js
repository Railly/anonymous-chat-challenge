import cm from "./calculateMeasure";

export const getFontSize = ({ text }) => {
  let styleStringified = "";

  const fontSizeObject = {
    xs: 3,
    sm: 3.5,
    base: 4,
    md: 5,
    lg: 6,
    xl: 7,
    "2xl": 8,
    "3xl": 9,
    "4xl": 10,
    "5xl": 11,
  };

  if (text) {
    styleStringified = `font-size: ${cm(fontSizeObject[text])};`;
  }

  return styleStringified;
};
