import { useLazyQuery } from "@apollo/client";
import React, { useCallback, useRef } from "react";
import FocusBlock from "../../components/FocusBlock/FocusBlock";
import TextInput from "../../components/inputs/TextInput/TextInput";
import PageLayout from "../../components/PageLayout/PageLayout";
import { iSignIn, SIGN_IN } from "../../graphql/queries/Auth";

import * as SC from "../../styles/pages/auth/signIn.style";

export default function SignIn() {
  const [signIn, { data }] = useLazyQuery<iSignIn>(SIGN_IN);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const email = refEmail.current?.value || "";
      const password = refPassword.current?.value || "";
      signIn({
        variables: {
          email,
          password,
        },
      });
    },
    [refEmail, refPassword]
  );

  return (
    <PageLayout>
      <FocusBlock center>
        <SC.Title>Sign-In</SC.Title>
        <SC.Form onSubmit={handleSubmit}>
          <TextInput ref={refEmail} label="Email" placeholder="your@email.com" type="email" />
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
