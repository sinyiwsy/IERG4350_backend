import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
    // fastify.addHook('preSerialization', async (request, reply, payload) => {
    //     console.log(reply.statusCode);
    //     var successCode = 0;
    //     if(reply.statusCode === 200 || reply.statusCode === 201){
    //         successCode = 1;
    //     }
    //     const newPayload = { success : successCode , values: payload }
    //     return newPayload;
    // })
  fastify.decorate("wrappedJSON", wrappedJSON);

  async function wrappedJSON(successCode, payload) {
    return { success : successCode , values: payload};
  }
  
});
