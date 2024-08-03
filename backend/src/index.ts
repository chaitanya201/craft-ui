import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { apiResponse, CONFIG } from './config/server-config';
import { APIError } from './utils/apiError';
import { authRouter } from './routes/auth';

const app = express();

app.use(cors({ origin: "*", methods: "GET,PUT,POST,PATCH,DELETE" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use( `/auth`,authRouter)


app.all("*", (req, res, next) => {
    const msg = `${req.method} is not available for this server`;
    next(new APIError(msg,500)); // Pass an Error object to next
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError) {
        const response: apiResponse = {
            metadata: { code: err.errorCode, message: err.message },
            data: { message: "", responseData: null }
        };
        res.status(err.errorCode).json(response);
    } else {
        res.status(500).json({
            metadata: { code: 500, message: 'Internal Server Error' },
            data: { message: err.message, responseData: null }
        });
    }
});

app.listen(CONFIG.SERVER_PORT, () => {
    console.log("server started on port ", CONFIG.SERVER_PORT);
});
