import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface Category {
    id: number;
    title: string;
    image: string;
    children?: Category[];
}

export const useCatalogGet = () => {
    return useQuery<Category[]>({
        queryKey: ['catalog'],
        queryFn: () => request.get<Category[]>('./category/').then(res => res.data),
    });
}
