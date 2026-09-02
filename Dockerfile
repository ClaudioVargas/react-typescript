# ---------- STAGE 1: BUILD ----------
# Node LTS compatible con Vite 8 (requiere ^20.19.0 o >=22.12.0)
FROM node:22-alpine AS build

WORKDIR /app

# 1) Primero SOLO los manifiestos para cachear la capa de dependencias
COPY package.json package-lock.json ./
RUN npm ci

# 2) Copia el resto del código y compila (tsc -b && vite build -> dist/)
COPY . .
RUN npm run build

# ---------- STAGE 2: RUNTIME (Nginx) ----------
FROM nginx:1.27-alpine AS runtime

# Usuario no root (nginx ya existe en la imagen oficial)
# El puerto 80 no requiere privilegios elevados
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de SPA fallback + gzip + cache de estáticos
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
