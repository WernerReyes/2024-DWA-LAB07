import { Schema, model } from "mongoose";

export const tbInsumo = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: "Proveedor",
        required: true,
    },
});

tbInsumo.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

export const TbInsumoModel = model("tbInsumo", tbInsumo);