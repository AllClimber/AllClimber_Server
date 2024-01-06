import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const getRoutesFromDB = () => {
    return { 
        routeId: 123,
        routeName: 'mad route',
        placeName: 'the plastic yumchang',
        sectorName: 'B-1'
    }
}

export const getRoutes = (context: Context) => {
    context.response.body = getRoutesFromDB();
}


export const postRoutes = (context: Context) => {
}