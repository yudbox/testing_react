// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MovieDetails from "../components/movie-details";
import userEvent from "@testing-library/user-event";
import MovieForm from "../components/movie-form";

describe("MovieDetails component test", () => {
  const emptyMovie = {
    title: "",
    description: "",
  };

  test("should have form elements", () => {
    const { getByLabelText, getByRole } = render(
      <MovieForm movie={emptyMovie} />
    );
    const title = getByLabelText(/title/i);
    const description = getByLabelText(/description/i);
    const submitButtom = getByRole("button", { name: /create/i });

    console.log("1111111111111 description", description.innerHTML);

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(submitButtom).toBeTruthy();
  });
});
