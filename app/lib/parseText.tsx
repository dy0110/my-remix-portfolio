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
					<a className="link link-accent" target="_blank">
						{domToReact(domNode.children as DOMNode[], options)}
					</a>
				);
			}

			if (domNode.type === "tag" && domNode.name === "ul") {
				const { style, ...rest } = domNode.attribs;
				return (
					<ul {...rest} className="list-disc pl-4">
						{domToReact(domNode.children as DOMNode[], options)}
					</ul>
				);
			}

			if (domNode.type === "tag" && domNode.name === "ol") {
				const { style, ...rest } = domNode.attribs;
				return (
					<ol {...rest} className="list-decimal pl-4">
						{domToReact(domNode.children as DOMNode[], options)}
					</ol>
				);
			}

			if (domNode.type === "tag" && domNode.name === "li") {
				const { style, ...rest } = domNode.attribs;
				return (
					<li {...rest} className="text-base-content leading-normal">
						{domToReact(domNode.children as DOMNode[], options)}
					</li>
				);
			}

			if (domNode.type === "tag" && domNode.name === "blockquote") {
				const { style, ...rest } = domNode.attribs;
				return (
					<blockquote
						{...rest}
						className="border-l-4 border-base-content italic pl-4 py-4 leading-loose"
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</blockquote>
				);
			}

			if (domNode.type === "tag" && domNode.name === "figure") {
				const { class: className, style, ...other } = domNode.attribs;
				return (
					<figure
						{...other}
						className={clsx("py-2 flex flex-col", className || "")}
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</figure>
				);
			}

			if (domNode.type === "tag" && domNode.name === "figcaption") {
				const { class: className, style, ...other } = domNode.attribs;
				return (
					<figcaption
						{...other}
						className={clsx("w-full text-center", className || "")}
					>
						{domToReact(domNode.children as DOMNode[], options)}
					</figcaption>
				);
			}

			if (domNode.type === "tag" && domNode.name === "pre") {
				const { class: className, style, ...other } = domNode.attribs;
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
				const { class: className, style, ...other } = domNode.attribs;
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
