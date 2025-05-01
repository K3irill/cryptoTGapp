'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Удаляем старый тип ENUM, если есть
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_Users_lang"
    `);
    
    // Создаём новый тип ENUM
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_Users_lang" AS ENUM ('ru', 'en', 'de', 'fn', 'cn', 'ua', 'pt', 'es')
    `);
    
    // Добавляем колонку правильно
    await queryInterface.addColumn('Users', 'lang', {
      type: Sequelize.ENUM('ru', 'en', 'de', 'fn', 'cn', 'ua', 'pt', 'es'),
      defaultValue: 'en',
      allowNull: false
    });
  },

  async down() {
    // Пустая функция, так как это фикс-миграция
  }
};