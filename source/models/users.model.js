const { readFileSync, writeFileSync } = require('fs');
const { resolve }= require('path');
const { hashSync } = require('bcryptjs')

const model = {
  index:function(){
    let file = resolve(__dirname,'../data','users.json');
    let data = readFileSync(file);
    return JSON.parse(data);
  },
  one:function(id){
    let file = resolve(__dirname,'../data','users.json');
    let data = readFileSync(file);
    let users = JSON.parse(data);
    return users.find(user => user.id === id)
  },
  create: function(data){
    let file = resolve(__dirname,'../data','users.json');
    let info = readFileSync(file);
    let users = JSON.parse(info);
    let last= users[users.length - 1];
    return Object({
        id: users.length == 0 ? 1 : last.id + 1,
        nombre: data.nombre,
        email: data.email,
        password: hashSync(data.password, 10),
        telefono: data.telefono == 0 ? null : data.telefono,
        imagen: "default.png",
        isAdmin: data.email.includes("@zaphir.com")
    })
  },
  write: function(data) {
    let file = resolve(__dirname,'../data','users.json');
    let info = JSON.stringify(data,null,2);
    return writeFileSync(file, info);
  },
}

module.exports = model;