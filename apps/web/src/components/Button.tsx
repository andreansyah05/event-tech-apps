interface ButtonProps {
  type: "primary" | "white" | "secondary";
  text: string;
  isButtonDisable: boolean;
}

function Button({ type, text, isButtonDisable }: ButtonProps) {
  switch (type) {
    case "primary":
      return (
        <button
          disabled={isButtonDisable}
          className={`font-semibold py-3 px-4 bg-indigo-600 rounded-sm text-white transition-all	 hover:bg-indigo-800 ${isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""}`}
        >
          {text}
        </button>
      );

    case "secondary":
      return (
        <button
          disabled={isButtonDisable}
          className={`font-semibold py-3 px-4 bg-white bg-opacity-25 rounded-sm text-white transition-all	 hover:bg-indigo-800 ${isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""}`}
        >
          {text}
        </button>
      );

    case "white":
      return (
        <button
          disabled={isButtonDisable}
          className={`font-semibold py-3 px-4 bg-white bg-opacity-25 rounded-sm text-white transition-all	 hover:bg-indigo-800 ${isButtonDisable ? "opacity-40 hover:bg-indigo-600" : ""}`}
        >
          {text}
        </button>
      );
  }
}

export default Button;
