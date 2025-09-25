# LOMI AI 官网项目

> 基于现代Web技术构建的智能化数据分析平台官网

## 🚀 项目概述

LOMI AI 是一个智能化数据分析平台的官方网站，采用现代Web设计理念，提供优雅的用户体验和全面的功能展示。

### 主要特性

- 🎨 **现代设计**: 基于从素材提取的配色方案，避免AI常用的渐变紫色
- 📱 **响应式布局**: 完美适配桌面端、平板和移动设备
- ⚡ **性能优化**: 图片懒加载、动画优化、资源预加载
- 🎭 **交互丰富**: 滚动动画、鼠标跟随、卡片倾斜等效果
- 🔧 **技术栈**: 纯HTML/CSS/JavaScript，无框架依赖
- ♿ **无障碍**: 支持键盘导航、屏幕阅读器、高对比度模式

## 📁 项目结构

```
lomi-ai-website/
├── assets/                 # 静态资源
│   ├── images/             # 图片文件
│   │   ├── lomi-ai-logo.svg
│   │   ├── favicon.svg
│   │   ├── robot.png
│   │   ├── Bobo.svg
│   │   └── looloomibg.png
│   └── icons/              # 图标文件
│       ├── security.svg
│       ├── chart.svg
│       ├── docs.svg
│       ├── research.svg
│       └── earth.svg
├── css/                    # 样式文件
│   ├── main.css           # 主要样式
│   ├── components.css     # 组件样式
│   └── responsive.css     # 响应式样式
├── js/                     # JavaScript文件
│   ├── main.js            # 主要交互逻辑
│   └── animations.js      # 动画效果
├── components/             # 组件目录（预留）
├── index.html             # 主页面
├── DESIGN_SYSTEM.md       # 设计系统文档
└── README.md              # 项目说明
```

## 🎨 设计系统

### 配色方案

| 颜色名称 | HEX值 | 用途 |
|---------|-------|------|
| 主蓝色 | #246cf9 | 主要品牌色，按钮、链接 |
| 深蓝色 | #097BFD | 强调色，渐变 |
| 辅助绿色 | #16b80d | 成功状态，安全标识 |
| 主背景 | #0f1419 | 页面主背景 |
| 次背景 | #1a1f2e | 区块背景 |
| 卡片背景 | #242938 | 卡片组件背景 |

### 字体系统

- **主标题**: JetBrains Mono - 技术感代码字体
- **正文**: Inter - 现代无衬线字体
- **代码**: Fira Code - 代码显示字体

## 🛠 技术特性

### CSS特性
- CSS自定义属性（变量）
- Flexbox 和 Grid 布局
- 渐变和阴影效果
- 动画和过渡
- 媒体查询响应式设计

### JavaScript特性
- ES6+ 语法
- 模块化编程
- 性能优化的滚动监听
- Intersection Observer API
- 响应式导航菜单
- 动画和交互效果

### 性能优化
- 图片懒加载
- 关键资源预加载
- 动画性能优化
- 滚动事件节流
- 资源压缩

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd lomi-ai-website
```

### 2. 本地开发
由于项目使用纯静态文件，可以直接通过以下方式运行：

#### 方法1: 使用Python内置服务器
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 方法2: 使用Node.js服务器
```bash
# 安装http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

#### 方法3: 使用Live Server (VS Code)
如果使用VS Code，推荐安装Live Server扩展，右键点击index.html选择"Open with Live Server"。

### 3. 访问网站
打开浏览器访问 `http://localhost:8000`

## 📱 响应式断点

| 设备类型 | 屏幕宽度 | 特殊优化 |
|---------|----------|----------|
| 超大屏 | ≥1920px | 内容最大宽度限制 |
| 大屏 | ≥1440px | 三列网格布局 |
| 桌面 | 1024-1439px | 标准布局 |
| 平板 | 769-1023px | 两列网格 |
| 移动端 | ≤768px | 单列布局，移动菜单 |
| 小屏手机 | ≤480px | 紧凑布局 |

## 🎯 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## 📦 部署

### 静态部署
项目可以部署到任何静态文件托管服务：

#### Netlify
1. 将项目推送到Git仓库
2. 连接Netlify到仓库
3. 设置构建目录为根目录
4. 部署

#### Vercel
1. 安装Vercel CLI: `npm i -g vercel`
2. 在项目目录运行: `vercel`
3. 按提示完成部署

#### GitHub Pages
1. 将代码推送到GitHub
2. 在仓库设置中启用GitHub Pages
3. 选择部署分支

### CDN优化
建议使用CDN加速静态资源：

```html
<!-- 字体CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 图片CDN -->
<img src="https://cdn.example.com/images/logo.svg" alt="LOMI AI">
```

## 🔧 自定义配置

### 修改配色
编辑 `css/main.css` 中的CSS变量：

```css
:root {
  --primary-blue: #your-color;
  --accent-green: #your-color;
  /* ... 其他颜色变量 */
}
```

### 添加新页面
1. 复制 `index.html` 作为模板
2. 修改页面内容
3. 更新导航链接
4. 如需要，添加页面特定样式

### 自定义动画
在 `js/animations.js` 中添加新的动画效果：

```javascript
// 添加自定义动画
function customAnimation() {
  // 动画逻辑
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 提交Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 官网: [https://lomi-ai.example.com](https://lomi-ai.example.com)
- 邮箱: contact@lomi-ai.example.com
- GitHub: [https://github.com/lomi-ai](https://github.com/lomi-ai)

## 🙏 致谢

- 设计灵感来源于现代科技公司官网
- 图标素材来自项目素材库
- 字体来自Google Fonts
- 动画灵感来自现代Web设计趋势

---

**LOMI AI** - 构建智能化数据分析平台 🚀