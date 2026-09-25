import dotenv from 'dotenv';
dotenv.config();

class LoginPage {
    constructor(page) {
        this.page = page;

        //locators
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-passowrd-input');
        this.nextButton = page.getByTestId('login-next-button');
    }


    async login() {

        // Fill in the login form
        await this.page.goto('https://rcsi-tst.avotech.com/Login');
        await this.emailInput.fill(process.env.UserName);
        await this.nextButton.click();
        await this.passwordInput.fill(process.env.Password);
        await this.nextButton.click();
    }

}

export default LoginPage;