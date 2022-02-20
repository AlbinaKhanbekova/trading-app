import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { SymbolListItem } from "../../types/symbols";
import { List } from "../List/List";
import { ListItem } from "../ListItem/ListItem";

import styles from "./Autocomplete.module.css";

type AutoCompleteProps = {
  data: SymbolListItem[];
  onSelect?: (id: string) => void;
};

export const Autocomplete = ({
  data,
  onSelect: onSelectHandler,
}: AutoCompleteProps) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<SymbolListItem[]>([]);
  const debouncedValue = useDebounce<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    if (debouncedValue.length) {
      const result = data.filter(
        (d) =>
          d.symbol.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          d.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setSearchResult(result.slice(0, 9));
      setOpen(true);
    } else {
      setSearchResult([]);
    }
  }, [data, debouncedValue]);

  const clickOutside = () => setOpen(false);

  const onSelect = (item: SymbolListItem) => () => {
    if (onSelectHandler) {
      onSelectHandler(item.symbol);
    }
    clickOutside();
  };

  return (
    <div className={styles.container}>
      <input value={value} onChange={handleChange} className={styles.input} />
      {open && (
        <div className={styles.dropdown} onBlur={clickOutside}>
          <List>
            {searchResult.map((item) => (
              <ListItem
                key={item.symbol}
                title={item.name}
                subtitle={item.symbol}
                onClick={onSelect(item)}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  );
};
