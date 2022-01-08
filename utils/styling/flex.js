export const getFlexStyles = ({ justify, items, display, flex, direction }) => {
  let styelsStringified = "";

  if (display) {
    styelsStringified += `display: ${display}; `;
  }
  if (justify) {
    styelsStringified += `justify-content: ${justify}; `;
  }
  if (items) {
    styelsStringified += `align-items: ${items}; `;
  }
  if (flex) {
    styelsStringified += `flex: ${flex}; `;
  }
  if (direction) {
    styelsStringified += `flex-direction: ${direction}; `;
  }
  return styelsStringified;
};
