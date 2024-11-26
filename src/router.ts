import {Router} from 'express'
import {body, param} from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/products'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *             type: object
 *             properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price: 
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *       get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesfull responses
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing
router.get('/', getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: get products by id 
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *           - in: path
 *             name: id
 *             description: the ID of the product to retrieve
 *             required: true
 *             schema: 
 *                  type: integer
 *      responses: 
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *                  
 *              400:
 *                  description: Bad request invalid ID
 */
router.get('/:id', 
    param('id')
      .isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById)
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *      responses:
 *          201: 
 *              description: Succesfull responses
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 *                  
 */
router.post('/', 
     body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
     body('price')
        .isNumeric()
        .withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage("precio no Valido"),
  
    handleInputErrors,
    
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *         - Products
 *      description: Returns the updated Product
 *      parameters: 
 *           - in: path
 *             name: id
 *             description: the ID of the product to retrieve
 *             required: true
 *             schema: 
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              name:
 *                                  type: string
 *                                  example: "Monitor curvo 49 pulgadas"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *      responses: 
 *          200: 
 *              description: Succesfull responses
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid ID or invalid input data
 *          404:
 *             description: Product not found
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
     body('price')
        .isNumeric()
        .withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage("precio no Valido"),
    body('availability') 
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *     summary: Update Product availability
 *     tags:
 *        - Products
 *     description: Returns the updated availability
 *     parameters: 
 *           - in: path
 *             name: id
 *             description: the ID of the product to retrieve
 *             required: true
 *             schema: 
 *                  type: integer
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              availability:
 *                                  type: boolean
 *                                  example: false
 *     responses: 
 *          200: 
 *              description: Succesfull responses
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *             description: Product not found
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors, 
    updateAvailability)
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *       summary: Delete Product
 *       tags:
 *          - Products
 *       description: Deletes a product by a given ID
 *       parameters: 
 *           - in: path
 *             name: id
 *             description: Returns a confirmation message
 *             required: true
 *             schema: 
 *                  type: integer
 *       responses: 
 *          200: 
 *              description: Succesfull responses
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *             description: Product not found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors, 
    deleteProduct)


export default router