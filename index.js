import blogMateData from './plugins/blogMate.js';
import { tocPlugin } from '@vuepress/plugin-toc';
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { viteBundler } from '@vuepress/bundler-vite';
import { copyCodePlugin } from '@vuepress/plugin-copy-code';
import { shikiPlugin } from '@vuepress/plugin-shiki';
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import { containerPlugin } from '@vuepress/plugin-container';
import { getDirname, path } from '@vuepress/utils';
import { gitPlugin } from '@vuepress/plugin-git';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe';
import fs from 'fs';

const defaultConfig = {
  /** 网站标题 */
  title: '李十七的个人博客',
  /** 网站介绍 */
  description: '基于vuepress的的个人博客。李十七的个人博客。个人博客。',
  /** 头部标签 */
  heads: [],
  /** 网站图标 */
  icon: 'assets/logo.png',
  /** 网站logo */
  logo: 'assets/logo.logo',
  /** 自定义容器目录 */
  componentsPath: '',
  /** 多个自定义容器目录 */
  componentsPaths: [],

  /** 首页显示模式：list，introduce */
  homeType: 'list',
  /** 菜单位置：center, left, right, right-right */
  menuAlign: 'center',
  /** 是否显示页面外边框 */
  outline: true,
  /** 评论配置 */
  giscus: {},

  /** 是否默认生成草稿 */
  draft: true,
  /** 是否开启相关推荐 */
  isOpenBlurRecommend: true,
  /** 是否开启自动推荐 */
  maxRecommendQuantity: 5,
  /** 隐藏文件密码 */
  shadowPassword: 'qeqe',
  /** 新文章模板 */
  template: {
    filePath: 'template.md',
    inputs: [
      { name: 'id', defaultValue: '${timestamp}' },
      { name: 'title', inputPrompt: '文章标题', defaultValue: '${filename}' },
      { name: 'description', inputPrompt: '文章描述', defaultValue: '${title}' },
      // { name: 'tags', inputPrompt: '文章标签，多个之间用逗号隔开', defaultValue: '杂记' },
      { name: 'archive', inputPrompt: '文章归档，唯一' },
      { name: 'archiveTitle', inputPrompt: '文章归档目录标题' },
      { name: 'archiveTop', inputPrompt: '文章归档排序，数字越大越靠前' },
      { name: 'shadow', inputPrompt: '是否为隐藏文件：y/n', defaultValue: 'n' },
      { name: 'top', inputPrompt: '是否置顶，数字越大优先级越高' },
    ],
  },
  /** 菜单项 */
  menus: [
    // {
    //     /** 菜单类型 statistics exhibit */
    //     type: 'statistics',
    //     /** 菜单标题 */
    //     name: '标签',
    //     /** 图标 */
    //     icon: '&#xe617;',
    //     /** 菜单描述 */
    //     description: 'tag ∈ [1, N] · one;   one ∈ [0, 5] · tag',
    //     /** statistics 相关属性 */
    //     statistics: {
    //         /** 页面标题 */
    //         pageName: 'tag',
    //         /** 统计的属性名 */
    //         frontName: 'tags',
    //         /** 是否为多值统计属性 */
    //         isMultiple: true,
    //     },
    // },
    // {
    //     type: 'exhibit',
    //     name: '独立',
    //     icon: '&#xe64f;',
    //     description: '独立于本网站的应用、网页、服务、插件等。',
    //     /** exhibit 相关属性 */
    //     exhibit: [
    //         { name: 'Sevg', url: 'https://cosy247.top/sevg', img: 'assets/README/Sevg.png' },
    //         {
    //             name: 'DrinkWater',
    //             url: 'https://github.com/cosy247/DrinkWater',
    //             img: 'assets/README/DrinkWater.png',
    //         },
    //     ],
    // },
  ],
  /** 首页座右铭 */
  mottos: [
    // ['耐心是人生的关键。', 'Patience is the key in life.']
  ],
  /** 首页作者链接 */
  links: [
    // { name: '&#xe673;github', url: 'https://github.com/cosy247' },
  ],

  /** client.js config.enhance */
  enhance() {},
};

