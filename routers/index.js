const express =require('express');
const router = express.Router();

router.use("/kategori",require("../kategori/kategori"));
router.use("/petugas",require("../petugas/petugas"));
router.use("/menu",require("../menu/menu"));
router.use("/meja",require("../meja/meja"));
router.use("/detail_transaksi",require("../detail_transaksi/detail_transaksi"));
router.use("/transaksi",require("../transaksi/transaksi"));
router.use("/diskon",require("../diskon/diskon"));

module.exports = router;