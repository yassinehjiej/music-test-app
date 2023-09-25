import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../home";

describe("Home component", () => {
  it("renders the Home component", () => {
    render(<App />);

    // Ensure that the App component is rendered
    const appComponent = screen.getByTestId("home-component");
    expect(appComponent).toBeInTheDocument();
  });

  it("toggles the library when the toggle button is clicked", () => {
    render(<App />);

    const musicLibrary = screen.getByTestId("music-library");
    expect(musicLibrary).not.toHaveClass("collapsed");

    const toggleLibraryButton = screen.getByTestId("toggle-library-button");
    fireEvent.click(toggleLibraryButton);

    expect(musicLibrary).toHaveClass("collapsed");

    fireEvent.click(toggleLibraryButton);

    expect(musicLibrary).not.toHaveClass("collapsed");
  });

  it("renders the MusicLibrary component when library is not collapsed", () => {
    render(<App />);

    const musicLibraryComponent = screen.getByTestId("music-library");
    expect(musicLibraryComponent).toBeInTheDocument();
  });
});
