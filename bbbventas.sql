-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bbbventas
CREATE DATABASE IF NOT EXISTS `bbbventas` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `bbbventas`;

-- Volcando estructura para tabla bbbventas.tb_categorias
CREATE TABLE IF NOT EXISTS `tb_categorias` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_categorias: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_categorias` DISABLE KEYS */;
INSERT INTO `tb_categorias` (`Id`, `nombre`, `descripcion`, `estado`) VALUES
	(1, 'Smartphones', 'Dispositivos móviles inteligentes', 'Activo'),
	(2, 'Computadoras', 'Equipos informáticos', 'Activo'),
	(3, 'Accesorios', 'Accesorios para dispositivos electrónicos', 'Activo'),
	(4, 'Electrodomésticos', 'Artículos para el hogar electrónicos', 'Activo'),
	(5, 'Gadgets', 'Dispositivos electrónicos innovadores', 'Activo'),
	(6, 'Audifonos', 'Dispositivos y gadgets de sonido', 'CREATED');
/*!40000 ALTER TABLE `tb_categorias` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_clientes
CREATE TABLE IF NOT EXISTS `tb_clientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `identificacion_id` int(11) DEFAULT NULL,
  `identificacion_nro` varchar(50) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbbventas.tb_clientes: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_clientes` DISABLE KEYS */;
INSERT INTO `tb_clientes` (`Id`, `identificacion_id`, `identificacion_nro`, `nombre`, `apellido`, `correo`, `direccion`, `estado`) VALUES
	(1, NULL, NULL, 'Juan', 'Pérez', 'juan@cliente.com', 'Calle 123', 'ACTIVO'),
	(2, NULL, NULL, 'Ana', 'Gómez', 'ana@cliente.com', 'Avenida XYZ', 'INACTIVO'),
	(3, NULL, NULL, 'Carlos', 'Rodríguez', 'carlos@cliente.com', 'Plaza Principal', 'ACTIVO'),
	(4, NULL, NULL, 'María', 'López', 'maria@cliente.com', 'Callejón ABC', 'INACTIVO'),
	(5, NULL, NULL, 'Pedro', 'Martínez', 'pedro@cliente.com', 'Bulevar 456', 'ACTIVO'),
	(9, NULL, NULL, 'Juansito', 'Perez', 'Juansito@cliente.com', 'Bulevar 456', 'CREATED');
/*!40000 ALTER TABLE `tb_clientes` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_detalle_ventas
CREATE TABLE IF NOT EXISTS `tb_detalle_ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ventaId` int(11) DEFAULT NULL,
  `productoId` int(11) DEFAULT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ventaId` (`ventaId`),
  KEY `productoId` (`productoId`),
  CONSTRAINT `tb_detalle_ventas_ibfk_1` FOREIGN KEY (`ventaId`) REFERENCES `tb_ventas` (`id`),
  CONSTRAINT `tb_detalle_ventas_ibfk_2` FOREIGN KEY (`productoId`) REFERENCES `tb_productos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_detalle_ventas: ~18 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_detalle_ventas` DISABLE KEYS */;
INSERT INTO `tb_detalle_ventas` (`id`, `ventaId`, `productoId`, `precio_unitario`, `cantidad`, `subtotal`) VALUES
	(1, 1, 1, 999.99, 2, 1999.98),
	(2, 2, 2, 1299.99, 1, 1299.99),
	(3, 3, 3, 49.99, 3, 149.97),
	(4, 4, 4, 599.99, 1, 599.99),
	(5, 5, 5, 1499.99, 2, 2999.98),
	(13, 15, 1, 3.00, 5, 15.00),
	(14, 16, 4, 599.99, 123, 73798.77),
	(15, 17, 1, 999.90, 10, 9999.00),
	(16, 18, 1, 999.90, 12, 11998.80),
	(17, 19, 4, 599.99, 5, 2999.95),
	(18, 20, 1, 999.90, 5, 4999.50),
	(19, 21, 1, 999.90, 2, 1999.80),
	(21, 23, 1, 999.90, 2, 1999.80),
	(22, 24, 1, 999.90, 50, 49995.00),
	(23, 25, 2, 1299.99, 10, 12999.90),
	(24, 26, 3, 49.99, 21, 1049.79),
	(25, 27, 3, 49.99, 25, 1249.75),
	(26, 28, 1, 999.90, 1, 999.90),
	(27, 29, 2, 1299.99, 15, 19499.85);
/*!40000 ALTER TABLE `tb_detalle_ventas` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_identificacion
CREATE TABLE IF NOT EXISTS `tb_identificacion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbbventas.tb_identificacion: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_identificacion` DISABLE KEYS */;
INSERT INTO `tb_identificacion` (`Id`, `descripcion`, `estado`) VALUES
	(1, 'DNI', 'ACTIVO'),
	(2, 'RUC', 'ACTIVO'),
	(3, 'CE', 'ACTIVO');
