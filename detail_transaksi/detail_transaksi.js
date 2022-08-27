const express =require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/all/:id_detail',async(req,res)=>{
    try {
        const result = await database("v_detail_transaksi")
        .select("*")
        .where('v_detail_transaksi.id_detail', req.params.id_detail);
        if (result) {
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

router.get('/semua',async(req,res)=>{
    try {
        const result = await database.select("*").from('v_detail_transaksi');
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

router.post('/simpan',async(req,res)=>{
    const data = req.body;
    try {
        const simpan = await database("detail_transaksi").insert(data);
        if (simpan) {
            return res.status(200).json({
                status : 1,
                message : "berhasil tersimpan",
                result : simpan,
            })
        } else {
            return res.status(400).json({
                status :0,
                message :"data tidak tersimpan"
            })
        }
    } catch (error) {
        return res.status(500).json({
        status : 0,
        message : error.message
         });
    }
});

module.exports = router
