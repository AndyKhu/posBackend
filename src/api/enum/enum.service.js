const Validator = require("fastest-validator");
const v = new Validator();
const { createEnum, findCategory, updateEnum, deleteEnum, findEnum } = require("./enum.repository")

const Save = async (enumData) => {
  const schema = {
    name : { type: "string", min: 3, max: 100, optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...enumData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const enumsaved = await createEnum(data)
  return {data:enumsaved}
}

const Update = async (enumData) => {
  const schema = {
    name : { type: "string", min: 3, max: 100, optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...enumData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const enumsaved = await updateEnum(data)
  return {data:enumsaved}
}

const Delete = async (listId) => {
  const enumsaved = await deleteEnum(listId)
  return {data:enumsaved}
}

const getLists = async (type) => {
  let data = await findEnum(type)
  return {data}
}
module.exports = {
  Save,
  Update,
  Delete,
  getLists
}