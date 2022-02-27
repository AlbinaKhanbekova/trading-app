import React, { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { removeFromFavorites } from '../../redux/slices/favorites.slice'

import {
  List,
  ListItem,
  Collapsible,
  Details,
  FavoriteIcon,
} from '../../components'
import { FavoriteItem } from '../../types'

import styles from './Favorites.module.css'
import {
  fetchStockDetails,
  clearStockDetails,
} from '../../redux/slices/stock.slice'
import { Link } from 'react-router-dom'

export const Favorites = () => {
  const dispatch = useAppDispatch()
  const detailsData = useAppSelector((state) => state.stock.stockDetails)
  const loading = useAppSelector((state) => state.stock.loading)
  const favoriteItems = useAppSelector((state) => state.favorites.list)

  const [activeIndex, setActiveIndex] = useState<number>(-1)

  useEffect(() => {
    return () => {
      dispatch(clearStockDetails())
    }
  }, [dispatch])

  const clickHandler = (item: FavoriteItem, i: number) => () => {
    if (activeIndex === i) {
      setActiveIndex(-1)
    } else {
      setActiveIndex(i)
      dispatch(fetchStockDetails(item.symbol))
    }
  }

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      {favoriteItems.length ? (
        <List className={styles.list}>
          {favoriteItems.map((item, i) => (
            <React.Fragment key={item.symbol}>
              <ListItem
                key={item.symbol}
                title={item.companyName}
                subtitle={item.symbol}
                onClick={clickHandler(item, i)}
                actionIcon={
                  <FavoriteIcon
                    isFavorite
                    onClick={() => dispatch(removeFromFavorites(item))}
                  />
                }
              />
              <Collapsible
                isOpen={i === activeIndex}
                className={styles.collapsible}
              >
                <Details
                  className={styles.details}
                  data={detailsData}
                  loading={loading}
                />
              </Collapsible>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <p>
          You don't have favorites yet. You can add them from{' '}
          <Link to="/">Home</Link> page
        </p>
      )}
    </div>
  )
}
