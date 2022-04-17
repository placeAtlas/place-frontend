import Head from "next/head";
import styles from "../styles/everything.module.css";
import Navbar from "../components/navbar";
import { useState } from "react";
import Pixels from "../components/pixels";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [errText, setErrText] = useState("");
  const [remaining, setRemaining] = useState();
  const [startDate, setStartDate] = useState(new Date("2022-04-01"));
  const [endDate, setEndDate] = useState(new Date("2022-04-06"));

  const searchOnSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    let params = {};
    const c1 = e.target.c1.value.split(" ").join("");
    if (!/^[0-9]+,[0-9]+$/.test(c1)) {
      setIsError(true);
      setErrText("Coordinate 1 does not fit correct format of x,y.");
    }
    const c2 = e.target.c2.value.split(" ").join("");
    if (!/^[0-9]+,[0-9]+$/.test(c2)) {
      setIsError(true);
      setErrText("Coordinate 2 does not fit correct format of x,y.");
    }
    params.x1 = c1.split(",")[0];
    params.y1 = c1.split(",")[1];

    params.x2 = c2.split(",")[0];
    params.y2 = c2.split(",")[1];

    const tzoffset = startDate.getTimezoneOffset() * 60000; // offset in milliseconds
    params.t1 = new Date(startDate - tzoffset).toISOString();
    params.t2 = new Date(endDate - tzoffset).toISOString();

    const uid = e.target.uid.value;
    if (uid && uid !== "") {
      params.uid = uid;
    }
    const t = await fetch(
      `${process.env.API_URL}/search?${new URLSearchParams(params)}`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            throw Error("You have to enter all parameters! Please try again.");
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
        <title>Search Pixels — 2022 /r/place Helper Tools</title>
        <meta
          name="description"
          content="Tools for Reddit's experiment, r/place 2022"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.main}>
        <h1>Search Pixels</h1>
        <h2>
          Search for all pixels placed in a certain area between two times.
        </h2>
        <form onSubmit={searchOnSubmit}>
          <label htmlFor="c1">User id (optional):</label>
          <input type="text" name="uid" placeholder="User id" />

          <label htmlFor="c1">Coordinate 1:</label>
          <input type="text" name="c1" placeholder="x, y" required />

          <label htmlFor="c2">Coordinate 2:</label>
          <input type="text" name="c2" placeholder="x, y" required />

          <label htmlFor="t1">Start time (UTC):</label>
          <DatePicker
            name="t1"
            selected={startDate}
            onChange={(d) => setStartDate(d)}
            minDate={new Date("2022-04-01")}
            minTime={new Date(new Date().setHours(0, 0))}
            maxTime={
              startDate.getDate() === endDate.getDate()
                ? endDate
                : new Date(new Date().setHours(23, 59))
            }
            maxDate={endDate}
            showTimeSelect
            dateFormat="yyyy-MM-dd hh:mm:ss aa"
          />

          <label htmlFor="t2">End time (UTC):</label>
          <DatePicker
            name="t2"
            selected={endDate}
            onChange={(d) => setEndDate(d)}
            minDate={startDate}
            minTime={
              startDate.getDate() === endDate.getDate()
                ? startDate
                : new Date(new Date().setHours(0, 0))
            }
            maxTime={new Date(new Date().setHours(23, 59))}
            maxDate={new Date("2022-04-06")}
            showTimeSelect
            dateFormat="yyyy-MM-dd hh:mm:ss aa"
          />
          <button type="submit">Submit</button>
        </form>
        <h4 className={`${styles.error} ${isError ? styles.active : ""}`}>
          {errText}
        </h4>
        {/*TODO: Make a component for search. tbh the Pixels could probably be reutilized but with an option to not load the image (the area won't be the same then and now)*/}
        <Pixels image={false} uid={true} pixels={remaining} />
      </div>
    </div>
  );
}
