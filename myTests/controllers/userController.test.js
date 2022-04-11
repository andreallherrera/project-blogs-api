/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const { expect } = require('chai');

chai.use(chaiHttp);

const User = require('../../controllers/userController');
const userService = require('../../services/userService');
const userMock = require('../mocks/userMocks');

describe('User service', () => {
  describe('#create', () => {
    const req = {};
    const res = {};

    before(() => {
      const { displayName, email, password, image } = userMock.inserted;
      req.body = { displayName, email, password, image };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(userService, 'create').resolves(userMock.inserted);
    });

    after(() => userService.create.restore());

    it('It must call "res.status" with value 201 and "res.json" with a token', async () => {
      await User.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.token).to.not.be.null;
    });
  });
});