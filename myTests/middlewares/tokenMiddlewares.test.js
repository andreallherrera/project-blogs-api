/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before } = require('mocha');
const { expect } = require('chai');

const tokenMiddleware = require('../../middlewares/tokenMiddleware');
const { messages } = require('../../utils/errors');

describe('Token middlewares', () => {
  describe('#verifyToken', () => {
    describe('when token is not sent in hearders', () => {
      const res = {};
      const req = {};
      const next = sinon.stub();
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        req.headers = { }; 
      });
  
      it('must return status 401', async () => {
        await tokenMiddleware.verifyToken(req, res, next);
        expect(res.status.calledWith(401)).to.be.true;
      });

      it('must return an error message', async () => {
        await tokenMiddleware.verifyToken(req, res, next);
        expect(res.json.calledWith({ message: messages.TOKEN_NOT_FOUND }));
      });
    });

    describe('when token is invalid', () => {
      const res = {};
      const req = {};
      const next = sinon.stub();
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        req.headers = { authorization: 'notValidToken' };
      });
  
      it('must return status 401', async () => {
        await tokenMiddleware.verifyToken(req, res, next);
        expect(res.status.calledWith(401)).to.be.true;
      });

      it('must return an error message', async () => {
        await tokenMiddleware.verifyToken(req, res, next);
        expect(res.json.calledWith({ message: messages.INVALID_TOKEN }));
      });
    });

    describe('when token is valid', () => {
      const res = {};
      const req = {};
      const next = sinon.stub();

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        req.headers = { authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJlbWFpbCI6ImJyZXR0QGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjUwNDgxNTM3LCJ
        leHAiOjE2NTEwODYzMzd9.zRk4MygGFjGfAfysxEpevJ3itFWqcl3VdcrNZCqR9j0` };
      });

      it('must call next function', async () => {
        await tokenMiddleware.verifyToken(req, res, next);
        expect(next.called).to.be.true;
      });
    });
  });
});