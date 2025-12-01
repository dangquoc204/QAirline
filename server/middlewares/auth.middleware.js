const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const parts = authorization.split(' ');
    const token = parts.length === 2 ? parts[1] : null;
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token hết hạn. Vui lòng đăng nhập lại." });
        }
        return res.status(401).json({ message: "Token không hợp lệ." });
    }
}