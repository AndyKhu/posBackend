const db = require("../../utils/db")

const findMenus = () => {
  return db.menu.findMany({
    where: {parentId: null},
    include: {
      child: true
    },
    orderBy: {
      sort: 'asc'
    }
  })
}
const findMenuAccessForm = () => {
  return db.menu.findMany({
    where: {
      NOT: {
        url: null
      }
    },
    include: {
      child: true
    },
    orderBy: {
      sort: 'asc'
    }
  })
}
const findMenuByTitle = (title) => {
  return db.menu.findFirst({
    where: {title: title}
  })
}
module.exports = {
  findMenus,
  findMenuByTitle,
  findMenuAccessForm
}