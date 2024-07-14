import { UserAction } from "../primery-nav/user-action";
import { CategoryMenu } from "./category-menu";
import { Menus } from "./menus";
import { MobileMenus } from "./mobile-menus";
import { SpecialOffer } from "./special-offer";

export const SeconderyNav = () => {
  return (
    <>
      <div className="hidden md:flex justify-between items-center pt-3">
        <CategoryMenu />
        <Menus />
        <SpecialOffer />
      </div>
      <div className="md:hidden flex justify-between items-center pt-3">
        <MobileMenus />
        <UserAction />
      </div>
    </>
  );
};
