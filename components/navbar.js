import { useState } from "react";
import styles from "../styles/everything.module.css";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div id={styles.brand}>
        <Link href="/">2022 /r/place Tools</Link>
      </div>
      <nav>
        <ul className={styles.hul}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://place-atlas.stefanocoding.me/"
            >
              Atlas
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://place-wiki.stefanocoding.me/"
            >
              Wiki
            </a>
          </li>
        </ul>
      </nav>
      <div
        className={open ? styles["open"] : ""}
        id={styles["hamburger-icon"]}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
        <ul className={`${styles["mobile-menu"]} ${styles.hul}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://place-atlas.stefanocoding.me/"
            >
              Atlas
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://place-wiki.stefanocoding.me/"
            >
              Wiki
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

