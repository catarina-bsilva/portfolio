import { useState, useContext, useEffect } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { Link, useLocation } from 'react-router-dom'

import '../../styles/header.sass'

const Navbar = () => {

  const location = useLocation()
  
  useEffect(() => {
    
    const Url = location.pathname === "/" ? "Home" : location.pathname.substring(1)
    const Links = document.querySelectorAll('.Link');
    const LinkToActivate = document.querySelector(`#${Url}`)
    if (LinkToActivate) {
      Links.forEach(link => link.classList.remove('Active'))
      LinkToActivate.classList.add("Active")
    }

  }, [location.pathname])

  useEffect(() => {
    
    const Header = document.getElementById("Header")
    const Url = location.pathname === "/" ? "Home" : location.pathname.substring(1)
    
    if (Url=== "Project") {
      Header.style.display = "none"
    } else {
      Header.style.display = "flex"
    }

  }, [location.pathname])
  
  const [Language, setLanguage] = useContext(LanguageContext)

  const ChangeLanguagePT = () => {
    setLanguage('PT');
  }

  const ChangeLanguageEN = () => {
    setLanguage('EN');
  }

  return (
    <div id='Header'>
      <nav>
        <ul id='Navbar'>
          <li>
            <Link to="/" className='Link EN Active' id='Home'>
              {Language === 'EN' ? ("Home") : ("Página Inicial")}
            </Link>
          </li>
            <span> | </span>
          <li>
            <Link to="/AboutMe" className='Link EN ' id='AboutMe' >
              {Language === 'EN' ? ("About Me") : ("Sobre Mim")}
            </Link>
          </li>
            <span> | </span>
          <li>
            <Link to="/Projects" className='Link EN' id='Projects'>
              {Language === 'EN' ? ("Projects") : ("Projectos")}
            </Link>
          </li>
        </ul>
      </nav>
      <div>
          <h3 onClick={Language === 'EN' ? ChangeLanguagePT : ChangeLanguageEN}>{Language === 'EN' ? ("PT") : ("EN")}</h3>
      </div>
    </div>
  )
}

export default Navbar;