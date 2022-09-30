import { getAll } from '../services/products';
import { allUsers } from '../services/users'
import '../../public/css/Home-mobile.css'
import '../../public/css/Home-tablet.css'
import '../../public/css/Home-desktop.css'
let data = await getAll();
let users = await allUsers();

function Dashboard() {
    return (
        <div className='main'>
            <div className="home-cont">
                <div className="div-cont">
                    <p className='top-p'>Total de productos:</p>
                    <p className="bottom-p"> {data.count}</p>
                </div>
                <div className="div-cont">
                    <p className='top-p'>Total de categorias:</p>
                    <p className="bottom-p">{data.categories.length}</p>
                </div>
                <div className="div-cont">
                    <p className='top-p'>Productos por categorias:</p>
                    <ul className='prod-ul'>
                        {data.categories.map((c, i) => <li className="prod-li" key={i}>{c}: <span className='span-cat'>{data.countByCategory[c]}</span></li>)}
                    </ul>
                </div>
                <div className="div-cont">
                    <p className='top-p'>Total de usuarios:</p>
                    <p className="bottom-p">{users.count}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;