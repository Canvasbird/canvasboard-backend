const pactum = require("pactum");

// The port number the app is running on
const PORT = 4000;


/*
    Sanity check to see if Pactum is running properly
*/
it("Pactum is working properly.", async () => {
    await pactum.spec().get("http://httpbin.org/status/418").expectStatus(418);
});

/*
    Sanity check to make sure that our API is active
*/
it("The API is active.", async () => { 
    await pactum.spec().get("http://localhost:"+PORT+"/").expectStatus(200);
});
