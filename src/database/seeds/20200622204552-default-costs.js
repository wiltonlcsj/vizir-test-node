module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('call_costs', [
    {
      origin: '011',
      destiny: '016',
      cost: 1.9,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      origin: '016',
      destiny: '011',
      cost: 2.9,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      origin: '011',
      destiny: '017',
      cost: 1.7,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      origin: '017',
      destiny: '011',
      cost: 2.7,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      origin: '011',
      destiny: '018',
      cost: 0.9,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      origin: '018',
      destiny: '011',
      cost: 1.9,
      created_at: new Date(),
      updated_at: new Date(),
    }]),

  down: (queryInterface) => queryInterface.bulkDelete('call_costs', null, {}),
};
