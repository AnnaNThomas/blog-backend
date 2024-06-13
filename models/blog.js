const mongoose = require("mongoose")
const Schema = mongoose.Schema(
    {
        "name": { type: String, require: true },
        "emailid": { type: String, require: true },
        "password": { type: String, require: true }

    }
)

let usermodel = mongoose.model("user", Schema);
module.exports = { usermodel }