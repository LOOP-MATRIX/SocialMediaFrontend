import React from 'react';
import { Heart, MessageSquareText } from 'lucide-react';

const SinglePost = ({ post }) => {
  console.log(post);

  return (
    <div className="w-full mx-auto flex flex-col border border-gray-500 text-white bg-black rounded-lg overflow-hidden">
      
      <div className=" w-full flex gap-4 py-2 px-4 border-b border-gray-500">
        <img
          src={post.createdBy.pic}
          alt=""
          className="w-14 h-14 md:w-16 md:h-16 border border-purple-500 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg md:text-xl font-semibold">{post.createdBy.username}</p>
          <p className="text-gray-300 text-sm md:text-base">{post.createdBy.name}</p>
        </div>
      </div>

      <img
        src={post.image[0].url}
        alt=""
        className="w-full h-[300px] md:h-[400px] object-contain"
      />

      <div className="flex items-center px-4 gap-8 border-t border-gray-500 w-full py-3">
        <div className="flex gap-2 items-center">
          <Heart size={26} className="hover:text-red-500 cursor-pointer transition" />
          <p>{post.likes.length}</p>
        </div>
        <div className="flex gap-2 items-center">
          <MessageSquareText size={26} className="hover:text-blue-400 cursor-pointer transition" />
          <p>{post.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
