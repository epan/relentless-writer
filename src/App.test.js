import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import App from "./App";

jest.useFakeTimers();

afterEach(cleanup);

it("renders welcome message", () => {
  const { getByText } = render(<App />);
  expect(
    getByText("Don't stop writing for more than 5 seconds")
  ).toBeInTheDocument();
});

it("shows text typed into the editor", () => {
  const { getByTestId } = render(<App />);
  const editor = getByTestId("editor");
  fireEvent.change(editor, {
    target: { value: "ZAPZAP" }
  });
  expect(editor.value).toBe("ZAPZAP");
});

it("clears text entered after 5 seconds of pausing", () => {
  const { getByTestId, rerender } = render(<App />);
  fireEvent.change(getByTestId("editor"), {
    target: { value: "ZAPZAP" }
  });
  expect(getByTestId("editor").value).toBe("ZAPZAP");
  jest.advanceTimersByTime(6000);
  rerender(<App />);
  expect(getByTestId("editor").value).toBe("");
});
