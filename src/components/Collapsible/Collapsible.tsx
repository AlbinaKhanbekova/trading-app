import React from 'react'

import styles from './Collapsible.module.css'

type CollapsibleType = {
  isOpen: boolean
  title?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const Collapsible = ({
  isOpen,
  title,
  children,
  className = '',
}: CollapsibleType) => {
  if (!isOpen) return null
  return (
    <div className={`${className} ${styles.collapsible}`}>
      {title}
      {isOpen && <div>{children}</div>}
    </div>
  )
}
