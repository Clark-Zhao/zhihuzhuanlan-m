## 使用技术
1. nodejs(express)
2. mongodb(mongoose) + Robomongo

## express使用笔记
1. 通过应用生成器快速创建一个应用骨架`npm install express-generator -g`
2. express blog-m(创建一个名为blog-m的应用)

### 依赖
1. mongoose
2. js-md5

### api路径
1. 实时保存： `api/drafts/:id`
2. 发布： `api/drafts/:id/publish`
3. 文章列表： `api/posts`
4. 文章页： `api/posts/:id`

## mongdb + mongoose使用笔记
1. 创建数据目录db，例如`c:\data\db`
2. 运行MongoDB服务器，执行mongodb目录的bin目录中执行`mongod.exe`，运行后切勿关闭命令窗口而导致连接断开
3. 新开一个命令窗口，输入`mongo`回车运行