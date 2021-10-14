import { useState } from "react";
import { isOperand, isOperator } from "src/utils";
import Pad from "./Pad";

// const pads = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

const pads = [
  {
    value: "AC",
    tabIndex: 0,
  },
  {
    value: "+/-",
    tabIndex: 0,
  },
  {
    value: "%",
    tabIndex: 0,
  },
  {
    value: "/",
    tabIndex: 0,
  },
  {
    value: "7",
    tabIndex: 3,
  },
  {
    value: "8",
    tabIndex: 2,
  },
  {
    value: "9",
    tabIndex: 1,
  },
  {
    value: "*",
    tabIndex: 0,
  },
  {
    value: "4",
    tabIndex: 6,
  },
  {
    value: "5",
    tabIndex: 5,
  },
  {
    value: "6",
    tabIndex: 4,
  },

  {
    value: "-",
    tabIndex: 0,
  },
  {
    value: "1",
    tabIndex: 9,
  },
  {
    value: "2",
    tabIndex: 8,
  },
  {
    value: "3",
    tabIndex: 7,
  },
  {
    value: "+",
    tabIndex: 0,
  },
  {
    value: "0",
    tabIndex: 0,
  },
  {
    value: ".",
    tabIndex: 0,
  },
  {
    value: "=",
    tabIndex: 0,
  },
];

const Calculator = () => {
  const [rawContent, setRawContent] = useState(""); // holds operands and operator
  const [displayContent, setDisplayContent] = useState("0"); // holds operands

  const [currentOperator, setCurrentOperator] = useState("");

  // keeps track if the result is already calculated or not; will be used if the "=" is pressed multiple times in sequence
  const [alreadyEvaluated, setAlreadyEvaluated] = useState(false);

  const calculate = () => {
    const temp = eval(rawContent); //! does not handle the %
    setDisplayContent(temp);
  };

  const handleClick = (value: string) => {
    value = value === "+/-" ? "+" : value;

    if (isOperand(value)) {
      // if the result is already evaluated & the user wants to new operand, then just overwrite the states
      if (alreadyEvaluated) {
        setRawContent(value);
        setDisplayContent(value);
        setAlreadyEvaluated(false);
        return;
      }

      //! handle 2 digits : check if the last digit is operand or not ;
      const lastChar = rawContent?.slice(-1);

      if (isOperand(lastChar)) setDisplayContent(`${displayContent}${value}`);
      else setDisplayContent(value);

      setRawContent((raw) => `${raw}${value}`);
      setAlreadyEvaluated(false);
      return;
    }

    if (isOperator(value)) {
      // check if the last char is already a operator ,if true , then remove that operator and add the new one
      // eg. 5+3++3 => 5+3+3
      const lastChar = rawContent?.slice(-1);
      if (isOperator(lastChar)) {
        const sub = rawContent.slice(0, -1); // get the substring without the last char
        setRawContent(sub);
      }

      setRawContent((raw) => `${raw}${value}`); // concatenation instead of overwrite
      setCurrentOperator(value);
      setAlreadyEvaluated(false);
    }

    if (value === "AC") {
      reset();
      return;
    }

    if (value === "=") {
      // check if the user is pressing "=" multiple times, in that case grab the last operand and operator and eval()  ; eg. 5+3=8=11=14
      if (alreadyEvaluated) {
        const lastOperand = rawContent.split(/[+-/*]+/).slice(-1);
        setRawContent((raw) => `${raw}${currentOperator}${lastOperand}`);
      }

      calculate();
      setAlreadyEvaluated(true);
      return;
    }
  };

  //resets the component
  const reset = () => {
    setDisplayContent("0");
    setRawContent("");
    setCurrentOperator("");
    setAlreadyEvaluated(false);
  };

  return (
    <div className="calculator-wrapper">
      <div className="display">{displayContent}</div>
      <div className="grid grid-cols-12">
        {pads.map(({ value, ...rest }) => (
          <Pad value={value} key={value} {...rest} clickHandler={handleClick} currentOperator={currentOperator} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
