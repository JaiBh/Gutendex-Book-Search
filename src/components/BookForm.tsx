"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import BookFormFilters from "./BookFormFilters";
import { Dispatch, SetStateAction, useState } from "react";
import { Data } from "@/lib/types";
import getBooks from "../../actions/getBooks";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();
const languageEnum = z.enum(["en", "fr", "de", "es", "fi"]);

const formSchema = z
  .object({
    search: z.string().max(100),
    authorYearStart: z
      .number()
      .int()
      .min(-400, `Please select a year between -400 and ${currentYear}`)
      .max(currentYear, `Please select a year between -400 and ${currentYear}`)
      .optional(),
    authorYearEnd: z
      .number()
      .int()
      .min(-400, `Please select a year between -400 and ${currentYear}`)
      .max(currentYear, `Please select a year between -400 and ${currentYear}`)
      .optional(),
    copyright: z.literal("all").or(z.boolean()),
    languages: z.array(languageEnum).optional(),
  })
  .superRefine((data, ctx) => {
    const { authorYearStart: s, authorYearEnd: e } = data;
    if (s != null && e != null && s > e) {
      ctx.addIssue({
        code: "custom",
        path: ["authorYearStart"],
        message: "Start year cannot be greater than end year",
      });
      ctx.addIssue({
        code: "custom",
        path: ["authorYearEnd"],
        message: "End year cannot be greater than start year",
      });
    }
  });

interface Props {
  setData: Dispatch<SetStateAction<Data | undefined>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function BookForm({ setData, setLoading }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      copyright: "all",
      authorYearStart: -400,
      authorYearEnd: currentYear,
      languages: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSheetOpen(false);
    try {
      console.log(values);
      setLoading(true);
      const data = await getBooks({ ...values });
      setData(data);
    } catch (err) {
      toast.error("There was an issue fetching books...");
      console.log("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="py-6 section-center">
      <Form {...form}>
        <form
          id="book-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:grid grid-cols-[1fr_auto] gap-4"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Search by title or author..."
                      className="pl-12"
                      {...field}
                    />
                    <Search className="absolute top-1/2 left-8 translate-x-[-50%] translate-y-[-50%] size-4 text-muted-foreground"></Search>
                  </div>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <BookFormFilters
            form={form}
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
          ></BookFormFilters>
        </form>
      </Form>
    </section>
  );
}
export default BookForm;
