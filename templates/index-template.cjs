//NOTE - アイコン(./app/components/Icons)のindex.tsためのテンプレートファイル
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require("path");

function defaultIndexTemplate(filePaths) {
	const exportEntries = filePaths.map(({ path: filePath }) => {
		const basename = path.basename(filePath, path.extname(filePath));
		return `export { Svg${basename} as ${basename} } from './${basename}'`;
	});
	return exportEntries.join("\n");
}

module.exports = defaultIndexTemplate;
