import React from 'react'
import Card from '../layout/Card'

const CardPj = ({ imgPj, nombrePj, estadoPj, origenPj, eliminarPj }) => {
    const iconsEstado =
        estadoPj == "Alive" ? <i className="bi bi-heart-fill text-success"></i> :
            estadoPj == "Dead" ? <i className="bi bi-heart text-danger"></i> :
                <i className="bi bi-question-octagon text-warning"></i>

    return (
        <Card img={imgPj} classCard='p-2 border-4 bg-info bg-opacity-25'>
            <h5 className="card-title">{nombrePj}</h5>
            <div className="card-text">
                <span className='text-muted' >Origen :</span>
                <p>{origenPj}</p>
                <span className='text-muted' >Estado :
                    <p>
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