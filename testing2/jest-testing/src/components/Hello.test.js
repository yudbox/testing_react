import { render } from "@testing-library/react";
import Hello from "./Hello";

it("Hello component should be displayed", () => {
  render(<Hello />);
});

// npm i @types/jest
// expect(). - будет подсказывать все существующие методы

// https://testing-library.com/docs/react-testing-library/cheatsheet
// getBy возарвщает ошибку
// getAllBy возарвщает ошибку
// queryBy возвращает null, без ошибки
// queryAllBy возвращает [], без ошибки
// findBy работает асинхронно и возвращает ошибку
// findAllBy работает асинхронно и возвращает ошибку
