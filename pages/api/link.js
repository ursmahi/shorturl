import { setSmallUrl } from './../../utils/pocketbase'
export default function handler({ query }, res) {
    const url = query.shortner;
    const getSmallURL = setSmallUrl(url);
    if (getSmallURL) {

        res.status(200).json({ status: 200, message: 'success', data: getSmallURL });
    }
    else {
        res.status(400).json({ status: 400, message: 'failed', data: null, error: 'Invalid URL' });
    }

}

export async function getServerSideProps({ query }) {
    return {
        props: {
            query
        }
    }
}
