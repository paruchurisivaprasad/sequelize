const {Sequelize}=require('sequelize');


const sequelize= new Sequelize('prasaddb','root','paruchurisivaprasad',{
    dialect:'mysql',host:'localhost'
})

module.exports=sequelize;