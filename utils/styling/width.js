import cm from "../calculateMeasure";

export const getWidthStyles = ({ width, minWidth, maxWidth }) => {
  let stylesStringified = "";

  if (width) {
    stylesStringified += `width: ${cm(width)};`;
  }

  if (minWidth) {
    stylesStringified += `min-width: ${cm(minWidth)};`;
  }

  if (maxWidth) {
    stylesStringified += `max-width: ${cm(maxWidth)};`;
  }

  return stylesStringified;
};
