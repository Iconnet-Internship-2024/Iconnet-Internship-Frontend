import React, { useEffect, useState } from "react";
import { FaRegUserCircle, FaCalendarAlt, FaSort, FaUser } from "react-icons/fa";
import { HiChevronDown, HiOutlineTrash } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import AdminSidebar from "../../components/SidebarAdmin";
import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { Link } from "react-router-dom";
import { GrFilter } from "react-icons/gr";
import { LuClipboardList } from "react-icons/lu";

const statuses = [
  { label: 'Menunggu Diproses', color: '#F3F3F3', textColor: '#8A8A8A' },
  { label: 'Diproses', color: '#FBF4A1', textColor: '#EF9D52' },
  { label: 'Diterima', color: '#C9FBB1', textColor: '#2D7D32' },
  { label: 'Ditolak', color: '#FFBABA', textColor: '#D74F4F' },
];

const data = [
  { nama: 'Amalia Kartika', id: '753892189139819', tanggal: '1 Agustus 2024', program: 'Magang/KP', status: 'Menunggu Diproses' },
  { nama: 'Naflah Shafa Edia', id: '753892189139820', tanggal: '1 Agustus 2024', program: 'PKL', status: 'Diproses' },
  { nama: 'Sahda Aryanti', id: '753892189139821', tanggal: '4 Agustus 2024', program: 'Magang/KP', status: 'Diproses' },
  { nama: 'Wardatul Jannah', id: '753892189139822', tanggal: '4 Agustus 2024', program: 'PKL', status: 'Diproses' },
  { nama: 'Jihan Apriliani Nurhasanah', id: '753892189139823', tanggal: '4 Agustus 2024', program: 'Magang/KP', status: 'Diproses' },
  { nama: 'Shafa Putri Sasmito', id: '753892189139824', tanggal: '9 Agustus 2024', program: 'PKL', status: 'Diproses' },
  { nama: 'Apriliani Putri', id: '753892189139825', tanggal: '9 Agustus 2024', program: 'Magang/KP', status: 'Diproses' },
];

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const programs = [
  { label: 'Magang/KP' },
  { label: 'PKL' },
];

