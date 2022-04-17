import Head from "next/head";
import Card from "../components/card";
import styles from "../styles/everything.module.css";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>2022 /r/place Helper Tools</title>
        <meta
          name="description"
          content="Tools for Reddit's experiment, r/place 2022"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.main}>
        <h1>All tools</h1>
        <Card
          primary={true}
          style={{ maxWidth: "200px" }}
          onClick={() => (location.href = "remaining")}
        >
          <p style={{ padding: "20px" }}>
            Pixels Remaining <br />
            Did your pixels make it to the final canvas?
          </p>
        </Card>
        <Card
          style={{ maxWidth: "200px" }}
          onClick={() => (location.href = "search")}
        >
          <p style={{ padding: "20px" }}>
            Pixel Search <br /> Find all pixels placed in an area between two
            times.
          </p>
        </Card>
      </div>
    </div>
  );
}
