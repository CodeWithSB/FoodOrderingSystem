let accessToken: string = ''

export const getAccessToken = () => {
    return accessToken;
}

export const setAccessToken = (token: string) => {
    //console.log('SET ACCESS', token);
    accessToken = token;
}
