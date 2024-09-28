const modalCliente =
    document.getElementById('modalCliente') &&
    new bootstrap.Modal(document.getElementById('modalCliente'))
    const modalInsumo =
    document.getElementById('modalInsumo') &&
    new bootstrap.Modal(document.getElementById('modalInsumo'))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

if (modalCliente) {
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode

        id_editar.value = fila.children[0].innerHTML.trim()
        nombre_editar.value = fila.children[1].innerHTML.trim()

        modalCliente.show()
    })
}


if (modalInsumo) {
    on(document, 'click', '.btnEditar', e => {
        const fila = e.target.parentNode.parentNode

        id_editar.value = fila.children[0].innerHTML.trim()
        nombre_editar.value = fila.children[1].innerHTML.trim()
        precio_editar.value = fila.children[2].innerHTML.trim()
        stock_editar.value = fila.children[3].innerHTML.trim()

        const select = document.querySelector('#proveedor_id_editar')
        const proveedor_id_editar = fila.children[5].children[1].dataset.proveid.trim()

        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.trim() === proveedor_id_editar) {
                select.selectedIndex = i;
                break;
            }
        }

        modalInsumo.show()
    })
}



