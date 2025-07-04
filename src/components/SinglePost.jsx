import React, { useState } from 'react';
import { Heart, MessageSquareText, Trash2, Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';


const SinglePost = ({ post, isHomePost }) => {
  const { addLike, removeLike, deletePost, isPostLoading } = usePostStore()
  const { authUser, changeLikedTab, changeCommentTab } = useAuthStore()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);


  const changelike = (id) => {
    if (isHomePost) {
      navigate(`/singlepostdetails/${id}`)
      changeLikedTab()
    } else {
      changeLikedTab()
    }
  }

  const changecomment = (id) => {
    if (isHomePost) {
      navigate(`/singlepostdetails/${id}`)
      changeCommentTab()
    } else {
      changeCommentTab()
    }
  }

  const deletepostentire = (id) => {
    deletePost(post._id)
    navigate('/profile')
  }


  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? post.image.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === post.image.length - 1 ? 0 : prev + 1
    );
  };

  const truncatecaption = post.caption.toString().length > 35 ? post.caption.toString().slice(0, 35) + '...' : post.caption


  return (
    <div className=" w-full mx-auto flex flex-col border border-gray-500 text-white bg-black rounded-lg overflow-hidden">

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
        {
          !isHomePost && post.createdBy._id == authUser._id && (
            <div className='absolute right-7 top-6'>
              <button onClick={() => deletepostentire()}><Trash2 className='text-red-400' /></button>
            </div>
          )
        }
      </div>

      <div className='"w-full h-[300px] md:h-[400px]'>
        {
          post.image.length < 2 ? (
            <img
              src={post.image[0].url}
              alt={post.createdBy.username}
              className="w-full h-[300px] md:h-[400px] object-contain"
            />
          ) : (
            <div className="relative w-full h-[300px] md:h-[400px] mx-auto overflow-hidden rounded-xl shadow-lg bg-black">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                  <Loader className="size-8 animate-spin text-white" />
                </div>
              )}

              <img
                src={post.image[currentIndex].url}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-300"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)} 
              />

              <button
                onClick={() => {
                  setImageLoading(true); 
                  prevImage();
                }}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
              >
                <ArrowLeft className="text-white" />
              </button>

              <button
                onClick={() => {
                  setImageLoading(true);
                  nextImage();
                }}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
              >
                <ArrowRight className="text-white" />
              </button>
            </div>

          )
        }
      </div>
      <div className="flex flex-col justify-center px-4 gap-2 border-t border-gray-500 w-full py-3">
        <div className='flex gap-8'>
          <div className="flex gap-2 items-center">
            <Heart
              size={26}
              onClick={() => post.isLiked ? removeLike(post._id, authUser, isHomePost) : addLike(post._id, authUser, isHomePost)}
              className={post.isLiked ? 'text-red-500 fill-red-500' : 'hover:text-red-500'}
            />
            <button onClick={() => changelike(post._id)}>{post.likes.length}</button>
          </div>
          <div onClick={() => changecomment(post._id)} className="flex gap-2 items-center">
            <MessageSquareText size={26} className="hover:text-blue-400 cursor-pointer transition" />
            <button >{post.comments.length}</button>
          </div>
        </div>
        <p>
          <span className='font-bold'>{post.createdBy.username} </span>
          <span className='text-gray-300'>{isHomePost ? truncatecaption : post.caption}</span>
        </p>
      </div>
      {
        isPostLoading && (
          <div className="flex items-center justify-center bg-white/10 ">
            <Loader className="size-10 animate-spin text-blue-500" />
          </div>
        )
      }


    </div>
  );
};

export default SinglePost;
