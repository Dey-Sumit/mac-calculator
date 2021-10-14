import { useState } from "react";
import { isOperand, isOperator } from "src/utils";
import Pad from "./Pad";

const pads = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

const Calculator2 = () => {
  const [rawContent, setRawContent] = useState(""); // holds operands and operator
  const [displayContent, setDisplayContent] = useState("0"); // holds operands

  const [currentOperator, setCurrentOperator] = useState("");

  const calculate = () => {
    const temp = eval(rawContent);
    setDisplayContent(temp);
    setRawContent(temp);
  };

  const handleClick = (value: string) => {
    if (isOperand(value)) {
      // handle 2 digits : check if the last digit is operand or not ;
      const lastChar = rawContent?.slice(-1);

      if (isOperand(lastChar)) setDisplayContent(`${displayContent}${value}`);
      else setDisplayContent(value);

      setRawContent((raw) => `${raw}${value}`);
      return;
    }

    if (isOperator(value)) {
      setRawContent((raw) => `${raw}${value}`); // concatenation
      setCurrentOperator(value);
    }

    if (value === "AC") {
      reset();
      return;
    }

    if (value === "=") {
      calculate();
      setCurrentOperator("=");
      return;
    }
  };

  const reset = () => {
    setDisplayContent("0");
    setRawContent("");
    setCurrentOperator("");
  };

  return (
    <div className="calculator-wrapper">
      <div className="display">{displayContent}</div>
      <div className="grid grid-cols-12">
        {pads.map((pad, i) => (
          <Pad value={pad} key={i} clickHandler={handleClick} currentOperator={currentOperator} />
        ))}
      </div>
    </div>
  );
};

export default Calculator2;
