import Head from "next/head";
import styles from "../styles/everything.module.css";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useState } from "react";
import Pixels from "../components/pixels";

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [errText, setErrText] = useState("");
  const [remaining, setRemaining] = useState();
  const remainingOnSubmit = async (e) => {
    e.preventDefault();
    const uid = e.target.uid.value;
    setIsError(false);
    const t = await fetch(
      `${process.env.API_URL}/pixels/remaining?uid=${encodeURIComponent(uid)}`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            throw Error("You have to enter your user id! Please try again.");
          }
          throw Error(`Error code ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error.stack);
        setIsError(true);
        setErrText(error.message);
      });
    if (t) {
      setRemaining(t);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Remaining Pixels — 2022 /r/place Helper Tools</title>
        <meta
          name="description"
          content="Tools for Reddit's experiment, r/place 2022"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.main}>
        <h1>Remaining Pixels</h1>
        <h2>Did your pixels survive all the way until the final canvas?</h2>
        <p>
          Disclaimer: this page requires your unique user_id hash from the
          r/place dataset. The only way of finding it is knowing when and where
          you placed pixels and then searching that up in the dataset which you
          can try and do with <Link href="/search">our search tool</Link>. You
          may not be able to find this but until things change there isn&apos;t
          anything that can be done.
        </p>
        <form onSubmit={remainingOnSubmit}>
          <label htmlFor="uid">User id:</label>
          <input placeholder="User id" type="text" name="uid" required />
          <button type="submit">Submit</button>
        </form>
        <h4 className={`${styles.error} ${isError ? styles.active : ""}`}>
          {errText}
        </h4>
        <Pixels pixels={remaining} />
      </div>
    </div>
  );
}
