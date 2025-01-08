import type { LinksFunction } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigate,
	useRouteError,
} from "@remix-run/react";

import "./tailwind.css";
import { useEffect, useState } from "react";
import { $path } from "remix-routes";
import { useSnapshot } from "valtio";
import { Spinner } from "./components/Spinner";
import type { ErrorObj } from "./lib/types";
import { store } from "./valtio/store";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="font-sansJp">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function HydrateFallback() {
	const [showChild, setShowChild] = useState(false);

	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	return <Spinner />;
}

export function ErrorBoundary() {
	const navigate = useNavigate();
	const mode = useSnapshot(store).darkMode;
	const error = useRouteError() as ErrorObj;

	return (
		<html lang="ja">
			<head>
				<title>エラーが発生しました。</title>
				<Meta />
				<Links />
			</head>
			<body
				className="w-full h-screen flex flex-col absolute"
				data-theme={mode ? "dark" : "retro"}
			>
				<main
					className="flex justify-center flex-col items-center h-screen w-full p-4"
					data-theme={mode ? "dark" : "retro"}
				>
					<h1 className="text-5xl font-bold">{error.status}</h1>
					<h2 className="text-2xl mt-4">{error.data}</h2>
					<div className="w-full mt-2 flex justify-center">
						<button
							type="button"
							className="btn btn-link btn-lg"
							onClick={() => {
								navigate($path("/"));
							}}
						>
							トップへ戻る
						</button>
					</div>
				</main>
				<Scripts />
			</body>
		</html>
	);
}
