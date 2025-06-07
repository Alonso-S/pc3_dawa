-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2025 a las 19:36:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `farmacia_pc3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleordenvta`
--

CREATE TABLE `DetalleOrdenVta` (
    `id` int(11) NOT NULL,
    `NroOrdenVta` int(11) DEFAULT NULL,
    `CodMedicamento` int(11) DEFAULT NULL,
    `descripcionMed` varchar(191) DEFAULT NULL,
    `cantidadRequerida` int(11) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalleordenvta`
--

INSERT INTO
    `DetalleOrdenVta` (
        `id`,
        `NroOrdenVta`,
        `CodMedicamento`,
        `descripcionMed`,
        `cantidadRequerida`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        14,
        4,
        4,
        'Paracetamol 500mg',
        3,
        '2025-06-07 05:39:40.628',
        '2025-06-07 17:16:01.522'
    ),
    (
        15,
        6,
        6,
        'Ibuprofeno 400mg',
        1,
        '2025-06-07 05:42:42.809',
        '2025-06-07 05:42:42.809'
    ),
    (
        16,
        5,
        7,
        'Loratadina 10mg',
        1,
        '2025-06-07 05:43:03.526',
        '2025-06-07 05:43:03.526'
    ),
    (
        17,
        5,
        8,
        'Fluoxetina 20mg',
        3,
        '2025-06-07 05:43:20.566',
        '2025-06-07 05:43:20.566'
    ),
    (
        18,
        5,
        9,
        'Paracetamol 500mg EDITADO',
        10,
        '2025-06-07 17:16:39.554',
        '2025-06-07 17:16:39.554'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `Especialidad` (
    `id` int(11) NOT NULL,
    `descripcionEsp` varchar(191) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO
    `Especialidad` (
        `id`,
        `descripcionEsp`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Cardiología',
        '2025-06-06 23:49:13.000',
        '2025-06-06 23:49:13.000'
    ),
    (
        2,
        'Dermatología',
        '2025-06-06 23:49:13.000',
        '2025-06-06 23:49:13.000'
    ),
    (
        3,
        'Gastroenterología',
        '2025-06-06 23:49:13.000',
        '2025-06-06 23:49:13.000'
    ),
    (
        4,
        'Neurología',
        '2025-06-06 23:49:13.000',
        '2025-06-06 23:49:13.000'
    ),
    (
        5,
        'Pediatría',
        '2025-06-06 23:49:13.000',
        '2025-06-06 23:49:13.000'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `Medicamento` (
    `id` int(11) NOT NULL,
    `descripcionMed` varchar(191) DEFAULT NULL,
    `fechaFabricacion` datetime(3) DEFAULT NULL,
    `fechaVencimiento` datetime(3) DEFAULT NULL,
    `Presentacion` varchar(191) DEFAULT NULL,
    `stock` int(11) DEFAULT NULL,
    `precioVentaUni` decimal(10, 2) DEFAULT NULL,
    `precioVentaPres` decimal(10, 2) DEFAULT NULL,
    `CodTipoMed` int(11) DEFAULT NULL,
    `Marca` varchar(191) DEFAULT NULL,
    `CodEspec` int(11) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO
    `Medicamento` (
        `id`,
        `descripcionMed`,
        `fechaFabricacion`,
        `fechaVencimiento`,
        `Presentacion`,
        `stock`,
        `precioVentaUni`,
        `precioVentaPres`,
        `CodTipoMed`,
        `Marca`,
        `CodEspec`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        4,
        'Paracetamol 500mg',
        '2025-01-01 00:00:00.000',
        '2026-01-01 00:00:00.000',
        'Tabletas',
        1000,
        0.50,
        15.00,
        1,
        'Genérico',
        5,
        '2025-06-06 23:49:24.000',
        '2025-06-06 23:49:24.000'
    ),
    (
        6,
        'Ibuprofeno 400mg',
        '2025-03-01 00:00:00.000',
        '2026-03-01 00:00:00.000',
        'Tabletas',
        800,
        0.80,
        24.00,
        3,
        'MediPharma',
        2,
        '2025-06-06 23:49:24.000',
        '2025-06-06 23:49:24.000'
    ),
    (
        7,
        'Loratadina 10mg',
        '2025-04-01 00:00:00.000',
        '2026-04-01 00:00:00.000',
        'Tabletas',
        600,
        0.90,
        27.00,
        4,
        'AllerFree',
        2,
        '2025-06-06 23:49:24.000',
        '2025-06-06 23:49:24.000'
    ),
    (
        8,
        'Fluoxetina 20mg',
        '2025-05-01 00:00:00.000',
        '2026-05-01 00:00:00.000',
        'Cápsulas',
        300,
        1.50,
        45.00,
        5,
        'MentalCare',
        4,
        '2025-06-06 23:49:24.000',
        '2025-06-06 23:49:24.000'
    ),
    (
        9,
        'Paracetamol 500mg EDITADO',
        '2025-06-06 00:00:00.000',
        '2026-06-06 00:00:00.000',
        'Tabletas',
        3,
        3.00,
        4.00,
        1,
        'Generica',
        1,
        '2025-06-07 04:53:21.845',
        '2025-06-07 17:14:39.511'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenventa`
--

CREATE TABLE `OrdenVenta` (
    `id` int(11) NOT NULL,
    `fechaEmision` datetime(3) DEFAULT NULL,
    `Motivo` varchar(191) DEFAULT NULL,
    `Situacion` varchar(191) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ordenventa`
--

INSERT INTO
    `OrdenVenta` (
        `id`,
        `fechaEmision`,
        `Motivo`,
        `Situacion`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        4,
        '2025-06-06 10:00:00.000',
        'Venta Regular',
        'Completada',
        '2025-06-05 23:49:32.000',
        '2025-06-06 23:49:32.000'
    ),
    (
        5,
        '2025-06-06 11:30:00.000',
        'Venta Regular',
        'Pendiente',
        '2025-06-05 23:49:32.000',
        '2025-06-06 23:49:32.000'
    ),
    (
        6,
        '2025-06-04 14:15:00.000',
        'Venta Regular',
        'Completada',
        '2025-06-05 23:49:32.000',
        '2025-06-06 23:49:32.000'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomedic`
--

CREATE TABLE `TipoMedic` (
    `id` int(11) NOT NULL,
    `descripcion` varchar(191) DEFAULT NULL,
    `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `updatedAt` datetime(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tipomedic`
--

INSERT INTO
    `TipoMedic` (
        `id`,
        `descripcion`,
        `createdAt`,
        `updatedAt`
    )
VALUES (
        1,
        'Analgésico',
        '2025-06-06 23:48:59.000',
        '2025-06-06 23:48:59.000'
    ),
    (
        2,
        'Antibiótico',
        '2025-06-06 23:48:59.000',
        '2025-06-06 23:48:59.000'
    ),
    (
        3,
        'Antiinflamatorio',
        '2025-06-06 23:48:59.000',
        '2025-06-06 23:48:59.000'
    ),
    (
        4,
        'Antialérgico',
        '2025-06-06 23:48:59.000',
        '2025-06-06 23:48:59.000'
    ),
    (
        5,
        'Antidepresivo',
        '2025-06-06 23:48:59.000',
        '2025-06-06 23:48:59.000'
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
    `id` varchar(36) NOT NULL,
    `checksum` varchar(64) NOT NULL,
    `finished_at` datetime(3) DEFAULT NULL,
    `migration_name` varchar(255) NOT NULL,
    `logs` text DEFAULT NULL,
    `rolled_back_at` datetime(3) DEFAULT NULL,
    `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
    `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO
    `_prisma_migrations` (
        `id`,
        `checksum`,
        `finished_at`,
        `migration_name`,
        `logs`,
        `rolled_back_at`,
        `started_at`,
        `applied_steps_count`
    )
VALUES (
        '6a4b448c-3438-4bc3-892a-d5defaf8b80f',
        '483ad75ecccf704bb1c477c7a011a52b758a4924e7f5523bcbe1c60648c8940e',
        '2025-06-07 03:41:20.463',
        '20250607034119_init',
        NULL,
        NULL,
        '2025-06-07 03:41:20.148',
        1
    );

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalleordenvta`
--
ALTER TABLE `DetalleOrdenVta`
ADD PRIMARY KEY (`id`),
ADD KEY `DetalleOrdenVta_NroOrdenVta_fkey` (`NroOrdenVta`),
ADD KEY `DetalleOrdenVta_CodMedicamento_fkey` (`CodMedicamento`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `Especialidad` ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `Medicamento`
ADD PRIMARY KEY (`id`),
ADD KEY `Medicamento_CodTipoMed_fkey` (`CodTipoMed`),
ADD KEY `Medicamento_CodEspec_fkey` (`CodEspec`);

--
-- Indices de la tabla `ordenventa`
--
ALTER TABLE `OrdenVenta` ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipomedic`
--
ALTER TABLE `TipoMedic` ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations` ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalleordenvta`
--
ALTER TABLE `DetalleOrdenVta`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 19;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `Especialidad`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 6;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `Medicamento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 11;

--
-- AUTO_INCREMENT de la tabla `ordenventa`
--
ALTER TABLE `OrdenVenta`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT de la tabla `tipomedic`
--
ALTER TABLE `TipoMedic`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalleordenvta`
--
ALTER TABLE `DetalleOrdenVta`
ADD CONSTRAINT `DetalleOrdenVta_CodMedicamento_fkey` FOREIGN KEY (`CodMedicamento`) REFERENCES `Medicamento` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `DetalleOrdenVta_NroOrdenVta_fkey` FOREIGN KEY (`NroOrdenVta`) REFERENCES `OrdenVenta` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicamento`
--
ALTER TABLE `Medicamento`
ADD CONSTRAINT `Medicamento_CodEspec_fkey` FOREIGN KEY (`CodEspec`) REFERENCES `Especialidad` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `Medicamento_CodTipoMed_fkey` FOREIGN KEY (`CodTipoMed`) REFERENCES `TipoMedic` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;