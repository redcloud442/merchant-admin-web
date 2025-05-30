import { CompanyName } from "@/lib/types";
import { LoginForm } from "./LoginForm";

const LoginPage = ({ companyName }: { companyName: CompanyName }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm companyName={companyName} />
      </div>
    </div>
  );
};

export default LoginPage;
