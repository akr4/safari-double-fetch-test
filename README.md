# Safari double fetch test
A small demo app to reproduce Safari fetches twice.

## Background
I found that Safari somehow does `fetch` twice in my app even if the code calls it only once. This repo is a reproducer of the behavior.

When you hit `http://localhost:5000`, you will see logs like the following:

```
nginx_1  | 172.18.0.1 - - [24/Jun/2019:00:02:00 +0000] "GET / HTTP/1.1" 200 376 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15"
nginx_1  | 172.18.0.1 - - [24/Jun/2019:00:02:00 +0000] "GET /api/hello HTTP/1.1" 200 12 "http://localhost:4000/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15"
nginx_1  | 172.18.0.1 - - [24/Jun/2019:00:02:00 +0000] "GET /api/hello HTTP/1.1" 200 12 "http://localhost:4000/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15"
```

There're two `/api/hello` calls. These lines are produced by the simple HTML.
```html
<!doctype html>
<html>
  <head>
    <title>Safari double fetch test</title>
<script>
window.onload = () => {
  const div = document.getElementById('result');
  fetch('/api/hello').then(res => {
    res.text().then(t => {
      div.innerHTML = t;
    });
  });
};
</script>
  </head>
  <body>
    <h1>Safari double fetch test</h1>
    <div id="result"></div>
  </body>
</html>
```

## Memo

- Tested with Safari 12.1.1 (14607.2.6.1.1).
- Chrome doesn't do like that.
- Safari's private window also doesn't.

## How to run
1. `docker-compose run`
2. Hit `http://localhost:5000` by Safari
