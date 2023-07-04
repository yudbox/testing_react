import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displaysinformation about the repository", () => {
  const repository = {
    language: "Javascript",
    stargazers_count: 5,
    open_issues: 1,
    forks: 30,
  };
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = repository[key];

    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
