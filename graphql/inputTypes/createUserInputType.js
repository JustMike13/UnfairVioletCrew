const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

module.exports = createUserInputType;