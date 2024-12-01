import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";

interface CategoryId {
    id: number;
    title: string;
    image: string;
    children?: CategoryId[];
}

export const useCatalogGetId = (id: number) => {
    return useQuery<CategoryId[]>({
        queryKey: ['catalogId', id],
        queryFn: () => request.get<CategoryId[]>(`/category/${id}/`).then(res => res.data),
    });
}