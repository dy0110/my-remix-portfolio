import { Outlet } from "@remix-run/react";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

export default function _layout() {
	return (
		<div className="w-full h-screen flex flex-col">
			<Header
				className="sticky top-0"
				darkMode={false}
				onClickAbout={() => {}}
				onClickBlog={() => {}}
				onClickGithub={() => {}}
				onClickHome={() => {}}
				onClickMode={() => {}}
			/>
			<div className="flex justify-center">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
