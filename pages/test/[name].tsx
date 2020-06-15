import { useRouter } from 'next/router';
import useSWR from 'swr';


const fetcher = async (request: Request | string, init?: RequestInit) => {
    const res = await fetch(request, init);

    return res.json();
};

function City() {
    const router = useRouter();
    const { name } = router.query;

    const { data, error } = useSWR(`/api/test/${name}`, fetcher, {errorRetryCount: 0, refreshWhenHidden: false, refreshInterval: 0, initialData: null});

    if (!name) {
        return null;
    }

    if (!data && !error) {
        return 'Loading...';
    }

    if (error) {
        return <div>
            <h1>Error</h1>
            <div>{error.message}</div>
        </div>
    }

    return (
        <div>
            <p>Population: {data.population}</p>
        </div>
    );
}

export default City;