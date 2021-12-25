export const OPERATORS_PRIORITY = { "+": 1, "-": 1, "*": 2, "/": 2 };
export const OPERATORS_METHODS = {
  "+": (a, b) => Number(a) + Number(b),
  "-": (a, b) => Number(a) - Number(b),
  "*": (a, b) => Number(a) * Number(b),
  "/": (a, b) => Number(a) / Number(b),
};
