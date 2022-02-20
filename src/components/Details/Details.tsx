import React from 'react'

import styles from './Details.module.css'

type DetailsProps = {
  data: any
}

export const Details = ({ data }: DetailsProps) => {
  return (
    <div className={styles.container}>
      <h2>{data.companyName}</h2>
      <span>{data.symbol}</span>
      <img src={data.logoUrl} alt="Logo" />

      <div>
        <span>Sector:</span>
        <span>{data.sector}</span>
      </div>
      <div>
        <span>Close:</span>
        <span>${data.close}</span>
      </div>
    </div>
  )
}
