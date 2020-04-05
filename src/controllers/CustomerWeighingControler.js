const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    // criar registro através do iot + monitor touch
    async create(request, response) {
        const { table, position, weigh, weighValue } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        const totalValue = weigh * weighValue;
        const paidOut = false;
        const lastUpdate = new Date;

        await connection('customer-weighing').insert({
            id,
            table,
            position,
            weigh,
            weighValue,
            totalValue,
            paidOut,
            lastUpdate,
        });

        return response.json({ id });
    },

    // query de registros para mobile
    async query(request, response) {
        const customerWeighing = await connection('customer-weighing').select('*');

        return response.json(customerWeighing);
    },

    // get de um único registro para mobile
    async index(request, response) {
        const { id } = request.params;
        const customerWeighing = await connection('customer-weighing')
            .where('id', id)
            .first();

        return response.json(customerWeighing);
    },

    // delete auxiliar (exclusão pós pagamento)
    async delete(request, response) {
        const { id } = request.params;

        const customerWeighing = await connection('customer-weighing')
            .where('id', id)
            .first();

        // if (customerWeighing.paidOut != true) {
        //     return response.status(402).json({ error: 'Operation not permited! The customer not payed yet.' });
        // }

        await connection('customer-weighing').where('id', id).delete();

        return response.status(204).send();
    }
};