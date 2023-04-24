import React, { useEffect, useRef, useState } from 'react'
import diccionario from '../helpers/diccionarioFetch'
import Loading from '../components/Loading';
import CardPj from '../components/CardPj';

const Home = () => {
    const [personajesRM, setPersonajesRM] = useState([]);//Estado de los personajes
    const [isLoading, setIsLoading] = useState(false);//Estado definiendo la posibilidad de muestreo el componente de loading
    const [limite, setLimite] = useState(20);//Estado "limite" que se usa como máximo de personajes a traer
    const inputCantPjs = useRef()//Referencia al componente Input de la cantidad de personajes
    const urlBase = 'https://rickandmortyapi.com/api/character';

    // llamado settea el cargando a true mientras trae la información de los personajes para luego mostrarlos y ponerle un blur al fondo de pantalla
    const llamado = async () => {
        setIsLoading(true)

        const personajes = await diccionario.getAllPjs(urlBase, limite)

        setPersonajesRM(personajes)

        if (personajes) {
            setIsLoading(false)
            document.styleSheets[0].insertRule(".background::before{filter:blur(.3rem);transition:all 2s}", 0)//agrega un estilo a la clase background y pseudo clase before del mismo el atributo filter con valor blur y una transición
        }
    }
    // Sección de handles
    const handleInputCantPjs = (e) => {//mientras el limite esté dentro del rango permitido el input recibirá valores
        setLimite(parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 826 ? parseInt(e.target.value) : 3)
    }

    const handleQuitarPj = () => {//simple función que decrementa el valor del limite
        if (limite >= 2) {
            setLimite(limite - 1);

        }
    }

    const handleAgregarPj = () => {// simple función que incrementa el valor de limite
        if (limite < 826) {
            setLimite(limite + 1);

        }
    }

    const handleEnter = (e) => {//función que escucha el evento de se presione Enter ejecuta llamado()
        if (e.key == 'Enter') { llamado() }
    }

    // Función eliminar pj
    const eliminarPj = (nombrePersonaje) => {
        const listaSinPersonaje = personajesRM.filter(e => e.name !== nombrePersonaje)
        setPersonajesRM(listaSinPersonaje)
    }
    // useEffect para setteo de input con valor del state limite
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
                {limite >= 2 &&
                    <button className="btn btn-danger col opacity-75" onClick={handleQuitarPj}>-</button>
                }
                {limite <= 826 &&
                    <button className="btn btn-success col opacity-75" onClick={handleAgregarPj}>+</button>
                }
                <input className='col' type="number" name="" id="" min="3" max="826" ref={inputCantPjs} onInput={handleInputCantPjs} onKeyUpCapture={handleEnter} value={limite} />
                {isLoading &&
                    <div className="d-flex justify-content-center mt-5">
                        <Loading />
                    </div>
                }
            </div>
            <div className="row scrollable">
                {personajesRM &&
                    personajesRM.map((e, i) => {

                        return (
                                <div className="col-3 col-md-2 my-3" key={i}>
                                    <CardPj personaje={e} eliminarPj={eliminarPj} />
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