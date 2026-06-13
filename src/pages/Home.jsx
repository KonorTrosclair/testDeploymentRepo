import styles from './Home.module.css'

function Home() {
  const base = import.meta.env.BASE_URL

  return (
    <div className={`page ${styles.homePage}`}>
      <div className={styles.homeBackgroundWrapper}>
        <img
          className={styles.homeBackground}
          src={`${base}assets/background.png`}
          alt="background"
        />
        <div className={styles.homeOverlay}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-11 col-md-10 col-lg-8 offset-1">
                <h1 className={styles.homeWelcome}>Welcome</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home