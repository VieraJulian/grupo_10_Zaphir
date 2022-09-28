let endpoint = await fetch("http://localhost:3000/api/products/");

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <h2>Cantidad de productos: {data.count}</h2>
            </div>
            <div>
                <h2>Cantidad de categorias:</h2>
                {
                    data.categories.length
                }
            </div>
            <div>
                <h2>Productos por categorias:</h2>
                {
                    data.categories.map((c, i) => <li key={i}>{c}: {data.countByCategory[c]}</li>)
                }
            </div>
            <div>
                <h2>Productos:</h2>
                {
                    data.products.map((product, index) => <li key={index}>{product.nombre}</li>)
                }
            </div>
            <div>
                <h2>Último producto</h2>
            </div>
        </>)
}

export default Dashboard;