# Heimdall: The ACM Gatekeeper
Heimdall is the guardian of Bifrost. 

This is a stateless authentication library that consumers apps can use to validate that a user has a valid UIUC email address. 

## API Design

### `/auth/`
### `POST /auth/generate`
This route is used to generated a signed token and email it to the token user. This should be queried by apps that are logging in UIUC students. 

##### Parameters

| Parameter | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| redirect  | URI       | The redirect URI sent in the email. |
| email     | String    | The unverified user's email.        |

##### Returns
Success message. 

##### Errors

This request can fail in the event that a non-UIUC email is provided, or the email fails to send. 


#### `POST /auth/validate`
This route is used to decrypt a signed token. This should be queried by consumer apps that want to validate a token they recieve through an email redirect. 

##### Parameters

| Parameter | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| token     | JWT Token | The unique token sent to the user. |

##### Returns

| Return | Type      | Description                        |
| ------ | --------- | ---------------------------------- |
| email  | String    | The verified user's email.         |

##### Errors

This request can fail in the event that an invalid token is provided. 