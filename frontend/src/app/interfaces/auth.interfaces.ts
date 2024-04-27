import {Email} from "./shared.interfaces";

export interface authForm extends Email {
  password: string
}

export interface TokenRefresh {
  refresh: string
}

export interface TokenAccess {
  access: string
}

export interface TokenVerify {
  token: string
}

export interface TokenPairObtain extends TokenAccess, TokenRefresh {

}

