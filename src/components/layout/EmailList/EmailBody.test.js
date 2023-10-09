import React from "react";
import { render, screen } from "@testing-library/react";
import EmailBody from "./EmailBody";

describe("EmailBody Component", () => {
  test("renders emails correctly", async () => {
    render(<EmailBody />);

    // Test email names
    expect(screen.getByText("Fardeen")).toBeInTheDocument();
    expect(screen.getByText("Ahamed")).toBeInTheDocument();

    // Test email subjects and bodies
    expect(screen.getByText("Subject1anyting1")).toBeInTheDocument();
    expect(screen.getByText("Subject2anyting2")).toBeInTheDocument();

    // Test email dates
    expect(screen.getByText("27-08-2023")).toBeInTheDocument();
    expect(screen.getByText("28-08-2023")).toBeInTheDocument();

    // Test star icons
    const starIcons = await screen.findAllByTestId('[data-testid="star-icon"]');
    expect(starIcons.length).toBe(2); // Assuming 2 emails in Dummy array
  });
});
