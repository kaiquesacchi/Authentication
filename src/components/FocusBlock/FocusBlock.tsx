import React from "react";
import * as SC from "./styles";

interface iProps {
  center?: boolean;
  children?: React.ReactNode;
}

export default function FocusBlock({ children, ...rest }: iProps) {
  return <SC.Container {...rest}>{children}</SC.Container>;
}
