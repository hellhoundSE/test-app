export const getErrors = (expression) => {
  const allErrors = [];

  const getBracketsError = () => {
    const bracketsAmount = expression
      .replace(/\s/g, "")
      .split("")
      .reduce(
        (dictionary, character) => {
          if (dictionary.has(character))
            dictionary.set(character, dictionary.get(character) + 1);

          return dictionary;
        },
        new Map([
          ["(", 0],
          [")", 0],
        ])
      );
    const openBracketsAmount = bracketsAmount.get("(");
    const closeBracketsAmount = bracketsAmount.get(")");

    if (openBracketsAmount !== closeBracketsAmount)
      allErrors.push(
        `Missing ${
          openBracketsAmount > closeBracketsAmount ? ")" : "("
        } bracket`
      );
  };

  const getFloatingNumbersError = () => {
    const floatFound = expression.match("[a-zA-Z]");
    if (floatFound) allErrors.push("Letters are not allowed ");
  };
  getBracketsError();
  getFloatingNumbersError();

  return allErrors;
};
