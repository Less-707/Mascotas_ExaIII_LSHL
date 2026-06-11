package com.upiiz.mascotas.Services;

import com.upiiz.mascotas.Entities.MascotaEntity;

import java.util.List;
import java.util.Optional;

public interface MascotaService {
    List<MascotaEntity> listado();
    Optional<MascotaEntity> mascotaPorId(Long id);
    MascotaEntity agregarMascota(MascotaEntity mascota);
    MascotaEntity actualizarMascota(Long id, MascotaEntity mascota);
    void eliminarMascota(Long id);
}
