import api from "../services/routes";
import publicIp from "public-ip";
import jwt from "jsonwebtoken";

export const login = async (username, password, userType) => {
    let ip;
    ip = await ipAddress();

    const payload = { username, password, ip };
    const login = await api
        .login(payload)
        .then((res) => {
            const token = res.data.data.token;
            const tokenVerified = verifyToken(token);
            document.cookie = `token=${res.data.data.token}`;
            document.cookie = `role=${tokenVerified.user_type}`;
            return true;
        })
        .catch((err) => {
            return false;
        });

    return login;
};

export const logout = () => {
    const token = { token: getCookie("token") }
    api.logout(token)
        .then((res) => {
            document.cookie = `token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
            document.cookie = `role= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        })
        .then(() => {
            window.location.href = "/admin";
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getCookie = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
};

export const verifyToken = (token) => {
    const verified = jwt.verify(
        token,
        process.env.REACT_APP_JWT_KEY,
        (err, decoded) => {
            if (err) {
                return false;
            }
            return decoded;
        }
    );

    return verified;
};

export const checkSession = () => {
    const cookieToken = getCookie("token");

    if (!cookieToken) {
        return false;
    } else {
        return true;
    }
};

export const ipAddress = async () => await publicIp.v4();

const session = {
    login,
    logout,
    ipAddress,
    checkSession,
    getCookie,
    verifyToken,
};

export default session;
