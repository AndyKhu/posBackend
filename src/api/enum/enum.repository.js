const db = require("../../utils/db")

const createEnum = (data) => {
  return db.enumDB.create({
    data,
  });
}

const updateEnum = (data) => {
  return db.enumDB.update({
    where:{
      id: data.id
    },
    data,
  });
}
const deleteEnum = (listId) => {
  return db.enumDB.deleteMany({
    where: {
      id: {in: listId}
    }
  })
}

const findEnum = (type) => {
  return db.enumDB.findMany({
    where: {
      type: type
    }
  })
}

module.exports={
  createEnum,
  updateEnum,
  deleteEnum,
  findEnum
}
