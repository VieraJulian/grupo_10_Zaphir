const baseURL="http://localhost:3000/api/products"

export async function productsApi(){
    let query = await fetch(baseURL)
    let data = await query.json()
    return data     
}