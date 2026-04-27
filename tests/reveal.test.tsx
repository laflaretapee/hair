import { render, screen } from "@testing-library/react";
import { Reveal } from "../components/motion/reveal";

describe("Reveal", () => {
  it("renders children inside a semantic wrapper", () => {
    render(
      <Reveal as="section" ariaLabel="motion content">
        <div>motion content</div>
      </Reveal>,
    );

    expect(screen.getByText("motion content")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "motion content" })).toBeInTheDocument();
  });
});
