import React from 'react';

type Props = {
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
    stock: number;
  };
};

export default function ProductCard({ producto }: Props) {
  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} width="200" />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
    </div>
  );
}
