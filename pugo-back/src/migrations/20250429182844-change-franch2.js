'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Обновляем все записи, где lang = 'fn', на 'fr'
    await queryInterface.sequelize.query(`
      UPDATE "Users"
      SET lang = 'fr'
      WHERE lang = 'fn'
    `);
  },

  async down(queryInterface, Sequelize) {
    // Откатить обновление данных обратно на 'fn' не требуется, потому что это необратимая операция.
  }
};
