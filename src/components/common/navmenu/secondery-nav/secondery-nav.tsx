import { CategoryMenu } from "./category-menu";
import { Menus } from "./menus";
import { SpecialOffer } from "./special-offer";

export const SeconderyNav = () => {
  return (
    <div className="flex justify-between items-center pt-3">
      <CategoryMenu />
      <Menus />
      <SpecialOffer />
    </div>
  );
};
