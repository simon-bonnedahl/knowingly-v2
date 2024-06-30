import styles from "./style.module.css";

interface LoadingDotsProps {
  color?: string;
}

export const LoadingDots = ({ color = "#fff" }: LoadingDotsProps) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};
