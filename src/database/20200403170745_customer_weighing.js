
exports.up = function (knex) {
  return knex.schema.createTable('customer-weighing', function (table) {
    table.string('id').primary();
    table.string('table').notNullable();
    table.string('position').notNullable();
    table.decimal('weigh').notNullable();
    table.decimal('weighValue').notNullable();
    table.decimal('totalValue').notNullable();
    table.boolean('paidOut').notNullable();
    table.datetime('lastUpdate').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('customer-weighing');
};
	