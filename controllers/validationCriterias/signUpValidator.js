const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 3 and 20 characters.";
const emptyErr = "is required";
const charErr = "must use valid characters";

exports.validateUser = [
    body("firstName")
        .trim()
        .notEmpty().withMessage(`First name ${emptyErr}`)
        .isLength({ min: 3, max: 20 }).withMessage(`First name ${lengthErr}`)
        .isAlpha("en-US", { ignore: " -'" }).withMessage(`First name ${alphaErr}`),

    body("lastName")
        .trim()
        .notEmpty().withMessage(`Last name ${emptyErr}`)
        .isLength({ min: 3, max: 20 }).withMessage(`Last name ${lengthErr}`)
        .isAlpha("en-US", { ignore: " -'" }).withMessage(`Last name ${alphaErr}`),

    body("userName")
        .trim()
        .notEmpty().withMessage(`Username ${emptyErr}`)
        .isLength({ min: 3, max: 20 }).withMessage(`Username ${lengthErr}`)
        .matches(/^[a-zA-Z0-9_]+$/).withMessage(`Username ${charErr}`),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage(
            "Password must be at least 8 characters long"
        )
        .matches(/[A-Z]/).withMessage(
            "Password must contain at least one uppercase letter"
        )
        .matches(/[a-z]/).withMessage(
            "Password must contain at least one lowercase letter"
        )
        .matches(/[0-9]/).withMessage(
            "Password must contain at least one number"
        ),

    body("confirmPassword")
        .notEmpty().withMessage("Please confirm your password")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Passwords do not match"),
];