import "@testing-library/jest-dom";
import "whatwg-fetch";

// Mock ESM-only 'query-string' so Jest stops choking on it
jest.mock("query-string", () => {
  return {
    __esModule: true,
    stringify: (obj: Record<string, any>) =>
      new URLSearchParams(obj as any).toString(),
    parse: (s: string) => Object.fromEntries(new URLSearchParams(s)),
  };
});
