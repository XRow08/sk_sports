interface StoneItem {
  id: string;
  type: string;
  description: string;
  amount: number;
  quantity: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  code: string;
}

export interface ICreateCard {
  name?: string;
  number: string;
  cvv: string;
  month: number;
  year: number;
}

export interface ICreatePurchase {
  customer: { phone: string; cpf: string; email: string };
  order_id: string;
  cvv: string;
  paymentMethod: string;
  expiration_date?: string;
  token?: string;
  installments?: number;
}

export interface ICreateCardToken {
  name: string;
  number: string;
  cvv: string;
  month: number;
  year: number;
}

export interface IPixResponse {
  success: string;
  text: string;
  data: {
    type: string;
    pay_reference: string;
    pix_qrcode: string;
    pix_emv: string;
    pix_creation_date: string;
    pix_expiration_date: string;
  };
  status: number;
}
