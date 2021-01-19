import Head from "next/head";

export default function Layout({ children }): React.ReactElement {
  return (
    <div>
      <Head>
        <title>GitHub OAuth</title>
      </Head>
      <div>{children}</div>
    </div>
  );
}