/*!40000 ALTER TABLE `tb_identificacion` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_marcas
CREATE TABLE IF NOT EXISTS `tb_marcas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_marcas: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_marcas` DISABLE KEYS */;
INSERT INTO `tb_marcas` (`Id`, `nombre`, `descripcion`, `estado`) VALUES
	(1, 'Samsung', 'Productos electrónicos', 'Activo'),
	(2, 'Apple', 'Productos tecnológicos', 'Activo'),
	(3, 'Dell', 'Computadoras y accesorios', 'Activo'),
	(4, 'iRobot', 'Electrodomésticos inteligentes', 'Activo'),
	(5, 'DJI', 'Fabricante de drones', 'Activo');
/*!40000 ALTER TABLE `tb_marcas` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_modelos
CREATE TABLE IF NOT EXISTS `tb_modelos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `marca_id` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `marcaId` (`marca_id`) USING BTREE,
  CONSTRAINT `FK8g24otdik3ibwmv4eksi2y1d0` FOREIGN KEY (`marca_id`) REFERENCES `tb_marcas` (`Id`),
  CONSTRAINT `tb_modelos_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `tb_marcas` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_modelos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_modelos` DISABLE KEYS */;
INSERT INTO `tb_modelos` (`Id`, `marca_id`, `nombre`, `descripcion`, `estado`) VALUES
	(1, 1, 'Galaxy S21 Ultra', 'Smartphone con cámara avanzada', 'Activo'),
	(2, 2, 'MacBook Pro', 'Potente computadora portátil', 'Activo'),
	(3, 3, 'Alienware X15', 'Laptop para juegos de alta gama', 'Activo'),
	(4, 4, 'Roomba i7+', 'Aspiradora robotizada con sistema de limpieza inteligente', 'Activo'),
	(5, 5, 'Mavic Air 2', 'Drone plegable y portátil', 'Activo'),
	(6, 1, 'SANSUMG G3 Flip', '', 'CREATED');
/*!40000 ALTER TABLE `tb_modelos` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_productos
CREATE TABLE IF NOT EXISTS `tb_productos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_id` int(11) DEFAULT NULL,
  `subcategoria_id` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `modelo_id` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `caracteristicas` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `stockMinimo` int(11) DEFAULT NULL,
  `estrellas` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`),
  KEY `categoriaId` (`categoria_id`) USING BTREE,
  KEY `subcategoriaId` (`subcategoria_id`) USING BTREE,
  KEY `marcaId` (`marca_id`) USING BTREE,
  KEY `modeloId` (`modelo_id`) USING BTREE,
  CONSTRAINT `FK9ujlcqo165f3kplro184h5m8d` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categorias` (`Id`),
  CONSTRAINT `FKf8fvufj3m15m7qj8xper1jy3h` FOREIGN KEY (`modelo_id`) REFERENCES `tb_modelos` (`Id`),
  CONSTRAINT `FKkbpt0p85cxkc9jvaejim7ovmd` FOREIGN KEY (`marca_id`) REFERENCES `tb_marcas` (`Id`),
  CONSTRAINT `tb_productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `tb_categorias` (`Id`),
  CONSTRAINT `tb_productos_ibfk_2` FOREIGN KEY (`subcategoria_id`) REFERENCES `tb_subcategorias` (`Id`),
  CONSTRAINT `tb_productos_ibfk_3` FOREIGN KEY (`marca_id`) REFERENCES `tb_marcas` (`Id`),
  CONSTRAINT `tb_productos_ibfk_4` FOREIGN KEY (`modelo_id`) REFERENCES `tb_modelos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_productos: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_productos` DISABLE KEYS */;
INSERT INTO `tb_productos` (`Id`, `categoria_id`, `subcategoria_id`, `marca_id`, `modelo_id`, `nombre`, `caracteristicas`, `precio`, `descuento`, `stock`, `stockMinimo`, `estrellas`, `estado`, `created_at`) VALUES
	(1, 1, 1, 1, 1, 'Samsung Galaxy Note 21', 'Pantalla AMOLED, 256 GB de almacenamiento', 999.90, 10.00, 45, 10, 4, 'ACTIVO', '2024-05-18 16:57:51'),
	(2, 2, 2, 2, 2, 'MacBook Air', 'Procesador M1, 8 GB RAM, 256 GB SSD', 1299.99, 5.00, 5, 5, 4, 'INACTIVO', '2024-05-18 16:57:51'),
	(3, 3, 3, 3, 3, 'Dell XPS 13 Funda', 'Funda de cuero para Dell XPS 13', 49.99, 0.00, 54, 20, 5, 'ACTIVO', '2024-05-18 16:57:51'),
	(4, 4, 4, 4, 4, 'iRobot Roomba 980', 'Aspiradora robotizada con Wi-Fi', 599.99, 15.00, 1, 5, 4, 'INACTIVO', '2024-05-18 16:57:51'),
	(5, 5, 5, 5, 5, 'DJI Phantom 4 Pro', 'Drone con cámara 4K', 1499.99, 8.00, 10, 5, 4, 'ACTIVO', '2024-05-18 16:57:51'),
	(14, 2, NULL, 1, 1, 'Laptop Samsung 19-2', 'Pantalla LED, 256 GB de almacenamiento, 2 Ventiladores', 2800.00, NULL, 30, NULL, NULL, 'CREATED', '2024-05-18 18:34:34');
