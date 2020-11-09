module.exports = grammar(require('tree-sitter-typescript/typescript/grammar'), {
  name: 'pts',
  rules: {
    _declaration: ($, previous) => choice(previous, $.template_declaration),

    template_declaration: $ =>
      seq(
        'template',
        field('name', $.identifier),
        field('body', $.package_template_body)
      ),
    package_declaration: $ =>
      seq(
        'package',
        field('name', $.identifier),
        field('body', $.package_template_body)
      ),

    package_template_body: $ => seq('{', repeat($.inst_statement), '}'),
    package_template_body_decl: $ =>
      choice(
        $.inst_statement,
        $.addto_statement,
        $.class_declaration,
        $.interface_declaration
      ),

    inst_statement: $ =>
      seq(
        'inst',
        field('template_name', $.identifier),
        optional(seq('{', repeat1($.class_rename), '}', ';'))
      ),
    class_rename: $ =>
      seq($.rename, optional(seq('(', repeat1($.rename), ')'))),
    rename: $ =>
      seq(field('old', $.identifier), '->', field('new', $.identifier)),

    addto_statement: $ =>
      seq('addto', field('name', $.identifier), $.class_body, ';'),
  },
});
