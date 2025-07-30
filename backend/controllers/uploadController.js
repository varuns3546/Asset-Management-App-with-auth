import asyncHandler from 'express-async-handler';


const allowedExtensions = [
  '.doc', '.docx',
  '.xls', '.xlsx', '.xlsm',
  '.ppt', '.pptx', '.pptm',
  '.xltx', '.xltm',
  '.dotx', '.dotm',
  '.potx', '.potm',
  '.pdf', '.txt' // optional: non-office formats
];

const getDocuments = asyncHandler(async (req, res) => {

})

const getPhotos = asyncHandler(async (req, res) => {

})

const getUpload = asyncHandler(async (req, res) => {

})

const uploadDocument = asyncHandler(async (req, res) => {

})

const uploadPhoto = asyncHandler(async (req, res) => {

})

const deleteUpload = asyncHandler(async (req, res) => {

})


export default {
  getDocuments,
  getPhotos,
  getUpload,
  uploadDocument,
  uploadPhoto,
  deleteUpload
};