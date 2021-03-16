import React, { useCallback, useRef } from "react";
import FocusBlock from "../components/FocusBlock/FocusBlock";
import TextInput from "../components/inputs/TextInput/TextInput";
import PageLayout from "../components/PageLayout/PageLayout";

import * as SC from "../styles/pages/Home.style";
export default function Home() {
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log(refUsername.current?.value);
      console.log(refPassword.current?.value);
    },
    [refUsername, refPassword]
  );

  return (
    <PageLayout>
      <FocusBlock center>
        <SC.Title>Sign-In</SC.Title>
        <SC.Form onSubmit={handleSubmit}>
          <TextInput ref={refUsername} label="Username" placeholder="your@email.com" type="email" />
          <TextInput ref={refPassword} label="Password" placeholder="Password" type="password" />
          <SC.Divider />
          <SC.Button color="primary" type="submit">
            Login
          </SC.Button>
          <SC.Button color="secondary">Create an Account</SC.Button>
        </SC.Form>
      </FocusBlock>
    </PageLayout>
  );
}
