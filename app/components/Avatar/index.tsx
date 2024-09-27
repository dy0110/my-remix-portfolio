type Props = {
	src: string;
};

export function Avatar({ src }: Props) {
	return (
		<div className="avatar">
			<div className="w-[240px] h-[240px] rounded-full">
				<img aria-label="my-icon" src={src} />
			</div>
		</div>
	);
}
