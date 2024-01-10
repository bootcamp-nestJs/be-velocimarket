CREATE DATABASE velo_db;
USE velo_db;

CREATE TABLE `Categoria` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria` VARCHAR(50),
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Subcategoria` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `categoria_id` INT,
  `descripcion` VARCHAR(50),
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);
 
CREATE TABLE `Usuario` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(50),
  `user_name` VARCHAR(50),
  `user_avatar` VARCHAR(200),
  `apellido` VARCHAR(50),
  `mail` VARCHAR(50),
  `password` VARCHAR(100),
  `telefono` VARCHAR(10),
  `calle` VARCHAR(20),
  `numero` int,
  `comuna` int,
  `region` int,
  `valoracion` int,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Producto` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100),
  `categoria_id` INT,
  `usuario_id` INT,
  `descripcion` TEXT,
  `precio` INT,
  `marca` VARCHAR(20),
  `tamanio` VARCHAR(20),
  `estado` VARCHAR(20),
  `material_cuadro` VARCHAR(20),
  `componentes` TEXT,
  `vendido` BOOLEAN,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Follower` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `follower_id` INT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Following` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `following_id` INT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Carrito` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `usuario_id` INT,
  `valor_envio` INT,
  `total_carrito` INT,
  `medio_pago` VARCHAR(20),
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `CarritoProducto` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `carrito_id` INT,
  `producto_id` INT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Reclamo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `producto_id` INT,
  `emisor_id` INT,
  `descripcion` TEXT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Calificacion` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `producto_id` INT,
  `emisor_id` INT,
  `descripcion` TEXT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Mensaje` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `conversacion_id` INT,
  `mensaje` TEXT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Conversacion` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `mensaje_id` INT,
  `usuario_id` INT,
  `producto_id` INT,
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

CREATE TABLE `Imagen` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `producto_id` INT,
  `imagen` VARCHAR(200),
  `fecha_creacion` DATETIME,
  `fecha_modificacion` DATETIME
);

ALTER TABLE `Producto` ADD FOREIGN KEY (`categoria_id`) REFERENCES `Subcategoria` (`id`) ON DELETE CASCADE;

ALTER TABLE `Producto` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Subcategoria` ADD FOREIGN KEY (`categoria_id`) REFERENCES `Categoria` (`id`)  ON DELETE CASCADE;

ALTER TABLE `Follower` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Follower` ADD FOREIGN KEY (`follower_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Following` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Following` ADD FOREIGN KEY (`following_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Carrito` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `CarritoProducto` ADD FOREIGN KEY (`carrito_id`) REFERENCES `Carrito` (`id`) ON DELETE CASCADE;

ALTER TABLE `CarritoProducto` ADD FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`) ON DELETE CASCADE;

ALTER TABLE `Reclamo` ADD FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`) ON DELETE CASCADE;

ALTER TABLE `Reclamo` ADD FOREIGN KEY (`emisor_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Calificacion` ADD FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`) ON DELETE CASCADE;

ALTER TABLE `Calificacion` ADD FOREIGN KEY (`emisor_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Mensaje` ADD FOREIGN KEY (`conversacion_id`) REFERENCES `Conversacion` (`id`) ON DELETE CASCADE;

ALTER TABLE `Imagen` ADD FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`) ON DELETE CASCADE;

ALTER TABLE `Conversacion` ADD FOREIGN KEY (`usuario_id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE;

ALTER TABLE `Conversacion` ADD FOREIGN KEY (`mensaje_id`) REFERENCES `Mensaje` (`id`) ON DELETE CASCADE;

ALTER TABLE `Conversacion` ADD FOREIGN KEY (`producto_id`) REFERENCES `Producto` (`id`) ON DELETE CASCADE;
