import express from 'express';
import { HttpError } from 'http-errors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import healthRoutes from './routes/healthRoutes';

const app = express();

app.use(express.json());

// log timestamps in friendly format
morgan.token('date', () => new Date().toISOString());

// log requestes
app.use(
    morgan(
        '[:date] :method :url :status - :response-time ms - :res[content-length]'
    )
);

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