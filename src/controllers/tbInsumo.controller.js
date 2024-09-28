import { ProveedorModel, TbInsumoModel } from '../data/index.js';

export class TbInsumoController {

    constructor() {
        this.proveedores = [];
        this.tbInsumos = [];
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

    messagePerTypeSuccess = (type) => {
        switch (type) {
            case 'edit':
                return 'Insumo actualizado exitosamente';
            case 'add':
                return 'Insumo creado exitosamente';
            case 'delete':
                return 'Insumo eliminado exitosamente';
            default:
                return null;
        }
    }


    response = (res, type = null, message = null) => {
        return res.render('tbInsumo', {
            type, message, insumos: this.tbInsumos
            , proveedores: this.proveedores
        });

    }

    get = async (req, res) => {
        [this.tbInsumos,
        this.proveedores
        ] = await Promise.all([TbInsumoModel.find()
            .populate('proveedor')
            ,
        ProveedorModel.find()
        ]);
        const message = this.messagePerTypeSuccess(req.query.success);
        return this.response(
            res,
            message && 'success',
            message
        )

    }

    post = async (req, res) => {
        const { nombre, stock, precio, proveedor_id } = req.body;
        if ([nombre, stock, precio, proveedor_id].some(e => !e)) {
            return this.response(res, 'danger', 'Todos los campos son requeridos');
        }

        const tbInsumo = TbInsumoModel.create({ nombre, stock, precio, proveedor: proveedor_id });
        if (!tbInsumo) {
            return this.response(res, 'danger', 'Error al crear el insumo');
        }
        return res.redirect('/insumos?success=add');
    }


    put = async (req, res) => {
        const { nombre_editar: nombre, id_editar: id, stock_editar: stock, precio_editar: precio,
            proveedor_id_editar: proveedor_id
        } = req.body;
        console.log(req.body);
        if ([nombre, stock, precio, id, proveedor_id].some(e => !e)) {
            return this.response(res, 'danger', 'Todos los campos son requeridos');
        }

        const tbInsumo = await TbInsumoModel.findByIdAndUpdate(id, {
            nombre, stock, precio,
            proveedor: proveedor_id
        });
        if (!tbInsumo) {
            return this.response(res, 'danger', 'Error al actualizar el insumo');
        }
        return res.redirect('/insumos?success=edit');
    }

    delete = async (req, res) => {
        const id = req.params.id;
        const tbInsumo = await TbInsumoModel.findByIdAndDelete(id);
        if (!tbInsumo) {
            return this.response(res, 'danger', 'Error al eliminar el insumo');
        }
        return res.redirect('/insumos?success=delete');
    }

}