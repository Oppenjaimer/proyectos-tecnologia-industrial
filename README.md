# Simulación del problema de Monty Hall

El [problema de Monty Hall](https://es.wikipedia.org/wiki/Problema_de_Monty_Hall) es un problema probabilístico inspirado en el programa de televisión estadounidense *Let's Make a Deal*.

## Planteamiento

A un participante se le presentan tres puertas. Detrás de una de ellas se encuentra un coche; detrás de las otras dos, una cabra. Una vez el participante elige una puerta, el presentador, sabiendo en cuál de las tres se esconde el premio, abre la puerta que ni ha sido escogida ni oculta el coche, revelando una de las dos cabras.

Ahora el participante tiene dos opciones:

1. Mantener la puerta que había seleccionado inicialmente
2. Cambiar de puerta

Así, la pregunta que nos plantea este problema es la siguiente: **¿Por qué opción debería decantarse el participante si quiere maximizar sus probabilidades de ganar el coche?**

## Solución

La gente tiende a pensar que no hay respuesta correcta, pues asumen que la probabilidad de que el coche se encuentre tras la puerta elegida es de 1/2 una vez se ha eliminado una de las tres puertas. Sin embargo, resulta que las probabilidades no cambian cuando el anfitrión abre la puerta, sino que se mantiene la distribución original de 1/3. De modo que resulta más efectivo cambiar de puerta, ya que la probabilidad pasará a ser de 2/3.

Este programa pretende demostrar este hecho mediante repetidas simulaciones con parámetros aleatorios.