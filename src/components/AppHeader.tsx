import { useEffect } from "react"
import '../styles/header.css'

function AppHeader () {
  useEffect(() => {
    /* const header = document.getElementById('main_header') */
    const title = document.getElementById('header_title')

    window.addEventListener('scroll', () => {
      if(title) {
        title.classList.add('scrolled')
      }
    })
  }, [])

  return (
    <header id="main_header">
      <h1 
        className="gradient-text"
        id="header_title"
      >
        RANKING DE MUSEOS DE LA CDMX
      </h1>
    </header>
  )
}

export default AppHeader