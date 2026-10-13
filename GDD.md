  
**Juegos en Red**

**Práctica-Fase 1**  
**Grupo G**

***Grado en Diseño y Desarrollo de Videojuegos***  
***Universidad Rey Juan Carlos***

Leila Aabbouz Chillada, [l.aabbouz.2024@alumnos.urjc.es](mailto:l.aabbouz.2024@alumnos.urjc.es), [https\://github.com/leleleila](https://github.com/leleleila)

Genma de Argüeso Muñoz, [g.deargueso.2024@alumnos.urjc.es](mailto:g.deargueso.2024@alumnos.urjc.es), [https\://github.com/genmita](https://github.com/genmita)

Iván Domingo Reyes, [i.domingo.2024@alumnos.urjc.es](mailto:i.domingo.2024@alumnos.urjc.es), [https\://github.com/iviDoRe](https://github.com/iviDoRe)

Aimar Hernández Holgado, [a.hernandezh.2024@alumnos.urjc.es](mailto:a.hernandezh.2024@alumnos.urjc.es), [https\://github.com/AimarHH](https://github.com/AimarHH) 

Índice

[**1\. Introducción**](#1.-introducción)

[**2\. Especificaciones básicas**](#2.-especificaciones-básicas)

[**3\. Jugabilidad**](#3.-jugabilidad)

[**4\. Narrativa**](#4.-narrativa)

[**5\. Imagen y diseño visual**](#5.-imagen-y-diseño-visual)

[**6\. Sonido**](#6.-sonido)

[**7\. Interfaz y diagrama de flujo**](#7.-interfaz-y-diagrama-de-flujo)

[**8\. Comunicación y marketing**](#8.-comunicación-y-marketing)

[**9\. Referencias**](#9.-referencias)

# **1\. Introducción** {#1.-introducción}

## **1.1. Concepto del juego**

**Rivals Through Ages** es un juego de luchas para dos jugadores en el que se tendrán que pelear en una arena para ser el último en pie. La idea principal es que cada jugador controle a un personaje, los cuales llevarán un arma con la que tendrán que intentar eliminar al jugador contrincante para ganar la partida.

## **1.2. Propuesta de valor**

¿Qué hace diferente a nuestro juego?

- Al contrario que en la mayoría de juegos de su género, en **Rivals Through Ages** el conjunto de armas disponibles varía según el escenario en el que se dé el combate. Además, estas armas se ajustan a la temática del entorno. Ej: katanas en el escenario ambientado en el Japón medieval.   
- Mecánicas únicas en cada escenario.  
- Progresión de la dificultad distinta según el escenario. Si eliges jugar en modo difícil, los escenarios irán añadiendo mecánicas nuevas según vayan progresando las rondas.


# **2\. Especificaciones básicas** {#2.-especificaciones-básicas}

| Aspecto | Descripción |
| :---: | :---: |
| **Título** | Rivals Through Ages |
| **Género**  | Juego de peleas (Arena fighter) |
| **Número de jugadores**  | 2 (en red, tiempo real) |
| **Público objetivo**  | Jugadores jóvenes y adultos |
| **Clasificación PEGI**  | PEGI 12 (Violencia no realista) |
| **Plataforma**  | Navegador web (PC), desarrollado con Phaser   |
| **Duración de una partida**  | 5-10 minutos |
| **Representación**  | 2D  |
| **Licencia**  | Apache 2.0  |

# **3\. Jugabilidad** {#3.-jugabilidad}

## **3.1. Objetivo del juego**

El objetivo es eliminar al jugador contrincante con las armas que aparecen sobre el escenario. Aquel que triunfe en más rondas, ganará la partida.

## **3.2. Controles**

Para dos personas jugando en el mismo dispositivo (multijugador local):

| Acción | Jugador 1 | Jugador 2 |
| :---: | :---: | :---: |
| **Moverse a la izquierda** | A | ← |
| **Moverse a la derecha** | D | → |
| **Saltar** | W | ↑ |
| **Acción especial** | Mayús | O |
| **Disparar** | Espacio | P |
| **Pausa** | Esc | Esc |

## **3.3. Mecánicas**

### **3.3.1. Mecánicas principales**

- **Salto**  
- **Disparo / Ataque:** realiza la acción de disparo o ataque del arma equipada (dependiendo de si es un arma de largo o corto alcance).  
- **Aparición de armas y objetos:** a lo largo de la partida irán apareciendo armas y objetos en diferentes puntos del escenario que los jugadores pueden recoger y utilizar a su favor.  
- **Recogida:**   
  - **De armas:** permite recoger un arma que haya aparecido por el mapa para poder utilizarla. Cada jugador solo puede llevar un arma a la vez, por lo que recoger un arma en posesión de otra hará que la antigua sea sustituida y desaparezca.   
  - **De objetos:** permite recoger un objeto que haya aparecido por el mapa. Este se guardará en el “bolsillo” del jugador para poder desplegarlo cuando lo necesite. De nuevo, cada jugador solo puede llevar un objeto a la vez; si recoge uno nuevo, este sustituirá al antiguo.  
    

### **3.3.2. Mecánicas ligadas a escenarios**

- **Aparecer y reaparecer por agujeros (Lejano Oeste):** en este escenario, podrás entrar en huecos colocados en las paredes, similares a las entradas de una mina, y reaparecer en otro lugar del mapa. 

- **Gravedad baja (Espacio Exterior):** más que una mecánica como tal, en el escenario lunar, se produce una modificación de las físicas básicas del juego. La gravedad es más tenue en este entorno, por lo que los jugadores pasarán más tiempo en el aire, lo que los volverá predecibles y, por ende, más vulnerables. En vez de una ventaja, este efecto cambia por completo la forma de afrontar la partida.

- **Subida del nivel del agua (Medieval Japonesa):** a medida que avanza la partida, el nivel del agua irá subiendo, haciendo que los jugadores cada vez tengan menos espacio para luchar.

- **Tormenta de arena (Lejano Oeste):** progresivamente irá apareciendo una tormenta de arena que dificultará cada vez más la visión de los jugadores.

- **Caída de meteoritos (Espacio Exterior):** en la dificultad más alta, una lluvia de meteoritos atosigará a los jugadores, obligándoles a buscar refugio o mantenerse en constante movimiento.

### **3.3.3. Objetos y power-ups**

| Power up | Efecto | Duración | Aparición |
| :---: | :---: | :---: | :---: |
| Escudo | Inmunidad al daño | 5s | Aleatoria cada x segundos |
| Frenetizante | Mayor velocidad de movimiento | 5s |  |
| Cortina de humo | Reduce la visibilidad en un área determinada | 5s |  |

| Arma | Tipo | Aparición |
| :---: | :---: | :---: |
| Katana  | Cuerpo a cuerpo | Zona Medieval Japonesa (Aleatorio cada X segundos) |
| Shuriken / Chacra  | Distancia |  |
| Cañón | Distancia |  |
| Bastón extensible | Cuerpo a cuerpo |  |
| Pistola láser | Distancia | Zona Espacio Exterior (Aleatorio cada X segundos)  |
| Sable Láser | Cuerpo a cuerpo |  |
| Cañón de riel | Distancia |  |
| Escudo holográfico | Cuerpo a cuerpo |  |
| Revólver | Distancia | Zona Lejano Oeste (Aleatorio cada X segundos)  |
| Escopeta de dos cañones | Distancia |  |
| Látigo de vaquero | Cuerpo a cuerpo |  |
| Tomahawk | Cuerpo a cuerpo |  |

### **3.3.4. Sistema de puntuación**

Cada partida consta de “x” número de rondas según la dificultad que elijan los jugadores.  
El número de rondas que gane cada jugador se va contabilizando hasta que acabe la partida. Una vez terminada, saldrá por pantalla cuántas rondas ha ganado cada jugador y, por tanto, cuál es el ganador final. 

| Modo | Número de rondas |
| :---: | :---: |
| Fácil | 5 |
| Normal | 9 |
| Difícil | 15 |

## **3.4. Físicas y dificultad**

| Gravedad y salto | Las zonas Medieval Japonesa y Lejano Oeste cuentan con una gravedad estándar, mientras que en la zona espacial, hay menos gravedad y el salto se hace más amplio y lentamente. |
| :---- | :---- |
| **Colisiones** | Los jugadores colisionan con los proyectiles o los ataques de las armas cuerpo a cuerpo. |
| **Plataformas móviles** | En la zona del Espacio exterior, las plataformas se irán moviendo a modo de asteroides. |
| **Superficies especiales** | En la zona del Lejano Oeste, habrá agujeros en las paredes de las montañas o el suelo, por donde el jugador podrá “entrar” y aparecer en otro de ellos situado en una ubicación diferente de la arena de combate. |
| **Progresión de la dificultad** | Se añadirá dificultad adicional en cada escenario conforme vayan pasando las rondas: Zona Medieval Japonesa → subida del nivel del agua. Zona Lejano Oeste → tormenta de arena que irá dificultando la visión de los jugadores. Zona Espacio Exterior → empezarán a caer meteoritos obligando a los jugadores a mantenerse en movimiento y buscar refugio. |

## **3.5. Escenarios**

El juego se compone de 3 escenarios diferentes. Los jugadores podrán elegir el escenario que prefieran al comienzo de la partida.

| Escenario | Descripción | Bocetos |
| :---: | :---: | ----- |
| **Zona medieval Japonesa** | Se caracteriza por su verticalidad. Los personajes deberán saltar entre tejados de torres japonesas para obtener posiciones de ventaja. | ![Boceto del escenario japones][img/pagoda.jpg] |
| **Zona Lejano Oeste** | Una zona principalmente horizontal inspirada en el concepto cinematográfico del *Lejano Oeste*.   | ![Boceto del escenario del lejano oeste][img/wildwest.jpg] |
| **Zona Espacio Exterior** | Este escenario se ambienta en una colonia espacial sobre la Luna. Cuenta con plataformas móviles que obligan a estar en constante movimiento, aunque la baja gravedad vuelve esto arriesgado. | ![Boceto del escenario espacial][img/space.jpg] |

# **4\. Narrativa** {#4.-narrativa}

## **4.1. Historia**

Los *Powans* son una raza de hombrecillos de apariencia peculiar con la increíble habilidad de reaparecer tras la muerte. Debido a esto, para los *Powans* los combates a muerte están arraigados a su cultura. La inmortalidad de los *Powans* hace que puedan llegar a formar rivalidades con algunos de sus oponentes tan duraderas como la propia historia de la humanidad: desde el Japón feudal, pasando por la colonización del oeste americano, hasta la conquista del espacio.

Encarna a uno de estos seres y elimina a tu rival una y otra vez en vuestros enfrentamientos a través de diferentes épocas. 

## **4.2. Personajes**

Los *Powans* son los personajes con los que se juega. Estos seres carecen de extremidades, componiendose exclusivamente de pies, torso, manos y cabeza. La única diferencia física entre miembros de la misma especie es el croma. Este rasgo es tan importante para la identidad de algunos *Powans* que deciden basar su nombre en su color. Por ejemplo, el *Powan* azul acua se hace llamar Rain, mientras que el rojo es Fler.  
    
En cuanto a sus habilidades, los *Powans* son expertos en el uso de cualquier tipo de arma o artilugio que pueda servirles para derrotar a sus oponentes. Además, tienen la curiosa condición de reaparecer tras la muerte, lo que hace que no tengan miedo a nada.

# **5\. Imagen y diseño visual** {#5.-imagen-y-diseño-visual}

## **5.1. Logotipo**

![Logotipo del juego][img/logo.png]

## **5.2. Estilo visual**

El juego utiliza un estilo pixel art de 32x32 píxeles con bordes negros. Este estilo permite crear parecidos con juegos retro y arcade, además, el borde negro permite diferenciar correctamente los distintos elementos del gameplay entre sí. 

Los personajes contarán con un estilo más simplificado, sin extremidades. Es decir, que las manos y los pies estarán separadas del cuerpo, similar a *Rayman*, el personaje principal del videojuego del mismo nombre.

## **5.3. Uso de colores**

Cada escenario cuenta con su paleta de colores representativa acorde con su ambientación. Por ejemplo, el escenario del Lejano Oeste se inclina por colores cálidos poco saturados. Por otro lado, en el escenario espacial, el cosmos que se presta con fondo, destaca en gran medida con el “layout” jugable del escenario. Lo que favorece la visibilidad de los jugadores. 

| Escenario | Colores principales |
| :---: | :---: |
| Japón Medieval | ![Paleta del escenario japones][img/paletajapon.png] |
| Lejano Oeste | ![Paleta del escenario del Lejano Oeste][img/paletawest.png] |
| Espacio Exterior | ![Paleta del escenario espacial][img/paletaspace.png] |

## **5.4. Aspectos técnicos: cámara y representación**

* **Representación:** 2D, vista lateral.  
* **Cámara:** Fija, cubriendo todo el escenario.  
* **Resolución:** 1920x1080 (1080p)

## **5.5. Inspiración artística y cultural**

![Moodboard con las inspiraciones del juego][img/moodboard.png]

**Idea general y estilo de combate:** Stick Fight: the game (2017) y Samurai Gunn (2013).  
**Estética de los personajes:** Rayman Legends (2013) y Stick Fight: the game (2017).  
**Estética de los escenarios:** Rivals of Aether (2017).

## **5.6. Bocetos de personajes y pantallas**

![Boceto de los personajes][img/bocetopersonaje.png]

# **6\. Sonido** {#6.-sonido}

## **6.1. Banda sonora**

| Pista | Escena | Estilo / ambiente | Fuente / licencia |
| :---: | :---: | :---: | :---: |
| *Getting Started* | Menú principal | Chiptune calmado | Propia |
| *Pagoda Peak* | Escenario Japón Medieval | Chiptune que incorpora instrumentos tradicionales de la música japonesa, como el biwa y el taiko. | Propia |
| *It’s High Noon* | Escenario Lejano Oeste | Chiptune acelerado con piano de salón típico de bandas sonoras del Lejano Oeste | Propia |
| *Killer Music From Outer Space* | Escenario Espacio Exterior | Chiptune rápido, con vibra sci-fi. | Propia |
| *See You Next Time* | Final de la partida | Chiptune calmado | Propia |

## **6.2. Efectos de sonido**

| Efecto | Momento en el que se reproduce |
| :---: | :---: |
| Salto | Al pulsar la tecla de salto |
| Golpe | Al recibir daño |
| Ataque | Al utilizar un arma de cuerpo a cuerpo. Algunas armas de esta categoría cuentan con efectos de sonido propios. |
| Disparo | Al disparar con un arma de fuego. El sonido puede variar dependiendo del arma. |
| Recoger objeto | Al recoger un power up o un arma |
| Botones de la interfaz | Al hacer clic |

# **7\. Interfaz y diagrama de flujo** {#7.-interfaz-y-diagrama-de-flujo}

## **7.1. Pantallas**

- Pantalla de título  
- Menú principal  
- Pantalla de juego  
- Ajustes del juego  
- Final/Resumen de partida  
- Créditos  
- Pausa  
- Pantallas de carga

## **7.2. Diagrama de flujo**

![Diagrama de flujo de las pantallas][img/diagflujo.png]

# **8\. Comunicación y marketing** {#8.-comunicación-y-marketing}

* **Público y mensaje clave:** Para aficionados de los juegos de lucha y party games con ganas de un juego ágil y divertido.  
* **Canales:** redes sociales (X, Instagram, Reddit), itch.io, Newgrounds, Game Jolt...  
* **Calendario:** teaser en noviembre, devblog semanal en nuestras redes sociales, lanzamiento en diciembre.  
* **Material:** tráiler, capturas, GIF de jugabilidad, press kit.  
* **Eslogan:** «Las peleas más divertidas de los últimos tiempos».

# **9\. Referencias** {#9.-referencias}

Inspiraciones para la banda sonora:

- Melodías chiptune por Jonathan So: [https\://soundcloud.com/jonathan-so-988423341/sets/the-game-creators-pack-audio](https://soundcloud.com/jonathan-so-988423341/sets/the-game-creators-pack-audio)  
- Melodías japonesas: [https\://youtu.be/\_M4K5wk9DCM?si=kPLGYHvMrnuOkjln](https://youtu.be/_M4K5wk9DCM?si=kPLGYHvMrnuOkjln)  
- Melodías del lejano oeste: [https\://youtu.be/WKlcTG8GbB8?si=Xi\_eP7rpWFG5\_kr1](https://youtu.be/WKlcTG8GbB8?si=Xi_eP7rpWFG5_kr1)  
- Melodía espacial: [Cozy Space Music — 6 Seamless Chiptune Loops (WAV) by Spaceyyy](https://aquumgifts.itch.io/cozy-space-music#:~:text=Six%20short%20chiptune%20tracks%20for%20sci-fi%20and%20arcade,effects%20to%20match%3A%20Cozy%20Space%20SFX%20%2846%20sounds%29.) 
