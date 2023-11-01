
import biomaLogo from '../../assets/biomaLogo.png'
import '../styles/BiomaLogo.css'

export const BiomaLogo = ({style}) => {
  return (
    <div className="logo">
          <img src={biomaLogo} alt="biomaLogo" style={style} />
        </div>
  )
} 

export default BiomaLogo;
