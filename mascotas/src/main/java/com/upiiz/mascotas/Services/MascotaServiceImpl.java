package com.upiiz.mascotas.Services;

import com.upiiz.mascotas.Entities.MascotaEntity;
import com.upiiz.mascotas.Repositories.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaServiceImpl implements MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    @Override
    public List<MascotaEntity> listado() {
        return mascotaRepository.findAll();
    }

    @Override
    public Optional<MascotaEntity> mascotaPorId(Long id) {
        return mascotaRepository.findById(id);
    }

    @Override
    public MascotaEntity agregarMascota(MascotaEntity mascota) {
        return mascotaRepository.save(mascota);
    }

    @Override
    public MascotaEntity actualizarMascota(Long id, MascotaEntity mascota) {
        mascota.setId(id);
        return mascotaRepository.save(mascota);
    }

    @Override
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}
