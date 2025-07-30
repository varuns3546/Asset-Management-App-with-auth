import asyncHandler from 'express-async-handler';
import Entry from '../models/entryModel.js';
import User from '../models/userModel.js';

const getEntries = asyncHandler(async (req, res) => {
    try{
        const entries = await Entry.find({user: req.user._id})
        res.json(entries);
    } catch (error){
        console.error('Error fetching entries:', error); // Add this line
        res.status(500).json({
            success: false,
            message: 'Failed to get entries'
        });
    }
    
})

const getEntry = asyncHandler(async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    if(!entry){
        res.status(404)
        throw new Error('Entry not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(entry.user.toString() !== req.user._id){
        res.status(401)
        throw new Error('User not authorized')
    }
    res.status(200).json(entry)


});

const createEntry = asyncHandler(async (req, res) => {
    const title= req.body.title
    const content=req.body.content
    if (!title || !content) {
        res.status(400)
        throw new Error('Please complete fields')
    }
    {}
    const entry = new Entry({
        title,
        content,
        user: req.user._id
    });


    const savedEntry = await entry.save();

    res.status(200).json(entry)
  
})


const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id)

  if (!entry) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Make sure the logged in user matches the entry user
  if (entry.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await entry.deleteOne()

  res.status(200).json(req.params.id)
})

const updateEntry = asyncHandler(async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    if(!entry){
        res.status(404)
        throw new Error('Entry not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    if(entry.user.toString() !== req.user._id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedEntry = await Entry.findByIdAndUpdate
    (req.params.id, req.body, {
        new: true,
    })
    

    res.status(200).json(updateEntry)


});

export default{ 
    getEntries,
    getEntry,
    createEntry,
    deleteEntry,
    updateEntry
}