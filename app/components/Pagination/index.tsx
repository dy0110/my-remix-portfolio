import clsx from "clsx";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { $path } from "safe-routes";
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
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const { root, buttonStyle } = paginationStyle();
	const disabled = useMemo(() => {
		const currentPage = Number.parseInt(page ?? "0");
		const maxPage = Math.ceil(totalCount / 10) - 1;
		return currentPage >= maxPage;
	}, [page, totalCount]);

	return (
		<div className={clsx(className, root())}>
			<button
				type="button"
				disabled={page === null}
				className={buttonStyle({
					disabled: page === null,
				})}
				onClick={() => {
					if (!page || page === "1") {
						navigate($path("/posts"));
						return;
					}
					const backPage = Number.parseInt(page) - 1;
					const params = new URLSearchParams();
					params.set("page", encodeURI(backPage.toString()));
					setSearchParams(params);
				}}
				aria-disabled={page === null}
			>
				<LeftFill />
				前へ
			</button>
			<button
				type="button"
				className={buttonStyle({
					disabled,
				})}
				disabled={disabled}
				onClick={() => {
					const forwardPage = !page ? 1 : Number.parseInt(page) + 1;
					const params = new URLSearchParams();
					params.set("page", encodeURI(forwardPage.toString()));
					setSearchParams(params);
				}}
				aria-disabled={page === null || disabled}
			>
				<RightFill />
				次へ
			</button>
		</div>
	);
}
