import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Layout from "../components/Layout";
import getUserData from "../lib/getUserData";
import styles from "../styles/Details.module.css";

// request data from the server, using details obtained from GitHub
export async function getServerSideProps(request) {
  const query = request.query;

  const userData = await getUserData(query);
  return {
    props: { userData },
  };
}

/* 
  On authorization by user, GitHub redirects to this page
 */
export default function Details({ userData }): React.ReactElement {
  // Store the obtained values in locaStorage once the component has rendered.
  useEffect(() => {
    if ("redirect" in userData) {
      window.location.href = userData.redirect.destination;
    } else {
      let data = Array.from(Object.entries(userData));
      data.map((item) => {
        const [key, value] = item;
        window.localStorage.setItem(key, value ? value.toString() : "");
      });
    }
  });

  return (
    <Layout>
      {"redirect" in userData ? (
        <></>
      ) : (
        <Container>
          <div className={styles.cardsWrapper}>
            <div>
              <div className={styles.imageWrapper}>
                <img src={userData.image} className={styles.image} />
              </div>
              <p>
                <span className={styles.keys}>Name: </span>
                <span className={styles.value}>{userData.name}</span>
              </p>
              <p>
                <span className={styles.keys}>Bio: </span>
                <span className={styles.value}>{userData.bio}</span>
              </p>
              <p>
                <span className={styles.keys}>Public repositories: </span>
                <span className={styles.value}>{userData.public_repos}</span>
              </p>
            </div>
          </div>
        </Container>
      )}
    </Layout>
  );
}
