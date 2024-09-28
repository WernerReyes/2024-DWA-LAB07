import { ProveedorModel } from '../data/index.js';

export class ProveedorController {
    constructor() {
        this.proveedores = [];
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

    messagePerTypeSuccess = (type) => {
        switch (type) {
            case 'edit':
                return 'Proveedor actualizado exitosamente';
            case 'add':
                return 'Proveedor creado exitosamente';
            case 'delete':
                return 'Proveedor eliminado exitosamente';
            default:
                return null;
        }
    }

    response = (res, type = null, message = null) => {
        return res.render('index', { type, message, proveedores: this.proveedores });
    }

    get = async (req, res) => {
        this.proveedores = await ProveedorModel.find();
        const message = this.messagePerTypeSuccess(req.query.success);
        return this.response(
            res,
            message && 'success',
            message
        )

    }

    post = async (req, res) => {
        const { nombre } = req.body;
        if (!nombre) {
            return this.response(res, 'danger', 'El nombre del proveedor es requerido');
        }

        const proveedor = ProveedorModel.create({ nombre });
        if (!proveedor) {
            return this.response(res, 'danger', 'Error al crear el proveedor');
        }
        return res.redirect('/proveedores?success=add');
    }


    put = async (req, res) => {
        const { nombre_editar: nombre, id_editar: id } = req.body;
        if (!nombre) {
            return this.response(res, 'danger', 'El nombre del proveedor es requerido');
        }

        const proveedor = await ProveedorModel.findByIdAndUpdate(id, { nombre });
        if (!proveedor) {
            return this.response(res, 'danger', 'Error al actualizar el proveedor');
        }
        return res.redirect('/proveedores?success=edit');
    }

    delete = async (req, res) => {
        const id = req.params.id;
        if (!id) {
            return this.response(res, 'danger', 'El id del proveedor es requerido');
        }

        const proveedor = await ProveedorModel.findByIdAndDelete(id);
        if (!proveedor) {
            return this.response(res, 'danger', 'Error al eliminar el proveedor');
        }
        return res.redirect('/proveedores?success=delete');
    }



}