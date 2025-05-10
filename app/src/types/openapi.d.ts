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
         * CategoryEnum
         */
        export type CategoryEnum = "Elements" | "Console" | "Network" | "Sources" | "Performance";
        /**
         * CategoryResponse
         */
        export interface CategoryResponse {
            /**
             * Name
             */
            name: string;
            /**
             * Completed Count
             */
            completed_count: number;
            /**
             * Total Count
             */
            total_count: number;
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
         * LevelResponse
         */
        export interface LevelResponse {
            /**
             * Level Key
             */
            level_key: string;
            category: /* CategoryEnum */ CategoryEnum;
            /**
             * Order In Category
             */
            order_in_category: number;
            /**
             * Difficulty
             */
            difficulty: number;
            /**
             * Completed
             */
            completed: boolean;
            /**
             * In Progress
             */
            in_progress: boolean;
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
            export type CompletedId = string;
        }
        export interface PathParameters {
            completed_id: /* Completed Id */ Parameters.CompletedId;
        }
        namespace Responses {
            export type $200 = /* CompletedLevelResponse */ Components.Schemas.CompletedLevelResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetByCategoryApiLevelLevelCategoryGet {
        namespace Parameters {
            export type LevelCategory = /* CategoryEnum */ Components.Schemas.CategoryEnum;
        }
        export interface PathParameters {
            level_category: Parameters.LevelCategory;
        }
        namespace Responses {
            /**
             * Response Get By Category Api Level  Level Category  Get
             */
            export type $200 = /* LevelResponse */ Components.Schemas.LevelResponse[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetCategoriesApiLevelCategoriesGet {
        namespace Responses {
            /**
             * Response Get Categories Api Level Categories Get
             */
            export type $200 = /* CategoryResponse */ Components.Schemas.CategoryResponse[];
        }
    }
    namespace GetLevelJsApiLevelSessionJsLevelKeyJsGet {
        namespace Parameters {
            /**
             * Level Key
             */
            export type LevelKey = "e1" | "e2" | "e3" | "e4" | "n1" | "s1" | "s2" | "c1" | "c2";
            /**
             * Should Obfuscate
             */
            export type ShouldObfuscate = boolean;
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
        }
        export interface QueryParameters {
            should_obfuscate?: /* Should Obfuscate */ Parameters.ShouldObfuscate;
        }
        namespace Responses {
            export type $200 = string;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetMeApiUserMeGet {
        namespace Responses {
            export type $200 = /* TokenData */ Components.Schemas.TokenData;
        }
    }
    namespace GetN1ResponseApiLevelSessionN1MessageGet {
        namespace Responses {
            export type $200 = any;
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
  /**
   * get_level_js_api_level_session_js__level_key__js_get - Get Level Js
   */
  'get_level_js_api_level_session_js__level_key__js_get'(
    parameters?: Parameters<Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.QueryParameters & Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.Responses.$200>
  /**
   * get_n1_response_api_level_session_n1_message_get - Get N1 Response
   */
  'get_n1_response_api_level_session_n1_message_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetN1ResponseApiLevelSessionN1MessageGet.Responses.$200>
  /**
   * get_categories_api_level_categories_get - Get Categories
   */
  'get_categories_api_level_categories_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCategoriesApiLevelCategoriesGet.Responses.$200>
  /**
   * get_by_category_api_level__level_category__get - Get By Category
   */
  'get_by_category_api_level__level_category__get'(
    parameters?: Parameters<Paths.GetByCategoryApiLevelLevelCategoryGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetByCategoryApiLevelLevelCategoryGet.Responses.$200>
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
  ['/api/level_session/js/{level_key}.js']: {
    /**
     * get_level_js_api_level_session_js__level_key__js_get - Get Level Js
     */
    'get'(
      parameters?: Parameters<Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.QueryParameters & Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLevelJsApiLevelSessionJsLevelKeyJsGet.Responses.$200>
  }
  ['/api/level_session/n1_message']: {
    /**
     * get_n1_response_api_level_session_n1_message_get - Get N1 Response
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetN1ResponseApiLevelSessionN1MessageGet.Responses.$200>
  }
  ['/api/level/categories']: {
    /**
     * get_categories_api_level_categories_get - Get Categories
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCategoriesApiLevelCategoriesGet.Responses.$200>
  }
  ['/api/level/{level_category}']: {
    /**
     * get_by_category_api_level__level_category__get - Get By Category
     */
    'get'(
      parameters?: Parameters<Paths.GetByCategoryApiLevelLevelCategoryGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetByCategoryApiLevelLevelCategoryGet.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Body_login_for_access_token_api_user_login_post = Components.Schemas.BodyLoginForAccessTokenApiUserLoginPost;
export type Body_register_api_user_register_post = Components.Schemas.BodyRegisterApiUserRegisterPost;
export type Body_submit_api_level_session_play__level_key__post = Components.Schemas.BodySubmitApiLevelSessionPlayLevelKeyPost;
export type CategoryEnum = Components.Schemas.CategoryEnum;
export type CategoryResponse = Components.Schemas.CategoryResponse;
export type CompletedLevelResponse = Components.Schemas.CompletedLevelResponse;
export type HTTPValidationError = Components.Schemas.HTTPValidationError;
export type LevelResponse = Components.Schemas.LevelResponse;
export type LoginUserResponse = Components.Schemas.LoginUserResponse;
export type TokenData = Components.Schemas.TokenData;
export type ValidationError = Components.Schemas.ValidationError;
