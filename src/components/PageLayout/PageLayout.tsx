import React from "react";
import * as SC from "./styles";

interface iProps {
  children?: React.ReactNode;
}
export default function PageLayout({ children }: iProps) {
  return <SC.Container>{children}</SC.Container>;
}
