import type { MetaFunction } from "@remix-run/node";
import { TopPageCard } from "~/components/TopPageCard";

export const meta: MetaFunction = () => {
	return [
		{ title: "My portfolio" },
		{ name: "description", content: "Welcome to My portfolio!" },
	];
};

export default function Index() {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-12 z-10">
			<div className="w-full flex flex-col items-center gap-2">
				<h1 className="text-6xl text-slate-700 font-semibold">
					Welcome to My Portfolio!
				</h1>
				<p className="text-lg text-slate-700">
					このサイトは <b>dy0110</b> のポートフォリオです
				</p>
			</div>
			<div className="flex items-center justify-center  w-full gap-6">
				<TopPageCard
					text="製作者についてはこちら"
					buttonText="About"
					onClick={() => {}}
				/>
				<TopPageCard
					text="ブログについてはこちら"
					buttonText="Blog"
					onClick={() => {}}
				/>
			</div>
		</div>
	);
}
