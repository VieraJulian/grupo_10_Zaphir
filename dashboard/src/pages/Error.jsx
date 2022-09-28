import { Link } from "react-router-dom";

function Error() {
    return (
        <>
            <Link to="/">Dashboard</Link>
            <p>404</p>
            <p>Not Found</p>
        </>)
}
export default Error;