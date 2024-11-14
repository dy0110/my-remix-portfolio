import { format } from "@formkit/tempo";
import { type ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { zx } from "zodix";
import { client } from "~/lib/client";
import { parseRichTextToDom } from "~/lib/parceText";
import type { Post } from "~/lib/types";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
	const parseParams = zx.parseParamsSafe(params, {
		postId: z.string(),
	});

	if (!parseParams.success) {
		return;
	}

	try {
		const id = parseParams.data.postId;
		const result = await client.get<Post>({
			endpoint: "posts",
			contentId: id,
		});

		return result;
	} catch (error) {
		console.error("posts clientLoader error", error);
		return;
	}
};

export default function PostId() {
	const contents = useLoaderData<typeof clientLoader>();
	return (
		<div className="card bg-base-100 w-[80%] overflow-y-scroll drop-shadow-md  opacity-95 ">
			<div className="card-body  flex flex-col gap-4">
				{contents ? (
					<>
						<h2 className="card-title text-base-content">{contents.title}</h2>
						<div className="w-full flex flex-col gap-2">
							<p className="text-sm text-base-content">
								作成日:
								{` ${format(contents.createdAt, { date: "short", time: "short" })}`}
							</p>
							<p className="text-sm text-base-content">
								更新日:
								{` ${format(contents.updatedAt, { date: "short", time: "short" })}`}
							</p>
						</div>
						<div className="flex gap-2">
							{contents.tags?.split(",").map((tag, index) => (
								<button
									type="button"
									onClick={() => {}}
									key={index}
									className="btn btn-accent btn-xs rounded-full text-xs overflow-hidden whitespace-nowrap text-ellipsis min-w-[48px]"
								>
									{tag}
								</button>
							))}
						</div>
						<div>{parseRichTextToDom(contents.content)}</div>
					</>
				) : (
					<p className="text-base-content">投稿内容が取得できませんでした</p>
				)}
			</div>
		</div>
	);
}