function Pengajuan({ setShowHeaderFooter }) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [listData, setListData] = useState(data);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [name, setName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setShowHeaderFooter(false);
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await axios.get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleChangeStatus = (index, newStatus) => {
    const updatedData = [...listData];
    updatedData[index].status = newStatus;
    setListData(updatedData);
    setDropdownOpen(null); // Close dropdown after selection
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = React.useMemo(() => {
    let filtered = listData.filter(item =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.includes(searchQuery) ||
      item.tanggal.includes(searchQuery) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterType && filterValue) {
      filtered = filtered.filter(item => {
        if (filterType === 'Bulan') {
          return new Date(item.tanggal).getMonth() === months.indexOf(filterValue);
        }
        if (filterType === 'Status') {
          return item.status === filterValue;
        }
        if (filterType === 'Program') {
          return item.program === filterValue;
        }
        return true;
      });
    }

    return filtered;
  }, [listData, searchQuery, filterType, filterValue]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleProfileDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const formatStatusLabel = (label) => {
    return label.split(' ').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-end items-center mb-8">
          {/* Profile Box with Dropdown */}
          <div className="relative w-[240px] h-[40px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaRegUserCircle className="text-black text-2xl" />
            </div>
            <div className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none flex items-center justify-between">
              <p className="font-normal text-black" style={{ fontFamily: 'Poppins' }}>admin1@email.com</p>
              <button
                onClick={handleProfileDropdown}
                className="text-black"
                aria-label="Dropdown"
              >
                <HiChevronDown />
              </button>
            </div>
            <svg
              width="240"
              height="40"
              viewBox="0 0 240 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 pointer-events-none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="239"
                height="39"
                rx="20"
                stroke="#9AB1BB"
              />
            </svg>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-left text-black hover:bg-gray-100"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <button
                  className="flex items-center w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                >
                  <TbLogout2 className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
           
        {/* Title */}
        <div className="relative flex flex-col mb-4">
          <h1 className="text-2xl font-bold text-[#CB1919]" style={{ fontFamily: 'Poppins', marginTop: '-64px' }}>Pengajuan</h1>
        </div>

        {/* Filter and Search */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="relative w-[240px] h-[40px]">
            <select
              value={filterType}
              onChange={handleFilterTypeChange}
              className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] border border-[#CAC8C8] outline-none flex items-center"
              style={{ fontFamily: 'Poppins' }}
            >
              <option value="">Pilih Filter</option>
              <option value="Bulan">Bulan</option>
              <option value="Status">Status</option>
              <option value="Program">Program</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <GrFilter className="text-[#A0A0A0]" /> {/* Using GrFilter icon with the same color */}
            </div>
              <svg
                width="240"
                height="40"
                viewBox="0 0 240 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 left-0 pointer-events-none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="239"
                  height="39"
                  rx="20"
                  stroke="#9AB1BB"
                />
              </svg>
            </div>

            {filterType === 'Bulan' && (
              <div className="relative w-[240px] h-[40px]">
                <select
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  className="w-full h-full pl-3 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <option value="">Pilih Bulan</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <svg
                  width="240"
                  height="40"
                  viewBox="0 0 240 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 pointer-events-none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="239"
                    height="39"
                    rx="20"
                    stroke="#9AB1BB"
                  />
                </svg>
              </div>
            )}

            {filterType === 'Status' && (
              <div className="relative w-[240px] h-[40px]">
                <select
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  className="w-full h-full pl-3 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <option value="">Pilih Status</option>
                  {statuses.map(status => (
                    <option key={status.label} value={status.label}>{status.label}</option>
                  ))}
                </select>
                <svg
                  width="240"
                  height="40"
                  viewBox="0 0 240 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 pointer-events-none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="239"
                    height="39"
                    rx="20"
                    stroke="#9AB1BB"
                  />
                </svg>
              </div>
            )}

            {filterType === 'Program' && (
              <div className="relative w-[240px] h-[40px]">
                <select
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  className="w-full h-full pl-3 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none"
                  style={{ fontFamily: 'Poppins' }}
                >
                  <option value="">Pilih Program</option>
                  {programs.map(program => (
                    <option key={program.label} value={program.label}>{program.label}</option>
                  ))}
                </select>
                <svg
                  width="240"
                  height="40"
                  viewBox="0 0 240 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-0 pointer-events-none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="239"
                    height="39"
                    rx="20"
                    stroke="#9AB1BB"
                  />
                </svg>
              </div>
            )}
          </div>
        
          <div className="relative w-[240px] h-[40px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSearchSharp className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] border border-[#9AB1BB] outline-none"
              value={searchQuery}
              onChange={handleSearch}
              style={{ fontFamily: 'Poppins' }}
            />
            <svg
              width="240"
              height="40"
              viewBox="0 0 240 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 pointer-events-none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="239"
                height="39"
                rx="20"
                stroke="#9AB1BB"
              />
            </svg>
          </div>
        </div>

        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-[#CB1919] text-white">
              <th className="py-2 px-4 border cursor-pointer" onClick={() => requestSort('nama')} style={{ fontFamily: 'Poppins' }}>
                <div className="flex justify-between items-center">
                <span style={{ fontFamily: 'Poppins' }}>Nama</span>
                  <FaSort className={`ml-2 ${sortConfig.key === 'nama' && sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                </div>
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => requestSort('id')} style={{ fontFamily: 'Poppins' }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily: 'Poppins' }}>ID Pengajuan</span>
                  <FaSort className={`ml-2 ${sortConfig.key === 'id' && sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                </div>
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => requestSort('tanggal')} style={{ fontFamily: 'Poppins' }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily: 'Poppins' }}>Tanggal Pengajuan</span>
                  <FaSort className={`ml-2 ${sortConfig.key === 'tanggal' && sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                </div>
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => requestSort('program')} style={{ fontFamily: 'Poppins' }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily: 'Poppins' }}>Program</span>
                  <FaSort className={`ml-2 ${sortConfig.key === 'program' && sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                </div>
              </th>
              <th className="py-2 px-4 border cursor-pointer" onClick={() => requestSort('status')} style={{ fontFamily: 'Poppins' }}>
                <div className="flex justify-between items-center">
                  <span style={{ fontFamily: 'Poppins' }}>Status</span>
                  <FaSort className={`ml-2 ${sortConfig.key === 'status' && sortConfig.direction === 'descending' ? 'transform rotate-180' : ''}`} />
                </div>
              </th>
              <th className="py-2 px-4 border" style={{ fontFamily: 'Poppins' }}>Aksi</th >
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const status = statuses.find(status => status.label === item.status);
              return (
                <tr key={item.id}>
                  <td className="py-2 px-4 border" style={{ fontFamily: 'Poppins' }}>{item.nama}</td>
                  <td className="py-2 px-4 border" style={{ fontFamily: 'Poppins' }}>{item.id}</td>
                  <td className="py-2 px-4 border" style={{ fontFamily: 'Poppins' }}>{item.tanggal}</td>
                  <td className="py-2 px-4 border" style={{ fontFamily: 'Poppins' }}>{item.program}</td>
                  <td className="py-2 px-4 border text-center" style={{ fontFamily: 'Poppins' }}>
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(index)}
                        className="inline-flex justify-between items-center w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2"
                        id={`options-menu-${index}`}
                        aria-expanded="true"
                        aria-haspopup="true"
                        style={{ backgroundColor: status.color, color: status.textColor }}
                      >
                        <span className="text-sm font-medium">
                          {formatStatusLabel(item.status)}
                        </span>
                        <HiChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                      </button>
                      {dropdownOpen === index && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby={`options-menu-${index}`}
                          style={{ zIndex: 50 }}
                        >
                          <div className="py-1" role="none">
                            {statuses.map((status) => (
                              <button
                                key={status.label}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleChangeStatus(index, status.label)}
                                role="menuitem"
                              >
                                {status.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <Link
                        to={`/detailPengajuan/${item.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Detail Pengajuan"
                      >
                        <LuClipboardList className="inline-block h-5 w-5" />
                      </Link>
                      <button className="text-red-500 hover:text-red-700">
                        <HiOutlineTrash className="inline-block h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700" style={{ fontFamily: 'Poppins' }}>
            Menampilkan {sortedData.length} dari {data.length} baris
          </div>
          <div className="flex">
            {/* Add pagination buttons here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pengajuan;
