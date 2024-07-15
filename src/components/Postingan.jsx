import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const Postingan = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [report, setReport] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false); // State untuk mengontrol tampilan pop-up pemberitahuan

  const toggleReport = () => {
    if (window.confirm('Apakah Anda yakin ingin melaporkan postingan ini?')) {
      setReport(!report);
      if (!successAlert) {
        setSuccessAlert(true); // Set state successAlert menjadi true setelah pengguna mengklik OK
      }
    }
  };

  const closeAlert = () => {
    setSuccessAlert(false); // Set state successAlert menjadi false saat pengguna menutup pop-up pemberitahuan
  };

  return (
    <div className="sm:max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:max-w-3xl m-10">
      <div className="">
        <div className="basis-1/2">
          <img className="w-full object-contain lg:max-h-[450px]" src="https://picsum.photos/500/500?random" alt="Postingan" />
        </div>
        <div className="basis-1/2 p-8">
          <div className="text-3xl text-black font-bold">Judul Postingan</div>
          <p className="mt-2 text-black font-semibold">Description<br></br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloribus consectetur fuga odio aliquam, asperiores fugiat eaque earum. Sunt ea expedita neque debitis deserunt quas sed molestias praesentium omnis accusamus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident sequi doloribus harum architecto odit cupiditate distinctio nostrum rerum, commodi reiciendis repellendus voluptas nemo accusantium modi, aperiam tempora molestias beatae repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed quibusdam asperiores repellendus iure quasi commodi obcaecati soluta totam fuga id sapiente laudantium hic libero modi sunt voluptatem, voluptate recusandae ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dignissimos illum magni aspernatur est assumenda similique. Nisi aperiam laboriosam quia temporibus esse saepe. Officiis sapiente tempore at eos deleniti blanditiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, accusamus a? Possimus, distinctio culpa! Eum voluptate, iusto pariatur natus soluta in tempora, facere, nam illum quasi sed harum officia reiciendis.</p>
          <p className="mt-5 text-black font-semibold">Tags</p>
          <p className="mt-2 text-gray-500">Published Time</p>
          <div className='flex mt-2'>
            <Link to={`/post`} className="font-medium text-black dark:text-gray-700 hover:underline" onClick={toggleLike}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke={liked ? 'currentColor' : 'currentColor'} className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Link>
            <p className=" text-black font-semibold mx-1">9</p>
            <Link to={`/post`} className="font-medium text-black dark:text-gray-700 hover:underline mx-1" onClick={toggleComments}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={showComments ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke-width="1.5" stroke={showComments ? 'currentColor' : 'currentColor'} class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
              </svg>
            </Link>
            <p className=" text-black font-semibold mx-1">4</p>
            <Link to={`/post`} className="font-medium text-black dark:text-gray-700 hover:underline mx-1" onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </Link>

            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-4 rounded-xl">
                  <p>Here is the link:</p>
                  <p>https://example.com/postingan</p>
                  <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ml-auto" onClick={toggleModal}>Close</button>
                </div>
              </div>
            )}

            <p className=" text-black font-semibold mx-1">5</p>
            <Link to={`/post`} className="font-medium text-black dark:text-gray-700 hover:underline mx-1" onClick={toggleReport}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
              </svg>
            </Link>

            {successAlert && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-4 rounded-xl">
                  <p>This post has been reported</p>
                  <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ml-auto" onClick={closeAlert}>Close</button>
                </div>
              </div>
            )}

            <div className='text-black font-semibold mx-1'>Tier1</div>
          </div>

          <div className="border border-t-1 border-black w-full my-5"></div>
          
          <div className='flex justify-center items-center'>
            <Link to={`/post`} className="text-black font-semibold" onClick={toggleComments}>
              {showComments ? 'Show Less Comments' : 'View Comments'}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-bounce ml-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </Link>
          </div>

          {showComments && (
            <>
              <div className='flex my-5'>
                <img className="lg:w-20 lg:h-20 rounded-full" style={{ width: '65px', height: '65px' }} src="https://picsum.photos/500/500?random" alt="Profile" />
                <div className='mx-3 w-full'>
                  <p className="text-black font-semibold mb-1">Profile</p>
                  <p className="text-gray-500 font-semibold">Comments</p>
                </div>
              </div>

              <div className='flex my-5'>
                <img className="lg:w-20 lg:h-20 rounded-full" style={{ width: '65px', height: '65px' }} src="https://picsum.photos/500/500?random" alt="Profile" />
                <div className='mx-3 w-full'>
                  <p className="text-black font-semibold mb-1">Profile</p>
                  <p className="text-gray-500 font-semibold">Comments</p>
                </div>
              </div>

              <div className='flex my-5'>
                <img className="lg:w-20 lg:h-20 rounded-full" style={{ width: '65px', height: '65px' }} src="https://picsum.photos/500/500?random" alt="Profile" />
                <div className='mx-3 w-full'>
                  <p className="text-black font-semibold mb-1">Profile</p>
                  <input type="text" className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-gray-500 w-full" placeholder="Add comments..." />
                </div>
              </div>
            </>
          )}


        </div>
      </div>
    </div>
  );
}

export default Postingan;