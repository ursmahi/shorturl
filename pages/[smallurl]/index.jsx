import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getLongUrl } from '../../utils/pocketbase'
export default function Page({ url }) {
    const router = useRouter();


    return (
        <>
            <h1>Redirecting...{url}  </h1>

        </>
    );
}

export async function getServerSideProps({ params, query }) {
    const { smallurl } = params;
    const longurl = await getLongUrl(smallurl);
    if (longurl) {
        return {
            redirect: {
                destination: longurl,
                permanent: false,
            },
        }
    }
    else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}