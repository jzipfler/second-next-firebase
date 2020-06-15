import useSWR from 'swr';

const fetcher = async (request: Request | string, init?: RequestInit) => {
    const res = await fetch(request, init);

    return res.json();
};

export default () => {
    const { data, error } = useSWR(`/api/test`, fetcher, {errorRetryCount: 0, refreshWhenHidden: false, refreshInterval: 0, initialData: null});

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
            <p>Project: {data.text}</p>
        </div>
    );
}