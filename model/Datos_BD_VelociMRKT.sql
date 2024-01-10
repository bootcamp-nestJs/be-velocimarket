use velo_db;

INSERT INTO `Categoria` (`categoria`)
VALUES ('Bicicletas'),
('Componentes'),
('Accesorios'),
('Indumentaria');

INSERT INTO `Subcategoria` (`categoria_id`, `descripcion`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', 'Mountainbike', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'Carrera', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'Gravel', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'Urbana', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'Electrica', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'BMX', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Cuadros_horquillas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Ruedas_Llantas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Frenos', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Transmision_Cadenas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Pedales', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Manillares_Potencias', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Asientos_Tijas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Suspension', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Luces', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Cascos', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Candados_Seguridad', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Bolsas_Almacenamiento', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Herramientas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', 'Botellas_Portabotellas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Tricotas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Chaquetas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Calzas_Shorts', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Guantes', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Gafas', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', 'Zapatos_Cubrezapatos', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Usuario` (`nombre`, `user_name`, `user_avatar`, `apellido`, `mail`, `password`, `telefono`, `calle`, `numero`, `comuna`, `region`, `valoracion`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('Alfonso', 'alfonsoscs', '', 'Contreras', 'alfonso.contreras@usach.cl', 'clave123', '972085027', 'calle 1', '123', '1', '1', '1','2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Segundo', 'Segundo1234', '', 'Contreras', 'alfonso.contreras@gmail.cl', 'clave123', '972085025','calle 2', '123', '1', '1','1', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Raul', 'Rulo4564', '','Contreras', 'raul.contreras@gmail.cl', 'clave123', '972085029','calle 3', '123', '1', '1','1', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Javiera', 'Java4564', '', 'Quiñones', 'javi.era@gmail.cl', 'clave123', '972085456','calle 4', '123', '1', '1', '1','2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Jose', 'donpp1234', '', 'Carrasco', 'jose.carrasco@gmail.cl', 'clave123', '972078029','calle 5', '123', '1', '1', '1','2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Luis', 'Luiscs', '', 'Contreras', 'luis.contreras@gmail.cl', 'clave123', '972378029', 'calle 6', '123', '1', '1', '1','2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Producto` (`nombre`, `categoria_id`, `usuario_id`, `descripcion`, `precio`, `marca`, `tamanio`, `estado`, `material_cuadro`, `componentes`,`vendido`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('Specialized Tarmac SL 7 pro', '01', '01', 'Vendo mi bicicleta Specialized. Poco uso.', '5300000', 'Specialized', 'M', 'Usado', 'Carbono', 'Shimano 105', 1, '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Bicicleta de ruta Giant Defy Advanced', '01', '02','Vendo mi bicicleta Giant. Para rutas largas.', '1000000', 'Giant', 'M', 'Usado', 'Carbono', 'Shimano 105', 0, '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Canyon Ultimate CF SLX 9 Di2 2023', '01', '03','Vendo mi bicicleta Canyon. Para rutas largas.', '4000000', 'Canyon', 'L', 'Usado', 'Carbono', 'Shimano 105', 0, '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Kit De Aluminio Frenos V-brake De Montaña Bicicleta', '02', '04', 'Ideal para mejorar su manejo y experiencia, mejore sus frenos con nuestra línea completa de frenos en V', '12000', 'Carluo', '', 'Nuevo', 'Aluminio', '', 1, '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('Ruedas Aro 26 Delantera O Trasera Maza Corriente', '03', '05','Ruedas Aro 26 Delantera O Trasera Maza Corriente, despachamos el mismo dia de la compra', '23990', 'Fanton', '', 'Nuevo', 'Aluminio', '', 0, '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Follower` (`usuario_id`, `follower_id`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '03', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '04', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '05', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '06', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Following` (`usuario_id`, `following_id`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '03', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '04', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '05', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '06', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Carrito` (`usuario_id`, `valor_envio`, `total_carrito`, `medio_pago`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '3000', '23000', 'Transferencia', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', '2000', '18000', 'Transferencia', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', '5000', '36000', 'Transferencia', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', '3000', '853000', 'Transferencia', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('05', '3000', '123900', 'Transferencia', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `CarritoProducto` (`carrito_id`, `producto_id`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', '02', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', '03', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', '04', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('05', '04', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Reclamo` (`producto_id`, `emisor_id`, `descripcion`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', 'Producto en mal estado, vendedor no se hace cargo', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', '02','Producto en mal estado', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', '01', 'Marco con desgaste', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', '03', 'Producto en mal estado, vendedor no se hace cargo', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('05', '04', 'No es igual a la descripción', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Calificacion` (`producto_id`, `emisor_id`, `descripcion`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', 'Buen vendedor', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', '02','Entrega en tiempo record', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('03', '01', 'Perfecto estado de la bicicleta', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('04', '03', 'Algo lenta la respuesta, pero se entrega bien', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('05', '04', 'Excelente vendedor', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Mensaje` (`conversacion_id`, `mensaje`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', 'Hola', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'Hola buenos días', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'buenos días, quiero preguntar por el marco de la bicicleta', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('02', 'claro, cual es la duda?', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', 'cual es el material y cuanto tiempo de uso tiene?', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

INSERT INTO `Conversacion` (`mensaje_id`, `usuario_id`, `producto_id`, `fecha_creacion`, `fecha_modificacion`)
VALUES ('01', '02', '01', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '01','01', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '02', '02', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '01', '03', '2023-10-10 10:00:00', '2023-10-12 10:00:00'),
('01', '02', '01', '2023-10-10 10:00:00', '2023-10-12 10:00:00');

