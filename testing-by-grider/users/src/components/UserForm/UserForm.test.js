import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  //render the component without any props, just itself
  render(<UserForm />);

  // manupilate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Asserion - make sure the Component is doing what we expect to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  //render the component without any props, just itself
  const mockedOnUserAddFunction = jest.fn();
  render(<UserForm onUserAdd={mockedOnUserAddFunction} />);

  // find the two inputs
  // можно искать все инпуты сразу
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // а можно искать конкретные инпуты по надписи в label
  const nameInput = screen.getByRole("textbox", {
    name: /name/i, // используя регулярку для поиска  <label>Name </label>
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i, // используя регулярку для поиска  <label>Email </label>
  });

  // simulate typing a name in the input
  user.click(nameInput);
  user.keyboard("jane"); //simulate typing a name in the input

  // simulate typing a email in the input
  user.click(emailInput);
  user.keyboard("jane@gmail.com"); //simulate typing an email in the input

  // find submit button
  const button = screen.getByRole("button");

  // simulate clicking on the button
  user.click(button);

  //assertion to make sure 'onUserAdd' get called with email/name

  // передаем замоканую mockedOnUserAddFunction в компоненту
  // данная функция с помощью jest имеет свое внутренне хранилище в котором
  // сохраняется сколько раз она была вызвана и
  // что в нее предается как аргументы а это объект с полями namе and email
  // и значениями которые мы указали при вводе в инпут
  expect(mockedOnUserAddFunction).toHaveBeenCalled();
  expect(mockedOnUserAddFunction).toHaveBeenCalledWith({
    name: "jane",
    email: "jane@gmail.com",
  });
});

test("empties the two inputs when form is submitted", async () => {
  //render the component without any props, just itself
  // const mockedOnUserAddFunction = jest.fn();
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i, // используя регулярку для поиска  <label>Name </label>
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i, // используя регулярку для поиска  <label>Email </label>
  });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("jane"); //simulate typing a name in the input
  user.click(emailInput);
  user.keyboard("jane@gmail.com"); //simulate typing an email in the input

  user.click(button);

  await waitFor(() => {
    expect(nameInput).toHaveValue("");
  });
  await waitFor(() => {
    expect(emailInput).toHaveValue("");
  });
});

// "link"
// "button"
// 'contentinfo' - <footer></footer>
// 'heading'  - <h1></h1>
// 'banner'  - <header></header>
// 'img'
// 'checkbox' - <input type="checkbox" />
// 'spinbutton' - <input type="number" />
// 'radio'  - <input type="radio" />
// 'textbox'  - <input type="text" />
// 'listitem'  - <li></li>
// 'list'  - <ul></ul>
