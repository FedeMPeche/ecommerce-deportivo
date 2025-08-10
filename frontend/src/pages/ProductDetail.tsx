import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.nombre}</h1>
      <img
        src={product.imagen}
        alt={product.nombre}
        style={{ maxWidth: "300px" }}
      />
      <p>{product.descripcion}</p>
      <p><strong>Precio:</strong> ${product.precio}</p>
    </div>
  );
};

export default ProductDetail;
