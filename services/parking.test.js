const request = require('supertest');
const app = require('../app'); // Assuming your app is exported from app.js
const moment = require('moment');

describe('ParkingService', () => {
  // Test for enter method
  describe('POST /enter', () => {
    it('should enter a vehicle into the parking lot', async () => {
      const payload = {
        plat_nomor: 'B1234ZA',
        warna: 'HITAM',
        tipe: 'SUV',
      };
      const response = await request(app)
        .post('/enter')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Succesfully enter parking');
      expect(response.body.data.plat_nomor).toBe(payload.plat_nomor);
      expect(response.body.data.warna).toBe(payload.warna);
      expect(response.body.data.tipe).toBe(payload.tipe);
    });
  });

  // Test for exit method
  describe('PUT /exit', () => {
    it('should exit a vehicle from the parking lot', async () => {
      const id = '1';
      const data = {
        plat_nomor: 'B1234ZA',
        tipe: 'SUV',
        waktu_masuk: moment().format('YYYY-MM-DD HH:mm:ss'),
        waktu_keluar: moment().format('YYYY-MM-DD HH:mm:ss'),
        durasi_parkir: "02:55:21",
        biaya_parkir: 2500,
      }

      const response = await request(app)
        .put(`/exit/${id}`)
        .send({ id })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Succesfully exit parking');
      expect(response.body.data).toHaveProperty('plat_nomor');
      expect(response.body.data).toHaveProperty('tipe');
      expect(response.body.data).toHaveProperty('waktu_masuk');
      expect(response.body.data).toHaveProperty('waktu_keluar');
      expect(response.body.data).toHaveProperty('biaya_parkir');
      expect(typeof response.body.data.biaya_parkir).toBe('number');
      expect(typeof response.body.data.durasi_parkir).toBe('string');
    });
  });

  // Test for reportType method
  describe('GET /report/type', () => {
    it('should get a report by vehicle type', async () => {
      const payload = {
        tipe: 'SUV',
      };
      const response = await request(app)
        .get('/report/type')
        .query(payload)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Succesfully get report by type');
      expect(response.body.data).toHaveProperty('jumlah_kendaraan');
      expect(typeof response.body.data.jumlah_kendaraan).toBe('number');
    });
  });

  // Test for reportColor method
  describe('GET /report/color', () => {
    it('should get a report by vehicle color', async () => {
      const payload = {
        warna: 'blue',
      };
      const response = await request(app)
        .get('/report/color')
        .query(payload)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Succesfully get report by color');
      expect(response.body.data).toHaveProperty('plat_nomor');
      expect(Array.isArray(response.body.data.plat_nomor)).toBe(true);
      // Add more assertions as needed
    });
  });
});

// describe('test', () => {
//   it('test', async () => {
//     const res = await request(app)
//       .get('/')
//       .send({
//         userId: 1,
//         title: 'test is cool',
//       })
//     expect(res.statusCode).toEqual(200)
//   })
// })
