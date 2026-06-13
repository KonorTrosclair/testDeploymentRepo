import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './Card.module.css'

export function Card({ program, index }) {
  const base = import.meta.env.BASE_URL
  const ref = useRef()

  const { type } = useParams()

  const to = type
    ? `/${program.category}/${program.type}/item/${program.id}`
    : `/${program.category}/item/${program.id}`

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
        <div
            className={styles.programCard}
            ref={ref}
        >
        {/* Divider */}
        <div style={{ width: '0.5px', background: 'rgba(0,155,245,0.2)', flexShrink: 0 }} />

        {/* Right: text */}
        <div
            className={styles.programText}
        >
            <img
                className={styles.programImg}
                src={base + program.image}
                alt={program.title}
                onError={(e) => {
                    e.target.onerror = null // prevents infinite loop if fallback also fails
                    e.target.src = `${base}assets/placehold.png` // path to your fallback image
                }}
            />
            <p
            className={styles.programTitle}
            >
            {program.title}
            </p>

            <p
            className={styles.programSize}
            >
            {program.size}
            </p>

            <p className={styles.programLayouts}>
                {program.layouts && program.layouts.length > 0
                ? `Available in ${program.layouts.join('-')} page layouts`
                : 'Layout info unavailable'}
            </p>
        </div>
        </div>
    </Link>
  )
}