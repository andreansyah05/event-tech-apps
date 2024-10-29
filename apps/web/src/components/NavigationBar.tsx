import Button from "./Button";

function NavigationBar() {
  return (
    <header className="px-4 py-3 bg-indigo-600 flex justify-between">
      <img src="" alt="" />
      <nav>
        <Button
          isButtonDisable={false}
          type="secondary"
          text="
        LOGIN"
        />
        <Button
          isButtonDisable={false}
          type="white"
          text="
        REGISTER"
        />
      </nav>
    </header>
  );
}

export default NavigationBar;
