import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
type Props = {
  title: string;
  value: React.ReactNode;
  description?: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
  className?: string;
};

const CardAmountAdmin = ({
  title,
  value,
  description,
  descriptionClassName = "text-sm text-gray-500",
  children,
  className,
}: Props) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex gap-x-2 text-xl font-bold">
          {value}
        </CardDescription>
        {description && (
          <CardDescription className={descriptionClassName}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardAmountAdmin;
