import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  precio: z.number().min(1, "El precio debe ser mayor que cero"),
  stock: z.number().int().min(0, "Stock no puede ser negativo"),
  imagenFile: z
    .any()
    .optional(), // el archivo no se valida aquí, se maneja en backend
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: Partial<ProductFormData> & { imagenUrl?: string };
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) => {
  const [preview, setPreview] = useState<string | null>(
    initialValues?.imagenUrl || null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: initialValues?.nombre || "",
      descripcion: initialValues?.descripcion || "",
      precio: initialValues?.precio || 0,
      stock: initialValues?.stock || 0,
    },
  });

  const imagenFile = watch("imagenFile");

  useEffect(() => {
    if (imagenFile && (imagenFile as FileList).length > 0) {
      const file = (imagenFile as FileList)[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (initialValues?.imagenUrl) {
      setPreview(initialValues.imagenUrl);
    } else {
      setPreview(null);
    }
  }, [imagenFile, initialValues?.imagenUrl]);

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precio", data.precio.toString());
    formData.append("stock", data.stock.toString());

    if (data.imagenFile && (data.imagenFile as FileList).length > 0) {
      formData.append("imagen", (data.imagenFile as FileList)[0]);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="product-form">
      <div>
        <label>Nombre</label>
        <input {...register("nombre")} />
        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
      </div>

      <div>
        <label>Descripción</label>
        <textarea {...register("descripcion")} />
        {errors.descripcion && (
          <p className="error">{errors.descripcion.message}</p>
        )}
      </div>

      <div>
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          {...register("precio", { valueAsNumber: true })}
        />
        {errors.precio && <p className="error">{errors.precio.message}</p>}
      </div>

      <div>
        <label>Imagen</label>
        <input type="file" accept="image/*" {...register("imagenFile")} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </div>

      <div>
        <label>Stock</label>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
        />
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

