import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { token } = useAuth();

  if (cart.length === 0) return <p>Tu carrito está vacío</p>;

  const finalizarPedido = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });

      if (!response.ok) throw new Error("Error al crear pedido");

      const data = await response.json();
      alert(`Pedido creado con éxito. ID: ${data.id}`);
      clearCart();
    } catch (error) {
      alert("Hubo un problema al procesar tu pedido");
      console.error(error);
    }
  };

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
      <button onClick={finalizarPedido}>Finalizar pedido</button>
    </div>
  );
};

export default Carrito;

