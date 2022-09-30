import { Link } from 'react-router-dom'
import { allUsers } from '../services/users'
let users = await allUsers();
const lastUser = users.users[users.users.length - 1] 

function Users() {
    console.log(users)
    return (
        <>
            <div>
                <p>Usuarios:</p>
                <ul>
                    {users.users.map((u, i) => <li key={i}><Link to={`/user/${u.id}`}>{u.nombre}</Link></li>)}
                </ul>
            </div>
            <div>
                <p>Último usuario:</p>
                <p>Id: {lastUser.id}</p>
                <p>Nombre: {lastUser.nombre}</p>
                <p>Email: {lastUser.email}</p>
            </div>
        </>
    )
}

export default Users;