import { useState } from 'react'
import Fuse from 'fuse.js'
import { JobCard } from './job.jsx'
import jobs from './jobs.json'

const fuse = new Fuse(jobs, {
  keys: ['category', 'subCategory', 'designer', 'description', 'trimSize', 'foldSize', 'fileName'],
  threshold: 0.4,
  ignoreLocation: true,
})

function getUnique(key) {
  return [...new Set(jobs.map(j => j[key]).filter(Boolean))]
}

const FILTERS = [
  { key: 'category',    label: 'Category' },
  { key: 'subCategory', label: 'Type' },
  { key: 'trimSize',    label: 'Trim Size' },
  { key: 'foldSize',    label: 'Fold' },
]

function applyFilters(pool, checked) {
  return pool.filter(job =>
    FILTERS.every(({ key }) => {
      const active = checked[key]
      if (!active || active.size === 0) return true
      return active.has(job[key])
    })
  )
}

function MyWorkx() {
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState({})

  function toggle(key, value) {
    setChecked(prev => {
      const current = new Set(prev[key] || [])
      current.has(value) ? current.delete(value) : current.add(value)
      return { ...prev, [key]: current }
    })
  }

  function isChecked(key, value) {
    return checked[key]?.has(value) ?? false
  }

  function wouldHaveResults(key, value) {
    const next = { ...checked }
    const current = new Set(checked[key] || [])
    const simulated = new Set(current)
    simulated.add(value)
    next[key] = simulated

    const otherFilters = { ...next, [key]: new Set([value]) }
    return applyFilters(searched, otherFilters).length > 0
  }

  const searched = search.trim() === '' ? jobs : fuse.search(search).map(r => r.item)
  const results = applyFilters(searched, checked)

  return (
      <div className="page" >
        <h1 className="title">Jobs</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search jobs..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="content-layout">
          <div className="filter-sidebar">
            {FILTERS.map(({ key, label }) => (
              <div key={key} className="filter-section">
                <p className="filter-label">{label}</p>
                {getUnique(key).map(value => {
                  const active = isChecked(key, value)
                  const possible = key === 'category' || active || wouldHaveResults(key, value)
                  return (
                    <label
                      key={value}
                      className={`filter-option ${!possible ? 'filter-option--disabled' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        disabled={!possible}
                        onChange={() => toggle(key, value)}
                      />
                      {value}
                    </label>
                  )
                })}
              </div>
            ))}
          </div>

          <div id="job-grid" style={{ paddingBottom: '120px' }}>
            {results.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default MyWorkx