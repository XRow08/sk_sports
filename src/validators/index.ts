import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("${path} é obrigatório"),
  password: yup.string().required("${path} é obrigatório"),
});

export const signupSchema = yup.object().shape({
  first_name: yup.string().required("Primeiro nome é obrigatório"),
  last_name: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatório"),
});

export const checkoutSchema = yup.object().shape({
  name_complete: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  cellphone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),

  cep: yup.string().required("CEP é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  number: yup.string().required("Numero é obrigatório"),
  district: yup.string().required("Bairro é obrigatório"),
  complement: yup.string().optional(),

  card_number: yup.string().optional(),
  card_name: yup.string().optional(),
  valid_at: yup.string().optional(),
  CVV: yup.string().optional(),
  installments: yup.string().optional(),
});
