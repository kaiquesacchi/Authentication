import React, { InputHTMLAttributes } from "react";
import * as SC from "./styles";

interface iProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, iProps> = ({ label, ...rest }, ref) => {
  return (
    <SC.Container>
      <SC.Label>{label}</SC.Label>
      <SC.Input {...rest} ref={ref} />
    </SC.Container>
  );
};

export default React.forwardRef(TextInput);
