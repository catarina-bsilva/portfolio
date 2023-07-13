import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContext'
import { ActualProjectContext } from '../../context/ActualProjectContext'

import { AiOutlineCloseCircle, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'

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
      const Res = await fetch("http://localhost:3000/Projects")
      const Data = await Res.json()
      const ProjetoAtual = Data[parseInt(ActualProject)]
      setImage(ProjetoAtual.FotosProjecto)
      setTitle(ProjetoAtual.name)
      setLinkPrj(ProjetoAtual.Link)
    }
    fetchProjectData()
  }, [ActualProject])

  useEffect(() => {

    const FotosProjecto = async () => {
      const Res = await fetch("http://localhost:3000/Projects")
      const Data = await Res.json()
      const Fotos = Data[parseInt(ActualProject)].FotosProjecto
      setImage(Fotos)
    }
    
    FotosProjecto()
  }, [])

  useEffect(() => {

    const TituloProjecto = async () => {
      const Res = await fetch("http://localhost:3000/Projects")
      const Data = await Res.json()
      const Titulo = Data[parseInt(ActualProject)].name
      setTitle(Titulo)
    }
    
    TituloProjecto()
  }, [])

  useEffect(() => {

    const LinkProjecto = async () => {
      const Res = await fetch("http://localhost:3000/Projects")
      const Data = await Res.json()
      const LinkSite = Data[parseInt(ActualProject)].Link
      setLinkPrj(LinkSite)
    }
    
    LinkProjecto()
  }, [])


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
          <Link to="/Projects" className='Link'><AiOutlineCloseCircle/></Link>
        </div>
        <div id="FotosProjecto">
          <div className='Foto'><img src={Image.length > 0 && Image[0]} alt="foto" /> <AiOutlineFullscreen className='OpenImage' onClick={() => setFullScreenImage(Image.length > 0 && Image[0])}/></div>
          <div className='Foto'><img src={Image.length > 0 && Image[1]} alt="foto" /> <AiOutlineFullscreen className='OpenImage' onClick={() => setFullScreenImage(Image.length > 0 && Image[1])}/></div>
          <div className='Foto'><img src={Image.length > 0 && Image[2]} alt="foto" /> <AiOutlineFullscreen className='OpenImage' onClick={() => setFullScreenImage(Image.length > 0 && Image[2])}/></div>
          <div className='Foto'><img src={Image.length > 0 && Image[3]} alt="foto" /> <AiOutlineFullscreen className='OpenImage' onClick={() => setFullScreenImage(Image.length > 0 && Image[3])}/></div>
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