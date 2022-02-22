import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export const Header = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles['nav-list']}>
        <li className={styles['list-item']}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles['list-item']}>
          <Link to="/favorites">My Favorites</Link>
        </li>
      </ul>
    </nav>
  )
}
