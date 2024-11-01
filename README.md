# testtokenauth

# Frontend Project Setup

1. Clone the project: `git clone <URL>`
2. Go to the project folder
3. Install dependencies: `npm ci`
4. Start the service: `npm run dev`

# Backend Project Setup

1. Clone the project: `git clone <URL>`
2. Go to the project folder
3. Create a virtual environment: `python -m venv ./venv`
4. Activate the virtual environment: `source .\venv\bin\activate` or `.\venv\Scripts\Activate.ps1`
5. Install dependencies: `pip install -r requirements.txt`
6. Enter database credentials in the `my.cnf` file
7. Update migrations: `python manage.py makemigrations`
8. If the database is up-to-date with all tables, run `python manage.py migrate --fake`; to reflect changes, use `python manage.py migrate`
9. Finally, run the project: `python manage.py runserver`
10. Access at `http://127.0.0.1:8000/`

# Backend Project

This project uses the pyotp library for generating codes based on TOTP (Time-based One-time Password).

There are two main endpoints available for the developer.

1. `/session/otp/generateToken/` This endpoint (with authenticated session) generates an OTP token that is valid for 60 seconds. After this time, the token is no longer valid.
```json
{
    "token": "705702",
    "time_remaining": 10.161303043365479
}
```

2. `/api/session/otp/useToken/?otp=683153` This endpoint (with authenticated session) accepts the active token sent as a query parameter. This endpoint will return the following information:

```json
{
    "is_valid": true
}
```

_Note:_ There are endpoints to assist in user authentication, which avoids using `client` in query parameters, as authentication and authorization are critical in real-world scenarios.

# Frontend Project

This project has the following views:
1. `/login` - Login is required.
2. `/web_app/dashboard` - Here you’ll find the current token with the remaining time, an input field to use the token, and a table showing the OTP creation date, usage status, and usage date if applicable.

This project uses the following key libraries:

### Key Libraries

1. **React Query**  
   React Query is a library that simplifies asynchronous data management in React applications. It allows for data fetching, caching, and syncing with less effort, enhancing performance and user experience.

   *In this project*, React Query is used to manage the requests for generating and validating OTP tokens, ensuring the frontend stays in sync with the backend without needing manual page refreshes.

2. **Zustand**  
   Zustand is a lightweight library for managing global state in React applications. Unlike Redux, it has a simpler, more direct API.
   *In this project*, Zustand is used to manage the state of generated tokens and share them across different components in the app.

3. **React-hook-form**  
   React Hook Form provides efficient form handling in React, with built-in validations and support for optimizing complex forms.

   *In this project*, React Hook Form is used to manage OTP submission and form validation in the dashboard views.

4. **Axios**  
   Axios is a popular library for making HTTP requests from the frontend, enabling easy interaction with APIs. Features include:

   *In this project*, Axios is used to make requests to the backend for generating and using OTP tokens.
