/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const { expect } = require('chai');

chai.use(chaiHttp);

const User = require('../../services/userService');
const userMock = require('../mocks/userMocks');

describe('User service', () => {
  describe('#create', () => {
    before(async () => {
      sinon.stub(User, 'create').resolves(userMock.create);
    });

    after(() => User.create.restore());

    it('It must return a token as a content with status 201', async () => {
      const user = await User.create(userMock.params);
      expect(user.status).to.eq(201);
      expect(user.content).to.have.any.keys('token');
    });
  });

  describe('#readByEmail', () => {
    describe('When an user is found', () => {
      before(async () => {
        sinon.stub(User, 'readByEmail').resolves(userMock.readOk);
      });
  
      after(() => User.readByEmail.restore());
  
      it('It must return the user with status 200', async () => {
        const { email } = userMock.inserted;
        const user = await User.readByEmail(email);
        expect(user.status).to.eq(200);
        expect(user.content).to.have.any.keys('dataValues');
      });
    });

    describe('When an user is not found', () => {
      before(async () => {
        sinon.stub(User, 'readByEmail').resolves(userMock.readNotOk);
      });
  
      after(() => User.readByEmail.restore());
  
      it('It must return the user', async () => {
        const { email } = userMock.inserted;
        const user = await User.readByEmail(email);
        expect(user.status).to.eq(200);
        // eslint-disable-next-line no-unused-expressions
        expect(user.content).to.be.null;
      });
    });
  });
});