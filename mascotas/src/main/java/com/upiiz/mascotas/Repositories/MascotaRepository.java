package com.upiiz.mascotas.Repositories;

import com.upiiz.mascotas.Entities.MascotaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MascotaRepository extends JpaRepository<MascotaEntity, Long> {
}
