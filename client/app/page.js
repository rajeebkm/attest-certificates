import Image from "next/image";
import EASAttest from "./components/EASAttest";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-18">
      <Header/>
      <h2 className="flex items-center justify-center pt-20">
        <span className="mt-2 text-4xl font-bold">Completion Attestation</span>
      </h2>
      <EASAttest />
      <Image
        className="absolute bottom-0"
        src="/zombie.png"
        height={250}
        width={250}
        alt="zombie"
      />
    </main>
  );
}
