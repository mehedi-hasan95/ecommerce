import Image from "next/image";
import Link from "next/link";

export const FituredProduct = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 gap-10">
      <div className="relative">
        <Image
          src={"/hero-bg-left.png"}
          alt=""
          height={500}
          width={500}
          className="h-auto w-full max-h-[460px] bg-cover bg-center rounded-2xl"
        />
        <div className="max-w-sm lg:ml-10 ml-5 md:space-y-4 absolute top-1/4">
          <p className="text-dark_orange font-semibold text-xl">Buy 1 Get 1</p>
          <h1 className="text-custom_gray font-bold lg:text-4xl text-2xl max-w-96 lg:w-full md:leading-[3.75rem]">
            Fresh Fruits Collection
          </h1>
          <Link
            href={"#"}
            className="text-dark_orange md:text-lg py-2 md:py-3 lg:px-10 px-5 bg-white rounded-3xl inline-block"
          >
            Order Now
          </Link>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/hero-bg-right.png"}
          alt=""
          height={500}
          width={500}
          className="h-auto w-full max-h-[460px] bg-cover bg-center rounded-2xl"
        />
        <div className="max-w-sm lg:ml-10 ml-5 md:space-y-4 absolute top-1/4">
          <p className="text-dark_orange font-semibold text-xl">Buy 1 Get 1</p>
          <h1 className="text-custom_gray font-bold lg:text-4xl text-2xl max-w-96 lg:w-full md:leading-[3.75rem]">
            Fresh Fruits Collection
          </h1>
          <Link
            href={"#"}
            className="text-dark_orange md:text-lg py-2 md:py-3 lg:px-10 px-5 bg-white rounded-3xl inline-block"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};
