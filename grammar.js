module.exports = grammar(require('tree-sitter-typescript/typescript/grammar'), {
  name: 'pts',
  rules: {
    _property_name: $ => alias(choice(
      $.identifier,
      $._reserved_identifier
    ), $.property_identifier),
    _declaration: ($, previous) => choice(previous, $.template_declaration, $.package_declaration),

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

    package_template_body: $ => seq('{', repeat($._package_template_body_decl), '}'),
    _package_template_body_decl: $ =>
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
        optional(seq('{', field('renamings', $.class_renamings), '}')),
        ';'
      ),
    class_renamings: $ => 
        seq($.class_rename, repeat(seq(',', $.class_rename))),
    class_rename: $ =>
      seq(field('class', $.rename), optional(seq('(', field('fields', $.field_renamings), ')'))),
    field_renamings: $ =>
        seq($.rename, repeat(seq(',', $.rename))), 
    rename: $ =>
      seq(field('old', $.identifier), '->', field('new', $.identifier)),

    addto_statement: $ =>
      seq('addto', field('name', $.identifier), optional($.class_heritage), $.class_body, ';'),
  },
});
