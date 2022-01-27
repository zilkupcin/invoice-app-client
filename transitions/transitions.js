export const invoiceFormTransition = {
  from: { left: "-1000px" },
  enter: { left: "0" },
  leave: { left: "-1000px", right: "unset" },
  expires: 200,
  config: { duration: 200 },
};

export const overlayTransition = {
  from: { backgroundColor: "#00000000" },
  enter: { backgroundColor: "#00000099" },
  leave: { backgroundColor: "#00000000" },
  expires: 200,
  config: { duration: 200 },
};

export const dropdownTransition = {
  from: { transform: "translateY(20px)", opacity: 0.5 },
  enter: { transform: "translateY(0)", opacity: 1 },
  leave: { transform: "translateY(20px)", opacity: 0.5 },
  expires: 100,
  config: { duration: 100 },
};

export const filterDropdown = {
  from: { transform: "translate(-50%, 20px)", opacity: 0.5 },
  enter: { transform: "translateY(-50%, 0)", opacity: 1 },
  leave: { transform: "translateY(-50%, 20px)", opacity: 0.5 },
  expires: 100,
  config: { duration: 100 },
};
