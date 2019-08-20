import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/coaster-card.css'

import Button from 'react-bootstrap/Button'


const CoasterCard = ({ title, description, imageUrl, _id }) => {

    return (
        <div className="col-md-3">
            <article className="coaster-card">
                <img src={imageUrl} alt={title} />
                <h4>{title}</h4>
                <hr></hr>
                <Link to={`/coasters/${_id}`}>
                    <Button variant="dark" size="sm" block>Ver detalles</Button>
                </Link>
                <p>{description}</p>
            </article>
        </div >
    )
}

export default CoasterCard