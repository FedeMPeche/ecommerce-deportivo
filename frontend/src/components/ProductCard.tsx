import React from "react";
import { Link } from "react-router-dom";

type Props = {
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    categoria: string;
    stock: number;
  };
};

export default function ProductCard({ producto }: Props) {
  return (
    <Link
      to={`/productos/${producto.id}`}
      style={{ textDecoration: "none", color: "inherit" }}>
      <div className="product-card">
        <img src={producto.imagenUrl} alt={producto.nombre} className="product-image"/>
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p>Precio: ${producto.precio}</p>
        <p>Stock: {producto.stock}</p>
      </div>
    </Link>
  );
}
