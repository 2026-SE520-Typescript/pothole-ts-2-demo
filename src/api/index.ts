type UserResponse = {
    jwt: string
}

export class API {

    createUser(login: string, pass: string): Promise<UserResponse> {
        console.log('Create the user:', login, pass);
        // send request to the server
        return Promise.resolve({
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.r41tCRMIxMIFPD373HWsJ5PEjY6zOVAMBIN68j3kC4o'
        });
    }

    login(login: string, pass: string) {
        console.log('Check the user:', login, pass);
        // send request to the server to check whether the user with `login` and `pass` exists
        return Promise.resolve({
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.r41tCRMIxMIFPD373HWsJ5PEjY6zOVAMBIN68j3kC4o'
        });
    }

    check(token: string): Promise<boolean> {
        console.log('Check the token', token);
        return Promise.resolve(true);
    }
}
