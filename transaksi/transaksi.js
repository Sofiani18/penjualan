const express =require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/all/:id_transaksi',async(req,res)=>{
    try {
        const result = await database("v_transaksi")
        .select("*")
        .where('v_transaksi.id_transaksi', req.params.id_transaksi);
        if (result.length >0 ) {
            return res.status(200).json({
                status : 1,
                message : "berhasil",
                result : result,
            })
        } else {
            return res.status(400).json({
                status :0,
                message :"data tidak di temukan"
            })
        }
    } catch (error) {
        return res.status(500).json({
        status : 0,
        message : error.message
         });
    }
});

// router.post('/simpan',async(req,res)=>{
//     const data = {
//             tanggal: req.body.tanggal,
//             nama_menu: req.body.nama_menu,
//             nama_kategori: req.body.nama_kategori,
//             nama_cs: req.body.nama_cs,
//             no_meja: req.body.no_meja,
//             jumlah: req.body.jumlah,
//             total: req.body.total,
//             diskon: req.body.diskon,
//             jumlah_diskon: req.body.jumlah_diskon,
//             harga_bayar: req.body.harga_bayar,
//     }
//     try {
//         const simpan = await database("v_transaksi").insert(data);
//         if (simpan) {
//             return res.status(200).json({
//                 status : 1,
//                 message : "berhasil ditambah",
//                 result : {
//                     id_detail : simpan[0], 
//                     ...data
//                 }
//             })
//         } else {
//             return res.status(400).json({
//                 status :0,
//                 message :"data tidak ditambah"
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//         status : 0,
//         message : error.message
//          });
//     }
// });

module.exports = router