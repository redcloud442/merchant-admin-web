import TopUpTable from "./TopUpTable";

type TopUpPageProps = {
  companyName: string;
};

const TopUpPage = ({ companyName }: TopUpPageProps) => {
  return (
    <div className="mx-auto py-8 md:p-6">
      <div>
        <header className="mb-4">
          <h1 className="Title">Deposit List Page</h1>
          <p className="text-gray-600 dark:text-white">
            View all the deposit records that are currently in the system.
          </p>
        </header>

        {/* Table Section */}
        <section className="rounded-lg space-y-4">
          <TopUpTable companyName={companyName} />
        </section>
      </div>
    </div>
  );
};

export default TopUpPage;
