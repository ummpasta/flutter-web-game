'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "893e6ae5afbab62d7fb15c39cd4147d3",
"assets/AssetManifest.bin.json": "42fd92f63129d6be3fbfcd2374321d02",
"assets/AssetManifest.json": "8a47d4334f3e600e3c6432ae0870b1fc",
"assets/assets/audio/collect.mp3": "5f5dbccc998759acffa4e997dd5555bd",
"assets/assets/audio/correct.mp3": "20d3aeb8f0d44bd1f0df1fe87184889e",
"assets/assets/audio/great_job.mp3": "b231080c79a79e18daf2fcded726122e",
"assets/assets/audio/help_en.mp3": "adcaf723ccb92da04bae327a8e2024f6",
"assets/assets/audio/help_ms.mp3": "7b944a2a943bdf4948d33368c36b8c4c",
"assets/assets/audio/help_ta.mp3": "5d103381dfe2d2534ddaab149d1edf93",
"assets/assets/audio/help_zh.mp3": "5dc566e47efc091cb3407503efc8b1ae",
"assets/assets/audio/menu_music.mp3": "a3bf9112f0af4d63713f9f62e423317b",
"assets/assets/audio/music-for-puzzle-game-146738.mp3": "a3bf9112f0af4d63713f9f62e423317b",
"assets/assets/audio/well_done.mp3": "bdf39fa8b12336a3ba48d2472ae1188a",
"assets/assets/audio/wrong.mp3": "1c211e73b020d1335a59057b2e4d780f",
"assets/assets/audio/you_did_it.mp3": "5f56de5c303b6b3e554542936c51ae2a",
"assets/assets/i18n/en.json": "52ee7f6b4b1fbc45f8bd703768c3b0f7",
"assets/assets/i18n/ms.json": "e985218f5dd5090e25b9b08c362316a3",
"assets/assets/i18n/ta.json": "668ec444cbb13b626c14e6c0df7f6aac",
"assets/assets/i18n/zh.json": "3db3b0dbb83a3a9c80efc3dfc51de940",
"assets/assets/legits/1.png": "403442e19937da21f39628eb0980b9c5",
"assets/assets/legits/10.png": "5ca752a896ede188ab0f3b24c93d4fc2",
"assets/assets/legits/2.png": "9ca71ac9105cbc56c80fda1986590315",
"assets/assets/legits/3.png": "82f2c47cb400a010689c22f4e7df76a1",
"assets/assets/legits/4.png": "3f0c31e0300d78f27b81db4ffdbd3657",
"assets/assets/legits/5.png": "e0abc8e35d571b6d738d53bf0f2f2c9c",
"assets/assets/legits/6.png": "48c86f6f7c4fbe45ef450f279f3c61cc",
"assets/assets/legits/7.png": "e1032d46d9186e9b3e7ad78407f60e51",
"assets/assets/legits/8.png": "c7d6a84cc871ce5903a7741add6de284",
"assets/assets/legits/9.png": "4f2e25d10ef8783843949ad1fc14e984",
"assets/assets/scams/1.png": "cafa1884b7c5643b56785587dc4aaaf1",
"assets/assets/scams/10.png": "c4423bdfb723ff59317e93924f80a821",
"assets/assets/scams/2.png": "55aa67f7797ae7cd56faebfd9ecba562",
"assets/assets/scams/3.png": "0fa65c635c8e94bc57f9d1c83f2d2265",
"assets/assets/scams/4.png": "9ff2acba00e7dabef68b21a63ea744f9",
"assets/assets/scams/5.png": "24abc928f56e031b6874996295229682",
"assets/assets/scams/6.png": "14ca66e319940fa024842d7c62ec48fc",
"assets/assets/scams/7.png": "15af98dbbc3d3cb86d90b694656ea7e1",
"assets/assets/scams/8.png": "cf6c9b3144603a947c0884c51cd727d0",
"assets/assets/scams/9.png": "626a4c7574f60c36573013228a363b25",
"assets/assets/tts_en/ALWAYS_SECURE_YOUR_BANKING_DETAILS.mp3": "f2a9d0cc0d2ff8a4841c96678d51d5f7",
"assets/assets/tts_en/ALWAYS_SECURE_YOUR_BLANK_DETAILS.mp3": "0a52e357a5f6008ff414d7835844c4c9",
"assets/assets/tts_en/ALWAYS_STAY_ALERT_TO_SUSPICIOUS_BEHAVIOR.mp3": "e6d4e841b69f118a00a22ef3b3ea0604",
"assets/assets/tts_en/ALWAYS_STAY_BLANK_TO_SUSPICIOUS_BEHAVIOR.mp3": "636772860cb747dec081efa1a1102712",
"assets/assets/tts_en/AVOID_CLICKING_ON_BLANK_LINKS.mp3": "779ff7ffff2286e3ff9f600e1adea7a4",
"assets/assets/tts_en/AVOID_CLICKING_ON_SUSPICIOUS_LINKS.mp3": "ccfb9fa7cd3dc522b4cf1605bcbf7ea8",
"assets/assets/tts_en/BE_CAUTIOUS_OF_MONEY_BLANK_REQUESTS.mp3": "31b32bd8eaa9fa562e14a17d2d0b2eee",
"assets/assets/tts_en/BE_CAUTIOUS_OF_MONEY_TRANSFER_REQUESTS.mp3": "0ae05b4607b7be3c90b0631f6e7873f2",
"assets/assets/tts_en/BLANK_ACTIVITIES_CAN_LOOK_LEGITIMATE.mp3": "8c435b6c6e12a4724ed4430ce297b3e5",
"assets/assets/tts_en/BLANK_ATTEMPTS_OFTEN_MIMIC_TRUSTED_SOURCES.mp3": "94b990ef4e8a0cc21d18f070d0d84f3c",
"assets/assets/tts_en/BLANK_CALLS_CAN_BE_SCAM-RELATED.mp3": "4247909645a1c0a291233b658869c43d",
"assets/assets/tts_en/BLANK_CAN_INFECT_YOUR_DEVICE_AND_STEAL_DATA.mp3": "84aad009137f8673eede4e9c2283c0ac",
"assets/assets/tts_en/BLANK_PREVENTS_FRAUD.mp3": "f9fd5bd213e8aa327f9096748176357b",
"assets/assets/tts_en/BLANK_SCAMS_INVOLVE_FAKE_IDENTITIES.mp3": "40da482388a34216198cdb7000717ae0",
"assets/assets/tts_en/BLANK_SCAMS_TO_THE_AUTHORITIES.mp3": "f17a7834f7d72cbd66574b1ddcaffc18",
"assets/assets/tts_en/BLANK_TRICKS_YOU_WITH_FAKE_SENDER_IDENTITIES.mp3": "a263b2147735adba04d28ca1aeac8618",
"assets/assets/tts_en/BLANK_TRY_TO_TRICK_YOU_INTO_GIVING_UP_DATA.mp3": "e084a3cd98eca962e9014b064b775204",
"assets/assets/tts_en/BLANK_UNKNOWN_OR_UNTRUSTED_CONTACTS.mp3": "9eecb0cf6e5138e68e95639fa1e4ee83",
"assets/assets/tts_en/BLOCK_UNKNOWN_OR_UNTRUSTED_CONTACTS.mp3": "c97fa17b35de4f7fabc97c59e50ff534",
"assets/assets/tts_en/CALL_THE_BLANK_TO_REPORT_A_SCAM.mp3": "bb25ef1512ee3d689c6a6313a7cc2ced",
"assets/assets/tts_en/CALL_THE_HOTLINE_TO_REPORT_A_SCAM.mp3": "67c9c61bd7fa27fbe587e33dfc546c04",
"assets/assets/tts_en/FRAUDULENT_ACTIVITIES_CAN_LOOK_LEGITIMATE.mp3": "f046262e5493de35bdfc4b08b1cabcb9",
"assets/assets/tts_en/IMPERSONATION_SCAMS_INVOLVE_FAKE_IDENTITIES.mp3": "b721aad769f01824df783ba7a6f0f39a",
"assets/assets/tts_en/MALWARE_CAN_INFECT_YOUR_DEVICE_AND_STEAL_DATA.mp3": "ee3884e6ccae75912cdd4a3322a6cf7f",
"assets/assets/tts_en/NEVER_SHARE_YOUR_BLANK.mp3": "bb0ff122b17bb73a8d6b4d06b798f159",
"assets/assets/tts_en/NEVER_SHARE_YOUR_PASSWORD.mp3": "d7d0166a628d5d0bd44034cf656c00d9",
"assets/assets/tts_en/OVERSEAS_CALLS_CAN_BE_SCAM-RELATED.mp3": "e54470a1ba409fcac296aea553f07c6b",
"assets/assets/tts_en/PHISHING_ATTEMPTS_OFTEN_MIMIC_TRUSTED_SOURCES.mp3": "2a09629ebba7caed00496fa7dd8e00ed",
"assets/assets/tts_en/REPORT_SCAMS_TO_THE_AUTHORITIES.mp3": "243eefa1ddaa7b1ea0458d58f7947037",
"assets/assets/tts_en/REPORT_SCAMS_TO_THE_BLANK.mp3": "5760fec63d4b994206cab663cd99c7fd",
"assets/assets/tts_en/REPORT_SCAMS_TO_THE_POLICE.mp3": "2350ea3ea855c42c5d3341bb99e93f0a",
"assets/assets/tts_en/SCAMMERS_MAY_POSE_AS_BLANK_OFFICIALS.mp3": "eaa3be54bf349b91b100367cfeacf680",
"assets/assets/tts_en/SCAMMERS_MAY_POSE_AS_GOVERNMENT_OFFICIALS.mp3": "0aed208d488106346d3a8eb514c08467",
"assets/assets/tts_en/SCAMMER_TRY_TO_TRICK_YOU_INTO_GIVING_UP_DATA.mp3": "90d99129a0e3f19f77be7d29154b5a87",
"assets/assets/tts_en/SPOOF_TRICKS_YOU_WITH_FAKE_SENDER_IDENTITIES.mp3": "c18b4172a9b6c52a3ef192093ad07ee5",
"assets/assets/tts_en/TOO-GOOD-TO-BE-TRUE_BLANK_OFFERS_ARE_RISKY.mp3": "d260497bb82392703bbdbd6e7f0fc4fb",
"assets/assets/tts_en/TOO-GOOD-TO-BE-TRUE_INVESTMENT_OFFERS_ARE_RISKY.mp3": "a97561a0a3fc5148e5359cdc98f55a75",
"assets/assets/tts_en/USE_BLANK_TOOLS_TO_BLOCK_SCAMS.mp3": "6355e6c416fef4f1ca6a2dae18bbc2b9",
"assets/assets/tts_en/USE_SCAMSHIELD_TOOLS_TO_BLOCK_SCAMS.mp3": "cae2e1a67bb45cf6b13c7383003529e6",
"assets/assets/tts_en/VERIFICATION_PREVENTS_FRAUD.mp3": "7f82b2caafe48a606c4c3e778dc4a070",
"assets/assets/tts_ms/AKTIVITI_KOSONG_BOLEH_KELIHATAN_SAH.mp3": "f04cb6bd6aac5eb4d98dc165fe4d0faf",
"assets/assets/tts_ms/AKTIVITI_PENIPUAN_BOLEH_KELIHATAN_SAH.mp3": "824031c21eeb1f830d80d7cc2ccab4eb",
"assets/assets/tts_ms/BERHATI-HATI_DENGAN_PERMINTAAN_KOSONG_WANG.mp3": "b7f59e459c4845edceed2a46389ec0f6",
"assets/assets/tts_ms/BERHATI-HATI_DENGAN_PERMINTAAN_PEMINDAHAN_WANG.mp3": "c7d0f53b0b4535d108009fda9a99f728",
"assets/assets/tts_ms/CUBAAN_KOSONG_DATA_SERING_MENIRU_SUMBER_YANG_DIPERCAYAI.mp3": "f75fd33dbf0a9bfe26359c9486593574",
"assets/assets/tts_ms/CUBAAN_PANCINGAN_DATA_SERING_MENIRU_SUMBER_YANG_DIPERCAYAI.mp3": "c01275107a53b618269aedf0e5906302",
"assets/assets/tts_ms/ELAKKAN_MENGKLIK_PADA_PAUTAN_YANG_KOSONG.mp3": "35bf507d216535b4480572c9b8058e32",
"assets/assets/tts_ms/ELAKKAN_MENGKLIK_PADA_PAUTAN_YANG_MENCURIGAKAN.mp3": "d134c819543d498390c8f14da9617764",
"assets/assets/tts_ms/GUNAKAN_ALAT_KOSONG_PENIPUAN_UNTUK_MENGHALANG_PENIPUAN.mp3": "10748cf819c514bf64f7d50c883eaf2b",
"assets/assets/tts_ms/GUNAKAN_ALAT_PERISAI_PENIPUAN_UNTUK_MENGHALANG_PENIPUAN.mp3": "febeacbd274631ee84c80ae1701183ac",
"assets/assets/tts_ms/HUBUNGI_KOSONG_HOTLINE_UNTUK_MELAPORKAN_PENIPUAN.mp3": "3b77c9d747e8580bda7bba9a1f756988",
"assets/assets/tts_ms/HUBUNGI_TALIAN_HOTLINE_UNTUK_MELAPORKAN_PENIPUAN.mp3": "7aa4d934ab37c111d975c57b9e282800",
"assets/assets/tts_ms/JANGAN_SEKALI-KALI_BERKONGSI_KATA_KOSONG_ANDA.mp3": "b6799f764e5f762c4353a3d67d3590ec",
"assets/assets/tts_ms/JANGAN_SEKALI-KALI_BERKONGSI_KATA_LALUAN_ANDA.mp3": "2e074a256131218939638cc693a4e93f",
"assets/assets/tts_ms/KOSONG_CUBA_MENIPU_ANDA_UNTUK_MENYERAHKAN_DATA.mp3": "1ebd241427330ba7200f7423ebd7b62b",
"assets/assets/tts_ms/KOSONG_KENALAN_YANG_TIDAK_DIKENALI_ATAU_TIDAK_DIPERCAYAI.mp3": "f0785e560b0d77edafa65e5936aacb17",
"assets/assets/tts_ms/KOSONG_MEMPERDAYA_ANDA_DENGAN_IDENTITI_PENGHANTAR_PALSU.mp3": "360edb194ae320917759e7f3a4f56676",
"assets/assets/tts_ms/KOSONG_MENGHALANG_PENIPUAN.mp3": "e7aa7f01af1664d9c4fd45db241394d0",
"assets/assets/tts_ms/KOSONG_PENIPUAN_KEPADA_PIHAK_BERKUASA.mp3": "3e7557c7ab6bbeaeea8ee0b8f1f7e3f9",
"assets/assets/tts_ms/LAPORAN_PENIPUAN_KEPADA_PIHAK_BERKUASA.mp3": "ad2e91be605d889d9ac9c3ba1e09ef1d",
"assets/assets/tts_ms/LAPORKAN_PENIPUAN_KEPADA_KOSONG.mp3": "e6dd33fc21b62977643cbfe4ce716257",
"assets/assets/tts_ms/LAPORKAN_PENIPUAN_KEPADA_POLIS.mp3": "e533b7a8a5a9c2b8c140b76c6a9f5331",
"assets/assets/tts_ms/PANGGILAN_KOSONG_NEGARA_BOLEH_JADI_BERKAITAN_DENGAN_PENIPUAN.mp3": "ea1523da37112b8a74d5381ccaceb765",
"assets/assets/tts_ms/PANGGILAN_LUAR_NEGARA_BOLEH_JADI_BERKAITAN_DENGAN_PENIPUAN.mp3": "8bc11e777fa476bf061c8520a5dfd865",
"assets/assets/tts_ms/PENGESAHAN_MENGHALANG_PENIPUAN.mp3": "d22e35cee8e877d193482ad20f11117d",
"assets/assets/tts_ms/PENIPUAN_KOSONG_MELIBATKAN_IDENTITI_PALSU.mp3": "7520aaa90a299256f9780d7507621e7d",
"assets/assets/tts_ms/PENIPUAN_PENIRUAN_MELIBATKAN_IDENTITI_PALSU.mp3": "a6d10cb89060af3dbd755d517746d45a",
"assets/assets/tts_ms/PENIPU_CUBA_MENIPU_ANDA_UNTUK_MENYERAHKAN_DATA.mp3": "f7dae63d1a22855b3025ed1cac978f49",
"assets/assets/tts_ms/PENIPU_MUNGKIN_MENYAMAR_SEBAGAI_PEGAWAI_KERAJAAN.mp3": "899190bbf3ee2bf290486fe794dedaad",
"assets/assets/tts_ms/PENIPU_MUNGKIN_MENYAMAR_SEBAGAI_PEGAWAI_KOSONG.mp3": "1af0fc784c93fac0c207f6cf85fab5e3",
"assets/assets/tts_ms/PENYAMARAN_MEMPERDAYA_ANDA_DENGAN_IDENTITI_PENGHANTAR_PALSU.mp3": "5ea80d694ff76eec07f1393b74a033d9",
"assets/assets/tts_ms/PERISIAN_HASAD_BOLEH_MENJANGKITI_PERANTI_ANDA_DAN_MENCURI_DATA.mp3": "f3468275a2fda861387390a1a45eb5ce",
"assets/assets/tts_ms/PERISIAN_KOSONG_BOLEH_MENJANGKITI_PERANTI_ANDA_DAN_MENCURI_DATA.mp3": "e9df12344455e4b31f172ffe424e65b5",
"assets/assets/tts_ms/SEKAT_KENALAN_YANG_TIDAK_DIKENALI_ATAU_TIDAK_DIPERCAYAI.mp3": "4c16972047dce733783387c4fde32d42",
"assets/assets/tts_ms/SENTIASA_KEKAL_AMARAN_TERHADAP_TINGKAH_LAKU_MENCURIGAKAN.mp3": "e1549e91f104b74aa12432a7dc752c79",
"assets/assets/tts_ms/SENTIASA_KEKAL_KOSONG_TERHADAP_TINGKAH_LAKU_MENCURIGAKAN.mp3": "1c05a65d7b62e10d94ee73e468af4401",
"assets/assets/tts_ms/SENTIASA_LINDUNGI_MAKLUMAT_KOSONG_ANDA.mp3": "8377e95e3555759f228a51b52db5cd47",
"assets/assets/tts_ms/SENTIASA_LINDUNGI_MAKLUMAT_PERBANKAN_ANDA.mp3": "44fab077aa4c02b87d80c08899a4ea2e",
"assets/assets/tts_ms/TAWARAN_KOSONG_YANG_TERLALU_BAIK_UNTUK_JADI_KENYATAAN_BERISIKO.mp3": "255c68c3b5adce9302742b01bf2565d0",
"assets/assets/tts_ms/TAWARAN_PELABURAN_YANG_TERLALU_BAIK_UNTUK_JADI_KENYATAAN_BERISIKO.mp3": "9347230f474e2d961eae31a8f2aabca4",
"assets/assets/tts_ta/00afa07f3982d98f6010741fde3614e6.mp3": "19ee1ae12e13922042aa60efebe50994",
"assets/assets/tts_ta/01b244109681c00eb5fed970cf05e73a.mp3": "88560ff9129b20225f3fc695f218cf4d",
"assets/assets/tts_ta/0ad3a5f0c7778cdbe874b5e5ec6452e1.mp3": "9cbf84232473fb45760a0d80736f536b",
"assets/assets/tts_ta/0c9f83453eb3b788ae1935dbeaeb883c.mp3": "52f240be9272bf4bb4675ea68d76553e",
"assets/assets/tts_ta/121d0b4e1c2e1cefca41a2ff4105a8e1.mp3": "e3e6626700fe2e7f79e5f6bb11d9da0a",
"assets/assets/tts_ta/14c00cf45bb09bc9941008c7eafec3a7.mp3": "69faee0b48da677d24687be1c725dccd",
"assets/assets/tts_ta/180e8cbe076215e7ed343e63057c6a34.mp3": "2bf2edb2adecc2c30b956c8047385d5a",
"assets/assets/tts_ta/196a36edf8364287fb6919c0399f1329.mp3": "74703bda18574429072811e1492e34d3",
"assets/assets/tts_ta/27f2817693a18b294f205d2399ce3d8c.mp3": "d10e806262e11ab855c00638b3b095f6",
"assets/assets/tts_ta/2c305bcac918a1bd7bfc92655f853b47.mp3": "c133f891300d80857af43415bc42eeca",
"assets/assets/tts_ta/2f38564102756c48f4b69e4d7bc83bb4.mp3": "46fbbbdba10e129eac4a34cf166c0907",
"assets/assets/tts_ta/36aba0a780816bc1da842c6dc320cf8a.mp3": "3415098dab4d702a39d898732d2da5f9",
"assets/assets/tts_ta/543f0997a668a49aea92c5a597c287d9.mp3": "b965de571382c5602caee0c0c35af107",
"assets/assets/tts_ta/5e1b8b50639bb67dff4281d719ff1a51.mp3": "f767fa40036b597604c08fc5a2c64adf",
"assets/assets/tts_ta/66a0df2b9d9a14a09bb345b1794720f2.mp3": "6a82d2fcea6cf6023d8d960e783360ee",
"assets/assets/tts_ta/6ba0b8199a5707f9f3c7e8bd0550342f.mp3": "43758f6317fbea06a5d89ba832caee5c",
"assets/assets/tts_ta/779dee20dfc7543dd51f864a3bef1496.mp3": "0c0a20cb3e94adc9c9724215670c3812",
"assets/assets/tts_ta/7aa5cbbfb09147fbd39d4570dd9f1beb.mp3": "ce4b1bd33db483021233610b2645be09",
"assets/assets/tts_ta/7bc1654002cb9bfdfefd6902079bc643.mp3": "a18033407031efb56ee623cbf51f5559",
"assets/assets/tts_ta/80f431f83ba98c8301e317a6c0e41fee.mp3": "f9bd4f948fc92aaa4c567ee9c5444970",
"assets/assets/tts_ta/84801b68330b8b1092acb3630718eafb.mp3": "827c570132b7122228cb4eb6e6bd99cb",
"assets/assets/tts_ta/85898a7556a44862673babdc951d6445.mp3": "57159f8dd5770a3aad342eecc83a907d",
"assets/assets/tts_ta/8b95de7b6c7666bcf1252e792cf3694f.mp3": "8bc9504dab989d724c82d0a3e88fefcb",
"assets/assets/tts_ta/9514b8346274959948d3d8b6dcd8c3b6.mp3": "2ef3c531b03d5eefbfd172bfd8c7e647",
"assets/assets/tts_ta/98604748df0349c4d57bcf8864066059.mp3": "a1104267b68b58b74940315b9285b813",
"assets/assets/tts_ta/9c59a6997ba4ae34f3e35b4cae46f47c.mp3": "7ecae3ae39ca6b1b3c955246304a71a8",
"assets/assets/tts_ta/9ecee97c57086dea2906e04fd1bbbff7.mp3": "62727157d125aaa4bf888de89e1df5f4",
"assets/assets/tts_ta/aa5540e95d91994d53cb6f8f61d874f3.mp3": "7e266892314b60af6ce199f73b6aaf0b",
"assets/assets/tts_ta/ac78f8c976be7920c5c972fe9c422f8a.mp3": "732a6481768ac54238ad6f52881f12f7",
"assets/assets/tts_ta/ae6793e060f3db7aef6408a3dcf37d5e.mp3": "56c09fec395e88a416ada249bc1b052a",
"assets/assets/tts_ta/c217bef1f074952a4b4f582a09301c0d.mp3": "dd7d419cbdfba2df0e7449eaeea59540",
"assets/assets/tts_ta/c392b601e30f0ef5b667aba56f8ba76f.mp3": "65d99603429e1df80a7ff3aca7586a90",
"assets/assets/tts_ta/da55d37fcc472bc8413b8fba85ae7fd5.mp3": "bf49714f1d6a207d7ea59d4b728d53af",
"assets/assets/tts_ta/e3bf321aa15237c9c18551589db6db5e.mp3": "b39636e2661b1fee7986fe21a1d4c759",
"assets/assets/tts_ta/e3d51b86e700f18ae7d27af8b6d0a933.mp3": "bcbecb6e23b05066e40ae4b97cc50f6e",
"assets/assets/tts_ta/e953cd5e064948d2a89539f5a6edd266.mp3": "fc55513f1a92f3ed404a8f0c8309d1ec",
"assets/assets/tts_ta/eabee84e88fced3a88817a037a8a4617.mp3": "3440662c72f05b22df8d9f2a4d36231d",
"assets/assets/tts_ta/f444404a76dfbaaa6b6d93ff59e16701.mp3": "3e93dd60b2795f0a860d58052634fec8",
"assets/assets/tts_ta/f5110fbf0b35c087fe633ea79dc748f8.mp3": "57f589d44a30770eebabcf46fafbdcf1",
"assets/assets/tts_ta/fd027fc89a9099b837f6bb9ed96b3d65.mp3": "7c991718acfeb0227088f0c03764d1c0",
"assets/assets/tts_ta/tts_mapping.json": "074e88f301365f52fd81cacf280c8e06",
"assets/assets/tts_zh/%25E4%25BD%25BF%25E7%2594%25A8%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E5%258F%25AF%25E4%25BB%25A5%25E6%259C%2589%25E6%2595%2588%25E9%2598%25B2%25E6%25AD%25A2%25E8%25AF%2588%25E9%25AA%2597.mp3": "318efe93f663e90e1386762d314b61f2",
"assets/assets/tts_zh/%25E4%25BD%25BF%25E7%2594%25A8%25E9%2598%25B2%25E9%25AA%2597%25E5%25B7%25A5%25E5%2585%25B7%25E5%258F%25AF%25E4%25BB%25A5%25E6%259C%2589%25E6%2595%2588%25E9%2598%25B2%25E6%25AD%25A2%25E8%25AF%2588%25E9%25AA%2597.mp3": "261c987f18ea1f54b729fddbd56af62c",
"assets/assets/tts_zh/%25E4%25BF%259D%25E6%258C%2581%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E6%259C%2589%25E5%258A%25A9%25E8%25AF%2586%25E5%2588%25AB%25E5%258F%25AF%25E7%2596%2591%25E8%25A1%258C%25E4%25B8%25BA.mp3": "10405319896641681fe3b6eb04ad4135",
"assets/assets/tts_zh/%25E4%25BF%259D%25E6%258C%2581%25E8%25AD%25A6%25E6%2583%2595%25E6%2584%258F%25E8%25AF%2586%25E6%259C%2589%25E5%258A%25A9%25E8%25AF%2586%25E5%2588%25AB%25E5%258F%25AF%25E7%2596%2591%25E8%25A1%258C%25E4%25B8%25BA.mp3": "a8796d5ad0f485465ba0f83d7b8f80d2",
"assets/assets/tts_zh/%25E5%2586%2592%25E5%2585%2585%25E8%25A1%258C%25E4%25B8%25BA%25E8%25AF%2588%25E9%25AA%2597%25E9%2580%259A%25E5%25B8%25B8%25E6%25B6%2589%25E5%258F%258A%25E5%2581%2587%25E8%25BA%25AB%25E4%25BB%25BD.mp3": "3e78bad3925af59c16721b69b8166e09",
"assets/assets/tts_zh/%25E5%2588%2587%25E5%258B%25BF%25E6%25B3%2584%25E9%259C%25B2%25E6%2582%25A8%25E7%259A%2584%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E7%25BB%2599%25E4%25BB%2596%25E4%25BA%25BA.mp3": "c21bdc0015caf86f7bd99a2a5b0035a7",
"assets/assets/tts_zh/%25E5%2588%2587%25E5%258B%25BF%25E6%25B3%2584%25E9%259C%25B2%25E6%2582%25A8%25E7%259A%2584%25E7%2599%25BB%25E5%25BD%2595%25E5%25AF%2586%25E7%25A0%2581%25E7%25BB%2599%25E4%25BB%2596%25E4%25BA%25BA.mp3": "a3305ff2f6c8337bce302ad61d93c18a",
"assets/assets/tts_zh/%25E5%258A%25A1%25E5%25BF%2585%25E4%25BF%259D%25E6%258A%25A4%25E6%2582%25A8%25E7%259A%2584%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E4%25BF%25A1%25E6%2581%25AF%25E5%25AE%2589%25E5%2585%25A8.mp3": "c8d76d6957310579b75663fef63e33b6",
"assets/assets/tts_zh/%25E5%258A%25A1%25E5%25BF%2585%25E4%25BF%259D%25E6%258A%25A4%25E6%2582%25A8%25E7%259A%2584%25E9%2593%25B6%25E8%25A1%258C%25E8%25B4%25A6%25E6%2588%25B7%25E4%25BF%25A1%25E6%2581%25AF%25E5%25AE%2589%25E5%2585%25A8.mp3": "780dac126c6a791244af71d05a0ebbdc",
"assets/assets/tts_zh/%25E5%258F%258A%25E6%2597%25B6%25E5%2590%2591%25E6%259C%2589%25E5%2585%25B3%25E9%2583%25A8%25E9%2597%25A8%25E4%25B8%25BE%25E6%258A%25A5%25E8%25AF%2588%25E9%25AA%2597%25E8%25AF%2588%25E9%25AA%2597%25E8%25A1%258C%25E4%25B8%25BA.mp3": "e6205a7322e8c07f7e2a230707129db0",
"assets/assets/tts_zh/%25E5%258F%258A%25E6%2597%25B6%25E5%2590%2591%25E6%259C%2589%25E5%2585%25B3%25E9%2583%25A8%25E9%2597%25A8%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E8%25AF%2588%25E9%25AA%2597%25E8%25A1%258C%25E4%25B8%25BA.mp3": "8547deea0d41554ac11131260aae71c9",
"assets/assets/tts_zh/%25E5%258F%2591%25E7%258E%25B0%25E8%25AF%2588%25E9%25AA%2597%25E5%25BA%2594%25E5%258F%258A%25E6%2597%25B6%25E6%258B%25A8%25E6%2589%2593%25E4%25B8%25BE%25E6%258A%25A5%25E7%2583%25AD%25E7%25BA%25BF.mp3": "10f60eba9c164a716767da47d4d083b2",
"assets/assets/tts_zh/%25E5%258F%2591%25E7%258E%25B0%25E8%25AF%2588%25E9%25AA%2597%25E5%25BA%2594%25E5%258F%258A%25E6%2597%25B6%25E6%258B%25A8%25E6%2589%2593%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D.mp3": "e543695610197c37b673f24d7e71303e",
"assets/assets/tts_zh/%25E5%25BA%2594%25E5%2590%2591%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E4%25B8%25BE%25E6%258A%25A5%25E5%258F%25AF%25E7%2596%2591%25E6%25A1%2588%25E4%25BB%25B6.mp3": "c48fd2884ea572ace8e57114e18e66ba",
"assets/assets/tts_zh/%25E5%25BA%2594%25E5%2590%2591%25E8%25AD%25A6%25E6%2596%25B9%25E4%25B8%25BE%25E6%258A%25A5%25E4%25B8%25BE%25E6%258A%25A5%25E5%258F%25AF%25E7%2596%2591%25E6%25A1%2588%25E4%25BB%25B6.mp3": "b1c6a99351be497d8032707750cd54e8",
"assets/assets/tts_zh/%25E5%25BA%2594%25E5%25B1%258F%25E8%2594%25BD%25E8%2581%2594%25E7%25B3%25BB%25E4%25BA%25BA%25E4%25B8%258D%25E6%2598%258E%25E6%2588%2596%25E4%25B8%258D%25E4%25BF%25A1%25E4%25BB%25BB%25E8%2581%2594%25E7%25B3%25BB%25E4%25BA%25BA.mp3": "dd258533ed856c4078c2c7eb92620fec",
"assets/assets/tts_zh/%25E5%25BA%2594%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E4%25B8%258D%25E6%2598%258E%25E6%2588%2596%25E4%25B8%258D%25E4%25BF%25A1%25E4%25BB%25BB%25E8%2581%2594%25E7%25B3%25BB%25E4%25BA%25BA.mp3": "42670f4ca5e1a8721013fbb8ff8125d4",
"assets/assets/tts_zh/%25E6%2581%25B6%25E6%2584%258F%25E8%25BD%25AF%25E4%25BB%25B6%25E4%25BC%259A%25E6%2584%259F%25E6%259F%2593%25E8%25AE%25BE%25E5%25A4%2587%25E5%25B9%25B6%25E7%25AA%2583%25E5%258F%2596%25E6%2595%25B0%25E6%258D%25AE.mp3": "24357074860366e0d8f6f6153262186b",
"assets/assets/tts_zh/%25E6%2594%25B6%25E5%2588%25B0%25E9%2592%25B1%25E6%25AC%25BE%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E8%25A6%2581%25E6%25A0%25BC%25E5%25A4%2596%25E8%25B0%25A8%25E6%2585%258E.mp3": "e929c013b6acd244cc061b432d97b6fc",
"assets/assets/tts_zh/%25E6%2594%25B6%25E5%2588%25B0%25E9%2592%25B1%25E6%25AC%25BE%25E8%25BD%25AC%25E8%25B4%25A6%25E8%25AF%25B7%25E6%25B1%2582%25E8%25A6%2581%25E6%25A0%25BC%25E5%25A4%2596%25E8%25B0%25A8%25E6%2585%258E.mp3": "8c43aec690e9e054a856ca0bb45fa4c9",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E4%25BC%2581%25E5%259B%25BE%25E5%25B8%25B8%25E5%25B8%25B8%25E4%25BC%25AA%25E8%25A3%2585%25E6%2588%2590%25E5%258F%25AF%25E4%25BF%25A1%25E6%259D%25A5%25E6%25BA%2590.mp3": "a57e34215ef90e82e73d8cfd10029a79",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E4%25BC%259A%25E6%2584%259F%25E6%259F%2593%25E8%25AE%25BE%25E5%25A4%2587%25E5%25B9%25B6%25E7%25AA%2583%25E5%258F%2596%25E6%2595%25B0%25E6%258D%25AE.mp3": "67934be35bf6e913324d2c7490522e44",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E6%259C%2589%25E5%258A%25A9%25E4%25BA%258E%25E9%25A2%2584%25E9%2598%25B2%25E6%25AC%25BA%25E8%25AF%2588%25E8%25A1%258C%25E4%25B8%25BA.mp3": "f286ee65af06b03d113603e48efd8ce0",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E6%259C%2589%25E6%2597%25B6%25E7%259C%258B%25E8%25B5%25B7%25E6%259D%25A5%25E5%25BE%2588%25E7%259C%259F%25E5%25AE%259E.mp3": "983d336d5b8f387869975b6862fa9a11",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E7%2594%25A8%25E6%259D%25A5%25E4%25BC%25AA%25E8%25A3%2585%25E5%258F%2591%25E4%25BB%25B6%25E4%25BA%25BA%25E8%25BA%25AB%25E4%25BB%25BD.mp3": "e1f3ff65189bbe2ef50b0bf5f56c4b70",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E7%2594%25B5%25E8%25AF%259D%25E6%259C%2589%25E5%258F%25AF%25E8%2583%25BD%25E6%2598%25AF%25E8%25AF%2588%25E9%25AA%2597%25E7%2594%25B5%25E8%25AF%259D.mp3": "efd589c1fdeef374948766a3b1f18418",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E8%25AF%2588%25E9%25AA%2597%25E9%2580%259A%25E5%25B8%25B8%25E6%25B6%2589%25E5%258F%258A%25E5%2581%2587%25E8%25BA%25AB%25E4%25BB%25BD.mp3": "67e3572dd0e80a1f873af391f750f4aa",
"assets/assets/tts_zh/%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E8%25AF%2595%25E5%259B%25BE%25E9%25AA%2597%25E5%258F%2596%25E6%2582%25A8%25E7%259A%2584%25E4%25B8%25AA%25E4%25BA%25BA%25E4%25BF%25A1%25E6%2581%25AF.mp3": "61ec76efce9f8645960a2b0d6ef92d4e",
"assets/assets/tts_zh/%25E6%25AC%25BA%25E8%25AF%2588%25E8%25A1%258C%25E4%25B8%25BA%25E6%259C%2589%25E6%2597%25B6%25E7%259C%258B%25E8%25B5%25B7%25E6%259D%25A5%25E5%25BE%2588%25E7%259C%259F%25E5%25AE%259E.mp3": "55b366957d52812d4eef41f50fe34b0a",
"assets/assets/tts_zh/%25E6%25AC%25BA%25E9%25AA%2597%25E4%25BC%258E%25E4%25BF%25A9%25E7%2594%25A8%25E6%259D%25A5%25E4%25BC%25AA%25E8%25A3%2585%25E5%258F%2591%25E4%25BB%25B6%25E4%25BA%25BA%25E8%25BA%25AB%25E4%25BB%25BD.mp3": "9f71d23953a489c2478b2710d209dc18",
"assets/assets/tts_zh/%25E6%25B5%25B7%25E5%25A4%2596%25E7%2594%25B5%25E8%25AF%259D%25E7%2594%25B5%25E8%25AF%259D%25E6%259C%2589%25E5%258F%25AF%25E8%2583%25BD%25E6%2598%25AF%25E8%25AF%2588%25E9%25AA%2597%25E7%2594%25B5%25E8%25AF%259D.mp3": "7b681e75403b392395577f8ee56f778a",
"assets/assets/tts_zh/%25E7%25BD%2591%25E7%25BB%259C%25E9%2592%2593%25E9%25B1%25BC%25E4%25BC%2581%25E5%259B%25BE%25E5%25B8%25B8%25E5%25B8%25B8%25E4%25BC%25AA%25E8%25A3%2585%25E6%2588%2590%25E5%258F%25AF%25E4%25BF%25A1%25E6%259D%25A5%25E6%25BA%2590.mp3": "3be2e1ae0432b736fa86ba6eaf247929",
"assets/assets/tts_zh/%25E8%25AF%2588%25E9%25AA%2597%25E8%2580%2585%25E4%25BB%25AC%25E8%25AF%2595%25E5%259B%25BE%25E9%25AA%2597%25E5%258F%2596%25E6%2582%25A8%25E7%259A%2584%25E4%25B8%25AA%25E4%25BA%25BA%25E4%25BF%25A1%25E6%2581%25AF.mp3": "c8062271307de6071e6d24bacc661459",
"assets/assets/tts_zh/%25E8%25BA%25AB%25E4%25BB%25BD%25E9%25AA%258C%25E8%25AF%2581%25E6%259C%2589%25E5%258A%25A9%25E4%25BA%258E%25E9%25A2%2584%25E9%2598%25B2%25E6%25AC%25BA%25E8%25AF%2588%25E8%25A1%258C%25E4%25B8%25BA.mp3": "269084d11bb3341296b61c5bf947054f",
"assets/assets/tts_zh/%25E8%25BF%2587%25E4%25BA%258E%25E7%2590%2586%25E6%2583%25B3%25E7%259A%2584%25E6%258A%2595%25E8%25B5%2584%25E6%259C%25BA%25E4%25BC%259A%25E5%25BE%2580%25E5%25BE%2580%25E5%25AD%2598%25E5%259C%25A8%25E9%25A3%258E%25E9%2599%25A9.mp3": "43fdd06b186a55249b52c4c3ca34dc19",
"assets/assets/tts_zh/%25E8%25BF%2587%25E4%25BA%258E%25E7%2590%2586%25E6%2583%25B3%25E7%259A%2584%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E5%25BE%2580%25E5%25BE%2580%25E5%25AD%2598%25E5%259C%25A8%25E9%25A3%258E%25E9%2599%25A9.mp3": "9738c2ee457462aff61f6cceec8822c6",
"assets/assets/tts_zh/%25E9%2581%25BF%25E5%2585%258D%25E7%2582%25B9%25E5%2587%25BB%25E4%25BB%25BB%25E4%25BD%2595%25E5%258F%25AF%25E7%2596%2591%25E9%2593%25BE%25E6%258E%25A5%25E7%259A%2584%25E9%2593%25BE%25E6%258E%25A5.mp3": "b7629b230be262830e2c6a44662cb9c0",
"assets/assets/tts_zh/%25E9%2581%25BF%25E5%2585%258D%25E7%2582%25B9%25E5%2587%25BB%25E4%25BB%25BB%25E4%25BD%2595%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E7%259A%2584%25E9%2593%25BE%25E6%258E%25A5.mp3": "507dd73a7a879416b90ed4960c5331fb",
"assets/assets/tts_zh/%25E9%25AA%2597%25E5%25AD%2590%25E5%258F%25AF%25E8%2583%25BD%25E5%2586%2592%25E5%2585%2585%25E6%2594%25BF%25E5%25BA%259C%25E5%25AE%2598%25E5%2591%2598%25E6%259D%25A5%25E8%25A1%258C%25E9%25AA%2597.mp3": "b62183535487fc17bfdd4d357c5b3cef",
"assets/assets/tts_zh/%25E9%25AA%2597%25E5%25AD%2590%25E5%258F%25AF%25E8%2583%25BD%25E5%2586%2592%25E5%2585%2585%25E6%259F%2590%25E4%25B8%25AA%25E8%25AF%258D%25E6%259D%25A5%25E8%25A1%258C%25E9%25AA%2597.mp3": "c541caf236e8127c0205f45b93f6fe0a",
"assets/assets/video/en_tut.mp4": "3b87fa1ff64136d4a9682409790e43b9",
"assets/assets/video/ms_tut.mp4": "b571d0be4c87a1ef88685339aa6d357c",
"assets/assets/video/ta_tut.mp4": "47a98a3706f156ee65da51a756705032",
"assets/assets/video/zh_tut.mp4": "e097c8a392b2f663c8321a5c9dd7909e",
"assets/assets/word%2520lists/word_list_en.txt": "cf714bc3da2db39c2d3fb38e27363975",
"assets/assets/word%2520lists/word_list_ms.txt": "d5e53df5678f40e6de0d52d7fbf04bd9",
"assets/assets/word%2520lists/word_list_ta.txt": "4b140fb98c9f63e0da27a6e77b64388e",
"assets/assets/word%2520lists/word_list_zh.txt": "7f6a77a4e95d432e5d5dfc20615495df",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "de4dec7d45c1111d96f68fdb80b10407",
"assets/NOTICES": "12e703da83d1bf36ff134b252adefdef",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "d7d83bd9ee909f8a9b348f56ca7b68c6",
"assets/packages/wakelock_plus/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "7fb81e28edd7dea20a967ba617ef8e4f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "cd5537075492308c739392d89c9a4099",
"/": "cd5537075492308c739392d89c9a4099",
"main.dart.js": "299171774f30e4e4215cae9bba758da2",
"manifest.json": "fd057264bde73f2d32011f6dc43f43e6",
"version.json": "91e257f0f87bfea69e291d3a87d56500"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
