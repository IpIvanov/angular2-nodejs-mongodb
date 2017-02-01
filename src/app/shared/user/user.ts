/**
 * User object
 */
export class User {
    username : string;
    password : string;
    email : string;
    location : string;
    info : any;

    constructor(username : string, password : string, email : string, location : string, sex : string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.location = location;
        this.info = {
            sex: sex
        };
    }
}
