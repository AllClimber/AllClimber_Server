import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { 
    getRoutes, 
} from "./database/firestore-handler.ts";

export const router = new Router();

router.get('/', (context) => {
    context.response.body = "Hello, All Climbers";
})
.get('/routes', getRoutes);

