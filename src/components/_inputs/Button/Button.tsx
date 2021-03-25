import React, { ButtonHTMLAttributes } from "react";
import * as SC from "./styles";

interface iProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: "primary" | "secondary";
  children?: React.ReactNode;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, iProps> = ({ children, ...rest }, ref) => {
  return (
    <SC.Button {...rest} ref={ref}>
      {children}
    </SC.Button>
  );
};

export default React.forwardRef(Button);
