const mongoose = require('mongoose');
module.exports = {
  route:'mongodb+srv://gemasaja:AwM1L7AGRPTvXf1z@hao0db.f8lgex7.mongodb.net/?retryWrites=true&w=majority',
  dbName:'tes',
  address(){
    return this.route;
  },
  db:null,
  dbConfig(config={}){
    Object.assign(this,config);
  },
  setDbName(value){
    this.dbName = value;
  },
  async init(){
    this.db = await mongoose.connect(this.address(),{
      useNewUrlParser: true, useUnifiedTopology: true
    });
  },
  async start(init){
    if(init)init(this);
  },
  newSchema(config){
    this.schema[config.name] = new mongoose.Schema(config.schema);
  },
  schema:{
    general:new mongoose.Schema({
      parentad:String,
      email:String,
      username:String,
      password:String,
      name:String,
      age:String,
      birthdate:String,
      birthplace:String,
      motto:String,
      message:String,
      hobbies:String,
      dreams:String,
      profile:String,
      galery:Array
    }),
    users:new mongoose.Schema({
      id:String,
      email:String,
      username:String,
      password:String,
      motto:String,
      profile:String
    }),
    image:new mongoose.Schema({
      name:String,
      bufferData:Buffer,
      contentType:String
    })
  },
  async useDefault(config){
    await this.init();
    return mongoose.model(config.model,this.schema[config.schema]);
  },
  async get(config){
    const model = await this.useDefault(config);
    const result = await model.find(config.where);
    this.closeConnection();
    return result;
  },
  async set(config,dataresponse=false){
    const model = await this.useDefault(config);
    const result = new model(config.data);
    await result.save();
    this.closeConnection();
    if(dataresponse)return result;
    return true;
  },
  closeConnection(){
    this.db.disconnect();
  },
  async updateone(config){
    const model = await this.useDefault(config);
    const result = await model.updateOne(config.where,{$set:config.set});
    this.closeConnection();
    return true;
  },
  async deleteone(config){
    const model = await this.useDefault(config);
    const result = await model.deleteOne(config.where);
    this.closeConnection();
    return result;
  }
}
