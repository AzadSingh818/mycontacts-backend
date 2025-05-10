const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    if(!contacts){
        res.status(404);
        throw new Error("No contacts found");
    }
    res.status(200).json(contacts);
    //res.status(200).json({message: "Get all contacts"});
});

//@desc Create a contact
//@route POST /api/contacts
//@access private

const CreateContacts = asyncHandler(async(req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Please include all fields");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
    //res.status(201).json({message: "Create contacts"});
});

//@desc Get contact
//@route GET /api/contacts:id
//@access private

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
    //res.status(200).json({message: `Get contact with id ${req.params.id}`});
});

//@desc update contact
//@route PUT/api/contacts:id
//@access private

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized update this contact");
    }


    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedContact);

    //res.status(200).json({message: `Update contact with id ${req.params.id}`});
});

//@desc delete contact
//@route DELETE/api/contacts:id
//@access private

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized delete this contact");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
    //res.status(200).json({message: `Delete contact with id ${req.params.id}`});
});

module.exports = {
    getContacts,
    CreateContacts,
    getContact,
    updateContact,
    deleteContact
};