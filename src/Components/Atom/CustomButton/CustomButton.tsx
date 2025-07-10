import React from "react";

// constants
import CLASSNAME from "../../../Shared/className";

// interface
interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={CLASSNAME.LAYOUT.BUTTON}
    >
      {label}
    </button>
  );
};

export default CustomButton;
