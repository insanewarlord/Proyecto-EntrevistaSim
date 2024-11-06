# Usar una imagen base de Node.js para construir el frontend
FROM node:18 AS build

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar las dependencias
RUN npm ci

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen base de Nginx para servir el frontend
FROM nginx:alpine

# Copiar los archivos construidos al contenedor de Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto en el que se ejecuta Nginx (ejemplo: 80)
EXPOSE 80

CMD [ "nginx" , "-g" , "daemon off;" ]