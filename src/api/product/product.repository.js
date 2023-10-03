const db = require("../../utils/db")
const createProduct = (data) => {
  return db.product.create({
    data,
  });
}
const updateProduct = (data) => {
  return db.product.update({
    where:{
      id: data.id
    },
    data,
  });
}
const deleteProduct = (listId) => {
  return db.product.deleteMany({
    where: {
      id: {in: listId}
    }
  })
}
const findProductById = (id) => {
  return db.product.findUnique({
    where: {
      id: id
    }
  })
}
const findProducts = (limit,skip,search) => {
  return db.$transaction([
    db.product.findMany({
      where: {
        OR:[
          {code: {contains: search,mode: 'insensitive'}},
          {name: {contains: search,mode: 'insensitive'}},
          {description: {contains:search,mode: 'insensitive'}}
        ]
      },
      include: {
        unit:true,
        category: true,
        brand: true
      },
      skip: skip,
      take: limit
    }),
    db.product.count({
      where: {
        OR:[
          {code: {contains: search,mode: 'insensitive'}},
          {name: {contains: search,mode: 'insensitive'}},
          {description: {contains:search,mode: 'insensitive'}}
        ]
      }
    })
  ])
}
module.exports ={
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  findProducts
}