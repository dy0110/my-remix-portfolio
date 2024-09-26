module.exports = {
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  typescript: true,
  ignoreExisting: true,
  template: (variables, { tpl }) => {
    return tpl`
      ${variables.imports};
  
      ${variables.interfaces};
  
      export function ${variables.componentName} (${variables.props}: React.SVGProps<SVGSVGElement>): React.ReactElement {
          return ${variables.jsx};
        }
      `;
  },
};
