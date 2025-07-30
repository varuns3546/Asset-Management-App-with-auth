import asyncHandler from 'express-async-handler';
import multer from 'multer';
import { decode } from 'base64-arraybuffer';
import supabaseClient from '../config/supabaseClient.js';

const { supabase } = supabaseClient;

// File type configurations
const allowedDocumentExtensions = [
  '.doc', '.docx',
  '.xls', '.xlsx', '.xlsm',
  '.ppt', '.pptx', '.pptm',
  '.xltx', '.xltm',
  '.dotx', '.dotm',
  '.potx', '.potm',
  '.pdf', '.txt'
];

const allowedPhotoExtensions = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'
];

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
  
  if (req.route.path.includes('document')) {
    if (allowedDocumentExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Document type not allowed. Allowed types: ${allowedDocumentExtensions.join(', ')}`), false);
    }
  } else if (req.route.path.includes('photo')) {
    if (allowedPhotoExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Photo type not allowed. Allowed types: ${allowedPhotoExtensions.join(', ')}`), false);
    }
  } else {
    // For generic uploads, allow both
    if ([...allowedDocumentExtensions, ...allowedPhotoExtensions].includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
};

// Create multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

// Helper function to upload file to Supabase
const uploadToSupabase = async (file, userId, folder) => {
  try {
    // Convert buffer to base64 then to ArrayBuffer
    const fileBase64 = decode(file.buffer.toString('base64'));
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
    const fileName = `${timestamp}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = `${userId}/${folder}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(folder)
      .upload(filePath, fileBase64, {
        contentType: file.mimetype,
        upsert: false
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(folder)
      .getPublicUrl(data.path);
    
    return {
      path: data.path,
      publicUrl: urlData.publicUrl,
      fileName: fileName,
      originalName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype
    };
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Get all documents for the authenticated user
const getDocuments = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    
    // List files in the documents folder
    const { data, error } = await supabase.storage
      .from('uploads')
      .list(`${userId}/documents`, {
        limit: 100,
        offset: 0
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URLs for each file
    const documentsWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(`${userId}/documents/${file.name}`);
        
        return {
          id: file.id,
          name: file.name,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
          updated_at: file.updated_at,
          publicUrl: urlData.publicUrl
        };
      })
    );
    
    res.status(200).json({
      success: true,
      data: documentsWithUrls,
      count: documentsWithUrls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve documents',
      error: error.message
    });
  }
});

// Get all photos for the authenticated user
const getPhotos = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    
    // List files in the photos folder
    const { data, error } = await supabase.storage
      .from('uploads')
      .list(`${userId}/photos`, {
        limit: 100,
        offset: 0
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URLs for each file
    const photosWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(`${userId}/photos/${file.name}`);
        
        return {
          id: file.id,
          name: file.name,
          size: file.metadata?.size || 0,
          created_at: file.created_at,
          updated_at: file.updated_at,
          publicUrl: urlData.publicUrl
        };
      })
    );
    
    res.status(200).json({
      success: true,
      data: photosWithUrls,
      count: photosWithUrls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve photos',
      error: error.message
    });
  }
});

// Get specific upload by ID
const getUpload = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // This would require a database to store file metadata with IDs
    // For now, we'll return an error suggesting to use the list endpoints
    res.status(501).json({
      success: false,
      message: 'Get specific upload by ID not implemented. Use /documents or /photos endpoints to list files.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve upload',
      error: error.message
    });
  }
});

// Upload document with multer middleware
const uploadDocument = [
  upload.single('document'),
  asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No document file provided'
        });
      }
      
      const userId = req.user.id;
      const uploadResult = await uploadToSupabase(req.file, userId, 'documents');
      
      res.status(201).json({
        success: true,
        message: 'Document uploaded successfully',
        data: {
          ...uploadResult,
          type: 'document'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Document upload failed',
        error: error.message
      });
    }
  })
];

// Upload photo with multer middleware
const uploadPhoto = [
  upload.single('photo'),
  asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No photo file provided'
        });
      }
      
      const userId = req.user.id;
      const uploadResult = await uploadToSupabase(req.file, userId, 'photos');
      
      res.status(201).json({
        success: true,
        message: 'Photo uploaded successfully',
        data: {
          ...uploadResult,
          type: 'photo'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Photo upload failed',
        error: error.message
      });
    }
  })
];

// Delete upload
const deleteUpload = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Since we don't have a database mapping, we expect the full file path as ID
    // In a real app, you'd store file metadata in a database
    const filePath = `${userId}/${id}`;
    
    const { error } = await supabase.storage
      .from('uploads')
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
    
    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
});

export default {
  getDocuments,
  getPhotos,
  getUpload,
  uploadDocument,
  uploadPhoto,
  deleteUpload,
  // Export multer middleware for use in routes if needed
  upload
};