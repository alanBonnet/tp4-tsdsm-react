import React from 'react'

const Card = ({ img, title = "title", description = "description", children, classCard = "" }) => {
    return (
        <div className={`card ${classCard}`} >
            {img && <img src={img} className="card-img-top p-2 rounded-pill" alt="..." />}

            <div className="card-body">
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