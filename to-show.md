## Lazy loading

```ts
const ListPage = React.lazy(() => import('./pages/list').then(m => ({default: m.ListPage})));
```
+ 

`<Suspense fallback={<div>Loading...</div>}></Suspense>`
