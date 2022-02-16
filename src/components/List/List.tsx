import React from "react";
import styles from "./List.module.css";

type ListProps = {
  children: React.ReactNode;
};

export const List = ({ children }: ListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};
