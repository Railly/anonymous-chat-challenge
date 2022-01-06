export const getSpacing = ({ mb, mt, ml, mr, mx, my }) => {
  let stylesStringified = "";
  if (mx || my) {
    if (mx) {
      stylesStringified += `margin-left: ${mx / 4}rem; margin-right: ${
        mx / 4
      }rem; `;
    }
    if (my) {
      stylesStringified += `margin-top: ${my / 4}rem; margin-bottom: ${
        my / 4
      }rem; `;
    }
    return stylesStringified;
  }

  if (mr) {
    stylesStringified += `margin-right: ${mr / 4}rem; `;
  }
  if (ml) {
    stylesStringified += `margin-left: ${ml / 4}rem; `;
  }
  if (mt) {
    stylesStringified += `margin-top: ${mt / 4}rem; `;
  }
  if (mb) {
    stylesStringified += `margin-bottom: ${mb / 4}rem; `;
  }

  return stylesStringified;
};
