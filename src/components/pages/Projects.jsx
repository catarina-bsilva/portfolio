import { useState, useContext, useEffect } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import { ActualProjectContext } from '../../context/ActualProjectContext'
import { Link } from 'react-router-dom'

import {BsChevronRight, BsChevronLeft} from 'react-icons/bs'

import '../../styles/projects.sass'
import Data from '../../BaseDados.json'

const Projects = () => {

  const [Language, setLanguage] = useContext(LanguageContext)
  const [ActualProject, setActualProject] = useContext(ActualProjectContext)
  const [FotoPrimeiroProjecto, setFotoPrimeiroProjecto] = useState("")
  const [FotosProjectos, setFotosProjectos] = useState([])
  const [IndexFotos, setIndexFotos] = useState([])

  const DestacaFoto = (src, index) => {

    setFotoPrimeiroProjecto(src)
    setActualProject(index)
    console.log(ActualProject)
  }

  const PrevDestaque = () => {

    const currentIndex = FotosProjectos.indexOf(FotoPrimeiroProjecto)
    const prevIndex = (currentIndex - 1 + FotosProjectos.length) % FotosProjectos.length
    setFotoPrimeiroProjecto(FotosProjectos[prevIndex])
    setActualProject(prevIndex)
  }

  const NextDestaque = () => {

    const currentIndex = FotosProjectos.indexOf(FotoPrimeiroProjecto)
    const nextIndex = (currentIndex + 1) % FotosProjectos.length
    setFotoPrimeiroProjecto(FotosProjectos[nextIndex])
    setActualProject(nextIndex)
  }

  const BdFotoProjecto = async () => {
    const PrimeiraFoto = Data[0].FotoPrincipal
    const Fotos = Data.map((projecto) => projecto.FotoPrincipal)
    const IndexFotos = Data.map((projecto, index) => ({
      index: index,
      foto: projecto.FotoPrincipal
    }))
    setFotoPrimeiroProjecto(PrimeiraFoto)
    setFotosProjectos(Fotos)
    console.log(IndexFotos)
  }

  useEffect(() => {  

    BdFotoProjecto()

  }, [])
  
  return (
    <div id='Projects'>
      <div id='HeaderProjects'>
        {Language === 'EN' ? (<h1 className='EN'>My Projects</h1>) : (<h1>Meus Projectos</h1>)}
      </div>
      <main>
        <div id="Destaque">
          <BsChevronLeft id='Left'onClick={PrevDestaque}/>
          <img src={FotoPrimeiroProjecto} alt="foto" id='FotoPrincipal'/>
          <BsChevronRight id='Right' onClick={NextDestaque}/>
          {Language === 'EN' ? (<Link to="/Project" className='Link EN' id='Project'><button id='Open'>OPEN</button></Link>) : (<Link to="/Project" className='Link' id='Project'><button id='Open'>ABRIR</button></Link>)}
        </div>
        <div id='Miniaturas'>
          {FotosProjectos.map((foto,index )=> <img onClick={() => DestacaFoto(foto, index)} src={foto} alt="foto" key={index}/>)}
        </div>
      </main>
    </div>
  )
}

export default Projects