const express =require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/all',async(req,res)=>{
    try {
        const result = await database.select("*").from('kategori');
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

router.get('/all/:id_kategori',async(req,res)=>{
    try {
        const result = await database("*").from("kategori").where('id_kategori', req.params.id_kategori);
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
        const simpan = await database("kategori").insert(data);
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

router.put('/edit/:id_kategori',async(req,res)=>{
    const data = req.body;
    try {
        const result = await database("*").from("kategori").where('id_kategori', req.params.id_kategori);
        if (result.length >0 ) {
            const update = await database("kategori").where('id_kategori', req.params.id_kategori).update(data);
            if (update) {
                return res.status(200).json({
                    status : 1,
                    message : "berhasil edit",
                    result : {
                        ...data
                    }
                })
            }
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

router.delete('/hapus/:id_kategori',async(req,res)=>{
    try {
        const del = await database("*").from("kategori").where('id_kategori', req.params.id_kategori);
        if (del){
            await database("kategori").where('id_kategori', req.params.id_kategori).delete();
            return res.status(200).json({
                status : 1,
                message : "berhasil", 
            })            
        } else {
            return res.status(400).json({
                status :0,
                message :"Gagal"
            });
        }        
    } catch (error) {
        return res.status(500).json({
            status : 0,
            message : error.message
             }); 
    }
});

module.exports = router;