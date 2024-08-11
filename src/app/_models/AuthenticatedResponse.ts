export interface AuthenticatedResponse

  {

    id : string;
    userName :string;
    chID?:number
    expiration :Date;
    roles : string [];
    token: string;
  }