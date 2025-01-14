import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useAuthStore } from "@/store";
import { ICreateUser, ILogin, IUser } from "@/interfaces";
import { AuthService, UserService } from "@/services";
import { StorageHelper } from "@/helpers";
import toast from "react-hot-toast";

interface AuthContextData {
  user: IUser | undefined;
  loading: boolean;
  onLogin: (values: ILogin) => Promise<void>;
  onLogout: () => void;
  onSignup: (values: ICreateUser) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren) {
  const { user, setUser, setIsAnimate, setStepAuth, setShowAuth } =
    useAuthStore();
  const [loading, setLoading] = useState(true);

  function onClose() {
    setStepAuth(0);
    setIsAnimate(false);
    const closeTimer = setTimeout(() => {
      setShowAuth(false);
    }, 300);
    return () => clearTimeout(closeTimer);
  }

  const onLogin = async (values: ILogin) => {
    try {
      const login = await AuthService.login(values);
      setCookie(null, "authToken", login.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      StorageHelper.setItem("user", login.user);
      setUser(login.user);
      toast.success("Logado com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Credenciais Invalidas!");
      console.error("Erro ao fazer login:", error);
    }
  };

  const onSignup = async (values: any) => {
    try {
      delete values.re_password;
      await UserService.createOne(values);
      toast.success("Usuario criado com sucesso!");
      setStepAuth(0);
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  const onLogout = (): void => {
    destroyCookie(null, "authToken");
    setUser(undefined);
  };

  useEffect(() => {
    async function getData() {
      const { authToken } = parseCookies();
      if (!authToken) return setLoading(false);
      const localUser = StorageHelper.getItem("user");
      if (!localUser) return setLoading(false);
      const user = await UserService.findOneById(localUser.id);
      setUser(user);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, onLogin, onLogout, onSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
