

describe("test login pages", ()=>{

	beforeEach(()=>{
		cy.login("ella-maria100@hotmail.com","mrsoftie");
	});

	it("should allow login", ()=>{

		cy.visit("http://localhost:8080/login");
		console.log(localStorage);

	});


});