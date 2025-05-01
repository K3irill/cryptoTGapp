'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Шаг 1: Переименовать старое поле
    await queryInterface.renameColumn('Tasks', 'description', 'description_old');

    // Шаг 2: Добавить новое поле JSONB
    await queryInterface.addColumn('Tasks', 'description', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: {} // временно, можно убрать после переноса
    });

    // Шаг 3: Скопировать и конвертировать старые данные в новый формат
    // Предполагаем, что старое описание — это английский вариант
    await queryInterface.sequelize.query(`
      UPDATE "Tasks"
      SET description = jsonb_build_object('en', description_old)
    `);

    // Шаг 4: Удалить старое поле
    await queryInterface.removeColumn('Tasks', 'description_old');
  },

  async down(queryInterface, Sequelize) {
    // Шаг 1: Переименовать новое поле
    await queryInterface.renameColumn('Tasks', 'description', 'description_json');

    // Шаг 2: Добавить старое поле обратно
    await queryInterface.addColumn('Tasks', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    });

    // Шаг 3: Восстановить старые строки из JSON
    await queryInterface.sequelize.query(`
      UPDATE "Tasks"
      SET description = description_json->>'en'
    `);

    // Шаг 4: Удалить временное поле
    await queryInterface.removeColumn('Tasks', 'description_json');
  }
};
