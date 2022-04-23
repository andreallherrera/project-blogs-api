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
const { messages } = require('../../utils/errors');

describe('User controller', () => {
  describe('#create', () => {
    const req = {};
    const res = {};

    before(() => {
      req.body = userMock.params;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(userService, 'create').resolves({ status: 201, content: userMock.token });
    });

    it('It must call "res.status" with value 201', async () => {
      await User.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('It must call "res.json" with a token', async () => {
      await User.create(req, res);
      expect(res.json.token).not.to.be.null;
    });
  });

  describe('#read', () => {
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(userService, 'read').resolves({ status: 200, content: userMock.readAll });
    });

    it('It must call "res.status" with value 200', async () => {
      await User.read(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('It must call "res.json" with all users', async () => {
      await User.read(req, res);
      expect(res.json).calledWith(userMock.readAll);
    });
  });

  describe('#readOne', () => {
    describe('when an user is found', () => {
      const req = { params: 1 };
      const res = {};
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(userService, 'readById').resolves({ status: 200, content: userMock.readOne });
      });

      after(() => userService.readById.restore());
  
      it('It must call "res.status" with value 200', async () => {
        await User.readOne(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
  
      it('It must call "res.json" with the user found', async () => {
        await User.readOne(req, res);
        expect(res.json).calledWith(userMock.readOne);
      });
    });

    describe('when an user is not found', () => {
      const req = { params: 0 };
      const res = {};
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(userService, 'readById')
          .resolves({ status: 404, content: { message: messages.USER_NOT_EXISTS } });
      });

      after(() => userService.readById.restore());
  
      it('It must call "res.status" with value 404', async () => {
        await User.readOne(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
  
      it('It must call "res.json" with a message error', async () => {
        await User.readOne(req, res);
        expect(res.json).calledWith({ message: messages.USER_NOT_EXISTS });
      });
    });
  });
});