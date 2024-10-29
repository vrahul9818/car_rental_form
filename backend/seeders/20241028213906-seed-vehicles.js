'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Vehicles', [
      { type: 'Hatchback', model: 'Volkswagen Golf', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Hatchback', model: 'Ford Focus', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Hatchback', model: 'Hyundai i30', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'SUV', model: 'Toyota Highlander', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'SUV', model: 'Ford Explorer', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'SUV', model: 'Chevrolet Tahoe', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sedan', model: 'Honda Accord', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sedan', model: 'Toyota Camry', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sedan', model: 'BMW 3 Series', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Cruiser', model: 'Harley-Davidson Sportster', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Cruiser', model: 'Honda Shadow', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Cruiser', model: 'Kawasaki Vulcan', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sports', model: 'Yamaha YZF R1', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sports', model: 'Suzuki GSX-R1000', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type: 'Sports', model: 'Honda CBR1000RR', wheels: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
