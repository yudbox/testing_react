import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("Can receive a new user and show it on a list", async () => {
  render(<App />);

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

  // simulate clicking on the button
  user.click(button);

  await waitFor(() => {
    const name = screen.getByRole("cell", { name: "jane" });
    expect(name).toBeInTheDocument();
  });
  await waitFor(() => {
    const email = screen.getByRole("cell", { name: "jane@gmail.com" });
    expect(email).toBeInTheDocument();
  });
});
