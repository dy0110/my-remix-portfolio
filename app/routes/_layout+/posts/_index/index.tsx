import { format } from "@formkit/tempo";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { $path } from "remix-routes";
import { ContentCard } from "~/components/ContentCard";
import { client } from "~/lib/client";
import type { PostsResult } from "~/lib/types";

export const clientLoader = async () => {
	try {
		const result = await client.get<PostsResult>({
			endpoint: "posts",
			queries: {
				limit: 10,
				offset: 0,
			},
		});

		return result;
	} catch (error) {
		console.error("posts clientLoader error", error);
		return;
	}
};

export default function Posts() {
	const { contents } = useLoaderData<typeof clientLoader>();
	const navigate = useNavigate();
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-12 z-10 p-8">
			<h2 className="text-xl text-base-content text-left w-full font-semibold">
				Posts
			</h2>
			{contents.length === 0 ? (
				<p className="text-center">記事がありません</p>
			) : (
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
			)}
		</div>
	);
}
