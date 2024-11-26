import request from 'supertest'
import server from '../../server'



describe('POST /api/products', () => {
    jest.setTimeout(30000);
    it('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name:"Monitor Curvo - Testing",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should display validation errors', async() => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })

    it('should validate that the price is a number and greater than 0', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo - testing",
            price: 'hola'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)
    })

    it('should create a new product', async () => {
        jest.setTimeout(30000);
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 400
        })
          expect(response.status).toBe(201)
          expect(response.body).toHaveProperty('data')

          expect(response.status).not.toBe(404)
          expect(response.status).not.toBe(200)
          expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    jest.setTimeout(30000);
    it('should check if api/products url exist', async() => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    it('GET a JSON response with products', async() =>{
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })  
})

describe('GET /api/products/:id', () => {
    jest.setTimeout(30000);
    it('Should return a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })
    it('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/invalid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {
    jest.setTimeout(30000);

    it('should check a valid ID in the URL', async () => {
        const response =  await request(server).put('/api/products/invalid-url').send({
            name:"monitor 20 pulgadas",
            availability:true,
            price:500
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    it('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should validate that the price is a greater than 0', async () => {
        const response = await request(server)
                                        .put('/api/products/1')
                                        .send({
                                            name:"Monitor curvo ",
                                            availability:true,
                                            price: 0
                                        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('precio no Valido')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server)
                                            .put(`/api/products/${productId}`)
                                            .send({
                                            name:"Monitor curvo",
                                            availability:true,
                                            price: 300
                                            })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')


        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product with valid data', async () => {
        const response = await request(server)
                                            .put('/api/products/1')
                                            .send({
                                            name:"Monitor curvo",
                                            availability:true,
                                            price: 300
                                            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')


        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () =>{
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.body).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('should update the product availability', async () =>{
        const response = await request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toBe(404)
        expect(response.body).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid id', async () => {
       const response = await request(server).delete('/api/products/not-valid')
       expect(response.status).toBe(400)
       expect(response.body).toHaveProperty('errors')
       expect(response.body.errors[0].msg).toBe('ID no valido')
       expect(response.body.errors).toHaveLength(1)

       expect(response.status).not.toBe(200)
       expect(response.body).not.toHaveProperty('data') 
    })

    it('should a 404 response for a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.body).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})