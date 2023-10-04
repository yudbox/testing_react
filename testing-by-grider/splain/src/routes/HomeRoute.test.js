import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";

import { createServer } from "../test/server";

createServer([
  {
    method: "get", // можно не предавать get по дефолту
    path: "/api/repositories",
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />;
    </MemoryRouter>
  );

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  // Запускаем цикл на каждый язык программирования
  for (let language of languages) {
    // Для каждого языка убеждаемся в наличии двух ссылок

    const links = await screen.findAllByRole("link", {
      // Для этого находим все ссылки 'link'
      // так как сылок в компоненте может быть много, поэтому
      // ищем по уникальному тексту. для этого исаользуем регуляргу
      // для динамического подстваления используем конструктор RegExp
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    // проверяем что ссылки имеют правильое full_name и href аттрибут
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }

  // screen.debug();
});

// const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     const language = req.url.searchParams.get("q").split("language:")[1];
//     // console.log("111111 language", language);
//     return res(
//       ctx.json({
//         items: [
//           { id: 1, full_name: `${language}_one` },
//           { id: 2, full_name: `${language}_two` },
//         ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handlers);

// beforeAll(() => {
//   server.listen();
// });
// afterEach(() => {
//   server.resetHandlers();
// });
// afterAll(() => {
//   server.close();
// });
