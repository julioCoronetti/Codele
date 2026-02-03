import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { ThemeProvider } from "../components/ThemeProvider";
import { ProgressProvider } from "../contexts/ProgressContext";
import { TermProvider } from "../contexts/TermContext";

// Mock Navigation to track renders
const renderCount = { count: 0 };

vi.mock("../components/Navigation", async () => {
	const React = await import("react");
	return {
		Navigation: React.memo((_props: unknown) => {
			renderCount.count++;
			return <div data-testid="navigation-mock">Navigation Mock</div>;
		}),
	};
});

describe("Navigation Performance", () => {
	beforeEach(() => {
		renderCount.count = 0;
	});

	it("renders Navigation multiple times on input change without memoization", async () => {
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

		// Initial render
		expect(renderCount.count).toBe(1);

		// Type a character
		await user.type(input, "A");

		// Should NOT re-render Navigation (so count remains 1)
		expect(renderCount.count).toBe(1);
		console.log(`Render count after typing 'A': ${renderCount.count}`);
	});
});
