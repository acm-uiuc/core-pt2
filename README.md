# Yggdrasil: The ACM World Tree

## API Design

### `/auth/`
#### `POST /auth/login`

This route is used to obtain a new JWT token given some login information. This token can then be used to validate requests sent to the server in the future.

##### Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| email     | String | The user's email.    |
| password  | String | The user's password. |

##### Returns

| Return | Type      | Description                             |
| ------ | --------- | --------------------------------------- |
| email  | String    | The logged in user's email.             |
| token  | JWT Token | A JWT token for the authenticated user. |

##### Errors

This request can fail either if the specified user does not exist, the password is incorrect, or if the user has not yet verified their account.
#### `POST /auth/register`

This route is used to register a new user. When this request succeeds, an email will be sent to the user including a link to [verify](#post-authverify) their account.

##### Parameters

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| email     | String | The user's email.    |
| name      | String | The user's name      |
| password  | String | The user's password. |

##### Returns

| Return | Type   | Description                 |
| ------ | ------ | --------------------------- |
| email  | String | The logged in user's email. |
| name   | String | The logged in user's name.  |

##### Errors

This request can fail in the event that a user with the given email already exists, a user attempts to signup with a non `@illinois.edu` email, or if the provided email is otherwise unreachable.

#### `POST /auth/verify`

This route is used to verify a new user. It should be accessible only by a link sent to a registering user's email.

##### Parameters

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| token     | JWT Token | The unique token sent to the user. |

##### Returns

| Return | Type      | Description                        |
| ------ | --------- | ---------------------------------- |
| email  | String    | The verified user's email.         |
| token  | JWT Token | A JWT Token for the verified user. |

##### Errors

This request can fail in the event that an invalid token is provided, or that a user is already verified.

#### `POST /auth/forgot`

This route is used to send a [password reset](#post-authreset) email to a user with the given email.

##### Parameters

| Parameter | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| email     | String | The email of the user who forgot their password. |

##### Returns

| Return | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| email  | String | The email parrotted back to the user |

##### Errors

This request can not fail on the server side to request giving potential bad actors information on what accounts are valid.

#### `POST /auth/reset`

This route is used to reset a user's password. It is only accessible through a unique link sent when a user requests a password reset with [forgot](#post-authforgot).

##### Parameters

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| token     | JWT Token | The unique token sent to the user. |
| password  | String    | The new password for the user      |

##### Returns

| Return | Type      | Description                                            |
| ------ | --------- | ------------------------------------------------------ |
| email  | String    | The user's email.                                      |
| token  | JWT Token | A JWT token for the user who just reset their password |
##### Errors

This request can fail in the event that an invalid token is provided.

### `/user/`

This route holds all user related queries.

### `/admin/`

All admin powers exist here. This includes