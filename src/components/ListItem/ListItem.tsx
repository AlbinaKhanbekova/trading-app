import React from "react";
import styles from "./ListItem.module.css";

type ListItemProps = {
  title: string;
  subtitle?: string;
  actionIcon?: React.ReactNode;
  onClick?: () => void;
};

export const ListItem = ({
  title,
  subtitle,
  actionIcon,
  ...rest
}: ListItemProps) => {
  return (
    <li className={styles["list-item"]} {...rest}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {actionIcon}
    </li>
  );
};
