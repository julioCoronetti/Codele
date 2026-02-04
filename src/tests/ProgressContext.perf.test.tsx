import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { describe, expect, it } from "vitest";
import { ProgressProvider, useProgress } from "../contexts/ProgressContext";

const renderCounter = { count: 0 };

const TestConsumer = React.memo(() => {
	useProgress();
	renderCounter.count++;
	return <div>Consumer</div>;
});

const TestParent = () => {
	const [_count, setCount] = useState(0);
	return (
		<div>
			<button type="button" onClick={() => setCount((c) => c + 1)}>
				Force Render
			</button>
			<ProgressProvider>
				<TestConsumer />
			</ProgressProvider>
		</div>
	);
};

describe("ProgressContext Performance", () => {
	it("does not re-render consumers when provider re-renders but value is unchanged", async () => {
		renderCounter.count = 0;
		const user = userEvent.setup();
		render(<TestParent />);

		// Initial render
		expect(renderCounter.count).toBe(1);

		// Force parent re-render
		const button = screen.getByText("Force Render");
		await user.click(button);

		// Expectation: count should still be 1 if optimized.
		// Currently it will be 2.
		expect(renderCounter.count).toBe(1);
	});
});
