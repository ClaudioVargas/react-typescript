# Reporte Ejecutivo de Métricas — Palvi

## Decisiones técnicas
- **Framework y lenguaje**: React + TypeScript, por tipado fuerte y escalabilidad.  
- **UI**: Material UI, para acelerar el desarrollo con componentes listos y consistentes.  
- **Gráficos**: Recharts, simple y declarativo para mostrar tendencias de métricas.  
- **Estado y datos**: Hook personalizado `useMetrics` que carga el dataset seleccionado desde `metrics.json`. Se encapsula la lógica en un contexto (`DatasetContext`) para que cualquier componente pueda acceder al dataset activo.  
- **Arquitectura**:  
  - `DatasetSelector`: permite cambiar entre A/B/C/D.  
  - `Dashboard`: renderiza métricas clave en tarjetas.  
  - `MetricCard`: decide color y tendencia según `direction` y valores diarios.  
  - `utils/metrics.ts`: funciones puras para cálculos derivados (ej. win rate, tendencias).  
- **Estructura de carpetas**: modular (`components`, `pages`, `hooks`, `utils`, `types`, `context`, `theme`) para claridad y mantenibilidad.  
- **Decisión de alcance**: se priorizó mostrar métricas actuales y tendencias inmediatas, porque el jefe de ventas tiene solo 5 minutos para decidir dónde poner foco.

## Quedaron pendientes
- **Filtros de rango de fechas**: permitir ver última semana, mes o trimestre.
- **Alertas automáticas**: notificaciones cuando una métrica crítica empeora significativamente (ej. tiempo de respuesta sube 20%).  
- **Exportación**: opción de exportar reporte a PDF/Excel para compartir.  
- **Visualizaciones avanzadas**: gráficos comparativos entre datasets y evolución histórica más detallada.  
- **Mejoras de estilo**: Mejorar apariencia y dejar responsivo.

docker login

# para generar la imagen
docker build -t react-typescript:v1 .  

# generar tag para vincular con repositorios en hub.docker
docker tag [IMAGEN_LOCAL] [TU_USUARIO]/[NOMBRE_REPOSITORIO]:[ETIQUETA]
docker tag react-demo:v1.0 srdarus/react-demo:v1.0
# subir
docker push TU_USUARIO/TU_IMAGEN:VERSION


# para levantar local
docker run -d -p 3000:80 --name react-app react-typescript:v1.0