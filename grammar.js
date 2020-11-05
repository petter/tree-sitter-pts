module.exports = grammar(require("tree-sitter-typescript/typescript/grammar"), {
  name: "pts",
  externals: false,
  rules: {
    _declaration: ($, previous) => choice(previous, $.template_declaration),
    template_declaration: ($) =>
      seq(
        "template",
        field("name", $.identifier),
        field("body", $.statement_block)
      ),
  },
});
