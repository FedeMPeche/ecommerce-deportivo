import React from 'react';
import { productos } from '../data/productos';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  return (
    <div>
      <h1>Productos</h1>
      <div className="productos-container">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
