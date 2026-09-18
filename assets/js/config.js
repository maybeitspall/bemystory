/**
 * WEDDING INVITATION CONFIGURATION
 * Single source of truth for client template customization.
 * Modify this file to quickly personalize the invitation for new couples.
 */

window.WEDDING_CONFIG = {
  // Couple Information
  couple: {
    nickname: {
      bride: "Anindya",
      groom: "Raditya",
      combined: "Anindya & Raditya"
    },
    bride: {
      fullName: "Anindya Kirana, S.Ked",
      role: "Mempelai Wanita",
      fatherName: "Bpk. H. Rahmat Hidayat",
      motherName: "Ibu Hj. Siti Aminah",
      description: "Putri Pertama dari Bpk. H. Rahmat Hidayat & Ibu Hj. Siti Aminah",
      instagram: "anindyakirana",
      instagramUrl: "https://instagram.com",
      photo: "assets/img/template/bride.jpg"
    },
    groom: {
      fullName: "Raditya Pratama, S.T",
      role: "Mempelai Pria",
      fatherName: "Bpk. Bambang Soediro (Alm)",
      motherName: "Ibu Endang Sri Wahyuni",
      description: "Putra Kedua dari Bpk. Bambang Soediro (Alm) & Ibu Endang Sri Wahyuni",
      instagram: "radityapratama",
      instagramUrl: "https://instagram.com",
      photo: "assets/img/template/groom.jpg"
    }
  },

  // Wedding Schedule & Venues
  events: {
    // Primary date for Hero badge & countdown (Akad & Resepsi)
    mainDateDisplay: "Minggu, 21 Desember 2025",
    
    // Countdown Target (ISO format for accurate calculation)
    countdownTarget: "2025-12-21T09:00:00+07:00",

    akad: {
      title: "Akad Nikah",
      day: "Sabtu",
      date: "20 Desember 2025",
      time: "09.00 - 11.00 WIB",
      venueName: "Masjid Agung Kubah Emas",
      address: "Jl. Raya Meruyung, Limo, Kota Depok, Jawa Barat",
      mapsUrl: "https://maps.google.com/?q=Masjid+Agung+Kubah+Emas+Depok",
      calendar: {
        title: "Akad Nikah Anindya & Raditya",
        details: "Akad Nikah Pernikahan Anindya Kirana & Raditya Pratama",
        location: "Masjid Agung Kubah Emas, Depok",
        start: "20251220T020000Z", // UTC
        end: "20251220T040000Z"
      }
    },

    resepsi: {
      title: "Resepsi Pernikahan",
      day: "Minggu",
      date: "21 Desember 2025",
      time: "11.00 - 16.00 WIB",
      venueName: "Hadrah Wedding Garden & Ballroom",
      address: "Jl. Taman Pinang No. 88, Pondok Indah, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Hadrah+Wedding+Garden",
      calendar: {
        title: "Resepsi Pernikahan Anindya & Raditya",
        details: "Resepsi Pernikahan Anindya Kirana & Raditya Pratama",
        location: "Hadrah Wedding Garden, Jakarta Selatan",
        start: "20251221T040000Z", // UTC
        end: "20251221T090000Z"
      }
    }
  },

  // Holy Verse / Sacred Quote
  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation: "“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”",
    source: "(QS. Ar-Rum : 21)"
  },

  // Love Story Timeline
  story: [
    {
      year: "2020",
      title: "Awal Pertemuan",
      description: "Pertama kali dipertemukan dalam sebuah seminar akademis di kampus. Percakapan singkat yang sederhana rupanya meninggalkan kesan hangat dan membuka pintu persahabatan yang baik."
    },
    {
      year: "2022",
      title: "Menjalin Hubungan",
      description: "Setelah dua tahun berteman dan saling mengenal kepribadian masing-masing, kami menyadari adanya keselarasan visi dan nilai hidup. Kami memutuskan melangkah bersama dalam sebuah komitmen yang tulus."
    },
    {
      year: "2024",
      title: "Silaturahmi & Lamaran",
      description: "Dengan keyakinan yang matang dan restu dari kedua orang tua, Raditya datang bersama keluarga besarnya untuk melamar Anindya. Momen penuh haru yang mengikat niat suci menuju gerbang pernikahan."
    },
    {
      year: "2025",
      title: "Menuju Hari Bahagia",
      description: "Insya Allah, ikatan cinta dan komitmen kami akan disahkan dalam akad suci pernikahan. Hari yang kami nantikan untuk memulai lembaran baru sebagai sepasang suami istri yang saling mengasihi."
    }
  ],

  // Cashless & Physical Wedding Gifts
  gifts: {
    banks: [
      {
        name: "Bank BCA",
        code: "BCA",
        accountNumber: "8415293041",
        accountHolder: "Anindya Kirana",
        logo: "assets/img/icons/bank-bca.svg"
      },
      {
        name: "Bank Mandiri",
        code: "MANDIRI",
        accountNumber: "1270009831425",
        accountHolder: "Raditya Pratama",
        logo: "assets/img/icons/bank-mandiri.svg"
      },
      {
        name: "Bank BSI",
        code: "BSI",
        accountNumber: "7279913498",
        accountHolder: "Anindya Kirana",
        logo: "assets/img/icons/bank-bsi.svg"
      },
      {
        name: "DANA",
        code: "DANA",
        accountNumber: "085362835653",
        accountHolder: "Anindya Kirana",
        logo: "assets/img/icons/ewallet-dana.svg"
      }
    ],
    physical: {
      recipient: "Anindya Kirana & Raditya Pratama",
      phone: "+62 812-3456-7890",
      address: "Komp. Pinang Indah Residence Blok B No. 12, Kel. Pondok Pinang, Kec. Kebayoran Lama, Jakarta Selatan 12310",
      note: "Konfirmasi pengiriman kado fisik dapat disampaikan melalui WhatsApp mempelai."
    }
  },

  // Audio Track Configuration
  audio: {
    title: "Akad - Payung Teduh",
    src: "assets/audio/akad-payung-teduh.m4a",
    fallbackSrc: "assets/audio/wedding-song.mp3",
    autoplayOnOpen: true
  },

  // Starter Seed Wishes (Realistic guestbook entries for demo/prototype presentation)
  starterWishes: [
    {
      name: "Dimas & Sarah",
      status: "hadir",
      message: "Selamat berbahagia Anindya & Raditya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Lancar seluruh prosesi acaranya ya!",
      timestamp: "10 menit yang lalu"
    },
    {
      name: "dr. Hendra Pratama, Sp.A",
      status: "hadir",
      message: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fii khair. Turut berbahagia untuk kedua mempelai dan keluarga besar.",
      timestamp: "1 jam yang lalu"
    },
    {
      name: "Keluarga Besar Bpk. Subroto",
      status: "hadir",
      message: "Selamat menempuh hidup baru! Semoga cinta dan kebahagiaan senantiasa menyertai perjalanan rumah tangga kalian hingga maut memisahkan.",
      timestamp: "3 jam yang lalu"
    },
    {
      name: "Maya Anggraini",
      status: "tidak_hadir",
      message: "Selamat Anin sayang dan mas Radit! Mohon maaf belum bisa hadir langsung karena dinas ke luar pulau, tapi doaku selalu menyertai kalian dari kejauhan.",
      timestamp: "Kemarin"
    }
  ],

  // Footer & Agency Branding
  agency: {
    brandName: "Punakawan Digital Template",
    tagline: "Modern & Elegant Digital Wedding Invitation",
    whatsappUrl: "https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20template%20undangan%20pernikahan%20digital",
    instagramUrl: "https://instagram.com"
  }
};
