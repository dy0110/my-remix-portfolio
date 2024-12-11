import { useLoaderData } from "@remix-run/react";
import { Avatar } from "~/components/Avatar";
import { client } from "~/lib/client";
import { parseRichTextToDom } from "~/lib/parseText";
import type { AboutResult } from "~/lib/types";

export const clientLoader = async () => {
	try {
		const result = await client.get<AboutResult>({
			endpoint: "profile",
		});

		return result.contents[0];
	} catch (error) {
		console.error("about clientLoader error", error);
		return;
	}
};

export default function About() {
	const { image, name, birthday, from, introduction, skills, interest } =
		useLoaderData<typeof clientLoader>();
	return (
		<div className="card bg-base-100 w-[70%] h-full drop-shadow-md overflow-y-scroll opacity-95">
			<div className="card-body">
				<h2 className="card-title text-base-content">About Me</h2>
				<figure className="px-10 pt-10">
					<Avatar src={image.url} />
				</figure>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2 px-6">
						<div className="text-base-content text-lg">名前: {name}</div>
						<div className="text-base-content">生年月日: {birthday}</div>
						<div className="text-base-content">出身: {from}</div>
					</div>
					<div className="flex flex-col gap-2 px-6">
						<div className="text-base-content text-lg">経歴</div>
						<div>{parseRichTextToDom(introduction)}</div>
					</div>
					<div className="flex flex-col gap-2 px-6">
						<div className="text-base-content text-lg">スキル</div>
						<div>{parseRichTextToDom(skills)}</div>
					</div>
					<div className="flex flex-col gap-2 px-6">
						<div className="text-base-content text-lg">興味のあること</div>
						<div>{parseRichTextToDom(interest)}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
