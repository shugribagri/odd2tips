import Image from "next/image";

export function Intro() {
  return (
    <section className="flex items-center justify-center py-4 text-lg md:text-2xl mx-auto">
      <Image src="/logo.png" alt="Logo-SVG" width={150} height={150} />
    </section>
  );
}
