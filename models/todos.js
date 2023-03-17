const mongoose=require("mongoose")

const todosSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        minLength: 4,
        maxLength: 25,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo"
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
   


}, { timestamps: true })

var todosModel = mongoose.model("Todo", todosSchema)
module.exports = todosModel