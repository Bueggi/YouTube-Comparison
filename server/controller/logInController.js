const GoogleAuth = require('google-auth-library');
const axios = require('axios');
const validateUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=';

exports.authGoogle = async (req, res, next) => {
    if ('POST' != req.method) return await next();
    let googleUserData = {
        name: req.body.profileObj.name,
        id: req.body.profileObj.googleId,
        accessToken: req.body.Zi.access_token,
        profile_picture: req.body.profileObj.imageUrl
    };

    let authResult = await axios.get(
        validateUrl + req.body.tokenId, {
            headers: {
                Authorization: 'Bearer ' + googleUserData.accessToken
            }
        }
    );

    if (authResult.data.sub == googleUserData.id) {
        res.send(JSON.stringify({
            accessToken: googleUserData.accessToken
        }));
    } else res.status = 404;
};

exports.login = async (req, res, next) => {
    if ('GET' != req.method) return await next();
    res.send(res.user);
};