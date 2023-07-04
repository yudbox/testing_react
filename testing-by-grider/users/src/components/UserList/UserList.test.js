import React from "react";
import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

// используем данный подход
// т.к. beforeEach функция может вызванть предупркждение от @testing-library
const renderComponent = () => {
  //render the component with props
  const users = [
    {
      name: "Jane",
      email: "jane@getDefaultNormalizer.com",
    },
    {
      name: "John",
      email: "john@getDefaultNormalizer.com",
    },
  ];

  //   используем container ещтолько если нужен 2-й способ
  const { container } = render(<UserList users={users} />);

  return {
    container,
    users,
  };
};

test("render one row per user", () => {
  //find all rows in the table
  renderComponent();
  //   Данная утилита генерирует ссылку в терминал на сендбокс который покажет HTML разметку

  //   screen.logTestingPlaygroundURL();
  //   https://testing-playground.com/#markup=DwEwlgbgfMAuCGAjANgUxrAFq+IMCcNMoA5eAW1WAHosioBRc+MZAZxrs8M+1w0QB7EAE8CGPACl4AOyq08cPACtZqAAIBzVLAAiqAGbwArslglB+ZsjAAvVPgB0AY0HlOi2j1jepgzDIeElDK-jJaOvpGpuaW1nYOLm5B3DC0QqJpCCjoNODQQA

  // нашей компоненты и при клике на элемент подскажет какую команду использовать
  // для селекта нужного элемента
  // В данном случае мы считаем ряды таблицы и если нам нужно будет выьрать
  // конкретный рад <tr></tr> таблицы
  // прям в разметке мы можем прописать стили
  //<tr style="border: 10px solid red; display: block">
  // которые облегчат попадание на нужный элемент
  // screen.getByRole('row', {
  //     name: /name emails/i
  //   })

  // в данном случае мы получаем все ряды таблицы
  //   screen.getAllByRole("row") не подходит т.к. добавится еще один ряд из хедера таблицы

  // 1-й способ решения этой задачи использовань data тип для поиска нужного HTML элемента
  // возможно это не очень хорошо засырать html тэг инфой которая нужна только для тестирования
  // зависит от того что разработчик считает приемлимым
  // для этого используем метод within который будет искать в элементе
  // помеченым getByTestId("users-table")
  // а это только tbody и в нем уже будем искать ряды
  const rows = within(screen.getByTestId("users-table")).getAllByRole("row");

  // 2-й способ это использовать container который возвращает render метод
  //   это ссылка на родительские элемент ресуемого компонента UserList
  // и эта ссылка может ипользоваться для нативного JS

  // выключаем линтер чтоб он не выдавал предкпреждение мы знаем что делаем
  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");

  // данное красное выделение не является ошибкой просто @testing-library
  // предлагает использовать ее методы и не использовать нативный JS
  // т.к. это позволит взаимодействовать с DOM напрямую из тест файла
  //   но если другие методы не позволяют выбрать нужный элемент, то тогда можно и так

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});
test("render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    // селектор каждой ячейки можно подсматреть на screen.logTestingPlaygroundURL()
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
