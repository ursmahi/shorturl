import PocketBase from 'pocketbase';
const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);


const generateRandomSixDigitAlphanumeric = () => {
    return Math.random().toString(36).substring(2, 8);
}


const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

export function setSmallUrl(longUrl) {
    if (validateUrl(longUrl)) {

        const smallUrl = generateRandomSixDigitAlphanumeric();
        if (!longUrl.match(/^(?:http|https):\/\//)) {
            longUrl = 'http://' + longUrl;
        }
        client.records.create('link', {
            url: longUrl,
            shorturl: smallUrl
        });
        console.log('smallUrl', smallUrl);
        return smallUrl;
    }
    return false;

}



export async function getLongUrl(shortUrl) {
    const resultList = await client.records.getList('link', 1, 50, {
        sort: '-created',
    });
    const result = resultList.items.find(item => item.shorturl === shortUrl);
    return result ? result.url : 0;

}