import ButtonHandler from "@/components/forms/sign-up/button-handlers";
import { SignUpFromProvider } from "@/components/forms/sign-up/form-provider";
import HighLightBar from "@/components/forms/sign-up/highlight-bar";
import { RegistrationFromStep } from "@/components/forms/sign-up/registration-step";

const SignUp = () => {
  return (
    <div className="w-full">
      <SignUpFromProvider>
        <div className="flex flex-col gap-3">
          <RegistrationFromStep />
          <ButtonHandler />
          <HighLightBar />
        </div>
      </SignUpFromProvider>
    </div>
  );
};

export default SignUp;
