"use client";

import BookForm from "@/components/BookForm";
import { Data } from "@/lib/types";
import { useEffect, useState } from "react";
import getBooks from "../../actions/getBooks";
import { toast } from "sonner";
import BooksList from "@/components/BooksList";

function BooksPage() {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const data = await getBooks({});
        setData(data);
      } catch (err) {
        toast.error("There was an issue fetching books...");
        console.log("Error fetching books", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);
  return (
    <>
      <BookForm setData={setData} setLoading={setLoading}></BookForm>
      <BooksList
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
      ></BooksList>
    </>
  );
}
export default BooksPage;
