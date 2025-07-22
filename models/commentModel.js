const {Schema,model}= require('mongoose')

const commentSchema= new Schema({
    content:{type:String,require:true},
    blogId:{
        type:Schema.Types.ObjectId,
        ref:'blogs',
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'users',
    }
},{
    timestamps:true,
})

const Comment= model('comment',commentSchema);
module.exports= Comment