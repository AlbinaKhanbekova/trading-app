import React, { useEffect, useState } from 'react'
import { Autocomplete, Details } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToFavorites } from '../../redux/slices/favorites.slice'
import { fetchSymbols } from '../../redux/slices/stock.slice'
import { getCompany, getLogo, getQuote } from '../../services/api'
import { FavoriteItem } from '../../types'

import styles from './Home.module.css'

export const Home = () => {
  const [symbol, setSymbol] = useState<string | null>(null)
  const [detailsData, setDetailsData] = useState<any>(null)
  const dispatch = useAppDispatch()
  const list = useAppSelector((state) => state.stock.list)

  useEffect(() => {
    if (!list.length) {
      // load once list of sybmols and companies names to enable autocomplete functionality
      dispatch(fetchSymbols())
    }
  }, [dispatch, list])

  useEffect(() => {
    const fetchDetails = async () => {
      if (symbol) {
        try {
          const [companyResponse, quoteResponse, logoResponse] =
            await Promise.all([
              getCompany(symbol),
              getQuote(symbol),
              getLogo(symbol),
            ])
          if (companyResponse.ok && quoteResponse.ok && logoResponse.ok) {
            const companyData = await companyResponse.json()
            const quoteData = await quoteResponse.json()
            const logoData = await logoResponse.json()

            console.log(companyData, quoteData)
            setDetailsData({
              companyName: companyData.companyName,
              description: companyData.description,
              symbol: companyData.symbol,
              sector: companyData.sector,
              country: companyData.country,
              close: quoteData.close,
              closeTime: quoteData.closeTime,
              logoUrl: logoData.url,
            })
          } else {
            throw new Error()
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    fetchDetails()
  }, [symbol])

  const onClick = (item: FavoriteItem) => {
    console.log(item)
    dispatch(addToFavorites(item))
  }

  const onSelect = (value: string) => setSymbol(value)
  return (
    <div className={styles.container}>
      <h1>Welcome to Trading App</h1>
      <p>You can search for companies and their details</p>
      <Autocomplete
        data={list}
        onSelect={onSelect}
        placeholder="Company name or symbol"
      />
      {detailsData && (
        <div className={styles.details}>
          <Details data={detailsData} addToFavorites={onClick} />
        </div>
      )}
    </div>
  )
}
