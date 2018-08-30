import express from 'express';
import * as db from '../lib/db';

const router = express.Router();

router.get('/', async(req, res) => {
    const getStatus = await db.testConnect();
    console.log(getStatus);
    res.send({message: `Hey i\'m faisal arkan, if you see this, everything works fine. ᕦ(ò_óˇ)ᕤ`, database: getStatus});
});

router.get('/alik',async(req, res) => {
    const row = await db.query('select * from daftarnama'); //utk input query manual
    res.send( row);
});

router.get('/showData', async(req,res) => { //utk menampilkan data saja dg request dan response
    const result = await db.query('select * from daftarnama');// perintah querynya untk mencari tabel dari tabel nana
    res.send(result); // response untuk mengesend result
});

router.get('/detailnama1/:id',async(req,res) => {
    const rows = await db.query('SELECT Nama FROM daftarnama WHERE Nama= '+  req.params.id);
    res.send(rows);
});

router.get('/detailNama/:nama',async(req,res) => {
    const nama = req.params.nama;
    const rows = await db.query(`SELECT Nama FROM daftarnama WHERE Nama = ${nama}`);
    res.send(rows);
});

router.get('/detailnama1/:id',async(req,res) => {
    const id = req.params.id;
    const rows = await db.query(`SELECT * FROM daftarnama where like '{id}%' `);
    res.send(rows);
});

router.get('/showData/:id', async(req,res) => { //utk menampilkan data saja dg request dan response
    const result = await db.query('select * from daftarnama where Id=' + req.params.id);// perintah querynya untk mencari tabel dari tabel nana
    res.send(result); // response untuk mengesend result
});

router.get('/detailnama3/:id', async(req, res) => {
    const id = req.params.id; //manggil no (no itu param) bentuknya slash / '%${query}%'
    const result = await db.query(`select Nama from daftarnama where Id=${id}`); 
    // isi dr petikan isi query spy bisa masukin variabel
    res.send(result);
})

router.post('/createData', async(req, res) => {
    const { id, Nama, Nama_Keuangan, Nama_Penjadwalan, Nama_BAU, Gelar, NIK, Id_Rekening, Nama_Keu} = req.body;//input dr browser
    const tableName = 'daftarnama';
    const tableValue = {
        ID : id,
        Nama : Nama,
        Nama_Keuangan : Nama_Keuangan,
        Nama_Penjadwalan : Nama_Penjadwalan,
        Nama_BAU : Nama_BAU,
        Gelar : Gelar,
        NIK : NIK,
        Id_Rekening : Id_Rekening,
        Nama_Keu : Nama_Keu
    }
    const result = await db.insertRow(tableName, tableValue, res);
    res.sendStatus(200);
});


router.post('/updateData/:id', async(req, res) => {
    const {nama, nama_keuangan, nama_penjadwalan, nama_bau, gelar, nik, id_rekening, nama_keu} = req.body;
    const id = req.params.id;
    const tableName = 'daftarnama';
    const condition = { //utk kayak where kyk kondisi
        Id:id
    }
    const tableValue = {
        Nama : nama,
        Nama_Keuangan : nama_keuangan,
        Nama_Penjadwalan : nama_penjadwalan,
        Nama_BAU : nama_bau,
        Gelar : gelar,
        NIK : nik,
        Id_Rekening :id_rekening,
        Nama_Keu : nama_keu
    }
    const result = await db.updateRow(tableName, tableValue, condition, res); 
    res.sendStatus(200);
})


export default router;
