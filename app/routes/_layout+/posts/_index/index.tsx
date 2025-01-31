import { format } from "@formkit/tempo";
import {
	type ClientLoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router";
import { $path } from "safe-routes";
import { z } from "zod";
import { zx } from "zodix";
import { ContentCard } from "~/components/ContentCard";
import { Pagination } from "~/components/Pagination";
import { client } from "~/lib/client";
import type { PostsResult } from "~/lib/types";

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
	const parseRequest = zx.parseQuerySafe(request, {
		tag: z.string().optional(),
		page: z.optional(zx.NumAsString),
	});

	if (!parseRequest.success) {
		console.error("posts parse params error", parseRequest.error);
		throw new Response("不正なパラメーターです。", { status: 400 });
	}

	try {
		const { tag, page } = parseRequest.data;
		const result = await client.get<PostsResult>({
			endpoint: "posts",
			queries: {
				limit: 10,
				offset: page === undefined ? 0 : page * 10,
				filters:
					tag === undefined ? undefined : `tags[contains]${decodeURI(tag)}`,
			},
		});

		return result;
	} catch (error) {
		console.error("posts clientLoader error", error);
		throw new Response("投稿一覧の取得に失敗しました。", { status: 400 });
	}
};

export default function Posts() {
	const result = useLoaderData<typeof clientLoader>();
	const contents = result?.contents;
	const totalCount = result?.totalCount;
	const navigate = useNavigate();

	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-12 z-10 p-8">
			{contents === undefined || contents?.length === 0 ? (
				<p className="text-center text-2xl">記事がありません</p>
			) : (
				<>
					<h2 className="text-xl text-base-content text-left w-full font-semibold">
						Posts
					</h2>
					<div className="w-full grid gap-5 grid-cols-[repeat(2,minmax(340px,1fr))] overflow-y-scroll p-2">
						{contents.map(({ id, title, createdAt, tags }, index) => (
							<ContentCard
								key={index}
								title={title}
								date={format(createdAt, { date: "short", time: "short" })}
								tags={tags?.split(",")}
								onClick={() => {
									navigate($path("/posts/:postId", { postId: id }));
								}}
							/>
						))}
					</div>
					{!totalCount ||
						(totalCount > 10 && (
							<div className="w-full flex items-center justify-items-center justify-center">
								<Pagination totalCount={totalCount} />
							</div>
						))}
				</>
			)}
		</div>
	);
}
