import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});
