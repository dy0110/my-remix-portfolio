import { useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import { LeftFill, RightFill } from "../Icons";

const paginationStyle = tv({
	slots: {
		root: "join grid grid-cols-2",
		buttonStyle: "join-item btn btn-outline",
	},
	variants: {
		disabled: {
			true: {
				buttonStyle: "btn-disabled",
			},
		},
	},
});

type Props = {
	totalCount: number;
	className?: string;
};

export function Pagination({ totalCount, className }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const { root, buttonStyle } = paginationStyle();

	return (
		<div className={clsx(className, root())}>
			<button
				type="button"
				disabled={page === null || Number.parseInt(page) === 1}
				className={buttonStyle({
					disabled: page === null || Number.parseInt(page) === 1,
				})}
				onClick={() => {
					if (!page) {
						return;
					}
					const backPage = Number.parseInt(page) - 1;
					const params = new URLSearchParams();
					params.set("page", encodeURI(backPage.toString()));
					setSearchParams(params);
				}}
				aria-disabled={page === null || Number.parseInt(page) === 1}
			>
				<LeftFill />
				前へ
			</button>
			<button
				type="button"
				className={buttonStyle({
					disabled: totalCount / 10 === Number.parseInt(page ?? "0"),
				})}
				disabled={totalCount / 10 === Number.parseInt(page ?? "0")}
				onClick={() => {
					const forwardPage = !page ? 1 : Number.parseInt(page) + 1;
					const params = new URLSearchParams();
					params.set("page", encodeURI(forwardPage.toString()));
					setSearchParams(params);
				}}
				aria-disabled={page === null}
			>
				<RightFill />
				次へ
			</button>
		</div>
	);
}
