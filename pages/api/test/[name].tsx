import firebase from '../../../lib/firebase';
import {NextApiRequest, NextApiResponse, NextPage} from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    // res.json({name: 'bar', population: 900});
    const name: string = Array.isArray(req.query.name) ? '' : req.query.name;
    firebase
        .collection('Cities')
        .where('name', '==', name)
        .get()
        .then((doc) => {
            console.info('in then!!!!!!')
            const allData = doc.docs;
            if (doc.docs.length === 0) {
                res.status(400).json({});
                return;
            }
            const documentData = doc.docs.map(snap => snap.data()).reduce((old, current) => ({name: old.name, population: old.population + current.population}), {name, population: 0});
            console.info(documentData)
            res.status(200).json(documentData);
        })
        .catch((error) => {
            console.info('in error&&&&&&&&&')
            console.info(error)
        });
};