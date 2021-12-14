const { GraphQLObjectType, GraphQLString } = require("graphql");

const followType = new GraphQLObjectType({
  name: 'FollowResult',
  fields: {
    token: {
      type: GraphQLString
    },
  },
});

module.exports = followType;