## Deno - `JavaScript/TypeScript runtime` with secure defaults.

- Refer this doc for `installation` based on your OS
  https://deno.land/manual/getting_started/installation

- Check the version
```
$ deno --version
```

- Update the deno with latest releases

```
$ deno upgrade
```

- Making a http request
```Javascript
const url = Deno.args[0];
const res = await fetch(url);

const body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
```

- The above code can run from deno examples repo with `--allow-net` option

```
$ deno run --allow-net=example.com https://deno.land/std/examples/curl.ts https://example.com
```
