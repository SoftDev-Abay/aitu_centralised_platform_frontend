import React from "react";
import Select, { CSSObjectWithLabel, StylesConfig } from "react-select";

export type Option = {
  value: any;
  label: string;
};

interface SimpleSelectProps {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  value: Option | null;
  onChange: (option: Option | null) => void;
  icon?: React.ReactElement;
  backgroundColor?: string;
  border?: string;
  innerHeight?: string;
  width?: string;
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({
  options,
  placeholder = "Select...",
  disabled = false,
  value,
  onChange,
  icon,
  backgroundColor = "white",
  border = "1px solid #26333D",
  innerHeight,
  width,
}) => {
  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state): CSSObjectWithLabel => ({
      ...provided,
      borderRadius: "10px",
      border: border,
      backgroundColor: backgroundColor,
      boxShadow: state.isFocused ? "0 0 0 1px #26333D" : "none",
      paddingLeft: icon ? "38px" : provided.paddingLeft,
      cursor: disabled ? "not-allowed" : "default",
      // Force the control to stretch to 100% of the parent container's height
      height: innerHeight,
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      width: width ? width : "auto",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: icon ? "38px" : provided.paddingLeft,
      // Ensure the inner container stretches as well
      height: "100%",
    }),
    input: (provided) => ({
      ...provided,
      // Make the input take the full height of the container
      height: "100%",
      margin: 0,
      padding: 0,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingRight: "10px",
    }),
  };

  return (
    <div
      style={{ position: "relative", height: "100%", width: width && width }}
    >
      {icon && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "12px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          {icon}
        </div>
      )}
      <Select
        styles={customStyles}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SimpleSelect;
