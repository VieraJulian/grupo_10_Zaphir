import { getAll } from '../services/products';
import { allUsers } from '../services/users'
let data = await getAll();
let users = await allUsers();

function Dashboard() {
    return (
        <>
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
                <p>Cantidad de usuarios:</p>
                <p>{users.count}</p>
            </div>
        </>)
}

export default Dashboard;