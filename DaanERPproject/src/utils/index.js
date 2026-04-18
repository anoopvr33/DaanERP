export const Hotels = () => {
  return JSON.parse(localStorage.getItem("hotel"));
};

export const IsSuper = () => {
  return JSON.parse(localStorage.getItem("isSuper"));
};
