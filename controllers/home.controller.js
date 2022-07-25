const noteModel = require('../models/note.model')


exports.displayNotes = (req,res)=>{
    noteModel.find({userId:req.userId}).exec((err,notes)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(200).send(notes)
    })
}

exports.addNote = async(req,res)=>{
    const{title,desc} = req.body
    await noteModel.insertMany({title,desc,userId:req.userId}).then(()=>{
        return res.status(200).send({message:"note added successfully"})
    }).catch((err)=>{
        return res.status(500).send(err)
    })
}

exports.editNote = (req,res)=>{
    const{title,desc}= req.body
    let _id =req.params.id
    if (_id.length !== 24) {
        return res.status(404).send({message:"this is wrong id"})
    }
    if (_id==undefined) {
        return res.status(404).send({message:"this note doesn't exist or this is wrong id(undefined)"})
    }
    noteModel.findOne({_id}).exec(async(err,note)=>{
        if(err){
            return res.status(500).send({message:"error in editing note",error:err})
        }
        if(!note){
            return res.status(404).send({message:"this note doesn't exist or this is wrong id"})
        }
        await noteModel.updateOne({_id},{title,desc})
        res.status(200).send({message:"note edited successfully"})
    })
}

exports.deleteNote = (req,res)=>{
    if (req.params.id.length !== 24) {
        return res.status(404).send({message:"this is wrong id"})
    }
    if (req.params.id==undefined) {
        return res.status(404).send({message:"this note doesn't exist or this is wrong id(undefined)"})
    }
    noteModel.findOne({_id:req.params.id}).exec(async(err,note)=>{
        if(err){
            return res.status(500).send({message:"erorr during delete note",error:err})
        }
        if(!note){
            return res.status(404).send({message:"this note doesn't exist or this is wrong id"})
        }
        await noteModel.deleteOne({_id:req.params.id}).then(()=>{
            return res.status(200).send({message:"note deleted successfully"})
        }).catch((err)=>{
            return res.status(500).send({message:"catch error in deleting note",error:err})
        })
    })
}
