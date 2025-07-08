import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { ProgressProvider } from "./contexts/ProgressContext.tsx";
import { TermProvider } from "./contexts/TermContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<TermProvider>
				<ProgressProvider>
					<App />
				</ProgressProvider>
			</TermProvider>
		</ThemeProvider>
	</StrictMode>,
);
