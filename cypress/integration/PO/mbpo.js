class MB{
    loginInput(){
        return cy.get( 'input[type="email"]' );
    }
    passInput(){
        return cy.get( 'input[type="password"]' );
    }
    userName(){
        return cy.get( 'input[type="text"]' );
    }
    loginBtn(){
        return cy.get( 'button' ).contains( 'Sign in' );
    }
    registerBtn(){
        return cy.get( 'button' ).contains( 'Sign up' );
    }
    signInBtn(){
        return cy.contains( 'Sign in' );
    }
    signUpBtn(){
        return cy.contains( 'Sign up' );
    }
    nav(){
        return cy.get( 'nav' );
    }
    loggedIn( userName ){
        this.nav().contains( userName ).should( 'be.visible' );
    }
}

export default MB;