import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from './Card.jsx'
import programs from '../../data/jobs.json'

function Program() {
  const { category, type } = useParams()

  const catMap = {
    funeralProgram: 'Funeral Programs',
    businessCard: 'Business Cards',
    poster: 'Posters'
  }

  const results = programs.filter(p => {
    if (category && type) return p.category === category && p.type === type
    if (category) return p.category === category
    if (type) return p.type === type
    return true
  })

  return (
    <div className="page">
      <h1 className="title">
        {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All'} {category ? catMap[category] : 'error'}
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <div className="row g-4 align-items-stretch">
              {results.map((program) => (
                <div key={program.id} className="col-6 col-md-3 col-lg-2">
                  <Card program={program} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Program