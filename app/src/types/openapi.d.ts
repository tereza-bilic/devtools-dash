import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Body_login_for_access_token_api_user_login_post
         */
        export interface BodyLoginForAccessTokenApiUserLoginPost {
            /**
             * Grant Type
             */
            grant_type?: /* Grant Type */ string /* password */ | null;
            /**
             * Username
             */
            username: string;
            /**
             * Password
             */
            password: string;
            /**
             * Scope
             */
            scope?: string;
            /**
             * Client Id
             */
            client_id?: /* Client Id */ string | null;
            /**
             * Client Secret
             */
            client_secret?: /* Client Secret */ string | null;
        }
        /**
         * Body_register_api_user_register_post
         */
        export interface BodyRegisterApiUserRegisterPost {
            /**
             * Grant Type
             */
            grant_type?: /* Grant Type */ string /* password */ | null;
            /**
             * Username
             */
            username: string;
            /**
             * Password
             */
            password: string;
            /**
             * Scope
             */
            scope?: string;
            /**
             * Client Id
             */
            client_id?: /* Client Id */ string | null;
            /**
             * Client Secret
             */
            client_secret?: /* Client Secret */ string | null;
        }
        /**
         * Body_submit_api_level_session_play__level_key__post
         */
        export interface BodySubmitApiLevelSessionPlayLevelKeyPost {
            /**
             * Secret
             */
            secret: string;
        }
        /**
         * CompletedLevelResponse
         */
        export interface CompletedLevelResponse {
            /**
             * Id
             */
            id: number;
            /**
             * Started At
             */
            started_at: string; // date-time
            /**
             * Finished At
             */
            finished_at: string; // date-time
            /**
             * Level Key
             */
            level_key: string;
        }
        /**
         * HTTPValidationError
         */
        export interface HTTPValidationError {
            /**
             * Detail
             */
            detail?: /* ValidationError */ ValidationError[];
        }
        /**
         * LoginUserResponse
         */
        export interface LoginUserResponse {
            /**
             * Nickname
             */
            nickname: string;
            /**
             * Access Token
             */
            access_token: string;
        }
        /**
         * TokenData
         */
        export interface TokenData {
            /**
             * User Id
             */
            user_id: number;
            /**
             * User Nickname
             */
            user_nickname: string;
        }
        /**
         * ValidationError
         */
        export interface ValidationError {
            /**
             * Location
             */
            loc: (string | number)[];
            /**
             * Message
             */
            msg: string;
            /**
             * Error Type
             */
            type: string;
        }
    }
}
declare namespace Paths {
    namespace CompletedApiLevelSessionCompletedCompletedIdGet {
        namespace Parameters {
            /**
             * Completed Id
             */
            export type CompletedId = number;
        }
        export interface PathParameters {
            completed_id: /* Completed Id */ Parameters.CompletedId;
        }
        namespace Responses {
            export type $200 = /* CompletedLevelResponse */ Components.Schemas.CompletedLevelResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetMeApiUserMeGet {
        namespace Responses {
            export type $200 = /* TokenData */ Components.Schemas.TokenData;
        }
    }
    namespace LoginForAccessTokenApiUserLoginPost {
        export type RequestBody = /* Body_login_for_access_token_api_user_login_post */ Components.Schemas.BodyLoginForAccessTokenApiUserLoginPost;
        namespace Responses {
            export type $200 = /* LoginUserResponse */ Components.Schemas.LoginUserResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace LogoutApiUserLogoutPost {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace PlayLevelApiLevelSessionPlayLevelKeyGet {
        namespace Parameters {
            /**
             * Level Key
             */
            export type LevelKey = string;
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RegisterApiUserRegisterPost {
        export type RequestBody = /* Body_register_api_user_register_post */ Components.Schemas.BodyRegisterApiUserRegisterPost;
        namespace Responses {
            export type $200 = /* LoginUserResponse */ Components.Schemas.LoginUserResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace SubmitApiLevelSessionPlayLevelKeyPost {
        namespace Parameters {
            /**
             * Level Key
             */
            export type LevelKey = string;
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
        }
        export type RequestBody = /* Body_submit_api_level_session_play__level_key__post */ Components.Schemas.BodySubmitApiLevelSessionPlayLevelKeyPost;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
}

export interface OperationMethods {
  /**
   * login_for_access_token_api_user_login_post - Login For Access Token
   */
  'login_for_access_token_api_user_login_post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.LoginForAccessTokenApiUserLoginPost.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LoginForAccessTokenApiUserLoginPost.Responses.$200>
  /**
   * register_api_user_register_post - Register
   */
  'register_api_user_register_post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterApiUserRegisterPost.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.RegisterApiUserRegisterPost.Responses.$200>
  /**
   * logout_api_user_logout_post - Logout
   */
  'logout_api_user_logout_post'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.LogoutApiUserLogoutPost.Responses.$200>
  /**
   * get_me_api_user_me_get - Get Me
   */
  'get_me_api_user_me_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetMeApiUserMeGet.Responses.$200>
  /**
   * completed_api_level_session_completed__completed_id__get - Completed
   */
  'completed_api_level_session_completed__completed_id__get'(
    parameters?: Parameters<Paths.CompletedApiLevelSessionCompletedCompletedIdGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CompletedApiLevelSessionCompletedCompletedIdGet.Responses.$200>
  /**
   * play_level_api_level_session_play__level_key__get - Play Level
   */
  'play_level_api_level_session_play__level_key__get'(
    parameters?: Parameters<Paths.PlayLevelApiLevelSessionPlayLevelKeyGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.PlayLevelApiLevelSessionPlayLevelKeyGet.Responses.$200>
  /**
   * submit_api_level_session_play__level_key__post - Submit
   */
  'submit_api_level_session_play__level_key__post'(
    parameters?: Parameters<Paths.SubmitApiLevelSessionPlayLevelKeyPost.PathParameters> | null,
    data?: Paths.SubmitApiLevelSessionPlayLevelKeyPost.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SubmitApiLevelSessionPlayLevelKeyPost.Responses.$200>
}

export interface PathsDictionary {
  ['/api/user/login']: {
    /**
     * login_for_access_token_api_user_login_post - Login For Access Token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.LoginForAccessTokenApiUserLoginPost.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LoginForAccessTokenApiUserLoginPost.Responses.$200>
  }
  ['/api/user/register']: {
    /**
     * register_api_user_register_post - Register
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterApiUserRegisterPost.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.RegisterApiUserRegisterPost.Responses.$200>
  }
  ['/api/user/logout']: {
    /**
     * logout_api_user_logout_post - Logout
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.LogoutApiUserLogoutPost.Responses.$200>
  }
  ['/api/user/me']: {
    /**
     * get_me_api_user_me_get - Get Me
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetMeApiUserMeGet.Responses.$200>
  }
  ['/api/level_session/completed/{completed_id}']: {
    /**
     * completed_api_level_session_completed__completed_id__get - Completed
     */
    'get'(
      parameters?: Parameters<Paths.CompletedApiLevelSessionCompletedCompletedIdGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CompletedApiLevelSessionCompletedCompletedIdGet.Responses.$200>
  }
  ['/api/level_session/play/{level_key}']: {
    /**
     * play_level_api_level_session_play__level_key__get - Play Level
     */
    'get'(
      parameters?: Parameters<Paths.PlayLevelApiLevelSessionPlayLevelKeyGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.PlayLevelApiLevelSessionPlayLevelKeyGet.Responses.$200>
    /**
     * submit_api_level_session_play__level_key__post - Submit
     */
    'post'(
      parameters?: Parameters<Paths.SubmitApiLevelSessionPlayLevelKeyPost.PathParameters> | null,
      data?: Paths.SubmitApiLevelSessionPlayLevelKeyPost.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SubmitApiLevelSessionPlayLevelKeyPost.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Body_login_for_access_token_api_user_login_post = Components.Schemas.BodyLoginForAccessTokenApiUserLoginPost;
export type Body_register_api_user_register_post = Components.Schemas.BodyRegisterApiUserRegisterPost;
export type Body_submit_api_level_session_play__level_key__post = Components.Schemas.BodySubmitApiLevelSessionPlayLevelKeyPost;
export type CompletedLevelResponse = Components.Schemas.CompletedLevelResponse;
export type HTTPValidationError = Components.Schemas.HTTPValidationError;
export type LoginUserResponse = Components.Schemas.LoginUserResponse;
export type TokenData = Components.Schemas.TokenData;
export type ValidationError = Components.Schemas.ValidationError;
