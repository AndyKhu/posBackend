const { createProduct, updateProduct, findProductById, findProducts, deleteProduct } = require("./product.repository");
const Validator = require("fastest-validator");
const v = new Validator();

const Save = async (productData) => {
  const schema = {
    code : { type: "string", max: 100, optional: false },
    name : { type: "string", min: 3, max: 100, optional: false },
    stock: { type: "number", optional: false },
    buyprice: { type: "number", optional: false },
    sellprice: { type: "number", optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...productData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const productSaved = await createProduct(data)
  return {data:productSaved}
}

const Update = async (productData) => {
  const schema = {
    id: {type:"string",optional:false},
    code : { type: "string", max: 100, optional: false },
    name : { type: "string", min: 3, max: 100, optional: false },
    stock: { type: "number", optional: false },
    buyprice: { type: "number", optional: false },
    sellprice: { type: "number", optional: false },
    description : { type: "string", max: 100, optional: true },
  }
  let data = {...productData}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const enumsaved = await updateProduct(data)
  return {data:enumsaved}
}

const Delete = async (listId) => {
  const productSaved = await deleteProduct(listId)
  return {data:productSaved}
}

const getProductById = async (id) => {
  let data = await findProductById(id)
  return {data}
}

const getProducts = async (query) => {
  const limit = parseInt(query.limit) || 10
  const skip = parseInt(query.skip) || 0
  const search = query.search || ""
  let data = await findProducts(limit,skip,search)
  return {data:data[0],count: data[1],totalPage: parseInt((data[1]+10-1)/10)}
}

module.exports = {
  Save,
  Update,
  Delete,
  getProductById,
  getProducts
}