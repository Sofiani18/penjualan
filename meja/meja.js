const express =require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/all',async(req,res)=>{
    try {
        const result = await database.select("*").from('meja');
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

router.get('/one/:id_meja',async(req,res)=>{
    try {
        const result = await database.select("*").from("meja").where('id_meja',req.params.id_meja).first();
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

router.post('/simpan',async(req,res)=>{
    const data = req.body;
    try {
        const simpan = await database("meja").insert(data);
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

router.put('/edit/:id_meja',async(req,res)=>{
    const data = req.body;
    try {
        const result = await database("*").from("meja").where('id_meja', req.params.id_meja);
        if (result.length >0 ) {
            const update = await database("meja").where('id_meja', req.params.id_meja).update(data);
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

router.post('/edit/:id_meja',async(req,res)=>{
    try {
        const result = await database.select("*").from("meja").where('id_meja',req.params.id_meja);
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

router.delete('/delete/:id_meja',async(req,res)=>{
    try {
        const result = await database.select("*").from("meja").where('id_meja',req.params.id_meja);
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


module.exports = router;