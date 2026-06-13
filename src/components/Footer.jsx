import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        <div className={styles.footerBrand}>
          <span>KT Graphix</span>
          <p>Custom designs for every occasion.</p>
        </div>

        <div className={styles.footerLinks}>
          <h4>Products</h4>
          <Link to="/funeralProgram">Funeral Programs</Link>
          <Link to="/businessCard">Business Cards</Link>
          <Link to="/poster">Posters</Link>
        </div>

        <div className={styles.footerLinks}>
          <h4>Company</h4>
          <Link to="/myWork">My Work</Link>
          <Link to="/">Home</Link>
        </div>

      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} KT Graphix. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer