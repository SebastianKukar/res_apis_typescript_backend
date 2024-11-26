import express from 'express'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import router from './router'
import db from './config/db'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'

//conectar a base de datos
export async function connectDb() {

    try {
        await db.authenticate()
        
        db.sync()

       console.log(colors.magenta('conectado a la base de datos')) 

    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('hubo un error al conectar a la base de datos') )
    }
}

connectDb()

const server = express()
// Permitir Conexiones 

const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('error de cors'))
        }
    }
}
server.use(cors(corsOptions))

server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server