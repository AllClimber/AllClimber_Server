import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getRoutes } from "./controller/route-controller.ts";

export const router = new Router();

router.get('/', (context) => {
    context.response.body = "Hello, World";
})
.get('/routes', getRoutes)
.post('/routes', postRoutes);

