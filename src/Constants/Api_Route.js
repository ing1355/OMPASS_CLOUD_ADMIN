export const getDashboardTopApi = (adminId) => `/v1/admins/${adminId}/dashboard-top`
export const getDashboardMiddleApi = (adminId) => `/v1/admins/${adminId}/dashboard-middle`
export const getDashboardBottomApi = (adminId) => `/v1/admins/${adminId}/dashboard-bottom`
export const getOMSDashboardTopApi = (adminId) => `/v1/admins/${adminId}/oms-dashboard-top`

export const getCustomPoliciesApi = (adminId) => `/v1/admins/${adminId}/custom-policies`
export const addCustomPolicyApi = (adminId) => `/v1/admins/${adminId}/custom-policy`
export const getCustomPolicyApi = (adminId,policyId) => `/v1/admins/${adminId}/custom-policy/${policyId}`
export const updateCustomPoliciesApi = (adminId,policyId) => `/v1/admins/${adminId}/custom-policy/${policyId}`
export const deleteCustomPoliciesApi = (adminId,policyId) => `/v1/admins/${adminId}/custom-policy/${policyId}`
export const getDefaultPolicyApi = (adminId) => `/v1/admins/${adminId}/default-policy`
export const getGlobalPolicyApi = (adminId) => `/v1/admins/${adminId}/global-policy`
export const updateGlobalPolicyApi = (adminId) => `/v1/admins/${adminId}/global-policy`
export const isExistencePolicyApi = (adminId, title) => `/v1/admins/${adminId}/custom-policy/${title}/existence`

export const getUsersApi = (adminId) => `/v1/admins/${adminId}/users`
export const updateByPassApi = (adminId, appId, userId) => `/v1/admins/${adminId}/applications/${appId}/users/${userId}/by-pass`

export const getAdminsApi = (adminId) => `/v1/admins/${adminId}`
export const updateAdminApi = (adminId) => `/v1/admins/${adminId}`
export const deleteAdminApi = (adminId) => `/v1/admins/${adminId}`
export const signUpAdminApi = `/v1/admins/signup-token`
export const update2faApi = (adminId) => `/v1/admins/${adminId}/2fa`

export const addSubAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins`
export const updateSubAdminApi = (adminId, subAdminId) => `/v1/admins/${adminId}/sub-admins/${subAdminId}`
export const deleteSubAdminApi = (adminId, subAdminId) => `/v1/admins/${adminId}/sub-admins/${subAdminId}`
export const signUpSubAdminApi = (adminId) => `/v1/admins/${adminId}/sub-admins/signup-token`
export const checkSubAdminExistenceApi = (adminId, email) => `/v1/admins/${adminId}/existence/${email}`

export const getApplicationApi = (adminId) => `/v1/admins/${adminId}/applications`
export const addApplicationApi = (adminId) => `/v1/admins/${adminId}/applications`
export const getApplicationDetailApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`
export const getApplicationDetailLogsApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}/logs`
export const checkApplicationExistenceApi = (adminId, appName) => `/v1/admins/${adminId}/applications/existence/${appName}`
export const getNewSecretKeyApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}/secret-key`
export const updateApplicationApi = (adminId, appId) => `/v1/admins/${adminId}/applications/${appId}`
export const deleteApplicationApi = (adminId, appIds) => `/v1/admins/${adminId}/applications/${appIds}`

export const getBillingInfoApi = (adminId) => `/v1/admins/${adminId}/billing`
export const getPaymentHistoryApi = (adminId) => `/v1/admins/${adminId}/payment-histories`
export const getBillingKeyApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/billing-key`
export const subscriptionIamportApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/subscription`
export const cancelSubscriptionIamportApi = (adminId) => `/v1/admins/${adminId}/payment-iamport/cancel-subscription`
export const startPaypalApi = (adminId) => `/v1/admins/${adminId}/paypal`

export const getLogsApi = (adminId) => `/v1/admins/${adminId}/logs`

export const loginApi = '/v1/login';
export const resetPasswordApi = '/v1/reset-password';
export const resetPasswordVerifyApi = '/v1/reset-password-token';
export const verifyOMPASSApi = `/v1/verify-ompass`
export const verifyPasswordApi = `/v1/verify-password`