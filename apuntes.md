Coder (generador de diseños con IA)
Actúa como un Ingeniero Frontend Senior experto en React, TypeScript y Tailwind CSS. 
Quiero maquetar en la carpeta @ una vista generica que contenga todos los elementos mas utilizados en una pagina web ejemplo botones, input, h1 h2 h3, card, label principal, label segundario, todo lo que se te ocurra..

Sigue estrictamente estas reglas de desarrollo:
1. TypeScript: Define interfaces explícitas para las props de cada componente. Evita usar 'any'.
2. Modularidad: Divide la maqueta en componentes pequeños y reutilizables dentro de una carpeta /components (ej: Sidebar, Header, StatCard, Table).
3. Diseño con Tailwind: Usa un diseño moderno, limpio, con paleta de colores coherente (ej: slate, indigo y white), bordes redondeados (rounded-xl), espaciados amplios (space-y-6, p-6) y transiciones suaves para estados hover.
4. Interactividad mock: Usa estados de React (useState) para simular interacciones básicas (abrir modales, cambiar pestañas, filtrar datos).
5. Iconos: Usa exclusivamente la librería 'lucide-react'.

Comienza creando la estructura de archivos necesaria y luego escribe los componentes uno por uno.

Usa una escala de espaciado generosa: p-6 o p-8 para contenedores, space-y-6 para flujos verticales.Aplica consistencia en bordes: Todo contenedor debe usar rounded-2xl y border border-slate-100.
Usa sombras sutiles para dar profundidad: shadow-sm en tarjetas, nunca sombras pesadas.

Para Dashboards: “Usa un layout de Grid con grid-cols-1 lg:grid-cols-4 donde la primera columna sea un Sidebar fijo y el resto el contenido principal.”
Para Grillas de tarjetas: “Usa grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.”

Refactorización inmediata: Si el diseño que genera DeepSeek no te convence (por ejemplo, los márgenes son muy pequeños), solo le dices a Cline: "En el componente Sidebar.tsx, cambia el fondo a bg-slate-900 y hazlo colapsable". El modelo corregirá el archivo en segundos.