# Analizador de lógica proposicional
El analizador de [lógica proposicional](https://es.wikipedia.org/wiki/L%C3%B3gica_proposicional) es un programa que muestra la tabla de verdad y el análisis semántico de proposiciones moleculares en este sistema formal.

## Funcionamiento
El programa admitirá proposiciones de manera indefinida hasta que se escriba `.exit` para salir. También se puede detener la ejecución con `Ctrl + C`.

Si algún caracter no se reconoce o hay fallos en la proposición, el analizador mostrará un error y continuará con el bucle.

## Formato
En orden de precedencia (de mayor a menor), las conectivas se representan como se muestra en la tabla.

| **Tipo** | **Símbolo** | **Representación** |
|:---:|:---:|:---:|
| Negador | `¬` | `-` |
| Conjuntor | `∧` | `&` |
| Disyuntor | `∨` | `\|` |
| Condicional | `→` | `>` |
| Bicondicional | `↔` | `=` |

A su vez, la representación de los paréntesis es la que cabría esperar, `()`.

Si bien la convención al nombrar proposiciones atómicas es hacer uso de letras minúsculas del abecedario latino comenzando por la `p`, el programa acepta cualquier secuencia de letras mayúsculas o minúsculas. Así, `prop` cuenta como una sola proposición atómica.