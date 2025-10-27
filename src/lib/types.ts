export type Language = "en" | "fr" | "de" | "es" | "fi";

export type Data = {
  count: number;
  results: Book[];
  next: string;
  previous: string;
};

export type Book = {
  id: number;
  title: string;
  authors: { name: string; birth_year: number; death_year: number }[];
  subjects: string[];
  languages: string[];
  copyright: boolean;
  download_count: number;
  formats: {
    "image/jpeg": string;
  };
};
