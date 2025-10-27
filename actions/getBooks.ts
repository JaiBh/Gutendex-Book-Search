import { Data } from "@/lib/types";
import qs from "query-string";

type language = "en" | "fr" | "de" | "es" | "fi";

interface Query {
  paginateUrl?: string;
  search?: string;
  authorYearStart?: number;
  authorYearEnd?: number;
  copyright?: "all" | true | false;
  languages?: language[];
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/books`;

const getBooks = async (query: Query): Promise<Data> => {
  console.log(query);
  if (query.paginateUrl) {
    const resp = await fetch(query.paginateUrl);
    return resp.json();
  } else {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        search: query.search,
        author_year_start: query.authorYearStart,
        author_year_end: query.authorYearEnd,
        copyright: query.copyright === "all" ? "true,false" : query.copyright,
        languages: query.languages?.join(",") || undefined,
      },
    });
    const resp = await fetch(url);

    return resp.json();
  }
};

export default getBooks;
