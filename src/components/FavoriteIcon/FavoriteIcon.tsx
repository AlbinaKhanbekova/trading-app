import React from 'react'
import { ReactComponent as StarIcon } from '../../assets/star.svg'
import { ReactComponent as StarOutlineIcon } from '../../assets/star-outline.svg'
import styles from './FavoriteIcon.module.css'

type FavoriteIconProps = {
  isFavorite?: boolean
  onClick?: () => void
  className?: string
}

export const FavoriteIcon = ({
  isFavorite,
  className,
  ...rest
}: FavoriteIconProps) => {
  const Icon = isFavorite ? StarIcon : StarOutlineIcon

  return <Icon className={`${styles.icon} ${className}`} {...rest} />
}
