import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  error: string;
}

const InputErrorText = ({ error, ...rest }: Props) => {
  return (
    <div className={"text-destructive text-sm"} {...rest}>
      {error}
    </div>
  );
};

export default InputErrorText;
