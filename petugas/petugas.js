const express =require('express');
const router = express.Router();
const database = require('../config/database');
const bcrypt = require('bcrypt');

router.get('/all',async(req,res)=> {
    try {
        const result = await database.select("*").from("petugas");
        if (result.length > 0 ) {
            return res.status(200).json({
                status : 1,
                message : "berhasil",
                result : result,
            })
        } else {
            return res.status(400).json({
                status :0,
                message :"data tidak ditemukan"
            })
        }
    } catch (error) {
        return res.status(500).json({
        status : 0,
        message : error.message
         });
    }
});

router.post('/tambah',async(req,res)=>{
    const data = req.body;
    try {
        const result = await database ("petugas").where('nama_petugas', data.nama_petugas).first();
        if (result) {
            return res.status(400).json({
                status :0,
                message :"nama petugas sudah ada"
            })
        } else {
            const create = {
                nama_petugas : req.body.nama_petugas,
                alamat : req.body.alamat,
                no_hp : req.body.no_hp,
                email : req.body.email,
                password : bcrypt.hashSync(data.password,14),
                posisi_petugas : req.body.posisi_petugas,
                status : "Aktif", 
            }
            const simpan = await database("petugas").insert(create);
            return res.status(200).json({
                status : 1,
                message : "berhasil",
                result : {
                    id_petugas : simpan[0],
                    ...create
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            status : 0,
            message : error.message
             });
    }
});

// edit data dan edit password
router.put('/edit/:id_petugas', async(req,res)=>{

    try {
        const result = await database("petugas").where('id_petugas', req.params.id_petugas).first();
        if (result) {
            const oldPassword = req.body.password_lama
            // Cek inputan password lama di form apakah sama dengan password lama di database
            // oldPassword = password di form, 
            // result.password = password di database
            if (bcrypt.compareSync(oldPassword, result.password)) {
                if (req.body.password_1 == req.body.password_2) {
                    const newPassword = bcrypt.hashSync(req.body.password_1,14)
                    await database("petugas").update('password',newPassword).where('id_petugas',req.params.id_petugas);
                    return res.status(200).json({
                        status : 1,
                        message : "berhasil edit",
                    })
                } else {
                    return res.status(400).json({
                        status :0,
                        message :"Password baru dan konfirmasi password baru harus sama!"
                    })
                }    
            } else {
                return res.status(400).json({
                    status :0,
                    message :"Password lama yang anda masukkan tidak sesuai, silahkkan masukkan password yang benar!"
                })    
            }
        } else {
            return res.status(400).json({
                status :0,
                message :"data tidak ditemukan"
            })
        }  
    } catch (error) {
        return res.status(500).json({
        status : 0,
        message : error.message
         });
    }
});

router.delete('/hapus/:id_petugas',async(req,res)=> {
    try {
        const del = await database("*").from("petugas").where('id_petugas', req.params.id_petugas).first();
        if (del){
             const del = await database("petugas").where('id_petugas', req.params.id_petugas).delete(); 
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
