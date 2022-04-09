# Intérprete de Brainfuck

El intérprete de [Brainfuck](https://es.wikipedia.org/wiki/Brainfuck) lee código en este lenguaje de programación esotérico desde un archivo o la propia línea de comandos y lo ejecuta.

## Funcionamiento

En la línea de comandos, el intérprete admitirá código de manera indefinida hasta que se escriba `exit` para salir. También se puede detener la ejecución con `Ctrl + C`.

Cualquier caracter que no sea una instrucción del lenguaje será ignorado.

## Ejecución

Para utilizar el intérprete, es necesario empaquetar el código fuente en un archivo JAR o simplemente descargarlo desde este respositorio. Una vez hecho esto, se ejecuta el JAR acompañado o no del nombre de un archivo que contenga el código a interpretar.

### Código desde la línea de comandos
```bash
java -jar brainfuck-interpreter.jar
```
A continuación se mostrará el texto `Brainfuck >`, después del cual se introducen las instrucciones.

### Código desde un archivo
```bash
java -jar brainfuck-interpreter.jar program.bf
```
Reemplazar `program.bf` por el nombre del archivo a ejecutar.