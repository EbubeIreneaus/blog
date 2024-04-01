export interface NewsType {
    id: string,
    title: string,
    desc: string,
    urlToImage: string,
    url: string,
    published_at: Date,
    src: 'ThirdParty' | 'native',
    category: string
}