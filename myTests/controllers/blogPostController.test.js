/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const { before, after } = require('mocha');
const { expect } = require('chai');

const BlogPost = require('../../controllers/blogPostController');
const blogPostService = require('../../services/blogPostService');
const blogPostMock = require('../mocks/blogPostMocks');

describe('BlogPost controller', () => {
  describe('#create', () => {
    const req = { 
      body: blogPostMock.params,
      headers: { authorization: blogPostMock.token } };
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(blogPostService, 'create')
        .resolves({ status: 201, content: blogPostMock.inserted });
    });

    after(() => blogPostService.create.restore());

    it('It must call "res.status" with value 201', async () => {
      await BlogPost.create(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('It must call "res.json" with the inserted blogPost', async () => {
      await BlogPost.create(req, res);
      expect(res.json).not.to.deep.eq(blogPostMock.inserted);
    });
  });
});