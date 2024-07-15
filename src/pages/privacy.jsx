function PrivacySection({ title, description, listItems }) {
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

export default function Privacy() {
  const sections = [
    {
      title: "Kebijakan Privasi Rankarya",
      description:
        "Kami di Rankarya menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.",
    },
    {
      title: "Informasi yang Kami Kumpulkan:",
      description:
        "Kami dapat mengumpulkan informasi pribadi dari Anda saat Anda mendaftar sebagai pengguna di platform kami, termasuk tetapi tidak terbatas pada nama, alamat email, dan informasi pembayaran. Kami juga dapat mengumpulkan informasi non-pribadi, seperti data penggunaan dan preferensi, untuk meningkatkan pengalaman pengguna di platform kami.",
    },
    {
      title: "Bagaimana Kami Menggunakan Informasi Anda:",
      description:
        "Informasi pribadi yang Anda berikan kepada kami dapat digunakan untuk memproses pembayaran langganan Anda, mengelola akun Anda, dan menyediakan layanan kami kepada Anda. Kami juga dapat menggunakan informasi tersebut untuk mengirim pemberitahuan tentang perubahan layanan, pembaruan, atau promosi yang relevan dengan Anda.",
    },
    {
      title: "Pemberian Informasi kepada Pihak Ketiga:",
      description:
        "Kami tidak akan menjual, menyewakan, atau memberikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali jika diperlukan oleh hukum atau dalam situasi di mana kami dianggap perlu untuk melindungi hak, properti, atau keamanan kami atau pihak lain.",
    },
    {
      title: "Keamanan Informasi:",
      description:
        "Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, penggunaan, atau pengungkapan yang tidak sah. Meskipun kami berusaha keras untuk melindungi informasi Anda, tidak ada metode transmisi atau penyimpanan data yang 100% aman. Oleh karena itu, kami tidak dapat menjamin keamanan absolut informasi yang Anda kirimkan kepada kami.",
    },
    {
      title: "Penggunaan Cookie:",
      description:
        "Kami menggunakan cookie dan teknologi pelacakan serupa untuk mengumpulkan informasi tentang penggunaan Anda dari situs web kami dan menyediakan pengalaman pengguna yang lebih baik. Anda dapat mengelola preferensi cookie Anda melalui pengaturan browser Anda.",
    },
    {
      title: "Perubahan pada Kebijakan Privasi:",
      description:
        "Kami dapat memperbarui Kebijakan Privasi ini secara berkala untuk mencerminkan perubahan dalam praktik informasi kami. Anda disarankan untuk memeriksa Kebijakan Privasi ini secara berkala untuk memastikan Anda tetap memahami bagaimana kami melindungi privasi Anda.",
    },
    {
      title: "Kontak:",
      description:
        "Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami, silakan hubungi kami melalui informasi kontak yang tersedia di situs web kami.",
    },
  ];

  return (
    <div className="w-[600px] mt-9">
      {sections.map((section, index) => (
        <PrivacySection
          key={index}
          title={section.title}
          description={section.description}
          listItems={section.listItems}
        />
      ))}
      <p className="mt-4">
        Dengan menggunakan layanan kami, Anda menyetujui pengumpulan dan
        penggunaan informasi Anda sesuai dengan Kebijakan Privasi ini.
      </p>
      <br />
    </div>
  );
}
