const nodb = require('./nodb');
module.exports = async function(req,res){
  nodb.openDb('userlist',()=>{
    res.send(JSON.stringify(nodb.JSONDATA));
  })
}
