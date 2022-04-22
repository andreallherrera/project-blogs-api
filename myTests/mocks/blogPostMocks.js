module.exports = {
  params: {
    title: 'Latest updates, August 1st',
    content: 'The whole text for the blog post goes here in this key',
    userId: 2,
    published: new Date(),
    updated: new Date(),
  },
  inserted: {
    id: 3,
    title: 'Latest updates, August 1st',
    content: 'The whole text for the blog post goes here in this key',
    userId: 2,
    published: new Date(),
    updated: new Date(),
  },
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJNaWNoYWVsIFNjaHVtYWNoZXIiLCJlbWFpbCI6I'
  + 'k1pY2hhZWxTY2h1bWFjaGVyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaW1hZ'
  + '2UiOiJodHRwczovL3Nwb3J0YnV6ei51b2wuY29tLmJyL21lZGlhL192ZXJzaW9ucy9nZXR0eWltYWd'
  + 'lcy01MjQ5MTU2NV93aWRlbGcuanBnIiwiaWF0IjoxNjUwNTg5OTgxLCJleHAiOjE2NTExOTQ3ODF'
  + '9.7Wa2s8RlXXa77r4jDzsJDJBuqc4mEIM-JelN1YsILVE',
  list: [
    {
      id: 1,
      title: 'Post do Ano',
      content: 'Melhor post do ano',
      userId: 1,
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/'
        + '1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      categories: [
        {
          id: 1,
          name: 'Inovação',
        },
      ],
    },
    {
      id: 2,
      title: 'Vamos que vamos',
      content: 'Foguete não tem ré',
      userId: 1,
      published: '2011-08-01T19:58:00.000Z',
      updated: '2011-08-01T19:58:51.000Z',
      user: {
          id: 1,
          displayName: 'Lewis Hamilton',
          email: 'lewishamilton@gmail.com',
          image: 'https://upload.wikimedia.org/wikipedia/'
          + 'commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      categories: [
        {
          id: 2,
          name: 'Escola',
        },
      ],
    },
  ],
};