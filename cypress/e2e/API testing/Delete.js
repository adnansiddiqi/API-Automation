/// <reference types="Cypress" />


describe('post calls', ()=>{
    let accessToekn = 'd54edc90eaad31dbf88a240ed8bb44fb1da4de1540ac4c6003ac3e97fe7a12e4'
    let randomText= ""
    let testEmail = ""

    it('create single user', ()=>{

        var pattern = "ABCDEFGHIJKLMNOPabcdefghijklmnop"
        for(var i=0; i<10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random()* pattern.length))
        testEmail = randomText + '@gmail.com'

        // first request POST call
        cy.request({
            method: 'POST',
            url: '/'+'/public/v2/users',

            headers: {
                Authorization: 'Bearer ' +accessToekn
            },
            body: {
                
                    "name": "Automation",
                    "email": testEmail,
                    "gender": "male",
                    "status": "active"
                
            }
        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq("Automation")
            expect(res.body.gender).to.eq("male")
            expect(res.body.status).to.eq("active")
            expect(res.body.email).to.eq(testEmail)
            const userid = res.body.id
            cy.log(userid)
            cy.wrap(userid).as('userid')
            })

            // secodn request Delete call
             cy.get('@userid').then((userid)=>{
                cy.request({
                    method:     'DELETE',
                    url:    '/'+ '/public/v2/users/' +userid,
                    headers:    {
                        Authorization: 'Bearer ' +accessToekn
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(204)
                })
                cy.request({
                    failOnStatusCode: false,
                    method:     'GET',
                    url:        '/'+'/public/v2/users/' + userid,
                    headers:    {
                        Authorization: 'Bearer ' +accessToekn
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(404)
                    expect(res.body.message).to.eq("Resource not found")
                })
             })   
            
    })


})