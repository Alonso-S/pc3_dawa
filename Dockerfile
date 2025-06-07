# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Agrega el binario de Prisma para la generación
RUN npx prisma generate

# Expón el puerto que usa Next.js
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "run", "dev"]
