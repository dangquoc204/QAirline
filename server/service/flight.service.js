const { Flight, Airplane } =  require('../models/index.model');

const calculateFlightDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    let durationMinutes = Math.floor((arrival - departure) / (1000 * 60));
    if (durationMinutes < 0) durationMinutes = 0;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}h${minutes}m`;
};

exports.getAllFlights = async () => {
    try {
        const flights = await Flight.findAll({
            include:[
                {
                    model: Airplane,
                    attributes: ['model', 'manufacturer']
                },
            ],
            attributes: [
                "id",
                "flight_number",
                "origin",
                "destination",
                "departure_time",
                "arrival_time",
                "duration",
                "status",
             ]
        });
        return flights;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách chuyến bay:", error);
        throw error;
    }
}

exports.addFlight = async (
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    status,
    airplaneModel,
) => {
   try { 
        const airplane = await Airplane.findOne({
            where: { model: airplaneModel },
        });
        if (!airplane) {
            throw new Error("Máy bay không tồn tại");
        }
        
        const duration = calculateFlightDuration(departureTime, arrivalTime);
        const flight = await Flight.create({
            flight_number: flightNumber,
            origin,
            destination,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            duration,
            status,
            airplane_id: airplane.id
        })
        return flight;
   } catch (error) {
        console.error("Lỗi khi tạo chuyến bay:", error);
        throw error;
    }
}

exports.editFlight = async (
    flightId,
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
    status,
    airplaneModel
) => {
    try {
        const flight = await Flight.findByPk(flightId);
        
        if (!flight) {
            throw new Error("Chuyến bay không tồn tại");
        }

        const duration = calculateFlightDuration(departureTime, arrivalTime);
        flight.flight_number = flightNumber;
        flight.origin = origin;
        flight.destination = destination;
        flight.departure_time = departureTime;
        flight.arrival_time = arrivalTime;
        flight.duration = duration;
        flight.status = status;
        
        const airplane = await Airplane.findOne({
            where: { model: airplaneModel },
        });
        if (!airplane) {
            throw new Error("Máy bay không tồn tại");
        } else {
            flight.airplane_id = airplane.id;
        }
        await flight.save();
        const newFlight = await Flight.findByPk(flightId, {
            include: {
                model: Airplane,
                attributes: ["model"] 
            },
        })
        return newFlight;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa chuyến bay:", error);
        throw error;
    }
}

exports.deleteFlight = async (id) => {
    const flight = await Flight.findByPk(id);
    if (!flight) {
        throw new Error("Chuyến bay không tồn tại");
    }
    await flight.destroy();
}

