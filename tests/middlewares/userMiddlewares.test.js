/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before } = require('mocha');
const { expect } = require('chai');

const userMock = require('../mocks/userMocks');
const userMiddleware = require('../../middlewares/userMiddleware');

require('chai').use(require('sinon-chai'));

describe('userMiddlewares', () => {
  describe('#validateParams', () => {
    describe('Field "displayName"', () => {
      const res = {};
      const req = {};
      before(() => {
        const { email, password, image } = userMock.inserted;
        req.body = { displayName: 'Charles', email, password, image }; 
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });
  
      // after(() => userService.create.restore());
  
      it(`It must return an error message if field "displayName" has 
        less than 8 characters`, async () => {
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith(
          { message: '"displayName" length must be at least 8 characters long' },
        )).to.be.true;
      });
    });

    describe('Field "email"', () => {
      const res = {};
      const req = {};
      const { displayName, password, image, email } = userMock.inserted;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });
  
      // after(() => userMiddleware.validateParams.restore());
  
      it('It must return an error message if email format is email: justName', async () => {
        req.body = { displayName, email: 'test', password, image }; 
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"email" must be a valid email' })).to.be.true;
      });

      it('It must return an error message if email format is email: @gmail.com', async () => {
        req.body = { displayName, email: '@gmail.com', password, image }; 
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"email" must be a valid email' })).to.be.true;
      });

      it('It must return an error message if "email" is empty', async () => {
        req.body = { displayName, password, image }; 
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"email" is required' })).to.be.true;
      });

      it('It must return an error message if the email is already registered', async () => {
        req.body = { displayName, email, password, image }; 
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(409)).to.be.true;
        expect(res.json.calledWith({ message: 'User already registered' })).to.be.true;
      });
    });

    describe('Field "password"', () => {
      const res = {};
      const req = {};
      const { displayName, email, image } = userMock.inserted;

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });
  
      // after(() => userService.create.restore());
      it('It must return an error message if "password" is empty', async () => {
        req.body = { displayName, email, image }; 
        await userMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ message: '"password" is required' })).to.be.true;
      });
      
      describe(`It must return an error message if field "password" is not 
        6 characters long`, () => {
        it('When "password" has less than 6 characters', async () => {
          req.body = { displayName, email, password: '12345', image }; 
          await userMiddleware.validateParams(req, res);
          expect(res.status.calledWith(400)).to.be.true;
          expect(res.json.calledWith(
            { message: '"password" length must be 6 characters long' },
          )).to.be.true;
        });

        it('When "password" has more than 6 characters', async () => {
          req.body = { displayName, email, password: '1234567', image }; 
          await userMiddleware.validateParams(req, res);
          expect(res.status.calledWith(400)).to.be.true;
          expect(res.json.calledWith(
            { message: '"password" length must be 6 characters long' },
          )).to.be.true;
        });
      });
    });

    // describe('When all params are ok', () => {
    //   const req = {};
    //   const res = {};
    //   const next = sinon.stub();

    //   before(() => {
    //     req.body = userMock.params;
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub();
    //   });

    //   it('It must call next function', async () => {
    //     await userMiddleware.validateParams(req, res, next);
    //     expect(next).to.have.been.called;
    //   });
    // });
  });
});