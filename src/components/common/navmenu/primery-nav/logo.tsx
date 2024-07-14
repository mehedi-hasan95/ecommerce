import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex gap-x-2 items-center">
      <Image
        src="/logo.png"
        alt="Logo"
        height={40}
        width={40}
        style={{ height: "auto", width: "auto" }}
      />
      <p className="text-xl font-bold">Bengal Shop</p>
    </Link>
  );
};
