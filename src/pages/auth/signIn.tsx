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
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { iSignInWithGoogle, MUTATION_SIGN_IN_WITH_GOOGLE } from "../../graphql/queries/GoogleAuth";

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                    Google OAuth                                                    */
/* ------------------------------------------------------------------------------------------------------------------ */

const googleOAuthClientID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

function googleFailure(error: any) {
  toast.error("Could not authenticate with Google");
}
/* ------------------------------------------------------------------------------------------------------------------ */

export default function SignIn() {
  const router = useRouter();
  const [signIn, { data: data_signIn, error: error_signIn }] = useMutation<iSignIn>(MUTATION_SIGN_IN);
  const [
    signInWithGoogle,
    { data: data_signInWithGoogle, error: error_signInWithGoogle },
  ] = useMutation<iSignInWithGoogle>(MUTATION_SIGN_IN_WITH_GOOGLE);

  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const googleSuccess = useCallback(
    (response: GoogleLoginResponse) => {
      const googleIDToken = response.getAuthResponse().id_token;
      signInWithGoogle({
        variables: {
          googleIDToken,
        },
      });
    },
    [signInWithGoogle]
  );

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

  const handleServerResponse = useCallback(() => {
    if (!router) return;

    /* ------------------------------------------------- Succeeded. ------------------------------------------------- */
    if (data_signIn || data_signInWithGoogle) {
      toast.dark("Sign-In succeeded");
      router.push("/");
      return;
    }

    /* --------------------------------------------------- Failed --------------------------------------------------- */
    if (error_signIn) {
      toast.error(error_signIn.message);
      return;
    }
    if (error_signInWithGoogle) {
      toast.error(error_signInWithGoogle);
    }
  }, [router, data_signIn, data_signInWithGoogle, error_signIn, error_signInWithGoogle]);

  /* --------------------------------------------------- useEffect -------------------------------------------------- */
  useEffect(handleServerResponse, [data_signIn, data_signInWithGoogle, error_signIn, error_signInWithGoogle]);

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
          {googleOAuthClientID && (
            <GoogleLogin
              clientId={googleOAuthClientID}
              onSuccess={(r) => googleSuccess(r as GoogleLoginResponse)}
              onFailure={googleFailure}
            />
          )}
        </Form>
      </AuthFocusBlock>
    </PageLayout>
  );
}
