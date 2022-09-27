function Dashboard() {
    fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return (
            <>
                <h1>Dashboard</h1>
            </>)
    })
}

export default Dashboard;