import {NextApiResponse} from 'next';

export default (_, res: NextApiResponse) => {
    res.status(200).json({text: process.env.FIREBASE_PROJECT_ID});
}