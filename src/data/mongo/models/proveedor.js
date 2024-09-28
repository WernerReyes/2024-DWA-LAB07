import { model, Schema } from "mongoose";

const proveedorSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },

});

proveedorSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});


export const ProveedorModel = model("Proveedor", proveedorSchema);