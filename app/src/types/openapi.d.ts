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
            /**
             * Difficulty
             */
            difficulty: /* Difficulty */ number | null;
            /**
             * Try Count
             */
            try_count: number;
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
         * LeaderboardResponse
         */
        export interface LeaderboardResponse {
            /**
             * Users
             */
            users: /* LeaderboardUserEntry */ LeaderboardUserEntry[];
        }
        /**
         * LeaderboardUserEntry
         */
        export interface LeaderboardUserEntry {
            /**
             * User Id
             */
            user_id: number;
            /**
             * User Nickname
             */
            user_nickname: string;
            /**
             * Total Points
             */
            total_points: number;
            /**
             * Levels Completed
             */
            levels_completed: number;
            /**
             * Level Points
             */
            level_points: /* UserLevelPoints */ UserLevelPoints[];
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
            /**
             * Duration
             */
            duration?: /* Duration */ number | null;
        }
        /**
         * LevelSessionResponse
         */
        export interface LevelSessionResponse {
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
            finished_at: /* Finished At */ string /* date-time */ | null;
            /**
             * Completed
             */
            completed: boolean;
            /**
             * Level Key
             */
            level_key: string;
            /**
             * Try Count
             */
            try_count?: /* Try Count */ number | null;
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
         * UserLevelPoints
         */
        export interface UserLevelPoints {
            /**
             * Level Key
             */
            level_key: string;
            /**
             * Level Name
             */
            level_name: string;
            /**
             * Difficulty
             */
            difficulty: number;
            /**
             * Points
             */
            points: number;
            /**
             * Best Time
             */
            best_time: number;
            /**
             * User Best Time
             */
            user_best_time: number;
            /**
             * Completed Sessions
             */
            completed_sessions: number;
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
    namespace ApiStartLevelApiLevelSessionStartLevelKeyPost {
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
            export type $200 = /* LevelSessionResponse */ Components.Schemas.LevelSessionResponse;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
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
    namespace FallbackFullPathGet {
        namespace Parameters {
            /**
             * Full Path
             */
            export type FullPath = string;
        }
        export interface PathParameters {
            full_path: /* Full Path */ Parameters.FullPath;
        }
        namespace Responses {
            export type $200 = string;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetAllLevelsApiLevelGet {
        namespace Responses {
            /**
             * Response Get All Levels Api Level  Get
             */
            export type $200 = /* LevelResponse */ Components.Schemas.LevelResponse[];
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
    namespace GetLeaderboardEndpointApiLevelSessionLeaderboardGet {
        namespace Responses {
            export type $200 = /* LeaderboardResponse */ Components.Schemas.LeaderboardResponse;
        }
    }
    namespace GetLevelCssApiLevelSessionCssLevelKeyFilenameCssGet {
        namespace Parameters {
            /**
             * Filename
             */
            export type Filename = string;
            /**
             * Level Key
             */
            export type LevelKey = "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "n1" | "n2" | "n3" | "n4" | "n5" | "n6" | "n7" | "s1" | "s2" | "s3" | "c1" | "c2" | "c3" | "s4" | "c4" | "e8" | "s5";
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
            filename: /* Filename */ Parameters.Filename;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetLevelHtmlApiLevelSessionHtmlLevelKeyFilenameHtmlGet {
        namespace Parameters {
            /**
             * Filename
             */
            export type Filename = string;
            /**
             * Level Key
             */
            export type LevelKey = "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "n1" | "n2" | "n3" | "n4" | "n5" | "n6" | "n7" | "s1" | "s2" | "s3" | "c1" | "c2" | "c3" | "s4" | "c4" | "e8" | "s5";
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
            filename: /* Filename */ Parameters.Filename;
        }
        namespace Responses {
            export type $200 = string;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetLevelJsApiLevelSessionJsLevelKeyJsGet {
        namespace Parameters {
            /**
             * Different Filename
             */
            export type DifferentFilename = string;
            /**
             * Level Key
             */
            export type LevelKey = "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "n1" | "n2" | "n3" | "n4" | "n5" | "n6" | "n7" | "s1" | "s2" | "s3" | "c1" | "c2" | "c3" | "s4" | "c4" | "e8" | "s5";
            /**
             * Should Obfuscate
             */
            export type ShouldObfuscate = boolean;
        }
        export interface PathParameters {
            level_key: /* Level Key */ Parameters.LevelKey;
        }
        export interface QueryParameters {
            different_filename?: /* Different Filename */ Parameters.DifferentFilename;
            should_obfuscate?: /* Should Obfuscate */ Parameters.ShouldObfuscate;
        }
        namespace Responses {
            export type $200 = string;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetLevelSessionsApiLevelSessionAllGet {
        namespace Responses {
            /**
             * Response Get Level Sessions Api Level Session All Get
             */
            export type $200 = /* LevelSessionResponse */ Components.Schemas.LevelSessionResponse[];
        }
    }
    namespace GetMeApiUserMeGet {
        namespace Responses {
            export type $200 = /* TokenData */ Components.Schemas.TokenData;
        }
    }
    namespace GetN1ResponseApiLevelNetworkN1MessageGet {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace GetN3ResponseApiLevelNetworkN3ResponseGet {
        namespace Parameters {
            /**
             * Reveal Secret
             */
            export type RevealSecret = boolean;
        }
        export interface QueryParameters {
            reveal_secret?: /* Reveal Secret */ Parameters.RevealSecret;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GetN4SecretApiLevelNetworkN4ResponseGet {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace GetN5ResponseApiLevelNetworkN5ResponseGet {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace GetN6SecretJsApiLevelNetworkN6JsSecretJsGet {
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace GetN7ResponseApiLevelNetworkN7WhatIsThePasswordGet {
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
   * get_level_sessions_api_level_session_all_get - Get Level Sessions
   */
  'get_level_sessions_api_level_session_all_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetLevelSessionsApiLevelSessionAllGet.Responses.$200>
  /**
   * get_leaderboard_endpoint_api_level_session_leaderboard_get - Get Leaderboard Endpoint
   */
  'get_leaderboard_endpoint_api_level_session_leaderboard_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetLeaderboardEndpointApiLevelSessionLeaderboardGet.Responses.$200>
  /**
   * api_start_level_api_level_session_start__level_key__post - Api Start Level
   */
  'api_start_level_api_level_session_start__level_key__post'(
    parameters?: Parameters<Paths.ApiStartLevelApiLevelSessionStartLevelKeyPost.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ApiStartLevelApiLevelSessionStartLevelKeyPost.Responses.$200>
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
   * get_level_css_api_level_session_css__level_key___filename__css_get - Get Level Css
   */
  'get_level_css_api_level_session_css__level_key___filename__css_get'(
    parameters?: Parameters<Paths.GetLevelCssApiLevelSessionCssLevelKeyFilenameCssGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetLevelCssApiLevelSessionCssLevelKeyFilenameCssGet.Responses.$200>
  /**
   * get_level_html_api_level_session_html__level_key___filename__html_get - Get Level Html
   */
  'get_level_html_api_level_session_html__level_key___filename__html_get'(
    parameters?: Parameters<Paths.GetLevelHtmlApiLevelSessionHtmlLevelKeyFilenameHtmlGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetLevelHtmlApiLevelSessionHtmlLevelKeyFilenameHtmlGet.Responses.$200>
  /**
   * get_n1_response_api_level_network_n1_message_get - Get N1 Response
   */
  'get_n1_response_api_level_network_n1_message_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN1ResponseApiLevelNetworkN1MessageGet.Responses.$200>
  /**
   * get_n3_response_api_level_network_n3_response_get - Get N3 Response
   */
  'get_n3_response_api_level_network_n3_response_get'(
    parameters?: Parameters<Paths.GetN3ResponseApiLevelNetworkN3ResponseGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN3ResponseApiLevelNetworkN3ResponseGet.Responses.$200>
  /**
   * get_n4_secret_api_level_network_n4_response_get - Get N4 Secret
   */
  'get_n4_secret_api_level_network_n4_response_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN4SecretApiLevelNetworkN4ResponseGet.Responses.$200>
  /**
   * get_n5_response_api_level_network_n5_response_get - Get N5 Response
   */
  'get_n5_response_api_level_network_n5_response_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN5ResponseApiLevelNetworkN5ResponseGet.Responses.$200>
  /**
   * get_n6_secret_js_api_level_network_n6_js_secret_js_get - Get N6 Secret Js
   */
  'get_n6_secret_js_api_level_network_n6_js_secret_js_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN6SecretJsApiLevelNetworkN6JsSecretJsGet.Responses.$200>
  /**
   * get_n7_response_api_level_network_n7_what_is_the_password_get - Get N7 Response
   */
  'get_n7_response_api_level_network_n7_what_is_the_password_get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetN7ResponseApiLevelNetworkN7WhatIsThePasswordGet.Responses.$200>
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
  /**
   * get_all_levels_api_level__get - Get All Levels
   */
  'get_all_levels_api_level__get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetAllLevelsApiLevelGet.Responses.$200>
  /**
   * fallback__full_path__get - Fallback
   */
  'fallback__full_path__get'(
    parameters?: Parameters<Paths.FallbackFullPathGet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.FallbackFullPathGet.Responses.$200>
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
  ['/api/level_session/all']: {
    /**
     * get_level_sessions_api_level_session_all_get - Get Level Sessions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetLevelSessionsApiLevelSessionAllGet.Responses.$200>
  }
  ['/api/level_session/leaderboard']: {
    /**
     * get_leaderboard_endpoint_api_level_session_leaderboard_get - Get Leaderboard Endpoint
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetLeaderboardEndpointApiLevelSessionLeaderboardGet.Responses.$200>
  }
  ['/api/level_session/start/{level_key}']: {
    /**
     * api_start_level_api_level_session_start__level_key__post - Api Start Level
     */
    'post'(
      parameters?: Parameters<Paths.ApiStartLevelApiLevelSessionStartLevelKeyPost.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ApiStartLevelApiLevelSessionStartLevelKeyPost.Responses.$200>
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
  ['/api/level_session/css/{level_key}/{filename}.css']: {
    /**
     * get_level_css_api_level_session_css__level_key___filename__css_get - Get Level Css
     */
    'get'(
      parameters?: Parameters<Paths.GetLevelCssApiLevelSessionCssLevelKeyFilenameCssGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetLevelCssApiLevelSessionCssLevelKeyFilenameCssGet.Responses.$200>
  }
  ['/api/level_session/html/{level_key}/{filename}.html']: {
    /**
     * get_level_html_api_level_session_html__level_key___filename__html_get - Get Level Html
     */
    'get'(
      parameters?: Parameters<Paths.GetLevelHtmlApiLevelSessionHtmlLevelKeyFilenameHtmlGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetLevelHtmlApiLevelSessionHtmlLevelKeyFilenameHtmlGet.Responses.$200>
  }
  ['/api/level/network/n1_message']: {
    /**
     * get_n1_response_api_level_network_n1_message_get - Get N1 Response
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN1ResponseApiLevelNetworkN1MessageGet.Responses.$200>
  }
  ['/api/level/network/n3_response']: {
    /**
     * get_n3_response_api_level_network_n3_response_get - Get N3 Response
     */
    'get'(
      parameters?: Parameters<Paths.GetN3ResponseApiLevelNetworkN3ResponseGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN3ResponseApiLevelNetworkN3ResponseGet.Responses.$200>
  }
  ['/api/level/network/n4_response']: {
    /**
     * get_n4_secret_api_level_network_n4_response_get - Get N4 Secret
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN4SecretApiLevelNetworkN4ResponseGet.Responses.$200>
  }
  ['/api/level/network/n5_response']: {
    /**
     * get_n5_response_api_level_network_n5_response_get - Get N5 Response
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN5ResponseApiLevelNetworkN5ResponseGet.Responses.$200>
  }
  ['/api/level/network/n6/js/secret.js']: {
    /**
     * get_n6_secret_js_api_level_network_n6_js_secret_js_get - Get N6 Secret Js
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN6SecretJsApiLevelNetworkN6JsSecretJsGet.Responses.$200>
  }
  ['/api/level/network/n7_what_is_the_password']: {
    /**
     * get_n7_response_api_level_network_n7_what_is_the_password_get - Get N7 Response
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetN7ResponseApiLevelNetworkN7WhatIsThePasswordGet.Responses.$200>
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
  ['/api/level/']: {
    /**
     * get_all_levels_api_level__get - Get All Levels
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetAllLevelsApiLevelGet.Responses.$200>
  }
  ['/{full_path}']: {
    /**
     * fallback__full_path__get - Fallback
     */
    'get'(
      parameters?: Parameters<Paths.FallbackFullPathGet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.FallbackFullPathGet.Responses.$200>
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
export type LeaderboardResponse = Components.Schemas.LeaderboardResponse;
export type LeaderboardUserEntry = Components.Schemas.LeaderboardUserEntry;
export type LevelResponse = Components.Schemas.LevelResponse;
export type LevelSessionResponse = Components.Schemas.LevelSessionResponse;
export type LoginUserResponse = Components.Schemas.LoginUserResponse;
export type TokenData = Components.Schemas.TokenData;
export type UserLevelPoints = Components.Schemas.UserLevelPoints;
export type ValidationError = Components.Schemas.ValidationError;
