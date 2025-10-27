import { Book } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Download, Globe, Tag, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  const { title, authors } = book;
  return (
    <Card className="hover:shadow-xl transition-all grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <CardHeader className="flex gap-4 px-4">
        <div className="aspect-2/3 relative w-16 shrink-0">
          <Image
            priority
            fill
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className="object-cover"
          ></Image>
        </div>
        <div className="space-y-2 min-w-0">
          <CardTitle className="text-[1.125rem] line-clamp-3">
            {title}
          </CardTitle>
          <CardDescription className="flex items-start gap-1">
            <User className="size-4 shrink-0"></User>
            <span className="line-clamp-1">
              {" "}
              {authors.length > 0
                ? authors.map((author) => author.name).join(", ")
                : "Unknown Author"}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 border-b pb-4">
        <h3 className="flex items-center gap-2 text-muted-foreground text-sm">
          <Tag className="size-4"></Tag> Subjects
        </h3>
        {book.subjects.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {book.subjects.slice(0, 3).map((subject, index) => {
              return (
                <Badge className="max-w-full" variant={"secondary"} key={index}>
                  <span className="truncate">{subject}</span>
                </Badge>
              );
            })}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-xs flex gap-3 items-center">
          <p className="flex items-center gap-1 text-muted-foreground uppercase">
            <Globe className="size-4"></Globe> {book.languages.join(", ")}
          </p>
          <p className="flex items-center gap-1 text-muted-foreground">
            <Download className="size-4"></Download>
            {book.download_count.toLocaleString()}
          </p>
        </div>
        <Button
          variant={book.copyright ? "default" : "outline"}
          size={"sm"}
          className="text-xs cursor-text"
        >
          {book.copyright ? "Copyrighted" : "Public Domain"}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default BookCard;
