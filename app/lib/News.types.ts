export interface NewsType {
    id: string,
    title: string,
    desc: string,
    urlToImage: string,
    url: string,
    published_at: string,
    src: 'ThirdParty' | 'native',
    category: string
}