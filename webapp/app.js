const express = require('express')
const mongoose = require('mongoose')
const config = require('config');

const app = express()

app.use(express.json({ extended: true }))

app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});
// app.use('/', require('./server/routes/index'))
app.use('/api/product', require('./server/routes/product'))
app.use('/api/reviews', require('./server/routes/reviews'))

const { PORT = 3000 } = process.env;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log("Server error", e.message)
        process.exit(1)
    }
}

start()

