import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContext'
import { ActualProjectContext } from '../../context/ActualProjectContext'

import { AiOutlineCloseCircle, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import Data from '../../BaseDados.json'
import '../../styles/project.sass'

const Project = (props) => {

  const [Language, setLanguage] = useContext(LanguageContext)
  const [ActualProject, setActualProject] = useContext(ActualProjectContext)
  const [fullScreenImage, setFullScreenImage] = useState(null)
  const [Image, setImage] = useState([])
  const [Title, setTitle] = useState("")
  const [LinkPrj, setLinkPrj] = useState("")
 
  
  useEffect(() => {
    const fetchProjectData = async () => {
      const ProjetoAtual = Data[parseInt(ActualProject)]
      setTitle(ProjetoAtual.name)
      
      const fotos = [
        ProjetoAtual.foto1,
        ProjetoAtual.foto2,
        ProjetoAtual.foto3,
        ProjetoAtual.foto4,
      ].filter(foto => foto);

      setImage(fotos)
      setLinkPrj(ProjetoAtual.Link)
    }
    fetchProjectData()
  }, [ActualProject])


  useEffect(() => {
    const FullScreen = document.getElementById("FullScreen");
    const CloseFullScreen = document.getElementById("CloseFullScreen");

  const handleClick = () => {
    FullScreen.style.display = "none";
  };

  CloseFullScreen.addEventListener("click", handleClick);

  return () => {
    CloseFullScreen.removeEventListener("click", handleClick);
  };
  }, [])

  useEffect(() => {
    var FullScreen = document.getElementById("FullScreen")
    var FullScreenImage = document.getElementById("FullScreenImage")

    if (fullScreenImage) {
      FullScreen.style.display = "block"
      FullScreenImage.src = fullScreenImage
    } else {
      FullScreen.style.display = "none"
      FullScreenImage.src = ""
    }
  }, [fullScreenImage])
  
  useEffect(() => {
    if (fullScreenImage) {
      const FullScreen = document.getElementById("FullScreen");
      const handleClose = () => setFullScreenImage(null);
      FullScreen.addEventListener("click", handleClose);
      return () => FullScreen.removeEventListener("click", handleClose);
    }
  }, [fullScreenImage, setFullScreenImage]);

  return (
    <div id='Project'>
        <div id='HeaderProject'>
          <h1>{Title}</h1>
          <Link to="/Projects" className='Link' onClick={() => setActualProject(0)}><AiOutlineCloseCircle/></Link>
        </div>
        <div id="FotosProjecto">
        {Image.map((foto, index) => (
          <div className='Foto' key={index}>
            <img src={foto} alt={`foto-${index}`} />
            <AiOutlineFullscreen className='OpenImage' onClick={() => setFullScreenImage(foto)} />
          </div>
        ))}
        </div>
        <div id='FullScreen'>
          <AiOutlineFullscreenExit id='CloseFullScreen'/>
          <img src="" alt="" id="FullScreenImage" />
        </div>
        <div id='Link'>
          {Language === 'EN' ? (<a className='EN' href={LinkPrj} target='_blank' > Visit Website </a>) : (<a className='EN' href={LinkPrj} target='_blank'> Visite o Website </a>)}  
        </div>
    </div>
  )
}

export default Project