/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before } = require('mocha');
const { expect } = require('chai');

chai.use(chaiHttp);

const User = require('../../services/userService');
const userModel = require('../../models');
const userMock = require('../mocks/userMocks');
const { messages } = require('../../utils/errors');

describe('User service', () => {
  describe('#create', async () => {
    sinon.stub(userModel.create).resolves(userMock.inserted);
    const user = await User.create(userMock.params);

    it('It must return status 201', () => {
      expect(user.status).to.eq(201);
    });

    it('It must return a token as a content', () => {
      expect(user.content).to.have.any.keys('token');
    });
  });

  describe('#readByEmail', () => {
    describe('When an user is found', () => {
      sinon.stub(userModel.findOne).resolves(userMock.readOneWithPassword);
  
      it('It must return status 200', async () => {
        const { email } = userMock.readOne;
        const user = await User.readByEmail(email);
        expect(user.status).to.eq(200);
      });

      it('It must return the user as a content', async () => {
        const { email } = userMock.readOne;
        const user = await User.readByEmail(email);
        expect(user.content).to.have.any.keys('dataValues');
        expect(user.content.dataValues).to.deep.eq(userMock.readOneWithPassword);
      });
    });

    describe('When an user is not found', () => {
      before(async () => {
        sinon.stub(userModel.findOne).resolves(null);
      });

      it('It must return the content as null', async () => {
        const user = await User.readByEmail('otheremail@gmail.com');
        expect(user.status).to.eq(200);
        expect(user.content).to.be.eq(null);
      });
    });
  });

  describe('#read', () => {
    describe('When the users are found', () => {
      sinon.stub(userModel.findAll).resolves(userMock.readAll);
    
      it('It must return status 200', async () => {
        const user = await User.read();
        expect(user.status).to.eq(200);
      });

      it('It must return all users', async () => {
        const user = await User.read();
        expect(user.content).to.be.deep.eq(userMock.readAll);
      });
    });
  });

  describe('#readById', () => {
    describe('When an user is found', () => {
      sinon.stub(userModel.findOne).resolves(userMock.readOne);
  
      it('It must return status 200', async () => {
        const { id } = userMock.readOne;
        const user = await User.readById(id);
        expect(user.status).to.eq(200);
      });

      it('It must return the user as a content', async () => {
        const { id } = userMock.readOne;
        const user = await User.readById(id);
        expect(user.content).to.have.any.keys('dataValues');
        expect(user.content.dataValues).to.deep.eq(userMock.readOne);
      });
    });

    describe('When an user is not found', () => {
      sinon.stub(userModel.findOne).resolves(null);

      it('It must return status 404', async () => {
        console.log('hola');
        const user = await User.readById(0);
        expect(user.status).to.eq(404);
      });

      it('It must an error message as content', async () => {
        const user = await User.readById(0);
        expect(user.content).to.be.deep.eq({ message: messages.USER_NOT_EXISTS });
      });
    });
  });
});