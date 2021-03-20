import React, { InputHTMLAttributes } from "react";
import * as SC from "./styles";

interface iProps extends InputHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

export default function Form({ children, ...rest }: iProps) {
  return <SC.Form {...rest}>{children}</SC.Form>;
}
