import { OPERATORS_METHODS, OPERATORS_PRIORITY } from "./dictionary";

export const normalizeExpression = (expression) =>
  expression
    .replace(/\s/g, "")
    .split("")
    .reduce((exp, token) => {
      if (!isNaN(token) || token === ".") exp.push(token);

      if (token === "(") exp.push(...["(", " "]);

      if (token === ")") exp.push(...[" ", ")"]);

      if (["+", "-", "/", "*"].indexOf(token) !== -1)
        exp.push(...[" ", token, " "]);

      return exp;
    }, [])
    .join("");

export const convertToRPN = (expression) => {
  const peek = (array) => array[array.length - 1];
  const stack = [];

  return expression
    .split(" ")
    .reduce((acc, token) => {
      if (!isNaN(token)) {
        acc.push(token);
      }

      if (token in OPERATORS_PRIORITY) {
        while (
          peek(stack) in OPERATORS_PRIORITY &&
          OPERATORS_PRIORITY[token] <= OPERATORS_PRIORITY[peek(stack)]
        )
          acc.push(stack.pop());
        stack.push(token);
      }

      if (token === "(") {
        stack.push(token);
      }

      if (token === ")") {
        while (peek(stack) !== "(") acc.push(stack.pop());
        stack.pop();
      }

      return acc;
    }, [])
    .concat(stack.reverse())
    .join(" ");
};

export const calculateResult = (normalizedExpression) => {
  const exp = normalizedExpression.split(" ");
  const stack = [];

  if (exp.length === 0 || exp.length === 1 || exp.length === 2) {
    return "error";
  }

  exp.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      const operationResult = OPERATORS_METHODS[token](a, b);

      if (isNaN(operationResult)) return;

      stack.push(operationResult);
    }
  });

  if (stack.length > 1 || stack.length === 0) {
    return "error";
  } else {
    return stack.pop();
  }
};
