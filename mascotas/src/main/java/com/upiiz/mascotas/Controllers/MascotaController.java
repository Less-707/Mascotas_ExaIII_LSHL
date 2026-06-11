package com.upiiz.mascotas.Controllers;

import com.upiiz.mascotas.Entities.MascotaEntity;
import com.upiiz.mascotas.Services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class MascotaController {

    @Autowired
    private MascotaService mascotaService;

    // Vista principal
    @GetMapping("/")
    public String index() {
        return "redirect:/mascotas";
    }

    @GetMapping("/mascotas")
    public String mascotas() {
        return "mascotas";
    }

    // ---- API AJAX ----

    // R - Listar todas las mascotas
    @GetMapping("/mascotas/api/mascotas")
    @ResponseBody
    public ResponseEntity<List<MascotaEntity>> listadoMascotasAJAX() {
        return ResponseEntity.ok(mascotaService.listado());
    }

    // R - Obtener una mascota por ID
    @GetMapping("/mascotas/api/mascotas/{id}")
    @ResponseBody
    public ResponseEntity<Optional<MascotaEntity>> mascotaPorIdAJAX(@PathVariable Long id) {
        return ResponseEntity.ok(mascotaService.mascotaPorId(id));
    }

    // C - Crear mascota
    @PostMapping("/mascotas/api/mascotas")
    @ResponseBody
    public ResponseEntity<MascotaEntity> crearMascotaAJAX(@RequestBody MascotaEntity mascota) {
        return ResponseEntity.ok(mascotaService.agregarMascota(mascota));
    }

    // U - Actualizar mascota
    @PatchMapping("/mascotas/api/mascotas/{id}")
    @ResponseBody
    public ResponseEntity<MascotaEntity> actualizarMascotaAJAX(@PathVariable Long id,
                                                                 @RequestBody MascotaEntity mascota) {
        return ResponseEntity.ok(mascotaService.actualizarMascota(id, mascota));
    }

    // D - Eliminar mascota
    @DeleteMapping("/mascotas/api/mascotas/{id}")
    @ResponseBody
    public ResponseEntity<Void> eliminarMascotaAJAX(@PathVariable Long id) {
        mascotaService.eliminarMascota(id);
        return ResponseEntity.ok().build();
    }
}
