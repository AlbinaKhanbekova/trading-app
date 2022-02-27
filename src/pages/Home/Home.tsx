import React, { useEffect } from 'react'
import { Autocomplete, Details } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/slices/favorites.slice'
import {
  fetchSymbols,
  fetchStockDetails,
  updateStockDetails,
  clearStockDetails,
} from '../../redux/slices/stock.slice'
import { FavoriteItem } from '../../types'

import styles from './Home.module.css'

export const Home = () => {
  const dispatch = useAppDispatch()
  const detailsData = useAppSelector((state) => state.stock.stockDetails)
  const list = useAppSelector((state) => state.stock.list)
  const loading = useAppSelector((state) => state.stock.loading)

  useEffect(() => {
    if (!list.length) {
      // load once list of sybmols and companies names to enable autocomplete functionality
      dispatch(fetchSymbols())
    }

    return () => {
      dispatch(clearStockDetails())
    }
  }, [dispatch, list])

  const onClick = (item: FavoriteItem) => {
    if (detailsData) {
      dispatch(
        updateStockDetails({
          ...detailsData,
          isFavorite: !detailsData.isFavorite,
        })
      )
      if (detailsData.isFavorite) {
        dispatch(removeFromFavorites(item))
      } else {
        dispatch(addToFavorites(item))
      }
    }
  }

  const onSelect = (value: string) => {
    if (value) {
      dispatch(fetchStockDetails(value))
    }
  }
  return (
    <div className={styles.container}>
      <h1>Welcome to Trading App</h1>
      <p>You can search for companies and their details</p>
      <Autocomplete
        data={list}
        onSelect={onSelect}
        placeholder="Company name or symbol"
      />
      <Details
        className={styles.details}
        data={detailsData}
        toggleFavorites={onClick}
        loading={loading}
        favIcon
      />
    </div>
  )
}
