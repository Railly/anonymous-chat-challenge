import cm from "../calculateMeasure";

export const getHeightStyles = ({ height, minHeight, maxHeight }) => {
  let stylesStringified = "";

  if (height) {
    stylesStringified += `height: ${cm(height)};`;
  }

  if (minHeight) {
    stylesStringified += `min-height: ${cm(minHeight)};`;
  }

  if (maxHeight) {
    stylesStringified += `max-height: ${cm(maxHeight)};`;
  }

  return stylesStringified;
};
