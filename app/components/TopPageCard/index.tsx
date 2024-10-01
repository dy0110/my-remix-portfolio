type Props = {
	text: string;
	buttonText: string;
	onClick: () => void;
};

export function TopPageCard({ text, buttonText, onClick }: Props) {
	return (
		<div className="card w-64 drop-shadow-md bg-base-100 z-10 opacity-95">
			<div className="card-body items-center text-center">
				<p>{text}</p>
				<div className="card-actions justify-end">
					<button type="button" className="btn btn-primary" onClick={onClick}>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
}
