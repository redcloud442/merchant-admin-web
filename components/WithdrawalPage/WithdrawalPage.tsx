import { bgColor } from "@/lib/function";
import { CompanyName } from "@/lib/types";
import WithdrawalTable from "./WithdrawalTable";

const WithdrawalPage = ({ companyName }: { companyName: string }) => {
  return (
    <div
      className={`mx-auto py-8 md:p-10 ${bgColor(companyName as CompanyName)}`}
    >
      <div>
        <header className="mb-4">
          <h1 className="Title">Withdrawal List Page</h1>
          <p className="text-gray-600 dark:text-white">
            View all the withdrawal requests that are currently in the system.
          </p>
        </header>

        {/* Table Section */}
        <section className=" rounded-lg ">
          <WithdrawalTable companyName={companyName} />
        </section>
      </div>
    </div>
  );
};

export default WithdrawalPage;
