const db = require('../models');
const Permissions = require('../config/permissions');
const { defaultMaxListeners } = require('ws');

module.exports.getAllUsers = async () => {
  try {
    const allUsers = await db.User.findAll();
    return allUsers;
  } catch (error) {
    console.error('Something went wrong');
    return null;
  } 
}

module.exports.getUserById = async (id) => {
  return await db.User.findByPk(id);
}

module.exports.createUser = async (args) => {
  const { email, password, firstName, lastName } = args;
  var roleId = 0;
  try {
    const newUser = await db.User.create({
      email,
      password,
      firstName,
      lastName,
      roleId,
    });

    return newUser;

  } catch (error) {
    console.error(error);
    return null;
  }
}

// Updated User
module.exports.updateUser = async (args, context) => {
  const { user } = context;

  const { id } = user;
  
  const { email, firstName, lastName } = args;

  const hasPermission = await user.can(Permissions.UPDATE_USER);
  
  if(!hasPermission) {
    return null;
  }

  try {
    await db.User.update({
      email,
      firstName,
      lastName,
    }, { where: { id } });

    return await db.User.findByPk(id);

  } catch (e) {
    console.error(e);
    return null;
  }
}

// Follow User
module.exports.followUser = async (args, context) => {
  const { user } = context;
  
  if(!user) {
    return null;
  }

  const userFollowing = user.id;
  
  const userFollowed = args.id;

  var exists = await db.Follow.findOne({ where: {userFollowing, userFollowed}});

  if(exists){
    return { token : "Allready following user"};
  }
  try {
    await db.Follow.create({
      userFollowing,
      userFollowed,
    });

    return { token : "Successfully followed user "};

  } catch (e) {
    console.error(e);
    return { token: "Error following user" };
  }
}

// Follow User
module.exports.unfollowUser = async (args, context) => {
  const { user } = context;
  
  if(!user) {
    return null;
  }

  const userFollowing = user.id;
  
  const userFollowed = args.id;

  var exists = await db.Follow.findOne({ where: {userFollowing, userFollowed}});

  try{
    if (exists.id){
      await db.Follow.destroy({
        where: {
          userFollowing,
          userFollowed
        }
      });
      return { token : "User unfollowed"};
    }
    
  }
  catch(e){
    return { token : "You are not following this user"};
  }
}


// Nothing
module.exports.deleteUser = (req, res) => {
  
}
