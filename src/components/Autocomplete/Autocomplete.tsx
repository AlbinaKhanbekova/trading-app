import React, { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { CompanySearchItem } from '../../types'
import { List } from '../List/List'
import { ListItem } from '../ListItem/ListItem'

import styles from './Autocomplete.module.css'

type AutoCompleteProps = {
  data: CompanySearchItem[]
  placeholder?: string
  onSelect?: (id: string) => void
}

export const Autocomplete = ({
  data,
  placeholder = '',
  onSelect: onSelectHandler,
}: AutoCompleteProps) => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<CompanySearchItem[]>([])
  const debouncedValue = useDebounce<string>(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  useEffect(() => {
    if (debouncedValue.length) {
      const result = data.filter(
        (d) =>
          d.symbol.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          d.companyName.toLowerCase().includes(debouncedValue.toLowerCase())
      )
      setSearchResult(result.slice(0, 9))
      setOpen(true)
    } else {
      setSearchResult([])
    }
  }, [data, debouncedValue])

  const onSelect = (item: CompanySearchItem) => () => {
    if (onSelectHandler) {
      onSelectHandler(item.symbol)
    }
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      <input
        value={value}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
      />
      {open && searchResult.length > 0 && (
        <div className={styles.dropdown}>
          <List>
            {searchResult.map((item) => (
              <ListItem
                key={item.symbol}
                title={item.companyName}
                subtitle={item.symbol}
                onClick={onSelect(item)}
              />
            ))}
          </List>
        </div>
      )}
    </div>
  )
}
