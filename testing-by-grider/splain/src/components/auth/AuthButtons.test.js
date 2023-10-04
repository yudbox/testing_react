import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";
import { SWRConfig } from "swr";

const renderComponent = async () => {
  // SWRConfig нужен для того чтоб обновлять кеш для каждого запроса
  // которая кешит запросы по дефолту
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  // так как кнопки-ссылки внутри компонента рендеряться асинхронно
  // и зависят от параматра isLoading, тогда испольуем метод find
  // который позволяет подождать отрисовку
  await screen.findAllByRole("link");
};

// createServer() ---> GET '/api/user/' ---> {user: null}

describe("when user in not signed in", () => {
  createServer([
    {
      path: "api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);
  test("sign in and sign up button visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", {
      name: /sign in/i,
    });

    const signUpButton = screen.getByRole("link", {
      name: /sign up/i,
    });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });
  test("sign out button is not visible", async () => {
    await renderComponent();

    // используем query потому что этот метод возвращает null в то время как
    // get and find возвращают ошибку

    const signOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    });

    expect(signOutButton).not.toBeInTheDocument();
  });
});

// createServer() ---> GET '/api/user/' ---> {user: {id: 3, email: 'asd@gmail.com'}}

// describe.only() feature that run only this specific describe
describe("when user in signed in", () => {
  createServer([
    {
      path: "api/user",
      res: () => {
        return { user: { id: 3, email: "asd@gmail.com" } };
      },
    },
  ]);
  test("sign in and sign up button are not visible", async () => {
    await renderComponent();

    // используем query для поиска не существующих кнопок так как get
    // сразу вернет ошибку а нам нужно чтоб верул null чтобы проверить на не существование

    const signInButton = screen.queryByRole("link", {
      name: /sign in/i,
    });

    const signUpButton = screen.queryByRole("link", {
      name: /sign up/i,
    });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });
  test("sign out button visible", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", {
      name: /sign out/i,
    });

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});
