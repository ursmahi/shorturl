"use client"
import Head from 'next/head';
import { useState } from 'react';
import { setSmallUrl } from '../utils/pocketbase';
function Home() {
    const [userURL, setUserURL] = useState('');
    const [Invalid, setInvalid] = useState(false);
    const [shortURL, setShortURL] = useState('');
    const [show, setShow] = useState(false);
    const sendReqToShortURL = (urlString) => {
        if (validateURL(urlString)) {
            const url = setSmallUrl(urlString);
            setShortURL(url);
            setInvalid(false);
            setShow(true);
            setUserURL('');

        }
        else {
            setInvalid(true);
            setTimeout(() => {
                setInvalid(false)
            }, 2000)

        }
    }
    const validateURL = (urlString) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // Invalidate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Invalidate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // Invalidate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Invalidate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // Invalidate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // Invalidate fragment locator
        return !!urlPattern.test(urlString);
    }

    

    return (
        <div className='min-h-screen m-0 bg-indigo-50'>
            <Head>
                <title>SMALL URL | KMC.ONE</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className='m-0' style={
                { backgroundColor: '#82B1FF' }
            }>
                <p className='text-white p-2 ml-5 text-2xl font-bold '>SMALL URL</p>
                <p className='text-white -mt-2 ml-8 pb-2 pl-2 pr-2 text-sm font-semibold'> MAKE IT SMALL</p>
            </nav>
            <div className='h-40'>
            </div>
            <div className='flex items-center justify-center flex-col sm:flex-row'>
                <input value={userURL} onChange={(e) => { setUserURL(e.target.value) }} type='text' className='px-3  py-3 w-11/12 sm:w-8/12 md:w-6/12 placeholder-slate-600 text-red-500 relative bg-white rounded-lg text-lg border-0 shadow-lg outline-none focus:outline-none focus:border-2 focus:border-cyan-700' placeholder='Shortern your link' />
                <button onClick={() => {
                    sendReqToShortURL(userURL)
                }} className='rounded-lg p-3 text-white m-2 text-xl w-11/12 sm:w-max' style={{ backgroundColor: '#448AFF' }}>Shorten</button>

            </div>

             {show &&
                <div className="mt-8 flex justify-center   rounded-xl">
                    <p id='copyclip' className='text-xl bg-white  rounded-lg  font-mono min-w-max p-2'>s.kmc.one/{shortURL}</p>

                    <button title='copy' className='p-2  text-white rounded-lg' onClick={() => {
                        navigator.clipboard.writeText(`s.kmc.one/${shortURL}`);
                    }}>
                        <img src='/copy-svgrepo-com.svg' className='w-8 h-8' />
                    </button>
                </div>
            }
            {
                (Invalid) && <p className='text-center text-red-500 text-2xl'>Invalid URL</p>
            }
        </div>
    )
}

export default Home
