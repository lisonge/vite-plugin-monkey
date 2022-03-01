import { buildUserScriptComment, GrantValueList } from '../src/user_script';

console.log(
  buildUserScriptComment({
    header: {
      author: 'lisonge',
      name: 'name',
      namespace: 'namespace',
      version: '1.0.1',
      description: {
        '': 'default description',
        zh: '描述',
        en: 'description',
        ja: '説明',
        'zh-CN': '描述',
      },
      website: 'https://jestjs.io/zh-Hans/docs/setup-teardown',
      include: [
        'http://www.tampermonkey.net/*',
        /^https:\/\/www\.tampermonkey\.net\/.*$/,
      ],
      require: 'https://juejin.cn/post/6844903800302469128#heading-15',
      resource: {
        svg: 'https://jestjs.io/zh-Hans/docs/setup-teardown',
      },
      connect: ['https://juejin.cn/post/6844903800302469128#heading-15'],
      'run-at': 'context-menu',
      grant: GrantValueList,
      antifeature: [
        {
          type: 'ads',
          description: 'antifeature',
        },
        {
          tag: 'en',
          type: 'tracking',
          description: 'antifeature-tracking',
        },
      ],
    },
    align: 2,
    extra: {
      note: ['2017.05.12-V8.4', '2017.05.05-V8.3'],
    },
  })
);
