import React, { useEffect, useRef, useState } from 'react'
import diccionario from '../helpers/diccionarioFetch'
import Card from '../layout/Card';
import Loading from '../components/Loading';
import CardPj from '../components/CardPj';

const Home = () => {
    const [personajesRM, setPersonajesRM] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [limite, setLimite] = useState(20);
    const inputCantPjs = useRef()
    const urlBase = 'https://rickandmortyapi.com/api/character';


    const llamado = async () => {
        setIsLoading(true)
        const personajes = await diccionario.getAllPjs(urlBase, limite)
        setPersonajesRM(personajes)
        if (personajes) {
            setIsLoading(false)
            document.styleSheets[0].insertRule(".background::before{filter:blur(.3rem);transition:all 2s}",0)
        }
        // personajesRM.forEach(e => { console.log(e); return e })
    }
    const handleInputCantPjs = (e) => {
        setLimite(parseInt(e.target.value) >= 3 && parseInt(e.target.value) <= 826 ? parseInt(e.target.value) : 3)
    }
    const handleQuitarPj = () => {
        if (limite >= 2) {
            setLimite(limite - 1);
            inputCantPjs.current.value = limite
        }
    }
    const handleAgregarPj = () => {
        if (limite < 826) {
            setLimite(limite + 1);
            inputCantPjs.current.value = limite
        }
    }
    const handleEnter = (e) => {
        if (e.key == 'Enter') { llamado() }
    }
    const eliminarPj = (nombrePersonaje) => {
        const listaSinPersonaje = personajesRM.filter(e => e.name !== nombrePersonaje)
        setPersonajesRM(listaSinPersonaje)
    }



    useEffect(() => {
        inputCantPjs.current.value = limite
    }, [])
    return (
        <div className='row'>
            <div className='my-2 bg-info-subtle py-2 rounded border border-3'>
                <h1 className='text-center'>Rick y Morty</h1>

            </div>
            <div className="mb-2 row">
                <button className="btn btn-info col-8 opacity-75" onClick={e => { llamado() }}>Ver Personajes</button>
                {limite <= 826 &&
                    <button className="btn btn-success col opacity-75" onClick={handleAgregarPj}>+</button>
                }
                {limite >= 2 &&
                    <button className="btn btn-danger col opacity-75" onClick={handleQuitarPj}>-</button>
                }
                <input className='col' type="number" name="" id="" min="3" max="826" ref={inputCantPjs} onInput={handleInputCantPjs} onKeyUpCapture={handleEnter} />
                {isLoading &&
                    <div className="d-flex justify-content-center mt-5">
                        <Loading />
                    </div>
                }
            </div>
            <div className="row scrollable">
            {personajesRM &&
                personajesRM.map((e, i) => {
                    const nombrePersonaje = e.name
                    const origenPersonaje = e.origin.name == "unknown" ? "Desconocido" : e.origin.name;
                    const estadoPersonaje = e.status == "unknown" ? "Desconocido" : e.status;
                    const imgPersonaje = e.image
                    return (
                        <div className="col-3 col-md-2 my-3" key={i}>
                            <CardPj imgPj={imgPersonaje}
                                nombrePj={nombrePersonaje}
                                origenPj={origenPersonaje}
                                estadoPj={estadoPersonaje}
                                eliminarPj={eliminarPj} />
                        </div>
                        // <li key={i}>{e.name}</li>
                    )
                })
            }
            </div>
        </div >
    )
}

export default Home