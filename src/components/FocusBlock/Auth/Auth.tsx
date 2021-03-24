import React from "react";
import * as SC from "./styles";
import Image from "next/image";
interface iProps {
  title?: string;
  center?: boolean;
  children?: React.ReactNode;
}

export default function Auth({ title, children, ...rest }: iProps) {
  return (
    <SC.Container>
      <SC.SideContent>
        {title && <SC.Title>{title}</SC.Title>}
        <Image src="/images/signIn.svg" alt="Sign In" width="300" height="300" />
      </SC.SideContent>
      <SC.MainContent {...rest}>{children}</SC.MainContent>
    </SC.Container>
  );
}
