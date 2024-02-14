const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename:{type:String,require:true},
    path:{type:String,require:true},
    mimetype:{type:String,require:true},
    originalname:{type:String,require:true},
    encoding:{type:String,require:true},
    size:{type:String,require:true},
    code:{type:Number,require:true,unique:true}
},
  { timestamps: true }
);
module.exports = mongoose.model("File", FileSchema);
