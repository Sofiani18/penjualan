const express =require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/all',async(req,res)=>{
    try {
        const result = await database.select("*").from('diskon');
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

router.get('/all/:id_diskon',async(req,res)=>{
    try {
        const result = await database("*").from("diskon").where('id_diskon', req.params.id_diskon);
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
        const simpan = await database("diskon").insert(data);
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

router.put('/edit/:id_diskon',async(req,res)=>{
    const data = req.body;
    try {
        const result = await database.select("*").from("diskon").where('id_diskon',req.params.id_diskon);
        if (result.length >0 ) {
            await database("diskon").update(data).where('id_diskon',req.params.id_diskon);
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

router.delete('/hapus/:id_diskon',async(req,res)=>{
    try {
        const update = await database("diskon").update('status','T').where('id_diskon', req.params.id_diskon);
        if (update){
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

module.exports = router
