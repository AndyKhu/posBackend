const Validator = require("fastest-validator");
const v = new Validator();
const { findUserByUsername, createUser } = require("../user/user.repository");
const { generateTokens } = require("../../utils/jwt");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const Register = async (user) => {
  const schema = {
    username : { type: "string", min: 5, max: 50, optional: false },
    password : { type: "string", min: 5, max: 255, optional: false },
    status: { type: "boolean", default: true }
  }
  let data = {username: user.username,password:user.password,status: user.status,role: user.role}
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")
  const existionUser = await findUserByUsername(user.username)
  if(existionUser)
    throw Error("Username already exist")

  const userDB = await createUser(data)
  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(userDB, jti);
  return {accessToken}
}
const Login = async (username,password)=>{
  const schema = {
    username : { type: "string", min: 5, max: 50, optional: false },
    password : { type: "string", min: 3, max: 255, optional: false }
  }
  const data = {
      username,
      password
  }

  // validation
  const validationResult = v.validate(data,schema)
  if(validationResult != true)
    throw Error("validation Failed")

  const existingUser = await findUserByUsername(username);

  if (!existingUser)
    throw Error("Invalid Login credentials")

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword)
    throw Error("Invalid Login credentials")

  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(existingUser, jti);
  // await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });
  delete existingUser.password
  // return {status: 200, data: {...existingUser , token: {accessToken, refreshToken}}}
  return {...existingUser , token: {accessToken}}
}
module.exports = {
  Register,
  Login
}