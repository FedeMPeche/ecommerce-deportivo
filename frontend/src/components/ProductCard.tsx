import React, { useState } from 'react';
import { Producto } from '../pages/Productos';

interface Props {
  producto: Producto;
}

const ProductCard: React.FC<Props> = ({ producto }) => {
  const [imgSrc, setImgSrc] = useState(
    producto.imagenUrl
      ? `http://localhost:3001${producto.imagenUrl}`
      : '../assets/placeholder.png'
  );

  const handleError = () => {
    setImgSrc('/assets/placeholder.png');
  };

  return (
    <div className="product-card">
      <img
        src={imgSrc}
        alt={producto.nombre}
        onError={handleError}
        className="product-image"
      />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><strong>${producto.precio}</strong></p>
      <p>Stock: {producto.stock}</p>
    </div>
  );
};

export default ProductCard;


