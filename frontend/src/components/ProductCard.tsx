import React from "react";
import { Producto } from "../pages/Productos";
import { useCart } from "../context/CartContext";

const ProductCard = ({ producto }: { producto: Producto }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={producto.imagenUrl} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><strong>${producto.precio}</strong></p>
      <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default ProductCard;



