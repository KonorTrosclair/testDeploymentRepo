import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactSlick from 'react-slick'
import programs from '../../data/jobs.json'
import { calculatePrice } from '../../utils/calculate.js'

import styles from './Detail.module.css'

const Slider = ReactSlick.default || ReactSlick

function Detail() {
  const base = import.meta.env.BASE_URL
  const { id, type } = useParams()
  const navigate = useNavigate()

  const program = programs.find(p => p.id === id)

  const [size, setSize] = useState(program?.size[0] ?? '')
  const [layout, setLayout] = useState(program?.layouts[0] ?? 1)
  const [quantity, setQuantity] = useState(1)

  const sliderRef = useRef(null)

  if (!program) return <p>Program not found</p>

  const siblings = programs.filter(p =>
    p.category === program.category &&
    (type ? p.type === program.type : true)
  )

  const currentIndex = siblings.findIndex(p => p.id === id)
  const prevProgram = siblings[currentIndex - 1] ?? null
  const nextProgram = siblings[currentIndex + 1] ?? null


  const dragStartX = useRef(null)
  const dragDistance = useRef(0)
  function goTo(p) {
    if (Math.abs(dragDistance.current) > 5) return  // was a drag, not a click
    const to = type
      ? `/${p.category}/${p.type}/item/${p.id}`
      : `/${p.category}/item/${p.id}`
    navigate(to)
  }
  
  const [windowWidth, setWindowWidth] = useState(null)  

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const result = calculatePrice(program.category, program.type, size, layout, quantity)
  const carouselItems = siblings.filter(p => p.id !== id && p.type === program.type)

  const getSlidesToShow = (width) => {
    if (width < 576) return 1
    if (width < 768) return 2
    if (width < 992) return 3
    return 4
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: getSlidesToShow(windowWidth ?? window.innerWidth),
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    centerPadding: '20px',
  }

  return (
    <div className="page">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-10 offset-1">
            <div className="row g-5">
              {/* left column */}
              <div className="col-12 col-md-6">
                <div className={styles.detailLeft}>
                  <h1 className={styles.detailTitle}>{program.title}</h1>
                  <img
                    className={styles.detailImage}
                    src={base + program.image}
                    alt={program.title}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `${base}assets/placehold.png`
                    }}
                  />
                  <p className={styles.detailDescription}>{program.description}</p>
                  <div className={styles.detailNav}>
                    <button className={styles.detailNavBtn} onClick={() => prevProgram && goTo(prevProgram)} disabled={!prevProgram}>← Prev</button>
                    <button className={styles.detailNavBtn} onClick={() => nextProgram && goTo(nextProgram)} disabled={!nextProgram}>Next →</button>
                  </div>
                </div>
              </div>

              {/* right column */}
              <div className="col-12 col-md-6">
                <div className={styles.detailRight}>
                  <form className={styles.detailForm}>
                    <label htmlFor="size">Page Size
                      <select name="size" id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                        {program.size.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </label>
                    <label htmlFor="layouts">Layout
                      <select name="layouts" id="layouts" value={layout} onChange={(e) => setLayout(Number(e.target.value))}>
                        {program.layouts.map(l => <option key={l} value={l}>{l} pages</option>)}
                      </select>
                    </label>
                    <label htmlFor="quantity">Quantity
                      <input type="number" name="quantity" id="quantity" min="1" value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                    </label>
                    <div className={styles.detailFormFooter}>
                      <div className={styles.detailTotal}>
                        <span className={styles.detailTotalLabel}>Total</span>
                        <span className={styles.detailTotalPrice}>{result ? `$${result.total}` : 'N/A'}</span>
                      </div>
                      <button type="submit" className={styles.detailFormSubmit}>Add to Order</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* carousel — full width below */}
      <div className="container-fluid px-4 px-md-5">
        <div className={styles.detailCarousel}>
          <h3 className={styles.carouselTitle}>More Like This</h3>
          <div className={styles.carouselWrapper}>
            <button className={styles.carouselArrow} onClick={() => sliderRef.current?.slickPrev()}>‹</button>
            <div
              className={styles.carouselTrackOuter}
              onMouseDown={(e) => { dragStartX.current = e.clientX; dragDistance.current = 0 }}
              onMouseMove={(e) => { if (dragStartX.current !== null) dragDistance.current = e.clientX - dragStartX.current }}
              onMouseUp={() => { setTimeout(() => { dragStartX.current = null; dragDistance.current = 0 }, 50) }}
              onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; dragDistance.current = 0 }}
              onTouchMove={(e) => { if (dragStartX.current !== null) dragDistance.current = e.touches[0].clientX - dragStartX.current }}
              onTouchEnd={() => { setTimeout(() => { dragStartX.current = null; dragDistance.current = 0 }, 50) }}
            >
              <Slider ref={sliderRef} {...sliderSettings}>
                {carouselItems.map(p => (
                  <div key={p.id} className={styles.carouselItem} onClick={() => goTo(p)}>
                    <img
                      className={styles.carouselThumb}
                      src={base + p.image}
                      alt={p.title}
                      onError={(e) => { e.target.onerror = null; e.target.src = `${base}assets/placehold.png` }}
                    />
                    <span className={styles.carouselLabel}>{p.title}</span>
                  </div>
                ))}
              </Slider>
            </div>
            <button className={styles.carouselArrow} onClick={() => sliderRef.current?.slickNext()}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail