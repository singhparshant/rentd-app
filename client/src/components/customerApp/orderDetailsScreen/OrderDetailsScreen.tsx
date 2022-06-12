import React from 'react'
import { useParams } from 'react-router-dom'

export default function OrderDetailsScreen() {
    const {id} = useParams<any>();

    return (
        <h1>Order with id: "{id}"</h1>
    )
}
