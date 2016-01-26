var router = require('express').Router();

module.exports = function (table) {
  var Drink = require('../models/drink')(table);

  router.get('/', (req, res) => {
    Drink.findAll({
      where: req.query
    })
      .then( drinks => {
        res.json(drinks);
      })
      .catch( err => {
        res.status("Error occurred:").send(err);
      });
  });

  router.post('/', (req, res) => {
    Drink.sync()
      .then( () => {
        return Drink.create(req.body);
      })
      .then( drink => {
        res.json( drink );
      })
      .catch( err => {
        res.status("Error occurred").send(err);
      });
  });

  router.get('/:id', (req, res) => {
    Drink.findAll({
      where: {
        id: req.params.id
      }
    })
    .then( drinks => {
      res.json( drinks );
    }, err => {
      res.send( err );
    });
  });

  router.put('/:id', (req,res) => {
      Drink.update(req.body, {
      where: {
        id: req.params.id
      },
      validate: true,
      returning: true
    })
    .then( drink => {
      res.json(drink[1][0]);
    }, err => {
      res.send(err);
    });
  });

  router.delete('/:id', (req, res) => {
    Drink.destroy({
      where: {
        id: req.params.id
      }
    })
    .then( numDeleted => {
      res.send(numDeleted + " drink was deleted");
    }, err => {
      res.send(err);
    });
  });

  router.patch('/:id', (req, res) => {
    Drink.findById(req.params.id)
    .then( drink => {
      return drink.update(req.body, {validate: false});
    })
    .then( drink => {
      res.json(drink);
    }, err => {
      res.send(err);
    })
  });

  return router;
}
