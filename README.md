PoC using API requested magic links, instead of sending the link via e-mail.

The application is built in Next.js and the login session is handled by Next Auth (JWT without database).

## How to use

Send a POST request to /api/auth/magicLink with the payload:

```
{
    "userId": <some numeric id>,
    "apiKey": <the api key set in .env>
}
```

Click the link in the response.
