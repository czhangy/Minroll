export default interface CurrentUser {
    id: string;
    username: string;
    password?: string;
    builds: string[];
}
