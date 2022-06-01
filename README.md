# WelbeX - Notes Service [backend]

### Registration and authorization (JWT)

POST
  /signup [body: username, password, email]  
  /signin [body: username, password]  

### Records Service

POST   /record     [header: x-access-token, body: title, text]  
GET    /records    [header: x-access-token]  
GET    /record/:id [header: x-access-token]  
PUT    /record/:id [header: x-access-token, body: title, text]  
DELETE /record/:id [header: x-access-token]  
DELETE /records    [header: x-access-token]  

### Additionally the mailing service

After registration, the service sends an email to the user.
