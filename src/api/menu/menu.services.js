const { findRolePermissionViewByRoleId, findRolePermissionViewByRoleIdandMenuId } = require("../role/role.repository")
const { findUserById } = require("../user/user.repository")
const { findMenus,findMenuByTitle, findMenuAccessForm } = require("./menu.repository")

const getMenuAccessLists = async (userId) => {
  const user = await findUserById(userId)
  const rolepermission = await findRolePermissionViewByRoleId(user.roleId)
  const parentList = []
  rolepermission.map(item => {
    if(!parentList.includes(item.menu.parentId))
      parentList.push(item.menu.parentId)
  })
  let menus = await findMenus()
  menus.map((item,index) => {
    const check = rolepermission.find(rp => rp.menuId === item.id) || parentList.includes(item.id)
    if(!check)
      menus.splice(index,1)
    if(item.child.length>0){
      item.child.map((child,index) => {
        const checkchild = rolepermission.find(rp => rp.menuId === child.id)
        if(!checkchild)
          item.child.splice(index,1)
      })
    }
  })
  return {menus}
}

const getMenuAccessForm = async () => {
  let menuAccessList = []
  const menulist = await findMenuAccessForm()
  menulist.map(item => {
    menuAccessList.push({
      id: undefined,
      roleId: undefined,
      menuId: item.id,
      add: true,
      view: true,
      edit: true,
      delete: true,
      menu: item
    })
  })
  return {menuAccessList}
}

const getMenuAccess = async (userId,menutitle) => {
  const user = await findUserById(userId)
  const menu = await findMenuByTitle(menutitle)
  const permission = await findRolePermissionViewByRoleIdandMenuId(user.roleId,menu.id)
  return {permission}
}

module.exports = {
  getMenuAccessLists,
  getMenuAccess,
  getMenuAccessForm
}