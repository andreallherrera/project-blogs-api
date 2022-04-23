/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before } = require('mocha');
const { expect } = require('chai');

const loginMocks = require('../mocks/loginMocks');
const loginMiddleware = require('../../middlewares/loginMiddleware');

require('chai').use(require('sinon-chai'));

describe('loginMiddlewares', () => {
  describe('#validateParams', () => {
    describe('Field "email"', () => {
      const res = {};
      const req = {};

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });

      it('It must return an error message if the request does not have an "email"', async () => {
        req.body = { password: loginMocks.params.password }; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"email" is required' })).to.be.true;
      });

      it('It must return an error message if "email" is empty', async () => {
        req.body = { email: '', password: loginMocks.params.password }; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"email" is not allowed to be empty' })).to.be.true;
      });

      it('It must return an error message if the email is not registered', async () => {
        req.body = loginMocks.params; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: 'Invalid fields' })).to.be.true;
      });
    });

    describe('Field "password"', () => {
      const res = {};
      const req = {}; 

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });

      it('It must return an error message if the request does not have an "email"', async () => {
        req.body = { email: loginMocks.params.email }; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"password" is required' })).to.be.true;
      });

      it('It must return an error message if "password" is empty', async () => {
        req.body = { email: loginMocks.params.email, password: '' }; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith(
          { message: '"password" is not allowed to be empty' },
        )).to.be.true;
      });

      it(`It must return an error message if "password" 
      does not match with the registered one`, async () => {
        req.body = { email: loginMocks.params.email, password: 'otherPassword' }; 
        await loginMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith(
          { message: 'Invalid fields' },
        )).to.be.true;
      });
    });

    // describe('When all params are ok', () => {
    //   const req = {};
    //   const res = {};

    //   before(() => {
    //     req.body = loginMocks.params;
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub();
    //   });

    //   it('It return a status 200 and a token', async () => {
    //     await loginMiddleware.validateParams(req, res);
    //     expect(res.status.calledWith(200)).to.be.true;
    //     expect(res.json.token).not.to.be.null;
    //   });
    // });
  });
});