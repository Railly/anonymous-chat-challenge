const calculateMeasure = (value) => {
  if (typeof value === "number") {
    return `${value / 4}rem`;
  }
  if (value.includes("vh")) {
    return `${value.replace("vh", "")}vh`;
  }
  if (value.includes("vw")) {
    return `${value.replace("vw", "")}vw`;
  }
  if (value.includes("px")) {
    return `${value.replace("px", "")}px`;
  }
  if (value.includes("%")) {
    return `${value.replace("%", "")}%`;
  }
};

export default calculateMeasure;
