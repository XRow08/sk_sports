"use client";
import { ProductService, UploadService } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IProduct } from "@/interfaces";
import { Controller, useForm } from "react-hook-form";
import { Input, TextArea } from "@/components/Input";
import { FormatNumber } from "@/helpers";
import { createProductSchema } from "@/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { MoreIcon } from "@/components/Icons";
import { CheckBox } from "@/components/Input/Checkbox";
import { categorieList, createProductInputs, sizeList } from "@/constants";
import { Button } from "@/components/Button";

type Props = { params: { slug: string } };

export default function ProductPageAdmin({ params }: Props) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [size, setSizes] = useState<any[]>([]);
  const [imageMain, setImageMain] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const { formatToBRL, formatToPercentage } = FormatNumber;

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await ProductService.findOneBySlug(params.slug);
        setProduct(data);
        setCategories(data.categories || []);
        setImages(data.images || []);
        setImageMain(data.image_url || null);
        setSizes(data.size || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.slug]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createProductSchema) });

  const onImageUpload = (event: any) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...uploadedFiles]);
    }
  };

  const onImageMainUpload = (event: any) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setImageMain(uploadedFiles[0]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (loading || !product) {
    return <div>Carregando...</div>;
  }

  async function onSubmit(values: any) {
    try {
      if (!product) return;
      let image_url = product.image_url;
      if (image_url !== imageMain) {
        const formData = new FormData();
        formData.append("file", imageMain);
        image_url = await UploadService.upload(formData);
      }
      const payload = { ...values, categories, size, image_url };
      await ProductService.updateById(product.id, payload);
      try {
        const removedImages = product.images.filter(
          (e: string) => !images.includes(e)
        );

        if (removedImages.length > 0) {
          for (const imageUrl of removedImages) {
            if (!imageUrl) continue;
            const productImages = await ProductService.findProductImages(
              product.id
            );
            const imageToDelete = productImages.find(
              (img) => img.file.url === imageUrl
            );
            if (imageToDelete) {
              await ProductService.deleteProductImages(imageToDelete.id);
            } else {
              console.log(`Imagem não encontrada para exclusão: ${imageUrl}`);
            }
          }
        }

        const newImages = images.filter((image) => {
          return image instanceof File;
        });

        if (newImages.length > 0) {
          for (const image of newImages) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("product_id", product.id);
            await ProductService.createProductImages(formData);
          }
        }

        if (newImages.length > 0) {
          toast.success("Produto e novas imagens atualizados com sucesso!");
        } else {
          toast.success("Produto atualizado com sucesso!");
        }
      } catch (error) {
        toast.error("Erro ao salvar as imagens, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar produto, tente novamente.");
    }
  }

  return (
    <section className="flex flex-col min-h-screen h-full w-[1260px] mb-20">
      <h1 className="text-xl lg:text-[28px] font-bold w-full text-center">
        Editar produto
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start gap-8 mt-10 max-w-[1260px] w-full h-full px-4 py-8 rounded-lg bg-neutral_2 border border-neutral_6"
      >
        <div className="w-full h-full">
          <div className="flex flex-col h-full w-full items-start gap-4">
            {imageMain && (
              <label className="cursor-pointer">
                <Image
                  src={
                    imageMain instanceof File
                      ? URL.createObjectURL(imageMain)
                      : imageMain
                  }
                  alt={product.name}
                  width={10000}
                  height={10000}
                  draggable={false}
                  className="min-w-[343px] w-[343px] lg:w-full h-[343px] lg:h-[560px] rounded-lg object-cover"
                />
                <input
                  type="file"
                  className="sr-only"
                  onChange={onImageMainUpload}
                />
              </label>
            )}
            <div className="grid grid-cols-6 gap-4 w-full h-full">
              {images.map((e, index) => (
                <div key={index} className="w-[80px] h-full relative">
                  <div
                    onClick={() => handleRemoveImage(index)}
                    className="bg-neutral_2 rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2 cursor-pointer border border-neutral_6 rotate-45"
                  >
                    <MoreIcon />
                  </div>
                  <Image
                    key={index}
                    src={e instanceof File ? URL.createObjectURL(e) : e}
                    alt={`Preview ${index + 1}`}
                    width={10000}
                    height={10000}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              ))}
              <label className="relative bg-neutral_11 w-[80px] h-[80px] rounded-lg flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="sr-only"
                  onChange={onImageUpload}
                />
                <div className="bg-neutral_2 rounded-full w-6 h-6 flex items-center justify-center">
                  <MoreIcon />
                </div>
              </label>
            </div>

            <div className="flex items-center gap-4 w-full">
              <Controller
                name="discount"
                control={control}
                defaultValue={product.discount}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    value={
                      field.value !== undefined && field.value !== null
                        ? formatToPercentage(field.value)
                        : ""
                    }
                    onChange={({ target }) => {
                      const rawValue = target.value.replace(/[^0-9]/g, "");
                      const numericValue = parseFloat(rawValue) / 100;
                      field.onChange(numericValue);
                    }}
                    label="Valor descontado"
                    placeholder="0,00%"
                    errors={errors.discount?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                defaultValue={product.price}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    value={
                      field.value !== undefined && field.value !== null
                        ? formatToBRL(field.value)
                        : ""
                    }
                    onChange={({ target }) => {
                      const rawValue = target.value.replace(/[^0-9]/g, "");
                      const numericValue = parseFloat(rawValue) / 100;
                      field.onChange(numericValue);
                    }}
                    label="Valor total do produto"
                    placeholder="R$ 00,00"
                    errors={errors.price?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="description"
              defaultValue={product.description}
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Descrição do produto"
                  placeholder="Digite sobre o produto"
                  errors={errors.description?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Controller
            name="name"
            control={control}
            defaultValue={product.name}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Nome do produto"
                placeholder="Nome do produto"
                errors={errors.name?.message}
              />
            )}
          />

          <div className="w-full flex flex-col gap-4">
            <CheckBox
              onChangeSelected={setCategories}
              selected={categories}
              label="Selecione a categoria:"
              itens={categorieList}
            />

            <CheckBox
              onChangeSelected={setSizes}
              selected={size}
              label="Selecione o tamanho das roupas:"
              itens={sizeList}
            />
          </div>

          <div className="flex flex-col gap-4 w-full">
            {createProductInputs.map((e) => (
              <Controller
                key={e.name}
                name={e.name as any}
                control={control}
                defaultValue={product[e.name as keyof IProduct]}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label={e.label}
                    placeholder={e.placeholder}
                    errors={errors[e.name as keyof typeof errors]?.message}
                  />
                )}
              />
            ))}
          </div>
          <div className="w-full mt-8 flex justify-end">
            <Button bgColor="black" className="w-full">
              Confirmar e públicar
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
