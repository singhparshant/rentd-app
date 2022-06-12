import React from 'react'
import { useParams } from 'react-router-dom'

export default function ApplicationDetailsScreen() {

    const {id} = useParams<any>();
    return (
        <h1>Application with id: "{id}"</h1>
    )
}
