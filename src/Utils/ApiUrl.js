// export let baseUrl = "http://127.0.0.1:8000";
// export let chatBaseUrl = "http://127.0.0.1:8001";

export let baseUrl = "http://127.0.0.1:8000";
export let chatBaseUrl = "http://127.0.0.1:3000";
export let chatPortUrl = "ws://127.0.0.1:3000/ws/";
export let aiChatPortUrl = "http://127.0.0.1:8080/predict";

export const Api = {
    register: `${baseUrl}/register/`,
    resetPasswordURL: `${baseUrl}/api/change-password/`,
    login: `${baseUrl}/login/`,
    forgetPassword: `${baseUrl}/forget-password/`,
    religions: `${baseUrl}/religions/`,
    community: (id) => `${baseUrl}/community/${id}/religions/`,
    familyNames: (id) => `${baseUrl}/api/family-names/${id}/`,
    profile: (id) => `${baseUrl}/profiles/${id}/`,
    profilePost: `${baseUrl}/profiles/`,
    user: (id) => `${baseUrl}/api/user/${id}/`,
    profileImage: `${baseUrl}/profiles_picture/`,
    getProfile: (id) => `${baseUrl}/profiles_picture/${id}`,
    getLikedUser: (quary) => `${baseUrl}/liked-users/${quary}`,
    getSuccessStoriesAPI: `${baseUrl}/api/success-stories/`,
    allProfile: (quary) => `${baseUrl}/profiles/${quary}`,
    searchProfile: (quary) => `${baseUrl}/search/${quary}`,
    searchCustomProfile: (quary) => `${baseUrl}/api/custom_user/search_by_custom_id/${quary}`,
    userPicturesReq: (id) => `${baseUrl}/api/user-images/${id}/`,
    sendFriendRequest: `${baseUrl}/like/`,
    allNotification: (quary) => `${baseUrl}/user-likerequest/${quary}`,
    acceptFriendReq: (id) => `${baseUrl}/userlikes/${id}/`,
    friendList: (id) => `${baseUrl}/liked-users-likes/${id}/`,
    createChatRoom: `${chatBaseUrl}/rooms/`,
    profilePictureUpdate: (id) => `${baseUrl}/profiles_picture/${id}/`,
    profileDataUpdate: (id) => `${baseUrl}/api/user/${id}/update/`,
    advanceSearch: (quary) => `${baseUrl}/api/profile/advanced/search/${quary}`,
    stripePaymentAPI: `${baseUrl}/stripe/payment/`,
    getSubscriptionAPI: `${baseUrl}/subscriptions/subscriptions/`,
    couponApplyAPI: `${baseUrl}/subscriptions/apply-coupon/`,
    paymentURLAPI: `${baseUrl}/subscriptions/make-payment/`,
    getContactAPI: `${baseUrl}/api/contact-details/`,
    getUserImagesAPI: (id) => `${baseUrl}/api/user-images/${id}/`,
    feedbackAPI: `${baseUrl}/api/contacts/`,
    uploadImageAPI: `${baseUrl}/uploaded_images/`,
    getUserPrefernceAPI: (quary) => `${baseUrl}/api/preferences/${quary}`,
    addUserPrefernceAPI: `${baseUrl}/preferences/`,
    deletePicturesReq: (user_id, pic_id) => `${baseUrl}/delete-image/${user_id}/${pic_id}/`,
    verfyDocumentAPI: `${baseUrl}/documents/`,
    AIMessageAPI: `${aiChatPortUrl}`
}