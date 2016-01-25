const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://whitney:secret@localhost:5432/cafe');

module.exports = function (table) {
  table = table || 'drink';
  var Drink = sequelize.define(table, {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    caffeine: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    calories: {
      type: Sequelize.DOUBLE,
      allowNull: true
    }
  }, {
  validate: {
    eitherCaffeineOrCalories: function() {
      if ((this.caffeine === undefined) === (this.calories === undefined)) {
        throw new Error('Require either caffeine or calories')
      }
    }
  }
});
  return Drink;
}
