import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex gap-x-2">
      <Image src="/logo.png" alt="Logo" height={40} width={40} />
      <p className="text-xl font-bold">Bengal Shop</p>
    </Link>
  );
};
