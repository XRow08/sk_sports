import { useAuthStore } from "@/store";
import { HeaderAuth } from "./HeaderAuth";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ForgotPass } from "./ForgotPass";
import { EnterCode } from "./EnterCode";
import { ResetPass } from "./ResetPass";

export function AuthModal() {
  const { showAuth, setShowAuth, setStepAuth, stepAuth } = useAuthStore();

  function onClose() {
    setStepAuth(0);
    setShowAuth(false);
  }

  if (!showAuth) return <></>;

  const content: any = {
    0: Login,
    1: Signup,
    2: ForgotPass,
    3: EnterCode,
    4: ResetPass,
  };
  const RenderContent = content[stepAuth];

  return (
    <div className="fixed top-0 right-0 flex items-center justify-center z-[9999] w-full h-screen bg-[#111113]/90">
      <div
        className={`w-[560px] min-h-[312px] flex flex-col justify-between transition-all duration-300 ease-in-out bg-neutral_1 rounded-xl p-5`}
      >
        <HeaderAuth
          step={stepAuth}
          setStepAuth={setStepAuth}
          onClose={onClose}
        />
        <RenderContent />
      </div>
    </div>
  );
}
