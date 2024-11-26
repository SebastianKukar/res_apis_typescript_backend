import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name:'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title:'REST API Node.js/ Express / Typescript',
            version: "1.0.0",
            description: "API Docs for Products1"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
        content: url('https://1000marcas.net/wp-content/uploads/2019/11/Twitter-Logo-2010.png');
        height: 180x;
        width: auto;
        }
        .swagger-ui .topbar {
                background-color: #2b3b45  ;    
        }
    `,
    customSiteTitle: "Docs REST API Express/Typescript"
}

export default swaggerSpec
export {
    swaggerUiOptions
}
