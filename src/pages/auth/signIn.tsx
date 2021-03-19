import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef } from "react";
import FocusBlock from "../../components/FocusBlock/FocusBlock";
import TextInput from "../../components/inputs/TextInput/TextInput";
import PageLayout from "../../components/PageLayout/PageLayout";
import { iSignIn, MUTATION_SIGN_IN } from "../../graphql/queries/Auth";

import * as SC from "../../styles/pages/auth/signIn.style";

export default function SignIn() {
  const router = useRouter();
  const [signIn, { data, error }] = useMutation<iSignIn>(MUTATION_SIGN_IN);
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

  useEffect(() => {
    if (!router) return;
    if (data) {
      // Succeeded.
      router.push("/");
      return;
    }
    if (error) {
      // Failed.
      // TODO: Add toast to display error.
      alert(error.message);
    }
  }, [data, error, router]);

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
