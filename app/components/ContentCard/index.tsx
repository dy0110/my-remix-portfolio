import { useSearchParams } from "react-router";

type Props = {
	title: string;
	date: string;
	tags?: string[];
	onClick: () => void;
};

export function ContentCard({ title, date, tags, onClick }: Props) {
	const [, setSearchParams] = useSearchParams();
	return (
		<article className="card w-full bg-base-100/60 backdrop-blur-md border border-base-content/10 rounded-3xl shadow-lg hover:scale-[1.01] transition-transform">
			<div className="card-body flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="card-title">{title}</h2>
					<p>{date}</p>
				</div>
				{tags && (
					<div className="flex gap-2">
						{tags.map((tag, index) => (
							<button
								type="button"
								onClick={() => {
									const params = new URLSearchParams();
									params.set("tag", encodeURI(tag));
									setSearchParams(params);
								}}
								key={index}
								className="btn btn-accent btn-xs rounded-full text-xs overflow-hidden whitespace-nowrap text-ellipsis min-w-[48px]"
							>
								{tag}
							</button>
						))}
					</div>
				)}
				<button
					type="button"
					className="btn btn-outline btn-primary btn-sm w-32"
					onClick={onClick}
				>
					全文を見る
				</button>
			</div>
		</article>
	);
}
