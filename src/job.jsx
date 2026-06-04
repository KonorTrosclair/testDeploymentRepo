import { useRef } from 'react'

export function searchjobs(query) {
    return jobs.filter(job => {
        const categoryMatch = job.category.toLowerCase().includes(query.toLowerCase());
        const subCategoryMatch = job.subCategory.toLowerCase().includes(query.toLowerCase());
        const designerMatch = job.designer.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = job.description.toLowerCase().includes(query.toLowerCase());
        const trimSizeMatch = job.trimSize.toLowerCase().includes(query.toLowerCase());
        const foldSizeMatch = job.foldSize ? job.foldSize.toLowerCase().includes(query.toLowerCase()) : false;
        const fileNameMatch = job.fileName.toLowerCase().includes(query.toLowerCase());
        return categoryMatch || subCategoryMatch || designerMatch || descriptionMatch || trimSizeMatch || foldSizeMatch || fileNameMatch;
    })
}


export function JobCard({ job, index }) {
  const ref = useRef()

  return (
    <div
      className="job-card"
      ref={ref}
      style={{
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
      }}
    >
      {/* Divider */}
      <div style={{ width: '0.5px', background: 'rgba(0,155,245,0.2)', flexShrink: 0 }} />

      {/* Right: text */}
      <div
        className="card-text"
        style={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <p
          className="card-title"
          style={{
            margin: '0 0 8px',
            fontWeight: 500,
            color: '#fff',
            fontSize: '1.1rem',
            flexShrink: 0,
          }}
        >
          {job.category}
        </p>

        <p
          className="card-subcategory"
          style={{
            margin: '0 0 12px',
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            flexShrink: 1,
          }}
        >
          {job.subCategory}
        </p>

        <p
            className="card-designer">
            {job.designer}
        </p>

        <p
            className="card-description">
            {job.description}
        </p>

        <p
            className="card-trimSize">
            {job.trimSize}
        </p>

        <p
            className="card-foldSize">
            {job.foldSize}
        </p>

        <p
            className="card-fileName">
            {job.fileName}
        </p>
      </div>
    </div>
  )
}