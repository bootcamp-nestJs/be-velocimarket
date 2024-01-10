<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción
Plataforma backend para el proyecto **Velomarket**.
Esta desarrollada con [NestJS](https://github.com/nestjs/nest) en su version 10.0.0 bajo [NodeJs](https://nodejs.org/en) en su version 18.17.1.
Adicionalmente, se utiliza implementacion en GCP Cloud Storage para el alamacenamiento de imágenes.

## Tecnologías
Algunas de las tecnologías que participan en el proyecto son:
- NodeJS v18.17.1
- Nestjs v10.0.0
- Google Cloud Storage v7.7.0
- Bcrypt v5.1.1
- mysql2 v3.6.3
- uuid v9.0.1
- winston v3.11.0
- passport-jwt v4.0.1

Para más información del set completo de las librerias consulte el *package.json* del presente proyecto.

## Instalación
Para instalar el proyecto en modo local, se debe ejecutar la siguiente instrucción por consola en la raiz del proyecto:
```bash
$ npm install
```
este comando instalará todas las librerias necesarias para levantar el proyecto.

## Configuraciones previas
Antes de levantar el proyecto es preciso hacer configuraciones iniciales.

#### 1. Generar base de datos
Primero se debe generar la base de datos *mysql* ó *MariaDB*.
Bajo la carpeta *model* se encuentra el diagrama entidad relacion del proyecto y dos scripts. El script *Estructura_BD_VelociMRKT* creará la base de datos y las tablas correspondientes al modelo de la aplicación y el script *Datos_BD_VelociMRKT* poblará la base creada con valores dummy iniciales.

Este método es opcional al proceso de migración *code first* generada por *TypeOrm*, vale decir, si se requiere generar la base de datos de forma manual. Sino, es preciso configurar el proyecto para generar esta migración previo a la ejecución del proyecto

#### 2. Crear Bucket en GCP Cloud Storage y generar cuenta de servicio en GCP **
Ir a la consola de *GCP* y crear un proyecto. Bajo ese proyecto, ir a la plataforma de *Cloud Storage* y crear un bucket con permisos públicos. Aquí un [ejemplo](https://www.youtube.com/watch?v=Px1oXqR1bFA).

Luego de esto, se debe generar una cuenta de servicio o una *Service Account* con los permisos necesarios sobre el proyecto y el bucket disponibilizado para almacenar las imágenes generadas en la aplicación. Una vez generada esta SA *google-cloud-key.json* debe ubicarse en la raiz del proyecto para su uso.
Esta SA no debe subirse al repositorio, por lo que es su responsabilidad resguardar sus claves.

** Este proceso es necesario para el correcto funcionamiento de la totalidad de la aplicación, pero se pueden generar flujos sin la necesidad de tener esta *SA* configurada en el proyecto.

#### 3. Definir variables de entorno
En el archivo *.env.dist* se encuentran las variables de entorno que se utilizan en la aplicación y un ejemplo de lo que toma por valor. Para configurar las variables locales se debe crear un archivo *.env.local* en el directorio raiz (misma ubicación del archivo *.env.dist*) con la misma configuracion pero reemplazando las variables por las variables locales que corresponden. Las variables son las siguientes:

```bash
# variables para conectar la base de datos
DB_HOST= # host base de datos (mysql ó mariadb)
DB_PORT= # puerto de conexión
DB_USER= # usuario conexión bd
DB_PASSWORD= # contraseña usuario bd
DB_NAME= # nombre base de datos, generada en el paso 1

# secreto para firmar token de autenticación
SECRET_KEY="ClaveSecreta@12345" # valor ejemplo, reemplazar por valor definitivo

# nombre el bucket donde apunta cloud storage
BUCKET_NAME="nombre_bucket_gcp" # reemplazar por el nombre del bucket, generado en el paso 2
```

## Levantar el proyecto
Una vez realizadas las configuraciones previas, se levanta el proyecto con los siguientes comandos
```bash
# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# producción
$ npm run start:prod
```

## Contacto
Para mayor información:
- Autor - Alfonso Contreras (alfonso.contreras@usach.cl)
- Autor - Javiera Quiñones (java.sandoval@gmail.com)

## Licencia

Nest is [MIT licensed](LICENSE).
