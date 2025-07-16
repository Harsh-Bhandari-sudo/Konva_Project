import { ChangeEventHandler } from "react";

interface CustomSelectProps {
  label: string;
  value: number | string;
  displayOptions: { label: string; value: string }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}
export default function CustomSelect({
  label,
  value,
  displayOptions,
  onChange,
}: CustomSelectProps) {
  return (
    <div className="property-group">
      <label>{label}</label>
      <select
        className="font-weight-property"
        value={value}
        onChange={onChange}
      >
        {displayOptions.map((options) => (
          <option key={options.value} value={options.value}>
            {options.label}
          </option>
        ))}
      </select>
    </div>
  );
}
