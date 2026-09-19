import FlipLink from "@/components/FlipLink";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FlipCard from "@/components/FlipCard";
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

function TagList({ tags, variant }: { tags: string[]; variant: "default" | "dark" }) {
  return (
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
  );
}

function MoreLink({ href, variant }: { href: string; variant: "default" | "dark" }) {
  return (
    <FlipLink
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-montserrat text-sm font-bold transition-colors",
        variant === "dark" ? "text-gold hover:text-gold/80" : "text-gold hover:text-gold/80"
      )}
    >
      Saber mais <span aria-hidden="true">→</span>
    </FlipLink>
  );
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
  const front = (
    <Card
      className={cn(
        "content-card h-full rounded-[1.5rem] transition-all",
        variant === "dark"
          ? "border-white/10 bg-white/5 text-white"
          : "border-gold/10 bg-white"
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
            "text-sm line-clamp-3",
            variant === "dark" ? "text-white/60" : "text-gray-medium"
          )}
        >
          {description}
        </CardDescription>
      </CardHeader>

      {(tags && tags.length > 0) && (
        <CardContent>
          <TagList tags={tags} variant={variant} />
        </CardContent>
      )}

      <CardFooter>
        <span
          className={cn(
            "text-xs font-semibold",
            variant === "dark" ? "text-white/40" : "text-gray-medium"
          )}
          aria-hidden="true"
        >
          Virar ↻
        </span>
      </CardFooter>
    </Card>
  );

  const back = (
    <Card
      className={cn(
        "content-card flex h-full flex-col rounded-[1.5rem] transition-all",
        variant === "dark"
          ? "border-gold/30 bg-white/10 text-white"
          : "border-gold/30 bg-cream"
      )}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            "font-montserrat text-xl font-bold",
            variant === "dark" ? "text-white" : "text-green-dark"
          )}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            "text-sm leading-relaxed",
            variant === "dark" ? "text-white/70" : "text-gray-medium"
          )}
        >
          {description}
        </CardDescription>
      </CardHeader>

      {(tags && tags.length > 0) && (
        <CardContent>
          <TagList tags={tags} variant={variant} />
        </CardContent>
      )}

      <CardFooter className="mt-auto flex items-center justify-between gap-3">
        {href ? (
          <MoreLink href={href} variant={variant} />
        ) : (
          <span
            className={cn(
              "text-xs",
              variant === "dark" ? "text-white/40" : "text-gray-medium"
            )}
          >
            {schedule ?? time ?? ""}
          </span>
        )}
        <span
          className={cn(
            "text-xs font-semibold",
            variant === "dark" ? "text-white/40" : "text-gray-medium"
          )}
          aria-hidden="true"
        >
          Voltar ↻
        </span>
      </CardFooter>
    </Card>
  );

  return <FlipCard front={front} back={back} label={`Virar cartão: ${title}`} />;
}
