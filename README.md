# Comandos de Ejecución:

## Inicializar el contenedor:

Con este comando se inicia el contenedor. En la primera ejecución se instalan las dependencias del package.json y se crea el contenedor.
```
docker-compose up
```
Se ejecutara en el siguiente [puerto de ejercución](http://localhost:3000)

## Apagar el contenedor:

Con este comando se va a apagar el contenedor y ya no estará en ejercución en segundo plano:
```
`docker-compose down`
```
## Re-construir el contenedor:
Al momento de hacer algun cambio en los archivos de instalación ya sea el package json o algun cambio grande, se va a reconstruir siguiendo las instrucciones del docker-compose y Dockerfiel que sea necesario de rehacer:
```
`docker-compose build`
```

# Instalación de docker:

## Windows

para la instación de docker en windows hay que seguir la [guia de instalación que provee Docker en su pagina ](https://docs.docker.com/desktop/install/windows-install/)

## Linux 
### distros basadas en Debian

1. Instalación del paquete de docker
```
`sudo apt install docker docker-compose`
```
2. Habilitar el servicio de docker en el sistema
 ```
`sudo systemctl enable docker`
```
3. Verificiar el estado del servicio de docker en el sistema
```
`sudo systemctl status docker`
```


