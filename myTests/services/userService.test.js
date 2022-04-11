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
      sinon.stub(User, 'create').resolves(userMock.response);
    });

    after(() => User.create.restore());

    it('It must return an object with status and content', async () => {
      const { displayName, email, password, image } = userMock.inserted;
      const user = await User.create({ displayName, email, password, image });
      expect(user.status).to.eq(userMock.response.status);
      expect(user).to.have.any.keys('content');
    });
  });
});