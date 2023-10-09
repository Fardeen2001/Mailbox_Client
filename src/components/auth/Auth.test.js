import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Auth from "./Auth";
import { Provider } from "react-redux";
import store from "../../Store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe("Auth Component Tests", () => {
  const renderComp = (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
  test("renders the Auth component without errors", () => {
    render(renderComp);
  });
  test("updates state correctly when user enters input", () => {
    render(renderComp);
    fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password", { exact: false }), {
      target: { value: "password" },
    });
    expect(screen.getByLabelText("Email", { exact: false }).value).toBe(
      "test@example.com"
    );
    expect(screen.getByLabelText("Password", { exact: false }).value).toBe(
      "password"
    );
  });
  test("calls methods correctly when user interacts with component", () => {
    const mockHandleLogin = jest.fn();
    const mockHandleLogout = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/auth"
              element={
                <Auth
                  handleLogin={mockHandleLogin}
                  handleLogout={mockHandleLogout}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText("Login", { exact: false }));
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("Logout", { exact: false }));
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });
});
