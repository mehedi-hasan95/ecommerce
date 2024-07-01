import Link from "next/link";

export const FituredProduct = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 gap-10">
      <div className="bg-[url('/herobg2.png')] bg-cover bg-center rounded-2xl">
        <div className="lg:py-32 py-20 2xl:py-40 max-w-sm lg:ml-10 ml-5 space-y-4">
          <p className="text-dark_orange font-semibold text-xl">Buy 1 Get 1</p>
          <h1 className="text-custom_gray font-bold lg:text-4xl text-2xl w-2/4 lg:w-full leading-[3.75rem]">
            Fresh Fruits Collection
          </h1>
          <Link
            href={"#"}
            className="text-dark_orange text-lg py-3 lg:px-10 px-5 bg-white rounded-3xl inline-block"
          >
            Order Now
          </Link>
        </div>
      </div>
      <div className="bg-[url('/herobg1.png')] bg-cover bg-center rounded-2xl">
        <div className="lg:py-32 py-20 2xl:py-40 max-w-sm lg:ml-10 ml-5 space-y-4">
          <p className="text-dark_orange font-semibold text-xl">Buy 1 Get 1</p>
          <h1 className="text-custom_gray font-bold lg:text-4xl text-2xl w-2/4 lg:w-full">
            Fresh Fruits Collection
          </h1>
          <Link
            href="#"
            className="text-dark_orange text-lg py-3 lg:px-10 px-5 bg-white rounded-3xl inline-block"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};
