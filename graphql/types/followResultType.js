const { GraphQLUnionType, GraphQLString } = require("graphql");
const userType = require('./userType');
const db = require('../../models');
const followType = require("./followType");

const followResultType = new GraphQLUnionType({
    name: 'FollowUnionResult',
    types: [userType, followType],
    resolveType: (value) => {
      if(value instanceof db.User) {
        return userType.name;
      }
      return followType.name;
    }
  });
  
  module.exports = followResultType;