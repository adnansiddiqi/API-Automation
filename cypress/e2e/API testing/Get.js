// /// <reference types="Cypress" />

// describe('api testing suite', ()=>{

//     it('get list of all users', ()=>{
//         cy.request({
//             method: 'GET',
//             url: '/'+'/public/v2/users',

//             headers: {
//                 Authorization: 'Bearer d54edc90eaad31dbf88a240ed8bb44fb1da4de1540ac4c6003ac3e97fe7a12e4'
//             }
//         }).then((res)=>{
//             expect(res.status).to.eq(200)
//         })
//     })

//     it('get details of one user', ()=>{
//         cy.request({
//             method: 'GET',
//             url: '/'+'/public/v2/users/3532615',

//             headers: {
//                 Authorization: 'Bearer d54edc90eaad31dbf88a240ed8bb44fb1da4de1540ac4c6003ac3e97fe7a12e4'
//             }
//         }).then((res)=>{
//             expect(res.status).to.eq(200)
//             expect(res.body.id).to.eq(3532615)
//             expect(res.body.gender).to.eq("male")
//             expect(res.body.status).to.eq("active")
//         })

//     })
// })