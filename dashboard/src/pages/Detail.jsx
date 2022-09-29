import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getOne } from '../services/products'

function Detail() {
    const { id } = useParams()
    const [prod, setProd] = useState([])
    useEffect(() => {
        getOne(id).then(setProd)
    }, [id])

    let talles;
    if (prod.talles) {
        talles = prod.talles.map((t, i) => <li key={i}>{t}</li>)
    }
    let colores;
    if (prod.colores) {
        colores = prod.colores.map((c, i) => <li key={i}>{c}</li>)
    }
    let imagenes
    if (prod.imagenes) {
        imagenes = prod.imagenes.map((image, i) => <img key={i} src={image} alt={image} />)
    }
    return (
        <>
            <Link to="/">Dashboard</Link>
            <p>{prod.nombre}</p>
            <p>Id: {prod.id}</p>
            <p>Descripción: {prod.descripcion}</p>
            <p>Categoria: {prod.categoria}</p>
            <p>Stock: {prod.stock}</p>
            <p>Precio: {prod.precio}</p>
            <p>Descuento: {prod.descuento != null ? prod.descuento : "No hay descuento"}</p>
            <p>Talles:</p>
            <ul>
                {talles}
            </ul>
            <p>Colores:</p>
            <ul>
                {colores}
            </ul>
            <ul>
                {imagenes}
            </ul>
        </>)
}
export default Detail;