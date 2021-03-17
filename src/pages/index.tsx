import FocusBlock from "../components/FocusBlock/FocusBlock";
import PageLayout from "../components/PageLayout/PageLayout";
import * as SC from "../styles/pages/index.style";
export default function Home() {
  return (
    <PageLayout>
      <FocusBlock>Login succeeded.</FocusBlock>
    </PageLayout>
  );
}
