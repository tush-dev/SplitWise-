const model = require('../model/schema')
const logger = require('./logger')

const validationError = (message) => {
    var err = new Error(message)
    err.status = 400
    return err
}

const hasValue = (value) => {
    if (typeof value === 'string') {
        return value.trim().length > 0
    }

    if (Array.isArray(value)) {
        return value.length > 0
    }

    return Boolean(value)
}

exports.notNull = (value) => {
    if (hasValue(value))
        return true
    else {
        throw validationError("Please input the required field")
    }
}

exports.emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (typeof email === 'string' && emailRegex.test(email.trim()))
        return true
    else {
        throw validationError("Email validation fail!!")
    }
}

exports.passwordValidation = (pass) => {
    if (typeof pass === 'string' && pass.length >= 8) {
        return true
    }
    throw validationError("Password validation fail!!")
}

exports.currencyValidation = (currency) => {
    if (currency && (currency === "INR" || currency === "USD" || currency === "EUR")) {
        return true
    } else {
        throw validationError("Currency validation fail!!")
    }
}

exports.userValidation = async (email) => {
    var user = await model.User.findOne({
        emailId: email
    })
    if (!user)
        return false
    else
        return true
}

exports.groupUserValidation = async (email, groupId) => {
    var groupMembers

    try {
        groupMembers = await model.Group.findOne({
            _id: groupId
        }, {
            groupMembers: 1,
            _id: 0
        })
    } catch (err) {
        if (err.name !== 'CastError') {
            throw err
        }

        logger.warn([`Group User Valdation fail : Group ID : [${groupId}] | user : [${email}]`])
        return false
    }

    if (!groupMembers || !Array.isArray(groupMembers.groupMembers)) {
        logger.warn([`Group User Valdation fail : Group ID : [${groupId}] | user : [${email}]`])
        return false
    }

    groupMembers = groupMembers['groupMembers']
    if (groupMembers.includes(email))
        return true
    else{
        logger.warn([`Group User Valdation fail : Group ID : [${groupId}] | user : [${email}]`])
        return false
    }
}
