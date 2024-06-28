import { Logo } from "./logo";
import { SearchBar } from "./search";
import { UserAction } from "./user-action";

export const PrimaryNav = () => {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <SearchBar />
      <UserAction />
    </div>
  );
};
