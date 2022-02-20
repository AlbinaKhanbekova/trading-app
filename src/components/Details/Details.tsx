import React from 'react'
import { FavoriteItem, CompanyDetails } from '../../types'

import styles from './Details.module.css'

type DetailsProps = {
  data: CompanyDetails
  addToFavorites: (item: FavoriteItem) => void
}

export const Details = ({ data, addToFavorites }: DetailsProps) => {
  const onClick = () => {
    const item: FavoriteItem = {
      symbol: data.symbol,
      companyName: data.companyName,
      logoUrl: data.logoUrl,
    }
    addToFavorites(item)
  }
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={data.logoUrl} alt="Logo" />
      <div className={styles.info}>
        <div className={styles.name}>
          <span>{data.symbol}</span>
          <h2>{data.companyName}</h2>
        </div>
        <p>{data.description}</p>
        {data.sector && (
          <div>
            <span>Sector:</span>
            <span>{data.sector}</span>
          </div>
        )}
      </div>

      <div className={styles.quote}>
        <button onClick={onClick}>Add</button>
        <span>Price:</span>
        <span className={styles.price}>${data.close}</span>
      </div>
    </div>
  )
}
