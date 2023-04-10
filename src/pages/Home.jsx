import React, { useEffect, useState } from 'react'
import diccionario from '../helpers/diccionarioFetch'
import Card from '../components/Card';

const Home = () => {
    const [personajesRM, setPersonajesRM] = useState([]);
    const urlBase = 'https://rickandmortyapi.com/api/character';

    const llamado = async () => {
        setPersonajesRM(await diccionario.getFetch(urlBase, 'results'))
        personajesRM.forEach(e => { console.log(e); return e })
    }
    useEffect(() => {
        llamado()

    }, [])
    return (
        <div className='row'>
            {personajesRM.map((e, i) => {
                const nombrePersonaje = e.name
                const origenPersonaje = e.origin.name == "unknown" ? "Desconocido" : e.origin.name;
                const imgPersonaje = e.image
                return (
                    <div className="col" key={i}>
                        <Card img={imgPersonaje} title={nombrePersonaje} description={origenPersonaje} />
                    </div>
                    // <li key={i}>{e.name}</li>
                )
            })
            }
        </div >
    )
}

export default Home