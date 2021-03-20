import Link from "next/link";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useRef } from "react";
import FocusBlock from "../../components/FocusBlock/FocusBlock";
import TextInput from "../../components/inputs/TextInput/TextInput";
import PageLayout from "../../components/PageLayout/PageLayout";
import { iSignUp, MUTATION_SIGN_UP } from "../../graphql/queries/Auth";

import * as SC from "../../styles/pages/auth/signUp.style";
import Form from "../../components/Form/Form";
import Button from "../../components/inputs/Button/Button";

export default function SignUp() {
  const router = useRouter();
  const [signUp, { data, error }] = useMutation<iSignUp>(MUTATION_SIGN_UP);

  const refName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const name = refName.current?.value || "";
      const email = refEmail.current?.value || "";
      const password = refPassword.current?.value || "";
      signUp({
        variables: {
          name,
          email,
          password,
        },
      });
    },
    [refName, refEmail, refPassword, signUp]
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
        <SC.Title>Sign-Up</SC.Title>
        <Form onSubmit={handleSubmit}>
          <TextInput ref={refName} label="Name" placeholder="Your Full Name" type="text" />
          <TextInput ref={refEmail} label="Email" placeholder="your@email.com" type="email" />
          <TextInput ref={refPassword} label="Password" placeholder="Password" type="password" />
          <SC.Divider />
          <Button accent="primary" type="submit">
            Create Account
          </Button>
          <Link href="/auth/signIn">
            <Button accent="secondary">Login to an Existing Account</Button>
          </Link>
        </Form>
      </FocusBlock>
    </PageLayout>
  );
}
