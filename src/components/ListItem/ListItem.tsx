import React from "react";

type ListItemProps = {
  title: string;
  subtitle: string;
  actionIcon?: React.ReactNode;
};

export const ListItem = ({ title, subtitle, actionIcon }: ListItemProps) => {
  return (
    <li>
      <div>
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
      {actionIcon}
    </li>
  );
};
