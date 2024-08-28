import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../components/SidebarAdmin";
import { FaRegFileAlt } from "react-icons/fa";
import { RiFolderImageLine } from "react-icons/ri";

function DetailPengajuan({ setShowHeaderFooter }) {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  // Data dummy untuk Amalia Kartika
  const dummyData = {
    nama: 'Amalia Kartika',
    id: '753892189139819',
    tanggal: '1 Agustus 2024',
    program: 'Magang/KP',
    status: 'Menunggu Diproses',
    jenisKelamin: 'Perempuan',
    nomorHandphone: '081256908191',
    agama: 'Islam',
    kotaKelahiran: 'Ngawi',
    tanggalLahir: '18 Agustus 2002',
    alamatDomisili: 'Gang Swadaya 4, RT 36, Kelurahan Karang Joang, Kecamatan Balikpapan Utara, Kota Balikpapan, Kalimantan Timur',
    alamatKTP: 'Blok F2, RT 006, Desa Keluang Paser Jaya, Kecamatan Kuaro, Kabupaten Paser, Kalimantan Timur',
    divisi: 'Teknisi',
    tanggalMulai: '1 Juni 2024',
    tanggalSelesai: '31 Agustus 2024',
    pendidikan: {
      tingkat: 'S1',
      NIM: '11211010',
      kampus: 'Institut Teknologi Kalimantan',
      fakultas: 'Teknik',
      programStudi: 'Informatika'
    },
    dokumen: {
      suratPengantar: 'Surat_Pengantar.pdf',
      proposal: 'Proposal.pdf',
      transkripNilai: 'Transkrip_Nilai.pdf',
      foto: 'Foto.jpg'
    }
  };

  useEffect(() => {
    console.log("ID yang diterima dari URL:", id);
    fetchDetail(); // Panggil data sesuai ID
  }, [id]);

  useState(() => setDetail(dummyData), []);

  const fetchDetail = () => {
    // Menetapkan data dummy Amalia Kartika sebagai data detail
    setDetail(dummyData);
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-[#CB1919]" style={{ fontFamily: 'Poppins' }}>
          Detail Pengajuan
        </h1>

        <div className="mt-8 space-y-6">
          {/* Profile */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold">👤</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.nama}</p>
              <p className="text-gray-500" style={{ fontFamily: 'Poppins' }}>{detail.nama.toLowerCase().replace(" ", "")}@email.com</p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Data Diri */}
            <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Data Diri</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Nama</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.nama}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Jenis Kelamin</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.jenisKelamin}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Nomor Handphone</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.nomorHandphone}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Agama</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.agama}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Kota Kelahiran</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.kotaKelahiran}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Tanggal Lahir</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.tanggalLahir}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Alamat Domisili</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.alamatDomisili}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Alamat KTP</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.alamatKTP}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
            {/* Data Pendidikan */}
            <div className="flex-1 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Data Pendidikan</h2>
              <div className="space-y-2">
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Tingkat Pendidikan</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.pendidikan.tingkat}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>NIM</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.pendidikan.NIM}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Kampus</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.pendidikan.kampus}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Fakultas</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.pendidikan.fakultas}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Program Studi</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.pendidikan.programStudi}</p>
                </div>
              </div>
            </div>

            {/* Data Pengajuan */}
            <div className="flex-1 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins' }}>Data Pengajuan</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Divisi</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.divisi}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Tanggal Mulai</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.tanggalMulai}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins' }}>Tanggal Selesai</p>
                  <p className="font-semibold" style={{ fontFamily: 'Poppins' }}>{detail.tanggalSelesai}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FaRegFileAlt className="mr-2 text-lg" />
                  <a href="#" className="text-blue-500 underline">{detail.dokumen.suratPengantar}</a>
                </div>
                <div className="flex items-center">
                  <FaRegFileAlt className="mr-2 text-lg" />
                  <a href="#" className="text-blue-500 underline">{detail.dokumen.proposal}</a>
                </div>
                <div className="flex items-center">
                  <FaRegFileAlt className="mr-2 text-lg" />
                  <a href="#" className="text-blue-500 underline">{detail.dokumen.transkripNilai}</a>
                </div>
                <div className="flex items-center">
                  <RiFolderImageLine className="mr-2 text-lg" />
                  <a href="#" className="text-blue-500 underline">{detail.dokumen.foto}</a>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPengajuan;
