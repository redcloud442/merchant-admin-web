import { Button } from "@/components/ui/button";
import { COMPANY_NAME } from "@/lib/constant";
import { formatDateToYYYYMMDD, formatTime } from "@/lib/function";
import { getTenantBrowserSupabase } from "@/lib/supabase/client";
import { AdminTopUpRequestData, TopUpRequestData } from "@/lib/types";
import { updateTopUpStatus } from "@/services/Deposit/Deposit";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { ArrowUpDown, CheckIcon, CopyIcon } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Textarea } from "../ui/textarea";
import ActiveTreeModal from "../WithdrawalPage/ActiveTreeModal";
import SafeImage from "./SafeImage";

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
  const supabaseClient = getTenantBrowserSupabase(companyName);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState({
    open: false,
    requestId: "",
    status: "",
    amount: 0,
  });
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);

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

      //       if (
      //         status === "APPROVED" &&
      //         companyName === COMPANY_NAME.PALDISTRIBUTION_DISTRICT_1
      //       ) {
      //         const {
      //           data: { session },
      //         } = await supabaseClient.auth.getSession();
      //         const token = session?.access_token || "";

      //         const Notification = {
      //           mode: "sendToUser" as const,
      //           userIds: [
      //             updatedRequest.company_member_requestor.company_member_user_id,
      //           ],
      //           title: `🎉 Congratulations, Omnixian! 🎉`,
      //           description: `Your payout has been successfully processed! 💸
      // Thank you for choosing OMNIX as your platform toward success and financial freedom. 🙌
      // 🔥 Dahil DITO SA OMNIX, IKAW ANG PANALO! 🔥
      // `,
      //           imageUrl: updatedRequest.company_deposit_request_attachment_urls,
      //         };

      //         await SendNotification({ ...Notification }, token);
      //       }

      setRequestData((prev) => {
        if (!prev) return prev;

        const pendingData = prev.data["PENDING"]?.data ?? [];
        const updatedItem = pendingData.find(
          (item) => item.company_deposit_request_id === requestId
        );
        const newPendingList = pendingData.filter(
          (item) => item.company_deposit_request_id !== requestId
        );
        const currentStatusData = prev.data[status as keyof typeof prev.data];
        const hasExistingData = currentStatusData?.data?.length > 0;

        const merchantBalance =
          status === "APPROVED"
            ? (prev.merchantBalance || 0) -
              (updatedItem?.company_deposit_request_amount ?? 0)
            : prev.merchantBalance;

        if (!updatedItem) return prev;

        setIsOpenModal({
          open: false,
          requestId: "",
          status: "",
          amount: 0,
        });
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
                      company_deposit_request_status: status,
                      company_deposit_request_date_updated: new Date(),
                    },
                    ...currentStatusData.data,
                  ]
                : [],
              count: Number(currentStatusData?.count || 0) + 1,
            },
          },
          totalPendingDeposit:
            Number(prev.totalPendingDeposit || 0) -
            Number(updatedItem.company_deposit_request_amount),
          totalApprovedDeposit:
            status === "APPROVED"
              ? Number(prev.totalApprovedDeposit || 0) +
                Number(updatedItem.company_deposit_request_amount)
              : Number(prev.totalApprovedDeposit || 0),
          merchantBalance: merchantBalance,
        };
      });

      reset();
    } catch (e) {
      navigator.clipboard.writeText("");
      const error = e as AxiosError<{ message: string }>;
      toast.error(`Something went wrong`, {
        description: error?.response?.data?.message as string,
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
      cell: ({ row }) => {
        const username = row.getValue("user_username") as string;
        const rowId = row.original.company_deposit_request_id;

        const handleCopy = async (type: "name" | "approved") => {
          try {
            if (type === "name") {
              await navigator.clipboard.writeText(username);
            } else {
              await navigator.clipboard.writeText(`${username} - approved`);
            }
            setCopiedRowId(rowId);

            setTimeout(() => {
              setCopiedRowId((prev) => (prev === rowId ? null : prev));
            }, 2000);
          } catch (error) {
            console.warn("Failed to copy to clipboard", error);
          }
        };

        return (
          <div className="flex justify-between items-center w-full">
            {username}
            {companyName === COMPANY_NAME.PALDISTRIBUTION_DISPATCHER_1 &&
              status === "PENDING" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      {copiedRowId === rowId ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleCopy("name")}>
                      Copy Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopy("approved")}>
                      Copy Approved
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
          </div>
        );
      },
    },
    {
      accessorKey: "company_member_id",
      header: () => (
        <Button variant="ghost">
          Show Tree <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const memberId = row.getValue("company_member_id") as string;
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
      accessorKey: "company_deposit_request_status",
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
        const status = row.getValue("company_deposit_request_status") as string;
        const color = statusColorMap[status.toUpperCase()] || "gray"; // Default to gray if status is undefined
        return (
          <div className="flex justify-center items-center">
            <Badge className={`${color} text-wrap`}>{status}</Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "company_deposit_request_amount",
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
          row.getValue("company_deposit_request_amount")
        );
        const formatted = new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(amount);
        return <div className="font-medium text-center">{formatted}</div>;
      },
    },
    {
      accessorKey: "company_deposit_request_type",
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
          {row.getValue("company_deposit_request_type")}
        </div>
      ),
    },
    {
      accessorKey: "company_deposit_request_name",
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
          {row.getValue("company_deposit_request_name")}
        </div>
      ),
    },
    {
      accessorKey: "company_deposit_request_account",
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
          {row.getValue("company_deposit_request_account")}
        </div>
      ),
    },
    {
      accessorKey: "company_deposit_request_date",
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
          {formatDateToYYYYMMDD(row.getValue("company_deposit_request_date"))},{" "}
          {formatTime(row.getValue("company_deposit_request_date"))}
        </div>
      ),
    },
    ...(status !== "PENDING"
      ? [
          {
            accessorKey: "company_deposit_request_date_updated",
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
                {row.getValue("company_deposit_request_date_updated")
                  ? formatDateToYYYYMMDD(
                      row.getValue("company_deposit_request_date_updated")
                    ) +
                    "," +
                    formatTime(
                      row.getValue("company_deposit_request_date_updated")
                    )
                  : ""}
              </div>
            ),
          },
        ]
      : []),

    {
      accessorKey: "company_deposit_request_attachment",
      header: () => <div>Attachment</div>,
      cell: ({ row }) => {
        const attachmentUrl = row.getValue(
          "company_deposit_request_attachment"
        ) as string;

        const attachmentUrls =
          row.original.company_deposit_request_attachment_urls;

        return (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-md w-full" variant="outline">
                  View Attachment
                </Button>
              </DialogTrigger>
              <DialogContent type="table">
                <DialogHeader>
                  <DialogTitle>Attachment</DialogTitle>
                </DialogHeader>{" "}
                {attachmentUrl ? (
                  <div className="flex flex-wrap justify-center items-center">
                    <SafeImage key={attachmentUrl} url={attachmentUrl} />
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center items-center">
                    {attachmentUrls.map((url) => (
                      <SafeImage key={url} url={url} />
                    ))}
                  </div>
                )}
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
    ...(status === "REJECTED"
      ? [
          {
            accessorKey: "company_deposit_request_reject_note",
            header: () => <div>Rejection Note</div>,
            cell: ({ row }: { row: Row<TopUpRequestData> }) => {
              const rejectionNote = row.getValue(
                "company_deposit_request_reject_note"
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
                  {data.company_deposit_request_status === "PENDING" && (
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:text-white"
                        onClick={() =>
                          setIsOpenModal({
                            open: true,
                            requestId: data.company_deposit_request_id,
                            status: "APPROVED",
                            amount: data.company_deposit_request_amount || 0,
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
                            requestId: data.company_deposit_request_id,
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
