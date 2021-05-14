export interface IEmail {
  from: string;
  subject?: string;
  html?: string;
  to: string;
}

export interface IEmailOptions {
  to: string;
  username?: string;
  userId?: string;
  token?: string;
  host: string;
}
