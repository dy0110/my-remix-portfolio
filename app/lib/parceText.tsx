import clsx from "clsx";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import parse, {
	type DOMNode,
	domToReact,
	type HTMLReactParserOptions,
	type Element,
} from "html-react-parser";
import { tv } from "tailwind-variants";

const headingStyle = tv({
	base: "text-base-content border-b-2 border-solid border-secondary my-[20px]",
	variants: {
		tagName: {
			h1: "text-3xl",
			h2: "text-2xl",
			h3: "text-xl",
			h4: "text-lg",
			h5: "text-base",
		},
	},
});

export const parseRichTextToDom = (text: string) => {
	const sanitizedText = DOMPurify.sanitize(text);
	const options: HTMLReactParserOptions = {
		replace(domNode) {
			if (domNode.type === "tag" && domNode.name === "h1") {
				return (
					<h1 className={headingStyle({ tagName: "h1" })}>
						{domToReact(domNode.children as DOMNode[], options)}
					</h1>
				);
			}

			if (domNode.type === "tag" && domNode.name === "h2") {
				return (
					<h2 className={headingStyle({ tagName: "h2" })}>
						{domToReact(domNode.children as DOMNode[], options)}
					</h2>
				);
			}

			if (domNode.type === "tag" && domNode.name === "h3") {
				console.log(headingStyle({ tagName: "h3" }));
				return (
					<h3 className={headingStyle({ tagName: "h3" })}>
						{domToReact(domNode.children as DOMNode[], options)}
					</h3>
				);
			}

			if (domNode.type === "tag" && domNode.name === "h4") {
				return (
					<h4 className={headingStyle({ tagName: "h4" })}>
						{domToReact(domNode.children as DOMNode[], options)}
					</h4>
				);
			}

			if (domNode.type === "tag" && domNode.name === "h5") {
				return (
					<h5 className={headingStyle({ tagName: "h5" })}>
						{domToReact(domNode.children as DOMNode[], options)}
					</h5>
				);
			}

			if (domNode.type === "tag" && domNode.name === "span") {
				return (
					<span className="text-base-content leading-loose">
						{domToReact(domNode.children as DOMNode[], options)}
					</span>
				);
			}

			if (domNode.type === "tag" && domNode.name === "p") {
				return (
					<p className="text-base-content leading-loose">
						{domToReact(domNode.children as DOMNode[], options)}
					</p>
				);
			}

			if (domNode.type === "tag" && domNode.name === "a") {
				return (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a className="link link-accent leading-loose" target="_blank">
						{domToReact(domNode.children as DOMNode[], options)}
					</a>
				);
			}

			if (domNode.type === "tag" && domNode.name === "ul") {
				return (
					<ul {...domNode.attribs} className="list-disc pl-4">
						{domToReact(domNode.children as DOMNode[], options)}
					</ul>
				);
			}

			if (domNode.type === "tag" && domNode.name === "ol") {
				return (
					<ul {...domNode.attribs} className="list-decimal pl-4">
						{domToReact(domNode.children as DOMNode[], options)}
					</ul>
				);
			}

			if (domNode.type === "tag" && domNode.name === "blockquote") {
				return (
					<blockquote
						{...domNode.attribs}
						className="border-l-4 border-base-content italic pl-4 py-4 leading-loose"
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</blockquote>
				);
			}

			if (domNode.type === "tag" && domNode.name === "figure") {
				const { class: className, ...other } = domNode.attribs;
				return (
					<figure {...other} className={clsx("py-2", className || "")}>
						{domToReact(domNode.children as DOMNode[], options)}
					</figure>
				);
			}

			if (domNode.type === "tag" && domNode.name === "pre") {
				const { class: className, ...other } = domNode.attribs;
				return (
					<pre
						{...other}
						className={clsx(
							"hljs p-2 rounded-md leading-loose overflow-scroll",
							className || "",
						)}
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</pre>
				);
			}

			if (domNode.type === "tag" && domNode.name === "code") {
				const { class: className, ...other } = domNode.attribs;
				const parent = domNode.parentNode as unknown as Element;

				return parent.name === "pre" ? (
					<code {...other} className={clsx("leading-loose", className)}>
						{parse(
							hljs.highlightAuto(
								domToReact(
									domNode.children as DOMNode[],
									options,
								) as unknown as string,
							).value,
						)}
					</code>
				) : (
					<code
						{...other}
						className={clsx(
							"bg-neutral text-primary px-2 py-0.5 rounded-md leading-loose",
							className || "",
						)}
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</code>
				);
			}
		},
	};
	return parse(sanitizedText, options);
};
