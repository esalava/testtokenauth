# testtokenauth

# Configuración proyecto frontend

1. Para clonar el proyecto `git clone <URL>`
2. Dirigirse a la carpeta del proyecto
3. Instalar dependencias `npm ci`
4. Iniciar servicio `npm run dev`

# Configuración proyecto backend

1. Para clonar el proyecto `git clone <URL>`
2. Dirigirse a la carpeta del proyecto
3. Crear un entorno virtual `python -m venv ./venv`
4. Activar el entorno virtual `source .\venv\bin\activate` o  `.\venv\Scripts\Activate.ps1`
5. Instalar dependencias: `pip install -r requirements.txt`
6. Ingresar las credenciales de la base de datos en el archivo `my.cnf`
7. Actualizar migraciones: `python manage.py makemigrations`
8. Si es una base de datos actualizada con todas las tablas ejecutar `python manage.py migrate --fake`, si quiere reflejar cambios utilizar `python manage.py migrate`
9. Finalmente, ejecutar el proyecto `python manage.py runserver`
10. Acceder a `http://127.0.0.1:8000/`

# Proyecto backend

Este proyecto utiliza la librería pyotp encargada de la generación de los códigos basados en TOTP (_Time-based One-time Password_).

Para el desarrollador se brindan dos endpoints principales.

1. `/session/otp/generarToken/` Con este endpoint (con sesión autenticada) se genera un token OTP que tiene un tiempo de validez durante 60 segundos. Luego de este tiempo, el token no es válido.
```json
{
    "token": "705702",
    "time_remaining": 10.161303043365479
}
```

2. `/api/session/otp/usarToken/?otp=683153` Con este endpoint (con sesión autenticada) se envía por query params el token vigente. Este endpoint retornará la siguiente información:

```json
{
    "is_valid": true
}
```

_Nota:_ Existen endpoints que ayudan a la autenticación del usuario. De esta manera, evitamos el uso de `cliente` en los query params, ya que en situaciones reales es imperante el uso de autenticación y autorización.

# Proyecto frontend

Este proyecto cuenta con las siguientes vistas:
1. `/login` Se necesita el inicio de sesión.
2. `/web_app/dashboard` Aquí encontraremos el token actual con el tiempo restante del mismo, un input para utilizar el token, y una tabla en donde se muestra la fecha de creación de los OTPs, si ha sido utilizado o no y en qué fecha.

Este proyecto cuenta con librerías importantes como:

### Librerías Clave

1. **React Query**  
   React Query es una librería que simplifica el manejo de datos asíncronos en aplicaciones React. Permite la recuperación, almacenamiento en caché y sincronización de datos del servidor con menos esfuerzo, mejorando el rendimiento y la experiencia del usuario.

   *En este proyecto*, React Query se utiliza para manejar las peticiones de generación y validación de los tokens OTP, asegurando que el frontend esté sincronizado con el backend sin necesidad de recargar la página manualmente.

2. **Zustand**  
   Zustand es una librería ligera para gestionar el estado global de la aplicación en React. A diferencia de Redux, tiene una API más simple y directa. 
   *En este proyecto*, Zustand se usa para manejar el estado de los tokens generados y compartirlos entre los diferentes componentes de la aplicación.

3. **React-hook-form**  
   React Hook Form permite un manejo eficiente de formularios en React, con validaciones integradas y soporte para optimizar el rendimiento de formularios complejos.

   *En este proyecto*, React Hook Form se utiliza para manejar el envío de OTPs y la validación de formularios en las vistas del dashboard.

4. **Axios**  
   Axios es una librería popular para realizar peticiones HTTP desde el frontend, permitiendo interactuar con APIs de manera sencilla. Sus características incluyen:

   *En este proyecto*, Axios se utiliza para hacer peticiones al backend, tanto para la generación como para el uso de los tokens OTP.

