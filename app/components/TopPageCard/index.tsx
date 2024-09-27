type Props = {
	text: string;
	buttonText: string;
	onClick: () => void;
};

export function TopPageCard({ text, buttonText, onClick }: Props) {
	return (
		<div className="card bg-neutral text-neutral-content w-60">
			<div className="card-body items-center text-center">
				<p>{text}</p>
				<div className="card-actions justify-end">
					<button type="button" className="btn btn-outline" onClick={onClick}>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
}
