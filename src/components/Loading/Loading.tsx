import styles from './Loading.module.css'

export const Loading = () => (
  <div className={styles['lds-ring']}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
