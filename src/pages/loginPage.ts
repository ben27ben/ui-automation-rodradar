import { promises } from "dns";
import { text } from "stream/consumers";
import { setTimeout } from "timers/promises";
import $ from 'jquery'

export class LoginPage {
    constructor(private page:any) {}

    async navigateToLogin(){
        await this.page.goto('https://bo-dev.rodradar.com/');
    }


    async login(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Email' }).fill(username);
        await this.page.getByRole('button', { name: 'toggle password visibility' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await Promise.all([
            this.page.getByRole('button', { name: 'Login' }).click()
        ])
        console.log('navigation was completed');   
    }


    async getCurrentUrl(): Promise<string> {
        return this.page.baseURL();
    }

    async waitForSelector(selector: string, timeout: number = 7000): Promise<void> {
        try {
            await this.page.waitForSelector(selector, {timeout });
            console.log(`----> ${selector}`)
        }
        catch (error) {
            throw new Error (`${timeout}`)
        }
    }
    
}