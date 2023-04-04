const iModule = require('./iModule.js');
const template = require('./template.js');
module.exports = {
	go(req,res){
		res.send(template.make());
	}
}