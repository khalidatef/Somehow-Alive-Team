// Editable bilingual content from the supplied Outpost 07 prototype.
export const missions = {
  "en": [
    {
      "id": "power",
      "icon": "☀",
      "kicker": "STAGE 01 / POWER SYSTEMS",
      "title": "Where does a space station get power?",
      "desc": "Electricity powers everything from instruments to life-support systems. In this sample mission, the first priority is switching to solar backup.",
      "objective": "BACKUP POWER OFFLINE",
      "help": "The main generator has stopped. Activate the solar backup to restore critical electricity.",
      "action": "ACTIVATE SOLAR BACKUP",
      "sources": [
        {
          "title": "Power Up: Solar Arrays Boost Station Power",
          "org": "NASA / SPACE STATION",
          "description": "See how solar arrays generate electricity for the ISS and support science and life-support systems.",
          "url": "https://www.nasa.gov/missions/station/iss-research/power-up-roll-out-solar-arrays-boost-space-station-power-supply/"
        },
        {
          "title": "The International Space Station",
          "org": "NASA / STATION REFERENCE",
          "description": "Explore the station and the role its solar arrays play in supplying electrical power.",
          "url": "https://www.nasa.gov/reference/international-space-station/"
        }
      ]
    },
    {
      "id": "oxygen",
      "icon": "◎",
      "kicker": "STAGE 02 / LIFE SUPPORT",
      "title": "How can astronauts keep breathing?",
      "desc": "Life-support systems manage breathable air and water. NASA uses oxygen generation, carbon-dioxide removal, and air circulation on spacecraft.",
      "objective": "OXYGEN RECYCLER OFFLINE",
      "help": "Life support is disrupted. Restart the oxygen recycling system before conditions get worse.",
      "action": "RESTART OXYGEN RECYCLER",
      "sources": [
        {
          "title": "Environmental Control & Life Support Systems",
          "org": "NASA / ECLSS",
          "description": "Learn about the ISS water recovery, air revitalization, and oxygen generation systems.",
          "url": "https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/"
        },
        {
          "title": "Crew Systems: Living in Space",
          "org": "NASA / CREW SYSTEMS",
          "description": "Understand why oxygen and atmosphere control are essential on human missions.",
          "url": "https://www.nasa.gov/reference/crew-systems/"
        }
      ]
    },
    {
      "id": "comms",
      "icon": "⌁",
      "kicker": "STAGE 03 / SPACE COMMUNICATIONS",
      "title": "How does a station send a signal home?",
      "desc": "Spacecraft rely on antennas and communication networks to send commands and scientific information over huge distances.",
      "objective": "OUTBOUND SIGNAL LOST",
      "help": "The antenna is out of alignment. Realign the array to reconnect with mission support.",
      "action": "REALIGN THE ANTENNA",
      "sources": [
        {
          "title": "What Is the Deep Space Network?",
          "org": "NASA / SPACE COMMUNICATIONS",
          "description": "Explore the worldwide antenna network used to communicate with distant spacecraft.",
          "url": "https://www.nasa.gov/directorates/somd/space-communications-navigation-program/what-is-the-deep-space-network/"
        },
        {
          "title": "Deep Space Network Overview",
          "org": "NASA / SCaN",
          "description": "Find out how ground antennas track, command, and communicate with spacecraft.",
          "url": "https://www.nasa.gov/communicating-with-missions/dsn/"
        }
      ]
    }
  ],
  "ar": [
    {
      "id": "power",
      "icon": "☀",
      "kicker": "المرحلة ٠١ / أنظمة الطاقة",
      "title": "محطة الفضاء بتجيب الكهرباء منين؟",
      "desc": "الكهرباء بتشغّل الأجهزة وأنظمة دعم الحياة. في المحاكاة دي أول خطوة هي تشغيل الطاقة الشمسية الاحتياطية.",
      "objective": "الطاقة الاحتياطية متوقفة",
      "help": "المولد الرئيسي عطلان. شغّل الطاقة الشمسية الاحتياطية علشان ترجع الكهرباء.",
      "action": "شغّل الطاقة الشمسية",
      "sources": [
        {
          "title": "الطاقة الشمسية في المحطة الفضائية",
          "org": "NASA / SPACE STATION",
          "description": "شرح إزاي الألواح الشمسية بتوفر الطاقة للمحطة وأنظمة الحياة والأبحاث.",
          "url": "https://www.nasa.gov/missions/station/iss-research/power-up-roll-out-solar-arrays-boost-space-station-power-supply/"
        },
        {
          "title": "المحطة الفضائية الدولية",
          "org": "NASA / STATION REFERENCE",
          "description": "تعرف على المحطة ودور الألواح الشمسية في إمدادها بالكهرباء.",
          "url": "https://www.nasa.gov/reference/international-space-station/"
        }
      ]
    },
    {
      "id": "oxygen",
      "icon": "◎",
      "kicker": "المرحلة ٠٢ / دعم الحياة",
      "title": "إزاي رواد الفضاء بيتنفسوا؟",
      "desc": "أنظمة دعم الحياة بتحافظ على الهواء والمياه. ناسا بتستخدم إنتاج الأكسجين وإزالة ثاني أكسيد الكربون وتدوير الهواء.",
      "objective": "جهاز تدوير الأكسجين متوقف",
      "help": "نظام الحياة اتعطل. أعد تشغيل جهاز الأكسجين قبل ما الوضع يسوء.",
      "action": "شغّل جهاز الأكسجين",
      "sources": [
        {
          "title": "أنظمة التحكم البيئي ودعم الحياة",
          "org": "NASA / ECLSS",
          "description": "مصدر رسمي عن تدوير المياه وتنقية الهواء وإنتاج الأكسجين.",
          "url": "https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/"
        },
        {
          "title": "أنظمة الطاقم والحياة في الفضاء",
          "org": "NASA / CREW SYSTEMS",
          "description": "تعرف ليه تنظيم الأكسجين والغلاف الجوي ضروري لرحلات البشر.",
          "url": "https://www.nasa.gov/reference/crew-systems/"
        }
      ]
    },
    {
      "id": "comms",
      "icon": "⌁",
      "kicker": "المرحلة ٠٣ / الاتصالات",
      "title": "إزاي المحطة بتوصل الإشارة للأرض؟",
      "desc": "المركبات الفضائية بتعتمد على هوائيات وشبكات اتصالات علشان تنقل البيانات والأوامر عبر مسافات بعيدة.",
      "objective": "الإشارة الخارجة مقطوعة",
      "help": "هوائي الإرسال مش متظبط. ظبط اتجاهه علشان ترجع الاتصالات.",
      "action": "ظبّط هوائي الاتصال",
      "sources": [
        {
          "title": "إيه هي شبكة الفضاء العميق؟",
          "org": "NASA / SPACE COMMUNICATIONS",
          "description": "استكشف شبكة هوائيات ناسا اللي بتتواصل مع المركبات البعيدة.",
          "url": "https://www.nasa.gov/directorates/somd/space-communications-navigation-program/what-is-the-deep-space-network/"
        },
        {
          "title": "نظرة على شبكة الفضاء العميق",
          "org": "NASA / SCaN",
          "description": "اعرف إزاي الهوائيات الأرضية بتتابع المركبات وبتوصلها الأوامر.",
          "url": "https://www.nasa.gov/communicating-with-missions/dsn/"
        }
      ]
    }
  ]
};
