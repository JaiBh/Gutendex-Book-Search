import { UseFormReturn } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import LanguagesFormField from "./LanguagesFormField";
import CopyrightFormField from "./CopyrightFormField";
import AuthorYearFormField from "./AuthorYearFormField";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  form: UseFormReturn<
    {
      search: string;
      copyright: boolean | "all";
      authorYearStart?: number | undefined;
      authorYearEnd?: number | undefined;
      languages?: ("en" | "fr" | "de" | "es" | "fi")[] | undefined;
    },
    any,
    {
      search: string;
      copyright: boolean | "all";
      authorYearStart?: number | undefined;
      authorYearEnd?: number | undefined;
      languages?: ("en" | "fr" | "de" | "es" | "fi")[] | undefined;
    }
  >;
  sheetOpen: boolean;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}

function BookFormFilters({ form, sheetOpen, setSheetOpen }: Props) {
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger className="max-md:w-full" asChild>
        <Button size={"lg"}>Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-center">
          <SheetTitle className="text-lg">Filter Books</SheetTitle>
          <SheetDescription>Refine your search with filters</SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-10">
          <LanguagesFormField form={form}></LanguagesFormField>
          <CopyrightFormField form={form}></CopyrightFormField>
          <AuthorYearFormField form={form}></AuthorYearFormField>
        </div>
        <Button form="book-form" type="submit" className="mt-2">
          Apply Filters
        </Button>
        <Button
          variant={"destructive"}
          onClick={() => {
            form.reset();
          }}
        >
          Reset Filters
        </Button>
      </SheetContent>
    </Sheet>
  );
}
export default BookFormFilters;
