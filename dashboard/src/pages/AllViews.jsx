import { Link } from 'react-router-dom'
import '../../public/css/AllViews-mobile.css'
import '../../public/css/AllViews-tablet.css'
import '../../public/css/AllViews-desktop.css'

function AllViews() {
    return (
        <div className="contenedor">
            <picture className="cont-img">
                <img className="logo" src="../../public/img/LogoZP.png" alt="Logo Zaphir" />
            </picture>
            <nav className="nav-icon">
                <Link to="/"><i class="fa-solid fa-house icon"></i></Link>
                <Link to="/products"><i class="fa-solid fa-shirt icon"></i></Link>
                <Link to="/users"><i class="fa-solid fa-users icon"></i></Link>
            </nav>
        </div>
    )
}

export default AllViews