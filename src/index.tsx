import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import { AuthProvider } from "stores/Auth";
import { ChatProvider } from "stores/ChatContext";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<AuthProvider>
				<ChatProvider>
					<App />
				</ChatProvider>
			</AuthProvider>
		</StrictMode>
	);
} else {
	throw new Error("Could not find root element to mount to!");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
