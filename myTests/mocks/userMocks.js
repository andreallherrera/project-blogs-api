module.exports = {
  params: {
    displayName: 'Brett Wiltshire',
    email: 'brett@email.com',
    password: '123456',
    image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ'
    + '/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
  },
  inserted: {
    id: 1,
    displayName: 'Brett Wiltshire',
    email: 'brett@email.com',
    password: '123456',
    image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ'
    + '/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
  },
  create: {
    status: 201, 
    content: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImRpc3BsYXlOYW1lIjoiQnJldHQgV2lsdHNo'
        + 'aXJlIiwiZW1haWwiOiJicmV0dEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImltYWdlIjoiaHR0c'
        + 'DovLzQuYnAuYmxvZ3Nwb3QuY29tL19ZQTUwYWRRLTd2US9TMWdmUl82dWZwSS9BQUFBQUFBQUFBay8xRXJKR2'
        + 'dSV1pEZy9TNDUvYnJldHQucG5nIiwiaWF0IjoxNjQ5NjQ3OTMwLCJleHAiOjE2NTAyNTI3MzB9.DqAb15M'
        + 'p29D977ec4JFC3wL9uttjWPeqIELoXFNDZgg',
    },
  },
  readOk: {
    status: 200, 
    content: {
      dataValues: {
        id: 1,
        displayName: 'Rubinho Barrichello',
        email: 'rubinho@gmail.com',
        password: '123456',
        image: 'https://www.globalframe.com.br/gf_base/empresas/MIGA/imagens/' 
        + 'BDA23B2786FD3B7EC65745DC3FA1EE49D31B_barrichello-1.jpg',
      },
    },
  },
  readNotOk: {
    status: 200, 
    content: null,
  },
};