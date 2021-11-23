export const getDashboardTopApi = (adminId) => `/v1/admins/${adminId}/dashboard-top`
export const getDashboardBottomApi = (adminId) => `/v1/admins/${adminId}/dashboard-bottom`

export const getUsersApi = (adminId) => `/v1/admins/${adminId}/users`

export const getAdminsApi = (adminId) => `/v1/admins/${adminId}`
export const addAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins`
export const updateAdminApi = (adminId) => `/v1/admins/${adminId}`
export const deleteAdminApi = (adminId) => `/v1/admins/${adminId}`
export const checkAdminExistenceApi = (adminId, email) => `/v1/admins/${adminId}/existence/${email}`

export const signUpSubAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins/signup-token`
export const signUpAdminApi = `/v1/admins/signup-token`

export const resetPasswordApi = '/v1/reset-password';
export const resetPasswordVerifyApi = '/v1/reset-password-token';

export const getApplicationApi = (adminId) => `/v1/admins/${adminId}/applications`
export const getApplicationDetailApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`
export const getApplicationDetailLogsApi = (adminId, appId) => `/v1/admins/${adminId}/apps/${appId}/logs`
export const checkApplicationExistenceApi = (adminId, appName) => `/v1/admins/${adminId}/applications/existence/${appName}`
export const getNewSecretKeyApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}/secret-key`
export const updateApplicationApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`
export const deleteApplicationApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`

export const getBillingKeyApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/billing-key`
export const subscriptionIamportApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/subscription`

export const getLogsApi = (adminId) => `/v1/admins/${adminId}/logs`

export const loginApi = '/v1/login';