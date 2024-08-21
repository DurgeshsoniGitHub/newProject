const express=require('express');
const UserModel=require('../models/user.model')
const router=express.Router();
router.get('/',async(req,res)=>{
    try {
        const users=await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"some Internal erro occured",error})
    }
    
})
router.get('/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const users=await UserModel.findById(id);
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"some Internal erro occured",error})
    }
})
router.post('/',async(req,res)=>{
    try {
        const {name,username,email,password}=req.body;
        if(!name || !username || !email || !password){
            return res.status(403).send('All Fields are mandatory');
        }
        let user=await UserModel.findOne({email});
        if(user){
            return res.status (403).send({message:"Email if is already Registerd with Us"})
        }
         user=await UserModel.findOne({username});
        if(user){
            return res.status(403).send({message:"Username is already taken by Someone"})
        }
        const newUser= new UserModel({name,username,email,password});
        const resp= await newUser.save();
        return res.status(201).send({message:'User created',resp})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Some Internal error occured",error})
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id= req.params.id;
        const resp=await UserModel.findByIdAndDelete(id);
        if(resp)
            res.status(200).send({message:'User deleted successfully'});
        else    
        res.status(404).send({message:'No user available to delete'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Some Internal error occured", error })
    }
})
router.delete('/:id',(req,res)=>{
    res.send('Delete User By ic');
})
module.exports=router;