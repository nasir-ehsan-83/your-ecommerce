import { ZodError } from 'zod';

export const validateRequest = (schema) => (req, res, next) => {
    try {
        const validatedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        // Mutate existing objects to avoid "read-only" errors
        req.body = validatedData.body;
        Object.assign(req.query, validatedData.query);
        Object.assign(req.params, validatedData.params);

        return next();
    } catch (error) {
        // Use error.issues instead of error.errors for Zod v4+
        if (error instanceof ZodError) {
            return res.status(400).json({
                status: "error",
                errors: error.issues.map(issue => ({
                    field: issue.path.join('.'), 
                    message: issue.message 
                }))
            });
        }

        // Forward non-Zod errors to your global error handler
        return next(error);
    }
}
