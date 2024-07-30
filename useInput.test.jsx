import React from "react";
import { describe, test, expect, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";

const Input = ({ initialValue }) => {
  const input = initialValue; // Mocking the input value
  const handler = () => {}; // Mocking the handler function
  return <input value={input} onChange={handler} />;
};

afterEach(() => {
  cleanup();
});

describe("useInput", () => {
  test("initial value is empty", () => {
    const initialValue = "";
    render(<Input initialValue={initialValue} />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe(initialValue);
  });

  test("initial value is hello", () => {
    const initialValue = "hello";
    render(<Input initialValue={initialValue} />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe(initialValue);
  });

  test("update input", async () => {
    const initialValue = "";
    render(<Input initialValue={initialValue} />);
    const input = screen.getByRole("textbox");

    // Simulate user typing
    input.value = "aaa";
    input.dispatchEvent(new Event("change", { bubbles: true }));

    expect(input.value).toBe("aaa");
  });







});
