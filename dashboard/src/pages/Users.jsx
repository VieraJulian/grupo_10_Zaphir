import { Link } from 'react-router-dom'
import { allUsers } from '../services/users'
import '../../public/css/Users-mobile.css'
import '../../public/css/Users-desktop.css'
let users = await allUsers();
const lastUser = users.users[users.users.length - 1]

function Users() {
    console.log(users)
    return (
        <div className='main'>
            <div className='cont-users'>
                <div className='div-cont-user'>
                    <p className='top-p-user'>Usuarios:</p>
                    <ul>
                        {users.users.map((u, i) => <li className="li-users" key={i}><Link to={`/user/${u.id}`}>{u.nombre}</Link></li>)}
                    </ul>
                </div>
                <div className='div-cont-user'>
                    <p className='top-p-user'>Último usuario:</p>
                    <p className='last-p-user'>Id: <span className='span-user'>{lastUser.id}</span></p>
                    <p className='last-p-user'>Nombre: <span className='span-user'>{lastUser.nombre}</span></p>
                    <p className='last-p-user'>Email: <span className='span-user'>{lastUser.email}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Users;