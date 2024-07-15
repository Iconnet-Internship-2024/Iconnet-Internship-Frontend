import React, { useState, useEffect } from 'react';
import { getFilteredPostsWithAccIdPOVUser } from '../modules/fetch/post';

const SearchPostUser = ({ updatePosts, account_id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterData, setFilterData] = useState({
        media: '',
        tier: '',
        year: '',
        month: '',
        title: '',
        tagName: '',
        categoryName: '',
        account_id:'',
    });

    useEffect(() => {
        if (account_id !== null) {
            setFilterData((prevData) => ({
                ...prevData,
                account_id: account_id,
            }));
        }
    }, [account_id]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await getFilteredPostsWithAccIdPOVUser(filterData);
            // const postsData = response.posts;
            const postsData = response.data;
            updatePosts(postsData);
        } catch (error) {
            console.error("Error fetching filtered posts", error);
        }
    };

    return (
        <div className="max-w-sm bg-white shadow-md rounded-lg sm:max-w-md mx-auto mb-15 mt-10 flex-col text-sm">
            <button
                onClick={toggleAccordion}
                className="w-full py-3 px-6 bg-gray-800 text-gray-100 font-semibold flex justify-between items-center"
            >
                Filter Post
                <svg
                className={`w-4 h-4 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                <path
                    fillRule="evenodd"
                    d="M9.29289 13.7071C9.68342 14.0976 10.3166 14.0976 10.7071 13.7071L14.7071 9.70711C15.0976 9.31658 15.0976 8.68342 14.7071 8.29289C14.3166 7.90237 13.6834 7.90237 13.2929 8.29289L10 11.5858L6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L9.29289 13.7071Z"
                    clipRule="evenodd"
                ></path>
                </svg>
            </button>
            {isOpen && (
                <form onSubmit={handleSubmit} className="px-6 py-4">
                    {/* <div className='mb-4'>
                        <select 
                            className="border px-4 py-2 mr-2 rounded w-full focus:outline-none focus:border-gray-400"
                            name="media"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>Media Type</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <select 
                            className="border px-4 py-2 mr-2 rounded w-full focus:outline-none focus:border-gray-400"
                            name="tier"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>Tier</option>
                            <option value="Tier1">Tier1</option>
                            <option value="Tier2">Tier2</option>
                            <option value="Tier3">Tier3</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <select 
                            className="border px-4 py-2 mr-2 rounded w-full focus:outline-none focus:border-gray-400"
                            name="year"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>Year</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <select 
                            className="border px-4 py-2 mr-2 rounded w-full focus:outline-none focus:border-gray-400"
                            name="month"
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                        </select>
                    </div> */}
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                        Title
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter title..."
                        value={filterData.title}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tagName">
                        Tag
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="tagName"
                        name="tagName"
                        type="text"
                        placeholder="Enter tag..."
                        value={filterData.tagName}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="categoryName">
                        Category
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categoryName"
                        name="categoryName"
                        type="text"
                        placeholder="Enter category..."
                        value={filterData.categoryName}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex">
                        <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                        >
                        Apply Filter
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default SearchPostUser;
