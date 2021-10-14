import { FC, MouseEventHandler } from "react";
import { isOperand } from "src/utils";

const getStyles = (value: string, currentOperator: string) => {
  let styles = "col-span-3 p-5 border border-gray-600 grid place-items-center";
  if (currentOperator === value) styles = `${styles} border-green-500`;

  if (value === "0") styles = `${styles} col-span-6`;

  if (isOperand(value) || value == ".") {
    styles = `${styles} bg-gray-800`;
  } else {
    if (["%", "+/-", "AC"].includes(value)) styles = `${styles} bg-gray-700`;
    else styles = `${styles} bg-yellow-500`;
  }
  return styles;
};

interface Props {
  value: string;
  clickHandler: any;
  currentOperator: string;
}

const Pad: FC<Props> = ({ value, clickHandler, currentOperator }) => {
  return (
    <button className={getStyles(value, currentOperator)} onClick={() => clickHandler(value)}>
      {value}
    </button>
  );
};

export default Pad;
