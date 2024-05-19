import { Data } from "../../Data"
const getData = async (): Promise<Data[] | void> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data: Data[] = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export { getData }