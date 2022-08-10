const express =require('express');
const router = express.Router();
const database = require('../config/database');
const upload = require("./multer");

router.get('/all',async(req,res)=>{
    try {
        const result = await database.select("*").from('menu');
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

router.get('/all/:id_menu',async(req,res)=>{
    try {
        const result = await database.select("*").from("menu").where('id_menu',req.params.id_menu);
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

router.post('/simpan', upload.single("gambar"), async(req,res)=>{
    const data = {
        nama_menu : req.body.nama_menu,
        harga_jual : req.body.harga_jual,
        harga_modal : req.body.harga_modal,
        stok : req.body.stok,
        id_kategori : req.body.id_kategori,
        gambar : req.file.filename,
        status_diskon : req.body.status_diskon,
        status : req.body.status,
    }
    try {
        const simpan = await database("menu").insert(data);
        if (simpan) {
            return res.status(200).json({
                status : 1,
                message : "berhasil",
                result : {
                    id_menu : simpan[0], 
                    ...data
                }
        })
        } else {
            return res.status(400).json({
                status :0,
                message :"data tidak di simpan"
            })
        }
   } catch (error) {
    return res.status(500).json({
        status : 0,
        message : error.message
      });
   }
});

router.put('/edit/:id_menu', upload.single("gambar"),async(req,res)=>{
    const data = {
        nama_menu : req.body.nama_menu,
        harga_jual : req.body.harga_jual,
        harga_modal : req.body.harga_modal,
        stok : req.body.stok,
        id_kategori : req.body.id_kategori,
        gambar : req.file.filename,
        status_diskon : req.body.status_diskon,
        status : req.body.status,
    }
    try {
        const result = await database("*").from("menu").where('id_menu', req.params.id_menu);
        if (result.length >0 ) {
            const update = await database("menu").where('id_menu', req.params.id_menu).update(data);
            if (update) {
                return res.status(200).json({
                    status : 1,
                    message : "berhasil edit",
                    result : {
                        id_menu : update,
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

// foto belum ikut kehapus
router.delete('/hapus/:id_menu',async(req,res)=>{
    const result = await database("*").from("menu").where('id_menu', req.params.id_menu);
    if (result) {
        await database("menu").where('id_menu', req.params.id_menu).delete();
        fs.unlink(path.join(__dirname +"/gambar/")) +result.gambar, (err)=>{
            if (err) {
                return res.status(200).json({
                    status : 1,
                    message : "berhasil",
                    error : err 
            })
            } else {
                return res.status(200).json({
                    status :0,
                    message :"berhasil dihapus"
                })
            }
        }
    }else{
        return res.status(400).json({
            status :0,
            message :"data tidak di simpan"
        })
    }
});
    // try {
    //     const del = await database("*").from("menu").where('id_menu', req.params.id_menu);
    //     if (del){
    //          const del = await database("menu").where('id_menu', req.params.id_menu).delete(); 
    //         return res.status(200).json({
    //             status : 1,
    //             message : "berhasil", 
    //         })            
    //     } else {
    //         return res.status(400).json({
    //             status :0,
    //             message :"Gagal"
    //         });
    //     }        
    // } catch (error) {
    //     return res.status(500).json({
    //         status : 0,
    //         message : error.message
    //          }); 
    // }


module.exports = router;