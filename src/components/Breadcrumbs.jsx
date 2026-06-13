import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

const LABELS = {
  myWork: 'My Work',
  funeralProgram: 'Funeral Programs',
  businessCard: 'Business Cards',
  premium: 'Premium',
  trifold: 'Trifold',
  standard: 'Standard',
  religious: 'Religious',
  rounded: 'Rounded',
  square: 'Square',
  poster: 'Posters',
  large: 'Large',
  medium: 'Medium',
  small: 'Small',
}

function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(seg => seg !== '' && seg !== 'item')

  if (parts.length === 0) return null // hide on home

  const crumbs = [
    { label: 'Home', to: '/' },
    ...parts.map((seg, i) => ({
      label: LABELS[seg] ?? seg,
      to: '/' + parts.slice(0, i + 1).join('/'),
    })),
  ]

  

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.to}>
            {i > 0 && <span className={styles.breadcrumbSep} aria-hidden="true">› </span>}
            {isLast
              ? <span className={styles.breadcrumbCurrent} aria-current="page">{crumb.label}</span>
              : <Link to={crumb.to} className={styles.breadcrumbLink}>{crumb.label}</Link>
            }
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs