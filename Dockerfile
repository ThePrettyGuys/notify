FROM node:8
# Utiliza la imagen de node 8 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/notify

# Copia el package.json package-lock.json en /home/node/notify
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 5001 donde corre la aplicación
EXPOSE 5001

# Copia los fuentes dentro del container
COPY . /home/node/notify/

# Le da permisos al usuario node para escribir en /home/node/notify
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio

# Corro el comando para generar las credenciales de spotify
#RUN ["node", "install"]

CMD [ "node", "server" ]

# LISTO!