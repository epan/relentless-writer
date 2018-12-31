import React from "react";
import { render, fireEvent } from "react-testing-library";
import App from "./App";

it("renders welcome message", () => {
  const { getByText } = render(<App />);
  expect(
    getByText("Don't stop writing for more than 5 seconds")
  ).toBeInTheDocument();
});

it("shows text typed into the editor", () => {
  const { getByLabelText } = render(<App />);
  const editor = getByLabelText("Don't stop writing for more than 5 seconds");
  fireEvent.change(editor, {
    target: { value: "ZAPZAP" }
  });
  expect(editor.value).toBe("ZAPZAP");
});
