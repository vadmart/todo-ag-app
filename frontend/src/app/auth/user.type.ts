import HttpResponse from '../response.type';

type AuthResponse = HttpResponse & {
  access: string
}
export default AuthResponse;
