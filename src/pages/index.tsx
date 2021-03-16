import React, { useCallback } from "react";
import FocusBlock from "../components/FocusBlock/FocusBlock";
import TextInput from "../components/inputs/TextInput/TextInput";
import PageLayout from "../components/PageLayout/PageLayout";

import * as SC from "../styles/pages/Home.style";
export default function Home() {
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
  }, []);

  return (
    <PageLayout>
      <FocusBlock center>
        <SC.Title>Sign-In</SC.Title>
        <SC.Form onSubmit={handleSubmit}>
          <TextInput label="Username" placeholder="your@email.com" type="email" />
          <TextInput label="Password" placeholder="Password" type="password" />
          <SC.Divider />
          <SC.Button color="primary">Login</SC.Button>
          <SC.Button color="secondary">Create an Account</SC.Button>
        </SC.Form>
      </FocusBlock>
    </PageLayout>
  );
}
