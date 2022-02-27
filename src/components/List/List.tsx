import React from 'react'
import styles from './List.module.css'

type ListProps = {
  children: React.ReactNode
  className?: string
}

export const List = ({ children, className = '' }: ListProps) => {
  return <ul className={`${styles.list} ${className}`}>{children}</ul>
}
