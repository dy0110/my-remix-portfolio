import DOMPurify from "dompurify";
import parse, {
	type DOMNode,
	domToReact,
	type HTMLReactParserOptions,
} from "html-react-parser";

export const parseRichTextToDom = (text: string) => {
	const sanitizedText = DOMPurify.sanitize(text);
	const options: HTMLReactParserOptions = {
		replace(domNode) {
			if (domNode.type === "tag" && domNode.name === "span") {
				return (
					<span className="text-base-content">
						{domToReact(domNode.children as DOMNode[], options)}
					</span>
				);
			}

			if (domNode.type === "tag" && domNode.name === "p") {
				return (
					<p className="text-base-content">
						{domToReact(domNode.children as DOMNode[], options)}
					</p>
				);
			}
		},
	};
	return parse(sanitizedText, options);
};
