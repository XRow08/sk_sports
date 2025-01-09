import { useEffect, useState } from "react";
import { ProductService } from "services";

export default function useProductRate(productId: string) {
  const [rate, setRate] = useState(0);
  const { findProductRate } = ProductService;

  useEffect(() => {
    async function getBanners() {
      const rate = await findProductRate(productId);
      if (isNaN(rate)) {
        setRate(0);
      } else {
        setRate(rate);
      }
    }
    getBanners();
  }, [setRate]);

  return { rate };
}