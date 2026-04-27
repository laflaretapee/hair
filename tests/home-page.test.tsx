import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the main landing sections", () => {
    const { container } = render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1, name: /Риды Яшиной/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Услуги" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Color Flow" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Портфолио" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Отзывы" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Запись" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Записаться онлайн/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
    expect(screen.getByText(/Точная стоимость определяется после консультации/i)).toBeInTheDocument();
    expect(screen.getByText(/продукцию erayba/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hero motion/i)).not.toBeInTheDocument();

    const videos = Array.from(container.querySelectorAll("video"));
    expect(videos).toHaveLength(2);
    expect(videos.every((video) => video.muted)).toBe(true);
    expect(videos.every((video) => video.getAttribute("preload") === "metadata")).toBe(true);
    expect(container.querySelector(".color-flow-canvas")).toBeInTheDocument();
  });
});
