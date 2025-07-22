const {Schema,model} =require('mongoose')

const blogSchema= new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    coverImageURL:{type:String},
    createdBy:{type:Schema.Types.ObjectId,
        ref:'users',
    }

},{
    timestamps:true
})

const Blog= model('blogs',blogSchema)

module.exports=Blog;