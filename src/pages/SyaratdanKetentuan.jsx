import React from 'react';

const SyaratdanKetentuan = () => {
  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          backgroundColor: '#CB1919',
          marginTop: '-32px'
        }}
      >
        <h1 className="text-white text-center font-semibold text-4xl py-4">
          Syarat dan Ketentuan Program Internship
        </h1>
      </div>
      <div className="relative flex justify-center mt-8 md:mt-4">
        <div className="relative bg-white shadow-md rounded-lg p-8 max-w-[90%] md:max-w-full text-625A5A">
          <h2 className="font-semibold text-xl md:text-2xl mb-4">Alur Pendaftaran Program Internship</h2>
          <ol className="list-decimal list-inside mb-8 text-sm md:text-base">
            <li>Lakukan Registrasi jika anda belum memiliki akun.</li>
            <li>Kemudian lakukan login jika anda sudah memiliki akun.</li>
            <li>
              Selanjutnya anda dapat mengisi data diri dengan lengkap pada halaman profile. Harap data diri diisi
              dengan lengkap dan benar agar bisa melakukan tahap selanjutnya, yaitu pengajuan pendaftaran
              internship.
            </li>
            <li>
              Lakukan pengajuan pendaftaran internship dengan memilih kategori yang sudah ditentukan, yaitu:
              mahasiswa ataupun siswa. Kemudian isi semua formulir dengan lengkap dan benar.
            </li>
            <li>
              Setelah anda mengisi data diri dan form pengajuan internship, maka anda harus menunggu proses
              pengajuan dan anda akan mendapatkan status balasan maksimal 14 hari setelah pengajuan dilakukan.
            </li>
          </ol>
          <hr className="border-t-2 border-625A5A w-full mb-8" />
          <h2 className="font-semibold text-xl md:text-2xl mb-4">Syarat dan Ketentuan Pendaftaran Program Internship</h2>
          <ol className="list-decimal list-inside text-sm md:text-base">
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
            <li>xxxxxxx</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SyaratdanKetentuan;
