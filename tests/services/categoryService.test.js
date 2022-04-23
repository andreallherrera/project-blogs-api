/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');
const { before } = require('mocha');

const Category = require('../../services/categoryService');
const categoryModel = require('../../models');
const categoryMock = require('../mocks/categoryMocks');
const { messages } = require('../../utils/errors');

describe('Category service', () => {
  describe('#create', () => {
    let category;

    before(async () => {
      sinon.stub(categoryModel.create).resolves(categoryMock.inserted);
      category = await Category.create(categoryMock.params);
    });
    
    it('must return the inserted category', async () => {
      expect(category.content).to.be.deep.eq(categoryMock.inserted);
    });

    it('must return status 201', async () => {
      expect(category.status).to.eq(201);
    });

    it('must return status 400 if name is missing', async () => {
      category = await Category.create({ name: undefined });
      expect(category.status).to.eq(400);
    });

    it('must return an error message if name is missing', async () => {
      category = await Category.create({ name: undefined });
      expect(category.content).to.be.deep.eq({ message: messages.REQUIRED('name') });
    });
  });

  describe('#read', () => {
    sinon.stub(categoryModel.findAll).resolves(categoryMock.readAll);
    
    it('must return all the categories', async () => {
      const category = await Category.read();
      expect(category.content).to.be.deep.eq(categoryMock.readAll);
    });

    it('must return status 200', async () => {
      const category = await Category.read();
      expect(category.status).to.eq(200);
    });
  });
});