const { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } = require("graphql");

const followUserInputType = new GraphQLInputObjectType({
  name: 'followInput',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    }
  }
});

module.exports = followUserInputType;