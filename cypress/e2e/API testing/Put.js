/// <reference types="Cypress" />


describe('post calls', ()=>{
    let accessToekn = 'd54edc90eaad31dbf88a240ed8bb44fb1da4de1540ac4c6003ac3e97fe7a12e4'
    const dataJson = require('../../fixtures/userdetails.json')
    let randomText= ""
    let testEmail = ""
    let userid

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
                
                    "name": dataJson.name,
                    "email": testEmail,
                    "gender": dataJson.gender,
                    "status": dataJson.status     
            }
        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq(dataJson.name)
            expect(res.body.gender).to.eq(dataJson.gender)
            expect(res.body.status).to.eq(dataJson.status)
            expect(res.body.email).to.eq(testEmail)
            userid = res.body.id
            cy.log(userid)

            // second request GET call

            cy.request({

                method: 'GET',
                url:    '/'+ '/public/v2/users/' +userid,

                headers:{
                    Authorization: 'Bearer ' +accessToekn
                }

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.name).to.eq(dataJson.name)
                expect(res.body.gender).to.eq(dataJson.gender)
                expect(res.body.status).to.eq(dataJson.status)
                expect(res.body.email).to.eq(testEmail)

            })
            cy.request({
                method: 'PATCH',
                url: '/'+ '/public/v2/users/' +userid,
    
                headers: {
                    Authorization: 'Bearer ' +accessToekn
                },
                body: {
                    
                        "name": "Josh",
                        "status":   "inactive",
                        "gender":   "male"
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body.gender).to.eq("male")
                expect(res.body.status).to.eq("inactive")
                expect(res.body.email).to.eq(testEmail)
                expect(res.body.name).to.eq("Josh")

            })
        })
    })
})