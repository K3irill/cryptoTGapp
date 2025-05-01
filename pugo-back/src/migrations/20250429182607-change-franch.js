'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Добавляем 'fr' в ENUM для поля lang в Users
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Users_lang" ADD VALUE 'fr';
    `);
  },

  async down(queryInterface, Sequelize) {
    // Откатить изменения для ENUM невозможно, так как PostgreSQL не позволяет удалять значения из ENUM.
    // Мы не будем делать откат для этого шага.
  }
};
