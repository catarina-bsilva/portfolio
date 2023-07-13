import { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'

import { BsInstagram, BsLinkedin, BsGithub, BsDownload, BsGit, BsBootstrap } from 'react-icons/bs'
import { FaSass, FaHtml5, FaCss3Alt, FaVuejs, FaReact } from 'react-icons/fa'
import { DiJavascript1 } from 'react-icons/di'
import { BiCopy, BiWindowOpen } from 'react-icons/bi'

import CVEN from './CV_EN.pdf'
import CVPT from './CV_PT.pdf'
import Foto from '../../img/foto-perfil.png'

import '../../styles/aboutme.sass'

const AboutMe = () => {
  
  const [Language, setLanguage] = useContext(LanguageContext)

  const CopyEmail = (event) => {
    event.preventDefault();
    
    // Copia o texto do parágrafo com id "Email" para a área de transferência
    const emailText = document.getElementById("Email").innerText.trim();
    navigator.clipboard.writeText(emailText)
      .then(() => {
        console.log("Texto copiado para a área de transferência: ", emailText);
        // Adicione aqui a lógica para exibir um alerta ou mensagem informando ao usuário que o texto foi copiado com sucesso
      })
      .catch((err) => {
        console.error("Erro ao copiar texto para a área de transferência: ", err);
        // Adicione aqui a lógica para exibir um alerta ou mensagem informando ao usuário que ocorreu um erro ao copiar o texto
      })
  }

  return (
    <div id='AboutMe'>
      <main id='MainAboutMe'>
        <section className='section'>
          <div id='Contacts'>
            <h3>Email:</h3>
            <p id='Email'>work@catarinasilva.com <button onClick={CopyEmail}><BiCopy/></button></p>
            {Language === 'EN' ? (<h3 className='EN'>Phone Number:</h3>) : (<h3>Número de Telefone:</h3>)}
            <p>(+41) 76 815 48 02</p>
            {Language === 'EN' ? (<h3 className='EN'>Location:</h3>) : (<h3>Localização:</h3>)}
            {Language === 'EN' ? (<p className='EN'>Zurich, Switzerland</p>) : (<p className='EN'>Zurique, Suíça</p>)}
          </div>
          <div id='SocialNetwork'>
            {Language === 'EN' ? (<h3 className='EN'>Social Network:</h3>) : (<h3>Redes Sociais:</h3>)}
            <ul>
              <li id='Linkedin'><a href="https://www.linkedin.com/in/catabsilva" target='_blank'><BsLinkedin/></a></li>
              <li id='Github'><a href="https://github.com/catarina-bsilva" target='_blank'><BsGithub/></a></li>
            </ul>
          </div>
        </section>
        <section>
          <div className="HeaderAboutMe">
            <h2>Catarina Silva</h2>
          </div>
          <div id='Foto'>
            <img src={Foto} alt="Foto de Perfil" />
          </div>
          <div className='HeaderAboutMe'>
            {Language === 'EN' ? (<button className="CV"><a href={CVEN} target="_blank" rel="noopener noreferrer"><BiWindowOpen className='CvBtn'/></a>My CV<a href={CVEN} download><BsDownload className='CvBtn'/></a></button>) : 
            (<button className="CV"><a href={CVPT} target="_blank" rel="noopener noreferrer"><BiWindowOpen className='CvBtn'/></a>Meu CV<a href={CVPT} download><BsDownload className='CvBtn'/></a></button>)}
          </div>
        </section>
        <section>
          <div id="Technologies">
            <ul>
              <li id='Html'><FaHtml5/></li>
              <li id='Css'><FaCss3Alt/></li>
              <li id='JavaScript'><DiJavascript1/></li>
              <li id='VueJs'><FaVuejs/></li>
              <li id='React'><FaReact/></li>
              <li id='Sass'><FaSass/></li>
              <li id='Bootstrap'><BsBootstrap/></li>
              <li id='Git'><BsGit/></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutMe