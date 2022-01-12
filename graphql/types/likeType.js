const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
  } = require('graphql');
  
  module.exports = new GraphQLObjectType({
    name: 'Like',
    fields: { 
      token: {
        type: GraphQLString
      }
    }
  });