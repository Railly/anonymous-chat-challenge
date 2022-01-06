import cm from "./calculateMeasure";

export const getFontSize = ({ text }) => {
  let styleStringified = "";

  const fontSizeObject = {
    xs: 3,
    sm: 3.5,
    base: 4,
    lg: 5,
    xl: 6,
    "2xl": 7,
    "3xl": 8,
    "4xl": 9,
    "5xl": 10,
  };

  if (text) {
    styleStringified = `font-size: ${cm(fontSizeObject[text])};`;
  }

  return styleStringified;
};
