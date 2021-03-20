import React, { ButtonHTMLAttributes } from "react";
import * as SC from "./styles";

interface iProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accent: "primary" | "secondary";
  children?: React.ReactNode;
}

export default function Button({ children, ...rest }: iProps) {
  return <SC.Button {...rest}>{children}</SC.Button>;
}
