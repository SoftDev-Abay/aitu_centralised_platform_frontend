import React from "react";

export type Option = { label: string; value: string };

type RadioGroupInputProps = {
  title?: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  title,
  name,
  options,
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div>
      {title && (
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
          {title}
        </p>
      )}
      {options.map((option) => (
        <div key={option.value} className="flex items-center mb-4">
          <input
            id={`${name}-${option.value}`}
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => !readOnly && onChange(e.target.value)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            disabled={readOnly}
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroupInput;
