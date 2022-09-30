import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { oneUser } from '../services/users'

function UserDetail() {
    const { id } = useParams()
    const [user, setUser] = useState([])
    useEffect(() => {
        oneUser(id).then(setUser)
    }, [id])

    return (
        <>
            <p>{user.nombre}</p>
            <p>Id: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.telefono ? user.telefono : "Sin teléfono"}</p>
            <p>Avatar:</p>
            <picture>
                <img src={user.imagen} alt={`avatar-${user.nombre}`} />
            </picture>
        </>
    )
}


export default UserDetail;