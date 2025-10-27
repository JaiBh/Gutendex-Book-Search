import { Data } from "@/lib/types";
import BookCard from "./BookCard";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import getBooks from "../../actions/getBooks";

interface Props {
  data: Data | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Data | undefined>>;
}

function BooksList({ data, loading, setData, setLoading }: Props) {
  if (loading) {
    return (
      <section className="section-center">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <BooksListSkeleton></BooksListSkeleton>
        </ul>
      </section>
    );
  }

  const changePage = async (action: "next" | "previous") => {
    try {
      setLoading(true);
      const newData = await getBooks({
        paginateUrl: action === "next" ? data?.next : data?.previous,
      });
      setData(newData);
    } catch (err) {
      toast.error("There was an issue fetching books...");

      console.log("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-center mb-16 space-y-8">
      {!data ||
        (data.results.length < 1 && (
          <h1 className="text-xl md:text-2xl text-center">No books found...</h1>
        ))}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.results.map((book) => (
          <BookCard book={book} key={book.id}></BookCard>
        ))}
      </ul>
      {Number(data?.count) > 0 && (
        <div className="flex items-center justify-between">
          <Button
            variant={data?.previous ? "default" : "outline"}
            disabled={!data?.previous}
            onClick={() => changePage("previous")}
          >
            Previous
          </Button>
          <Button
            variant={data?.next ? "default" : "outline"}
            disabled={!data?.next}
            onClick={() => changePage("next")}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
export default BooksList;

function BooksListSkeleton() {
  const blocks = Array.from({ length: 8 }, () => null);

  return (
    <>
      {blocks.map((_, index) => {
        return (
          <Card className="h-92 grid grid-rows-[auto_1fr_auto]" key={index}>
            <CardHeader className="flex gap-4 px-4">
              <Skeleton className="aspect-2/3 w-16 shrink-0"></Skeleton>
              <div className="space-y-2 w-full">
                <Skeleton className="h-7"></Skeleton>
                <Skeleton className="h-7"></Skeleton>
                <Skeleton className="h-5"></Skeleton>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-4">
              <Skeleton className="w-24 h-8"></Skeleton>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-42"></Skeleton>
                <Skeleton className="h-6 w-32"></Skeleton>
                <Skeleton className="h-6 w-28"></Skeleton>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-12"></Skeleton>
                <Skeleton className="h-6 w-18"></Skeleton>
              </div>
              <Skeleton className="h-7 w-28"></Skeleton>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
