import { Button } from "@/components/Button";
import { CloseIcon, MoreIcon } from "@/components/Icons";
import { Input } from "@/components/Input";
import { SelectRateStars } from "@/components/RatingStars";
import { ProductService, UploadService } from "@/services";
import { useAuthStore, useOrderStore } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function ReviewModal() {
  const { user } = useAuthStore();
  const [rate, setRate] = useState(0);
  const { setShowReview, showReview, productToReview } = useOrderStore();
  const [images, setImages] = useState<any[]>([]);
  const { handleSubmit, control } = useForm();

  async function onCreateReview(values: any) {
    try {
      if (!user || !productToReview) return;
      let newImages = [];
      for (const i of images) {
        const formData = new FormData();
        formData.append("file", i);
        const upload = await UploadService.upload(formData);
        newImages.push(upload);
      }
      const payload = {
        title: values.title,
        product_id: productToReview?.id,
        user_id: user?.id,
        comment: values.comment,
        likes: 0,
        images: newImages,
        rate,
      };
      console.log(payload)
      await ProductService.rateProduct(payload);
      setShowReview(false);
    } catch (error) {
      console.error(error);
    }
  }

  function onClose() {
    setShowReview(false);
  }

  const onImageUpload = (event: any) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setImages((prevImages) => [...prevImages, ...uploadedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (!showReview) return <></>;
  return (
    <div className="fixed top-0 right-0 flex items-center justify-center z-[9999] w-full h-screen bg-[#111113]/90">
      <div className="w-[560px] min-h-[312px] flex flex-col justify-between transition-all duration-300 ease-in-out bg-neutral_1 rounded-xl p-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-bold w-full text-center">
            Escreva uma avaliação
          </h1>
          <CloseIcon onClick={onClose} />
        </div>

        <form
          onSubmit={handleSubmit(onCreateReview)}
          className="flex flex-col gap-6"
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Título do comentário"
                placeholder="Digite o título do comentário"
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Descrição"
                placeholder="Digite uma descrição sobre o produto"
              />
            )}
          />

          <div>
            <h1>Em quantos estrelas avaliaria o produto?</h1>
            <SelectRateStars rate={rate} setRate={setRate} />
          </div>

          <div className="flex items-center gap-4 h-[52px]">
            {images.map((e, index) => (
              <div className="w-[52px] h-full relative">
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
            <label className="relative bg-neutral_11 w-[52px] h-full rounded-lg flex items-center justify-center cursor-pointer">
              <input type="file" className="sr-only" onChange={onImageUpload} />
              <div className="bg-neutral_2 rounded-full w-6 h-6 flex items-center justify-center">
                <MoreIcon />
              </div>
            </label>
          </div>

          <Button type="submit" className="w-full mt-11" bgColor="black">
            Enviar avaliação
          </Button>
        </form>
      </div>
    </div>
  );
}
