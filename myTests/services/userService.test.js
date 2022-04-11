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
      sinon.stub(User, 'create').resolves({ dataValues: userMock.inserted });
    });

    after(() => User.create.restore());

    it('It must return an object with id, displayName, email, password and image', async () => {
      const { displayName, email, password, image } = userMock.inserted;
      const user = await User.create({ displayName, email, password, image });
      expect(user.dataValues).to.deep.eq(userMock.inserted);
    });
  });
});