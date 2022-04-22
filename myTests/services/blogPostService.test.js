/* eslint-disable max-lines-per-function */
const sinon = require('sinon');
const { expect } = require('chai');
const { before } = require('mocha');

const BlogPost = require('../../services/blogPostService');
const blogPostModel = require('../../models');
const blogPostMock = require('../mocks/blogPostMocks');

describe('BlogPost service', () => {
  describe('#create', () => {
    let blogPost;

    before(async () => {
      sinon.stub(blogPostModel.create).resolves(blogPostMock.inserted);
      blogPost = await BlogPost.create(blogPostMock.params);
    });
    
    it('must return the inserted blogPost', async () => {
      expect(blogPost.content).to.be.deep.eq(blogPostMock.inserted);
    });

    it('must return status 201', async () => {
      expect(blogPost.status).to.eq(201);
    });
  });
});