/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');

const Category = require('../../services/categoryService');
const categoryModel = require('../../models');
const categoryMock = require('../mocks/categoryMocks');
const { messages } = require('../../utils/errors');

describe('Category service', () => {
  describe('#create', () => {
    sinon.stub(categoryModel.create).resolves(categoryMock.inserted);
    
    it('must return the inserted category', async () => {
      const category = await Category.create(categoryMock.params);
      expect(category.content).to.be.deep.eq(categoryMock.inserted);
    });

    it('must return status 201', async () => {
      const category = await Category.create(categoryMock.params);
      expect(category.status).to.eq(201);
    });

    it('must return status 400 if name is missing', async () => {
      const category = await Category.create({ name: undefined });
      expect(category.status).to.eq(400);
    });

    it('must return an error message if name is missing', async () => {
      const category = await Category.create({ name: undefined });
      expect(category.content).to.be.deep.eq({ message: messages.REQUIRED('name') });
    });
  });
});