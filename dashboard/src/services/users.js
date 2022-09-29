const base = "http://localhost:3000/api/users/"

export async function allUsers() {
    try {
        let query = await fetch(base)
        let data = await query.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function oneUser(id) {
    try {
        let endpoint = `${base}/${id}`
        let query = await fetch(endpoint)
        let data = await query.json();
        return data
    } catch (error) {
        console.log(error)
    }
}