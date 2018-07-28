import express from 'express';
import * as db from '../lib/db';

const router = express.Router();

router.get('/', async(req, res) => {
    const getStatus = await db.testConnect();
    console.log(getStatus);
    res.send({message: `Hey i\'m faisal arkan, if you see this, everything works fine. ᕦ(ò_óˇ)ᕤ`, database: getStatus});
});

router.get('/alik',async(req, res) => {
    const row = await db.query('select * from user'); //utk input query manual
    res.send( row);
});

router.post('/createUser', async(req, res) => {
    const {id, nama, nama_keuangan, nama_penjadwalan, nama_bau, gelar, nik, rekening_bank, nama_rek_dki} = req.body;//input dr browser
    const tableName = 'daftarnama';
    const tableValue = {
        ID : id,
        Nama : nama,
        Nama_Keuangan : nama_keuangan,
        Nama_Penjadwalan : nama_penjadwalan,
        Nama_BAU : nama_bau,
        Gelar : gelar,
        NIK : nik,
        Rekening_Bank : rekening_bank,
        Nama_Rek_DKI : nama_rek_dki
    }
    const result = await db.insertRow(tableName, tableValue, res);
    res.sendStatus(200);
});

router.get('/showdata', async(req,res) => { //utk menampilkan data saja dg request dan response
    const result = await db.query('select * from daftarnama');// perintah querynya untk mencari tabel dari tabel nana
    res.send(result); // response untuk mengesend result
});


router.post('/updateUser/:no', async(req, res) => {
    const {nama,rekening} = req.body;
    const no = req.params.no;
    const tableName = 'user';
    const condition = { //utk kayak where kyk kondisi
        no:no
    }
    const tableValue = {
        nama: nama, 
        rekening: rekening
    }
    const result = await db.updateRow(tableName, tableValue, condition, res); 
    res.sendStatus(200);
})

router.get('/detailnama/:no', async(req, res) => {
    const no = req.params.no; //manggil no (no itu param) bentuknya slash /
    const result = await db.query(`select Nama,Rekening from nama where Id=${no}`); 
    // isi dr petikan isi query spy bisa masukin variabel
    res.send(result);
})

export default router;
