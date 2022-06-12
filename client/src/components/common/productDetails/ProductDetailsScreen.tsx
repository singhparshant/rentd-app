import React from 'react'
import { useParams } from 'react-router-dom';

export default function Product() {

  const { id } = useParams<any>();

  return (
    <h1>Product with id: "{id}"</h1>
  )
}
