import styles from "../styles/everything.module.css";

export default function Card({
  children,
  primary = true,
  onClick = undefined,
}) {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${
        primary ? styles.primary : styles.secondary
      }`}
      style={{ cursor: onClick ? "pointer" : "auto" }}
    >
      {children}
    </div>
  );
}
