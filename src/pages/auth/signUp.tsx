// React/NextJS
import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

// NPM Packages
import { toast } from "react-toastify";

// Apollo/Queries
import { useMutation } from "@apollo/client";
import { iSignUp, MUTATION_SIGN_UP } from "../../graphql/queries/Auth";

// Components
import FocusBlock from "../../components/FocusBlock/FocusBlock";
import TextInput from "../../components/inputs/TextInput/TextInput";
import PageLayout from "../../components/PageLayout/PageLayout";
import Form from "../../components/Form/Form";
import Button from "../../components/inputs/Button/Button";
import Divider from "../../components/Divider/Divider";

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
      toast.dark("Sign-Up succeeded");
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
      <FocusBlock center title="Sign-Up">
        <Form onSubmit={handleSubmit}>
          <TextInput ref={refName} label="Name" placeholder="Your Full Name" type="text" />
          <TextInput ref={refEmail} label="Email" placeholder="your@email.com" type="email" />
          <TextInput ref={refPassword} label="Password" placeholder="Password" type="password" />
          <Divider />
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
