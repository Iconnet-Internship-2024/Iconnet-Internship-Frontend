import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const SearchPostingan = () => {
    const dataPostingan = {
        tier_id: '1',
        title: 'Postingan',
        content: 'Creating an independent production company and podcast network',
        media: ['image', 'video', 'audio'],
        post_status: ['active', 'nonActive'],
        published_date: '2024-03-03',
    };

    return (
        <div className="sm:max-w-lg mx-auto m-20 flex-col">
            <div className="relative">
                <input
                    type="text"
                    className="border border-black px-4 py-2 my-2 rounded w-full focus:outline-none focus:border-gray-600"
                    placeholder="Search"
                />
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-5 h-5 w-5 text-gray-600 pointer-events-none">
                    <path d="M30 28.431L21.62 20.051C23.6338 17.6334 24.638 14.5325 24.4237 11.3934C24.2094 8.25432 22.7932 5.31868 20.4696 3.19718C18.146 1.07569 15.0939 -0.0683156 11.9483 0.00315823C8.80271 0.074632 5.80577 1.35608 3.58092 3.58092C1.35608 5.80577 0.074632 8.80271 0.00315823 11.9483C-0.0683156 15.0939 1.07569 18.146 3.19718 20.4696C5.31868 22.7932 8.25432 24.2094 11.3934 24.4237C14.5325 24.638 17.6334 23.6338 20.051 21.62L28.431 30L30 28.431ZM2.25896 12.2457C2.25896 10.2705 2.84468 8.3397 3.94204 6.69738C5.0394 5.05507 6.59912 3.77504 8.42396 3.01916C10.2488 2.26329 12.2568 2.06552 14.1941 2.45086C16.1313 2.8362 17.9108 3.78735 19.3075 5.18402C20.7041 6.5807 21.6553 8.36017 22.0406 10.2974C22.426 12.2347 22.2282 14.2427 21.4723 16.0675C20.7164 17.8924 19.4364 19.4521 17.7941 20.5494C16.1518 21.6468 14.2209 22.2325 12.2457 22.2325C9.59798 22.2296 7.05951 21.1765 5.18727 19.3042C3.31502 17.432 2.2619 14.8935 2.25896 12.2457Z" fill="black"/>
                </svg>

            </div>
            <div className='flex'>
            <select 
                class="border border-black px-4 py-2 my-2 mr-2 rounded w-1/3 focus:outline-none focus:border-gray-600"
                name="media"
            >
                <option value="">Media Type</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
            </select>
            <select 
                class="border border-black px-4 py-2 m-2 rounded w-1/3 focus:outline-none focus:border-gray-600"
                name="tier"
            >
                <option value="">Tier</option>
                <option value="1">Tier</option>
            </select>
            <select 
                class="border border-black px-4 py-2 my-2 ml-2 rounded w-1/3 focus:outline-none focus:border-gray-600"
                name="date"
            >
                <option value="">Month</option>
                <option value="2024-03-03">Month</option>
            </select>
            </div>
        </div>
    );
}

export default SearchPostingan;