const moment = require('moment');
const ParkingModel  = require('../models/parking')

class ParkingService extends ParkingModel {
    
  // service to carry out the business logic
  async enter(payload) {
    try {
      const { plat_nomor, warna, tipe } = payload;
      const parkirLots = super.parkingLots();
      const availableParkingLots = parkirLots.filter(lot => lot.status);

      // Randomly select one parking lots from list
      const randomIndex = Math.floor(Math.random() * availableParkingLots.length);
      const randomParkingLot = availableParkingLots[randomIndex];
      const tanggal_masuk = moment().format('YYYY-MM-DD HH:mm:ss');
      let newTicket = { 
        id : super.parkingLots.length + 1,
        plat_nomor: plat_nomor, 
        warna,  
        tipe, 
        parking_lot : randomParkingLot.parking_lot, 
        tanggal_masuk: moment(), 
        is_parkir : true 
      };

      super.setParking().create(newTicket);

      return {
        status: true,
        message: "Succesfully enter parking",
        data: {
          plat_nomor: plat_nomor, 
          warna,  
          tipe, 
          tanggal_masuk: tanggal_masuk, 
          parking_lot : randomParkingLot.parking_lot, 
        },
      };

    } catch (error) {
      return {
        status: false,
        message: error.message,
        data: null,
      };
    }

  }

  async exit(id) {
    try {
      const ticket = super.tickets().find(t => t.id === parseInt(id));
      if (!ticket) {
        return {
          status: false,
          message: "Ticket is not found",
          data: null,
        };
      }

      // Find the parking lot and update availble status to true
      const parkingLots = super.parkingLots()
      const parkingLotToUpdate = parkingLots.find(slot => slot.parking_lot === ticket.parking_lot);
      if (!parkingLotToUpdate) {
        return {
          status: false,
          message: "parking lot is not found",
          data: null,
        };
      }

      parkingLotToUpdate.status = true;
  
      const waktuKeluar = moment();
      const waktuMasuk = moment(ticket.tanggal_masuk, 'YYYY-MM-DD HH:mm');
      const durasiParkir = waktuKeluar.diff(waktuMasuk, 'hours', true);
      const durasiParkirRoundedUp = Math.ceil(durasiParkir);

      const duration = moment.duration(waktuKeluar.diff(waktuMasuk));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      let biayaParkir = 0;
      if (ticket.tipe === 'SUV') {
          biayaParkir = 25000 + (durasiParkirRoundedUp - 1) * 5000;
      } else if (ticket.tipe === 'MPV') {
          biayaParkir = 35000 + (durasiParkirRoundedUp - 1) * 7000;
      }

      // update tiket
      ticket.biaya = biayaParkir;
      ticket.tanggal_keluar = waktuKeluar;

      const data = {
        plat_nomor: ticket.plat_nomor,
        tipe: ticket.tipe,
        waktu_masuk: waktuMasuk.format('YYYY-MM-DD HH:mm:ss'),
        waktu_keluar: waktuKeluar.format('YYYY-MM-DD HH:mm:ss'),
        durasi_parkir: `${formattedDuration}`,
        biaya_parkir: biayaParkir,
      }
      
      return {
        status: true,
        message: "Succesfully exit parking",
        data: data,
      };

    } catch (error) {
      return {
        status: false,
        message: error.message,
        data: null,
      };
    }
  
  }

  async reportType(payload) {
    try {
      const vehcile = [];
      const tickets = super.tickets();
      tickets.forEach((tiket) => {
        if (tiket.tipe === payload.tipe && tiket.tanggal_keluar === null) {
          vehcile.push(tiket)
        }
      });

      return {
        status: true,
        message: "Succesfully get report by type",
        data: {
          jumlah_kendaraan: vehcile.length
        },
      };

    } catch (error) {
      return {
        status: false,
        message: error.message,
        data: null,
      };
    }
  
  }

  async reportColor(payload) {
    try {
      const plat_nomor = [];
      const tickets = super.tickets();
      tickets.forEach((tiket) => {
        if (tiket.warna === payload.warna) {
          plat_nomor.push(tiket.plat_nomor)
        }
      });

      return {
        status: true,
        message: "Succesfully get report by color",
        data: {
          plat_nomor: plat_nomor
        },
      };

    } catch (error) {
      return {
        status: false,
        message: error.message,
        data: null,
      };
    }
  
  }


}

module.exports = new ParkingService();