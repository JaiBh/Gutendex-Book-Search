import BookForm from "@/components/BookForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import getBooks from "../actions/getBooks";

// mock the async call
jest.mock("../actions/getBooks", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// mock toast
jest.mock("sonner", () => ({
  toast: { error: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("BookForm", () => {
  it("renders all inputs and buttons", async () => {
    const user = userEvent.setup();
    const setData = jest.fn();
    const setLoading = jest.fn();
    render(<BookForm setData={setData} setLoading={setLoading}></BookForm>);
    expect(
      screen.getByPlaceholderText(/search by title or author.../i)
    ).toBeInTheDocument();

    // open sheet so the filter fields mount
    await user.click(screen.getByRole("button", { name: /filters/i }));
    // languages
    expect(await screen.findByLabelText(/english/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/french/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/german/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/spanish/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/finnish/i)).toBeInTheDocument();
    // copyright
    expect(await screen.findByLabelText(/all/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/yes/i)).toBeInTheDocument();
    expect(await screen.findByLabelText(/no/i)).toBeInTheDocument();
    // author birth-year
    expect(
      await screen.findByPlaceholderText(/e.g. 1800/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/e.g. 1900/i)
    ).toBeInTheDocument();
    // apply and reset filters buttons
    expect(
      await screen.findByRole("button", { name: /apply filters/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /reset filters/i })
    ).toBeInTheDocument();
  });
  it("alter search, languages, copyright and birth year range and submit", async () => {
    const user = userEvent.setup();
    const setData = jest.fn();
    const setLoading = jest.fn();
    render(<BookForm setData={setData} setLoading={setLoading}></BookForm>);

    await user.type(
      screen.getByPlaceholderText(/search by title or author.../i),
      "Frankenstein"
    );

    // open sheet so the filter fields mount
    await user.click(screen.getByRole("button", { name: /filters/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // languages
    const english = screen.getByLabelText(/english/i);
    const french = screen.getByLabelText(/french/i);
    const german = screen.getByLabelText(/german/i);
    const spanish = screen.getByLabelText(/spanish/i);
    const finnish = screen.getByLabelText(/finnish/i);

    expect(english).toHaveAttribute("aria-checked", "false");
    expect(french).toHaveAttribute("aria-checked", "false");
    expect(german).toHaveAttribute("aria-checked", "false");
    expect(spanish).toHaveAttribute("aria-checked", "false");
    expect(finnish).toHaveAttribute("aria-checked", "false");

    await user.click(english);
    await user.click(french);
    await user.click(german);
    await user.click(spanish);
    await user.click(finnish);

    expect(english).toHaveAttribute("aria-checked", "true");
    expect(french).toHaveAttribute("aria-checked", "true");
    expect(german).toHaveAttribute("aria-checked", "true");
    expect(spanish).toHaveAttribute("aria-checked", "true");
    expect(finnish).toHaveAttribute("aria-checked", "true");

    // copyright
    const all = screen.getByLabelText(/all/i);
    const yes = screen.getByLabelText(/yes/i);

    expect(all).toHaveAttribute("aria-checked", "true");

    await user.click(yes);

    expect(all).toHaveAttribute("aria-checked", "false");
    expect(yes).toHaveAttribute("aria-checked", "true");

    // author birth year range
    await user.clear(screen.getByPlaceholderText(/e.g. 1800/i));
    await user.type(screen.getByPlaceholderText(/e.g. 1800/i), "1000");
    await user.clear(screen.getByPlaceholderText(/e.g. 1900/i));
    await user.type(screen.getByPlaceholderText(/e.g. 1900/i), "2000");
    // submit
    await user.click(screen.getByRole("button", { name: /apply filters/i }));

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(getBooks).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "Frankenstein",
          languages: ["en", "fr", "de", "es", "fi"],
          copyright: true,
          authorYearStart: 1000,
          authorYearEnd: 2000,
        })
      );
    });

    await waitFor(() => {
      expect(setData).toHaveBeenCalled();
    });

    expect(setLoading).toHaveBeenCalledWith(false);
  });
  it("Shows toast on fetch error and stops loading", async () => {
    const { toast } = require("sonner");
    (getBooks as jest.Mock).mockRejectedValue(new Error("BOOM"));

    const user = userEvent.setup();
    const setData = jest.fn();
    const setLoading = jest.fn();
    render(<BookForm setData={setData} setLoading={setLoading}></BookForm>);

    await user.click(screen.getByRole("button", { name: /filters/i }));
    await user.click(screen.getByRole("button", { name: /apply filters/i }));

    await waitFor(() => expect(setLoading).toHaveBeenCalledWith(true));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "There was an issue fetching books..."
      )
    );
    await waitFor(() => expect(setLoading).toHaveBeenCalledWith(false));
  });

  it("input an invalid/too-early author birth year and ensure onSubmit does not fire", async () => {
    const user = userEvent.setup();
    const setData = jest.fn();
    const setLoading = jest.fn();
    render(<BookForm setData={setData} setLoading={setLoading}></BookForm>);

    await user.click(screen.getByRole("button", { name: /filters/i }));

    // author birth year range
    await user.clear(screen.getByPlaceholderText(/e.g. 1800/i));
    await user.type(screen.getByPlaceholderText(/e.g. 1800/i), "-500");
    await user.clear(screen.getByPlaceholderText(/e.g. 1900/i));
    await user.type(screen.getByPlaceholderText(/e.g. 1900/i), "3000");
    // submit
    await user.click(screen.getByRole("button", { name: /apply filters/i }));
    expect(getBooks).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();
    expect(setData).not.toHaveBeenCalled();
    expect(
      await screen.findAllByText(/please select a year between -400/i)
    ).toHaveLength(2);
  });
});
