/* eslint-disable max-lines-per-function */
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

describe('User controller', () => {
  describe('#create', () => {
    const req = {};
    const res = {};

    before(() => {
      req.body = userMock.params;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(userService, 'create').resolves(userMock.create);
    });

    after(() => userService.create.restore());

    it('It must call "res.status" with value 201', async () => {
      await User.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('It must call "res.json" with a token', async () => {
      await User.create(req, res);
      expect(res.json.token).not.to.be.null;
    });
  });
});