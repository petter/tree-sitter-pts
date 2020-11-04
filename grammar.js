module.exports = grammar(require('tree-sitter-typescript/typescript'), {
    name: 'pts',
    rules: {
        _declaration: ($, previous) => choice(...[...prevous.members, $.template_declaration],
        template_declaration: $ => seq(
            'template',
            field('name', $.identifier),
            field('body', $.statement_block)
        )
    }
});
