import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import '../../public/css/UserDetail-mobile.css'
import '../../public/css/UserDetail-desktop.css'
import { oneUser } from '../services/users'

function UserDetail() {
    const { id } = useParams()
    const [user, setUser] = useState([])
    useEffect(() => {
        oneUser(id).then(setUser)
    }, [id])

    return (
        <div className="main-user">
            <div className="cont-user">
                <div className="div-user-left">
                    <p className="p-user-name">{user.nombre}</p>
                    <p className="p-user">Id:</p><div>{user.id}</div>
                    <p className="p-user">Email:</p><div>{user.email}</div>
                    <p className="p-user">Teléfono:</p><div>{user.telefono ? user.telefono : "Sin teléfono"}</div>
                </div>
                <div className="div-user-right">
                    <p className="p-user">Avatar:</p>
                    <picture>
                        <img className="avatar-user" src={user.imagen} alt={`avatar-${user.nombre}`} />
                    </picture>
                </div>
            </div>
        </div>
    )
}


export default UserDetail;