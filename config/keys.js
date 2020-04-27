//figure out what set of credentials to use
if(process.env.NODE_ENV === "production"){
  // we are in product return product keys
    module.exports = require("./prod");
}else{
    // we are in development return development keys
    module.exports = require("./dev");

}