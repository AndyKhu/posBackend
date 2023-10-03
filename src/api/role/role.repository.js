const db = require("../../utils/db")

const findRolePermissionByRoleId = (id) => {
  return db.rolePermission.findMany({
    where: {roleId: id}
  })
}

const findRolePermissionViewByRoleId = (id) => {
  return db.rolePermission.findMany({
    where: {roleId: id, view: true},
    include: {
      menu:true
    }
  })
}

const findRolePermissionViewByRoleIdandMenuId = (roleId,menuId) => {
  return db.rolePermission.findFirst({
    where: {roleId: roleId, menuId: menuId}
  })
}
const findRoles = ()=> {
  return db.role.findMany({
    include: {
      menuAccess: {
        include: {
          menu: true
        },
        orderBy: {
          menu: {
            sort: "asc"
          }
        }
      }
    }
  })
}
const createRole = (data) => {
  return db.Role.create({
    data,
  });
}

const deleteRoles = (listId) => {
  return db.role.deleteMany({
    where: {
      id: {in: listId}
    }
  })
}

const updateRole = (data) => {
  return db.$transaction(
    [
      db.rolePermission.deleteMany({
        where: {roleId: data.id}
      }),
      db.role.update({
        where: {id: data.id},
        data
      })
    ]
  )
}

module.exports = {
  createRole,
  deleteRoles,
  updateRole,
  findRoles,
  findRolePermissionByRoleId,
  findRolePermissionViewByRoleId,
  findRolePermissionViewByRoleIdandMenuId
}