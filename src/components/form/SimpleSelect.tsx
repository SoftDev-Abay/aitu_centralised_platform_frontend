// import React from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowDown } from "lucide-react";

// export type Option = {
//   value: string;
//   label: string;
// };

// interface SimpleSelectProps {
//   options: Option[];
//   placeholder?: string;
//   disabled?: boolean;
//   value: string;
//   onChange: (value: string) => void;
//   icon?: React.ReactElement;
//   backgroundColor?: string;
//   border?: string;
//   innerHeight?: string;
//   width?: string;
// }

// const SimpleSelect: React.FC<SimpleSelectProps> = ({
//   options,
//   placeholder = "Выберите...",
//   disabled = false,
//   value,
//   onChange,
//   icon,
//   backgroundColor = "bg-white",
//   border = "border border-[#26333D]",
//   innerHeight = "h-10",
//   width = "w-full",
// }) => {
//   return (
//     <div className={`relative ${width}`}>
//       {icon && (
//         <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
//           {icon}
//         </div>
//       )}
//       <Select value={value} onValueChange={onChange} disabled={disabled}>
//         <SelectTrigger
//           className={`${backgroundColor} ${border} ${innerHeight} pl-${
//             icon ? "10" : "3"
//           } pr-10 rounded-md text-sm`}
//         >
//           <SelectValue placeholder={placeholder} />
//           <span className="absolute right-2 top-1/2 -translate-y-1/2">
//             <ArrowDown width={20} height={20} />
//           </span>
//         </SelectTrigger>
//         <SelectContent>
//           {options.map((option) => (
//             <SelectItem key={option.value} value={option.value}>
//               {option.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default SimpleSelect;

import React from "react";
import Select, {
  CSSObjectWithLabel,
  GroupBase,
  StylesConfig,
} from "react-select";
import { ArrowDownIcon } from "lucide-react";

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

  const DropdownIndicator = () => (
    <div style={{ padding: "8px", display: "flex", alignItems: "center" }}>
      <ArrowDownIcon width={20} height={20} />
    </div>
  );

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
