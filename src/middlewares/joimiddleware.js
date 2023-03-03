import Joi from "joi";

const joiValidation = (schema, req, res, next) => {
    try {
        //compare
        const { error } = schema.validate(req.body);

        error
            ? res.json({
                status: "error",
                message: error.message,
            })
            : next();
    } catch (error) {
        next(error);
    }
};

// ================admin validation
export const newAdminValidation = (req, res, next) => {
    const schema = Joi.object({
        address: Joi.string().allow("", null),
        email: Joi.string().email({ minDomainSegments: 2 }),
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.string().allow("", null),
    });

    joiValidation(schema, req, res, next);
};
