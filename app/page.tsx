import Image from "next/image";

export default function Home() {
  return (
    <body className="bg-background flex min-h-screen">
      <main className="flex flex-col gap-8 items-center w-full">
        <div className="bg-green-950 w-70 h-20 relative border-2 border-lime-500 rounded-lg items-center justify-center flex mt-10 hover:border-lime-400 transition-colors duration-300">
          <h1 className="text-2xl font-bold text-foreground">Varadifi Admin</h1>
        </div>
        <div className="w-full h-50 items-center flex justify-center gap-30">
          <div className="w-50 h-25 bg-gray-700 rounded-3xl"></div>
          <div className="w-50 h-25 bg-gray-700 rounded-3xl"></div>
          <div className="w-50 h-25 bg-gray-700 rounded-3xl"></div>
        </div>
      </main>
    </body>
  );
}
