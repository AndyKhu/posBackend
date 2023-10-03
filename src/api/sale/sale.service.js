const { getSaleCount, createSale, findSaleById, findSales, deleteSales, updateSale } = require("./sale.repository")

const Save = async (saleData,userId) => {
  let data = {...saleData}
  let childData = []
  data.saleProduct.map(pro => {
    childData.push({qty:pro.qty,price:pro.price,product:{connect:{id:pro.productId}}})
  })
  const prismaData = {
    date: data.date,
    notrx: `TRX-${await getSaleCount()}`,
    total: data.total,
    saleProduct: {
      create: childData
    },
    userCreatedBy: {
      connect: {
        id: userId
      }
    },
    userUpdatedBy: {
      connect: {
        id: userId
      }
    }
  }
  const saleSaved = await createSale(prismaData)
  return {data:saleSaved}
}

const getSaleById = async (id) => {
  let data = await findSaleById(id)
  return {data}
}

const getSales = async (query) => {
  const limit = parseInt(query.limit) || 10
  const skip = parseInt(query.skip) || 0
  const search = query.search || ""
  let data = await findSales(limit,skip,search)
  return {data:data[0],count: data[1],totalPage: parseInt((data[1]+10-1)/10)}
}

const Delete = async (listId) => {
  const salesSaved = await deleteSales(listId)
  return {data:salesSaved}
}

const Update = async (saleData,userId) => {
  let data = {...saleData}
  let childData = []
  data.saleProduct.map(pro => {
    childData.push({qty:pro.qty,price:pro.price,product:{connect:{id:pro.productId}}})
  })
  const prismaData = {
    id: data.id,
    date: data.date,
    notrx: data.notrx,
    total: data.total,
    updatedBy: userId,
    saleProduct: {
      create: childData
    }
  }

  const saleSaved = await updateSale(prismaData)
  return {data:saleSaved}
}

module.exports = {
  Save,
  getSaleById,
  getSales,
  Delete,
  Update
}