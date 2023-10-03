const Validator = require("fastest-validator");
const { findUsermany,createUserForm } = require("./user.repository");
const v = new Validator();

const getUsers = async () => {
  let data = await findUsermany()
  return {data}
}

const Save = async (userData) => {
  const schema = {
    username: {type: "string", min: 3, max: 100, optional: false},
    password: {type: "string", min: 3, max: 100, optional: false},
    roleId: {type: "string", optional: false},
    status: {type: "boolean", optional: false},
    // profile: {
    //   name: {type: "string", min: 3, max: 100, optional: false},
    //   gender: {type: "string", optional: false},
    //   job: {type: "string",optional: false},
    //   email: {type: "string", optional: false},
    //   img: {type: "string", optional: false}
    // }
  }
  let data = {...userData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const prismaData = {
    ...data,
    role:{
      connect:{
        id:data.roleId
      }
    },
    profile: {
      create: {...data.profile}
    }
  }

  delete prismaData.roleId

  const userSaved = await createUserForm(prismaData)
  return {data:userSaved}
}

const Update = async (userData) => {
  const schema = {
    id: {type: "string",optional:false},
    username: {type: "string", min: 3, max: 100, optional: false},
    password: {type: "string", min: 3, max: 100, optional: true},
    roleId: {type: "string", optional: false},
    status: {type: "boolean", optional: false},
    // profile: {
    //   id: {type: "string",optional:false},
    //   name: {type: "string", min: 3, max: 100, optional: false},
    //   gender: {type: "string", optional: false},
    //   job: {type: "string",optional: false},
    //   email: {type: "string", optional: false},
    //   img: {type: "string", optional: false}
    // }
  }
  let data = {...userData}

  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  let childData = []
  const prismaData = {
    ...data,
    menuAccess: {
      create: childData
    }
  }

  const roleSaved = await updateRole(prismaData)
  return {data:roleSaved}
}

const Delete = async (listId) => {
  const roleDeleted = await deleteRoles(listId)
  return {data:roleDeleted}
}

module.exports = {
  getUsers,
  Delete,
  Save,
  Update
}