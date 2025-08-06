import { render, screen, describe, it, expect } from "@testing-library/react";

import Home from "./index-backup";

describe("Aranya One Dashboard", () => {
  it("renders main dashboard title", () => {
    render(<Home />);
    expect(screen.getByText(/Aranya One/)).toBeInTheDocument();
  });

  it("renders all navigation cards", () => {
    render(<Home />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders quick stats", () => {
    render(<Home />);
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
  });
});
