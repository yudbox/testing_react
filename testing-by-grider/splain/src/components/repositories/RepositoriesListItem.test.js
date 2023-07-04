import { act, render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

// 2 способ избежать ошибку это использовать Моки
// jest.mock("../tree/FileIcon.js", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "Js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  // из-за того что наша компонента использует import { Link } from 'react-router-dom';
  // возникает ошибка об отсутствии Провайдера Router для данной Линки
  // useHref() may be used only in the context of a <Router> component.
  // Для для тестирования мы должны создать данный провайдет. Есть 3 вида провайдера
  // BrowserRouter, HashRouter, MemoryRouter
  // для тестирования рекомендуется MemoryRouter

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this repository", async () => {
  const { repository } = renderComponent();
  // после рендера возникает предупреждение
  // An update to FileIcon inside a test was not wrapped in act(...).
  // это означает что какая-то компонента зависит от асинхроггой загрузки и Jest ничего не знает о этой загрузки
  // внутри RepositoriesListItem есть FileIcon которая подгружает класс асинхронно
  // 1 способ избежать ошибку
  // для избежания этого предупреждения нужно подождать когда эта кнопка подгрузит класс
  // для этого используем метод find, только этот метод выполняется асинхронно

  // screen.debug();
  await screen.findByRole("img", { name: "Javascript" });

  // 3 способ - самый плохой. Лучше НЕ ИСПОЛЬЗОВАТЬ!!!
  // вызвать искусственную задердку на 100 ms пока кнопка не отрендириться
  // await act(async () => {
  //   await pause();
  // });

  // screen.debug();

  const link = screen.getByRole("link", {
    // ищем линку с конкретным именем, для этого используем регулярку с игнором
    // так как внутри линки нет ничего кроме Иконки - используем aria-label чтоб задать имя
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

// const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

test("shows a fileicon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });
  // библиотека которая отображает иконки на основании имени которого
  // мы ей передаем (Javascript) генерит постаянные класы для одного и
  // того же имени. Поетому в тесте мы можем ориетироваться на класс потому что
  // он будет уникален
  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "Javascript" });

  // т.к. на странице две ссылки чтобы найти нужную используем рещгулярку
  // с текстом repository.owner.login равному facebook
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
