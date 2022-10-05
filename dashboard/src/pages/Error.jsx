import { Link } from "react-router-dom";
import '../../public/css/Error.css'

function Error() {
    return (
        <>
            <div className="div-error">
                <p className="error">404</p>
                <p className="not">Not Found</p>
                <Link className="back" to="/">Volver</Link>
            </div>
        </>)
}
export default Error;