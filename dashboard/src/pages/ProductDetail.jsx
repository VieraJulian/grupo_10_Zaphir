import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import '../../public/css/ProductDetail-mobile.css'
import '../../public/css/ProductDetail-desktop.css'
import { getOne } from '../services/products'

function Detail() {
    const { id } = useParams()
    const [prod, setProd] = useState([])
    useEffect(() => {
        getOne(id).then(setProd)
    }, [id])

    let talles;
    if (prod.talles) {
        talles = prod.talles.map((t, i) => <li className="li-ct" key={i}>{t}</li>)
    }
    let colores;
    if (prod.colores) {
        colores = prod.colores.map((c, i) => <li className="li-ct" key={i}>{c}</li>)
    }
    let imagenes
    if (prod.imagenes) {
        imagenes = prod.imagenes.map((image, i) => <li className="li-img" key={i}><img className="img-product" key={i} src={image} alt={image} /></li>)
    }
    return (
        <div className="main">
            <div className="div-cont-product">
                <div className="cont-product">
                    <div className="div-left">
                        <p className="p-product-top">{prod.nombre}</p>
                        <p className="p-product">Id:</p><div className="div-p">{prod.id}</div>
                        <p className="p-product">Descripción:</p><div className="div-p">{prod.descripcion}</div>
                        <p className="p-product">Categoria:</p><div className="div-p">{prod.categoria}</div>
                        <p className="p-product">Stock:</p><div className="div-p">{prod.stock}</div>
                        <p className="p-product">Precio:</p><div className="div-p">{prod.precio}</div>
                        <p className="p-product">Descuento:</p><div className="div-p">{prod.descuento != null ? prod.descuento : "No hay descuento"}</div>
                        <p className="p-product">Talles:</p>
                        <ul className="ul-prod">
                            {talles}
                        </ul>
                        <p className="p-product">Colores:</p>
                        <ul className="ul-prod">
                            {colores}
                        </ul>
                    </div>
                    <div className="div-right">
                        <ul className="ul-images">
                            {imagenes}
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
}
export default Detail;