# Este es el módulo de notificaciones

## Levantar con docker :

Para poder correr estos comandos, se requiere docker instalado. 

**SI ES QUE AUN NO LO HEMOS CORRIDO ANTERIORMENTE** en alguno de los otros proyectos, correr el siguiente comando para crear una subred:


 `- docker network create --subnet=172.20.0.0/16 unqfynet`


Luego, al levantar los containers lo hacemos sobre la red que acabamos de crear de la siguiente forma:

```

- docker build -t notify_image .
- docker run --net unqfnet --ip 172.20.0.22 -p 5001:5000 --name notify_container --user node notify_image

```