import React from "react";
import { useCart } from "../context/CartContext";

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) return <p>Tu carrito está vacío</p>;

  return (
    <div>
      <h1>Carrito de compras</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.nombre}</strong> - ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}
            <div>
              <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
              <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button onClick={() => alert("Acá llamamos al backend POST /api/pedidos")}>
        Finalizar pedido
      </button>
    </div>
  );
};

export default Carrito;
