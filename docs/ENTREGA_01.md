# Entrega 1: base de la aplicación

Responsable previsto: Luis. Revisión conjunta con Daniel antes del commit.

## Contenido

Angular CLI genera la estructura, el sistema de compilación y los scripts npm. Angular Material aporta componentes visuales y un tema. La pantalla inicial confirma que ambos están conectados. No se adelantan modelos, servicios o funcionalidades de otras entregas.

## Recorrido para comprender el código

1. El navegador carga index.html, cuyo app-root será reemplazado por el componente Angular.
2. main.ts llama bootstrapApplication para iniciar App con appConfig.
3. app.ts declara los componentes Material disponibles en su plantilla.
4. app.html utiliza esos componentes; app.css define el aspecto local.
5. styles.css aplica el tema global.

## Prompts útiles de personalización

- «Explícanos cómo pasa Angular de main.ts a app.html; luego haznos tres preguntas para comprobar que lo entendimos».
- «Queremos llamar la aplicación [nombre elegido]. Cambia título y descripción y muéstranos exactamente qué archivos modificaste».
- «Preferimos una paleta [colores elegidos]. Ajusta el tema conservando contraste y explica dónde se configura».
- «Este texto no suena como nosotros: [texto propio]. Úsalo en la bienvenida sin afirmar que ya existen funcionalidades futuras».

Los cambios buscan expresar decisiones propias. Cambiar nombres al azar, quitar comentarios o introducir errores no mejora el proyecto ni demuestra comprensión.

## Antes del commit

- Ejecutar npm run build.
- Abrir npm start y comprobar la pantalla en escritorio y ancho de teléfono.
- Revisar git diff y confirmar que solo está incluido el alcance inicial.
- Confirmar el correo de Git de Luis y la cuenta de GitHub utilizada.
- Mensaje previsto: chore: iniciar Angular 20 y Material.

## Registro

Las verificaciones realizadas por el asistente se registran en VERIFICACIONES.md. La revisión de Luis y Daniel y sus adaptaciones quedan pendientes hasta realizarlas.

## Ajuste al material de clase

Se sustituyeron clamp(), dvh, margin-inline y colores mediante variables por padding y colores directos. Se agregó header y un h1. El tema Material se carga desde un CSS precompilado, sin escribir Sass. La página usa fuente local y no incluye enlaces a Google Fonts. Estos cambios forman parte de la primera entrega aún sin commit.
