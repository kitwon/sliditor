const path = require('path');

const resolve = p => path.resolve(__dirname, '.', p);

/**
 * 设置全局Bem混合和variables变量
 * 只在Vue cli3+ 创建的项目有效，work configure webpack
 *
 * @export
 * @param {*} config
 * @param {string} [procecessorName='sass'] css编译器名字
 */
exports.setResourcesLoader = function setResourcesLoader(
  config,
  procecessorName = 'scss'
) {
  const oneOfMap = config.module.rule(procecessorName).oneOfs.store;
  oneOfMap.forEach(item => {
    item
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        // Or array of paths
        patterns: [resolve('mixins/bem.scss'), resolve('variables/index.scss')]
      })
      .end();
  });
};
