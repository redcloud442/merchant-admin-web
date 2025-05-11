// app/not-found.tsx or /select-company/page.tsx

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Select Your Company
        </h1>
        <p className="text-gray-500 mb-8">
          Please choose which company you belong to:
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href={`/login/district-1`}
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200"
          >
            District-1
          </Link>
          <Link
            href={`/login/warehouse-pal-project`}
            className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition duration-200"
          >
            Warehouse
          </Link>
        </div>
      </div>
    </div>
  );
}
