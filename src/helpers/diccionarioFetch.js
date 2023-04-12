
const getFetch = async (url, prop) => {
    const request = await fetch(url);
    const response = await request.json();
    return typeof prop == "string" ? response[prop] : response;
}

const diccionario = {
    getFetch: getFetch,
}

export default diccionario