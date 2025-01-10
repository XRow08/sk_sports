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
