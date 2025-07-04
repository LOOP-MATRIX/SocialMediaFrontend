import React, { useEffect, useState } from 'react'
import { useCreatePostStore } from '../store/useCreatePostStore'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'

const CreatePost = () => {
  const { isPosting, createPost } = useCreatePostStore()
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error('Please select at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    files.forEach((file) => formData.append('images', file));

    createPost(formData)

    setCaption('');
    setFiles([]);
  };
  return (
    <div className="xl:w-1/2 lg:w-2/3 w-full h-screen overflow-y-auto custom-scrollbar bg-black flex items-center justify-center p-4">
      <div className="w-full h-screen  rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 bg-gray-950 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="What's on your mind?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 bg-gray-950 text-white rounded-md border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {files.length > 0 && (

              <>
                <p className="mt-2 text-sm text-gray-400">
                  {files.length} file{files.length > 1 ? 's' : ''} selected
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 h-30 md:h-56 overflow-y-auto custom-scrollbar">
                  {files.map((file, index) => (
                    <div key={index} className="relative w-full h-48 border border-gray-700 rounded overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>

              </>
            )}
          </div>
          <button
            type="submit"
            disabled={isPosting}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center"
          >
            {isPosting ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                Uploading...
              </>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost