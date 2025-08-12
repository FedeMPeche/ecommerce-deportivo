import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  precio: z.number().min(1, "El precio debe ser mayor que cero"),
  imagenUrl: z.string().url("Debe ser una URL válida"),
  stock: z.number().int().min(0, "Stock no puede ser negativo"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div>
        <label>Nombre</label>
        <input {...register("nombre")} />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
      </div>

      <div>
        <label>Descripción</label>
        <textarea {...register("descripcion")} />
        {errors.descripcion && <p className="error">{errors.descripcion.message}</p>}
      </div>

      <div>
        <label>Precio</label>
        <input type="number" step="0.01" {...register("precio", { valueAsNumber: true })} />
        {errors.precio && <p className="error">{errors.precio.message}</p>}
      </div>

      <div>
        <label>URL Imagen</label>
        <input {...register("imagenUrl")} />
        {errors.imagenUrl && <p className="error">{errors.imagenUrl.message}</p>}
      </div>

      <div>
        <label>Stock</label>
        <input type="number" {...register("stock", { valueAsNumber: true })} />
        {errors.stock && <p className="error">{errors.stock.message}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
