const db = require("../../utils/db")

const createSale = (data) => {
  return db.sale.create({
    data,
  });
}

const getSaleCount = () => {
  return db.sale.count()
}

const findSaleById = (id) => {
  return db.sale.findUnique({
    where: {
      id: id
    },
    include:{
      saleProduct: {
        include: {
          product: {
            include: {
              unit: true
            }
          }
        }
      }
    }
  })
}

const findSales = (limit,skip,search) => {
  return db.$transaction([
    db.sale.findMany({
      where: {
        OR:[
          {notrx: {contains: search,mode: 'insensitive'}}
        ]
      },
      include: {
        saleProduct: true
      },
      skip: skip,
      take: limit
    }),
    db.sale.count({
      where: {
        OR:[
          {notrx: {contains: search,mode: 'insensitive'}}
        ]
      }
    })
  ])
}

const deleteSales = (listId) => {
  return db.sale.deleteMany({
    where: {
      id: {in: listId}
    }
  })
}

const updateSale = (data) => {
  return db.$transaction(
    [
      db.saleProduct.deleteMany({
        where: {parentId: data.id}
      }),
      db.sale.update({
        where: {id: data.id},
        data
      })
    ]
  )
}

module.exports = {
  getSaleCount,
  createSale,
  findSaleById,
  findSales,
  deleteSales,
  updateSale
}