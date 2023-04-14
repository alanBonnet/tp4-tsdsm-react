
const getFetch = async (url, prop) => {
    const request = await fetch(url);
    const response = await request.json();
    return typeof prop == "string" ? response[prop] : response;
}

const getAllPjs = async (urlBase, limite) => {
    try {
        let pjs = []
        for (let i = 1; i <= limite; i++) {
            const request = await fetch(`${urlBase}/${i}`)
            const response = await request.json();
            pjs.push(response)
        }
        return await Promise.all(pjs)
    } catch (error) {
        const request = await fetch(`${urlBase}/${1}`)
        const response = await request.json();
        return response
    }

}

const diccionario = {
    getFetch: getFetch,
    getAllPjs: getAllPjs,
}

export default diccionario