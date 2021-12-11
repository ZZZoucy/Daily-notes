# vue-evernote-client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 设置自动化上传脚本 —— 修改 pacakage.json, 加入如下 script
    ```
    "scripts": {
        "upload": 
            "
            cd dist; git init; git remote remove origin; 
            git remote add origin git@github.com:ZZZoucyDaliy-notes-website.git;
            git add . ; git commit -am \"modify\";
            git branch -M main && git push -u origin main && exit 0
            "
    },
    ```

# build for production with minification
npm run build
npm run upload



For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
