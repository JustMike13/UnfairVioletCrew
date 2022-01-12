const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
  } = require('graphql');
  
  module.exports = new GraphQLObjectType({
    name: 'Like',
    fields: () => { 
      const postType = require('./postType');

      return {
        post: {
          type: postType,
          resolve: async (source) => {
            return await source.getPost();
          }
        }
      }
    }
  });