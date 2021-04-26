console.log("COMANDOS INICIADOS");
const vehicleModel = require("../models/vehicles.model");
let vehicles = [];

mp.events.add('playerJoin', async player => {
    console.log("PLAYER ID: ", player.id);
    mp.players.broadcast(`${player.name} se ha conectado al servidor.`)
    player.model = mp.joaat('player_zero');
    player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
    vehicles = await vehicleModel.find({});
    console.log("VEHICLES", vehicles);
});

mp.events.add("playerChat", (player, message) => {
    console.log("MENSAJE: ", message);
    if (message.length > 0 && message != "" && message != " " && message != "  "
        && message != "   " && message.length <= 60 && message != "    ") {
        mp.players.broadcast(`${player.name}  ${message}`)
    }
});

mp.events.addCommand('hp', (player) => {
    player.health = 100;
});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;
});

mp.events.addCommand('kill', (player) => {
    player.health = 0;
});

mp.events.addCommand('pos', (player) => {
    console.log(player) // return e.g. {x: 1337, y: 228, z: 70}
    console.log(player.position)
    player.position = new mp.Vector3(0.0, 0.0, 72.0);
});

mp.events.addCommand('coche', async (player, veh) => {
    let newVehicle = mp.vehicles.new(mp.joaat("turismor"), player.position, { engine: false, color: [[0, 155, 0], [0, 123, 0]], dimension: 0 });

    player.putIntoVehicle(newVehicle, 0);
    await vehicleModel.create({ vehicleId: newVehicle.id });
    // arrayVehiculos.push({ vehId: newVehicle.id, user: player.name });
    mp.players.broadcast(`[INFO]: Vehículo spawneado por ${player.name} y el id es : ${newVehicle.id}`);
});

mp.events.addCommand('remover', (player, id) => {


    mp.vehicles.forEach((vehicles) => {

        if (vehicles.id == id) {
            console.log(vehicles.id);
            vehicles.destroy();
        }

    })

});

mp.events.add('playerDeath', (player) => {
    console.log("player deatttthhhhh", player.id);
    setTimeout(() => {
        player.position = new mp.Vector3(0.0, 0.0, 72.0);
    }, 5000);

    //Hide chat when player dies
    // mp.gui.chat.show(false);
});

mp.events.addCommand("spawn", (player, vehId) => {
    console.log("ID", vehId);
    const vehicle = mp.vehicles.at(vehId);
    console.log("SPAWN", vehicle);
    if (vehicle) {
        vehicle.spawn(player.position, player.heading);
    } else {
        player.outputChatBox('Vehicles does not exist!');
    }
});

mp.events.add('playerStartEnterVehicle', (player, vehicle, seat) => {

    const playerName = player.name;
    const vehicleID = vehicle.id;

    console.log(player);
    console.log("VEHICULOOOOOOOOOOOO", vehicle);
    console.log("¿ EN QUÉ ASIENTO SE MONTÓ?", seat);

    mp.players.broadcast(`${playerName} started to get into the car ID: ${vehicleID}. Seat: ${seat}`);
    // if (!vehicle.getIsEngineRunning()) {
    //     vehicle.setEngineOn(false, false, true); // Turns Engine off once enter the vehicle to prevent player from toggling the engine manually
    // }
});
