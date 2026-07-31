export class TokenService {
  static getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  static setTokens(tokens: { access_token: string; refresh_token: string }) {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  }

  static clearTokens() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}
