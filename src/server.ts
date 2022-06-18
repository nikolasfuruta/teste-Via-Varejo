import App from './app/app-config'

const app = new App().init

app.listen(3000, () => console.log(`Server listening at port ${3000}`))
