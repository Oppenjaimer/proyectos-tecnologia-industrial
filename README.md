# `translit`

`translit` es una interfaz de línea de comandos (CLI, *command-line interface*) creada para convertir caracteres 
del abecedario latino al alfabeto cirílico.

## Documentación

Para ver cómo utilizar `translit` no hay más que ejecutar el programa con la opción `-h`/`--help`.

### Con el intérprete de Python
```bash
python translit.py --help   # En Linux, utilizar python3
```

### Como comando individual
Sólo disponible en Linux. Primero asegurarse de que el *shebang* apunta a la ruta adecuada.
```bash
mv translit.py translit
chmod +x translit
./translit --help
```
Para poder ejecutarlo desde cualquier lugar sin necesidad de especificar la ruta del archivo, moverlo a un directorio incluido en `PATH`. Por ejemplo, `~/bin`, añadido a `PATH` automáticamente en Ubuntu y otras distribuciones derivadas de Debian.
```bash
mkdir ~/bin
source ~/.profile
mv translit ~/bin
```
Ahora ya se puede utilizar el nombre del programa sin más.
```bash
translit --help
```