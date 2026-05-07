# API Catálogo de Productos

Este proyecto es una API RESTful para la gestión de productos y categorías, desarrollada con NestJS, Mongoose y MongoDB. Cumple con todos los requerimientos de la Fase 2 del examen básico.

## Requisitos Previos

- Node.js (v16 o superior)
- MongoDB corriendo localmente (o un clúster en MongoDB Atlas)

## Instalación

1. Clona este repositorio o descarga la carpeta del proyecto.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el comando para instalar las dependencias:

```bash
$ npm install
```

## Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz del proyecto. Hemos incluido un archivo `.env.example` de guía. Debes crear un nuevo archivo `.env` y asegurarte de tener la siguiente variable:

```env
MONGO_URI=mongodb://localhost:27017/catalogo-tienda
PORT=3000
```
(Cambia la URI en caso de que tu conexión a MongoDB requiera credenciales o esté en otro puerto).

## Ejecución de la aplicación

Una vez instaladas las dependencias y configurado el archivo `.env`, puedes levantar el servidor usando:

```bash
# modo desarrollo (recomendado para ver cambios en tiempo real)
$ npm run start:dev

# modo normal
$ npm run start

# modo producción
$ npm run build
$ npm run start:prod
```


## Estructura del Código

- **Categorías (`/src/categorias`)**: Esquema, DTOs, Controlador y Servicio para manejar la creación, consulta, actualización y eliminación. Bloquea la eliminación si la categoría tiene productos asignados.
- **Productos (`/src/productos`)**: Esquema, DTOs, Controlador y Servicio. Valida que las categorías existan al crear y actualizar. Incluye filtros opcionales en el listado para ver solo productos inactivos y poblar (populate) las referencias de categoría.
