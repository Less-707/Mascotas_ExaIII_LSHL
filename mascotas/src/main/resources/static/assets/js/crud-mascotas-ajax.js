// ==================== LISTAR ====================
function listar() {
    $.ajax({
        method: "GET",
        url: "/mascotas/api/mascotas",
        success: function (mascotas) {
            let tabla = $('#tablaMascotas').DataTable();
            tabla.clear().draw();

            mascotas.forEach(function (mascota) {
                let botones =
                    '<button class="btn btn-sm btn-primary me-1" onclick="identificaActualizar(' + mascota.id + ')">' +
                    '<i class="bi bi-pencil-square"></i></button>' +
                    '<button class="btn btn-sm btn-danger" onclick="identificaEliminar(' + mascota.id + ')">' +
                    '<i class="bi bi-trash3"></i></button>';

                let rowNode = tabla.row.add([
                    mascota.nombre,
                    mascota.edad,
                    botones
                ]).draw().node();
                $(rowNode).attr('id', 'renglon_' + mascota.id);
            });
        },
        error: function () {
            mostrarAlerta('Error al cargar las mascotas', 'danger');
        }
    });
}

// ==================== AGREGAR ====================
function guardar() {
    let nombre = document.getElementById('nombre-add').value.trim();
    let edad = document.getElementById('edad-add').value;
    let raza = document.getElementById('raza-add').value;
    let observaciones = document.getElementById('observaciones-add').value.trim();

    if (!nombre || !edad) {
        mostrarAlerta('Por favor completa los campos obligatorios (Nombre y Edad).', 'warning');
        return;
    }

    $.ajax({
        method: 'POST',
        url: '/mascotas/api/mascotas',
        contentType: 'application/json',
        data: JSON.stringify({
            nombre: nombre,
            edad: parseInt(edad),
            raza: raza,
            observaciones: observaciones
        }),
        success: function (mascota) {
            let botones =
                '<button class="btn btn-sm btn-primary me-1" onclick="identificaActualizar(' + mascota.id + ')">' +
                '<i class="bi bi-pencil-square"></i></button>' +
                '<button class="btn btn-sm btn-danger" onclick="identificaEliminar(' + mascota.id + ')">' +
                '<i class="bi bi-trash3"></i></button>';

            let tabla = $('#tablaMascotas').DataTable();
            let rowNode = tabla.row.add([
                mascota.nombre,
                mascota.edad,
                botones
            ]).draw().node();
            $(rowNode).attr('id', 'renglon_' + mascota.id);

            limpiarFormularioAdd();
            bootstrap.Modal.getInstance(document.getElementById('modal-add')).hide();
            mostrarAlerta('Mascota agregada correctamente.', 'success');
        },
        error: function () {
            mostrarAlerta('Error al guardar la mascota.', 'danger');
        }
    });
}

function limpiarFormularioAdd() {
    document.getElementById('nombre-add').value = '';
    document.getElementById('edad-add').value = '';
    document.getElementById('raza-add').value = 'Gran Perro';
    document.getElementById('observaciones-add').value = '';
}

// ==================== ACTUALIZAR ====================
function identificaActualizar(id) {
    $.ajax({
        method: 'GET',
        url: '/mascotas/api/mascotas/' + id,
        success: function (mascota) {
            document.getElementById('id-update').value = mascota.id;
            document.getElementById('nombre-update').value = mascota.nombre;
            document.getElementById('edad-update').value = mascota.edad;
            document.getElementById('raza-update').value = mascota.raza;
            document.getElementById('observaciones-update').value = mascota.observaciones || '';

            let modal = new bootstrap.Modal(document.getElementById('modal-update'));
            modal.show();
        },
        error: function () {
            mostrarAlerta('Error al obtener los datos de la mascota.', 'danger');
        }
    });
}

function actualizar() {
    let id = document.getElementById('id-update').value;
    let nombre = document.getElementById('nombre-update').value.trim();
    let edad = document.getElementById('edad-update').value;
    let raza = document.getElementById('raza-update').value;
    let observaciones = document.getElementById('observaciones-update').value.trim();

    if (!nombre || !edad) {
        mostrarAlerta('Por favor completa los campos obligatorios.', 'warning');
        return;
    }

    $.ajax({
        method: 'PATCH',
        contentType: 'application/json',
        url: '/mascotas/api/mascotas/' + id,
        data: JSON.stringify({
            nombre: nombre,
            edad: parseInt(edad),
            raza: raza,
            observaciones: observaciones
        }),
        success: function (mascota) {
            let tabla = $('#tablaMascotas').DataTable();
            let datos = tabla.row('#renglon_' + id).data();
            datos[0] = mascota.nombre;
            datos[1] = mascota.edad;
            tabla.row('#renglon_' + id).data(datos).draw();

            bootstrap.Modal.getInstance(document.getElementById('modal-update')).hide();
            mostrarAlerta('Mascota actualizada correctamente.', 'success');
        },
        error: function () {
            mostrarAlerta('Error al actualizar la mascota.', 'danger');
        }
    });
}

// ==================== ELIMINAR ====================
function identificaEliminar(id) {
    $.ajax({
        method: 'GET',
        url: '/mascotas/api/mascotas/' + id,
        success: function (mascota) {
            document.getElementById('id-delete').value = mascota.id;
            document.getElementById('nombre-delete-label').textContent = mascota.nombre;

            let modal = new bootstrap.Modal(document.getElementById('modal-delete'));
            modal.show();
        },
        error: function () {
            mostrarAlerta('Error al obtener los datos de la mascota.', 'danger');
        }
    });
}

function eliminar() {
    let id = document.getElementById('id-delete').value;
    $.ajax({
        method: 'DELETE',
        url: '/mascotas/api/mascotas/' + id,
        success: function () {
            let tabla = $('#tablaMascotas').DataTable();
            tabla.row('#renglon_' + id).remove().draw();

            bootstrap.Modal.getInstance(document.getElementById('modal-delete')).hide();
            mostrarAlerta('Mascota eliminada correctamente.', 'success');
        },
        error: function () {
            mostrarAlerta('Error al eliminar la mascota.', 'danger');
        }
    });
}

// ==================== UTILIDADES ====================
function mostrarAlerta(mensaje, tipo) {
    let alertDiv = document.getElementById('alerta-global');
    alertDiv.className = 'alert alert-' + tipo + ' alert-dismissible fade show';
    alertDiv.innerHTML = mensaje +
        '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
    alertDiv.style.display = 'block';
    setTimeout(function () {
        alertDiv.style.display = 'none';
    }, 3500);
}
