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

interface StoneCustomer {
  id: string;
  name: string;
  email: string;
  code: string;
  document: string;
  type: string;
  delinquent: boolean;
  created_at: Date;
  updated_at: Date;
  phones: {
    mobile_phone: {
      country_code: string;
      number: string;
      area_code: string;
    };
  };
}

export interface ICreateCardToken {
  name: string;
  number: string;
  cvv: string;
  month: number;
  year: number;
}

export interface IPixResponse {
  id: string;
  code: string;
  amount: number;
  currency: string;
  closed: boolean;
  items: StoneItem[];
  customer: StoneCustomer;
  status: string;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  charges: [
    {
      id: string;
      code: string;
      gateway_id: string;
      amount: number;
      status: string;
      currency: string;
      payment_method: string;
      created_at: Date;
      updated_at: Date;
      customer: StoneCustomer;
      last_transaction: {
        pix_provider_tid: string;
        qr_code: string;
        qr_code_url: string;
        expires_at: Date;
        additional_information: [
          {
            name: string;
            value: string;
          }
        ];
        id: string;
        transaction_type: string;
        gateway_id: string;
        amount: number;
        status: string;
        success: boolean;
        created_at: Date;
        updated_at: Date;
        gateway_response: any;
        antifraud_response: any;
        metadata: any;
      };
    }
  ];
}

export interface ICreateCardPix {
  installments: number;
  statement_descriptor: string;
  type: "card" | "pix";
  card_token: string;
}

export interface ICreateCard {
  installments: number;
  document_number: string;
  token: string;
}
