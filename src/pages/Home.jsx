import React, { useEffect, useState } from 'react'
import diccionario from '../helpers/diccionarioFetch'
import Card from '../layout/Card';
import Loading from '../components/Loading';
import CardPj from '../components/CardPj';

const Home = () => {
    const [personajesRM, setPersonajesRM] = useState([]);
    const urlBase = 'https://rickandmortyapi.com/api/character';

    const llamado = async () => {
        setTimeout(async () => {
            setPersonajesRM(await diccionario.getFetch(urlBase, 'results'))
        }, 2000)
        // personajesRM.forEach(e => { console.log(e); return e })
    }

    const eliminarPj = (nombrePersonaje) => {
        const listaSinPersonaje = personajesRM.filter(e => e.name !== nombrePersonaje)
        setPersonajesRM(listaSinPersonaje)
    }

    useEffect(() => {
        llamado()

    }, [])
    return (
        <div className='row'>
            <div className='my-2 bg-info-subtle py-2 rounded border border-3'>
                <h1 className='text-center'>Rick y Morty</h1>

            </div>
            {!personajesRM.length &&
                <div className="d-flex justify-content-center mt-5">
                    <Loading />
                </div>
            }
            {personajesRM &&
                personajesRM.map((e, i) => {
                    const nombrePersonaje = e.name
                    const origenPersonaje = e.origin.name == "unknown" ? "Desconocido" : e.origin.name;
                    const estadoPersonaje = e.status == "unknown" ? "Desconocido" : e.status;
                    const imgPersonaje = e.image
                    return (
                        <div className="col my-3" key={i}>
                            <CardPj imgPj={imgPersonaje} nombrePj={nombrePersonaje} origenPj={origenPersonaje} estadoPj={estadoPersonaje} />
                        </div>
                        // <li key={i}>{e.name}</li>
                    )
                })
            }
        </div >
    )
}

export default Home