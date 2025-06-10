import React from "react";
import { ChangeHandler } from "react-hook-form";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";

// Tailwind-based error text renderer
const InputErrorText = ({ error }: { error: string }) => (
  <p className="text-sm text-red-500 mt-1">{error}</p>
);

const CustomMultiValueRemove = (props: any) => {
  const { innerProps, innerRef } = props;
  return (
    <div {...innerProps} ref={innerRef}>
      <span
        onClick={props.onClick}
        className="hover:bg-gray-200 rounded-full p-1 cursor-pointer"
      >
        <X size={16} />
      </span>
    </div>
  );
};

type Props = {
  register: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: React.Ref<any>;
    name: string;
  };
  options: any[] | undefined;
  control: any;
  placeholder?: string;
  name?: string;
  icon?: React.ReactElement;
  notSearchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  noOptionMessage?: string;
  error?: string;
  isLoading?: boolean;
  additonalChangeHandler?: Function;
};

const SelectAdvaced: React.FC<Props> = ({
  register,
  options,
  control,
  placeholder,
  name,
  icon,
  notSearchable,
  multiple,
  noOptionMessage,
  disabled = false,
  isLoading,
  error,
  additonalChangeHandler,
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#e5e5e5" : "#e5e5e5",
      boxShadow: "none",
      //   minHeight: "2.75rem",
      //   paddingLeft: icon ? "2.5rem" : "0.75rem",
      fontSize: "0.875rem",
      borderRadius: "6px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#6b7280",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: "0 0.5rem",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: "0 0.5rem",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 10,
    }),
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Controller
          name={name || register?.name} // TODO: here using both register and controller is kinda should not be so just make name required
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <Select
              ref={ref}
              isLoading={isLoading}
              styles={customStyles}
              value={
                multiple
                  ? options?.filter((option) => value?.includes(option.value))
                  : options?.find((opt) => opt.value === value)
              }
              isClearable
              isSearchable={!notSearchable}
              defaultValue={
                multiple
                  ? undefined
                  : options?.find((opt) => opt.value === value)
              }
              isDisabled={disabled}
              onChange={
                multiple
                  ? (opts) => {
                      const val = opts?.map((o: any) => o.value);
                      onChange(val);
                      additonalChangeHandler?.(val);
                    }
                  : (opt) => {
                      onChange(opt?.value);
                      additonalChangeHandler?.(opt?.value);
                    }
              }
              options={options}
              isMulti={!!multiple}
              placeholder={placeholder || "Выберите..."}
              noOptionsMessage={() =>
                noOptionMessage || "Совпадений не найдено"
              }
              components={{
                DropdownIndicator: () => (
                  <div className="pr-2">
                    <ChevronDown size={16} />
                  </div>
                ),
                // MultiValueRemove: CustomMultiValueRemove,
              }}
            />
          )}
        />

        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>

      {error && <InputErrorText error={error} />}
    </div>
  );
};

export default SelectAdvaced;
