import React from "react";
import * as SC from "./styles";

interface iProps {
  title?: string;
  center?: boolean;
  children?: React.ReactNode;
}

export default function FocusBlock({ title, children, ...rest }: iProps) {
  return (
    <SC.Container {...rest}>
      {title && <SC.Title>{title}</SC.Title>}
      {children}
    </SC.Container>
  );
}
