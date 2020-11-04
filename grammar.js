module.exports = grammar(require('tree-sitter-typescript/typescript'), {
    name: 'pts',
    rules: {
        _statement: ($, previous) => choice(...[$.template_statement, ...prevous.members],
        template_statement: $ => seq(
            'template',
            field('body', $.statement_block)
        )
    }
});
