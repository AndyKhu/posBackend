const db = require("../../utils/db")
const bcrypt = require('bcrypt');

const findUserByUsername = (username) => {
    return db.user.findFirst({
        where: {
            username: username
        },
        include: {
          role:true,
          profile:true
        }
    })
}

const createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, 12);
    user.role = {
        connect: {
            id: user.role.id
        }
    }
    return db.user.create({
      data: user,
    });
}

const createUserForm = (user) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
      data: user,
    });
}

const findUserById = (id) => {
    return db.user.findUnique({
        where: {
        id
        },
    });
}

const findUsermany = () => {
    return db.user.findMany({
        select: {
            id:true,
            username: true,
            roleId: true,
            profile: true,
            status: true
        }
    })
}

module.exports = {
    findUserByUsername,
    createUser,
    createUserForm,
    findUserById,
    findUsermany
}