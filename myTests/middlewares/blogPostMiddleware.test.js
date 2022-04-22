/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before } = require('mocha');
const { expect } = require('chai');

const blogPostMocks = require('../mocks/blogPostMocks');
const blogPostMiddleware = require('../../middlewares/blogPostMiddleware');
const { messages } = require('../../utils/errors');

require('chai').use(require('sinon-chai'));

describe.only('blogPostMiddlewares', () => {
  describe('#validateParams', () => {
    const { title, content } = blogPostMocks.params;
    describe('when the request body does not have a "title"', () => {
      const res = {};
      const req = { body: { content, categoryIds: [1, 2] },
        headers: { authorization: blogPostMocks.token } };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });

      it('must call res.status with value 400', async () => {
        await blogPostMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('It must return a required error message', async () => {
        await blogPostMiddleware.validateParams(req, res);
        expect(res.json.calledWith({ message: messages.REQUIRED('title') })).to.be.true;
      });
    });

    describe('when the request body does not have a "content"', () => {
      const res = {};
      const req = { body: { title, categoryIds: [1, 2] },
        headers: { authorization: blogPostMocks.token } };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
      });

      it('must call res.status with value 400"', async () => {
        await blogPostMiddleware.validateParams(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('It must return required error message', async () => {
        await blogPostMiddleware.validateParams(req, res);
        expect(res.json.calledWith({ message: messages.REQUIRED('content') })).to.be.true;
      });
    });

    describe('Field "categoryIds', () => {
      describe('when the request body does not have a "categoryIds"', () => {
        const res = {};
        const req = { body: { title, content },
          headers: { authorization: blogPostMocks.token } };
  
        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();
        });
  
        it('must call res.status with value 400"', async () => {
          await blogPostMiddleware.validateParams(req, res);
          expect(res.status.calledWith(400)).to.be.true;
        });
  
        it('It must return required error message', async () => {
          await blogPostMiddleware.validateParams(req, res);
          expect(res.json.calledWith({ message: messages.REQUIRED('categoryIds') })).to.be.true;
        });
      });
      describe('when the ids do not exists in Categories table', () => {
        const res = {};
        const req = { body: { title, content, categoryIds: [122] },
          headers: { authorization: blogPostMocks.token } };
  
        before(() => {
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();
        });

        it('must call res.status with value 400"', async () => {
          await blogPostMiddleware.validateParams(req, res);
          expect(res.status.calledWith(400)).to.be.true;
        });
  
        it('It must return not found error message', async () => {
          await blogPostMiddleware.validateParams(req, res);
          expect(res.json.calledWith({ message: messages.CATEGORY_NOT_FOUND })).to.be.true;
        });
      });
    });

    // describe('When all params are ok', () => {
    //   const req = {};
    //   const res = {};

    //   before(() => {
    //     req.body = blogPostMocks.params;
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub();
    //   });

    //   it('It return a status 200 and a token', async () => {
    //     await blogPostMiddleware.validateParams(req, res);
    //     expect(res.status.calledWith(200)).to.be.true;
    //     expect(res.json.token).not.to.be.null;
    //   });
    // });
  });
});