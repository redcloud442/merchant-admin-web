import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { HeirarchyData } from "@/lib/types";
import { getHeirarchy } from "@/services/Withdrawal/Withdrawal";
import { useEffect, useState } from "react";
import { HierarchyList } from "./HeirarchyList";

type Props = {
  teamMemberProfile: string;
  companyName: string;
};

const ActiveTreeModal = ({ teamMemberProfile, companyName }: Props) => {
  const [open, setOpen] = useState(false);
  const [heirarchy, setHeirarchy] = useState<HeirarchyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeirarchy = async () => {
      try {
        setLoading(true);
        const response = await getHeirarchy({
          allianceMemberId: teamMemberProfile,
          companyName: companyName,
        });
        setHeirarchy(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchHeirarchy();
  }, [open, teamMemberProfile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-full cursor-pointer rounded-md dark:bg-stone-900 dark:text-white">
          Show Tree
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg min-w-[320px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Hierarchy Tree
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-gray-500">
            <Skeleton className="w-full h-12 dark:bg-stone-900" />
          </p>
        ) : heirarchy.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-white">
            No hierarchy data available.
          </p>
        ) : (
          <div className="overflow-x-auto p-4">
            <HierarchyList data={heirarchy} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActiveTreeModal;
