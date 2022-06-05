export default interface AuthErrors {
    email?: boolean | string;
    username: boolean | string;
    password: boolean | string;
    confirmPassword?: boolean | string;
    form: boolean | string;
}
