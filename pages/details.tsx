import Container from "@material-ui/core/Container";
import Layout from "../components/Layout";
import getUserData from "../lib/getUserData";
import styles from "../styles/Details.module.css";

export async function getServerSideProps(request) {
  const query = request.query;
  const userData = await getUserData(query);
  return {
    props: { userData },
  };
}

export default function Details({ userData }): React.ReactElement {
  return (
    <Layout>
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
              <span className={styles.value}>
                <a title={userData.public_repos} href={userData.public_repos}>
                  {" "}
                  View Repositories{" "}
                </a>
              </span>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
