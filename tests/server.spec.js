const request = require("supertest")
const server = require("../index")

// Requerimiento 1
describe("GET /cafes", () => {
    test('devuelve un codigo 200', async () => {
        const res = await request(server).get('/cafes')
        expect(res.statusCode).toBe(200)
    })
    test('el tipo de dato recibido es un arreglo', async () => {
        const res = await request(server).get('/cafes')
        expect(res.body).toBeInstanceOf(Array)
    })
    test('un arreglo con por lo menos 1 objeto', async () => {
        const res = await request(server).get('/cafes')
        expect(res.body.length).toBeGreaterThan(0)
    })
})

// Requerimiento 2
describe('DELETE /cafes/:id', () => {
    const jwt = "token"
    const idDelCafeAEliminar = 5
    const idCafe = 1
    test('código 404 al eliminar un café con id inexitente', async () => {
        const res = await request(server)
        .delete(`/cafes/${idDelCafeAEliminar}`)
        .set("Authorization", jwt)
        .send()
        expect(res.statusCode).toBe(404)
    })
    // Valor agregado, probando un codigo 200
    test('código 200 al eliminar un café con id exitente', async () => {
        const res = await request(server)
        .delete(`/cafes/${idCafe}`)
        .set("Authorization", jwt)
        .send()
        expect(res.statusCode).toBe(200)
    })
})

// Requerimiento 3
describe('POST /cafes', () => {
    test('agrega un nuevo café y devuelve un código 201', async () => {
        const res = await request(server)
        .post('/cafes')
        .send({id: 5, nombre: 'Arabe'})
        expect(res.statusCode).toBe(201)
    })
})

// Requerimiento 4
describe('PUT /cafes/:id', () => {
    test("PUT -> codigo 400 al actualizar con ID en los parametros distinto al del payload", async () => {
        const response = await request(server)
            .put("/cafes/4")
            .send({ id: 4, nombre: "Latte" })
        expect(response.status).toBe(400)
    })
})
