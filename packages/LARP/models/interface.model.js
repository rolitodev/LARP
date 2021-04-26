"use strict";
const mongoose = require("mongoose");
const MakeError = require("../utils/make.error.js");
class InterfaceSchema {
    constructor() {
        this.schema = undefined;
        this.comoonPipeline = undefined;
        this.fields = undefined;
    }

    async create(data) {
        try {
            const object = await this.schema(data);
            const create = await object.save();
            return { status: 200, data: create };
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async update(_id, data) {
        try {
            const update = await this.schema.findByIdAndUpdate(_id, data);
            return { status: 200, data: update };
        } catch (error) {
            const errors = await MakeError(error);
            return errors;
        }
    }

    async updateArray(_id, data, options) {
        try {
            const update = await this.schema.findByIdAndUpdate(_id, data, options);
            return { status: 200, data: update };
        } catch (error) {
            const errors = await MakeError(error);
            return errors;
        }
    }

    async delete(query) {
        try {
            const deleteObject = await this.schema.findByIdAndDelete(query);
            return { status: 200, data: deleteObject };
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async deleteArray(query, options) {
        try {
            const deleteObject = await this.schema.findByIdAndDelete(query, options);
            return { status: 200, data: deleteObject };
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async find(query) {
        try {
            if (Object.keys(query).length > 0) {
                const data = await this.validateObjectId(query);
                const objects = await this.schema.aggregate([
                    ...this.comoonPipeline,
                    {
                        $match: data,
                    }
                ]);
                return { status: 200, data: objects };
            } else {
                const objects = await this.schema.aggregate([...this.comoonPipeline]);
                return { status: 200, data: objects };
            }
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async findByOne(query) {
        try {
            const data = await this.validateObjectId(query);
            const object = await this.schema.aggregate([
                ...this.comoonPipeline,
                {
                    $match: data,
                },
            ]);
            if (object.length > 0) {
                return { status: 200, data: object[0] };
            } else {
                return { status: 200, data: null };
            }
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async personalitationAggregation(personalitationPipeline) {
        try {
            const data = await this.schema.aggregate([
                ...this.comoonPipeline,
                ...personalitationPipeline,
            ]);
            return { status: 200, data }
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }

    async validateObjectId(query) {
        try {
            for (const element of Object.keys(this.fields)) {
                if (
                    Object.keys(query).includes(element) &&
                    this.fields[element].instance.toString() === "ObjectID"
                ) {
                    query[element] = new mongoose.mongo.ObjectID(query[element]);
                }
            }
            return query;
        } catch (error) {
            const errors = await MakeError(error.errors);
            return errors;
        }
    }
}

module.exports = InterfaceSchema;