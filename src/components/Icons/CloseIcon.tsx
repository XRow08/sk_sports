export function CloseIcon({ onClick }: { onClick: () => void }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <path
        d="M20.3034 9.69733L9.69678 20.3039M20.3034 20.3039L9.69678 9.69727"
        stroke="#60646C"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
