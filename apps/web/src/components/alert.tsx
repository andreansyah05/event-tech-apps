export interface Toast {
  type: "SUCCESS" | "FAILED";
  showToast: boolean;
  highlightText: string;
  text: string;
}

function Toast({ type, showToast, highlightText, text }: Toast) {
  switch (type) {
    case "SUCCESS":
      return (
        <div
          className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 mb-4 text-green-800 rounded-lg bg-green-50 w-fit ${
            showToast
              ? "opacity-100 translate-y-0 shadow-md"
              : "opacity-0 -translate-y-5"
          } transition-all duration-250 ease-in-out`}
          role="alert"
        >
          <span className="font-medium">{highlightText}</span> {text}
        </div>
      );

    case "FAILED":
      return (
        <div
          className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 mb-4 text-red-800 rounded-lg bg-red-50 w-fit ${
            showToast
              ? "opacity-100 translate-y-0 shadow-md"
              : "opacity-0 -translate-y-5"
          } transition-all duration-250 ease-in-out`}
          role="alert"
        >
          <span className="font-medium">{highlightText}</span> {text}
        </div>
      );
  }
}

export default Toast;
