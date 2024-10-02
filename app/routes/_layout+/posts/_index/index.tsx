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

		return result.contents;
	} catch (error) {
		console.error("posts clientLoader error", error);
		return;
	}
};

export default function Posts() {
	const contents = useLoaderData<typeof clientLoader>();
	const navigate = useNavigate();
	return (
		<div className="card bg-base-100 w-[70%] h-full drop-shadow-md overflow-y-scroll opacity-95">
			<div className="card-body">
				<h2 className="card-title text-base-content">Posts</h2>
				<div className="flex flex-col gap-5">
					{contents.length === 0 ? (
						<p>記事がありません</p>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>
		</div>
	);
}
