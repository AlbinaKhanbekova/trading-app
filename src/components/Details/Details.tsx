import React from "react";

type DetailsProps = {
  symbol: string;
};
export const Details = ({ symbol }: DetailsProps) => {
  return <div>{symbol}</div>;
};
