import 'dotenv/config'
import mongoose from 'mongoose'

const URL = process.env.MONGODB_URI

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose
            .connect(URL)
            .then(() => console.log('database connection established'))
            .catch((err) => console.log('error occured', err))
    }
}

export default new Database()
