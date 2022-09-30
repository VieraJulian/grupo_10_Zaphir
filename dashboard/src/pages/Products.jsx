import { Link } from "react-router-dom"
import { getAll } from '../services/products';
let data = await getAll();
const lastProduct = data.products[data.products.length - 1]

function Products() {
    return (
        <>
            <div>
                <p>Productos:</p>
                <ul>
                    {data.products.map((product, index) => <li key={index}><Link to={`/product/${product.id}`}>{product.nombre}</Link></li>)}
                </ul>
            </div>
            <div>
                <p>Último producto creado:</p>
                <p>Id: {lastProduct.id}</p>
                <p>Categoria: {lastProduct.categoria}</p>
                <p>Nombre: {lastProduct.nombre}</p>
                <p>Descripción: {lastProduct.descripcion}</p>
                <p>Colores:</p>
                <ul>
                    {lastProduct.colores.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <p>Talles:</p>
                <ul>
                    {lastProduct.talles.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <picture>
                    <img src={lastProduct.imagenes[0]} alt={lastProduct.nombre} />
                </picture>
            </div> 
        </>
    )
}

export default Products