/*!40000 ALTER TABLE `tb_productos` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_subcategorias
CREATE TABLE IF NOT EXISTS `tb_subcategorias` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `categoriaId` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `categoriaId` (`categoriaId`),
  CONSTRAINT `tb_subcategorias_ibfk_1` FOREIGN KEY (`categoriaId`) REFERENCES `tb_categorias` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_subcategorias: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_subcategorias` DISABLE KEYS */;
INSERT INTO `tb_subcategorias` (`Id`, `categoriaId`, `nombre`, `descripcion`, `estado`) VALUES
	(1, 1, 'Teléfonos inteligentes', 'Dispositivos móviles avanzados', 'Activo'),
	(2, 2, 'Laptops', 'Computadoras portátiles', 'Activo'),
	(3, 3, 'Fundas para smartphones', 'Accesorios de protección para teléfonos', 'Activo'),
	(4, 4, 'Aspiradoras robotizadas', 'Aspiradoras automatizadas', 'Activo'),
	(5, 5, 'Drones', 'Dispositivos voladores no tripulados', 'Activo');
/*!40000 ALTER TABLE `tb_subcategorias` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_usuarios
CREATE TABLE IF NOT EXISTS `tb_usuarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla bbbventas.tb_usuarios: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` (`Id`, `nombre`, `apellido`, `correo`, `username`, `password`, `estado`) VALUES
	(1, 'Carlos', 'Rodriguez', 'carlos.rodriguez@upal.edu.pe', 'carlos.rodriguez', '12345', 'ACTIVO'),
	(2, 'Ana', 'Gutierrez', 'ana.gutierrez@upal.edu.pe', 'ana.gutierrez', '12345', 'ACTIVO'),
	(3, 'Pedro', 'Martinez', 'pedro.martinez@upal.edu.pe', 'pedro.martinez', '12345', 'INACTIVO'),
	(4, 'Luisa ', 'Perez', 'luisa.perez@upal.edu.pe', 'luisa.perez', '12345', 'ACTIVO'),
	(5, 'Eduardo', 'Vargas Llosa', 'eduardo.vargas@upal.edu.pe', 'eduardo.vargas', '12345', 'ACTIVO');
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;

-- Volcando estructura para tabla bbbventas.tb_ventas
CREATE TABLE IF NOT EXISTS `tb_ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tb_ventas_clientes` (`cliente`),
  CONSTRAINT `fk_tb_ventas_clientes` FOREIGN KEY (`cliente`) REFERENCES `tb_clientes` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bbbventas.tb_ventas: ~19 rows (aproximadamente)
/*!40000 ALTER TABLE `tb_ventas` DISABLE KEYS */;
INSERT INTO `tb_ventas` (`id`, `cliente`, `fecha`, `total`) VALUES
	(1, 1, '2023-01-15 00:00:00', 1999.98),
	(2, 1, '2023-03-20 00:00:00', 1299.99),
	(3, 3, '2023-05-10 00:00:00', 149.97),
	(4, 3, '2023-07-05 00:00:00', 599.99),
	(5, 5, '2023-09-18 00:00:00', 2999.98),
	(15, 2, '2023-12-15 00:00:00', 15.00),
	(16, 3, '2023-12-15 00:00:00', 73798.77),
	(17, 3, '2023-12-16 00:00:00', 9999.00),
	(18, 1, '2023-12-16 00:00:00', 11998.80),
	(19, 5, '2023-12-16 00:00:00', 2999.95),
	(20, 4, '2023-12-16 10:26:32', 4999.50),
	(21, 4, '2023-12-16 10:27:34', 1999.80),
	(22, 3, '2023-12-16 00:00:00', 11998.80),
	(23, 3, '2023-12-16 00:00:00', 1999.80),
	(24, 2, '2023-12-16 00:00:00', 49995.00),
	(25, 5, '2023-12-16 11:15:26', 12999.90),
	(26, 4, '2023-12-16 11:16:14', 1049.79),
	(27, 1, '2023-12-16 11:16:37', 1249.75),
	(28, 4, '2023-12-16 12:34:23', 999.90),
	(29, 2, '2023-12-16 20:13:01', 19499.85);
/*!40000 ALTER TABLE `tb_ventas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
