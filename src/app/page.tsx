import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen" >
      <h1 className="text-4xl font-bold">Date Check</h1>
      <div className="flex flex-col items-center justify-center">
        <button className="bg-gray-200 text-black p-2 rounded-md mt-4 cursor-pointer">
          Click me
        </button>
      </div>
    </div>
  );
}
