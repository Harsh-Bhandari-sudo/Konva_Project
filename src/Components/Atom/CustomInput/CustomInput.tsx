// constants
import CLASSNAME from "../../../Shared/className";
import TEXT from "../../../Shared/text";
import { ShapeType } from "../../../Views/React_Konva/ShapeComponent/helper/types";

interface CustomInputProps {
  label: string;
  type: string;
  value: number | ShapeType;
  displayValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  step?: string;
}

export default function CustomInput({
  label,
  value,
  displayValue,
  type,
  min = undefined,
  max = undefined,
  step = undefined,
  onChange,
}: CustomInputProps) {
  return (
    <div className={CLASSNAME.LAYOUT.PROPERTY_GROUP}>
      <label>{label}</label>
      <div className={CLASSNAME.LAYOUT.TEXT_PROPERTY}>
        <input
          title={TEXT.TITLE.INPUT}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
        <span>{displayValue}</span>
      </div>
    </div>
  );
}
CustomInput.defaultProps = {
  min: undefined,
  max: undefined,
  step: undefined,
};
