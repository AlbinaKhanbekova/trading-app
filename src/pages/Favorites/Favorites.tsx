import React from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { removeFromFavorites } from '../../redux/slices/favorites.slice'

import { List, ListItem } from '../../components'
import { FavoriteItem } from '../../types'

import styles from './Favorites.module.css'

export const Favorites = () => {
  const favoriteItems = useAppSelector((state) => state.favorites.list)
  const dispatch = useAppDispatch()

  const removeItem = (item: FavoriteItem) => dispatch(removeFromFavorites(item))

  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <List>
        {favoriteItems.length ? (
          favoriteItems.map((item) => (
            <ListItem
              key={item.symbol}
              title={item.companyName}
              subtitle={item.symbol}
              actionIcon={<div onClick={() => removeItem(item)}>X</div>}
            />
          ))
        ) : (
          <p>You don't have favorites yet. You can add them from Home page</p>
        )}
      </List>
    </div>
  )
}
