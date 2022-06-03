export const SET_FIRSTNAME = "SET_FIRSTNAME"
export const SET_LASTNAME = "SET_LASTNAME"
export const SET_PROFILEIMAGE = "SET_PROFILEIMAGE"
export const SET_USERNAME = "SET_USERNAME"
export const SET_LOCATION = "SET_LOCATION"
export const SET_PHONE = "SET_PHONE"
export const SET_BIO = "SET_BIO"
export const SET_EMAIL = "SET_EMAIL"
export const SET_ISPREMIUM = "SET_ISPREMIUM"
export const SET_TOKEN = "SET_TOKEN"
export const SET_USERID = "SET_USERID"
export const SET_USERFIELDS = "SET_USERFIELDS"
export const SET_ISARTIST = "SET_ISARTIST"

export const setFirstName = (firstName: string) => ({
    type:SET_FIRSTNAME,
    payload: firstName,
});

export const setLastName = (lastName: string) => ({
    type:SET_LASTNAME,
    payload: lastName,
});

export const setProfileImage = (profileImage: string) => ({
    type:SET_PROFILEIMAGE,
    payload: profileImage,
});

export const setUsername = (username: string) => ({
    type:SET_USERNAME,
    payload: username,
});

export const setLocation = (location: string) => ({
    type:SET_LOCATION,
    payload: location,
});

export const setPhone = (phone: string) => ({
    type:SET_PHONE,
    payload: phone,
});

export const setBio = (bio: string) => ({
    type:SET_BIO,
    payload: bio,
});

export const setEmail = (email: string) => ({
    type:SET_EMAIL,
    payload: email,
});

export const setIsPremium = (isPremium: boolean) => ({
    type:SET_ISPREMIUM,
    payload: isPremium,
});

export const setIsArtist = (isArtist: boolean) => ({
    type:SET_ISARTIST,
    payload: isArtist,
});

export const setToken = (token: string) => ({
    type:SET_TOKEN,
    payload: token,
});

export const setUserId = (userId: string) => ({
    type:SET_USERID,
    payload: userId,
});

export const setUserFields = (userFields: any) => ({
    type:SET_USERFIELDS,
    payload: userFields,
});