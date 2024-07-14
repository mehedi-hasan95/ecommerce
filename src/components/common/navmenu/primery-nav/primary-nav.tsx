import { Logo } from "./logo";
import { SearchBar } from "./search";
import { UserAction } from "./user-action";

export const PrimaryNav = () => {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <div className="hidden md:block">
        <SearchBar />
      </div>
      <div className="hidden md:block">
        <UserAction />
      </div>
    </div>
  );
};
