import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Text Section */}
      <div className="z-10 text-center flex items-center justify-center gap-4 flex-col mt-16 md:mt-40 px-4 md:px-0">
        <span className="uppercase font-sans font-semibold px-3 py-2 rounded-2xl shadow-md">
          We are your business needs
        </span>
        <h1 className="text-3xl md:text-5xl font-semibold">
          Experience Seamless Transactions: <br className="hidden md:block" />{" "}
          Introducing POSLINE - Your Ultimate <br className="hidden md:block" />{" "}
          <span className="text-blue-300">Point of Sale Solution!</span>
        </h1>
        <p className="w-full md:w-[33rem] text-base md:text-lg text-zinc-400">
          Transform your transactions with POSLINE: Streamlined, efficient, and
          empowering. Experience seamless sales and customer service in one
          powerful solution.
        </p>
        <Link href="/dashboard">
          <Button className="text-lg font-bold py-5 px-8">Let's Start!</Button>
        </Link>
      </div>
      {/* Image Section */}
      <div></div>
    </main>
  );
}
