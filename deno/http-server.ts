import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { router } from "./router.ts"; // router.ts에서 라우터를 가져옵니다

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is listening port 3000`);
await app.listen({ port: 3000 });
