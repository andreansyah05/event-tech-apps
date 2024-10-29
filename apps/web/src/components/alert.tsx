interface Toast {
  showToast: boolean;
}

function Toast({ showToast }: Toast) {
  return (
    <div
      className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 mb-4 text-green-800 rounded-lg bg-green-50 w-fit ${
        showToast
          ? "opacity-100 translate-y-0 shadow-md"
          : "opacity-0 -translate-y-5"
      } transition-all duration-300 ease-in-out`}
      role="alert"
    >
      <span className="font-medium">Success Register Account</span> redirect you
      to login page
    </div>
  );
}

export default Toast;
