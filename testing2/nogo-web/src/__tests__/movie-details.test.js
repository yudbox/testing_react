// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MovieDetails from "../components/movie-details";
import userEvent from "@testing-library/user-event";

describe("MovieDetails component test", () => {
  const selectedMovie = {
    id: 1,
    title: "Titanic",
    description: "Beautiful description",
    avg_rating: 3,
    no_of_ratings: 2,
  };

  test("Component should match with snapshot", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    // snapshot создает слепок компоненты и тесты быстрее работают
    // если HTML в компоненте изменится тест упадет
    // для решения этого нужно в терминале нажать букву "u"
    // либо удалить снапшот в папке __tests__/__snapshots__
    expect(container).toMatchSnapshot();
  });

  test("Should display title and description ", () => {
    const { queryByText } = render(<MovieDetails movie={selectedMovie} />);
    const text = queryByText(selectedMovie.title);
    const description = queryByText(selectedMovie.description);
    expect(text).toBeTruthy();
    expect(description).toBeTruthy();
  });

  test("Should display selected raiting stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const selected_stars = container.querySelectorAll(".orange");

    expect(selected_stars.length).toBe(selectedMovie.avg_rating);
  });

  test("Should display number of stars after rating", () => {
    const { getByTestId } = render(<MovieDetails movie={selectedMovie} />);

    const nomber_of_rating = getByTestId("no_ratings");
    // захардкодил значение в HTML так как БЕ не работает
    expect(nomber_of_rating.innerHTML).toEqual(
      `(${selectedMovie.no_of_ratings})`
    );
  });

  test("Mouseover should highlight the starts", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);

    const rating_stars = container.querySelectorAll(".rate-container svg");
    rating_stars.forEach((star, index) => {
      fireEvent.mouseOver(star);
      const highlighted_starts = container.querySelectorAll(".purple");
      expect(highlighted_starts.length).toEqual(index + 1);
    });
  });

  test("Mouseleave should unhighlight the starts", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);

    const rating_stars = container.querySelectorAll(".rate-container svg");
    rating_stars.forEach((star, index) => {
      fireEvent.mouseOver(star);
      fireEvent.mouseOut(star);
      const highlighted_starts = container.querySelectorAll(".purple");
      expect(highlighted_starts.length).toEqual(0);
    });
  });

  test("Click stars should triggered rating function to update", () => {
    const loadMovie = jest.fn();

    const { container } = render(
      <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
    );

    const rating_stars = container.querySelectorAll(".rate-container svg");
    rating_stars.forEach((star, index) => {
      userEvent.click(star);
    });
    setTimeout(() => {
      expect(loadMovie).toBeCalledTimes(rating_stars.length);
    });
  });
});
