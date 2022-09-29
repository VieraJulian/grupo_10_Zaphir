import { Link } from 'react-router-dom'
import { getAll } from '../services/products';
let data = await getAll();

function Dashboard() {
    const lastProduct = data.products[data.products.length - 1]
    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <p>Cantidad de productos:</p>
                <p> {data.count}</p>
            </div>
            <div>
                <p>Cantidad de categorias:</p>
                <p>{data.categories.length}</p>
            </div>
            <div>
                <p>Productos por categorias:</p>
                <ul>
                    {data.categories.map((c, i) => <li key={i}>{c}: {data.countByCategory[c]}</li>)}
                </ul>
            </div>
            <div>
                <p>Productos:</p>
                <ul>
                    {data.products.map((product, index) => <li key={index}><Link to={`/detail/${product.id}`}>{product.nombre}</Link></li>)}
                </ul>
            </div>
            <div>
                <p>Último producto</p>
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
        </>)
}

export default Dashboard;