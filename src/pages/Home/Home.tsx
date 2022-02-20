import React, { useEffect, useState } from "react";
import { Autocomplete } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSymbols } from "../../redux/slices/symbol.slice";

import styles from "./Home.module.css";

export const Home = () => {
  const [symbol, setSymbol] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.symbols.list);

  useEffect(() => {
    if (!list.length) {
      // load once list of sybmols and companies names to enable autocomplete functionality
      dispatch(fetchSymbols());
    }
  }, [dispatch, list]);

  const onSelect = (value: string) => setSymbol(value);
  return (
    <div className={styles.container}>
      <h1>Welcome to Trading App</h1>
      <p>You can search for companies and their details</p>
      <Autocomplete data={list} onSelect={onSelect} />
      {symbol}
    </div>
  );
};
