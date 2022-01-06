export const getMargin = ({ mb, mt, ml, mr, mx, my }) => {
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
  }

  if (mr) {
    stylesStringified += `margin-right: ${mr / 4}rem; `;
  }
  if (ml) {
    console.log(ml, "margin-left");
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

export const getPadding = ({ pb, pt, pl, pr, px, py }) => {
  let stylesStringified = "";
  if (px || py) {
    if (px) {
      stylesStringified += `padding-left: ${px / 4}rem; padding-right: ${
        px / 4
      }rem; `;
    }
    if (py) {
      stylesStringified += `padding-top: ${py / 4}rem; padding-bottom: ${
        py / 4
      }rem; `;
    }
  }

  if (pr) {
    stylesStringified += `padding-right: ${pr / 4}rem; `;
  }
  if (pl) {
    stylesStringified += `padding-left: ${pl / 4}rem; `;
  }
  if (pt) {
    stylesStringified += `padding-top: ${pt / 4}rem; `;
  }
  if (pb) {
    stylesStringified += `padding-bottom: ${pb / 4}rem; `;
  }

  return stylesStringified;
};
