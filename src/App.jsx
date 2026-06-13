import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import MyWork from './pages/MyWork.jsx'
import Program from './pages/Program/Program.jsx'
import Detail from './pages/Program/Detail.jsx'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/myWork" element={<MyWork />} />
          <Route path="/:category" element={<Program />} />
          <Route path="/:category/:type" element={<Program />} />
          <Route path="/:category/item/:id" element={<Detail />} />
          <Route path="/:category/:type/item/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App