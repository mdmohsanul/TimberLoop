import { expect } from "vitest";
import { sum } from "../components/sum.jsx";

test("sum function returns sum of two numbers", () => {
  const add = sum(2, 3);
  expect(add).toBe(5);
});
