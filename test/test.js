var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = require('../app')('test');
var Test = require('../models/drink')('test');

describe('CRUD Test', () => {

  before('Clear test table', (done) => {
    Test.drop()
    .then( done, err => console.log(err) );
  });

  it('should post a new drink', (done) => {
    chai.request(app)
      .post('/drinks')
      .type('application/json')
      .send({
        type: 'smoothie',
        name: 'Strawberry',
        price: 4,
        calories: 400,
        ingredients: ['strawberry', 'orange juice']
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.type).to.equal('smoothie');
        expect(res.body.calories).to.equal(400);
        done();
      });
  });

  describe('get all and by ID', () => {

    before('Add another drink', (done) => {
      chai.request(app)
        .post('/drinks')
        .type('application/json')
        .send({
          type: 'coffee',
          name: 'Mocha',
          price: 3.5,
          ingredients: ['coffee', 'chocolate'],
          caffeine: 100
        })
        .end( () => done() );
    });

    it('should get all available drinks', (done) => {
      chai.request(app)
      .get('/drinks')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect( res.body[0].type ).to.equal('smoothie');
        expect( res.body[1].type ).to.equal('coffee');
        done();
      });
    });

    it('should return a drink by ID', (done) => {
      chai.request(app)
      .get('/drinks/1')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body[0].type).to.equal('smoothie');
        expect(res.body[0].name).to.equal('Strawberry');
        done();
      });
    });

    it('should modify a drink by ID', (done) => {
      chai.request(app)
      .patch('/drinks/1')
      .send({
        name: 'Orange Peach Mango'
      })
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Orange Peach Mango');
        expect(res.body.name).to.not.equal('Strawberry');
        done();
      });
    });

    it('should delete a drink by ID', (done) => {
      chai.request(app)
      .delete('/drinks/1')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        Test.findById(1)
        .then(item => {
          expect(item).to.equal(null)
          done()
        }, err => {
          console.log(err)
          done()
        });
      });
    });

  });

});
