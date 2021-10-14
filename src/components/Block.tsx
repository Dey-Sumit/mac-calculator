import { FC, MouseEventHandler } from "react";

interface Props {
  value: number | string;
  onClickHandler: any;
  styles: any; // TODO
}

const Block: FC<Props> = ({ value, onClickHandler, styles }) => {
  return (
    <span className={styles} onClick={() => onClickHandler(value)}>
      {value}
    </span>
  );
};

export default Block;
