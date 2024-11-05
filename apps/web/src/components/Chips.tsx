interface ChipsProps {
  text: string;
}

function Chips({ text }: ChipsProps) {
  return (
    <div className="text-white text-xs py-1 px-2 bg-indigo-950 w-fit rounded-sm font-medium mb-2">
      {text}
    </div>
  );
}

export default Chips;
