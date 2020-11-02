import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Header(){
    return (
        <p className="header-title">_Github-Profile-Comparison <FontAwesomeIcon icon={faGithub} /></p> 
    );
}

export default Header;