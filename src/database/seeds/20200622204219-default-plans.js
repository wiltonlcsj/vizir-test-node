module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('call_plans', [
    {
      name: 'FaleMais30',
      minutes: 30,
      excedent: 0.1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'FaleMais60',
      minutes: 60,
      excedent: 0.1,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'FaleMais120',
      minutes: 120,
      excedent: 0.1,
      created_at: new Date(),
      updated_at: new Date(),
    }]),

  down: (queryInterface) => queryInterface.bulkDelete('call_plans', null, {}),
};
