import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { ThemeProvider } from "../components/ThemeProvider";
import { ProgressProvider } from "../contexts/ProgressContext";
import { TermProvider } from "../contexts/TermContext";

// Mock Row to track renders
const renderCount = { count: 0 };

vi.mock("../components/Row", async () => {
	const React = await import("react");
	return {
		Row: React.memo((_props: unknown) => {
			renderCount.count++;
			return <div data-testid="row-mock">Row Mock</div>;
		}),
	};
});

describe("Row Re-render Behavior", () => {
	beforeEach(() => {
		renderCount.count = 0;
	});

	it("does not re-render rows when typing unrelated characters", async () => {
		const user = userEvent.setup();

		render(
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<TermProvider>
					<ProgressProvider>
						<App />
					</ProgressProvider>
				</TermProvider>
			</ThemeProvider>,
		);

		const input = screen.getByPlaceholderText("Enter your guess");

		// Initial render: 6 rows
		expect(renderCount.count).toBe(6);

		// Type a character
		await user.type(input, "A");

		// Should NOT re-render Rows (so count remains 6)
		// This proves that App passes stable props to Row
		expect(renderCount.count).toBe(6);
	});
});
