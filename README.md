
## Downloading

```
git clone {repository URL}
```

```
copy .env.example and rename to .env and set up your variables
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```