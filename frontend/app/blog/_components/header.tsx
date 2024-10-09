import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8">
      <Link href="/" className="hover:underline">
        <Image src="/logo.png" alt="Logo-SVG" width={150} height={150} />
      </Link>
    </h2>
  );
};

export default Header;
