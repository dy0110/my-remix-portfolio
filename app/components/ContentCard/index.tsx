type Props = {
	title: string;
	date: string;
	tags: string[];
	onClick: () => void;
};

export function ContentCard({ title, date, tags, onClick }: Props) {
	return (
		<div className="card bg-base-100 w-full h-[200px]">
			<div className="card-body flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="card-title">{title}</h2>
					<p>{date}</p>
				</div>
				<div className="flex gap-2">
					{tags.map((tag, index) => (
						<div key={index} className="badge badge-primary">
							{tag}
						</div>
					))}
				</div>
				<button
					type="button"
					className="btn btn-primary btn-sm w-32"
					onClick={onClick}
				>
					全文を見る
				</button>
			</div>
		</div>
	);
}
