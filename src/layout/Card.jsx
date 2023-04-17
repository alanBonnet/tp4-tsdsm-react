import React, { useRef, useState, useEffect } from 'react'

const Card = ({ img, title = "title", description = "description", children, classCard = "" }) => {
    const [contenidoMostrado, setContenidoMostrado] = useState(false);
    const cardBody = useRef()
    useEffect(() => {
        cardBody.current.style = "display: none;height:0%"
    }, [])
    
    const mostrarContenido = () => {
        if (!contenidoMostrado) {
            cardBody.current.style = "display:block"

            cardBody.current.style = "animation-name:letrasCreciendo;animation-duration:.7s;animation-iteration-count:1";
            setContenidoMostrado(true)
        }
    }
    const ocultarContenido = () => {
        if(contenidoMostrado) {
            cardBody.current.style = "animation-name:letrasDecreciendo;animation-duration:.7s;animation-iteration-count:1";
            cardBody.current.style = "display:none"
            setTimeout(()=>{
            },650)
            setContenidoMostrado(false)
        }
    }
    return (
        <div className={`card ${classCard}`} onMouseLeave={ocultarContenido} >
            {img && <img src={img} className="card-img-top p-2 rounded-pill" alt="..." onMouseEnter={mostrarContenido} />}

            <div className="card-body" ref={cardBody} >
                {!children &&
                    <>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </>
                }
                {children && children}
            </div>
        </div>
    )
}

export default Card