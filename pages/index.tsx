import Head from "next/head";
import styles from "../styles/Home.module.css";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import generateState from "../lib/auth";
import Layout from "../components/Layout";

export function getServerSideProps(): object {
  const OAuthState = generateState();
  return {
    props: { OAuthState },
  };
}

const authorizeBaseUrl: string =
  "https://github.com/login/oauth/authorize/?client_id=cca734a0793b74f427cc&allow_signup=false&state=";

export default function Home({ OAuthState }): React.ReactElement {
  const authorizeURL: string = authorizeBaseUrl + OAuthState;
  const handleLogin = () => {
    window.location.href = authorizeURL;
  };

  return (
    <Layout>
      <Head>
        <title>Github OAuth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container className={styles.container}>
          <Button onClick={handleLogin} className={styles.button}>
            <span>Login with GitHub</span>
            <span className={styles.iconWrapper}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faGithub}
                size="2x"
              />
            </span>
          </Button>
        </Container>
      </div>
    </Layout>
  );
}
