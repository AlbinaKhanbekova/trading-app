import React from 'react'

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { removeFromFavorites } from '../../redux/slices/favorites.slice'

import { List, ListItem } from '../../components'
import { Favorite } from '../../types/favorites'

export const Favorites = () => {
  const favoriteItems = useAppSelector((state) => state.favorites.favorites)
  const dispatch = useAppDispatch()

  const removeItem = (item: Favorite) => dispatch(removeFromFavorites(item))

  return (
    <div>
      <h1>Favorites</h1>
      <List>
        {favoriteItems.map((item) => (
          <ListItem
            title={item.company}
            subtitle={item.symbol}
            actionIcon={<div onClick={() => removeItem(item)}>X</div>}
          />
        ))}
      </List>
    </div>
  )
}
