import Link from "next/link";
import { Logo } from "../navmenu/primery-nav/logo";

export const Footer = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-3 space-y-3">
            <Logo />
            <p className="max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              diam ornare nam est gravida. Netus viverra rhoncus sit magna
              sapien ac eget parturient id. Est luctus dapibus quam aliquam in
              nisl turpis. Elit et dictum lacus morbi nec accumsan a in.
            </p>
          </div>
          <div className="col-span-1 space-y-3">
            <h5 className="text-lg font-medium">About Us</h5>
            <ul className="space-y-3">
              <li>
                <Link href="#">About Karte</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Career</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Category</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 space-y-3">
            <h5 className="text-lg font-medium">Info</h5>
            <ul className="space-y-3">
              <li>
                <Link href="#">Information</Link>
              </li>
              <li>
                <Link href="#">Shipping</Link>
              </li>
              <li>
                <Link href="#">Payment</Link>
              </li>
              <li>
                <Link href="#">Return</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
