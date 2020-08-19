'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable(
        'Users',
        {
          email: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
          name: Sequelize.STRING,
          birthdate: Sequelize.DATE,
          active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
          //foreign key usage
          attr4: {
            type: Sequelize.INTEGER,
            references: {
              model: 'another_table_name',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        },
        {
          engine: 'MYISAM',                     // default: 'InnoDB'
          charset: 'latin1',                    // default: null
          schema: 'public'                      // default: public, PostgreSQL only.
        }
    )

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Users')
  }
};
