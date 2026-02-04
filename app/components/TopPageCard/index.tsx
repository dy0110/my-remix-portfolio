type Props = {
	text: string;
	buttonText: string;
	onClick: () => void;
};

export function TopPageCard({ text, buttonText, onClick }: Props) {
	return (
		<div className="card w-64 bg-base-100/60 backdrop-blur-md border border-base-content/10 rounded-3xl shadow-lg z-10 hover:scale-[1.02] transition-transform">
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
