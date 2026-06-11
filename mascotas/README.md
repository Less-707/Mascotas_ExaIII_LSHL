# 🐾 CRUD de Mascotas - Spring Boot + AJAX

Aplicación web para el mantenimiento de mascotas usando Spring Boot, Thymeleaf, AJAX (jQuery), DataTables y la plantilla adminHMD.

## Funcionalidades

- ✅ Listar mascotas con DataTable (búsqueda, paginación, exportar CSV/Excel)
- ✅ Agregar mascota (modal AJAX)
- ✅ Actualizar mascota (modal AJAX)
- ✅ Eliminar mascota (modal de confirmación AJAX)

## Campos de Mascota

| Campo         | Tipo   | Descripción                        |
|---------------|--------|------------------------------------|
| nombre        | String | Nombre de la mascota (obligatorio) |
| edad          | int    | Edad en años (obligatorio)         |
| raza          | String | Raza (selección de lista)          |
| observaciones | String | Notas sobre cuidados, etc.         |

---

## 🚀 Cómo subir a GitHub

```bash
cd mascotas
git init
git add .
git commit -m "CRUD Mascotas con AJAX y adminHMD"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mascotas-crud.git
git push -u origin main
```

---

## ☁️ Cómo desplegar en Render

### 1. Crear base de datos MySQL en Render
- Ir a **Render Dashboard → New → MySQL**
- Anotar los valores de: `Hostname`, `Port`, `Database`, `Username`, `Password`

### 2. Crear Web Service en Render
- **New → Web Service**
- Conectar tu repositorio de GitHub
- Configurar:
  - **Runtime:** Docker
  - **Build Command:** (automático con Dockerfile)

### 3. Variables de entorno en Render
Agregar estas variables en **Environment**:

| Variable    | Valor                                                     |
|-------------|-----------------------------------------------------------|
| `DB_URL`    | `jdbc:mysql://HOSTNAME:3306/DATABASE?useSSL=false&serverTimezone=UTC` |
| `DB_USER`   | Usuario de la BD                                          |
| `DB_PASSWORD` | Contraseña de la BD                                     |

### 4. Deploy
Render construirá y desplegará automáticamente con el Dockerfile.

---

## 🛠️ Ejecución local

1. Tener MySQL corriendo localmente
2. Crear la base de datos: `CREATE DATABASE mascotas_db;`
3. Editar `application.properties`, comentar las líneas de producción y descomentar las locales
4. Ejecutar:

```bash
./mvnw spring-boot:run
```

5. Abrir `http://localhost:8080/mascotas`

---

## Estructura del proyecto

```
mascotas/
├── src/main/java/com/upiiz/mascotas/
│   ├── MascotasApplication.java
│   ├── Controllers/MascotaController.java
│   ├── Entities/MascotaEntity.java
│   ├── Repositories/MascotaRepository.java
│   └── Services/
│       ├── MascotaService.java
│       └── MascotaServiceImpl.java
├── src/main/resources/
│   ├── templates/mascotas.html
│   ├── static/assets/
│   │   ├── css/  (bootstrap + adminHMD)
│   │   ├── js/   (bootstrap + crud-mascotas-ajax.js)
│   │   └── vendors/bootstrap-icons/
│   └── application.properties
├── Dockerfile
└── pom.xml
```
