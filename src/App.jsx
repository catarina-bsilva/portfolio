import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import { LanguageContext } from '../src/context/LanguageContext'
import { ActualProjectContext } from './context/ActualProjectContext'

import Header from "./components/layout/Header"
import AboutMe from "./components/pages/AboutMe"
import Projects from "./components/pages/Projects"
import Project from "./components/pages/Project"

import './styles/app.sass'

function App() {

  const [Language, setLanguage] = useState('EN')
  const [ActualProject, setActualProject] = useState(0)

  return (
    <LanguageContext.Provider value={[Language, setLanguage]}>
      <ActualProjectContext.Provider value={[ActualProject, setActualProject]}>
        <div className="App">
          <header>
            <Header/>
          </header>
          <Routes>
            <Route path="/" element={<main id="HomePage">
              <div id="InitialPage">
                {Language === 'EN' ? (<h1 className="EN">I'm Catarina Silva, <br/><span> Transform Design into Functional Websites !</span></h1>) : (<h1 className="PT">Sou a Catarina Silva, <br/> <span> Transformo Design em Websites funcionais !</span> </h1>)}
              </div>
            </main>}/>
            <Route path="/AboutMe" element={<AboutMe />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Project" element={<Project />} />
          </Routes>
        </div>
      </ActualProjectContext.Provider>
    </LanguageContext.Provider>
  )
}

export default App