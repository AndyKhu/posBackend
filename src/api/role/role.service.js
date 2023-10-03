const { findRoles, deleteRoles, createRole, updateRole } = require("./role.repository")
const Validator = require("fastest-validator");
const v = new Validator();

const getRoles = async () => {
  let data = await findRoles()
  return {data}
}

const Save = async (roleData) => {
  const schema = {
    name : { type: "string", min: 3, max: 100, optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...roleData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  let childData = []
  data.menuAccess.map(pro => {
    const tmp = {...pro,menu:{connect:{id:pro.menu.id}}}
    delete tmp.menuId
    delete tmp.roleId
    childData.push(tmp)
  })
  const prismaData = {
    ...data, menuAccess: {
      create: childData
    }
  }

  const roleSaved = await createRole(prismaData)
  return {data:roleSaved}
}

const Update = async (roleData) => {
  const schema = {
    name : { type: "string", min: 3, max: 100, optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...roleData}

  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  let childData = []
  data.menuAccess.map(pro => {
    const tmp = {...pro,menu:{connect:{id:pro.menu.id}}}
    delete tmp.menuId
    delete tmp.roleId
    childData.push(tmp)
  })
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
  getRoles,
  Delete,
  Save,
  Update
}