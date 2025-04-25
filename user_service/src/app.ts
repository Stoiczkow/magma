import express from 'express';
import { HttpError } from 'http-errors';

import userRoutes from './routes/userRoutes';
import healthRoutes from './routes/healthRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/health', healthRoutes);

app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

export default app;