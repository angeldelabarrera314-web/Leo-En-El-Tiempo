# Guía de Publicación con Dominio Propio e HTTPS

Esta guía te explica cómo publicar **Leo en el Tiempo** en internet de forma independiente a Google AI Studio, con su propio certificado de seguridad SSL gratuito (**HTTPS**) y subdominio personalizado (por ejemplo, `https://leo-en-el-tiempo.vercel.app` o `https://leo-en-el-tiempo.web.app`), así como la opción de conectar un dominio propio (`.com` o `.edu.co`).

---

## Opción 1: Publicar en Vercel (Recomendada - 2 Minutos)

Vercel te permite tener una dirección como `https://leo-en-el-tiempo.vercel.app` completamente gratis y con HTTPS automático.

### Pasos:
1. **Sube el código a GitHub:**
   - Descarga o clona el repositorio del proyecto.
   - Crea un repositorio en tu cuenta de [GitHub](https://github.com) (público o privado) y sube los archivos.

2. **Conecta tu proyecto en Vercel:**
   - Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
   - Haz clic en **"Add New Project"** e importa tu repositorio.
   - Vercel detectará automáticamente que es un proyecto **Vite**.

3. **Configura las Variables de Entorno (Environment Variables):**
   - En la sección **Environment Variables** antes del despliegue, añade tu clave de IA de Gemini si vas a utilizar funciones de servidor:
     - `GEMINI_API_KEY`: Tu clave de Google AI Studio.

4. **Haz clic en "Deploy":**
   - Vercel compilará la aplicación y en menos de 1 minuto te entregará tu enlace público seguro:
     `https://leo-en-el-tiempo.vercel.app` (o el nombre que elijas en los ajustes del proyecto).

---

## Opción 2: Publicar en Firebase Hosting (Directo desde Google)

Dado que este proyecto ya cuenta con Firebase configurado (`manifest-tribute-rcbh2`), puedes usar Firebase Hosting para tener un subdominio `https://leo-en-el-tiempo.web.app`.

### Pasos:
1. **Instala Firebase CLI en tu computador:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicia sesión con tu cuenta de Google:**
   ```bash
   firebase login
   ```

3. **Genera la versión de producción:**
   ```bash
   npm run build
   ```

4. **Despliega a Firebase Hosting:**
   ```bash
   firebase deploy --only hosting
   ```
   Firebase te devolverá tu URL oficial segura con HTTPS:
   - `https://manifest-tribute-rcbh2.web.app`

*(Nota: En la consola de Firebase, en la sección **Hosting > Agregar otro sitio**, puedes crear el alias exacto `leo-en-el-tiempo` si está disponible).*

---

## ¿Cómo conectar un dominio propio comprado (.com o .edu.co)?

Si en el futuro adquieres un dominio como `leoeneltiempo.com` o el colegio dispone de un subdominio como `historia.colegioninojesus.edu.co`:

1. Tanto en **Vercel** (*Settings > Domains*) como en **Firebase Hosting** (*Hosting > Conectar dominio personalizado*):
   - Escribe el nombre de tu dominio.
2. La plataforma te dará dos registros DNS sencillos (tipo `A` o `CNAME`).
3. Cópialos en el panel donde compraste el dominio (GoDaddy, Namecheap, Google Domains, etc.).
4. **En menos de 24 horas** se activará automáticamente el candado verde de seguridad HTTPS sin costo.
