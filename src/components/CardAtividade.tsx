import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardAtividadeProps {
  title: string;
  description: string;
  schedule?: string;
  time?: string;
  href?: string;
  icon?: React.ReactNode;
  tags?: string[];
  variant?: "default" | "dark";
}

export default function CardAtividade({
  title,
  description,
  schedule,
  time,
  href,
  icon,
  tags,
  variant = "default",
}: CardAtividadeProps) {
  const cardContent = (
    <Card
      className={cn(
        "transition-all hover:shadow-lg hover:shadow-gold/10",
        variant === "dark"
          ? "border-white/10 bg-white/5 text-white"
          : "border-gold/10 bg-white shadow-md shadow-gold/5 hover:border-gold/30"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  variant === "dark" ? "bg-white/10" : "bg-gold/10"
                )}
              >
                {icon}
              </span>
            )}
            <div>
              {schedule && (
                <span
                  className={cn(
                    "inline-block rounded-full px-3 py-1 font-montserrat text-xs font-bold",
                    variant === "dark"
                      ? "bg-white/10 text-white/80"
                      : "bg-gold/10 text-gold"
                  )}
                >
                  {schedule}
                </span>
              )}
            </div>
          </div>
          {time && (
            <span
              className={cn(
                "text-sm",
                variant === "dark" ? "text-white/50" : "text-gray-medium"
              )}
            >
              {time}
            </span>
          )}
        </div>
        <CardTitle
          className={cn(
            "mt-3 font-montserrat text-xl font-bold",
            variant === "dark" ? "text-white" : "text-green-dark"
          )}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            "text-sm",
            variant === "dark" ? "text-white/60" : "text-gray-medium"
          )}
        >
          {description}
        </CardDescription>
      </CardHeader>

      {(tags && tags.length > 0) && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  variant === "dark"
                    ? "bg-white/10 text-white/70"
                    : "bg-gold/10 text-gold"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      )}

      {href && (
        <CardFooter>
          <Link
            href={href}
            className={cn(
              "font-montserrat text-sm font-bold transition-colors",
              variant === "dark" ? "text-gold hover:text-gold/80" : "text-gold hover:text-gold/80"
            )}
          >
            Saber mais &rarr;
          </Link>
        </CardFooter>
      )}
    </Card>
  );

  if (href && !tags) {
    return <Link href={href} className="block">{cardContent}</Link>;
  }

  return cardContent;
}
