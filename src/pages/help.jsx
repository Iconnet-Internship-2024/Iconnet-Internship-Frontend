import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookie";

function HelpSection({ title, description, listItems }) {
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

export default function Help() {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = async () => {
    try {
      if (!question) {
        setErrorMessage("Pertanyaan tidak boleh kosong");
        return;
      }

      const accessToken = getCookie("accessToken"); // Anda perlu menyesuaikan ini dengan cara Anda menyimpan token
      if (!accessToken) {
        setErrorMessage("Token otorisasi tidak tersedia");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/question",
        {
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setQuestion("");
        // Tambahkan logika jika ingin menampilkan pesan sukses atau tindakan lainnya
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("Kolom pertanyaan harus diisi");
        } else {
          console.error(
            "Gagal membuat pertanyaan:",
            error.response.data.message
          );
          setErrorMessage("Terjadi kesalahan saat membuat pertanyaan");
        }
      } else {
        console.error("Gagal membuat pertanyaan:", error.message);
        setErrorMessage("Terjadi kesalahan saat membuat pertanyaan");
      }
    }
  };

  const sections = [
    {
      title: "Selamat datang di Help Center Rankarya",
      description:
        "Selamat datang di Help Center Rankarya, tempat Anda dapat menemukan jawaban atas pertanyaan umum tentang platform kami. Kami di sini untuk memastikan pengalaman Anda dalam memberikan dukungan finansial kepada kreator favorit Anda semudah mungkin. Di bawah ini adalah beberapa pertanyaan yang sering diajukan dan jawabannya:",
    },
    {
      title: "Apa itu Rankarya?",
      description:
        "Rankarya adalah platform yang memungkinkan penggemar untuk memberikan dukungan finansial langsung kepada kreator favorit mereka. Dengan sistem pembayaran berlangganan bulanan, kami menyediakan sumber pendapatan yang stabil bagi kreator dan kesempatan bagi penggemar untuk terlibat lebih dekat dengan kreator yang mereka sukai.",
    },
    {
      title: "Bagaimana cara kerja Rankarya?",
      description:
        "Pengguna dapat mendaftar sebagai anggota dan berlangganan kreator favorit mereka dengan jumlah yang mereka pilih. Setiap bulan, biaya langganan akan otomatis dibayarkan, memberikan dukungan finansial yang konsisten kepada kreator. Kreator kemudian memberikan konten eksklusif kepada para pelanggan mereka.",
    },
    {
      title: "Bagaimana saya bisa bergabung sebagai pengguna?",
      description:
        "Untuk bergabung sebagai pengguna, cukup buka situs web kami dan ikuti proses pendaftaran yang mudah. Setelah Anda terdaftar, Anda dapat menjelajahi kreator yang tersedia dan memilih untuk berlangganan kepada yang Anda sukai.",
    },
    {
      title: "Bagaimana jika saya memiliki pertanyaan atau masalah?",
      description:
        "Jika Anda memiliki pertanyaan atau mengalami masalah saat menggunakan platform kami, jangan ragu untuk menghubungi tim dukungan kami melalui formulir kontak yang tersedia di situs web kami. Tim kami akan dengan senang hati membantu Anda menyelesaikan masalah Anda.",
    },
    {
      title: "Bagaimana cara menjadi kreator di Rankarya?",
      description:
        "Jika Anda seorang kreator dan tertarik untuk bergabung dengan Rankarya, Anda dapat mengajukan permohonan untuk menjadi kreator di situs web kami. Kami akan meninjau aplikasi Anda dan memberi tahu Anda tentang statusnya secepat mungkin.",
    },
    {
      title: " Apa keuntungan menjadi kreator di Rankarya?",
      description:
        "Sebagai kreator di Rankarya, Anda dapat menghasilkan pendapatan yang stabil melalui dukungan langganan bulanan dari penggemar Anda. Anda juga dapat membangun komunitas yang terlibat dan terhubung lebih dekat dengan penggemar Anda melalui konten eksklusif dan fitur interaktif lainnya.",
    },
    {
      title: "Bagaimana cara membatalkan langganan saya?",
      description:
        "Jika Anda ingin membatalkan langganan Anda kepada seorang kreator, Anda dapat melakukannya melalui pengaturan akun Anda di situs web kami. Langkah-langkahnya akan dijelaskan secara rinci di sana.",
    },
  ];

  return (
    <div className="block w-[600px] mt-9">
      {sections.map((section, index) => (
        <HelpSection
          key={index}
          title={section.title}
          description={section.description}
          listItems={section.listItems}
        />
      ))}
      <div className="flex gap-4">
        <input
          placeholder="Buat pertanyaan"
          type="text"
          className={`mt-4 px-4 w-full ${
            // theme === "dark"
            //   ? "bg-neutral-900 p-2 rounded-full border border-white focus:outline-none hover:bg-neutral-800 placeholder-stone-400 focus:border-solid ":
            "bg-white p-2 rounded-full border border-stone-400 focus:outline-none focus:border-black hover:border-black hover:bg-white"
          }`}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleQuestionSubmit}
          className={`mt-4 px-4 cursor-pointer ${
            // theme === "dark"
            //   ? "bg-neutral-900 p-2 rounded-full border border-white focus:outline-none hover:bg-neutral-800 placeholder-stone-400 focus:border-solid":
            "bg-white p-2 rounded-full border border-stone-400 hover:border-black hover:duration-300"
          }`}
        >
          Kirim
        </button>
      </div>

      <p className="mt-4">
        Kami berharap informasi di atas membantu menjawab pertanyaan Anda
        tentang Rankarya. Jika Anda memiliki pertanyaan lebih lanjut atau
        membutuhkan bantuan tambahan, jangan ragu untuk menghubungi kami. Terima
        kasih atas dukungan Anda kepada para kreator melalui Rankarya!
      </p>
      <br />
    </div>
  );
}
