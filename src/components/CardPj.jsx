import React from 'react'
import Card from '../layout/Card'

const CardPj = ({ personaje, eliminarPj }) => {
    const nombrePj = personaje.name
    const origenPj = personaje.origin.name == "unknown" ? "Desconocido" : personaje.origin.name;
    const estadoPj = personaje.status == "unknown" ? "Desconocido" : personaje.status;
    const imgPj = personaje.image
    const iconsEstado =
        estadoPj == "Alive" ? <i className="bi bi-heart-fill text-success"></i> :
            estadoPj == "Dead" ? <i className="bi bi-heart text-danger"></i> :
                <i className="bi bi-question-octagon text-warning"></i>

    return (
        <Card img={imgPj} classCard='p-2 border-4 bg-info bg-opacity-25'>
            <h5 className="card-title text-white">{nombrePj}</h5>
            <div className="card-text">
                <span className='text-muted' >Origen :</span>
                <p className='text-white'>{origenPj}</p>
                <span className='text-muted' >Estado :
                    <p className='text-white'>
                        {`${estadoPj} `}
                        {iconsEstado}
                    </p>
                </span>
            </div>
            <div className="text-center">
                <button className="btn btn-outline-danger" onClick={e => { eliminarPj(nombrePj) }}>Eliminar</button>
            </div>
        </Card>
    )
}

export default CardPj