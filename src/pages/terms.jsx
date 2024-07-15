import React from "react";

function TermsSection({ title, description, listItems }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
      {listItems && (
        <ul className="list-decimal pl-4">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <br />
      <hr className={`${"border-black"}`} />
      
    </div>
  );
}


export default function Terms() {
  const sections = [
    {
      title: "Syarat Penggunaan Rankarya",
      description:
        "Selamat datang di Rankarya! Mohon baca dengan seksama syarat-syarat penggunaan ini sebelum menggunakan platform kami. Dengan mengakses atau menggunakan Rankarya, Anda setuju untuk terikat oleh syarat-syarat ini. Jika Anda tidak setuju dengan syarat-syarat ini, mohon jangan gunakan platform kami.",
    },
    {
      title: "Deskripsi Layanan",
      description:
        "Rankarya adalah platform yang memungkinkan pengguna untuk memberikan dukungan finansial langsung kepada kreator favorit mereka melalui sistem pembayaran berlangganan bulanan. Kami menyediakan platform ini untuk memberikan sumber pendapatan yang stabil bagi kreator dan untuk memungkinkan penggemar terlibat lebih dekat dengan kreator yang mereka sukai.",
    },
    {
      title: "Kewajiban Pengguna",
      description: "Dengan menggunakan Rankarya, Anda setuju untuk:",
      listItems: [
        "Memberikan informasi yang akurat dan lengkap saat mendaftar.",
        "Tidak melanggar hak kekayaan intelektual atau hak lain dari pihak ketiga.",
        "Tidak menggunakan platform ini untuk tujuan yang melanggar hukum.",
        "Tidak melakukan tindakan yang dapat merugikan atau mengganggu layanan kami atau pengguna lain.",
      ],
    },
    {
      title: "Pembayaran dan Langganan",
      description:
        "Dengan berlangganan di Rankarya, Anda setuju untuk membayar jumlah yang tertera sesuai dengan rencana langganan yang Anda pilih. Pembayaran akan diproses melalui sistem pembayaran yang kami sediakan.",
    },
    {
      title: "Hak Kekayaan Intelektual",
      description:
        "Semua konten yang dibagikan oleh kreator di Rankarya tetap menjadi hak kekayaan intelektual mereka. Dilarang mengunduh, menyimpan, atau mendistribusikan konten tanpa izin dari pemiliknya.",
    },
    {
      title: "Penghentian Layanan",
      description:
        "Kami berhak untuk menghentikan atau membatasi akses Anda ke Rankarya jika kami menganggap bahwa Anda melanggar syarat-syarat penggunaan ini.",
    },
    {
      title: "Perubahan Syarat Penggunaan",
      description:
        "Kami berhak untuk mengubah syarat-syarat penggunaan ini kapan saja tanpa pemberitahuan terlebih dahulu. Perubahan akan mulai berlaku segera setelah diposting di platform kami.",
    },
    {
      title: "Pengecualian Tanggung Jawab",
      description:
        "Kami tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan Rankarya, termasuk namun tidak terbatas pada kerugian keuntungan, kerugian data, atau gangguan layanan.",
    },
    {
      title: "Hukum yang Berlaku",
      description:
        "Syarat-syarat penggunaan ini tunduk pada hukum yang berlaku di wilayah tempat kami beroperasi.",
    },
  ];

  return (
    <div className="w-[600px] mt-9">
      {sections.map((section, index) => (
        <TermsSection
          key={index}
          title={section.title}
          description={section.description}
          listItems={section.listItems}
        />
      ))}
      <p className="mt-4">
        Dengan menggunakan Rankarya, Anda menyatakan bahwa Anda telah membaca,
        memahami, dan menyetujui syarat-syarat penggunaan ini. Jika Anda
        memiliki pertanyaan atau kekhawatiran, jangan ragu untuk menghubungi
        kami.
      </p>
      <br />
    </div>
  );
}