export default (pConfig = {}) => {
  const config = { ...defaultConfig, ...pConfig };

  const pageConfig = {
    title: config.title,
    logo: config.logo,
    giscus: config.giscus,
    homeType: config.homeType,
    menuAlign: config.menuAlign,
    outline: config.outline,
    mottos: config.mottos,
    links: config.links,
    isOpenBlurRecommend: config.isOpenBlurRecommend,
    maxRecommendQuantity: config.maxRecommendQuantity,
    shadowPassword: config.shadowPassword,
    countMateNames: config.menus.filter((item) => item.type === 'statistics').map((item) => item.statistics.frontName),
    isArrMateNames: config.menus
      .filter((item) => item.type === 'statistics' && item.statistics.isMultiple)
      .map((item) => item.statistics.frontName),
    menus: config.menus,
  };

  const initOption = {
    port: 2470,
    theme: 'cosy',
    clientConfigFile: path.resolve(getDirname(import.meta.url), './client.js'),
    // 网页信息设置
    title: config.title,
    lang: 'zh-Hans-CN',
    description: config.description,
    head: [
      // ['title', {}, config.title],
      ['link', { rel: 'icon', href: config.icon }],
      ['meta', { 'http-equiv': 'Cache-Control', content: 'max-age=7200' }],
      ...config.heads,
    ],
    // 运行设置
    temp: './.temp',
    cache: './.cache',
    public: './docs',
    dest: './_CosyBlog',
    permalinkPattern: ':raw',
    pagePatterns: ['*.md'],
    bundler: viteBundler({
      viteOptions: {
        resolve: {
          alias: {
            './docs': './',
          },
        },
      },
      vuePluginOptions: {},
    }),
    // 语言设置
    // locales: {
    //   "/": {
    //     lang: "zh",
    //     title: "VuePress",
    //     description: "Vue 驱动的静态网站生成器",
    //   },
    // },
    template: config.template,
    /** client.js config.enhance */
    enhance: config.enhance,
    // 插件
    plugins: [
      gitPlugin({}),
      blogMateData(pageConfig),
      tocPlugin({}),
      activeHeaderLinksPlugin({
        headerLinkSelector: 'a.vuepress-toc-link',
        delay: 0,
        offset: 100,
      }),
      copyCodePlugin({
        selector: '.mdContent div[class*="language-"] pre',
        locales: {
          '/': {
            copied: '😘',
          },
        },
      }),
      shikiPlugin({
        theme: 'one-dark-pro',
      }),
      // https://plugin-md-enhance.vuejs.press/zh/guide/
      mdEnhancePlugin({
        tabs: true,
        echarts: true,
        mermaid: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
      }),
      photoSwipePlugin({
        // 选项
        selector: '.mdContent img',
      }),
    ],
  };

  // componentsPath 属性，目录下注册 md 文档中主键
  const componentsPaths = config.componentsPaths || [];
  if (config.componentsPath) componentsPaths.push(config.componentsPath);
  config.componentsPaths.forEach((componentsPath) => {
    initOption.plugins.push(
      registerComponentsPlugin({
        componentsDir: componentsPath,
      })
    );
    initOption.plugins.push(
      ...fs.readdirSync(componentsPath).map((file) => {
        const [fileName] = file.split('.');
        return containerPlugin({
          type: fileName,
          render: function (tokens, index) {
            if (tokens[index].nesting === 1) {
              const params = tokens[index].info.slice(fileName.length).trim();
              const end = tokens.findIndex((token, i) => i > index && token.type === `container_${fileName}_close`);
              const content = tokens
                .slice(index, end + 1)
                .filter((token) => ['html_block', 'inline'].includes(token.type))
                .map((token) => token.content)
                .join('\n');
              return `<${fileName} 
                :params="decodeURI('${encodeURI(params).replaceAll("'", "\\'")}')"
                :contents="decodeURI('${encodeURI(content).replaceAll("'", "\\'")}')"
              ><template #default>`;
            }
            return `</template></${fileName}>`;
          },
        });
      })
    );
  });

  return initOption;
};
