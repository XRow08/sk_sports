import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { HeaderAuth } from "./HeaderAuth";
import { Login } from "./Login";

export function AuthModal() {
  const {
    showAuth,
    setShowAuth,
    setIsAnimate,
    isAnimate,
    setStepAuth,
    stepAuth,
  } = useAuthStore();

  useEffect(() => {
    if (showAuth) {
      const timer = setTimeout(() => {
        setIsAnimate(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showAuth]);

  function onClose() {
    setStepAuth(0);
    setIsAnimate(false);
    const closeTimer = setTimeout(() => {
      setShowAuth(false);
    }, 300);
    return () => clearTimeout(closeTimer);
  }

  if (!showAuth) return <></>;

  const content: any = {
    0: Login,
  };
  const RenderContent = content[stepAuth];

  /* ${
          isAnimate ? "opacity-100" : "opacity-0"
        } */
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
