import React from "react";

// constants
import CLASSNAME from "../../../Shared/className";
import TEXT from "../../../Shared/text";

// interface
type InputType = "text" | "password" | "email" | "number";

interface InputProps {
  type?: InputType;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

const CustomInput: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  type,
  defaultValue,
}) => {
  return (
    <div className={CLASSNAME.LAYOUT.INPUT_CONTAINER}>
      <input
        title={TEXT.TITLE.INPUT}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default CustomInput;
