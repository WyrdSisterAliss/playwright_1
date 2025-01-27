/**
 * A helper class.
 * Generates test data
 * This class includes methods to generate different data, like emails, passwords, urls etc.
 */
import { request, APIRequestContext } from 'playwright';
import { faker } from '@faker-js/faker';

export class TestDataHelper {

    /**
     * Generate a random valid email, that starts with alice,
     * Continues with a random alpanumeric string
     * ends with @gmail.com
     * @param {number} length - length of the alpanumeric characters added to the email
     * @returns {string} an email address using the length of added characters.
     */
    getRandomValidEmail(length: number): string {
        return faker.internet.email({ firstName: 'alice+', lastName: faker.string.alphanumeric(length), provider: 'gmail.com' });
    }

    /**
     * Generates a random valid password
     * @returns {string} - a random valid password, default length is 10
     * @param {number} passwordLength - length of the password
     */
    getRandomValidPassword(passwordLength: number = 10): string {
        return faker.string.alphanumeric({ length: passwordLength });
    }

    /**
     * Generate a random valid username
     * @param {number} length - length of the alpanumeric characters added to the email
     * @returns {string} a random username like 'Nettie_Zboncak40'
     */
    getRandomUsername(): string {
        return faker.internet.username();
    }
}
