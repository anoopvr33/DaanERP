// import { useNavigate } from "react-router-dom";

export const Hotels = () => {
  return JSON.parse(localStorage.getItem("hotel"));
};

export const IsSuper = () => {
  return JSON.parse(localStorage.getItem("isSuper"));
};

export const IsStaff = () => {
  return JSON.parse(localStorage.getItem("isStaff"));
};

export const formatHotel = () => {
  const hotels = Hotels();
  if (hotels?.length === 0 || !hotels) {
    window.location.href = "/login";
  }

  if (hotels && hotels.length > 0) {
    const formatted = hotels.map((i) => ({
      value: i,
      label: i.charAt(0).toUpperCase() + i.slice(1),
    }));

    return formatted;
  }
};
