import { Button } from "@/components/ui/button";
import { merchant_table } from "@/generated/companyMithril";
import { handleUpdateMerchantData } from "@/services/Merchant/Merchant";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TableLoading from "../ui/tableLoading";

export const useMerchantColumn = (
  setRequestData: Dispatch<SetStateAction<merchant_table[]>>,
  companyName: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    merchantId: "",
    isOpen: false,
  });

  const handleUpdateMerchant = async ({
    merchantId,
  }: {
    merchantId: string;
  }) => {
    try {
      setIsLoading(true);

      await handleUpdateMerchantData({
        merchantId: merchantId,
        companyName: companyName,
      });

      toast.success("Merchant Deleted", {
        description: "Merchant has been deleted successfully",
      });
      setIsDeleteModal({ merchantId: "", isOpen: false });
      setRequestData((prev) =>
        prev.filter((merchant) => merchant.merchant_id !== merchantId)
      );
    } catch (e) {
      toast.error("Error", {
        description: "An error occurred while creating the merchant.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns: ColumnDef<merchant_table>[] = [
    {
      accessorKey: "merchant_account_name",
      header: () => (
        <Button variant="ghost" className="p-0">
          Account Name
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">{row.getValue("merchant_account_name")}</div>
      ),
    },
    {
      accessorKey: "merchant_account_number",
      header: () => (
        <Button variant="ghost" className="p-0">
          Account Number
        </Button>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium text-wrap">
            {row.getValue("merchant_account_number")}
          </div>
        );
      },
    },
    {
      accessorKey: "merchant_account_type",
      header: () => (
        <Button variant="ghost" className="p-0">
          Account Type
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-wrap">{row.getValue("merchant_account_type")}</div>
      ),
    },

    {
      accessorKey: "merchant_qr_attachment",
      header: "QR Attachment",
      cell: ({ row }: { row: Row<merchant_table> }) => {
        const attachmentUrl = row.getValue("merchant_qr_attachment") as string;
        return (
          <>
            {attachmentUrl ? (
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
                  <div className="flex justify-center items-center">
                    <Image
                      src={attachmentUrl}
                      alt="Attachment Preview"
                      width={200}
                      height={200}
                    />
                  </div>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            ) : null}
          </>
        );
      },
    },

    {
      header: "Action",
      cell: (props) => {
        const data = props.row.original;
        return (
          <DropdownMenu>
            <>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    setIsDeleteModal({
                      merchantId: data.merchant_id,
                      isOpen: true,
                    })
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    <TableLoading />;
  }

  return {
    columns,
    isDeleteModal,
    setIsDeleteModal,
    handleUpdateMerchant,
    isLoading,
    setIsLoading,
  };
};
