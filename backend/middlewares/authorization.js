let jwt = require("jsonwebtoken")

exports.authorization = (request, response, next) => {
    let header = request.headers.authorization
    let token = header && header.split(" ")[1]

    if (token ==  null) {
        return response.json({
            message: `Unauthorized`
        })
    } else {
        let secretKey = `secret key`

        jwt.verify(token, secretKey, (error) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    return response.status(401).json({
                        message: 'Token has expired'
                    })
                } else {
                    return response.status(401).json({
                        message: 'Invalid Token'
                    })
                }
            } else {
                next()
            }
        })
    }
}
