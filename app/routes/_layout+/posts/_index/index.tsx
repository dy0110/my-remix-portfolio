import { format } from "@formkit/tempo";
import {
	type ClientLoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "@remix-run/react";
import { $path } from "remix-routes";
import { ContentCard } from "~/components/ContentCard";
// import { LeftFill, RightFill } from "~/components/Icons";
import { client } from "~/lib/client";
import type { PostsResult } from "~/lib/types";

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
	const url = new URL(request.url);
	const queryTag = url.searchParams.get("tag");
	try {
		const result = await client.get<PostsResult>({
			endpoint: "posts",
			queries: {
				limit: 10,
				offset: 0,
				filters:
					queryTag === null
						? undefined
						: `tags[contains]${decodeURI(queryTag)}`,
			},
		});

		return result;
	} catch (error) {
		console.error("posts clientLoader error", error);
		return;
	}
};

export default function Posts() {
	const result = useLoaderData<typeof clientLoader>();
	const contents = result?.contents;
	const navigate = useNavigate();
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-12 z-10 p-8">
			<h2 className="text-xl text-base-content text-left w-full font-semibold">
				Posts
			</h2>
			{contents === undefined || contents?.length === 0 ? (
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
			{/* {totalCount >= 10 && (
				<div className="w-full flex items-center justify-items-center justify-center">
					<div className="join grid grid-cols-2">
						<button
							type="button"
							disabled
							className="join-item btn btn-outline"
						>
							<LeftFill />
							前へ
						</button>
						<button type="button" className="join-item btn btn-outline">
							<RightFill />
							次へ
						</button>
					</div>
				</div>
			)} */}
		</div>
	);
}
