import {connectDb} from '../server'
import db from '../config/db'
 
jest.mock('../config/db')

describe('connectDB', () => {
    jest.setTimeout(30000)
    it('should handle database conection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('hubo un error al conectar a la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDb()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('hubo un error al conectar a la base de datos'))
    })
})