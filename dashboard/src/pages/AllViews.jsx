import { Link } from 'react-router-dom'

function AllViews() {
    return (
        <>
            <picture>
                <img src="../../public/img/LogoZP.png" alt="" />
            </picture>
            <nav>
                <Link to="/"><i class="fa-solid fa-house"></i></Link>
                <Link to="/products"><i class="fa-solid fa-shirt"></i></Link>
                <Link to="/users"><i class="fa-solid fa-users"></i></Link>
            </nav>
        </>
    )
}

export default AllViews