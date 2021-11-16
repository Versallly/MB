import MB from './PO/mbpo';
Cypress.on('uncaught:exception', (err, runnable) => false );

describe( 'MB tests', () => {
    const data = require( '../fixtures/data.json' ),
          page = new MB(),
          randomized = Math.floor( Math.random() * 1000000000000 ),
          newUser = {   
            userName: `${data.user.userName}${randomized}`,
            email: `${randomized}${data.user.email}`,
            pass: `${data.user.pass}${randomized}`
          };

    before( () => {
        cy.viewport( 1920, 1080 );
        Cypress.config( 'viewportWidth', 1920 );
        Cypress.config( 'viewportHeight', 1080 );
    });

    it( 'Registration using valid credentials', function(){
        cy.visitAndCheckTitle( data.title.main );
        page.signUpBtn().click();
        cy.title().should( 'eq', data.title.register );
        page.userName().type( newUser.userName );
        page.loginInput().type( newUser.email );
        page.passInput().type( newUser.pass );
        page.registerBtn().click();
        cy.title().should( 'eq', data.title.main );
        page.loggedIn( newUser.userName );
    });

    it( 'UI login with valid credentials', function(){
        cy.visitAndCheckTitle( data.title.main );
        page.signInBtn().click();
        cy.title().should( 'eq', data.title.login );
        page.loginInput().type( newUser.email );
        page.passInput().type( newUser.pass );
        page.loginBtn().click();
        cy.title().should( 'eq', data.title.main );
        page.loggedIn( newUser.userName );
    });

    it( 'API login with valid credentials', function(){
        let userObj; 
        cy.request( 'POST', Cypress.env( 'api_login_url' ), {
            "user": {
              "email": newUser.email,
              "password": newUser.pass
            }
        }).then(
            ( response ) => {
                userObj = response.body.user;
                expect( response.body.user ).to.have.property( 'username', newUser.userName )
            }
        );
        cy.visit( '/', {
            onBeforeLoad ( win ) {
              win.localStorage.setItem( 'user', JSON.stringify( userObj ) )
            },
        });
        page.loggedIn( newUser.userName );
    });


});