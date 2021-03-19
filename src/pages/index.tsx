import { useMutation, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect } from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import FocusBlock from "../components/FocusBlock/FocusBlock";
import PageLayout from "../components/PageLayout/PageLayout";
import { MUTATION_SIGN_OUT } from "../graphql/queries/Auth";
import { GET_ME, iGetMe } from "../graphql/queries/Users";
import * as SC from "../styles/pages/index.style";

export default function Home() {
  const router = useRouter();
  const [signOut] = useMutation(MUTATION_SIGN_OUT);
  const { data, error } = useQuery<iGetMe>(GET_ME);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/auth/signIn");
  }, [signOut, router]);

  useEffect(() => {
    if (!error || error.graphQLErrors.length === 0) return;
    if (error.graphQLErrors.some((e) => e.extensions?.code === "UNAUTHENTICATED")) {
      router.push("/auth/signIn");
    }
  }, [error]);
  return (
    <PageLayout>
      <FocusBlock>
        <h1>Auth Succeeded</h1>
        <p>Name: {data?.getMe?.name}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </FocusBlock>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo(null, req.headers);
  try {
    await apolloClient.query<iGetMe>({
      query: GET_ME,
    });
  } catch {}
  return {
    props: { [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract() },
  };
};
