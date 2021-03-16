import React from "react";
import * as SC from "./styles";

interface iProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

export default function TextInput({ label, ...rest }: iProps) {
  return (
    <SC.Container>
      <SC.Label>{label}</SC.Label>
      <SC.Input {...rest} />
    </SC.Container>
  );
}
