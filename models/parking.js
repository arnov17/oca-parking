const parkir = [
  {
    id: 1,
    parking_lot : "A1",
    status : true,
  },
  {
    id: 2,
    parking_lot : "A2",
    status : false,
  },
  {
    id: 3,
    parking_lot : "A3",
    status : true,
  },
  {
    id: 4,
    parking_lot : "A4",
    status : true,
  },
  {
    id: 5,
    parking_lot : "A5",
    status : true,
  },
  {
    id: 6,
    parking_lot : "B1",
    status : true,
  },
  {
    id: 7,
    parking_lot : "B2",
    status : false,
  },
  {
    id: 8,
    parking_lot : "B3",
    status : true,
  },
  {
    id: 9,
    parking_lot : "B4",
    status : true,
  },
  {
    id: 10,
    parking_lot : "B5",
    status : true,
  }
];

const ticket = [
  {
    id : 1,
    plat_nomor : "B1234AB",
    tipe : "SUV",
    warna : "HITAM",
    parking_lot : "A1",
    tanggal_masuk : "2024-06-10 17:31",
    tanggal_keluar : "2024-06-10 17:51",
    biaya: 2500
  },
  {
    id : 2,
    plat_nomor : "B987AB",
    tipe : "SUV",
    warna : "HITAM",
    parking_lot : "A2",
    tanggal_masuk : "2024-06-10 17:00",
    tanggal_keluar : null,
    biaya: null
  },
  {
    id : 3,
    plat_nomor : "B981AB",
    tipe : "MPV",
    warna : "HITAM",
    parking_lot : "A5",
    tanggal_masuk : "2024-06-11 07:30",
    tanggal_keluar : null,
    biaya: null
  },
  {
    id : 4,
    plat_nomor : "B982AB",
    tipe : "MPV",
    warna : "HITAM",
    parking_lot : "A5",
    tanggal_masuk : "2024-06-11 07:30",
    tanggal_keluar : null,
    biaya: null
  },
  {
    id : 5,
    plat_nomor : "B982AB",
    tipe : "SUV",
    warna : "PUTIH",
    parking_lot : "B3",
    tanggal_masuk : "2024-06-11 07:30",
    tanggal_keluar : null,
    biaya: null
  },
  {
    id : 6,
    plat_nomor : "B983AB",
    tipe : "SUV",
    warna : "PUTIH",
    parking_lot : "B4",
    tanggal_masuk : "2024-06-11 09:30",
    tanggal_keluar : null,
    biaya: null
  },
];

class ParkingModel {
  constructor() {
    this.parkir = parkir;
  }

  setParking() {
    return {
      create: (data) => {
        this.parkir.push(data);
      }
    };
  }

  parkingLots() {
    return parkir;
  }



  maxLoad() {
    return parkir.length;
  }

  tickets() {
    return ticket
  }
  
}

module.exports = ParkingModel;