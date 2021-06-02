# yurl.pub
yurl.pub is Next Generation Free Modern URL Shortener.
# run on development
> npm install
> 
> npm run dev
# run on production
> npm run build
> 
> npm run serve
# run on docker 
> docker build -t yurl-pub .
> 
> sudo  docker run -p 8081:3000 -d --restart=always  yurl-pub

# nginx config
```nginx
location /{
    proxy_pass http://127.0.0.1:8081;
}
```
