import { Link } from "react-router-dom"
import { getAll } from '../services/products';
import '../../public/css/Products-mobile.css'
import '../../public/css/Products-tablet.css'
import '../../public/css/Products-desktop.css'
let data = await getAll();
const lastProduct = data.products[data.products.length - 1]

function Products() {
    return (
        <div className='main'>
            <div className="prod-cont">
                <div className="div-cont-prod">
                    <p className="top-p-prod">Productos:</p>
                    <ul>
                        {data.products.map((product, index) => <li className="prod-list" key={index}><Link className="a-user" to={`/product/${product.id}`}>{product.nombre}</Link></li>)}
                    </ul>
                </div>
                <div className="div-cont-prod">
                    <p className="top-p-prod">Último producto creado:</p>
                    <p className="last-prod">Id: <span className="span-last">{lastProduct.id}</span></p>
                    <p className="last-prod">Categoria: <span className="span-last">{lastProduct.categoria}</span></p>
                    <p className="last-prod">Nombre: <span className="span-last">{lastProduct.nombre}</span></p>
                    <p className="last-prod">Descripción: <span className="span-last">{lastProduct.descripcion}</span></p>
                    <p className="last-ct">Colores:</p>
                    <ul className="ul-prod">
                        {lastProduct.colores.map((c, i) => <li className="li-ct" key={i}><span className="span-last">{c}</span></li>)}
                    </ul>
                    <p className="last-ct">Talles:</p>
                    <ul className="ul-prod">
                        {lastProduct.talles.map((t, i) => <li className="li-ct" key={i}><span className="span-last">{t}</span></li>)}
                    </ul>
                    <picture className="cont-img-prod">
                        <img className="img-prod" src={lastProduct.imagenes[0]} alt={lastProduct.nombre} />
                    </picture>
                </div>
            </div>
        </div>
    )
}

export default Products