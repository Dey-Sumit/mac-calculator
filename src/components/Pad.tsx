import { FC } from "react";
import { isOperand } from "src/utils";

const getStyles = (value: string, currentOperator: string) => {
  let styles = "col-span-3 p-5 border border-gray-600 grid place-items-center"; // base style
  if (currentOperator === value) styles = `${styles} border-green-500`; // active element

  if (value === "0") styles = `${styles} col-span-6`;

  if (isOperand(value) || value == ".") {
    styles = `${styles} bg-gray-800`;
  } else {
    // top row
    if (["%", "+/-", "AC"].includes(value)) styles = `${styles} bg-gray-700`;
    else styles = `${styles} bg-yellow-500`; // right col
  }
  return styles;
};

interface Props {
  value: string;
  clickHandler: (value: string) => void;
  currentOperator: string;
}

const Pad: FC<Props> = ({ value, clickHandler, currentOperator, ...props }) => {
  return (
    <button className={getStyles(value, currentOperator)} onClick={() => clickHandler(value)} {...props}>
      {value}
    </button>
  );
};

export default Pad;
