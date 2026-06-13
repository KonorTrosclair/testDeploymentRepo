import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const base = import.meta.env.BASE_URL
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className="container-fluid">
        <div className="row align-items-center w-100">

          {/* Logo — 2 cols on mobile, 1 on larger */}
          <div className="col-4 col-md-2">
            <Link to="/">
              <img className={styles.logo} src={`${base}assets/hero.png`} alt="logo" />
            </Link>
          </div>

          {/* Hamburger — only visible on small screens, pushed to far right */}
          <div className="col-8 d-flex d-md-none justify-content-end align-items-center">
            <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>

          {/* Links — hidden on mobile unless menu open, full row on md+ */}
          <div className={`col-12 col-md-10 ${styles.navbarLinks} ${menuOpen ? styles.navbarLinksOpen : ''} d-md-flex`}>
            <Link to="/myWork">My Work</Link>

            <div className={styles.dropdown}>
              <Link to="/funeralProgram">Funeral Programs</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/funeralProgram/">All Programs</Link>
                <Link to="/funeralProgram/premium">Premium Programs</Link>
                <Link to="/funeralProgram/trifold">Trifold Programs</Link>
                <Link to="/funeralProgram/standard">Standard Programs</Link>
                <Link to="/funeralProgram/religious">Religious Programs</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <Link to="/businessCard">Business Cards</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/businessCard">All Cards</Link>
                <Link to="/businessCard/premium">Premium Cards</Link>
                <Link to="/businessCard/standard">Standard Cards</Link>
                <Link to="/businessCard/square">Square Cards</Link>
                <Link to="/businessCard/rounded">Rounded Cards</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <Link to="/poster">Posters</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/poster">All Posters</Link>
                <Link to="/poster/premium">Premium Posters</Link>
                <Link to="/poster/standard">Standard Posters</Link>
                <Link to="/poster/large">Large Posters</Link>
                <Link to="/poster/medium">Medium Posters</Link>
                <Link to="/poster/small">Small Posters</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar