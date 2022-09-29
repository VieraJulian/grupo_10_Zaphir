const base = "http://localhost:3000/api/products/"

export async function getAll() {
    try {
        let query = await fetch(base)
        let data = await query.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getOne(id) {
    try {
        let endpoint = `${base}/${id}`
        let query = await fetch(endpoint)
        let data = await query.json();
        return data
    } catch (error) {
        console.log(error)
    }
}