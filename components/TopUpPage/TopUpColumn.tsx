import { Button } from "@/components/ui/button";
import { COMPANY_NAME } from "@/lib/constant";
import { formatDateToYYYYMMDD, formatTime } from "@/lib/function";
import { AdminTopUpRequestData, TopUpRequestData } from "@/lib/types";
import { updateTopUpStatus } from "@/services/Deposit/Deposit";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import ActiveTreeModal from "../WithdrawalPage/ActiveTreeModal";

const statusColorMap: Record<string, string> = {
  APPROVED: "bg-green-500 dark:bg-green-500 dark:text-white",
  PENDING: "bg-yellow-600 dark:bg-yellow-600 dark:text-white",
  REJECTED: "bg-red-600 dark:bg-red-600 dark:text-white",
};

export const TopUpColumn = (
  setRequestData: Dispatch<SetStateAction<AdminTopUpRequestData | null>>,
  reset: () => void,
  status: string,
  companyName: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState({
    open: false,
    requestId: "",
    status: "",
    amount: 0,
  });

  const handleUpdateStatus = async (
    status: string,
    requestId: string,
    note?: string
  ) => {
    try {
      setIsLoading(true);

      await updateTopUpStatus(
        {
          status,
          requestId,
          note,
        },
        companyName
      );

      setRequestData((prev) => {
        if (!prev) return prev;

        const pendingData = prev.data["PENDING"]?.data ?? [];
        const updatedItem = pendingData.find(
          (item) => item.alliance_top_up_request_id === requestId
        );
        const newPendingList = pendingData.filter(
          (item) => item.alliance_top_up_request_id !== requestId
        );
        const currentStatusData = prev.data[status as keyof typeof prev.data];
        const hasExistingData = currentStatusData?.data?.length > 0;

        const merchantBalance =
          status === "APPROVED"
            ? (prev.merchantBalance || 0) -
              (updatedItem?.alliance_top_up_request_amount ?? 0)
            : prev.merchantBalance;

        if (!updatedItem) return prev;

        setIsOpenModal({ open: false, requestId: "", status: "", amount: 0 });
        return {
          ...prev,
          data: {
            ...prev.data,
            PENDING: {
              ...prev.data["PENDING"],
              data: newPendingList,
              count: Number(prev.data["PENDING"]?.count) - 1,
            },
            [status as keyof typeof prev.data]: {
              ...currentStatusData,
              data: hasExistingData
                ? [
                    {
                      ...updatedItem,
                      alliance_top_up_request_status: status,
                      alliance_top_up_request_date_updated: new Date(),
                    },
                    ...currentStatusData.data,
                  ]
                : [],
              count: Number(currentStatusData?.count || 0) + 1,
            },
          },
          totalPendingDeposit:
            Number(prev.totalPendingDeposit || 0) -
            Number(updatedItem.alliance_top_up_request_amount),
          totalApprovedDeposit:
            status === "APPROVED"
              ? Number(prev.totalApprovedDeposit || 0) +
                Number(updatedItem.alliance_top_up_request_amount)
              : Number(prev.totalApprovedDeposit || 0),
          merchantBalance: merchantBalance,
        };
      });

      reset();
    } catch (e) {
      toast.error(`Invalid Request`, {
        description: `Something went wrong`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnDef<TopUpRequestData>[] = [
    {
      accessorKey: "user_username",

      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requestor Username <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">{row.getValue("user_username")}</div>
      ),
    },
    {
      accessorKey: "alliance_member_id",
      header: () => (
        <Button variant="ghost">
          Show Tree <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const memberId = row.getValue("alliance_member_id") as string;
        return (
          <div className="flex items-center gap-4">
            <ActiveTreeModal
              teamMemberProfile={memberId}
              companyName={companyName}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "alliance_top_up_request_status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("alliance_top_up_request_status") as string;
        const color = statusColorMap[status.toUpperCase()] || "gray"; // Default to gray if status is undefined
        return (
          <div className="flex justify-center items-center">
            <Badge className={`${color} text-wrap`}>{status}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "alliance_top_up_request_amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(
          row.getValue("alliance_top_up_request_amount")
        );
        const formatted = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(amount);
        return <div className="font-medium text-center">{formatted}</div>;
      },
    },
    {
      accessorKey: "alliance_top_up_request_type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bank Account <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">
          {row.getValue("alliance_top_up_request_type")}
        </div>
      ),
    },
    {
      accessorKey: "alliance_top_up_request_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">
          {row.getValue("alliance_top_up_request_name")}
        </div>
      ),
    },
    {
      accessorKey: "alliance_top_up_request_account",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bank Number <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">
          {row.getValue("alliance_top_up_request_account")}
        </div>
      ),
    },
    {
      accessorKey: "alliance_top_up_request_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="p-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap flex justify-center items-center">
          {formatDateToYYYYMMDD(row.getValue("alliance_top_up_request_date"))},{" "}
          {formatTime(row.getValue("alliance_top_up_request_date"))}
        </div>
      ),
    },
    ...(status !== "PENDING"
      ? [
          {
            accessorKey: "alliance_top_up_request_date_updated",
            header: ({ column }: { column: Column<TopUpRequestData> }) => (
              <Button
                variant="ghost"
                className="p-1"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                Date Updated <ArrowUpDown />
              </Button>
            ),
            cell: ({ row }: { row: Row<TopUpRequestData> }) => (
              <div className="text-wrap flex justify-center items-center">
                {row.getValue("alliance_top_up_request_date_updated")
                  ? formatDateToYYYYMMDD(
                      row.getValue("alliance_top_up_request_date_updated")
                    ) +
                    "," +
                    formatTime(
                      row.getValue("alliance_top_up_request_date_updated")
                    )
                  : ""}
              </div>
            ),
          },
        ]
      : []),

    {
      accessorKey: "alliance_top_up_request_attachment",
      header: () => <div>Attachment</div>,
      cell: ({ row }) => {
        const attachmentUrl = row.getValue(
          "alliance_top_up_request_attachment"
        ) as string;

        const attachmentUrls = row.original.attachment_url;

        const formatterUrl =
          companyName === COMPANY_NAME.PALDISTRIBUTION_DISTRICT_1 &&
          attachmentUrl.replace(
            "https://cdn.primepinas.com",
            "https://hburgwylodfpwgbtywue.supabase.co"
          );

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-md w-full" variant="outline">
                View Attachment
              </Button>
            </DialogTrigger>
            <DialogContent type="table">
              <DialogHeader>
                <DialogTitle>Attachment</DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap justify-center items-center">
                {companyName === COMPANY_NAME.PALDISTRIBUTION_DISTRICT_1 ? (
                  formatterUrl ? (
                    <img
                      key={formatterUrl}
                      src={formatterUrl}
                      alt="Attachment Preview"
                      className="object-contain w-[600px] h-[600px]"
                    />
                  ) : null
                ) : (
                  attachmentUrls.map((url) => (
                    <img
                      key={url.replace(
                        "https://content.elevateglobal.app",
                        "https://kvrvtcwffqhkzlpfjjoy.supabase.co"
                      )}
                      src={url.replace(
                        "https://content.elevateglobal.app",
                        "https://kvrvtcwffqhkzlpfjjoy.supabase.co"
                      )}
                      alt="Attachment Preview"
                      className="object-contain w-[600px] h-[600px]"
                    />
                  ))
                )}
              </div>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        );
      },
    },
    ...(status === "REJECTED"
      ? [
          {
            accessorKey: "alliance_top_up_request_reject_note",
            header: () => <div>Rejection Note</div>,
            cell: ({ row }: { row: Row<TopUpRequestData> }) => {
              const rejectionNote = row.getValue(
                "alliance_top_up_request_reject_note"
              ) as string;

              return rejectionNote ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-md" variant="destructive">
                      View Rejection Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent type="table">
                    <DialogHeader>
                      <DialogTitle>Attachment</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center items-center">
                      <Textarea value={rejectionNote} readOnly />
                    </div>
                    <DialogClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              ) : null;
            },
          },
        ]
      : []),
    ...(status === "PENDING"
      ? [
          {
            header: "Actions",
            cell: ({ row }: { row: Row<TopUpRequestData> }) => {
              const data = row.original;

              return (
                <>
                  {data.alliance_top_up_request_status === "PENDING" && (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:text-white"
                        onClick={() =>
                          setIsOpenModal({
                            open: true,
                            requestId: data.alliance_top_up_request_id,
                            status: "APPROVED",
                            amount: data.alliance_top_up_request_amount || 0,
                          })
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() =>
                          setIsOpenModal({
                            open: true,
                            requestId: data.alliance_top_up_request_id,
                            status: "REJECTED",
                            amount: 0,
                          })
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </>
              );
            },
          },
        ]
      : []),
  ];

  return {
    columns,
    isOpenModal,
    setIsOpenModal,
    handleUpdateStatus,
    isLoading,
  };
};
