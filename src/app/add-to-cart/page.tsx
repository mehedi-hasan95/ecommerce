import { userIndividualCart } from "@/actions/user/add-to-cart-action";
import { ProductTable } from "./_components/product-table";
import { SubTotal } from "./_components/sub-total";

const AddToCartPage = async () => {
  const data = await userIndividualCart();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <ProductTable data={data} />
      </div>
      <div className="md:col-span-1">
        <SubTotal data={data} />
      </div>
    </div>
  );
};

export default AddToCartPage;
