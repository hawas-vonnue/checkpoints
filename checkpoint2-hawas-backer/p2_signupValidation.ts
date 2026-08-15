type Input = { username?: string; email?: string; age?: number };

class ValidationError extends Error {
    field;
    constructor(field: string, message: string) {
        super(message);
        this.field = field;
    }
}

class RequiredFieldError extends ValidationError {
    constructor(field: string, message: string) {
        super(field, message);
    }
}

class FormatError extends ValidationError {
    constructor(field: string, message: string) {
        super(field, message);
    }
}

function isEmail(email: string) {
    if (!(email.includes(".") && email.includes("@"))) return false;
    let secondpart = email.split("@")[1];
    if (secondpart === "") return false;
    let thirdpart = secondpart.split(".")[1];
    if (thirdpart === "") return false;

    return true;
}

function validateSignup(input: Input) {
    if (!input.username) {
        throw new RequiredFieldError("username", "Required field");
    }
    if (input.username.length < 3)
        throw new FormatError(
            "username",
            "user name length must be higher than 3"
        );
    if (!input.email) throw new RequiredFieldError("email", "Required Field ");

    // let emailReg = new RegExp(/*@*.*/);

    if (!isEmail(input.email))
        throw new FormatError(
            "email",
            "email should be in format something@something.something"
        );

    // if (!emailReg.test(input.email)) {
    //     throw new FormatError(
    //         "email",
    //         "email should be in format something@something.something"
    //     );
    // }

    if (!input.age) throw new RequiredFieldError("age", "required field");
    if (input.age < 13)
        throw new FormatError("age", "age must be equal or above 13");
}

function safeValidateSignup(input: Input) {
    try {
        validateSignup(input);
        return { valid: true };
    } catch (error) {
        if (error instanceof ValidationError) {
            return { valid: false, field: error.field, message: error.message };
        }
    }
}

// modules.export = {
//     validateSignup,
//     safeValidateSignup,
// };

export default { validateSignup, safeValidateSignup };

//--------------------Testing---------------------------------------------
console.log(safeValidateSignup({ username: "ab", email: "x@y.com", age: 20 }));
console.log(safeValidateSignup({ username: "abcd" }));
console.log(safeValidateSignup({ username: "abcd", email: "x@ycom" }));
console.log(safeValidateSignup({ username: "abcd", email: "x@y.com" }));
console.log(
    safeValidateSignup({ username: "abcd", email: "x@y.com", age: 12 })
);
console.log(
    safeValidateSignup({ username: "abcd", email: "x@y.com", age: 20 })
);
