"use client";
import { Button } from "@/components/Button";
import { MoreIcon } from "@/components/Icons";
import { Input, TextArea } from "@/components/Input";
import { CheckBox } from "@/components/Input/Checkbox";
import { categorieList, createProductInputs, sizeList } from "@/constants";
import { FormatNumber } from "@/helpers";
import { ICreateProduct } from "@/interfaces";
import { ProductService, UploadService } from "@/services";
import { createProductSchema } from "@/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ProductCreateAdmin() {
  const [categories, setCategories] = useState<any>([]);
  const [size, setSizes] = useState<any>([]);
  const [images, setImages] = useState<any[]>([]);
  const { formatToBRL } = FormatNumber;
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

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  async function onCreate(values: any) {
    try {
      const formData = new FormData();
      formData.append("file", images[0]);
      const hasImages = images.length > 0;
      const image_url = hasImages ? await UploadService.upload(formData) : null;
      const payload = { ...values, categories, size, image_url };
      console.log(payload);
      const newProduct = await ProductService.createOne(payload);
      toast.success("Produto criado com sucesso!");

      try {
        for (const i of images) {
          const formData = new FormData();
          formData.append("file", i);
          await ProductService.createProductImages({
            product_id: newProduct.id,
            file: formData,
          });
        }
      } catch (error) {
        toast.error(
          "Erro ao salvar as imagens, tente novamente ao editar produto."
        );
      }
    } catch (error) {
      console.error(error);
      toast.success("Erro ao criar produto, tente novamente.");
    }
  }

  return (
    <section className="flex flex-col w-[1260px] mb-20">
      <h1 className="text-xl lg:text-[28px] font-bold w-full text-center">
        Adicionar novo produto
      </h1>

      <form
        onSubmit={handleSubmit(onCreate)}
        className="p-3 py-8 border border-neutral_6 rounded mt-8"
      >
        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-4 w-full">
            <Controller
              name="name"
              control={control}
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

            <Controller
              name="description"
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

          <div className="w-full flex flex-col gap-4">
            <CheckBox
              onChangeSelected={setCategories}
              label="Selecione a categoria:"
              itens={categorieList}
            />

            <CheckBox
              onChangeSelected={setSizes}
              label="Selecione o tamanho das roupas:"
              itens={sizeList}
            />
          </div>
        </div>

        <div className="w-full bg-neutral_4 h-[1px] my-8" />

        <div className="grid grid-cols-2 gap-4 w-full">
          {createProductInputs.map((e) => (
            <Controller
              key={e.name}
              name={e.name as any}
              control={control}
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

        <div className="w-full bg-neutral_4 h-[1px] my-8" />

        <div className="flex items-center gap-4 w-full">
          <Controller
            name="discount"
            control={control}
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
                label="Valor descontado"
                placeholder="R$ 00,00"
                errors={errors.price?.message}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
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

        <div className="flex items-center gap-4 h-[80px] mt-10">
          {images.map((e, index) => (
            <div className="w-[80px] h-full relative">
              <div
                onClick={() => handleRemoveImage(index)}
                className="bg-neutral_2 rounded-full w-6 h-6 flex items-center justify-center absolute -top-2 -right-2 cursor-pointer border border-neutral_6 rotate-45"
              >
                <MoreIcon />
              </div>
              <Image
                key={index}
                src={URL.createObjectURL(e)}
                alt={`Preview ${index + 1}`}
                width={10000}
                height={10000}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
          <label className="relative bg-neutral_11 w-[80px] h-full rounded-lg flex items-center justify-center cursor-pointer">
            <input type="file" className="sr-only" onChange={onImageUpload} />
            <div className="bg-neutral_2 rounded-full w-6 h-6 flex items-center justify-center">
              <MoreIcon />
            </div>
          </label>
        </div>

        <div className="w-full mt-8 flex justify-end">
          <Button bgColor="black" className="w-1/2">
            Confirmar e públicar
          </Button>
        </div>
      </form>
    </section>
  );
}
