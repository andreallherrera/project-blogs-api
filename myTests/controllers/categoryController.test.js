/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before, after } = require('mocha');
const { expect } = require('chai');

const Category = require('../../controllers/categoryController');
const categoryService = require('../../services/categoryService');
const categoryMock = require('../mocks/categoryMocks');
const { messages } = require('../../utils/errors');

describe('Category controller', () => {
  describe('#create', () => {
    describe('when sent valid params', () => {
      const req = { body: categoryMock.params };
      const res = {};
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(categoryService, 'create')
          .resolves({ status: 201, content: categoryMock.inserted });
      });
  
      after(() => categoryService.create.restore());

      it('It must call "res.status" with value 201', async () => {
        await Category.create(req, res);
        expect(res.status.calledWith(201)).to.be.true;
      });
  
      it('It must call "res.json" with the inserted category', async () => {
        await Category.create(req, res);
        expect(res.json).not.to.deep.eq(categoryMock.inserted);
      });
    });

    describe('when sent invalid params', () => {
      const req = { body: { } };
      const res = {};
  
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(categoryService, 'create')
          .resolves({ status: 400, content: { message: messages.REQUIRED('name') } });
      });
  
      it('It must call "res.status" with value 400', async () => {
        await Category.create(req, res);
        expect(res.status.calledWith(400)).to.be.true;
      });
  
      it('It must call "res.json" with a required error message', async () => {
        await Category.create(req, res);
        expect(res.json).not.to.deep.eq({ message: messages.REQUIRED('name') });
      });
    });
  });
});