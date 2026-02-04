import { format } from "@formkit/tempo";
import {
	type ClientLoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router";
import { $path } from "safe-routes";
import { z } from "zod";
import { zx } from "zodix";
import { client } from "~/lib/client";
import { parseRichTextToDom } from "~/lib/parseText";
import type { Post } from "~/lib/types";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
	const parseParams = zx.parseParamsSafe(params, {
		postId: z.string(),
	});

	if (!parseParams.success) {
		console.error("postId parse params error", parseParams.error);
		throw new Response("不正なパラメーターです。", { status: 400 });
	}

	try {
		const id = parseParams.data.postId;
		const result = await client.get<Post>({
			endpoint: "posts",
			contentId: id,
		});

		return result;
	} catch (error) {
		console.error("postId clientLoader error", error);
		throw new Response("記事が見つかりませんでした。", { status: 404 });
	}
};

export default function PostId() {
	const contents = useLoaderData<typeof clientLoader>();
	const navigate = useNavigate();
	return (
		<div className="card w-[80%] bg-base-100/60 backdrop-blur-md border border-base-content/10 rounded-3xl shadow-lg">
			<div className="card-body flex flex-col gap-4">
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
									onClick={() => {
										navigate(
											$path("/posts", {
												tag: encodeURI(tag),
											}),
										);
									}}
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
