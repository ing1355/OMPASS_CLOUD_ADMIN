export const getDashboardTopApi = (adminId) => `/v1/admins/${adminId}/dashboard-top`
export const getDashboardBottomApi = (adminId) => `/v1/admins/${adminId}/dashboard-bottom`

export const getUsersApi = (adminId) => `/v1/admins/${adminId}/users`

export const getAdminsApi = (adminId) => `/v1/admins/${adminId}`
export const addAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins`
export const signUpAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins/signup-token`

export const getApplicationApi = (adminId) => `/v1/admins/${adminId}/applications`
export const getApplicationDetailApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`
export const getNewSecretKeyApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}/secret-key`

export const getBillingKeyApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/billing-key`
export const subscriptionIamportApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/subscription`

export const getLogsApi = (adminId) => `/v1/admins/${adminId}/logs`

export const loginApi = '/v1/login';