# Next.js Docker Project

Este es un proyecto de **Next.js** configurado para ser ejecutado dentro de un
contenedor Docker utilizando **Docker Compose**.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Docker**:
  [Instrucciones de instalación](https://docs.docker.com/get-docker/)
- **Docker Compose**: (Generalmente incluido con Docker Desktop).

Si ya tienes **Docker Desktop** instalado, no necesitarás una instalación
adicional de Docker Compose.

## Pasos para levantar el proyecto

Sigue estos pasos para ejecutar el proyecto con Docker Compose:

### 1. Clonar el repositorio

Si no lo has hecho aún, clona el proyecto en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Construir la imagen y levantar el contenedor

Desde la raíz del proyecto, donde se encuentra el archivo docker-compose.yml,
ejecuta el siguiente comando:

```bash
docker-compose up --build
```

Este comando hará lo siguiente:

- Construirá la imagen de Docker para el proyecto.

- Levantará un contenedor con la aplicación de Next.js.

- Expondrá el puerto 3000 de la aplicación en el contenedor para que puedas
  acceder a ella desde tu navegador.
