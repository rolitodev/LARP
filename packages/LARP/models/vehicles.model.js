'use strict'
const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const InterfaceModel = require('./interface.model')


//state = 1 : En vivo, 2: Archivado, 3: disponible para premium
const schema = new mongoose.Schema({

    vehicleId: {
        type: Types.String
    }

    // name: {
    //     type: Types.Mixed
    // },
    // state: {
    //     type: Types.Number
    // },
    // prices: [schemaPrice],
    // descriptions: {
    //     type: Types.Mixed
    // }
})

class VehicleSchema extends InterfaceModel {
    constructor() {
        super()
        this.schema = mongoose.model('Vehicle', schema)
        this.fields = schema.paths
        this.comoonPipeline = [
            {
                $project: {
                    _id: 1,
                   vehicleId: 1
                }
            }
        ]
    }
}

module.exports = new VehicleSchema()