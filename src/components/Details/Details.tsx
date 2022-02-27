import React from 'react'
import { FavoriteItem, StockDetails } from '../../types'

import styles from './Details.module.css'
import { FavoriteIcon, Loading } from '../../components'

type DetailsProps = {
  loading?: boolean
  data: StockDetails | null
  className?: string
  toggleFavorites?: (item: FavoriteItem) => void
  favIcon?: boolean
}

export const Details = ({
  data,
  loading,
  toggleFavorites,
  className = '',
  favIcon,
}: DetailsProps) => {
  const onClick = () => {
    if (data) {
      const item: FavoriteItem = {
        symbol: data.symbol,
        companyName: data.companyName,
        logoUrl: data.logoUrl,
      }
      if (toggleFavorites) toggleFavorites(item)
    }
  }

  const price = data?.close || data?.latestPrice
  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        data && (
          <div className={`${styles.container} ${className}`}>
            <img className={styles.logo} src={data.logoUrl} alt="Logo" />
            <div className={styles.info}>
              <div className={styles.name}>
                <h2>
                  <span>{data.companyName}</span>
                  <span className={styles.symbol}>{data.symbol}</span>
                </h2>
              </div>
              <p>{data.description}</p>
              {data.sector && (
                <>
                  <hr className={styles.divider} />
                  <div>
                    <span>Sector: </span>
                    <span>{data.sector}</span>
                  </div>
                </>
              )}
            </div>

            <div className={styles.right}>
              <span className={styles.price}>${price}</span>

              {favIcon && (
                <button className={styles.button} onClick={onClick}>
                  <FavoriteIcon
                    className={styles.icon}
                    isFavorite={data.isFavorite}
                  />
                </button>
              )}
            </div>
          </div>
        )
      )}
    </>
  )
}
