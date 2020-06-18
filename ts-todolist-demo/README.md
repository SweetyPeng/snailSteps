# TypeScript TodoList Demo
> typeScript + react + ant design
## 项目初始化步骤
```bash
// 初始化一个 TypeScript 版本的 React 应用
npx create-react-app ts-todolist-demo --template typescript
// 引入ant design
npm install antd
// 定制化操作，为了更好的定制样式和按需引用以减小打包之后的包体积
npm install react-app-rewired customize-cra babel-plugin-import less less-loader@5.0.0
// 安装一个在 Ant Design 4.0 拆分出去的 icons 包，可以用来按需引用 icons，进一步减少最后的打包体积
npm install @ant-design/icons
```
- react-app-rewired：用来定制化 Create React App （CRA)脚手架的一些配置，比如 Webpack、Babel 等，因为 CRA 它是一个封闭的黑盒，不允许开发者直接定制，但有时候我们需要对配置做一些修改，比如这里需要配置 antd 的按需引用。
- customize-cra：是 CRA 在发布 2.0 之后出来的一个辅助 react-app-rewired 更方便定制 CRA 的 Webpack 配置的一个库，它提供了一些开箱即用的 API。
- babel-plugin-import：是配置可供开发者按需引用 antd 组件的一个 Babel 插件
less 和 less-loader：是我们用于定制化 antd 的主题需要的 Webpack loader，因为 antd 使用 less 作为样式化语言。

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- [React documentation](https://reactjs.org/).

- learn from [类型即正义：TypeScript 从入门到实践](https://juejin.im/post/5e8a82d2518825737b4ae3e0#heading-1)
