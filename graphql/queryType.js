const { 
  GraphQLObjectType, 
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');
const db = require('../models');

const userType = require('./types/userType');
const postType = require('./types/postType');
const { getAllUsers, getUserById } = require('../repository/users');
const { getAllPosts, getPostById, myFeed, userProfile } = require('../repository/posts');
const searchResultType = require('./types/searchResultType');
const { search } = require('../repository/search');
const followUserInputType = require('./inputTypes/followUserInputType');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: async () => {
        return await getAllUsers();
      }
    },
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve: async (source, { id }, context) => {
        return getUserById(id);
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async () => {
        return getAllPosts();
      }
    },
    post: {
      type: postType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve: async (source, { id }) => {
        return getPostById(id);
      }
    },
    myFeed: {
      type: new GraphQLList(postType),
      resolve: async (source, args, context) => {
        return await myFeed(context);
      }
    },
    userProfile: {
      type: new GraphQLList(postType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        }
      },
      resolve: async (source, args, context) => {
        return await userProfile( args );
      }
    },
    search: {
      type: new GraphQLList(searchResultType),
      args: {
        query: {
          type: GraphQLString,
        }
      },
      resolve: async (source, { query }) => {
        return search(query);
      }
    }
  }
});

module.exports = queryType;