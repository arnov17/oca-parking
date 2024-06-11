const ParkingService = require("../services/parking");
const Responses = require("../utils/response");

class CalculatorController {
  async enterParking(req, res) {
    const result = await ParkingService.enter(req.body);
    const {
      status, code, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(code || 500).json(Responses.errorResponse(message));
    }
  }

  async exitParking(req, res) {
    const result = await ParkingService.exit(req.params.id);
    const {
      status, code, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(code || 500).json(Responses.errorResponse(message));
    }
  }

  async reportType(req, res) {
    const result = await ParkingService.reportType(req.body);
    const {
      status, code, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(code || 500).json(Responses.errorResponse(message));
    }
  }

  async reportColor(req, res) {
    const result = await ParkingService.reportColor(req.body);
    const {
      status, code, message, data
    } = result;
    if (status) {
      res.status(200).json(Responses.successResponse(message, data));
    } else {
      res.status(code || 500).json(Responses.errorResponse(message));
    }
  }
}

module.exports = new CalculatorController();