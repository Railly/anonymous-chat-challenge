export const getFontWeight = ({ font }) => {
  let styleStringified = "";

  const fontWeightObject = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  if (font) {
    styleStringified = `font-weight: ${fontWeightObject[font]};`;
  }

  return styleStringified;
};
