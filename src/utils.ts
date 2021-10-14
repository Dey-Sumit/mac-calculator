const operands = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const operators = ["+", "-", "*", "/"];

export const isOperand = (value: string) => operands.includes(value);
export const isOperator = (value: string) => operators.includes(value);
