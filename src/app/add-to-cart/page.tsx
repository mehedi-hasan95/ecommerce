import { userIndividualCart } from "@/actions/user/add-to-cart-action";
import { ProductTable } from "./_components/product-table";

const AddToCartPage = async () => {
  const data = await userIndividualCart();
  return (
    <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <ProductTable data={data} />
      </div>
      <div className="col-span-1">Hasan</div>
    </div>
  );
};

export default AddToCartPage;
