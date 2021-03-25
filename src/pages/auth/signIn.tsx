// React/NextJS
import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

// NPM Packages
import { toast } from "react-toastify";

// Apollo/Queries
import { useMutation } from "@apollo/client";
import { iSignIn, MUTATION_SIGN_IN } from "../../graphql/queries/Auth";

// Components
import AuthFocusBlock from "../../components/_focusBlocks/Auth/Auth";
import TextInput from "../../components/_inputs/TextInput/TextInput";
import PageLayout from "../../components/PageLayout/PageLayout";
import Form from "../../components/Form/Form";
import Button from "../../components/_inputs/Button/Button";
import Divider from "../../components/Divider/Divider";

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
    [refEmail, refPassword, signIn]
  );

  useEffect(() => {
    if (!router) return;
    if (data) {
      // Succeeded.
      toast.dark("Sign-In succeeded");
      router.push("/");
      return;
    }
    if (error) {
      // Failed.
      toast.error(error.message);
    }
  }, [data, error, router]);

  return (
    <PageLayout>
      <AuthFocusBlock center title="Sign In">
        <Form onSubmit={handleSubmit}>
          <TextInput ref={refEmail} label="Email" placeholder="your@email.com" type="email" />
          <TextInput ref={refPassword} label="Password" placeholder="Password" type="password" />
          <Divider />
          <Button accent="primary" type="submit">
            Login
          </Button>
          <Link href="/auth/signUp">
            <Button accent="secondary">Create an Account</Button>
          </Link>
        </Form>
      </AuthFocusBlock>
    </PageLayout>
  );
}
