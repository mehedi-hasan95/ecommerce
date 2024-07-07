import Image from "next/image";

export const SupportSection = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 max-w-screen-2xl mx-auto px-6">
      <div className="flex gap-x-3 items-center">
        <Image src={"/call-center.png"} alt="" height={80} width={80} />
        <span>
          <h4 className="text-lg font-medium">24 Customer Support</h4>
          <p className="text-sm">Contact us 24 hours</p>
        </span>
      </div>
      <div className="flex gap-x-3 items-center">
        <Image src={"/product.png"} alt="" height={80} width={80} />
        <span>
          <h4 className="text-lg font-medium">Authentic Products</h4>
          <p className="text-sm">Contact us 24 hours</p>
        </span>
      </div>
      <div className="flex gap-x-3 items-center">
        <Image src={"/payment.png"} alt="" height={80} width={80} />
        <span>
          <h4 className="text-lg font-medium">Secure Payment</h4>
          <p className="text-sm">Contact us 24 hours</p>
        </span>
      </div>
      <div className="flex gap-x-3 items-center">
        <Image src={"/discount.png"} alt="" height={80} width={80} />
        <span>
          <h4 className="text-lg font-medium">Best Prices & Offers</h4>
          <p className="text-sm">Contact us 24 hours</p>
        </span>
      </div>
    </div>
  );
};
