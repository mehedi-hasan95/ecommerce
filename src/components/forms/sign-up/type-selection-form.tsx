import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "seller" | "user";
  setUserType: React.Dispatch<React.SetStateAction<"seller" | "user">>;
};

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
        <p className="text-iridium md:text-sm">
          Tell us about yourself! What do you do? Let’s tailor your
          <br /> experience so it best suits you.
        </p>
      </div>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="seller"
        title="I own a buisness"
        text="Setting up my account for my company."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="user"
        title="Im a user"
        text="Looking to create an account as user."
      />
    </>
  );
};

export default TypeSelectionForm;
