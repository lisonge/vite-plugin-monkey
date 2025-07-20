// ==UserScript==
// @name               example
// @name:ja            hentai
// @name:zh            测试_
// @namespace          https://github.com/lisonge
// @version            1.0.1
// @author             lisonge
// @description        default description zh
// @description:zh     描述
// @description:en     description
// @description:ja     説明z
// @description:zh-CN  描述
// @license            MIT
// @icon               https://vitejs.dev/logo.svg
// @homepage           https://github.com/lisonge/vite-plugin-monkey#readme
// @homepageURL        https://github.com/lisonge/vite-plugin-monkey#readme
// @source             https://github.com/lisonge/vite-plugin-monkey.git
// @supportURL         https://github.com/lisonge/vite-plugin-monkey/issues
// @include            /^https:\/\/i\.songe\.li\/.*/
// @match              https://songe.li/
// @require            https://cdn.jsdelivr.net/npm/prettier@3.6.2/standalone.js
// @grant              GM_addElement
// @grant              GM_addStyle
// @grant              GM_cookie
// @grant              unsafeWindow
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const l=document.createElement("style");l.textContent=e,document.head.append(l)})(` @charset "UTF-8";:root{font-family:Inter,Avenir,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:100%}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}.card{padding:2em}#app{max-width:1280px;margin:0 auto;padding:2rem;text-align:center}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}:root{--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary-rgb:64,158,255;--el-color-success-rgb:103,194,58;--el-color-warning-rgb:230,162,60;--el-color-danger-rgb:245,108,108;--el-color-error-rgb:245,108,108;--el-color-info-rgb:144,147,153;--el-font-size-extra-large:20px;--el-font-size-large:18px;--el-font-size-medium:16px;--el-font-size-base:14px;--el-font-size-small:13px;--el-font-size-extra-small:12px;--el-font-family:"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\u5FAE\u8F6F\u96C5\u9ED1",Arial,sans-serif;--el-font-weight-primary:500;--el-font-line-height-primary:24px;--el-index-normal:1;--el-index-top:1000;--el-index-popper:2000;--el-border-radius-base:4px;--el-border-radius-small:2px;--el-border-radius-round:20px;--el-border-radius-circle:100%;--el-transition-duration:.3s;--el-transition-duration-fast:.2s;--el-transition-function-ease-in-out-bezier:cubic-bezier(.645,.045,.355,1);--el-transition-function-fast-bezier:cubic-bezier(.23,1,.32,1);--el-transition-all:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);--el-transition-fade:opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-md-fade:transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-fade-linear:opacity var(--el-transition-duration-fast) linear;--el-transition-border:border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-box-shadow:box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-color:color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-component-size-large:40px;--el-component-size:32px;--el-component-size-small:24px;color-scheme:light;--el-color-primary:#409eff;--el-color-primary-light-3:rgb(121,187,255);--el-color-primary-light-5:rgb(160,207,255);--el-color-primary-light-7:rgb(198,226,255);--el-color-primary-light-8:rgb(217,236,255);--el-color-primary-light-9:rgb(236,245,255);--el-color-primary-dark-2:rgb(51,126,204);--el-color-success:#67c23a;--el-color-success-light-3:rgb(149,212,117);--el-color-success-light-5:rgb(179,225,157);--el-color-success-light-7:rgb(209,237,196);--el-color-success-light-8:rgb(225,243,216);--el-color-success-light-9:rgb(240,249,235);--el-color-success-dark-2:rgb(82,155,46);--el-color-warning:#e6a23c;--el-color-warning-light-3:rgb(238,190,119);--el-color-warning-light-5:rgb(243,209,158);--el-color-warning-light-7:rgb(248,227,197);--el-color-warning-light-8:rgb(250,236,216);--el-color-warning-light-9:rgb(253,246,236);--el-color-warning-dark-2:rgb(184,130,48);--el-color-danger:#f56c6c;--el-color-danger-light-3:rgb(248,152,152);--el-color-danger-light-5:rgb(250,182,182);--el-color-danger-light-7:rgb(252,211,211);--el-color-danger-light-8:rgb(253,226,226);--el-color-danger-light-9:rgb(254,240,240);--el-color-danger-dark-2:rgb(196,86,86);--el-color-error:#f56c6c;--el-color-error-light-3:rgb(248,152,152);--el-color-error-light-5:rgb(250,182,182);--el-color-error-light-7:rgb(252,211,211);--el-color-error-light-8:rgb(253,226,226);--el-color-error-light-9:rgb(254,240,240);--el-color-error-dark-2:rgb(196,86,86);--el-color-info:#909399;--el-color-info-light-3:rgb(177,179,184);--el-color-info-light-5:rgb(200,201,204);--el-color-info-light-7:rgb(222,223,224);--el-color-info-light-8:rgb(233,233,235);--el-color-info-light-9:rgb(244,244,245);--el-color-info-dark-2:rgb(115,118,122);--el-bg-color:#ffffff;--el-bg-color-page:#f2f3f5;--el-bg-color-overlay:#ffffff;--el-text-color-primary:#303133;--el-text-color-regular:#606266;--el-text-color-secondary:#909399;--el-text-color-placeholder:#a8abb2;--el-text-color-disabled:#c0c4cc;--el-border-color:#dcdfe6;--el-border-color-light:#e4e7ed;--el-border-color-lighter:#ebeef5;--el-border-color-extra-light:#f2f6fc;--el-border-color-dark:#d4d7de;--el-border-color-darker:#cdd0d6;--el-fill-color:#f0f2f5;--el-fill-color-light:#f5f7fa;--el-fill-color-lighter:#fafafa;--el-fill-color-extra-light:#fafcff;--el-fill-color-dark:#ebedf0;--el-fill-color-darker:#e6e8eb;--el-fill-color-blank:#ffffff;--el-box-shadow:0px 12px 32px 4px rgba(0,0,0,.04),0px 8px 20px rgba(0,0,0,.08);--el-box-shadow-light:0px 0px 12px rgba(0,0,0,.12);--el-box-shadow-lighter:0px 0px 6px rgba(0,0,0,.12);--el-box-shadow-dark:0px 16px 48px 16px rgba(0,0,0,.08),0px 12px 32px rgba(0,0,0,.12),0px 8px 16px -8px rgba(0,0,0,.16);--el-disabled-bg-color:var(--el-fill-color-light);--el-disabled-text-color:var(--el-text-color-placeholder);--el-disabled-border-color:var(--el-border-color-light);--el-overlay-color:rgba(0,0,0,.8);--el-overlay-color-light:rgba(0,0,0,.7);--el-overlay-color-lighter:rgba(0,0,0,.5);--el-mask-color:rgba(255,255,255,.9);--el-mask-color-extra-light:rgba(255,255,255,.3);--el-border-width:1px;--el-border-style:solid;--el-border-color-hover:var(--el-text-color-disabled);--el-border:var(--el-border-width) var(--el-border-style) var(--el-border-color);--el-svg-monochrome-grey:var(--el-border-color)}.fade-in-linear-enter-active,.fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.fade-in-linear-enter-from,.fade-in-linear-leave-to{opacity:0}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.el-fade-in-linear-enter-from,.el-fade-in-linear-leave-to{opacity:0}.el-fade-in-enter-active,.el-fade-in-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-fade-in-enter-from,.el-fade-in-leave-active{opacity:0}.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter-from,.el-zoom-in-center-leave-active{opacity:0;transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;transform:scaleY(1);transform-origin:center top;transition:var(--el-transition-md-fade)}.el-zoom-in-top-enter-active[data-popper-placement^=top],.el-zoom-in-top-leave-active[data-popper-placement^=top]{transform-origin:center bottom}.el-zoom-in-top-enter-from,.el-zoom-in-top-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;transform:scaleY(1);transform-origin:center bottom;transition:var(--el-transition-md-fade)}.el-zoom-in-bottom-enter-from,.el-zoom-in-bottom-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;transform:scale(1);transform-origin:top left;transition:var(--el-transition-md-fade)}.el-zoom-in-left-enter-from,.el-zoom-in-left-leave-active{opacity:0;transform:scale(.45)}.collapse-transition{transition:var(--el-transition-duration) height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.el-collapse-transition-enter-active,.el-collapse-transition-leave-active{transition:var(--el-transition-duration) max-height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.horizontal-collapse-transition{transition:var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out}.el-list-enter-active,.el-list-leave-active{transition:all 1s}.el-list-enter-from,.el-list-leave-to{opacity:0;transform:translateY(-30px)}.el-list-leave-active{position:absolute!important}.el-opacity-transition{transition:opacity var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-icon-loading{animation:rotating 2s linear infinite}.el-icon--right{margin-left:5px}.el-icon--left{margin-right:5px}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.el-icon{--color:inherit;align-items:center;display:inline-flex;height:1em;justify-content:center;line-height:1em;position:relative;width:1em;fill:currentColor;color:var(--color);font-size:inherit}.el-icon.is-loading{animation:rotating 2s linear infinite}.el-icon svg{height:1em;width:1em}.el-affix--fixed{position:fixed}.el-alert{--el-alert-padding:8px 16px;--el-alert-border-radius-base:var(--el-border-radius-base);--el-alert-title-font-size:14px;--el-alert-title-with-description-font-size:16px;--el-alert-description-font-size:14px;--el-alert-close-font-size:16px;--el-alert-close-customed-font-size:14px;--el-alert-icon-size:16px;--el-alert-icon-large-size:28px;align-items:center;background-color:var(--el-color-white);border-radius:var(--el-alert-border-radius-base);box-sizing:border-box;display:flex;margin:0;opacity:1;overflow:hidden;padding:var(--el-alert-padding);position:relative;transition:opacity var(--el-transition-duration-fast);width:100%}.el-alert.is-light .el-alert__close-btn{color:var(--el-text-color-placeholder)}.el-alert.is-dark .el-alert__close-btn,.el-alert.is-dark .el-alert__description{color:var(--el-color-white)}.el-alert.is-center{justify-content:center}.el-alert--primary{--el-alert-bg-color:var(--el-color-primary-light-9)}.el-alert--primary.is-light{background-color:var(--el-alert-bg-color)}.el-alert--primary.is-light,.el-alert--primary.is-light .el-alert__description{color:var(--el-color-primary)}.el-alert--primary.is-dark{background-color:var(--el-color-primary);color:var(--el-color-white)}.el-alert--success{--el-alert-bg-color:var(--el-color-success-light-9)}.el-alert--success.is-light{background-color:var(--el-alert-bg-color)}.el-alert--success.is-light,.el-alert--success.is-light .el-alert__description{color:var(--el-color-success)}.el-alert--success.is-dark{background-color:var(--el-color-success);color:var(--el-color-white)}.el-alert--info{--el-alert-bg-color:var(--el-color-info-light-9)}.el-alert--info.is-light{background-color:var(--el-alert-bg-color)}.el-alert--info.is-light,.el-alert--info.is-light .el-alert__description{color:var(--el-color-info)}.el-alert--info.is-dark{background-color:var(--el-color-info);color:var(--el-color-white)}.el-alert--warning{--el-alert-bg-color:var(--el-color-warning-light-9)}.el-alert--warning.is-light{background-color:var(--el-alert-bg-color)}.el-alert--warning.is-light,.el-alert--warning.is-light .el-alert__description{color:var(--el-color-warning)}.el-alert--warning.is-dark{background-color:var(--el-color-warning);color:var(--el-color-white)}.el-alert--error{--el-alert-bg-color:var(--el-color-error-light-9)}.el-alert--error.is-light{background-color:var(--el-alert-bg-color)}.el-alert--error.is-light,.el-alert--error.is-light .el-alert__description{color:var(--el-color-error)}.el-alert--error.is-dark{background-color:var(--el-color-error);color:var(--el-color-white)}.el-alert__content{display:flex;flex-direction:column;gap:4px}.el-alert .el-alert__icon{font-size:var(--el-alert-icon-size);margin-right:8px;width:var(--el-alert-icon-size)}.el-alert .el-alert__icon.is-big{font-size:var(--el-alert-icon-large-size);margin-right:12px;width:var(--el-alert-icon-large-size)}.el-alert__title{font-size:var(--el-alert-title-font-size);line-height:24px}.el-alert__title.with-description{font-size:var(--el-alert-title-with-description-font-size)}.el-alert .el-alert__description{font-size:var(--el-alert-description-font-size);margin:0}.el-alert .el-alert__close-btn{cursor:pointer;font-size:var(--el-alert-close-font-size);opacity:1;position:absolute;right:16px;top:12px}.el-alert .el-alert__close-btn.is-customed{font-size:var(--el-alert-close-customed-font-size);font-style:normal;line-height:24px;top:8px}.el-alert-fade-enter-from,.el-alert-fade-leave-active{opacity:0}.el-aside{box-sizing:border-box;flex-shrink:0;overflow:auto;width:var(--el-aside-width,300px)}.el-autocomplete{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;display:inline-block;position:relative;width:var(--el-input-width)}.el-autocomplete__popper.el-popper{background:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-autocomplete__popper.el-popper,.el-autocomplete__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-border-color-light)}.el-autocomplete__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-autocomplete__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-autocomplete__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-autocomplete__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-autocomplete-suggestion{border-radius:var(--el-border-radius-base);box-sizing:border-box}.el-autocomplete-suggestion__wrap{box-sizing:border-box;max-height:280px;padding:10px 0}.el-autocomplete-suggestion__list{margin:0;padding:0}.el-autocomplete-suggestion li{color:var(--el-text-color-regular);cursor:pointer;font-size:var(--el-font-size-base);line-height:34px;list-style:none;margin:0;overflow:hidden;padding:0 20px;text-align:left;text-overflow:ellipsis;white-space:nowrap}.el-autocomplete-suggestion li.highlighted,.el-autocomplete-suggestion li:hover{background-color:var(--el-fill-color-light)}.el-autocomplete-suggestion li.divider{border-top:1px solid var(--el-color-black);margin-top:6px}.el-autocomplete-suggestion li.divider:last-child{margin-bottom:-6px}.el-autocomplete-suggestion.is-loading li{color:var(--el-text-color-secondary);font-size:20px;height:100px;line-height:100px;text-align:center}.el-autocomplete-suggestion.is-loading li:after{content:"";display:inline-block;height:100%;vertical-align:middle}.el-autocomplete-suggestion.is-loading li:hover{background-color:var(--el-bg-color-overlay)}.el-autocomplete-suggestion.is-loading .el-icon-loading{vertical-align:middle}.el-avatar{--el-avatar-text-color:var(--el-color-white);--el-avatar-bg-color:var(--el-text-color-disabled);--el-avatar-text-size:14px;--el-avatar-icon-size:18px;--el-avatar-border-radius:var(--el-border-radius-base);--el-avatar-size-large:56px;--el-avatar-size-small:24px;--el-avatar-size:40px;align-items:center;background:var(--el-avatar-bg-color);box-sizing:border-box;color:var(--el-avatar-text-color);display:inline-flex;font-size:var(--el-avatar-text-size);height:var(--el-avatar-size);justify-content:center;outline:none;overflow:hidden;text-align:center;width:var(--el-avatar-size)}.el-avatar>img{display:block;height:100%;width:100%}.el-avatar--circle{border-radius:50%}.el-avatar--square{border-radius:var(--el-avatar-border-radius)}.el-avatar--icon{font-size:var(--el-avatar-icon-size)}.el-avatar--small{--el-avatar-size:24px}.el-avatar--large{--el-avatar-size:56px}.el-backtop{--el-backtop-bg-color:var(--el-bg-color-overlay);--el-backtop-text-color:var(--el-color-primary);--el-backtop-hover-bg-color:var(--el-border-color-extra-light);align-items:center;background-color:var(--el-backtop-bg-color);border-radius:50%;box-shadow:var(--el-box-shadow-lighter);color:var(--el-backtop-text-color);cursor:pointer;display:flex;font-size:20px;height:40px;justify-content:center;position:fixed;width:40px;z-index:5}.el-backtop:hover{background-color:var(--el-backtop-hover-bg-color)}.el-backtop__icon{font-size:20px}.el-badge{--el-badge-bg-color:var(--el-color-danger);--el-badge-radius:10px;--el-badge-font-size:12px;--el-badge-padding:6px;--el-badge-size:18px;display:inline-block;position:relative;vertical-align:middle;width:-moz-fit-content;width:fit-content}.el-badge__content{align-items:center;background-color:var(--el-badge-bg-color);border:1px solid var(--el-bg-color);border-radius:var(--el-badge-radius);color:var(--el-color-white);display:inline-flex;font-size:var(--el-badge-font-size);height:var(--el-badge-size);justify-content:center;padding:0 var(--el-badge-padding);white-space:nowrap}.el-badge__content.is-fixed{position:absolute;right:calc(1px + var(--el-badge-size)/2);top:0;transform:translateY(-50%) translate(100%);z-index:var(--el-index-normal)}.el-badge__content.is-fixed.is-dot{right:5px}.el-badge__content.is-dot{border-radius:50%;height:8px;padding:0;right:0;width:8px}.el-badge__content.is-hide-zero{display:none}.el-badge__content--primary{background-color:var(--el-color-primary)}.el-badge__content--success{background-color:var(--el-color-success)}.el-badge__content--warning{background-color:var(--el-color-warning)}.el-badge__content--info{background-color:var(--el-color-info)}.el-badge__content--danger{background-color:var(--el-color-danger)}.el-breadcrumb{font-size:14px;line-height:1}.el-breadcrumb:after,.el-breadcrumb:before{content:"";display:table}.el-breadcrumb:after{clear:both}.el-breadcrumb__separator{color:var(--el-text-color-placeholder);font-weight:700;margin:0 9px}.el-breadcrumb__separator.el-icon{font-weight:400;margin:0 6px}.el-breadcrumb__separator.el-icon svg{vertical-align:middle}.el-breadcrumb__item{align-items:center;display:inline-flex;float:left}.el-breadcrumb__inner{color:var(--el-text-color-regular)}.el-breadcrumb__inner a,.el-breadcrumb__inner.is-link{color:var(--el-text-color-primary);font-weight:700;text-decoration:none;transition:var(--el-transition-color)}.el-breadcrumb__inner a:hover,.el-breadcrumb__inner.is-link:hover{color:var(--el-color-primary);cursor:pointer}.el-breadcrumb__item:last-child .el-breadcrumb__inner,.el-breadcrumb__item:last-child .el-breadcrumb__inner a,.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{color:var(--el-text-color-regular);cursor:text;font-weight:400}.el-breadcrumb__item:last-child .el-breadcrumb__separator{display:none}.el-button-group{display:inline-block;vertical-align:middle}.el-button-group:after,.el-button-group:before{content:"";display:table}.el-button-group:after{clear:both}.el-button-group>.el-button{float:left;position:relative}.el-button-group>.el-button+.el-button{margin-left:0}.el-button-group>.el-button:first-child{border-bottom-right-radius:0;border-top-right-radius:0}.el-button-group>.el-button:last-child{border-bottom-left-radius:0;border-top-left-radius:0}.el-button-group>.el-button:first-child:last-child{border-bottom-left-radius:var(--el-border-radius-base);border-bottom-right-radius:var(--el-border-radius-base);border-top-left-radius:var(--el-border-radius-base);border-top-right-radius:var(--el-border-radius-base)}.el-button-group>.el-button:first-child:last-child.is-round{border-radius:var(--el-border-radius-round)}.el-button-group>.el-button:first-child:last-child.is-circle{border-radius:50%}.el-button-group>.el-button:not(:first-child):not(:last-child){border-radius:0}.el-button-group>.el-button:not(:last-child){margin-right:-1px}.el-button-group>.el-button.is-active,.el-button-group>.el-button:active,.el-button-group>.el-button:focus,.el-button-group>.el-button:hover{z-index:1}.el-button-group>.el-dropdown>.el-button{border-bottom-left-radius:0;border-left-color:var(--el-button-divide-border-color);border-top-left-radius:0}.el-button-group .el-button--primary:first-child{border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--primary:last-child{border-left-color:var(--el-button-divide-border-color)}.el-button-group .el-button--primary:not(:first-child):not(:last-child){border-left-color:var(--el-button-divide-border-color);border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--success:first-child{border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--success:last-child{border-left-color:var(--el-button-divide-border-color)}.el-button-group .el-button--success:not(:first-child):not(:last-child){border-left-color:var(--el-button-divide-border-color);border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--warning:first-child{border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--warning:last-child{border-left-color:var(--el-button-divide-border-color)}.el-button-group .el-button--warning:not(:first-child):not(:last-child){border-left-color:var(--el-button-divide-border-color);border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--danger:first-child{border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--danger:last-child{border-left-color:var(--el-button-divide-border-color)}.el-button-group .el-button--danger:not(:first-child):not(:last-child){border-left-color:var(--el-button-divide-border-color);border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--info:first-child{border-right-color:var(--el-button-divide-border-color)}.el-button-group .el-button--info:last-child{border-left-color:var(--el-button-divide-border-color)}.el-button-group .el-button--info:not(:first-child):not(:last-child){border-left-color:var(--el-button-divide-border-color);border-right-color:var(--el-button-divide-border-color)}.el-button{--el-button-font-weight:var(--el-font-weight-primary);--el-button-border-color:var(--el-border-color);--el-button-bg-color:var(--el-fill-color-blank);--el-button-text-color:var(--el-text-color-regular);--el-button-disabled-text-color:var(--el-disabled-text-color);--el-button-disabled-bg-color:var(--el-fill-color-blank);--el-button-disabled-border-color:var(--el-border-color-light);--el-button-divide-border-color:rgba(255,255,255,.5);--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-color-primary-light-9);--el-button-hover-border-color:var(--el-color-primary-light-7);--el-button-active-text-color:var(--el-button-hover-text-color);--el-button-active-border-color:var(--el-color-primary);--el-button-active-bg-color:var(--el-button-hover-bg-color);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-hover-link-text-color:var(--el-text-color-secondary);--el-button-active-color:var(--el-text-color-primary);align-items:center;-webkit-appearance:none;background-color:var(--el-button-bg-color);border:var(--el-border);border-color:var(--el-button-border-color);box-sizing:border-box;color:var(--el-button-text-color);cursor:pointer;display:inline-flex;font-weight:var(--el-button-font-weight);height:32px;justify-content:center;line-height:1;outline:none;text-align:center;transition:.1s;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.el-button:hover{background-color:var(--el-button-hover-bg-color);border-color:var(--el-button-hover-border-color);color:var(--el-button-hover-text-color);outline:none}.el-button:active{background-color:var(--el-button-active-bg-color);border-color:var(--el-button-active-border-color);color:var(--el-button-active-text-color);outline:none}.el-button:focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px;transition:outline-offset 0s,outline 0s}.el-button>span{align-items:center;display:inline-flex}.el-button+.el-button{margin-left:12px}.el-button{border-radius:var(--el-border-radius-base);font-size:var(--el-font-size-base)}.el-button,.el-button.is-round{padding:8px 15px}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon]+span{margin-left:6px}.el-button [class*=el-icon] svg{vertical-align:bottom}.el-button.is-plain{--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-fill-color-blank);--el-button-hover-border-color:var(--el-color-primary)}.el-button.is-active{background-color:var(--el-button-active-bg-color);border-color:var(--el-button-active-border-color);color:var(--el-button-active-text-color);outline:none}.el-button.is-disabled,.el-button.is-disabled:hover{background-color:var(--el-button-disabled-bg-color);background-image:none;border-color:var(--el-button-disabled-border-color);color:var(--el-button-disabled-text-color);cursor:not-allowed}.el-button.is-loading{pointer-events:none;position:relative}.el-button.is-loading:before{background-color:var(--el-mask-color-extra-light);border-radius:inherit;content:"";inset:-1px;pointer-events:none;position:absolute;z-index:1}.el-button.is-round{border-radius:var(--el-border-radius-round)}.el-button.is-circle{border-radius:50%;padding:8px;width:32px}.el-button.is-text{background-color:transparent;border:0 solid transparent;color:var(--el-button-text-color)}.el-button.is-text.is-disabled{background-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button.is-text:not(.is-disabled):hover{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled):focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px;transition:outline-offset 0s,outline 0s}.el-button.is-text:not(.is-disabled):active{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled).is-has-bg:hover{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg:active{background-color:var(--el-fill-color-dark)}.el-button__text--expand{letter-spacing:.3em;margin-right:-.3em}.el-button.is-link{background:transparent;border-color:transparent;color:var(--el-button-text-color);height:auto;padding:2px}.el-button.is-link:hover{color:var(--el-button-hover-link-text-color)}.el-button.is-link.is-disabled{background-color:transparent!important;border-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button.is-link:not(.is-disabled):active,.el-button.is-link:not(.is-disabled):hover{background-color:transparent;border-color:transparent}.el-button.is-link:not(.is-disabled):active{color:var(--el-button-active-color)}.el-button--text{background:transparent;border-color:transparent;color:var(--el-color-primary);padding-left:0;padding-right:0}.el-button--text.is-disabled{background-color:transparent!important;border-color:transparent!important;color:var(--el-button-disabled-text-color)}.el-button--text:not(.is-disabled):hover{background-color:transparent;border-color:transparent;color:var(--el-color-primary-light-3)}.el-button--text:not(.is-disabled):active{background-color:transparent;border-color:transparent;color:var(--el-color-primary-dark-2)}.el-button__link--expand{letter-spacing:.3em;margin-right:-.3em}.el-button--primary{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-primary);--el-button-border-color:var(--el-color-primary);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-active-color:var(--el-color-primary-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-primary-light-5);--el-button-hover-bg-color:var(--el-color-primary-light-3);--el-button-hover-border-color:var(--el-color-primary-light-3);--el-button-active-bg-color:var(--el-color-primary-dark-2);--el-button-active-border-color:var(--el-color-primary-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-primary-light-5);--el-button-disabled-border-color:var(--el-color-primary-light-5)}.el-button--primary.is-link,.el-button--primary.is-plain,.el-button--primary.is-text{--el-button-text-color:var(--el-color-primary);--el-button-bg-color:var(--el-color-primary-light-9);--el-button-border-color:var(--el-color-primary-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-primary);--el-button-hover-border-color:var(--el-color-primary);--el-button-active-text-color:var(--el-color-white)}.el-button--primary.is-link.is-disabled,.el-button--primary.is-link.is-disabled:active,.el-button--primary.is-link.is-disabled:focus,.el-button--primary.is-link.is-disabled:hover,.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover,.el-button--primary.is-text.is-disabled,.el-button--primary.is-text.is-disabled:active,.el-button--primary.is-text.is-disabled:focus,.el-button--primary.is-text.is-disabled:hover{background-color:var(--el-color-primary-light-9);border-color:var(--el-color-primary-light-8);color:var(--el-color-primary-light-5)}.el-button--success{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-success);--el-button-border-color:var(--el-color-success);--el-button-outline-color:var(--el-color-success-light-5);--el-button-active-color:var(--el-color-success-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-success-light-5);--el-button-hover-bg-color:var(--el-color-success-light-3);--el-button-hover-border-color:var(--el-color-success-light-3);--el-button-active-bg-color:var(--el-color-success-dark-2);--el-button-active-border-color:var(--el-color-success-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-success-light-5);--el-button-disabled-border-color:var(--el-color-success-light-5)}.el-button--success.is-link,.el-button--success.is-plain,.el-button--success.is-text{--el-button-text-color:var(--el-color-success);--el-button-bg-color:var(--el-color-success-light-9);--el-button-border-color:var(--el-color-success-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-success);--el-button-hover-border-color:var(--el-color-success);--el-button-active-text-color:var(--el-color-white)}.el-button--success.is-link.is-disabled,.el-button--success.is-link.is-disabled:active,.el-button--success.is-link.is-disabled:focus,.el-button--success.is-link.is-disabled:hover,.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover,.el-button--success.is-text.is-disabled,.el-button--success.is-text.is-disabled:active,.el-button--success.is-text.is-disabled:focus,.el-button--success.is-text.is-disabled:hover{background-color:var(--el-color-success-light-9);border-color:var(--el-color-success-light-8);color:var(--el-color-success-light-5)}.el-button--warning{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-warning);--el-button-border-color:var(--el-color-warning);--el-button-outline-color:var(--el-color-warning-light-5);--el-button-active-color:var(--el-color-warning-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-warning-light-5);--el-button-hover-bg-color:var(--el-color-warning-light-3);--el-button-hover-border-color:var(--el-color-warning-light-3);--el-button-active-bg-color:var(--el-color-warning-dark-2);--el-button-active-border-color:var(--el-color-warning-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-warning-light-5);--el-button-disabled-border-color:var(--el-color-warning-light-5)}.el-button--warning.is-link,.el-button--warning.is-plain,.el-button--warning.is-text{--el-button-text-color:var(--el-color-warning);--el-button-bg-color:var(--el-color-warning-light-9);--el-button-border-color:var(--el-color-warning-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-warning);--el-button-hover-border-color:var(--el-color-warning);--el-button-active-text-color:var(--el-color-white)}.el-button--warning.is-link.is-disabled,.el-button--warning.is-link.is-disabled:active,.el-button--warning.is-link.is-disabled:focus,.el-button--warning.is-link.is-disabled:hover,.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover,.el-button--warning.is-text.is-disabled,.el-button--warning.is-text.is-disabled:active,.el-button--warning.is-text.is-disabled:focus,.el-button--warning.is-text.is-disabled:hover{background-color:var(--el-color-warning-light-9);border-color:var(--el-color-warning-light-8);color:var(--el-color-warning-light-5)}.el-button--danger{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-danger);--el-button-border-color:var(--el-color-danger);--el-button-outline-color:var(--el-color-danger-light-5);--el-button-active-color:var(--el-color-danger-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-danger-light-5);--el-button-hover-bg-color:var(--el-color-danger-light-3);--el-button-hover-border-color:var(--el-color-danger-light-3);--el-button-active-bg-color:var(--el-color-danger-dark-2);--el-button-active-border-color:var(--el-color-danger-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-danger-light-5);--el-button-disabled-border-color:var(--el-color-danger-light-5)}.el-button--danger.is-link,.el-button--danger.is-plain,.el-button--danger.is-text{--el-button-text-color:var(--el-color-danger);--el-button-bg-color:var(--el-color-danger-light-9);--el-button-border-color:var(--el-color-danger-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-danger);--el-button-hover-border-color:var(--el-color-danger);--el-button-active-text-color:var(--el-color-white)}.el-button--danger.is-link.is-disabled,.el-button--danger.is-link.is-disabled:active,.el-button--danger.is-link.is-disabled:focus,.el-button--danger.is-link.is-disabled:hover,.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover,.el-button--danger.is-text.is-disabled,.el-button--danger.is-text.is-disabled:active,.el-button--danger.is-text.is-disabled:focus,.el-button--danger.is-text.is-disabled:hover{background-color:var(--el-color-danger-light-9);border-color:var(--el-color-danger-light-8);color:var(--el-color-danger-light-5)}.el-button--info{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-info);--el-button-border-color:var(--el-color-info);--el-button-outline-color:var(--el-color-info-light-5);--el-button-active-color:var(--el-color-info-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-info-light-5);--el-button-hover-bg-color:var(--el-color-info-light-3);--el-button-hover-border-color:var(--el-color-info-light-3);--el-button-active-bg-color:var(--el-color-info-dark-2);--el-button-active-border-color:var(--el-color-info-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-info-light-5);--el-button-disabled-border-color:var(--el-color-info-light-5)}.el-button--info.is-link,.el-button--info.is-plain,.el-button--info.is-text{--el-button-text-color:var(--el-color-info);--el-button-bg-color:var(--el-color-info-light-9);--el-button-border-color:var(--el-color-info-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-info);--el-button-hover-border-color:var(--el-color-info);--el-button-active-text-color:var(--el-color-white)}.el-button--info.is-link.is-disabled,.el-button--info.is-link.is-disabled:active,.el-button--info.is-link.is-disabled:focus,.el-button--info.is-link.is-disabled:hover,.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover,.el-button--info.is-text.is-disabled,.el-button--info.is-text.is-disabled:active,.el-button--info.is-text.is-disabled:focus,.el-button--info.is-text.is-disabled:hover{background-color:var(--el-color-info-light-9);border-color:var(--el-color-info-light-8);color:var(--el-color-info-light-5)}.el-button--large{--el-button-size:40px;height:var(--el-button-size)}.el-button--large [class*=el-icon]+span{margin-left:8px}.el-button--large{border-radius:var(--el-border-radius-base);font-size:var(--el-font-size-base);padding:12px 19px}.el-button--large.is-round{padding:12px 19px}.el-button--large.is-circle{padding:12px;width:var(--el-button-size)}.el-button--small{--el-button-size:24px;height:var(--el-button-size)}.el-button--small [class*=el-icon]+span{margin-left:4px}.el-button--small{border-radius:calc(var(--el-border-radius-base) - 1px);font-size:12px;padding:5px 11px}.el-button--small.is-round{padding:5px 11px}.el-button--small.is-circle{padding:5px;width:var(--el-button-size)}.el-calendar{--el-calendar-border:var(--el-table-border,1px solid var(--el-border-color-lighter));--el-calendar-header-border-bottom:var(--el-calendar-border);--el-calendar-selected-bg-color:var(--el-color-primary-light-9);--el-calendar-cell-width:85px;background-color:var(--el-fill-color-blank)}.el-calendar__header{border-bottom:var(--el-calendar-header-border-bottom);display:flex;justify-content:space-between;padding:12px 20px}.el-calendar__title{align-self:center;color:var(--el-text-color)}.el-calendar__body{padding:12px 20px 35px}.el-calendar-table{table-layout:fixed;width:100%}.el-calendar-table thead th{color:var(--el-text-color-regular);font-weight:400;padding:12px 0}.el-calendar-table:not(.is-range) td.next,.el-calendar-table:not(.is-range) td.prev{color:var(--el-text-color-placeholder)}.el-calendar-table td{border-bottom:var(--el-calendar-border);border-right:var(--el-calendar-border);transition:background-color var(--el-transition-duration-fast) ease;vertical-align:top}.el-calendar-table td.is-selected{background-color:var(--el-calendar-selected-bg-color)}.el-calendar-table td.is-today{color:var(--el-color-primary)}.el-calendar-table tr:first-child td{border-top:var(--el-calendar-border)}.el-calendar-table tr td:first-child{border-left:var(--el-calendar-border)}.el-calendar-table tr.el-calendar-table__row--hide-border td{border-top:none}.el-calendar-table .el-calendar-day{box-sizing:border-box;height:var(--el-calendar-cell-width);padding:8px}.el-calendar-table .el-calendar-day:hover{background-color:var(--el-calendar-selected-bg-color);cursor:pointer}.el-card{--el-card-border-color:var(--el-border-color-light);--el-card-border-radius:4px;--el-card-padding:20px;--el-card-bg-color:var(--el-fill-color-blank);background-color:var(--el-card-bg-color);border:1px solid var(--el-card-border-color);border-radius:var(--el-card-border-radius);color:var(--el-text-color-primary);overflow:hidden;transition:var(--el-transition-duration)}.el-card.is-always-shadow,.el-card.is-hover-shadow:focus,.el-card.is-hover-shadow:hover{box-shadow:var(--el-box-shadow-light)}.el-card__header{border-bottom:1px solid var(--el-card-border-color);box-sizing:border-box;padding:calc(var(--el-card-padding) - 2px) var(--el-card-padding)}.el-card__body{padding:var(--el-card-padding)}.el-card__footer{border-top:1px solid var(--el-card-border-color);box-sizing:border-box;padding:calc(var(--el-card-padding) - 2px) var(--el-card-padding)}.el-carousel__item{display:inline-block;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.el-carousel__item,.el-carousel__item.is-active{z-index:calc(var(--el-index-normal) - 1)}.el-carousel__item--card,.el-carousel__item.is-animating{transition:transform .4s ease-in-out}.el-carousel__item--card{width:50%}.el-carousel__item--card.is-in-stage{cursor:pointer;z-index:var(--el-index-normal)}.el-carousel__item--card.is-in-stage.is-hover .el-carousel__mask,.el-carousel__item--card.is-in-stage:hover .el-carousel__mask{opacity:.12}.el-carousel__item--card.is-active{z-index:calc(var(--el-index-normal) + 1)}.el-carousel__item--card-vertical{height:50%;width:100%}.el-carousel__mask{background-color:var(--el-color-white);height:100%;left:0;opacity:.24;position:absolute;top:0;transition:var(--el-transition-duration-fast);width:100%}.el-carousel{--el-carousel-arrow-font-size:12px;--el-carousel-arrow-size:36px;--el-carousel-arrow-background:rgba(31,45,61,.11);--el-carousel-arrow-hover-background:rgba(31,45,61,.23);--el-carousel-indicator-width:30px;--el-carousel-indicator-height:2px;--el-carousel-indicator-padding-horizontal:4px;--el-carousel-indicator-padding-vertical:12px;--el-carousel-indicator-out-color:var(--el-border-color-hover);position:relative}.el-carousel--horizontal,.el-carousel--vertical{overflow:hidden}.el-carousel__container{height:300px;position:relative}.el-carousel__arrow{align-items:center;background-color:var(--el-carousel-arrow-background);border:none;border-radius:50%;color:#fff;cursor:pointer;display:inline-flex;font-size:var(--el-carousel-arrow-font-size);height:var(--el-carousel-arrow-size);justify-content:center;margin:0;outline:none;padding:0;position:absolute;text-align:center;top:50%;transform:translateY(-50%);transition:var(--el-transition-duration);width:var(--el-carousel-arrow-size);z-index:10}.el-carousel__arrow--left{left:16px}.el-carousel__arrow--right{right:16px}.el-carousel__arrow:hover{background-color:var(--el-carousel-arrow-hover-background)}.el-carousel__arrow i{cursor:pointer}.el-carousel__indicators{list-style:none;margin:0;padding:0;position:absolute;z-index:calc(var(--el-index-normal) + 1)}.el-carousel__indicators--horizontal{bottom:0;left:50%;transform:translate(-50%)}.el-carousel__indicators--vertical{right:0;top:50%;transform:translateY(-50%)}.el-carousel__indicators--outside{bottom:calc(var(--el-carousel-indicator-height) + var(--el-carousel-indicator-padding-vertical)*2);position:static;text-align:center;transform:none}.el-carousel__indicators--outside .el-carousel__indicator:hover button{opacity:.64}.el-carousel__indicators--outside button{background-color:var(--el-carousel-indicator-out-color);opacity:.24}.el-carousel__indicators--right{right:0}.el-carousel__indicators--labels{left:0;right:0;text-align:center;transform:none}.el-carousel__indicators--labels .el-carousel__button{color:#000;font-size:12px;height:auto;padding:2px 18px;width:auto}.el-carousel__indicators--labels .el-carousel__indicator{padding:6px 4px}.el-carousel__indicator{background-color:transparent;cursor:pointer}.el-carousel__indicator:hover button{opacity:.72}.el-carousel__indicator--horizontal{display:inline-block;padding:var(--el-carousel-indicator-padding-vertical) var(--el-carousel-indicator-padding-horizontal)}.el-carousel__indicator--vertical{padding:var(--el-carousel-indicator-padding-horizontal) var(--el-carousel-indicator-padding-vertical)}.el-carousel__indicator--vertical .el-carousel__button{height:calc(var(--el-carousel-indicator-width)/2);width:var(--el-carousel-indicator-height)}.el-carousel__indicator.is-active button{opacity:1}.el-carousel__button{background-color:#fff;border:none;cursor:pointer;display:block;height:var(--el-carousel-indicator-height);margin:0;opacity:.48;outline:none;padding:0;transition:var(--el-transition-duration);width:var(--el-carousel-indicator-width)}.carousel-arrow-left-enter-from,.carousel-arrow-left-leave-active{opacity:0;transform:translateY(-50%) translate(-10px)}.carousel-arrow-right-enter-from,.carousel-arrow-right-leave-active{opacity:0;transform:translateY(-50%) translate(10px)}.el-transitioning{filter:url(#elCarouselHorizontal)}.el-transitioning-vertical{filter:url(#elCarouselVertical)}.el-cascader-panel{--el-cascader-menu-text-color:var(--el-text-color-regular);--el-cascader-menu-selected-text-color:var(--el-color-primary);--el-cascader-menu-fill:var(--el-bg-color-overlay);--el-cascader-menu-font-size:var(--el-font-size-base);--el-cascader-menu-radius:var(--el-border-radius-base);--el-cascader-menu-border:solid 1px var(--el-border-color-light);--el-cascader-menu-shadow:var(--el-box-shadow-light);--el-cascader-node-background-hover:var(--el-fill-color-light);--el-cascader-node-color-disabled:var(--el-text-color-placeholder);--el-cascader-color-empty:var(--el-text-color-placeholder);--el-cascader-tag-background:var(--el-fill-color);border-radius:var(--el-cascader-menu-radius);display:flex;font-size:var(--el-cascader-menu-font-size)}.el-cascader-panel.is-bordered{border:var(--el-cascader-menu-border);border-radius:var(--el-cascader-menu-radius)}.el-cascader-menu{border-right:var(--el-cascader-menu-border);box-sizing:border-box;color:var(--el-cascader-menu-text-color);min-width:180px}.el-cascader-menu:last-child{border-right:none}.el-cascader-menu:last-child .el-cascader-node{padding-right:20px}.el-cascader-menu__wrap.el-scrollbar__wrap{height:204px}.el-cascader-menu__list{box-sizing:border-box;list-style:none;margin:0;min-height:100%;padding:6px 0;position:relative}.el-cascader-menu__hover-zone{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.el-cascader-menu__empty-text{align-items:center;color:var(--el-cascader-color-empty);display:flex;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}.el-cascader-menu__empty-text .is-loading{margin-right:2px}.el-cascader-node{align-items:center;display:flex;height:34px;line-height:34px;outline:none;padding:0 30px 0 20px;position:relative}.el-cascader-node.is-selectable.in-active-path{color:var(--el-cascader-menu-text-color)}.el-cascader-node.in-active-path,.el-cascader-node.is-active,.el-cascader-node.is-selectable.in-checked-path{color:var(--el-cascader-menu-selected-text-color);font-weight:700}.el-cascader-node:not(.is-disabled){cursor:pointer}.el-cascader-node:not(.is-disabled):focus,.el-cascader-node:not(.is-disabled):hover{background:var(--el-cascader-node-background-hover)}.el-cascader-node.is-disabled{color:var(--el-cascader-node-color-disabled);cursor:not-allowed}.el-cascader-node__prefix{left:10px;position:absolute}.el-cascader-node__postfix{position:absolute;right:10px}.el-cascader-node__label{flex:1;overflow:hidden;padding:0 8px;text-align:left;text-overflow:ellipsis;white-space:nowrap}.el-cascader-node>.el-checkbox,.el-cascader-node>.el-radio{margin-right:0}.el-cascader-node>.el-radio .el-radio__label{padding-left:0}.el-cascader{--el-cascader-menu-text-color:var(--el-text-color-regular);--el-cascader-menu-selected-text-color:var(--el-color-primary);--el-cascader-menu-fill:var(--el-bg-color-overlay);--el-cascader-menu-font-size:var(--el-font-size-base);--el-cascader-menu-radius:var(--el-border-radius-base);--el-cascader-menu-border:solid 1px var(--el-border-color-light);--el-cascader-menu-shadow:var(--el-box-shadow-light);--el-cascader-node-background-hover:var(--el-fill-color-light);--el-cascader-node-color-disabled:var(--el-text-color-placeholder);--el-cascader-color-empty:var(--el-text-color-placeholder);--el-cascader-tag-background:var(--el-fill-color);display:inline-block;font-size:var(--el-font-size-base);line-height:32px;outline:none;position:relative;vertical-align:middle}.el-cascader:not(.is-disabled):hover .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset;cursor:pointer}.el-cascader .el-input{cursor:pointer;display:flex}.el-cascader .el-input .el-input__inner{cursor:pointer;text-overflow:ellipsis}.el-cascader .el-input .el-input__suffix-inner .el-icon svg{vertical-align:middle}.el-cascader .el-input .icon-arrow-down{font-size:14px;transition:transform var(--el-transition-duration)}.el-cascader .el-input .icon-arrow-down.is-reverse{transform:rotate(180deg)}.el-cascader .el-input .icon-circle-close:hover{color:var(--el-input-clear-hover-color,var(--el-text-color-secondary))}.el-cascader .el-input.is-focus .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-border-color,var(--el-color-primary)) inset}.el-cascader--large{font-size:14px;line-height:40px}.el-cascader--large .el-cascader__tags{gap:6px;padding:8px}.el-cascader--large .el-cascader__search-input{height:24px;margin-left:7px}.el-cascader--small{font-size:12px;line-height:24px}.el-cascader--small .el-cascader__tags{gap:4px;padding:2px}.el-cascader--small .el-cascader__search-input{height:20px;margin-left:5px}.el-cascader.is-disabled .el-cascader__label{color:var(--el-disabled-text-color);z-index:calc(var(--el-index-normal) + 1)}.el-cascader__dropdown{--el-cascader-menu-text-color:var(--el-text-color-regular);--el-cascader-menu-selected-text-color:var(--el-color-primary);--el-cascader-menu-fill:var(--el-bg-color-overlay);--el-cascader-menu-font-size:var(--el-font-size-base);--el-cascader-menu-radius:var(--el-border-radius-base);--el-cascader-menu-border:solid 1px var(--el-border-color-light);--el-cascader-menu-shadow:var(--el-box-shadow-light);--el-cascader-node-background-hover:var(--el-fill-color-light);--el-cascader-node-color-disabled:var(--el-text-color-placeholder);--el-cascader-color-empty:var(--el-text-color-placeholder);--el-cascader-tag-background:var(--el-fill-color);border-radius:var(--el-cascader-menu-radius);font-size:var(--el-cascader-menu-font-size)}.el-cascader__dropdown.el-popper{background:var(--el-cascader-menu-fill)}.el-cascader__dropdown.el-popper,.el-cascader__dropdown.el-popper .el-popper__arrow:before{border:var(--el-cascader-menu-border)}.el-cascader__dropdown.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-cascader__dropdown.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-cascader__dropdown.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-cascader__dropdown.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-cascader__dropdown.el-popper{box-shadow:var(--el-cascader-menu-shadow)}.el-cascader__tags{box-sizing:border-box;display:flex;flex-wrap:wrap;gap:6px;left:0;line-height:normal;padding:4px;position:absolute;right:30px;text-align:left;top:50%;transform:translateY(-50%)}.el-cascader__tags .el-tag{align-items:center;background:var(--el-cascader-tag-background);display:inline-flex;max-width:100%;text-overflow:ellipsis}.el-cascader__tags .el-tag.el-tag--dark,.el-cascader__tags .el-tag.el-tag--plain{background-color:var(--el-tag-bg-color)}.el-cascader__tags .el-tag:not(.is-hit){border-color:transparent}.el-cascader__tags .el-tag:not(.is-hit).el-tag--dark,.el-cascader__tags .el-tag:not(.is-hit).el-tag--plain{border-color:var(--el-tag-border-color)}.el-cascader__tags .el-tag>span{flex:1;line-height:normal;overflow:hidden;text-overflow:ellipsis}.el-cascader__tags .el-tag .el-icon-close{background-color:var(--el-text-color-placeholder);color:var(--el-color-white);flex:none}.el-cascader__tags .el-tag .el-icon-close:hover{background-color:var(--el-text-color-secondary)}.el-cascader__tags .el-tag+input{margin-left:0}.el-cascader__tags.is-validate{right:55px}.el-cascader__collapse-tags{white-space:normal;z-index:var(--el-index-normal)}.el-cascader__collapse-tags .el-tag{align-items:center;background:var(--el-fill-color);display:inline-flex;max-width:100%;text-overflow:ellipsis}.el-cascader__collapse-tags .el-tag.el-tag--dark,.el-cascader__collapse-tags .el-tag.el-tag--plain{background-color:var(--el-tag-bg-color)}.el-cascader__collapse-tags .el-tag:not(.is-hit){border-color:transparent}.el-cascader__collapse-tags .el-tag:not(.is-hit).el-tag--dark,.el-cascader__collapse-tags .el-tag:not(.is-hit).el-tag--plain{border-color:var(--el-tag-border-color)}.el-cascader__collapse-tags .el-tag>span{flex:1;line-height:normal;overflow:hidden;text-overflow:ellipsis}.el-cascader__collapse-tags .el-tag .el-icon-close{background-color:var(--el-text-color-placeholder);color:var(--el-color-white);flex:none}.el-cascader__collapse-tags .el-tag .el-icon-close:hover{background-color:var(--el-text-color-secondary)}.el-cascader__collapse-tags .el-tag+input{margin-left:0}.el-cascader__collapse-tags .el-tag{margin:2px 0}.el-cascader__suggestion-panel{border-radius:var(--el-cascader-menu-radius)}.el-cascader__suggestion-list{color:var(--el-cascader-menu-text-color);font-size:var(--el-font-size-base);margin:0;max-height:204px;padding:6px 0;text-align:center}.el-cascader__suggestion-item{align-items:center;cursor:pointer;display:flex;height:34px;justify-content:space-between;outline:none;padding:0 15px;text-align:left}.el-cascader__suggestion-item:focus,.el-cascader__suggestion-item:hover{background:var(--el-cascader-node-background-hover)}.el-cascader__suggestion-item.is-checked{color:var(--el-cascader-menu-selected-text-color);font-weight:700}.el-cascader__suggestion-item>span{margin-right:10px}.el-cascader__empty-text{color:var(--el-cascader-color-empty);margin:10px 0}.el-cascader__search-input{background:transparent;border:none;box-sizing:border-box;color:var(--el-cascader-menu-text-color);flex:1;height:24px;margin-left:7px;min-width:60px;outline:none;padding:0}.el-cascader__search-input::-moz-placeholder{color:transparent}.el-cascader__search-input::placeholder{color:transparent}.el-check-tag{background-color:var(--el-color-info-light-9);border-radius:var(--el-border-radius-base);color:var(--el-color-info);cursor:pointer;display:inline-block;font-size:var(--el-font-size-base);font-weight:700;line-height:var(--el-font-size-base);padding:7px 15px;transition:var(--el-transition-all)}.el-check-tag:hover{background-color:var(--el-color-info-light-7)}.el-check-tag.el-check-tag--primary.is-checked{background-color:var(--el-color-primary-light-8);color:var(--el-color-primary)}.el-check-tag.el-check-tag--primary.is-checked:hover{background-color:var(--el-color-primary-light-7)}.el-check-tag.el-check-tag--primary.is-checked.is-disabled{background-color:var(--el-color-primary-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--primary.is-checked.is-disabled:hover{background-color:var(--el-color-primary-light-8)}.el-check-tag.el-check-tag--primary.is-disabled{background-color:var(--el-color-info-light-9);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--primary.is-disabled:hover{background-color:var(--el-color-info-light-9)}.el-check-tag.el-check-tag--success.is-checked{background-color:var(--el-color-success-light-8);color:var(--el-color-success)}.el-check-tag.el-check-tag--success.is-checked:hover{background-color:var(--el-color-success-light-7)}.el-check-tag.el-check-tag--success.is-checked.is-disabled{background-color:var(--el-color-success-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--success.is-checked.is-disabled:hover{background-color:var(--el-color-success-light-8)}.el-check-tag.el-check-tag--success.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--success.is-disabled,.el-check-tag.el-check-tag--success.is-disabled:hover{background-color:var(--el-color-success-light-9)}.el-check-tag.el-check-tag--warning.is-checked{background-color:var(--el-color-warning-light-8);color:var(--el-color-warning)}.el-check-tag.el-check-tag--warning.is-checked:hover{background-color:var(--el-color-warning-light-7)}.el-check-tag.el-check-tag--warning.is-checked.is-disabled{background-color:var(--el-color-warning-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--warning.is-checked.is-disabled:hover{background-color:var(--el-color-warning-light-8)}.el-check-tag.el-check-tag--warning.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--warning.is-disabled,.el-check-tag.el-check-tag--warning.is-disabled:hover{background-color:var(--el-color-warning-light-9)}.el-check-tag.el-check-tag--danger.is-checked{background-color:var(--el-color-danger-light-8);color:var(--el-color-danger)}.el-check-tag.el-check-tag--danger.is-checked:hover{background-color:var(--el-color-danger-light-7)}.el-check-tag.el-check-tag--danger.is-checked.is-disabled{background-color:var(--el-color-danger-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--danger.is-checked.is-disabled:hover{background-color:var(--el-color-danger-light-8)}.el-check-tag.el-check-tag--danger.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--danger.is-disabled,.el-check-tag.el-check-tag--danger.is-disabled:hover{background-color:var(--el-color-danger-light-9)}.el-check-tag.el-check-tag--error.is-checked{background-color:var(--el-color-error-light-8);color:var(--el-color-error)}.el-check-tag.el-check-tag--error.is-checked:hover{background-color:var(--el-color-error-light-7)}.el-check-tag.el-check-tag--error.is-checked.is-disabled{background-color:var(--el-color-error-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--error.is-checked.is-disabled:hover{background-color:var(--el-color-error-light-8)}.el-check-tag.el-check-tag--error.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--error.is-disabled,.el-check-tag.el-check-tag--error.is-disabled:hover{background-color:var(--el-color-error-light-9)}.el-check-tag.el-check-tag--info.is-checked{background-color:var(--el-color-info-light-8);color:var(--el-color-info)}.el-check-tag.el-check-tag--info.is-checked:hover{background-color:var(--el-color-info-light-7)}.el-check-tag.el-check-tag--info.is-checked.is-disabled{background-color:var(--el-color-info-light-8);color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--info.is-checked.is-disabled:hover{background-color:var(--el-color-info-light-8)}.el-check-tag.el-check-tag--info.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-check-tag.el-check-tag--info.is-disabled,.el-check-tag.el-check-tag--info.is-disabled:hover{background-color:var(--el-color-info-light-9)}.el-checkbox-button{--el-checkbox-button-checked-bg-color:var(--el-color-primary);--el-checkbox-button-checked-text-color:var(--el-color-white);--el-checkbox-button-checked-border-color:var(--el-color-primary);display:inline-block;position:relative}.el-checkbox-button__inner{-webkit-appearance:none;background:var(--el-button-bg-color,var(--el-fill-color-blank));border:var(--el-border);border-left-color:transparent;border-radius:0;box-sizing:border-box;color:var(--el-button-text-color,var(--el-text-color-regular));cursor:pointer;display:inline-block;font-size:var(--el-font-size-base);font-weight:var(--el-checkbox-font-weight);line-height:1;margin:0;outline:none;padding:8px 15px;position:relative;text-align:center;transition:var(--el-transition-all);-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.el-checkbox-button__inner.is-round{padding:8px 15px}.el-checkbox-button__inner:hover{color:var(--el-color-primary)}.el-checkbox-button__inner [class*=el-icon-]{line-height:.9}.el-checkbox-button__inner [class*=el-icon-]+span{margin-left:5px}.el-checkbox-button__original{margin:0;opacity:0;outline:none;position:absolute;z-index:-1}.el-checkbox-button.is-checked .el-checkbox-button__inner{background-color:var(--el-checkbox-button-checked-bg-color);border-color:var(--el-checkbox-button-checked-border-color);box-shadow:-1px 0 0 0 var(--el-color-primary-light-7);color:var(--el-checkbox-button-checked-text-color)}.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner{border-left-color:var(--el-checkbox-button-checked-border-color)}.el-checkbox-button.is-disabled .el-checkbox-button__inner{background-color:var(--el-button-disabled-bg-color,var(--el-fill-color-blank));background-image:none;border-color:var(--el-button-disabled-border-color,var(--el-border-color-light));box-shadow:none;color:var(--el-disabled-text-color);cursor:not-allowed}.el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner{border-left-color:var(--el-button-disabled-border-color,var(--el-border-color-light))}.el-checkbox-button:first-child .el-checkbox-button__inner{border-bottom-left-radius:var(--el-border-radius-base);border-left:var(--el-border);border-top-left-radius:var(--el-border-radius-base);box-shadow:none!important}.el-checkbox-button.is-focus .el-checkbox-button__inner{border-color:var(--el-checkbox-button-checked-border-color)}.el-checkbox-button:last-child .el-checkbox-button__inner{border-bottom-right-radius:var(--el-border-radius-base);border-top-right-radius:var(--el-border-radius-base)}.el-checkbox-button--large .el-checkbox-button__inner{border-radius:0;font-size:var(--el-font-size-base);padding:12px 19px}.el-checkbox-button--large .el-checkbox-button__inner.is-round{padding:12px 19px}.el-checkbox-button--small .el-checkbox-button__inner{border-radius:0;font-size:12px;padding:5px 11px}.el-checkbox-button--small .el-checkbox-button__inner.is-round{padding:5px 11px}.el-checkbox-group{font-size:0;line-height:0}.el-checkbox{--el-checkbox-font-size:14px;--el-checkbox-font-weight:var(--el-font-weight-primary);--el-checkbox-text-color:var(--el-text-color-regular);--el-checkbox-input-height:14px;--el-checkbox-input-width:14px;--el-checkbox-border-radius:var(--el-border-radius-small);--el-checkbox-bg-color:var(--el-fill-color-blank);--el-checkbox-input-border:var(--el-border);--el-checkbox-disabled-border-color:var(--el-border-color);--el-checkbox-disabled-input-fill:var(--el-fill-color-light);--el-checkbox-disabled-icon-color:var(--el-text-color-placeholder);--el-checkbox-disabled-checked-input-fill:var(--el-border-color-extra-light);--el-checkbox-disabled-checked-input-border-color:var(--el-border-color);--el-checkbox-disabled-checked-icon-color:var(--el-text-color-placeholder);--el-checkbox-checked-text-color:var(--el-color-primary);--el-checkbox-checked-input-border-color:var(--el-color-primary);--el-checkbox-checked-bg-color:var(--el-color-primary);--el-checkbox-checked-icon-color:var(--el-color-white);--el-checkbox-input-border-color-hover:var(--el-color-primary);align-items:center;color:var(--el-checkbox-text-color);cursor:pointer;display:inline-flex;font-size:var(--el-font-size-base);font-weight:var(--el-checkbox-font-weight);height:var(--el-checkbox-height,32px);margin-right:30px;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap}.el-checkbox.is-disabled{cursor:not-allowed}.el-checkbox.is-bordered{border:var(--el-border);border-radius:var(--el-border-radius-base);box-sizing:border-box;padding:0 15px 0 9px}.el-checkbox.is-bordered.is-checked{border-color:var(--el-color-primary)}.el-checkbox.is-bordered.is-disabled{border-color:var(--el-border-color-lighter)}.el-checkbox.is-bordered.el-checkbox--large{border-radius:var(--el-border-radius-base);padding:0 19px 0 11px}.el-checkbox.is-bordered.el-checkbox--large .el-checkbox__label{font-size:var(--el-font-size-base)}.el-checkbox.is-bordered.el-checkbox--large .el-checkbox__inner{height:14px;width:14px}.el-checkbox.is-bordered.el-checkbox--small{border-radius:calc(var(--el-border-radius-base) - 1px);padding:0 11px 0 7px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{font-size:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner:after{height:6px;width:2px}.el-checkbox input:focus-visible+.el-checkbox__inner{border-radius:var(--el-checkbox-border-radius);outline:2px solid var(--el-checkbox-input-border-color-hover);outline-offset:1px}.el-checkbox__input{cursor:pointer;display:inline-flex;outline:none;position:relative;white-space:nowrap}.el-checkbox__input.is-disabled .el-checkbox__inner{background-color:var(--el-checkbox-disabled-input-fill);border-color:var(--el-checkbox-disabled-border-color);cursor:not-allowed}.el-checkbox__input.is-disabled .el-checkbox__inner:after{border-color:var(--el-checkbox-disabled-icon-color);cursor:not-allowed}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{background-color:var(--el-checkbox-disabled-checked-input-fill);border-color:var(--el-checkbox-disabled-checked-input-border-color)}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after{border-color:var(--el-checkbox-disabled-checked-icon-color)}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{background-color:var(--el-checkbox-disabled-checked-input-fill);border-color:var(--el-checkbox-disabled-checked-input-border-color)}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner:before{background-color:var(--el-checkbox-disabled-checked-icon-color);border-color:var(--el-checkbox-disabled-checked-icon-color)}.el-checkbox__input.is-disabled+span.el-checkbox__label{color:var(--el-disabled-text-color);cursor:not-allowed}.el-checkbox__input.is-checked .el-checkbox__inner{background-color:var(--el-checkbox-checked-bg-color);border-color:var(--el-checkbox-checked-input-border-color)}.el-checkbox__input.is-checked .el-checkbox__inner:after{border-color:var(--el-checkbox-checked-icon-color);transform:translate(-45%,-60%) rotate(45deg) scaleY(1)}.el-checkbox__input.is-checked+.el-checkbox__label{color:var(--el-checkbox-checked-text-color)}.el-checkbox__input.is-focus:not(.is-checked) .el-checkbox__original:not(:focus-visible){border-color:var(--el-checkbox-input-border-color-hover)}.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color:var(--el-checkbox-checked-bg-color);border-color:var(--el-checkbox-checked-input-border-color)}.el-checkbox__input.is-indeterminate .el-checkbox__inner:before{background-color:var(--el-checkbox-checked-icon-color);content:"";display:block;height:2px;left:0;position:absolute;right:0;top:5px;transform:scale(.5)}.el-checkbox__input.is-indeterminate .el-checkbox__inner:after{display:none}.el-checkbox__inner{background-color:var(--el-checkbox-bg-color);border:var(--el-checkbox-input-border);border-radius:var(--el-checkbox-border-radius);box-sizing:border-box;display:inline-block;height:var(--el-checkbox-input-height);position:relative;transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);width:var(--el-checkbox-input-width);z-index:var(--el-index-normal)}.el-checkbox__inner:hover{border-color:var(--el-checkbox-input-border-color-hover)}.el-checkbox__inner:after{border:1px solid transparent;border-left:0;border-top:0;box-sizing:content-box;content:"";height:7px;left:50%;position:absolute;top:50%;transform:translate(-45%,-60%) rotate(45deg) scaleY(0);transform-origin:center;transition:transform .15s ease-in .05s;width:3px}.el-checkbox__original{height:0;margin:0;opacity:0;outline:none;position:absolute;width:0;z-index:-1}.el-checkbox__label{display:inline-block;font-size:var(--el-checkbox-font-size);line-height:1;padding-left:8px}.el-checkbox.el-checkbox--large{height:40px}.el-checkbox.el-checkbox--large .el-checkbox__label{font-size:14px}.el-checkbox.el-checkbox--large .el-checkbox__inner{height:14px;width:14px}.el-checkbox.el-checkbox--small{height:24px}.el-checkbox.el-checkbox--small .el-checkbox__label{font-size:12px}.el-checkbox.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.el-checkbox--small .el-checkbox__input.is-indeterminate .el-checkbox__inner:before{top:4px}.el-checkbox.el-checkbox--small .el-checkbox__inner:after{height:6px;width:2px}.el-checkbox:last-of-type{margin-right:0}[class*=el-col-]{box-sizing:border-box}[class*=el-col-].is-guttered{display:block;min-height:1px}.el-col-0{flex:0 0 0%;max-width:0}.el-col-0,.el-col-0.is-guttered{display:none}.el-col-offset-0{margin-left:0}.el-col-pull-0{position:relative;right:0}.el-col-push-0{left:0;position:relative}.el-col-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-1,.el-col-1.is-guttered{display:block}.el-col-offset-1{margin-left:4.1666666667%}.el-col-pull-1{position:relative;right:4.1666666667%}.el-col-push-1{left:4.1666666667%;position:relative}.el-col-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-2,.el-col-2.is-guttered{display:block}.el-col-offset-2{margin-left:8.3333333333%}.el-col-pull-2{position:relative;right:8.3333333333%}.el-col-push-2{left:8.3333333333%;position:relative}.el-col-3{flex:0 0 12.5%;max-width:12.5%}.el-col-3,.el-col-3.is-guttered{display:block}.el-col-offset-3{margin-left:12.5%}.el-col-pull-3{position:relative;right:12.5%}.el-col-push-3{left:12.5%;position:relative}.el-col-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-4,.el-col-4.is-guttered{display:block}.el-col-offset-4{margin-left:16.6666666667%}.el-col-pull-4{position:relative;right:16.6666666667%}.el-col-push-4{left:16.6666666667%;position:relative}.el-col-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-5,.el-col-5.is-guttered{display:block}.el-col-offset-5{margin-left:20.8333333333%}.el-col-pull-5{position:relative;right:20.8333333333%}.el-col-push-5{left:20.8333333333%;position:relative}.el-col-6{flex:0 0 25%;max-width:25%}.el-col-6,.el-col-6.is-guttered{display:block}.el-col-offset-6{margin-left:25%}.el-col-pull-6{position:relative;right:25%}.el-col-push-6{left:25%;position:relative}.el-col-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-7,.el-col-7.is-guttered{display:block}.el-col-offset-7{margin-left:29.1666666667%}.el-col-pull-7{position:relative;right:29.1666666667%}.el-col-push-7{left:29.1666666667%;position:relative}.el-col-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-8,.el-col-8.is-guttered{display:block}.el-col-offset-8{margin-left:33.3333333333%}.el-col-pull-8{position:relative;right:33.3333333333%}.el-col-push-8{left:33.3333333333%;position:relative}.el-col-9{flex:0 0 37.5%;max-width:37.5%}.el-col-9,.el-col-9.is-guttered{display:block}.el-col-offset-9{margin-left:37.5%}.el-col-pull-9{position:relative;right:37.5%}.el-col-push-9{left:37.5%;position:relative}.el-col-10{flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-10,.el-col-10.is-guttered{display:block}.el-col-offset-10{margin-left:41.6666666667%}.el-col-pull-10{position:relative;right:41.6666666667%}.el-col-push-10{left:41.6666666667%;position:relative}.el-col-11{flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-11,.el-col-11.is-guttered{display:block}.el-col-offset-11{margin-left:45.8333333333%}.el-col-pull-11{position:relative;right:45.8333333333%}.el-col-push-11{left:45.8333333333%;position:relative}.el-col-12{flex:0 0 50%;max-width:50%}.el-col-12,.el-col-12.is-guttered{display:block}.el-col-offset-12{margin-left:50%}.el-col-pull-12{position:relative;right:50%}.el-col-push-12{left:50%;position:relative}.el-col-13{flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-13,.el-col-13.is-guttered{display:block}.el-col-offset-13{margin-left:54.1666666667%}.el-col-pull-13{position:relative;right:54.1666666667%}.el-col-push-13{left:54.1666666667%;position:relative}.el-col-14{flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-14,.el-col-14.is-guttered{display:block}.el-col-offset-14{margin-left:58.3333333333%}.el-col-pull-14{position:relative;right:58.3333333333%}.el-col-push-14{left:58.3333333333%;position:relative}.el-col-15{flex:0 0 62.5%;max-width:62.5%}.el-col-15,.el-col-15.is-guttered{display:block}.el-col-offset-15{margin-left:62.5%}.el-col-pull-15{position:relative;right:62.5%}.el-col-push-15{left:62.5%;position:relative}.el-col-16{flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-16,.el-col-16.is-guttered{display:block}.el-col-offset-16{margin-left:66.6666666667%}.el-col-pull-16{position:relative;right:66.6666666667%}.el-col-push-16{left:66.6666666667%;position:relative}.el-col-17{flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-17,.el-col-17.is-guttered{display:block}.el-col-offset-17{margin-left:70.8333333333%}.el-col-pull-17{position:relative;right:70.8333333333%}.el-col-push-17{left:70.8333333333%;position:relative}.el-col-18{flex:0 0 75%;max-width:75%}.el-col-18,.el-col-18.is-guttered{display:block}.el-col-offset-18{margin-left:75%}.el-col-pull-18{position:relative;right:75%}.el-col-push-18{left:75%;position:relative}.el-col-19{flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-19,.el-col-19.is-guttered{display:block}.el-col-offset-19{margin-left:79.1666666667%}.el-col-pull-19{position:relative;right:79.1666666667%}.el-col-push-19{left:79.1666666667%;position:relative}.el-col-20{flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-20,.el-col-20.is-guttered{display:block}.el-col-offset-20{margin-left:83.3333333333%}.el-col-pull-20{position:relative;right:83.3333333333%}.el-col-push-20{left:83.3333333333%;position:relative}.el-col-21{flex:0 0 87.5%;max-width:87.5%}.el-col-21,.el-col-21.is-guttered{display:block}.el-col-offset-21{margin-left:87.5%}.el-col-pull-21{position:relative;right:87.5%}.el-col-push-21{left:87.5%;position:relative}.el-col-22{flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-22,.el-col-22.is-guttered{display:block}.el-col-offset-22{margin-left:91.6666666667%}.el-col-pull-22{position:relative;right:91.6666666667%}.el-col-push-22{left:91.6666666667%;position:relative}.el-col-23{flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-23,.el-col-23.is-guttered{display:block}.el-col-offset-23{margin-left:95.8333333333%}.el-col-pull-23{position:relative;right:95.8333333333%}.el-col-push-23{left:95.8333333333%;position:relative}.el-col-24{flex:0 0 100%;max-width:100%}.el-col-24,.el-col-24.is-guttered{display:block}.el-col-offset-24{margin-left:100%}.el-col-pull-24{position:relative;right:100%}.el-col-push-24{left:100%;position:relative}@media only screen and (max-width:767px){.el-col-xs-0{display:none;flex:0 0 0%;max-width:0}.el-col-xs-0.is-guttered{display:none}.el-col-xs-offset-0{margin-left:0}.el-col-xs-pull-0{position:relative;right:0}.el-col-xs-push-0{left:0;position:relative}.el-col-xs-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-xs-1,.el-col-xs-1.is-guttered{display:block}.el-col-xs-offset-1{margin-left:4.1666666667%}.el-col-xs-pull-1{position:relative;right:4.1666666667%}.el-col-xs-push-1{left:4.1666666667%;position:relative}.el-col-xs-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-xs-2,.el-col-xs-2.is-guttered{display:block}.el-col-xs-offset-2{margin-left:8.3333333333%}.el-col-xs-pull-2{position:relative;right:8.3333333333%}.el-col-xs-push-2{left:8.3333333333%;position:relative}.el-col-xs-3{flex:0 0 12.5%;max-width:12.5%}.el-col-xs-3,.el-col-xs-3.is-guttered{display:block}.el-col-xs-offset-3{margin-left:12.5%}.el-col-xs-pull-3{position:relative;right:12.5%}.el-col-xs-push-3{left:12.5%;position:relative}.el-col-xs-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-xs-4,.el-col-xs-4.is-guttered{display:block}.el-col-xs-offset-4{margin-left:16.6666666667%}.el-col-xs-pull-4{position:relative;right:16.6666666667%}.el-col-xs-push-4{left:16.6666666667%;position:relative}.el-col-xs-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-xs-5,.el-col-xs-5.is-guttered{display:block}.el-col-xs-offset-5{margin-left:20.8333333333%}.el-col-xs-pull-5{position:relative;right:20.8333333333%}.el-col-xs-push-5{left:20.8333333333%;position:relative}.el-col-xs-6{flex:0 0 25%;max-width:25%}.el-col-xs-6,.el-col-xs-6.is-guttered{display:block}.el-col-xs-offset-6{margin-left:25%}.el-col-xs-pull-6{position:relative;right:25%}.el-col-xs-push-6{left:25%;position:relative}.el-col-xs-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-xs-7,.el-col-xs-7.is-guttered{display:block}.el-col-xs-offset-7{margin-left:29.1666666667%}.el-col-xs-pull-7{position:relative;right:29.1666666667%}.el-col-xs-push-7{left:29.1666666667%;position:relative}.el-col-xs-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-xs-8,.el-col-xs-8.is-guttered{display:block}.el-col-xs-offset-8{margin-left:33.3333333333%}.el-col-xs-pull-8{position:relative;right:33.3333333333%}.el-col-xs-push-8{left:33.3333333333%;position:relative}.el-col-xs-9{flex:0 0 37.5%;max-width:37.5%}.el-col-xs-9,.el-col-xs-9.is-guttered{display:block}.el-col-xs-offset-9{margin-left:37.5%}.el-col-xs-pull-9{position:relative;right:37.5%}.el-col-xs-push-9{left:37.5%;position:relative}.el-col-xs-10{display:block;flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-xs-10.is-guttered{display:block}.el-col-xs-offset-10{margin-left:41.6666666667%}.el-col-xs-pull-10{position:relative;right:41.6666666667%}.el-col-xs-push-10{left:41.6666666667%;position:relative}.el-col-xs-11{display:block;flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-xs-11.is-guttered{display:block}.el-col-xs-offset-11{margin-left:45.8333333333%}.el-col-xs-pull-11{position:relative;right:45.8333333333%}.el-col-xs-push-11{left:45.8333333333%;position:relative}.el-col-xs-12{display:block;flex:0 0 50%;max-width:50%}.el-col-xs-12.is-guttered{display:block}.el-col-xs-offset-12{margin-left:50%}.el-col-xs-pull-12{position:relative;right:50%}.el-col-xs-push-12{left:50%;position:relative}.el-col-xs-13{display:block;flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-xs-13.is-guttered{display:block}.el-col-xs-offset-13{margin-left:54.1666666667%}.el-col-xs-pull-13{position:relative;right:54.1666666667%}.el-col-xs-push-13{left:54.1666666667%;position:relative}.el-col-xs-14{display:block;flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-xs-14.is-guttered{display:block}.el-col-xs-offset-14{margin-left:58.3333333333%}.el-col-xs-pull-14{position:relative;right:58.3333333333%}.el-col-xs-push-14{left:58.3333333333%;position:relative}.el-col-xs-15{display:block;flex:0 0 62.5%;max-width:62.5%}.el-col-xs-15.is-guttered{display:block}.el-col-xs-offset-15{margin-left:62.5%}.el-col-xs-pull-15{position:relative;right:62.5%}.el-col-xs-push-15{left:62.5%;position:relative}.el-col-xs-16{display:block;flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-xs-16.is-guttered{display:block}.el-col-xs-offset-16{margin-left:66.6666666667%}.el-col-xs-pull-16{position:relative;right:66.6666666667%}.el-col-xs-push-16{left:66.6666666667%;position:relative}.el-col-xs-17{display:block;flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-xs-17.is-guttered{display:block}.el-col-xs-offset-17{margin-left:70.8333333333%}.el-col-xs-pull-17{position:relative;right:70.8333333333%}.el-col-xs-push-17{left:70.8333333333%;position:relative}.el-col-xs-18{display:block;flex:0 0 75%;max-width:75%}.el-col-xs-18.is-guttered{display:block}.el-col-xs-offset-18{margin-left:75%}.el-col-xs-pull-18{position:relative;right:75%}.el-col-xs-push-18{left:75%;position:relative}.el-col-xs-19{display:block;flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-xs-19.is-guttered{display:block}.el-col-xs-offset-19{margin-left:79.1666666667%}.el-col-xs-pull-19{position:relative;right:79.1666666667%}.el-col-xs-push-19{left:79.1666666667%;position:relative}.el-col-xs-20{display:block;flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-xs-20.is-guttered{display:block}.el-col-xs-offset-20{margin-left:83.3333333333%}.el-col-xs-pull-20{position:relative;right:83.3333333333%}.el-col-xs-push-20{left:83.3333333333%;position:relative}.el-col-xs-21{display:block;flex:0 0 87.5%;max-width:87.5%}.el-col-xs-21.is-guttered{display:block}.el-col-xs-offset-21{margin-left:87.5%}.el-col-xs-pull-21{position:relative;right:87.5%}.el-col-xs-push-21{left:87.5%;position:relative}.el-col-xs-22{display:block;flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-xs-22.is-guttered{display:block}.el-col-xs-offset-22{margin-left:91.6666666667%}.el-col-xs-pull-22{position:relative;right:91.6666666667%}.el-col-xs-push-22{left:91.6666666667%;position:relative}.el-col-xs-23{display:block;flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-xs-23.is-guttered{display:block}.el-col-xs-offset-23{margin-left:95.8333333333%}.el-col-xs-pull-23{position:relative;right:95.8333333333%}.el-col-xs-push-23{left:95.8333333333%;position:relative}.el-col-xs-24{display:block;flex:0 0 100%;max-width:100%}.el-col-xs-24.is-guttered{display:block}.el-col-xs-offset-24{margin-left:100%}.el-col-xs-pull-24{position:relative;right:100%}.el-col-xs-push-24{left:100%;position:relative}}@media only screen and (min-width:768px){.el-col-sm-0{display:none;flex:0 0 0%;max-width:0}.el-col-sm-0.is-guttered{display:none}.el-col-sm-offset-0{margin-left:0}.el-col-sm-pull-0{position:relative;right:0}.el-col-sm-push-0{left:0;position:relative}.el-col-sm-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-sm-1,.el-col-sm-1.is-guttered{display:block}.el-col-sm-offset-1{margin-left:4.1666666667%}.el-col-sm-pull-1{position:relative;right:4.1666666667%}.el-col-sm-push-1{left:4.1666666667%;position:relative}.el-col-sm-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-sm-2,.el-col-sm-2.is-guttered{display:block}.el-col-sm-offset-2{margin-left:8.3333333333%}.el-col-sm-pull-2{position:relative;right:8.3333333333%}.el-col-sm-push-2{left:8.3333333333%;position:relative}.el-col-sm-3{flex:0 0 12.5%;max-width:12.5%}.el-col-sm-3,.el-col-sm-3.is-guttered{display:block}.el-col-sm-offset-3{margin-left:12.5%}.el-col-sm-pull-3{position:relative;right:12.5%}.el-col-sm-push-3{left:12.5%;position:relative}.el-col-sm-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-sm-4,.el-col-sm-4.is-guttered{display:block}.el-col-sm-offset-4{margin-left:16.6666666667%}.el-col-sm-pull-4{position:relative;right:16.6666666667%}.el-col-sm-push-4{left:16.6666666667%;position:relative}.el-col-sm-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-sm-5,.el-col-sm-5.is-guttered{display:block}.el-col-sm-offset-5{margin-left:20.8333333333%}.el-col-sm-pull-5{position:relative;right:20.8333333333%}.el-col-sm-push-5{left:20.8333333333%;position:relative}.el-col-sm-6{flex:0 0 25%;max-width:25%}.el-col-sm-6,.el-col-sm-6.is-guttered{display:block}.el-col-sm-offset-6{margin-left:25%}.el-col-sm-pull-6{position:relative;right:25%}.el-col-sm-push-6{left:25%;position:relative}.el-col-sm-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-sm-7,.el-col-sm-7.is-guttered{display:block}.el-col-sm-offset-7{margin-left:29.1666666667%}.el-col-sm-pull-7{position:relative;right:29.1666666667%}.el-col-sm-push-7{left:29.1666666667%;position:relative}.el-col-sm-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-sm-8,.el-col-sm-8.is-guttered{display:block}.el-col-sm-offset-8{margin-left:33.3333333333%}.el-col-sm-pull-8{position:relative;right:33.3333333333%}.el-col-sm-push-8{left:33.3333333333%;position:relative}.el-col-sm-9{flex:0 0 37.5%;max-width:37.5%}.el-col-sm-9,.el-col-sm-9.is-guttered{display:block}.el-col-sm-offset-9{margin-left:37.5%}.el-col-sm-pull-9{position:relative;right:37.5%}.el-col-sm-push-9{left:37.5%;position:relative}.el-col-sm-10{display:block;flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-sm-10.is-guttered{display:block}.el-col-sm-offset-10{margin-left:41.6666666667%}.el-col-sm-pull-10{position:relative;right:41.6666666667%}.el-col-sm-push-10{left:41.6666666667%;position:relative}.el-col-sm-11{display:block;flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-sm-11.is-guttered{display:block}.el-col-sm-offset-11{margin-left:45.8333333333%}.el-col-sm-pull-11{position:relative;right:45.8333333333%}.el-col-sm-push-11{left:45.8333333333%;position:relative}.el-col-sm-12{display:block;flex:0 0 50%;max-width:50%}.el-col-sm-12.is-guttered{display:block}.el-col-sm-offset-12{margin-left:50%}.el-col-sm-pull-12{position:relative;right:50%}.el-col-sm-push-12{left:50%;position:relative}.el-col-sm-13{display:block;flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-sm-13.is-guttered{display:block}.el-col-sm-offset-13{margin-left:54.1666666667%}.el-col-sm-pull-13{position:relative;right:54.1666666667%}.el-col-sm-push-13{left:54.1666666667%;position:relative}.el-col-sm-14{display:block;flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-sm-14.is-guttered{display:block}.el-col-sm-offset-14{margin-left:58.3333333333%}.el-col-sm-pull-14{position:relative;right:58.3333333333%}.el-col-sm-push-14{left:58.3333333333%;position:relative}.el-col-sm-15{display:block;flex:0 0 62.5%;max-width:62.5%}.el-col-sm-15.is-guttered{display:block}.el-col-sm-offset-15{margin-left:62.5%}.el-col-sm-pull-15{position:relative;right:62.5%}.el-col-sm-push-15{left:62.5%;position:relative}.el-col-sm-16{display:block;flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-sm-16.is-guttered{display:block}.el-col-sm-offset-16{margin-left:66.6666666667%}.el-col-sm-pull-16{position:relative;right:66.6666666667%}.el-col-sm-push-16{left:66.6666666667%;position:relative}.el-col-sm-17{display:block;flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-sm-17.is-guttered{display:block}.el-col-sm-offset-17{margin-left:70.8333333333%}.el-col-sm-pull-17{position:relative;right:70.8333333333%}.el-col-sm-push-17{left:70.8333333333%;position:relative}.el-col-sm-18{display:block;flex:0 0 75%;max-width:75%}.el-col-sm-18.is-guttered{display:block}.el-col-sm-offset-18{margin-left:75%}.el-col-sm-pull-18{position:relative;right:75%}.el-col-sm-push-18{left:75%;position:relative}.el-col-sm-19{display:block;flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-sm-19.is-guttered{display:block}.el-col-sm-offset-19{margin-left:79.1666666667%}.el-col-sm-pull-19{position:relative;right:79.1666666667%}.el-col-sm-push-19{left:79.1666666667%;position:relative}.el-col-sm-20{display:block;flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-sm-20.is-guttered{display:block}.el-col-sm-offset-20{margin-left:83.3333333333%}.el-col-sm-pull-20{position:relative;right:83.3333333333%}.el-col-sm-push-20{left:83.3333333333%;position:relative}.el-col-sm-21{display:block;flex:0 0 87.5%;max-width:87.5%}.el-col-sm-21.is-guttered{display:block}.el-col-sm-offset-21{margin-left:87.5%}.el-col-sm-pull-21{position:relative;right:87.5%}.el-col-sm-push-21{left:87.5%;position:relative}.el-col-sm-22{display:block;flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-sm-22.is-guttered{display:block}.el-col-sm-offset-22{margin-left:91.6666666667%}.el-col-sm-pull-22{position:relative;right:91.6666666667%}.el-col-sm-push-22{left:91.6666666667%;position:relative}.el-col-sm-23{display:block;flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-sm-23.is-guttered{display:block}.el-col-sm-offset-23{margin-left:95.8333333333%}.el-col-sm-pull-23{position:relative;right:95.8333333333%}.el-col-sm-push-23{left:95.8333333333%;position:relative}.el-col-sm-24{display:block;flex:0 0 100%;max-width:100%}.el-col-sm-24.is-guttered{display:block}.el-col-sm-offset-24{margin-left:100%}.el-col-sm-pull-24{position:relative;right:100%}.el-col-sm-push-24{left:100%;position:relative}}@media only screen and (min-width:992px){.el-col-md-0{display:none;flex:0 0 0%;max-width:0}.el-col-md-0.is-guttered{display:none}.el-col-md-offset-0{margin-left:0}.el-col-md-pull-0{position:relative;right:0}.el-col-md-push-0{left:0;position:relative}.el-col-md-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-md-1,.el-col-md-1.is-guttered{display:block}.el-col-md-offset-1{margin-left:4.1666666667%}.el-col-md-pull-1{position:relative;right:4.1666666667%}.el-col-md-push-1{left:4.1666666667%;position:relative}.el-col-md-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-md-2,.el-col-md-2.is-guttered{display:block}.el-col-md-offset-2{margin-left:8.3333333333%}.el-col-md-pull-2{position:relative;right:8.3333333333%}.el-col-md-push-2{left:8.3333333333%;position:relative}.el-col-md-3{flex:0 0 12.5%;max-width:12.5%}.el-col-md-3,.el-col-md-3.is-guttered{display:block}.el-col-md-offset-3{margin-left:12.5%}.el-col-md-pull-3{position:relative;right:12.5%}.el-col-md-push-3{left:12.5%;position:relative}.el-col-md-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-md-4,.el-col-md-4.is-guttered{display:block}.el-col-md-offset-4{margin-left:16.6666666667%}.el-col-md-pull-4{position:relative;right:16.6666666667%}.el-col-md-push-4{left:16.6666666667%;position:relative}.el-col-md-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-md-5,.el-col-md-5.is-guttered{display:block}.el-col-md-offset-5{margin-left:20.8333333333%}.el-col-md-pull-5{position:relative;right:20.8333333333%}.el-col-md-push-5{left:20.8333333333%;position:relative}.el-col-md-6{flex:0 0 25%;max-width:25%}.el-col-md-6,.el-col-md-6.is-guttered{display:block}.el-col-md-offset-6{margin-left:25%}.el-col-md-pull-6{position:relative;right:25%}.el-col-md-push-6{left:25%;position:relative}.el-col-md-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-md-7,.el-col-md-7.is-guttered{display:block}.el-col-md-offset-7{margin-left:29.1666666667%}.el-col-md-pull-7{position:relative;right:29.1666666667%}.el-col-md-push-7{left:29.1666666667%;position:relative}.el-col-md-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-md-8,.el-col-md-8.is-guttered{display:block}.el-col-md-offset-8{margin-left:33.3333333333%}.el-col-md-pull-8{position:relative;right:33.3333333333%}.el-col-md-push-8{left:33.3333333333%;position:relative}.el-col-md-9{flex:0 0 37.5%;max-width:37.5%}.el-col-md-9,.el-col-md-9.is-guttered{display:block}.el-col-md-offset-9{margin-left:37.5%}.el-col-md-pull-9{position:relative;right:37.5%}.el-col-md-push-9{left:37.5%;position:relative}.el-col-md-10{display:block;flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-md-10.is-guttered{display:block}.el-col-md-offset-10{margin-left:41.6666666667%}.el-col-md-pull-10{position:relative;right:41.6666666667%}.el-col-md-push-10{left:41.6666666667%;position:relative}.el-col-md-11{display:block;flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-md-11.is-guttered{display:block}.el-col-md-offset-11{margin-left:45.8333333333%}.el-col-md-pull-11{position:relative;right:45.8333333333%}.el-col-md-push-11{left:45.8333333333%;position:relative}.el-col-md-12{display:block;flex:0 0 50%;max-width:50%}.el-col-md-12.is-guttered{display:block}.el-col-md-offset-12{margin-left:50%}.el-col-md-pull-12{position:relative;right:50%}.el-col-md-push-12{left:50%;position:relative}.el-col-md-13{display:block;flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-md-13.is-guttered{display:block}.el-col-md-offset-13{margin-left:54.1666666667%}.el-col-md-pull-13{position:relative;right:54.1666666667%}.el-col-md-push-13{left:54.1666666667%;position:relative}.el-col-md-14{display:block;flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-md-14.is-guttered{display:block}.el-col-md-offset-14{margin-left:58.3333333333%}.el-col-md-pull-14{position:relative;right:58.3333333333%}.el-col-md-push-14{left:58.3333333333%;position:relative}.el-col-md-15{display:block;flex:0 0 62.5%;max-width:62.5%}.el-col-md-15.is-guttered{display:block}.el-col-md-offset-15{margin-left:62.5%}.el-col-md-pull-15{position:relative;right:62.5%}.el-col-md-push-15{left:62.5%;position:relative}.el-col-md-16{display:block;flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-md-16.is-guttered{display:block}.el-col-md-offset-16{margin-left:66.6666666667%}.el-col-md-pull-16{position:relative;right:66.6666666667%}.el-col-md-push-16{left:66.6666666667%;position:relative}.el-col-md-17{display:block;flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-md-17.is-guttered{display:block}.el-col-md-offset-17{margin-left:70.8333333333%}.el-col-md-pull-17{position:relative;right:70.8333333333%}.el-col-md-push-17{left:70.8333333333%;position:relative}.el-col-md-18{display:block;flex:0 0 75%;max-width:75%}.el-col-md-18.is-guttered{display:block}.el-col-md-offset-18{margin-left:75%}.el-col-md-pull-18{position:relative;right:75%}.el-col-md-push-18{left:75%;position:relative}.el-col-md-19{display:block;flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-md-19.is-guttered{display:block}.el-col-md-offset-19{margin-left:79.1666666667%}.el-col-md-pull-19{position:relative;right:79.1666666667%}.el-col-md-push-19{left:79.1666666667%;position:relative}.el-col-md-20{display:block;flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-md-20.is-guttered{display:block}.el-col-md-offset-20{margin-left:83.3333333333%}.el-col-md-pull-20{position:relative;right:83.3333333333%}.el-col-md-push-20{left:83.3333333333%;position:relative}.el-col-md-21{display:block;flex:0 0 87.5%;max-width:87.5%}.el-col-md-21.is-guttered{display:block}.el-col-md-offset-21{margin-left:87.5%}.el-col-md-pull-21{position:relative;right:87.5%}.el-col-md-push-21{left:87.5%;position:relative}.el-col-md-22{display:block;flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-md-22.is-guttered{display:block}.el-col-md-offset-22{margin-left:91.6666666667%}.el-col-md-pull-22{position:relative;right:91.6666666667%}.el-col-md-push-22{left:91.6666666667%;position:relative}.el-col-md-23{display:block;flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-md-23.is-guttered{display:block}.el-col-md-offset-23{margin-left:95.8333333333%}.el-col-md-pull-23{position:relative;right:95.8333333333%}.el-col-md-push-23{left:95.8333333333%;position:relative}.el-col-md-24{display:block;flex:0 0 100%;max-width:100%}.el-col-md-24.is-guttered{display:block}.el-col-md-offset-24{margin-left:100%}.el-col-md-pull-24{position:relative;right:100%}.el-col-md-push-24{left:100%;position:relative}}@media only screen and (min-width:1200px){.el-col-lg-0{display:none;flex:0 0 0%;max-width:0}.el-col-lg-0.is-guttered{display:none}.el-col-lg-offset-0{margin-left:0}.el-col-lg-pull-0{position:relative;right:0}.el-col-lg-push-0{left:0;position:relative}.el-col-lg-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-lg-1,.el-col-lg-1.is-guttered{display:block}.el-col-lg-offset-1{margin-left:4.1666666667%}.el-col-lg-pull-1{position:relative;right:4.1666666667%}.el-col-lg-push-1{left:4.1666666667%;position:relative}.el-col-lg-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-lg-2,.el-col-lg-2.is-guttered{display:block}.el-col-lg-offset-2{margin-left:8.3333333333%}.el-col-lg-pull-2{position:relative;right:8.3333333333%}.el-col-lg-push-2{left:8.3333333333%;position:relative}.el-col-lg-3{flex:0 0 12.5%;max-width:12.5%}.el-col-lg-3,.el-col-lg-3.is-guttered{display:block}.el-col-lg-offset-3{margin-left:12.5%}.el-col-lg-pull-3{position:relative;right:12.5%}.el-col-lg-push-3{left:12.5%;position:relative}.el-col-lg-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-lg-4,.el-col-lg-4.is-guttered{display:block}.el-col-lg-offset-4{margin-left:16.6666666667%}.el-col-lg-pull-4{position:relative;right:16.6666666667%}.el-col-lg-push-4{left:16.6666666667%;position:relative}.el-col-lg-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-lg-5,.el-col-lg-5.is-guttered{display:block}.el-col-lg-offset-5{margin-left:20.8333333333%}.el-col-lg-pull-5{position:relative;right:20.8333333333%}.el-col-lg-push-5{left:20.8333333333%;position:relative}.el-col-lg-6{flex:0 0 25%;max-width:25%}.el-col-lg-6,.el-col-lg-6.is-guttered{display:block}.el-col-lg-offset-6{margin-left:25%}.el-col-lg-pull-6{position:relative;right:25%}.el-col-lg-push-6{left:25%;position:relative}.el-col-lg-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-lg-7,.el-col-lg-7.is-guttered{display:block}.el-col-lg-offset-7{margin-left:29.1666666667%}.el-col-lg-pull-7{position:relative;right:29.1666666667%}.el-col-lg-push-7{left:29.1666666667%;position:relative}.el-col-lg-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-lg-8,.el-col-lg-8.is-guttered{display:block}.el-col-lg-offset-8{margin-left:33.3333333333%}.el-col-lg-pull-8{position:relative;right:33.3333333333%}.el-col-lg-push-8{left:33.3333333333%;position:relative}.el-col-lg-9{flex:0 0 37.5%;max-width:37.5%}.el-col-lg-9,.el-col-lg-9.is-guttered{display:block}.el-col-lg-offset-9{margin-left:37.5%}.el-col-lg-pull-9{position:relative;right:37.5%}.el-col-lg-push-9{left:37.5%;position:relative}.el-col-lg-10{display:block;flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-lg-10.is-guttered{display:block}.el-col-lg-offset-10{margin-left:41.6666666667%}.el-col-lg-pull-10{position:relative;right:41.6666666667%}.el-col-lg-push-10{left:41.6666666667%;position:relative}.el-col-lg-11{display:block;flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-lg-11.is-guttered{display:block}.el-col-lg-offset-11{margin-left:45.8333333333%}.el-col-lg-pull-11{position:relative;right:45.8333333333%}.el-col-lg-push-11{left:45.8333333333%;position:relative}.el-col-lg-12{display:block;flex:0 0 50%;max-width:50%}.el-col-lg-12.is-guttered{display:block}.el-col-lg-offset-12{margin-left:50%}.el-col-lg-pull-12{position:relative;right:50%}.el-col-lg-push-12{left:50%;position:relative}.el-col-lg-13{display:block;flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-lg-13.is-guttered{display:block}.el-col-lg-offset-13{margin-left:54.1666666667%}.el-col-lg-pull-13{position:relative;right:54.1666666667%}.el-col-lg-push-13{left:54.1666666667%;position:relative}.el-col-lg-14{display:block;flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-lg-14.is-guttered{display:block}.el-col-lg-offset-14{margin-left:58.3333333333%}.el-col-lg-pull-14{position:relative;right:58.3333333333%}.el-col-lg-push-14{left:58.3333333333%;position:relative}.el-col-lg-15{display:block;flex:0 0 62.5%;max-width:62.5%}.el-col-lg-15.is-guttered{display:block}.el-col-lg-offset-15{margin-left:62.5%}.el-col-lg-pull-15{position:relative;right:62.5%}.el-col-lg-push-15{left:62.5%;position:relative}.el-col-lg-16{display:block;flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-lg-16.is-guttered{display:block}.el-col-lg-offset-16{margin-left:66.6666666667%}.el-col-lg-pull-16{position:relative;right:66.6666666667%}.el-col-lg-push-16{left:66.6666666667%;position:relative}.el-col-lg-17{display:block;flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-lg-17.is-guttered{display:block}.el-col-lg-offset-17{margin-left:70.8333333333%}.el-col-lg-pull-17{position:relative;right:70.8333333333%}.el-col-lg-push-17{left:70.8333333333%;position:relative}.el-col-lg-18{display:block;flex:0 0 75%;max-width:75%}.el-col-lg-18.is-guttered{display:block}.el-col-lg-offset-18{margin-left:75%}.el-col-lg-pull-18{position:relative;right:75%}.el-col-lg-push-18{left:75%;position:relative}.el-col-lg-19{display:block;flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-lg-19.is-guttered{display:block}.el-col-lg-offset-19{margin-left:79.1666666667%}.el-col-lg-pull-19{position:relative;right:79.1666666667%}.el-col-lg-push-19{left:79.1666666667%;position:relative}.el-col-lg-20{display:block;flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-lg-20.is-guttered{display:block}.el-col-lg-offset-20{margin-left:83.3333333333%}.el-col-lg-pull-20{position:relative;right:83.3333333333%}.el-col-lg-push-20{left:83.3333333333%;position:relative}.el-col-lg-21{display:block;flex:0 0 87.5%;max-width:87.5%}.el-col-lg-21.is-guttered{display:block}.el-col-lg-offset-21{margin-left:87.5%}.el-col-lg-pull-21{position:relative;right:87.5%}.el-col-lg-push-21{left:87.5%;position:relative}.el-col-lg-22{display:block;flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-lg-22.is-guttered{display:block}.el-col-lg-offset-22{margin-left:91.6666666667%}.el-col-lg-pull-22{position:relative;right:91.6666666667%}.el-col-lg-push-22{left:91.6666666667%;position:relative}.el-col-lg-23{display:block;flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-lg-23.is-guttered{display:block}.el-col-lg-offset-23{margin-left:95.8333333333%}.el-col-lg-pull-23{position:relative;right:95.8333333333%}.el-col-lg-push-23{left:95.8333333333%;position:relative}.el-col-lg-24{display:block;flex:0 0 100%;max-width:100%}.el-col-lg-24.is-guttered{display:block}.el-col-lg-offset-24{margin-left:100%}.el-col-lg-pull-24{position:relative;right:100%}.el-col-lg-push-24{left:100%;position:relative}}@media only screen and (min-width:1920px){.el-col-xl-0{display:none;flex:0 0 0%;max-width:0}.el-col-xl-0.is-guttered{display:none}.el-col-xl-offset-0{margin-left:0}.el-col-xl-pull-0{position:relative;right:0}.el-col-xl-push-0{left:0;position:relative}.el-col-xl-1{flex:0 0 4.1666666667%;max-width:4.1666666667%}.el-col-xl-1,.el-col-xl-1.is-guttered{display:block}.el-col-xl-offset-1{margin-left:4.1666666667%}.el-col-xl-pull-1{position:relative;right:4.1666666667%}.el-col-xl-push-1{left:4.1666666667%;position:relative}.el-col-xl-2{flex:0 0 8.3333333333%;max-width:8.3333333333%}.el-col-xl-2,.el-col-xl-2.is-guttered{display:block}.el-col-xl-offset-2{margin-left:8.3333333333%}.el-col-xl-pull-2{position:relative;right:8.3333333333%}.el-col-xl-push-2{left:8.3333333333%;position:relative}.el-col-xl-3{flex:0 0 12.5%;max-width:12.5%}.el-col-xl-3,.el-col-xl-3.is-guttered{display:block}.el-col-xl-offset-3{margin-left:12.5%}.el-col-xl-pull-3{position:relative;right:12.5%}.el-col-xl-push-3{left:12.5%;position:relative}.el-col-xl-4{flex:0 0 16.6666666667%;max-width:16.6666666667%}.el-col-xl-4,.el-col-xl-4.is-guttered{display:block}.el-col-xl-offset-4{margin-left:16.6666666667%}.el-col-xl-pull-4{position:relative;right:16.6666666667%}.el-col-xl-push-4{left:16.6666666667%;position:relative}.el-col-xl-5{flex:0 0 20.8333333333%;max-width:20.8333333333%}.el-col-xl-5,.el-col-xl-5.is-guttered{display:block}.el-col-xl-offset-5{margin-left:20.8333333333%}.el-col-xl-pull-5{position:relative;right:20.8333333333%}.el-col-xl-push-5{left:20.8333333333%;position:relative}.el-col-xl-6{flex:0 0 25%;max-width:25%}.el-col-xl-6,.el-col-xl-6.is-guttered{display:block}.el-col-xl-offset-6{margin-left:25%}.el-col-xl-pull-6{position:relative;right:25%}.el-col-xl-push-6{left:25%;position:relative}.el-col-xl-7{flex:0 0 29.1666666667%;max-width:29.1666666667%}.el-col-xl-7,.el-col-xl-7.is-guttered{display:block}.el-col-xl-offset-7{margin-left:29.1666666667%}.el-col-xl-pull-7{position:relative;right:29.1666666667%}.el-col-xl-push-7{left:29.1666666667%;position:relative}.el-col-xl-8{flex:0 0 33.3333333333%;max-width:33.3333333333%}.el-col-xl-8,.el-col-xl-8.is-guttered{display:block}.el-col-xl-offset-8{margin-left:33.3333333333%}.el-col-xl-pull-8{position:relative;right:33.3333333333%}.el-col-xl-push-8{left:33.3333333333%;position:relative}.el-col-xl-9{flex:0 0 37.5%;max-width:37.5%}.el-col-xl-9,.el-col-xl-9.is-guttered{display:block}.el-col-xl-offset-9{margin-left:37.5%}.el-col-xl-pull-9{position:relative;right:37.5%}.el-col-xl-push-9{left:37.5%;position:relative}.el-col-xl-10{display:block;flex:0 0 41.6666666667%;max-width:41.6666666667%}.el-col-xl-10.is-guttered{display:block}.el-col-xl-offset-10{margin-left:41.6666666667%}.el-col-xl-pull-10{position:relative;right:41.6666666667%}.el-col-xl-push-10{left:41.6666666667%;position:relative}.el-col-xl-11{display:block;flex:0 0 45.8333333333%;max-width:45.8333333333%}.el-col-xl-11.is-guttered{display:block}.el-col-xl-offset-11{margin-left:45.8333333333%}.el-col-xl-pull-11{position:relative;right:45.8333333333%}.el-col-xl-push-11{left:45.8333333333%;position:relative}.el-col-xl-12{display:block;flex:0 0 50%;max-width:50%}.el-col-xl-12.is-guttered{display:block}.el-col-xl-offset-12{margin-left:50%}.el-col-xl-pull-12{position:relative;right:50%}.el-col-xl-push-12{left:50%;position:relative}.el-col-xl-13{display:block;flex:0 0 54.1666666667%;max-width:54.1666666667%}.el-col-xl-13.is-guttered{display:block}.el-col-xl-offset-13{margin-left:54.1666666667%}.el-col-xl-pull-13{position:relative;right:54.1666666667%}.el-col-xl-push-13{left:54.1666666667%;position:relative}.el-col-xl-14{display:block;flex:0 0 58.3333333333%;max-width:58.3333333333%}.el-col-xl-14.is-guttered{display:block}.el-col-xl-offset-14{margin-left:58.3333333333%}.el-col-xl-pull-14{position:relative;right:58.3333333333%}.el-col-xl-push-14{left:58.3333333333%;position:relative}.el-col-xl-15{display:block;flex:0 0 62.5%;max-width:62.5%}.el-col-xl-15.is-guttered{display:block}.el-col-xl-offset-15{margin-left:62.5%}.el-col-xl-pull-15{position:relative;right:62.5%}.el-col-xl-push-15{left:62.5%;position:relative}.el-col-xl-16{display:block;flex:0 0 66.6666666667%;max-width:66.6666666667%}.el-col-xl-16.is-guttered{display:block}.el-col-xl-offset-16{margin-left:66.6666666667%}.el-col-xl-pull-16{position:relative;right:66.6666666667%}.el-col-xl-push-16{left:66.6666666667%;position:relative}.el-col-xl-17{display:block;flex:0 0 70.8333333333%;max-width:70.8333333333%}.el-col-xl-17.is-guttered{display:block}.el-col-xl-offset-17{margin-left:70.8333333333%}.el-col-xl-pull-17{position:relative;right:70.8333333333%}.el-col-xl-push-17{left:70.8333333333%;position:relative}.el-col-xl-18{display:block;flex:0 0 75%;max-width:75%}.el-col-xl-18.is-guttered{display:block}.el-col-xl-offset-18{margin-left:75%}.el-col-xl-pull-18{position:relative;right:75%}.el-col-xl-push-18{left:75%;position:relative}.el-col-xl-19{display:block;flex:0 0 79.1666666667%;max-width:79.1666666667%}.el-col-xl-19.is-guttered{display:block}.el-col-xl-offset-19{margin-left:79.1666666667%}.el-col-xl-pull-19{position:relative;right:79.1666666667%}.el-col-xl-push-19{left:79.1666666667%;position:relative}.el-col-xl-20{display:block;flex:0 0 83.3333333333%;max-width:83.3333333333%}.el-col-xl-20.is-guttered{display:block}.el-col-xl-offset-20{margin-left:83.3333333333%}.el-col-xl-pull-20{position:relative;right:83.3333333333%}.el-col-xl-push-20{left:83.3333333333%;position:relative}.el-col-xl-21{display:block;flex:0 0 87.5%;max-width:87.5%}.el-col-xl-21.is-guttered{display:block}.el-col-xl-offset-21{margin-left:87.5%}.el-col-xl-pull-21{position:relative;right:87.5%}.el-col-xl-push-21{left:87.5%;position:relative}.el-col-xl-22{display:block;flex:0 0 91.6666666667%;max-width:91.6666666667%}.el-col-xl-22.is-guttered{display:block}.el-col-xl-offset-22{margin-left:91.6666666667%}.el-col-xl-pull-22{position:relative;right:91.6666666667%}.el-col-xl-push-22{left:91.6666666667%;position:relative}.el-col-xl-23{display:block;flex:0 0 95.8333333333%;max-width:95.8333333333%}.el-col-xl-23.is-guttered{display:block}.el-col-xl-offset-23{margin-left:95.8333333333%}.el-col-xl-pull-23{position:relative;right:95.8333333333%}.el-col-xl-push-23{left:95.8333333333%;position:relative}.el-col-xl-24{display:block;flex:0 0 100%;max-width:100%}.el-col-xl-24.is-guttered{display:block}.el-col-xl-offset-24{margin-left:100%}.el-col-xl-pull-24{position:relative;right:100%}.el-col-xl-push-24{left:100%;position:relative}}.el-collapse{--el-collapse-border-color:var(--el-border-color-lighter);--el-collapse-header-height:48px;--el-collapse-header-bg-color:var(--el-fill-color-blank);--el-collapse-header-text-color:var(--el-text-color-primary);--el-collapse-header-font-size:13px;--el-collapse-content-bg-color:var(--el-fill-color-blank);--el-collapse-content-font-size:13px;--el-collapse-content-text-color:var(--el-text-color-primary);border-bottom:1px solid var(--el-collapse-border-color);border-top:1px solid var(--el-collapse-border-color)}.el-collapse-item.is-disabled .el-collapse-item__header{color:var(--el-text-color-disabled);cursor:not-allowed}.el-collapse-item__header{align-items:center;background-color:var(--el-collapse-header-bg-color);border:none;border-bottom:1px solid var(--el-collapse-border-color);color:var(--el-collapse-header-text-color);cursor:pointer;display:flex;font-size:var(--el-collapse-header-font-size);font-weight:500;height:var(--el-collapse-header-height);line-height:var(--el-collapse-header-height);outline:none;padding:0;transition:border-bottom-color var(--el-transition-duration);width:100%}.el-collapse-item__arrow{font-weight:300;transition:transform var(--el-transition-duration)}.el-collapse-item__arrow.is-active{transform:rotate(90deg)}.el-collapse-item__title{flex:auto;text-align:left}.el-collapse-item__header.focusing:focus:not(:hover){color:var(--el-color-primary)}.el-collapse-item__header.is-active{border-bottom-color:transparent}.el-collapse-item__wrap{background-color:var(--el-collapse-content-bg-color);border-bottom:1px solid var(--el-collapse-border-color);box-sizing:border-box;overflow:hidden;will-change:height}.el-collapse-item__content{color:var(--el-collapse-content-text-color);font-size:var(--el-collapse-content-font-size);line-height:1.7692307692;padding-bottom:25px}.el-collapse-item:last-child{margin-bottom:-1px}.el-collapse-icon-position-left .el-collapse-item__header{gap:8px}.el-collapse-icon-position-left .el-collapse-item__title{order:1}.el-collapse-icon-position-right .el-collapse-item__header{padding-right:8px}.el-color-predefine{display:flex;font-size:12px;margin-top:8px;width:280px}.el-color-predefine__colors{display:flex;flex:1;flex-wrap:wrap}.el-color-predefine__color-selector{border-radius:4px;cursor:pointer;height:20px;margin:0 0 8px 8px;width:20px}.el-color-predefine__color-selector:nth-child(10n+1){margin-left:0}.el-color-predefine__color-selector.selected{box-shadow:0 0 3px 2px var(--el-color-primary)}.el-color-predefine__color-selector>div{border-radius:3px;display:flex;height:100%}.el-color-predefine__color-selector.is-alpha{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.el-color-hue-slider{background-color:red;box-sizing:border-box;float:right;height:12px;padding:0 2px;position:relative;width:280px}.el-color-hue-slider__bar{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff,#00f 67%,#f0f 83%,red);height:100%;position:relative}.el-color-hue-slider__thumb{background:#fff;border:1px solid var(--el-border-color-lighter);border-radius:1px;box-shadow:0 0 2px #0009;box-sizing:border-box;cursor:pointer;height:100%;left:0;position:absolute;top:0;width:4px;z-index:1}.el-color-hue-slider__thumb:focus-visible{outline:2px solid var(--el-color-primary);outline-offset:1px}.el-color-hue-slider.is-vertical{height:180px;padding:2px 0;width:12px}.el-color-hue-slider.is-vertical .el-color-hue-slider__bar{background:linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff,#00f 67%,#f0f 83%,red)}.el-color-hue-slider.is-vertical .el-color-hue-slider__thumb{height:4px;left:0;top:0;width:100%}.el-color-svpanel{height:180px;position:relative;width:280px}.el-color-svpanel__black,.el-color-svpanel__white{inset:0;position:absolute}.el-color-svpanel__white{background:linear-gradient(90deg,#fff,#fff0)}.el-color-svpanel__black{background:linear-gradient(0deg,#000,#0000)}.el-color-svpanel__cursor{position:absolute}.el-color-svpanel__cursor>div{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px #0000004d,0 0 1px 2px #0006;cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}.el-color-alpha-slider{background-image:linear-gradient(45deg,var(--el-color-picker-alpha-bg-a) 25%,var(--el-color-picker-alpha-bg-b) 25%),linear-gradient(135deg,var(--el-color-picker-alpha-bg-a) 25%,var(--el-color-picker-alpha-bg-b) 25%),linear-gradient(45deg,var(--el-color-picker-alpha-bg-b) 75%,var(--el-color-picker-alpha-bg-a) 75%),linear-gradient(135deg,var(--el-color-picker-alpha-bg-b) 75%,var(--el-color-picker-alpha-bg-a) 75%);background-position:0 0,6px 0,6px -6px,0 6px;background-size:12px 12px;box-sizing:border-box;height:12px;position:relative;width:280px}.el-color-alpha-slider__bar{background:linear-gradient(to right,rgba(255,255,255,0) 0,var(--el-bg-color) 100%);height:100%;position:relative}.el-color-alpha-slider__thumb{background:#fff;border:1px solid var(--el-border-color-lighter);border-radius:1px;box-shadow:0 0 2px #0009;box-sizing:border-box;cursor:pointer;height:100%;left:0;position:absolute;top:0;width:4px;z-index:1}.el-color-alpha-slider__thumb:focus-visible{outline:2px solid var(--el-color-primary);outline-offset:1px}.el-color-alpha-slider.is-vertical{height:180px;width:20px}.el-color-alpha-slider.is-vertical .el-color-alpha-slider__bar{background:linear-gradient(180deg,#fff0 0,#fff)}.el-color-alpha-slider.is-vertical .el-color-alpha-slider__thumb{height:4px;left:0;top:0;width:100%}.el-color-dropdown{width:300px}.el-color-dropdown__main-wrapper{margin-bottom:6px}.el-color-dropdown__main-wrapper:after{clear:both;content:"";display:table}.el-color-dropdown__btns{margin-top:12px;text-align:right}.el-color-dropdown__value{color:#000;float:left;font-size:12px;line-height:26px;width:160px}.el-color-picker{display:inline-block;height:32px;line-height:normal;outline:none;position:relative;width:32px}.el-color-picker:hover:not(.is-disabled,.is-focused) .el-color-picker__trigger{border-color:var(--el-border-color-hover)}.el-color-picker:focus-visible:not(.is-disabled) .el-color-picker__trigger{outline:2px solid var(--el-color-primary);outline-offset:1px}.el-color-picker.is-focused .el-color-picker__trigger{border-color:var(--el-color-primary)}.el-color-picker.is-disabled .el-color-picker__trigger{background-color:var(--el-fill-color-light);cursor:not-allowed}.el-color-picker.is-disabled .el-color-picker__color{opacity:.3}.el-color-picker--large{height:40px;width:40px}.el-color-picker--small{height:24px;width:24px}.el-color-picker--small .el-color-picker__empty,.el-color-picker--small .el-color-picker__icon{transform:scale(.8)}.el-color-picker__trigger{align-items:center;border:1px solid var(--el-border-color);border-radius:4px;cursor:pointer;display:inline-flex;font-size:0;justify-content:center;padding:4px}.el-color-picker__color,.el-color-picker__trigger{box-sizing:border-box;height:100%;position:relative;width:100%}.el-color-picker__color{border:1px solid var(--el-text-color-secondary);border-radius:var(--el-border-radius-small);display:block;text-align:center}.el-color-picker__color.is-alpha{background-image:linear-gradient(45deg,var(--el-color-picker-alpha-bg-a) 25%,var(--el-color-picker-alpha-bg-b) 25%),linear-gradient(135deg,var(--el-color-picker-alpha-bg-a) 25%,var(--el-color-picker-alpha-bg-b) 25%),linear-gradient(45deg,var(--el-color-picker-alpha-bg-b) 75%,var(--el-color-picker-alpha-bg-a) 75%),linear-gradient(135deg,var(--el-color-picker-alpha-bg-b) 75%,var(--el-color-picker-alpha-bg-a) 75%);background-position:0 0,6px 0,6px -6px,0 6px;background-size:12px 12px}.el-color-picker__color-inner{align-items:center;display:inline-flex;height:100%;justify-content:center;width:100%}.el-color-picker .el-color-picker__empty{color:var(--el-text-color-secondary);font-size:12px}.el-color-picker .el-color-picker__icon{align-items:center;color:#fff;display:inline-flex;font-size:12px;justify-content:center}.el-color-picker__panel{background-color:#fff;border-radius:var(--el-border-radius-base);box-shadow:var(--el-box-shadow-light);box-sizing:content-box;padding:6px;position:absolute;z-index:10}.el-color-picker__panel.el-popper{border:1px solid var(--el-border-color-lighter)}.el-color-picker,.el-color-picker__panel{--el-color-picker-alpha-bg-a:#ccc;--el-color-picker-alpha-bg-b:transparent}.dark .el-color-picker,.dark .el-color-picker__panel{--el-color-picker-alpha-bg-a:#333333}.el-container{box-sizing:border-box;display:flex;flex:1;flex-basis:auto;flex-direction:row;min-width:0}.el-container.is-vertical{flex-direction:column}.el-date-table{font-size:12px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-date-table.is-week-mode .el-date-table__row:hover .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table.is-week-mode .el-date-table__row:hover td.available:hover{color:var(--el-datepicker-text-color)}.el-date-table.is-week-mode .el-date-table__row:hover td:first-child .el-date-table-cell{border-bottom-left-radius:15px;border-top-left-radius:15px;margin-left:5px}.el-date-table.is-week-mode .el-date-table__row:hover td:last-child .el-date-table-cell{border-bottom-right-radius:15px;border-top-right-radius:15px;margin-right:5px}.el-date-table.is-week-mode .el-date-table__row.current .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table td{box-sizing:border-box;cursor:pointer;height:30px;padding:4px 0;position:relative;text-align:center;width:32px}.el-date-table td .el-date-table-cell{box-sizing:border-box;height:30px;padding:3px 0}.el-date-table td .el-date-table-cell .el-date-table-cell__text{border-radius:50%;display:block;height:24px;left:50%;line-height:24px;margin:0 auto;position:absolute;transform:translate(-50%);width:24px}.el-date-table td.next-month,.el-date-table td.prev-month{color:var(--el-datepicker-off-text-color)}.el-date-table td.today{position:relative}.el-date-table td.today .el-date-table-cell__text{color:var(--el-color-primary);font-weight:700}.el-date-table td.today.end-date .el-date-table-cell__text,.el-date-table td.today.start-date .el-date-table-cell__text{color:#fff}.el-date-table td.available:hover{color:var(--el-datepicker-hover-text-color)}.el-date-table td.in-range .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-date-table td.in-range .el-date-table-cell:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-date-table td.current:not(.disabled) .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff}.el-date-table td.current:not(.disabled):focus-visible .el-date-table-cell__text{outline:2px solid var(--el-datepicker-active-color);outline-offset:1px}.el-date-table td.end-date .el-date-table-cell,.el-date-table td.start-date .el-date-table-cell{color:#fff}.el-date-table td.end-date .el-date-table-cell__text,.el-date-table td.start-date .el-date-table-cell__text{background-color:var(--el-datepicker-active-color)}.el-date-table td.start-date .el-date-table-cell{border-bottom-left-radius:15px;border-top-left-radius:15px;margin-left:5px}.el-date-table td.end-date .el-date-table-cell{border-bottom-right-radius:15px;border-top-right-radius:15px;margin-right:5px}.el-date-table td.disabled .el-date-table-cell{background-color:var(--el-fill-color-light);color:var(--el-text-color-placeholder);cursor:not-allowed;opacity:1}.el-date-table td.selected .el-date-table-cell{border-radius:15px;margin-left:5px;margin-right:5px}.el-date-table td.selected .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);border-radius:15px;color:#fff}.el-date-table td.week{color:var(--el-datepicker-off-text-color);cursor:default;font-size:80%}.el-date-table td:focus{outline:none}.el-date-table th{border-bottom:1px solid var(--el-border-color-lighter);color:var(--el-datepicker-header-text-color);font-weight:400;padding:5px}.el-date-table th.el-date-table__week-header{padding:0;width:24px}.el-month-table{border-collapse:collapse;font-size:12px;margin:-1px}.el-month-table td{cursor:pointer;padding:8px 0;position:relative;text-align:center;width:68px}.el-month-table td .el-date-table-cell{box-sizing:border-box;height:48px;padding:6px 0}.el-month-table td.today .el-date-table-cell__text{color:var(--el-color-primary);font-weight:700}.el-month-table td.today.end-date .el-date-table-cell__text,.el-month-table td.today.start-date .el-date-table-cell__text{color:#fff}.el-month-table td.disabled .el-date-table-cell__text{background-color:var(--el-fill-color-light);color:var(--el-text-color-placeholder);cursor:not-allowed}.el-month-table td.disabled .el-date-table-cell__text:hover{color:var(--el-text-color-placeholder)}.el-month-table td .el-date-table-cell__text{border-radius:18px;color:var(--el-datepicker-text-color);display:block;height:36px;left:50%;line-height:36px;margin:0 auto;position:absolute;transform:translate(-50%);width:54px}.el-month-table td .el-date-table-cell__text:hover{color:var(--el-datepicker-hover-text-color)}.el-month-table td.in-range .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-month-table td.in-range .el-date-table-cell:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-month-table td.end-date .el-date-table-cell,.el-month-table td.start-date .el-date-table-cell{color:#fff}.el-month-table td.end-date .el-date-table-cell__text,.el-month-table td.start-date .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff}.el-month-table td.start-date .el-date-table-cell{border-bottom-left-radius:24px;border-top-left-radius:24px;margin-left:3px}.el-month-table td.end-date .el-date-table-cell{border-bottom-right-radius:24px;border-top-right-radius:24px;margin-right:3px}.el-month-table td.current:not(.disabled) .el-date-table-cell{border-radius:24px;margin-left:3px;margin-right:3px}.el-month-table td.current:not(.disabled) .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff}.el-month-table td:focus-visible{outline:none}.el-month-table td:focus-visible .el-date-table-cell__text{outline:2px solid var(--el-datepicker-active-color);outline-offset:1px}.el-year-table{border-collapse:collapse;font-size:12px;margin:-1px}.el-year-table .el-icon{color:var(--el-datepicker-icon-color)}.el-year-table td{cursor:pointer;padding:8px 0;position:relative;text-align:center;width:68px}.el-year-table td .el-date-table-cell{box-sizing:border-box;height:48px;padding:6px 0}.el-year-table td.today .el-date-table-cell__text{color:var(--el-color-primary);font-weight:700}.el-year-table td.today.end-date .el-date-table-cell__text,.el-year-table td.today.start-date .el-date-table-cell__text{color:#fff}.el-year-table td.disabled .el-date-table-cell__text{background-color:var(--el-fill-color-light);color:var(--el-text-color-placeholder);cursor:not-allowed}.el-year-table td.disabled .el-date-table-cell__text:hover{color:var(--el-text-color-placeholder)}.el-year-table td .el-date-table-cell__text{border-radius:18px;color:var(--el-datepicker-text-color);display:block;height:36px;left:50%;line-height:36px;margin:0 auto;position:absolute;transform:translate(-50%);width:60px}.el-year-table td .el-date-table-cell__text:hover{color:var(--el-datepicker-hover-text-color)}.el-year-table td.in-range .el-date-table-cell{background-color:var(--el-datepicker-inrange-bg-color)}.el-year-table td.in-range .el-date-table-cell:hover{background-color:var(--el-datepicker-inrange-hover-bg-color)}.el-year-table td.end-date .el-date-table-cell,.el-year-table td.start-date .el-date-table-cell{color:#fff}.el-year-table td.end-date .el-date-table-cell__text,.el-year-table td.start-date .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff}.el-year-table td.start-date .el-date-table-cell{border-bottom-left-radius:24px;border-top-left-radius:24px}.el-year-table td.end-date .el-date-table-cell{border-bottom-right-radius:24px;border-top-right-radius:24px}.el-year-table td.current:not(.disabled) .el-date-table-cell__text{background-color:var(--el-datepicker-active-color);color:#fff}.el-year-table td:focus-visible{outline:none}.el-year-table td:focus-visible .el-date-table-cell__text{outline:2px solid var(--el-datepicker-active-color);outline-offset:1px}.el-time-spinner.has-seconds .el-time-spinner__wrapper{width:33.3%}.el-time-spinner__wrapper{display:inline-block;max-height:192px;overflow:auto;position:relative;vertical-align:top;width:50%}.el-time-spinner__wrapper.el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default){padding-bottom:15px}.el-time-spinner__wrapper.is-arrow{box-sizing:border-box;overflow:hidden;text-align:center}.el-time-spinner__wrapper.is-arrow .el-time-spinner__list{transform:translateY(-32px)}.el-time-spinner__wrapper.is-arrow .el-time-spinner__item:hover:not(.is-disabled):not(.is-active){background:var(--el-fill-color-light);cursor:default}.el-time-spinner__arrow{color:var(--el-text-color-secondary);cursor:pointer;font-size:12px;height:30px;left:0;line-height:30px;position:absolute;text-align:center;width:100%;z-index:var(--el-index-normal)}.el-time-spinner__arrow:hover{color:var(--el-color-primary)}.el-time-spinner__arrow.arrow-up{top:10px}.el-time-spinner__arrow.arrow-down{bottom:10px}.el-time-spinner__input.el-input{width:70%}.el-time-spinner__input.el-input .el-input__inner,.el-time-spinner__list{padding:0;text-align:center}.el-time-spinner__list{list-style:none;margin:0}.el-time-spinner__list:after,.el-time-spinner__list:before{content:"";display:block;height:80px;width:100%}.el-time-spinner__item{color:var(--el-text-color-regular);font-size:12px;height:32px;line-height:32px}.el-time-spinner__item:hover:not(.is-disabled):not(.is-active){background:var(--el-fill-color-light);cursor:pointer}.el-time-spinner__item.is-active:not(.is-disabled){color:var(--el-text-color-primary);font-weight:700}.el-time-spinner__item.is-disabled{color:var(--el-text-color-placeholder);cursor:not-allowed}.el-picker__popper{--el-datepicker-border-color:var(--el-disabled-border-color)}.el-picker__popper.el-popper{background:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-picker__popper.el-popper,.el-picker__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-datepicker-border-color)}.el-picker__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-picker__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-date-editor{--el-date-editor-width:220px;--el-date-editor-monthrange-width:300px;--el-date-editor-daterange-width:350px;--el-date-editor-datetimerange-width:400px;--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;position:relative;text-align:left;vertical-align:middle}.el-date-editor.el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset}.el-date-editor.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-date-editor.el-input,.el-date-editor.el-input__wrapper{height:var(--el-input-height,var(--el-component-size));width:var(--el-date-editor-width)}.el-date-editor--monthrange{--el-date-editor-width:var(--el-date-editor-monthrange-width)}.el-date-editor--daterange,.el-date-editor--timerange{--el-date-editor-width:var(--el-date-editor-daterange-width)}.el-date-editor--datetimerange{--el-date-editor-width:var(--el-date-editor-datetimerange-width)}.el-date-editor--dates .el-input__wrapper{text-overflow:ellipsis;white-space:nowrap}.el-date-editor .clear-icon,.el-date-editor .close-icon{cursor:pointer}.el-date-editor .clear-icon:hover{color:var(--el-input-clear-hover-color)}.el-date-editor .el-range__icon{color:var(--el-text-color-placeholder);float:left;font-size:14px;height:inherit}.el-date-editor .el-range__icon svg{vertical-align:middle}.el-date-editor .el-range-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:none;color:var(--el-text-color-regular);display:inline-block;font-size:var(--el-font-size-base);height:30px;line-height:30px;margin:0;outline:none;padding:0;text-align:center;width:39%}.el-date-editor .el-range-input::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-date-editor .el-range-input::placeholder{color:var(--el-text-color-placeholder)}.el-date-editor .el-range-separator{align-items:center;color:var(--el-text-color-primary);display:inline-flex;flex:1;font-size:14px;height:100%;justify-content:center;margin:0;overflow-wrap:break-word;padding:0 5px}.el-date-editor .el-range__close-icon{color:var(--el-text-color-placeholder);cursor:pointer;font-size:14px;height:inherit;width:unset}.el-date-editor .el-range__close-icon:hover{color:var(--el-input-clear-hover-color)}.el-date-editor .el-range__close-icon svg{vertical-align:middle}.el-date-editor .el-range__close-icon--hidden{opacity:0;visibility:hidden}.el-range-editor.el-input__wrapper{align-items:center;display:inline-flex;padding:0 10px;vertical-align:middle}.el-range-editor.is-active,.el-range-editor.is-active:hover{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-range-editor--large{line-height:var(--el-component-size-large)}.el-range-editor--large.el-input__wrapper{height:var(--el-component-size-large)}.el-range-editor--large .el-range-separator{font-size:14px;line-height:40px}.el-range-editor--large .el-range-input{font-size:14px;height:38px;line-height:38px}.el-range-editor--small{line-height:var(--el-component-size-small)}.el-range-editor--small.el-input__wrapper{height:var(--el-component-size-small)}.el-range-editor--small .el-range-separator{font-size:12px;line-height:24px}.el-range-editor--small .el-range-input{font-size:12px;height:22px;line-height:22px}.el-range-editor.is-disabled{background-color:var(--el-disabled-bg-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-range-editor.is-disabled,.el-range-editor.is-disabled:focus,.el-range-editor.is-disabled:hover{border-color:var(--el-disabled-border-color)}.el-range-editor.is-disabled input{background-color:var(--el-disabled-bg-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-range-editor.is-disabled input::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-range-editor.is-disabled input::placeholder{color:var(--el-text-color-placeholder)}.el-range-editor.is-disabled .el-range-separator{color:var(--el-disabled-text-color)}.el-picker-panel{background:var(--el-bg-color-overlay);border-radius:var(--el-popper-border-radius,var(--el-border-radius-base));color:var(--el-text-color-regular);line-height:30px}.el-picker-panel .el-time-panel{background-color:var(--el-bg-color-overlay);border:1px solid var(--el-datepicker-border-color);box-shadow:var(--el-box-shadow-light);margin:5px 0}.el-picker-panel__body-wrapper:after,.el-picker-panel__body:after{clear:both;content:"";display:table}.el-picker-panel__content{margin:15px;position:relative}.el-picker-panel__footer{background-color:var(--el-bg-color-overlay);border-top:1px solid var(--el-datepicker-inner-border-color);font-size:0;padding:4px 12px;position:relative;text-align:right}.el-picker-panel__shortcut{background-color:transparent;border:0;color:var(--el-datepicker-text-color);cursor:pointer;display:block;font-size:14px;line-height:28px;outline:none;padding-left:12px;text-align:left;width:100%}.el-picker-panel__shortcut:hover{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__shortcut.active{background-color:#e6f1fe;color:var(--el-datepicker-active-color)}.el-picker-panel__btn{background-color:transparent;border:1px solid var(--el-fill-color-darker);border-radius:2px;color:var(--el-text-color-primary);cursor:pointer;font-size:12px;line-height:24px;outline:none;padding:0 20px}.el-picker-panel__btn[disabled]{color:var(--el-text-color-disabled);cursor:not-allowed}.el-picker-panel__icon-btn{background:transparent;border:0;color:var(--el-datepicker-icon-color);cursor:pointer;font-size:12px;margin-top:8px;outline:none}.el-picker-panel__icon-btn:hover{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__icon-btn:focus-visible{color:var(--el-datepicker-hover-text-color)}.el-picker-panel__icon-btn.is-disabled{color:var(--el-text-color-disabled)}.el-picker-panel__icon-btn.is-disabled:hover{cursor:not-allowed}.el-picker-panel__icon-btn .el-icon{cursor:pointer;font-size:inherit}.el-picker-panel__link-btn{vertical-align:middle}.el-picker-panel [slot=sidebar],.el-picker-panel__sidebar{border-right:1px solid var(--el-datepicker-inner-border-color);bottom:0;box-sizing:border-box;overflow:auto;padding-top:6px;position:absolute;top:0;width:110px}.el-picker-panel [slot=sidebar]+.el-picker-panel__body,.el-picker-panel__sidebar+.el-picker-panel__body{margin-left:110px}.el-date-picker{--el-datepicker-text-color:var(--el-text-color-regular);--el-datepicker-off-text-color:var(--el-text-color-placeholder);--el-datepicker-header-text-color:var(--el-text-color-regular);--el-datepicker-icon-color:var(--el-text-color-primary);--el-datepicker-border-color:var(--el-disabled-border-color);--el-datepicker-inner-border-color:var(--el-border-color-light);--el-datepicker-inrange-bg-color:var(--el-border-color-extra-light);--el-datepicker-inrange-hover-bg-color:var(--el-border-color-extra-light);--el-datepicker-active-color:var(--el-color-primary);--el-datepicker-hover-text-color:var(--el-color-primary);width:322px}.el-date-picker.has-sidebar.has-time{width:434px}.el-date-picker.has-sidebar{width:438px}.el-date-picker.has-time .el-picker-panel__body-wrapper{position:relative}.el-date-picker .el-picker-panel__content{width:292px}.el-date-picker table{table-layout:fixed;width:100%}.el-date-picker__editor-wrap{display:table-cell;padding:0 5px;position:relative}.el-date-picker__time-header{border-bottom:1px solid var(--el-datepicker-inner-border-color);box-sizing:border-box;display:table;font-size:12px;padding:8px 5px 5px;position:relative;width:100%}.el-date-picker__header{padding:12px 12px 0;text-align:center}.el-date-picker__header--bordered{border-bottom:1px solid var(--el-border-color-lighter);margin-bottom:0;padding-bottom:12px}.el-date-picker__header--bordered+.el-picker-panel__content{margin-top:0}.el-date-picker__header-label{color:var(--el-text-color-regular);cursor:pointer;font-size:16px;font-weight:500;line-height:22px;padding:0 5px;text-align:center}.el-date-picker__header-label:hover{color:var(--el-datepicker-hover-text-color)}.el-date-picker__header-label:focus-visible{color:var(--el-datepicker-hover-text-color);outline:none}.el-date-picker__header-label.active{color:var(--el-datepicker-active-color)}.el-date-picker__prev-btn{float:left}.el-date-picker__next-btn{float:right}.el-date-picker__time-wrap{padding:10px;text-align:center}.el-date-picker__time-label{cursor:pointer;float:left;line-height:30px;margin-left:10px}.el-date-picker .el-time-panel{position:absolute}.el-date-range-picker{--el-datepicker-text-color:var(--el-text-color-regular);--el-datepicker-off-text-color:var(--el-text-color-placeholder);--el-datepicker-header-text-color:var(--el-text-color-regular);--el-datepicker-icon-color:var(--el-text-color-primary);--el-datepicker-border-color:var(--el-disabled-border-color);--el-datepicker-inner-border-color:var(--el-border-color-light);--el-datepicker-inrange-bg-color:var(--el-border-color-extra-light);--el-datepicker-inrange-hover-bg-color:var(--el-border-color-extra-light);--el-datepicker-active-color:var(--el-color-primary);--el-datepicker-hover-text-color:var(--el-color-primary);width:646px}.el-date-range-picker.has-sidebar{width:756px}.el-date-range-picker.has-time .el-picker-panel__body-wrapper{position:relative}.el-date-range-picker table{table-layout:fixed;width:100%}.el-date-range-picker .el-picker-panel__body{min-width:513px}.el-date-range-picker .el-picker-panel__content{margin:0}.el-date-range-picker__header{height:28px;position:relative;text-align:center}.el-date-range-picker__header [class*=arrow-left]{float:left}.el-date-range-picker__header [class*=arrow-right]{float:right}.el-date-range-picker__header div{font-size:16px;font-weight:500;margin-right:50px}.el-date-range-picker__header-label{color:var(--el-text-color-regular);cursor:pointer;font-size:16px;font-weight:500;line-height:22px;padding:0 5px;text-align:center}.el-date-range-picker__header-label:hover{color:var(--el-datepicker-hover-text-color)}.el-date-range-picker__header-label:focus-visible{color:var(--el-datepicker-hover-text-color);outline:none}.el-date-range-picker__header-label.active{color:var(--el-datepicker-active-color)}.el-date-range-picker__content{box-sizing:border-box;float:left;margin:0;padding:16px;width:50%}.el-date-range-picker__content.is-left{border-right:1px solid var(--el-datepicker-inner-border-color)}.el-date-range-picker__content .el-date-range-picker__header div{margin-left:50px;margin-right:50px}.el-date-range-picker__editors-wrap{box-sizing:border-box;display:table-cell}.el-date-range-picker__editors-wrap.is-right{text-align:right}.el-date-range-picker__time-header{border-bottom:1px solid var(--el-datepicker-inner-border-color);box-sizing:border-box;display:table;font-size:12px;padding:8px 5px 5px;position:relative;width:100%}.el-date-range-picker__time-header>.el-icon-arrow-right{color:var(--el-datepicker-icon-color);display:table-cell;font-size:20px;vertical-align:middle}.el-date-range-picker__time-picker-wrap{display:table-cell;padding:0 5px;position:relative}.el-date-range-picker__time-picker-wrap .el-picker-panel{background:#fff;position:absolute;right:0;top:13px;z-index:1}.el-date-range-picker__time-picker-wrap .el-time-panel{position:absolute}.el-time-range-picker{overflow:visible;width:354px}.el-time-range-picker__content{padding:10px;position:relative;text-align:center;z-index:1}.el-time-range-picker__cell{box-sizing:border-box;display:inline-block;margin:0;padding:4px 7px 7px;width:50%}.el-time-range-picker__header{font-size:14px;margin-bottom:5px;text-align:center}.el-time-range-picker__body{border:1px solid var(--el-datepicker-border-color);border-radius:2px}.el-time-panel{border-radius:2px;box-sizing:content-box;left:0;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:180px;z-index:var(--el-index-top)}.el-time-panel__content{font-size:0;overflow:hidden;position:relative}.el-time-panel__content:after,.el-time-panel__content:before{box-sizing:border-box;content:"";height:32px;left:0;margin-top:-16px;padding-top:6px;position:absolute;right:0;text-align:left;top:50%;z-index:-1}.el-time-panel__content:after{left:50%;margin-left:12%;margin-right:12%}.el-time-panel__content:before{border-bottom:1px solid var(--el-border-color-light);border-top:1px solid var(--el-border-color-light);margin-left:12%;margin-right:12%;padding-left:50%}.el-time-panel__content.has-seconds:after{left:66.6666666667%}.el-time-panel__content.has-seconds:before{padding-left:33.3333333333%}.el-time-panel__footer{border-top:1px solid var(--el-timepicker-inner-border-color,var(--el-border-color-light));box-sizing:border-box;height:36px;line-height:25px;padding:4px;text-align:right}.el-time-panel__btn{background-color:transparent;border:none;color:var(--el-text-color-primary);cursor:pointer;font-size:12px;line-height:28px;margin:0 5px;outline:none;padding:0 5px}.el-time-panel__btn.confirm{color:var(--el-timepicker-active-color,var(--el-color-primary));font-weight:800}.el-descriptions{--el-descriptions-table-border:1px solid var(--el-border-color-lighter);--el-descriptions-item-bordered-label-background:var(--el-fill-color-light);box-sizing:border-box;color:var(--el-text-color-primary);font-size:var(--el-font-size-base)}.el-descriptions__header{align-items:center;display:flex;justify-content:space-between;margin-bottom:16px}.el-descriptions__title{color:var(--el-text-color-primary);font-size:16px;font-weight:700}.el-descriptions__body{background-color:var(--el-fill-color-blank)}.el-descriptions__body .el-descriptions__table{border-collapse:collapse;width:100%}.el-descriptions__body .el-descriptions__table .el-descriptions__cell{box-sizing:border-box;font-size:14px;line-height:23px;text-align:left}.el-descriptions__body .el-descriptions__table .el-descriptions__cell.is-left{text-align:left}.el-descriptions__body .el-descriptions__table .el-descriptions__cell.is-center{text-align:center}.el-descriptions__body .el-descriptions__table .el-descriptions__cell.is-right{text-align:right}.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell{border:var(--el-descriptions-table-border);padding:8px 11px}.el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell{padding-bottom:12px}.el-descriptions--large{font-size:14px}.el-descriptions--large .el-descriptions__header{margin-bottom:20px}.el-descriptions--large .el-descriptions__header .el-descriptions__title{font-size:16px}.el-descriptions--large .el-descriptions__body .el-descriptions__table .el-descriptions__cell{font-size:14px}.el-descriptions--large .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell{padding:12px 15px}.el-descriptions--large .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell{padding-bottom:16px}.el-descriptions--small{font-size:12px}.el-descriptions--small .el-descriptions__header{margin-bottom:12px}.el-descriptions--small .el-descriptions__header .el-descriptions__title{font-size:14px}.el-descriptions--small .el-descriptions__body .el-descriptions__table .el-descriptions__cell{font-size:12px}.el-descriptions--small .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell{padding:4px 7px}.el-descriptions--small .el-descriptions__body .el-descriptions__table:not(.is-bordered) .el-descriptions__cell{padding-bottom:8px}.el-descriptions__label.el-descriptions__cell.is-bordered-label{background:var(--el-descriptions-item-bordered-label-background);color:var(--el-text-color-regular);font-weight:700}.el-descriptions__label:not(.is-bordered-label){color:var(--el-text-color-primary);margin-right:16px}.el-descriptions__label.el-descriptions__cell:not(.is-bordered-label).is-vertical-label{padding-bottom:6px}.el-descriptions__content.el-descriptions__cell.is-bordered-content{color:var(--el-text-color-primary)}.el-descriptions__content:not(.is-bordered-label){color:var(--el-text-color-regular)}.el-descriptions--large .el-descriptions__label:not(.is-bordered-label){margin-right:16px}.el-descriptions--large .el-descriptions__label.el-descriptions__cell:not(.is-bordered-label).is-vertical-label{padding-bottom:8px}.el-descriptions--small .el-descriptions__label:not(.is-bordered-label){margin-right:12px}.el-descriptions--small .el-descriptions__label.el-descriptions__cell:not(.is-bordered-label).is-vertical-label{padding-bottom:4px}:root{--el-popup-modal-bg-color:var(--el-color-black);--el-popup-modal-opacity:.5}.v-modal-enter{animation:v-modal-in var(--el-transition-duration-fast) ease}.v-modal-leave{animation:v-modal-out var(--el-transition-duration-fast) ease forwards}@keyframes v-modal-in{0%{opacity:0}}@keyframes v-modal-out{to{opacity:0}}.v-modal{background:var(--el-popup-modal-bg-color);height:100%;left:0;opacity:var(--el-popup-modal-opacity);position:fixed;top:0;width:100%}.el-popup-parent--hidden{overflow:hidden}.el-dialog{--el-dialog-width:50%;--el-dialog-margin-top:15vh;--el-dialog-bg-color:var(--el-bg-color);--el-dialog-box-shadow:var(--el-box-shadow);--el-dialog-title-font-size:var(--el-font-size-large);--el-dialog-content-font-size:14px;--el-dialog-font-line-height:var(--el-font-line-height-primary);--el-dialog-padding-primary:16px;--el-dialog-border-radius:var(--el-border-radius-base);background:var(--el-dialog-bg-color);border-radius:var(--el-dialog-border-radius);box-shadow:var(--el-dialog-box-shadow);box-sizing:border-box;margin:var(--el-dialog-margin-top,15vh) auto 50px;overflow-wrap:break-word;padding:var(--el-dialog-padding-primary);position:relative;width:var(--el-dialog-width,50%)}.el-dialog:focus{outline:none!important}.el-dialog.is-align-center{margin:auto}.el-dialog.is-fullscreen{--el-dialog-width:100%;--el-dialog-margin-top:0;border-radius:0;height:100%;margin-bottom:0;overflow:auto}.el-dialog__wrapper{inset:0;margin:0;overflow:auto;position:fixed}.el-dialog.is-draggable .el-dialog__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-dialog__header{padding-bottom:var(--el-dialog-padding-primary)}.el-dialog__header.show-close{padding-right:calc(var(--el-dialog-padding-primary) + var(--el-message-close-size, 16px))}.el-dialog__headerbtn{background:transparent;border:none;cursor:pointer;font-size:var(--el-message-close-size,16px);height:48px;outline:none;padding:0;position:absolute;right:0;top:0;width:48px}.el-dialog__headerbtn .el-dialog__close{color:var(--el-color-info);font-size:inherit}.el-dialog__headerbtn:focus .el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{color:var(--el-color-primary)}.el-dialog__title{color:var(--el-text-color-primary);font-size:var(--el-dialog-title-font-size);line-height:var(--el-dialog-font-line-height)}.el-dialog__body{color:var(--el-text-color-regular);font-size:var(--el-dialog-content-font-size)}.el-dialog__footer{box-sizing:border-box;padding-top:var(--el-dialog-padding-primary);text-align:right}.el-dialog--center{text-align:center}.el-dialog--center .el-dialog__body{text-align:initial}.el-dialog--center .el-dialog__footer{text-align:inherit}.el-overlay-dialog{inset:0;overflow:auto;position:fixed}.dialog-fade-enter-active{animation:modal-fade-in var(--el-transition-duration)}.dialog-fade-enter-active .el-overlay-dialog{animation:dialog-fade-in var(--el-transition-duration)}.dialog-fade-leave-active{animation:modal-fade-out var(--el-transition-duration)}.dialog-fade-leave-active .el-overlay-dialog{animation:dialog-fade-out var(--el-transition-duration)}@keyframes dialog-fade-in{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes dialog-fade-out{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20px,0)}}@keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}.el-divider{position:relative}.el-divider--horizontal{border-top:1px var(--el-border-color) var(--el-border-style);display:block;height:1px;margin:24px 0;width:100%}.el-divider--vertical{border-left:1px var(--el-border-color) var(--el-border-style);display:inline-block;height:1em;margin:0 8px;position:relative;vertical-align:middle;width:1px}.el-divider__text{background-color:var(--el-bg-color);color:var(--el-text-color-primary);font-size:14px;font-weight:500;padding:0 20px;position:absolute}.el-divider__text.is-left{left:20px;transform:translateY(-50%)}.el-divider__text.is-center{left:50%;transform:translate(-50%) translateY(-50%)}.el-divider__text.is-right{right:20px;transform:translateY(-50%)}.el-drawer{--el-drawer-bg-color:var(--el-dialog-bg-color,var(--el-bg-color));--el-drawer-padding-primary:var(--el-dialog-padding-primary,20px);background-color:var(--el-drawer-bg-color);box-shadow:var(--el-box-shadow-dark);box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;position:absolute;transition:all var(--el-transition-duration)}.el-drawer .btt,.el-drawer .ltr,.el-drawer .rtl,.el-drawer .ttb{transform:translate(0)}.el-drawer__sr-focus:focus{outline:none!important}.el-drawer__header{align-items:center;color:var(--el-text-color-primary);display:flex;margin-bottom:32px;padding:var(--el-drawer-padding-primary);padding-bottom:0}.el-drawer__header>:first-child{flex:1}.el-drawer__title{flex:1;font-size:16px;line-height:inherit;margin:0}.el-drawer__footer{padding:var(--el-drawer-padding-primary);padding-top:10px;text-align:right}.el-drawer__close-btn{background-color:transparent;border:none;color:inherit;cursor:pointer;display:inline-flex;font-size:var(--el-font-size-extra-large);outline:none}.el-drawer__close-btn:focus i,.el-drawer__close-btn:hover i{color:var(--el-color-primary)}.el-drawer__body{flex:1;overflow:auto;padding:var(--el-drawer-padding-primary)}.el-drawer__body>*{box-sizing:border-box}.el-drawer.ltr,.el-drawer.rtl{bottom:0;height:100%;top:0}.el-drawer.btt,.el-drawer.ttb{left:0;right:0;width:100%}.el-drawer.ltr{left:0}.el-drawer.rtl{right:0}.el-drawer.ttb{top:0}.el-drawer.btt{bottom:0}.el-drawer-fade-enter-active,.el-drawer-fade-leave-active{transition:all var(--el-transition-duration)}.el-drawer-fade-enter-active,.el-drawer-fade-enter-from,.el-drawer-fade-enter-to,.el-drawer-fade-leave-active,.el-drawer-fade-leave-from,.el-drawer-fade-leave-to{overflow:hidden!important}.el-drawer-fade-enter-from,.el-drawer-fade-leave-to{background-color:transparent!important}.el-drawer-fade-enter-from .rtl,.el-drawer-fade-leave-to .rtl{transform:translate(100%)}.el-drawer-fade-enter-from .ltr,.el-drawer-fade-leave-to .ltr{transform:translate(-100%)}.el-drawer-fade-enter-from .ttb,.el-drawer-fade-leave-to .ttb{transform:translateY(-100%)}.el-drawer-fade-enter-from .btt,.el-drawer-fade-leave-to .btt{transform:translateY(100%)}.el-dropdown{--el-dropdown-menu-box-shadow:var(--el-box-shadow-light);--el-dropdown-menuItem-hover-fill:var(--el-color-primary-light-9);--el-dropdown-menuItem-hover-color:var(--el-color-primary);--el-dropdown-menu-index:10;color:var(--el-text-color-regular);display:inline-flex;font-size:var(--el-font-size-base);line-height:1;position:relative;vertical-align:top}.el-dropdown.is-disabled{color:var(--el-text-color-placeholder);cursor:not-allowed}.el-dropdown__popper{--el-dropdown-menu-box-shadow:var(--el-box-shadow-light);--el-dropdown-menuItem-hover-fill:var(--el-color-primary-light-9);--el-dropdown-menuItem-hover-color:var(--el-color-primary);--el-dropdown-menu-index:10}.el-dropdown__popper.el-popper{background:var(--el-bg-color-overlay);box-shadow:var(--el-dropdown-menu-box-shadow)}.el-dropdown__popper.el-popper,.el-dropdown__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-border-color-light)}.el-dropdown__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-dropdown__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-dropdown__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-dropdown__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-dropdown__popper .el-dropdown-menu{border:none}.el-dropdown__popper .el-dropdown__popper-selfdefine{outline:none}.el-dropdown__popper .el-scrollbar__bar{z-index:calc(var(--el-dropdown-menu-index) + 1)}.el-dropdown__popper .el-dropdown__list{box-sizing:border-box;list-style:none;margin:0;padding:0}.el-dropdown .el-dropdown__caret-button{align-items:center;border-left:none;display:inline-flex;justify-content:center;padding-left:0;padding-right:0;width:32px}.el-dropdown .el-dropdown__caret-button>span{display:inline-flex}.el-dropdown .el-dropdown__caret-button:before{background:var(--el-overlay-color-lighter);bottom:-1px;content:"";display:block;left:0;position:absolute;top:-1px;width:1px}.el-dropdown .el-dropdown__caret-button.el-button:before{background:var(--el-border-color);opacity:.5}.el-dropdown .el-dropdown__caret-button .el-dropdown__icon{font-size:inherit;padding-left:0}.el-dropdown .el-dropdown-selfdefine{outline:none}.el-dropdown--large .el-dropdown__caret-button{width:40px}.el-dropdown--small .el-dropdown__caret-button{width:24px}.el-dropdown-menu{background-color:var(--el-bg-color-overlay);border:none;border-radius:var(--el-border-radius-base);box-shadow:none;left:0;list-style:none;margin:0;padding:5px 0;position:relative;top:0;z-index:var(--el-dropdown-menu-index)}.el-dropdown-menu__item{align-items:center;color:var(--el-text-color-regular);cursor:pointer;display:flex;font-size:var(--el-font-size-base);line-height:22px;list-style:none;margin:0;outline:none;padding:5px 16px;white-space:nowrap}.el-dropdown-menu__item:not(.is-disabled):focus,.el-dropdown-menu__item:not(.is-disabled):hover{background-color:var(--el-dropdown-menuItem-hover-fill);color:var(--el-dropdown-menuItem-hover-color)}.el-dropdown-menu__item i{margin-right:5px}.el-dropdown-menu__item--divided{border-top:1px solid var(--el-border-color-lighter);margin:6px 0}.el-dropdown-menu__item.is-disabled{color:var(--el-text-color-disabled);cursor:not-allowed}.el-dropdown-menu--large{padding:7px 0}.el-dropdown-menu--large .el-dropdown-menu__item{font-size:14px;line-height:22px;padding:7px 20px}.el-dropdown-menu--large .el-dropdown-menu__item--divided{margin:8px 0}.el-dropdown-menu--small{padding:3px 0}.el-dropdown-menu--small .el-dropdown-menu__item{font-size:12px;line-height:20px;padding:2px 12px}.el-dropdown-menu--small .el-dropdown-menu__item--divided{margin:4px 0}.el-empty{--el-empty-padding:40px 0;--el-empty-image-width:160px;--el-empty-description-margin-top:20px;--el-empty-bottom-margin-top:20px;--el-empty-fill-color-0:var(--el-color-white);--el-empty-fill-color-1:#fcfcfd;--el-empty-fill-color-2:#f8f9fb;--el-empty-fill-color-3:#f7f8fc;--el-empty-fill-color-4:#eeeff3;--el-empty-fill-color-5:#edeef2;--el-empty-fill-color-6:#e9ebef;--el-empty-fill-color-7:#e5e7e9;--el-empty-fill-color-8:#e0e3e9;--el-empty-fill-color-9:#d5d7de;align-items:center;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:var(--el-empty-padding);text-align:center}.el-empty__image{width:var(--el-empty-image-width)}.el-empty__image img{height:100%;-o-object-fit:contain;object-fit:contain;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:top;width:100%}.el-empty__image svg{color:var(--el-svg-monochrome-grey);fill:currentColor;height:100%;vertical-align:top;width:100%}.el-empty__description{margin-top:var(--el-empty-description-margin-top)}.el-empty__description p{color:var(--el-text-color-secondary);font-size:var(--el-font-size-base);margin:0}.el-empty__bottom{margin-top:var(--el-empty-bottom-margin-top)}.el-footer{--el-footer-padding:0 20px;--el-footer-height:60px;box-sizing:border-box;flex-shrink:0;height:var(--el-footer-height);padding:var(--el-footer-padding)}.el-form{--el-form-label-font-size:var(--el-font-size-base);--el-form-inline-content-width:220px}.el-form--inline .el-form-item{display:inline-flex;margin-right:32px;vertical-align:middle}.el-form--inline.el-form--label-top{display:flex;flex-wrap:wrap}.el-form--inline.el-form--label-top .el-form-item{display:block}.el-form-item{display:flex;--font-size:14px;margin-bottom:18px}.el-form-item .el-form-item{margin-bottom:0}.el-form-item .el-input__validateIcon{display:none}.el-form-item--large{--font-size:14px;--el-form-label-font-size:var(--font-size);margin-bottom:22px}.el-form-item--large .el-form-item__label{height:40px;line-height:40px}.el-form-item--large .el-form-item__content{line-height:40px}.el-form-item--large .el-form-item__error{padding-top:4px}.el-form-item--default{--font-size:14px;--el-form-label-font-size:var(--font-size);margin-bottom:18px}.el-form-item--default .el-form-item__label{height:32px;line-height:32px}.el-form-item--default .el-form-item__content{line-height:32px}.el-form-item--default .el-form-item__error{padding-top:2px}.el-form-item--small{--font-size:12px;--el-form-label-font-size:var(--font-size);margin-bottom:18px}.el-form-item--small .el-form-item__label{height:24px;line-height:24px}.el-form-item--small .el-form-item__content{line-height:24px}.el-form-item--small .el-form-item__error{padding-top:2px}.el-form-item--label-left .el-form-item__label{justify-content:flex-start;text-align:left}.el-form-item--label-right .el-form-item__label{justify-content:flex-end;text-align:right}.el-form-item--label-top{display:block}.el-form-item--label-top .el-form-item__label{display:block;height:auto;line-height:22px;margin-bottom:8px;text-align:left}.el-form-item__label-wrap{display:flex}.el-form-item__label{align-items:flex-start;box-sizing:border-box;color:var(--el-text-color-regular);display:inline-flex;flex:0 0 auto;font-size:var(--el-form-label-font-size);height:32px;line-height:32px;padding:0 12px 0 0}.el-form-item__content{align-items:center;display:flex;flex:1;flex-wrap:wrap;font-size:var(--font-size);line-height:32px;min-width:0;position:relative}.el-form-item__content .el-input-group{vertical-align:top}.el-form-item__error{color:var(--el-color-danger);font-size:12px;left:0;line-height:1;padding-top:2px;position:absolute;top:100%}.el-form-item__error--inline{display:inline-block;left:auto;margin-left:10px;position:relative;top:auto}.el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label-wrap>.el-form-item__label:before,.el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label:before{color:var(--el-color-danger);content:"*";margin-right:4px}.el-form-item.is-required:not(.is-no-asterisk).asterisk-right>.el-form-item__label-wrap>.el-form-item__label:after,.el-form-item.is-required:not(.is-no-asterisk).asterisk-right>.el-form-item__label:after{color:var(--el-color-danger);content:"*";margin-left:4px}.el-form-item.is-error .el-form-item__content .el-input-tag__wrapper,.el-form-item.is-error .el-form-item__content .el-input-tag__wrapper.is-focus,.el-form-item.is-error .el-form-item__content .el-input-tag__wrapper:focus,.el-form-item.is-error .el-form-item__content .el-input-tag__wrapper:hover,.el-form-item.is-error .el-form-item__content .el-input__wrapper,.el-form-item.is-error .el-form-item__content .el-input__wrapper.is-focus,.el-form-item.is-error .el-form-item__content .el-input__wrapper:focus,.el-form-item.is-error .el-form-item__content .el-input__wrapper:hover,.el-form-item.is-error .el-form-item__content .el-select__wrapper,.el-form-item.is-error .el-form-item__content .el-select__wrapper.is-focus,.el-form-item.is-error .el-form-item__content .el-select__wrapper:focus,.el-form-item.is-error .el-form-item__content .el-select__wrapper:hover,.el-form-item.is-error .el-form-item__content .el-textarea__inner,.el-form-item.is-error .el-form-item__content .el-textarea__inner.is-focus,.el-form-item.is-error .el-form-item__content .el-textarea__inner:focus,.el-form-item.is-error .el-form-item__content .el-textarea__inner:hover{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-form-item.is-error .el-form-item__content .el-input-group__append .el-input__wrapper,.el-form-item.is-error .el-form-item__content .el-input-group__prepend .el-input__wrapper{box-shadow:inset 0 0 0 1px transparent}.el-form-item.is-error .el-form-item__content .el-input-group__append .el-input__validateIcon,.el-form-item.is-error .el-form-item__content .el-input-group__prepend .el-input__validateIcon{display:none}.el-form-item.is-error .el-form-item__content .el-input__validateIcon{color:var(--el-color-danger)}.el-form-item--feedback .el-input__validateIcon{display:inline-flex}.el-header{--el-header-padding:0 20px;--el-header-height:60px;box-sizing:border-box;flex-shrink:0;height:var(--el-header-height);padding:var(--el-header-padding)}.el-image-viewer__wrapper{inset:0;position:fixed}.el-image-viewer__wrapper:focus{outline:none!important}.el-image-viewer__btn{align-items:center;border-radius:50%;box-sizing:border-box;cursor:pointer;display:flex;justify-content:center;opacity:.8;position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;z-index:1}.el-image-viewer__btn .el-icon{cursor:pointer}.el-image-viewer__close{font-size:40px;height:40px;right:40px;top:40px;width:40px}.el-image-viewer__canvas{align-items:center;display:flex;height:100%;justify-content:center;position:static;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:100%}.el-image-viewer__actions{background-color:var(--el-text-color-regular);border-color:#fff;border-radius:22px;bottom:30px;height:44px;left:50%;padding:0 23px;transform:translate(-50%)}.el-image-viewer__actions__inner{align-items:center;color:#fff;cursor:default;display:flex;font-size:23px;gap:22px;height:100%;justify-content:space-around;padding:0 6px;width:100%}.el-image-viewer__actions__divider{margin:0 -6px}.el-image-viewer__progress{bottom:90px;color:#fff;cursor:default;left:50%;transform:translate(-50%)}.el-image-viewer__prev{left:40px}.el-image-viewer__next,.el-image-viewer__prev{background-color:var(--el-text-color-regular);border-color:#fff;color:#fff;font-size:24px;height:44px;top:50%;transform:translateY(-50%);width:44px}.el-image-viewer__next{right:40px;text-indent:2px}.el-image-viewer__close{background-color:var(--el-text-color-regular);border-color:#fff;color:#fff;font-size:24px;height:44px;width:44px}.el-image-viewer__mask{background:#000;height:100%;left:0;opacity:.5;position:absolute;top:0;width:100%}.viewer-fade-enter-active{animation:viewer-fade-in var(--el-transition-duration)}.viewer-fade-leave-active{animation:viewer-fade-out var(--el-transition-duration)}@keyframes viewer-fade-in{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}@keyframes viewer-fade-out{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20px,0)}}.el-image__error,.el-image__inner,.el-image__placeholder,.el-image__wrapper{height:100%;width:100%}.el-image{display:inline-block;overflow:hidden;position:relative}.el-image__inner{opacity:1;vertical-align:top}.el-image__inner.is-loading{opacity:0}.el-image__wrapper{left:0;position:absolute;top:0}.el-image__error,.el-image__placeholder{background:var(--el-fill-color-light)}.el-image__error{align-items:center;color:var(--el-text-color-placeholder);display:flex;font-size:14px;justify-content:center;vertical-align:middle}.el-image__preview{cursor:pointer}.el-textarea{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;display:inline-block;font-size:var(--el-font-size-base);position:relative;vertical-align:bottom;width:100%}.el-textarea__inner{-webkit-appearance:none;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;box-sizing:border-box;color:var(--el-input-text-color,var(--el-text-color-regular));display:block;font-family:inherit;font-size:inherit;line-height:1.5;padding:5px 11px;position:relative;resize:vertical;transition:var(--el-transition-box-shadow);width:100%}.el-textarea__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-textarea__inner:focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset;outline:none}.el-textarea .el-input__count{background:var(--el-fill-color-blank);bottom:5px;color:var(--el-color-info);font-size:12px;line-height:14px;position:absolute;right:10px}.el-textarea.is-disabled .el-textarea__inner{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset;color:var(--el-disabled-text-color);cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-exceed .el-textarea__inner{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-textarea.is-exceed .el-input__count{color:var(--el-color-danger)}.el-input{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary);--el-input-width:100%;--el-input-height:var(--el-component-size);box-sizing:border-box;display:inline-flex;font-size:var(--el-font-size-base);line-height:var(--el-input-height);position:relative;vertical-align:middle;width:var(--el-input-width)}.el-input::-webkit-scrollbar{width:6px;z-index:11}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{background:var(--el-text-color-disabled);border-radius:5px;width:6px}.el-input::-webkit-scrollbar-corner,.el-input::-webkit-scrollbar-track{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track-piece{background:var(--el-fill-color-blank);width:6px}.el-input .el-input__clear,.el-input .el-input__password{color:var(--el-input-icon-color);cursor:pointer;font-size:14px}.el-input .el-input__clear:hover,.el-input .el-input__password:hover{color:var(--el-input-clear-hover-color)}.el-input .el-input__count{align-items:center;color:var(--el-color-info);display:inline-flex;font-size:12px;height:100%}.el-input .el-input__count .el-input__count-inner{background:var(--el-fill-color-blank);display:inline-block;line-height:normal;padding-left:8px}.el-input__wrapper{align-items:center;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;cursor:text;display:inline-flex;flex-grow:1;justify-content:center;padding:1px 11px;transform:translateZ(0);transition:var(--el-transition-box-shadow)}.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-input__wrapper.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-input{--el-input-inner-height:calc(var(--el-input-height, 32px) - 2px)}.el-input__inner{-webkit-appearance:none;background:none;border:none;box-sizing:border-box;color:var(--el-input-text-color,var(--el-text-color-regular));flex-grow:1;font-size:inherit;height:var(--el-input-inner-height);line-height:var(--el-input-inner-height);outline:none;padding:0;width:100%}.el-input__inner:focus{outline:none}.el-input__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner[type=password]::-ms-reveal{display:none}.el-input__inner[type=number]{line-height:1}.el-input__prefix{color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:inline-flex;flex-shrink:0;flex-wrap:nowrap;height:100%;line-height:var(--el-input-inner-height);pointer-events:none;text-align:center;transition:all var(--el-transition-duration);white-space:nowrap}.el-input__prefix-inner{align-items:center;display:inline-flex;justify-content:center;pointer-events:all}.el-input__prefix-inner>:last-child{margin-right:8px}.el-input__prefix-inner>:first-child,.el-input__prefix-inner>:first-child.el-input__icon{margin-left:0}.el-input__suffix{color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:inline-flex;flex-shrink:0;flex-wrap:nowrap;height:100%;line-height:var(--el-input-inner-height);pointer-events:none;text-align:center;transition:all var(--el-transition-duration);white-space:nowrap}.el-input__suffix-inner{align-items:center;display:inline-flex;justify-content:center;pointer-events:all}.el-input__suffix-inner>:first-child{margin-left:8px}.el-input .el-input__icon{align-items:center;display:flex;height:inherit;justify-content:center;line-height:inherit;margin-left:8px;transition:all var(--el-transition-duration)}.el-input__validateIcon{pointer-events:none}.el-input.is-active .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-color, ) inset}.el-input.is-disabled{cursor:not-allowed}.el-input.is-disabled .el-input__wrapper{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset;cursor:not-allowed}.el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color);-webkit-text-fill-color:var(--el-disabled-text-color);cursor:not-allowed}.el-input.is-disabled .el-input__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner::placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__wrapper{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-input.is-exceed .el-input__suffix .el-input__count{color:var(--el-color-danger)}.el-input--large{--el-input-height:var(--el-component-size-large);font-size:14px}.el-input--large .el-input__wrapper{padding:1px 15px}.el-input--large{--el-input-inner-height:calc(var(--el-input-height, 40px) - 2px)}.el-input--small{--el-input-height:var(--el-component-size-small);font-size:12px}.el-input--small .el-input__wrapper{padding:1px 7px}.el-input--small{--el-input-inner-height:calc(var(--el-input-height, 24px) - 2px)}.el-input-group{align-items:stretch;display:inline-flex;width:100%}.el-input-group__append,.el-input-group__prepend{align-items:center;background-color:var(--el-fill-color-light);border-radius:var(--el-input-border-radius);color:var(--el-color-info);display:inline-flex;justify-content:center;min-height:100%;padding:0 20px;position:relative;white-space:nowrap}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:none}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:0 -20px}.el-input-group__append button.el-button,.el-input-group__append button.el-button:hover,.el-input-group__append div.el-select .el-select__wrapper,.el-input-group__append div.el-select:hover .el-select__wrapper,.el-input-group__prepend button.el-button,.el-input-group__prepend button.el-button:hover,.el-input-group__prepend div.el-select .el-select__wrapper,.el-input-group__prepend div.el-select:hover .el-select__wrapper{background-color:transparent;border-color:transparent;color:inherit}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-bottom-right-radius:0;border-right:0;border-top-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group__append{border-left:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--prepend>.el-input__wrapper,.el-input-group__append{border-bottom-left-radius:0;border-top-left-radius:0}.el-input-group--prepend .el-input-group__prepend .el-select .el-select__wrapper{border-bottom-right-radius:0;border-top-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group--append>.el-input__wrapper{border-bottom-right-radius:0;border-top-right-radius:0}.el-input-group--append .el-input-group__append .el-select .el-select__wrapper{border-bottom-left-radius:0;border-top-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-hidden{display:none!important}.el-input-number{display:inline-flex;line-height:30px;position:relative;vertical-align:middle;width:150px}.el-input-number .el-input__wrapper{padding-left:42px;padding-right:42px}.el-input-number .el-input__inner{-webkit-appearance:none;-moz-appearance:textfield;line-height:1;text-align:center}.el-input-number .el-input__inner::-webkit-inner-spin-button,.el-input-number .el-input__inner::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.el-input-number__decrease,.el-input-number__increase{align-items:center;background:var(--el-fill-color-light);bottom:1px;color:var(--el-text-color-regular);cursor:pointer;display:flex;font-size:13px;height:auto;justify-content:center;position:absolute;top:1px;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:32px;z-index:1}.el-input-number__decrease:hover,.el-input-number__increase:hover{color:var(--el-color-primary)}.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper,.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-border-color,var(--el-color-primary)) inset}.el-input-number__decrease.is-disabled,.el-input-number__increase.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-input-number__increase{border-left:var(--el-border);border-radius:0 var(--el-border-radius-base) var(--el-border-radius-base) 0;right:1px}.el-input-number__decrease{border-radius:var(--el-border-radius-base) 0 0 var(--el-border-radius-base);border-right:var(--el-border);left:1px}.el-input-number.is-disabled .el-input-number__decrease,.el-input-number.is-disabled .el-input-number__increase{border-color:var(--el-disabled-border-color);color:var(--el-disabled-border-color)}.el-input-number.is-disabled .el-input-number__decrease:hover,.el-input-number.is-disabled .el-input-number__increase:hover{color:var(--el-disabled-border-color);cursor:not-allowed}.el-input-number--large{line-height:38px;width:180px}.el-input-number--large .el-input-number__decrease,.el-input-number--large .el-input-number__increase{font-size:14px;width:40px}.el-input-number--large.is-controls-right .el-input--large .el-input__wrapper{padding-right:47px}.el-input-number--large .el-input--large .el-input__wrapper{padding-left:47px;padding-right:47px}.el-input-number--small{line-height:22px;width:120px}.el-input-number--small .el-input-number__decrease,.el-input-number--small .el-input-number__increase{font-size:12px;width:24px}.el-input-number--small.is-controls-right .el-input--small .el-input__wrapper{padding-right:31px}.el-input-number--small .el-input--small .el-input__wrapper{padding-left:31px;padding-right:31px}.el-input-number--small .el-input-number__decrease [class*=el-icon],.el-input-number--small .el-input-number__increase [class*=el-icon]{transform:scale(.9)}.el-input-number.is-without-controls .el-input__wrapper{padding-left:15px;padding-right:15px}.el-input-number.is-controls-right .el-input__wrapper{padding-left:15px;padding-right:42px}.el-input-number.is-controls-right .el-input-number__decrease,.el-input-number.is-controls-right .el-input-number__increase{--el-input-number-controls-height:15px;height:var(--el-input-number-controls-height);line-height:var(--el-input-number-controls-height)}.el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon],.el-input-number.is-controls-right .el-input-number__increase [class*=el-icon]{transform:scale(.8)}.el-input-number.is-controls-right .el-input-number__increase{border-bottom:var(--el-border);border-radius:0 var(--el-border-radius-base) 0 0;bottom:auto;left:auto}.el-input-number.is-controls-right .el-input-number__decrease{border-left:var(--el-border);border-radius:0 0 var(--el-border-radius-base) 0;border-right:none;left:auto;right:1px;top:auto}.el-input-number.is-controls-right[class*=large] [class*=decrease],.el-input-number.is-controls-right[class*=large] [class*=increase]{--el-input-number-controls-height:19px}.el-input-number.is-controls-right[class*=small] [class*=decrease],.el-input-number.is-controls-right[class*=small] [class*=increase]{--el-input-number-controls-height:11px}.el-input-tag{--el-input-tag-border-color-hover:var(--el-border-color-hover);--el-input-tag-placeholder-color:var(--el-text-color-placeholder);--el-input-tag-disabled-color:var(--el-disabled-text-color);--el-input-tag-disabled-border:var(--el-disabled-border-color);--el-input-tag-font-size:var(--el-font-size-base);--el-input-tag-close-hover-color:var(--el-text-color-secondary);--el-input-tag-text-color:var(--el-text-color-regular);--el-input-tag-input-focus-border-color:var(--el-color-primary);--el-input-tag-width:100%;--el-input-tag-mini-height:var(--el-component-size);--el-input-tag-gap:6px;--el-input-tag-padding:4px;--el-input-tag-inner-padding:8px;--el-input-tag-line-height:24px;align-items:center;background-color:var(--el-fill-color-blank);border-radius:var(--el-border-radius-base);box-shadow:0 0 0 1px var(--el-border-color) inset;box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--el-input-tag-font-size);line-height:var(--el-input-tag-line-height);min-height:var(--el-input-tag-mini-height);padding:var(--el-input-tag-padding);transform:translateZ(0);transition:var(--el-transition-duration);width:var(--el-input-tag-width)}.el-input-tag.is-focused{box-shadow:0 0 0 1px var(--el-color-primary) inset}.el-input-tag.is-hovering:not(.is-focused){box-shadow:0 0 0 1px var(--el-border-color-hover) inset}.el-input-tag.is-disabled{background-color:var(--el-fill-color-light);cursor:not-allowed}.el-input-tag.is-disabled,.el-input-tag.is-disabled:hover{box-shadow:0 0 0 1px var(--el-input-tag-disabled-border) inset}.el-input-tag.is-disabled.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-input-tag.is-disabled .el-input-tag__inner .el-input-tag__input,.el-input-tag.is-disabled .el-input-tag__inner .el-tag{cursor:not-allowed}.el-input-tag__prefix,.el-input-tag__suffix{align-items:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:flex;flex-shrink:0;padding:0 var(--el-input-tag-inner-padding)}.el-input-tag__suffix{gap:8px}.el-input-tag__inner{align-items:center;display:flex;flex:1;flex-wrap:wrap;gap:var(--el-input-tag-gap);max-width:100%;min-width:0;position:relative}.el-input-tag__inner.is-left-space{margin-left:var(--el-input-tag-inner-padding)}.el-input-tag__inner.is-right-space{margin-right:var(--el-input-tag-inner-padding)}.el-input-tag__inner.is-draggable .el-tag{cursor:move;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-input-tag__drop-indicator{background-color:var(--el-color-primary);height:var(--el-input-tag-line-height);position:absolute;top:0;width:1px}.el-input-tag__inner .el-tag{border-color:transparent;cursor:pointer;max-width:100%}.el-input-tag__inner .el-tag.el-tag--plain{border-color:var(--el-tag-border-color)}.el-input-tag__inner .el-tag .el-tag__content{line-height:normal;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-input-tag__input-wrapper{flex:1}.el-input-tag__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:none;color:var(--el-input-tag-text-color);font-family:inherit;font-size:inherit;line-height:inherit;outline:none;padding:0;width:100%}.el-input-tag__input::-moz-placeholder{color:var(--el-input-tag-placeholder-color)}.el-input-tag__input::placeholder{color:var(--el-input-tag-placeholder-color)}.el-input-tag__input-calculator{left:0;max-width:100%;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:pre}.el-input-tag--large{--el-input-tag-gap:6px;--el-input-tag-padding:8px;--el-input-tag-padding-left:8px;--el-input-tag-font-size:14px}.el-input-tag--small{--el-input-tag-gap:4px;--el-input-tag-padding:2px;--el-input-tag-padding-left:6px;--el-input-tag-font-size:12px;--el-input-tag-line-height:20px;--el-input-tag-mini-height:var(--el-component-size-small)}.el-link{--el-link-font-size:var(--el-font-size-base);--el-link-font-weight:var(--el-font-weight-primary);--el-link-text-color:var(--el-text-color-regular);--el-link-hover-text-color:var(--el-color-primary);--el-link-disabled-text-color:var(--el-text-color-placeholder);align-items:center;color:var(--el-link-text-color);cursor:pointer;display:inline-flex;flex-direction:row;font-size:var(--el-link-font-size);font-weight:var(--el-link-font-weight);justify-content:center;outline:none;padding:0;position:relative;text-decoration:none;vertical-align:middle}.el-link.is-hover-underline:hover:after{border-bottom:1px solid var(--el-link-hover-text-color);bottom:0;content:"";height:0;left:0;position:absolute;right:0}.el-link.is-underline:after{border-bottom:1px solid var(--el-link-text-color);bottom:0;content:"";height:0;left:0;position:absolute;right:0}.el-link:hover{color:var(--el-link-hover-text-color)}.el-link:hover:after{border-color:var(--el-link-hover-text-color)}.el-link [class*=el-icon-]+span{margin-left:5px}.el-link__inner{align-items:center;display:inline-flex;justify-content:center}.el-link.el-link--primary{--el-link-text-color:var(--el-color-primary);--el-link-hover-text-color:var(--el-color-primary-light-3);--el-link-disabled-text-color:var(--el-color-primary-light-5)}.el-link.el-link--success{--el-link-text-color:var(--el-color-success);--el-link-hover-text-color:var(--el-color-success-light-3);--el-link-disabled-text-color:var(--el-color-success-light-5)}.el-link.el-link--warning{--el-link-text-color:var(--el-color-warning);--el-link-hover-text-color:var(--el-color-warning-light-3);--el-link-disabled-text-color:var(--el-color-warning-light-5)}.el-link.el-link--danger{--el-link-text-color:var(--el-color-danger);--el-link-hover-text-color:var(--el-color-danger-light-3);--el-link-disabled-text-color:var(--el-color-danger-light-5)}.el-link.el-link--error{--el-link-text-color:var(--el-color-error);--el-link-hover-text-color:var(--el-color-error-light-3);--el-link-disabled-text-color:var(--el-color-error-light-5)}.el-link.el-link--info{--el-link-text-color:var(--el-color-info);--el-link-hover-text-color:var(--el-color-info-light-3);--el-link-disabled-text-color:var(--el-color-info-light-5)}.el-link.is-disabled{color:var(--el-link-disabled-text-color);cursor:not-allowed}.el-link.is-disabled:after{border-color:var(--el-link-disabled-text-color)}:root{--el-loading-spinner-size:42px;--el-loading-fullscreen-spinner-size:50px}.el-loading-parent--relative{position:relative!important}.el-loading-parent--hidden{overflow:hidden!important}.el-loading-mask{background-color:var(--el-mask-color);inset:0;margin:0;position:absolute;transition:opacity var(--el-transition-duration);z-index:2000}.el-loading-mask.is-fullscreen{position:fixed}.el-loading-mask.is-fullscreen .el-loading-spinner{margin-top:calc((0px - var(--el-loading-fullscreen-spinner-size))/2)}.el-loading-mask.is-fullscreen .el-loading-spinner .circular{height:var(--el-loading-fullscreen-spinner-size);width:var(--el-loading-fullscreen-spinner-size)}.el-loading-spinner{margin-top:calc((0px - var(--el-loading-spinner-size))/2);position:absolute;text-align:center;top:50%;width:100%}.el-loading-spinner .el-loading-text{color:var(--el-color-primary);font-size:14px;margin:3px 0}.el-loading-spinner .circular{animation:loading-rotate 2s linear infinite;display:inline;height:var(--el-loading-spinner-size);width:var(--el-loading-spinner-size)}.el-loading-spinner .path{animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:var(--el-color-primary);stroke-linecap:round}.el-loading-spinner i{color:var(--el-color-primary)}.el-loading-fade-enter-from,.el-loading-fade-leave-to{opacity:0}@keyframes loading-rotate{to{transform:rotate(1turn)}}@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}.el-main{--el-main-padding:20px;box-sizing:border-box;display:block;flex:1;flex-basis:auto;overflow:auto;padding:var(--el-main-padding)}:root{--el-menu-active-color:var(--el-color-primary);--el-menu-text-color:var(--el-text-color-primary);--el-menu-hover-text-color:var(--el-color-primary);--el-menu-bg-color:var(--el-fill-color-blank);--el-menu-hover-bg-color:var(--el-color-primary-light-9);--el-menu-item-height:56px;--el-menu-sub-item-height:calc(var(--el-menu-item-height) - 6px);--el-menu-horizontal-height:60px;--el-menu-horizontal-sub-item-height:36px;--el-menu-item-font-size:var(--el-font-size-base);--el-menu-item-hover-fill:var(--el-color-primary-light-9);--el-menu-border-color:var(--el-border-color);--el-menu-base-level-padding:20px;--el-menu-level-padding:20px;--el-menu-icon-width:24px}.el-menu{background-color:var(--el-menu-bg-color);border-right:1px solid var(--el-menu-border-color);box-sizing:border-box;list-style:none;margin:0;padding-left:0;position:relative}.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item,.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-menu-item-group__title,.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title{padding-left:calc(var(--el-menu-base-level-padding) + var(--el-menu-level)*var(--el-menu-level-padding));white-space:nowrap}.el-menu:not(.el-menu--collapse) .el-sub-menu__title{padding-right:calc(var(--el-menu-base-level-padding) + var(--el-menu-icon-width))}.el-menu--horizontal{border-right:none;display:flex;flex-wrap:nowrap;height:var(--el-menu-horizontal-height)}.el-menu--horizontal.el-menu--popup-container{height:unset}.el-menu--horizontal.el-menu{border-bottom:1px solid var(--el-menu-border-color)}.el-menu--horizontal>.el-menu-item{align-items:center;border-bottom:2px solid transparent;color:var(--el-menu-text-color);display:inline-flex;height:100%;justify-content:center;margin:0}.el-menu--horizontal>.el-menu-item a,.el-menu--horizontal>.el-menu-item a:hover{color:inherit}.el-menu--horizontal>.el-sub-menu:focus,.el-menu--horizontal>.el-sub-menu:hover{outline:none}.el-menu--horizontal>.el-sub-menu:hover .el-sub-menu__title{color:var(--el-menu-hover-text-color)}.el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title{border-bottom:2px solid var(--el-menu-active-color);color:var(--el-menu-active-color)}.el-menu--horizontal>.el-sub-menu .el-sub-menu__title{border-bottom:2px solid transparent;color:var(--el-menu-text-color);height:100%}.el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover{background-color:var(--el-menu-bg-color)}.el-menu--horizontal .el-menu .el-menu-item,.el-menu--horizontal .el-menu .el-sub-menu__title{align-items:center;background-color:var(--el-menu-bg-color);color:var(--el-menu-text-color);display:flex;height:var(--el-menu-horizontal-sub-item-height);line-height:var(--el-menu-horizontal-sub-item-height);padding:0 10px}.el-menu--horizontal .el-menu .el-sub-menu__title{padding-right:40px}.el-menu--horizontal .el-menu .el-menu-item.is-active,.el-menu--horizontal .el-menu .el-menu-item.is-active:hover,.el-menu--horizontal .el-menu .el-sub-menu.is-active>.el-sub-menu__title,.el-menu--horizontal .el-menu .el-sub-menu.is-active>.el-sub-menu__title:hover{color:var(--el-menu-active-color)}.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,.el-menu--horizontal .el-menu-item:not(.is-disabled):hover{background-color:var(--el-menu-hover-bg-color);color:var(--el-menu-active-color,var(--el-menu-hover-text-color));outline:none}.el-menu--horizontal>.el-menu-item.is-active{border-bottom:2px solid var(--el-menu-active-color);color:var(--el-menu-active-color)!important}.el-menu--collapse{width:calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)*2)}.el-menu--collapse>.el-menu-item [class^=el-icon],.el-menu--collapse>.el-menu-item-group>ul>.el-sub-menu>.el-sub-menu__title [class^=el-icon],.el-menu--collapse>.el-sub-menu>.el-sub-menu__title [class^=el-icon]{margin:0;text-align:center;vertical-align:middle;width:var(--el-menu-icon-width)}.el-menu--collapse>.el-menu-item .el-sub-menu__icon-arrow,.el-menu--collapse>.el-menu-item-group>ul>.el-sub-menu>.el-sub-menu__title .el-sub-menu__icon-arrow,.el-menu--collapse>.el-sub-menu>.el-sub-menu__title .el-sub-menu__icon-arrow{display:none}.el-menu--collapse>.el-menu-item-group>ul>.el-sub-menu>.el-sub-menu__title>span,.el-menu--collapse>.el-menu-item>span,.el-menu--collapse>.el-sub-menu>.el-sub-menu__title>span{display:inline-block;height:0;overflow:hidden;visibility:hidden;width:0}.el-menu--collapse>.el-menu-item.is-active i{color:inherit}.el-menu--collapse .el-menu .el-sub-menu{min-width:200px}.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title{color:var(--el-menu-active-color)}.el-menu--popup{border:none;border-radius:var(--el-border-radius-small);box-shadow:var(--el-box-shadow-light);min-width:200px;padding:5px 0;z-index:100}.el-menu .el-icon{flex-shrink:0}.el-menu-item{align-items:center;box-sizing:border-box;color:var(--el-menu-text-color);cursor:pointer;display:flex;font-size:var(--el-menu-item-font-size);height:var(--el-menu-item-height);line-height:var(--el-menu-item-height);list-style:none;padding:0 var(--el-menu-base-level-padding);position:relative;transition:border-color var(--el-transition-duration),background-color var(--el-transition-duration),color var(--el-transition-duration);white-space:nowrap}.el-menu-item *{vertical-align:bottom}.el-menu-item i{color:inherit}.el-menu-item:focus,.el-menu-item:hover{outline:none}.el-menu-item:hover{background-color:var(--el-menu-hover-bg-color)}.el-menu-item.is-disabled{background:none!important;cursor:not-allowed;opacity:.25}.el-menu-item [class^=el-icon]{font-size:18px;margin-right:5px;text-align:center;vertical-align:middle;width:var(--el-menu-icon-width)}.el-menu-item.is-active{color:var(--el-menu-active-color)}.el-menu-item.is-active i{color:inherit}.el-menu-item .el-menu-tooltip__trigger{align-items:center;box-sizing:border-box;display:inline-flex;height:100%;left:0;padding:0 var(--el-menu-base-level-padding);position:absolute;top:0;width:100%}.el-sub-menu{list-style:none;margin:0;padding-left:0}.el-sub-menu__title{align-items:center;box-sizing:border-box;color:var(--el-menu-text-color);cursor:pointer;display:flex;font-size:var(--el-menu-item-font-size);height:var(--el-menu-item-height);line-height:var(--el-menu-item-height);list-style:none;padding:0 var(--el-menu-base-level-padding);position:relative;transition:border-color var(--el-transition-duration),background-color var(--el-transition-duration),color var(--el-transition-duration);white-space:nowrap}.el-sub-menu__title *{vertical-align:bottom}.el-sub-menu__title i{color:inherit}.el-sub-menu__title:focus,.el-sub-menu__title:hover{outline:none}.el-sub-menu__title.is-disabled{background:none!important;cursor:not-allowed;opacity:.25}.el-sub-menu__title:hover{background-color:var(--el-menu-hover-bg-color)}.el-sub-menu .el-menu{border:none}.el-sub-menu .el-menu-item{height:var(--el-menu-sub-item-height);line-height:var(--el-menu-sub-item-height)}.el-sub-menu__hide-arrow .el-sub-menu__icon-arrow{display:none!important}.el-sub-menu.is-active .el-sub-menu__title{border-bottom-color:var(--el-menu-active-color)}.el-sub-menu.is-disabled .el-menu-item,.el-sub-menu.is-disabled .el-sub-menu__title{background:none!important;cursor:not-allowed;opacity:.25}.el-sub-menu .el-icon{font-size:18px;margin-right:5px;text-align:center;vertical-align:middle;width:var(--el-menu-icon-width)}.el-sub-menu .el-icon.el-sub-menu__icon-more{margin-right:0!important}.el-sub-menu .el-sub-menu__icon-arrow{font-size:12px;margin-right:0;margin-top:-6px;position:absolute;right:var(--el-menu-base-level-padding);top:50%;transition:transform var(--el-transition-duration);width:inherit}.el-menu-item-group>ul{padding:0}.el-menu-item-group__title{color:var(--el-text-color-secondary);font-size:12px;line-height:normal;padding:7px 0 7px var(--el-menu-base-level-padding)}.horizontal-collapse-transition .el-sub-menu__title .el-sub-menu__icon-arrow{opacity:0;transition:var(--el-transition-duration-fast)}.el-message-box{--el-messagebox-title-color:var(--el-text-color-primary);--el-messagebox-width:420px;--el-messagebox-border-radius:4px;--el-messagebox-box-shadow:var(--el-box-shadow);--el-messagebox-font-size:var(--el-font-size-large);--el-messagebox-content-font-size:var(--el-font-size-base);--el-messagebox-content-color:var(--el-text-color-regular);--el-messagebox-error-font-size:12px;--el-messagebox-padding-primary:12px;--el-messagebox-font-line-height:var(--el-font-line-height-primary);backface-visibility:hidden;background-color:var(--el-bg-color);border-radius:var(--el-messagebox-border-radius);box-shadow:var(--el-messagebox-box-shadow);box-sizing:border-box;display:inline-block;font-size:var(--el-messagebox-font-size);max-width:var(--el-messagebox-width);overflow:hidden;overflow-wrap:break-word;padding:var(--el-messagebox-padding-primary);position:relative;text-align:left;vertical-align:middle;width:100%}.el-message-box:focus{outline:none!important}.el-overlay.is-message-box .el-overlay-message-box{inset:0;overflow:auto;padding:16px;position:fixed;text-align:center}.el-overlay.is-message-box .el-overlay-message-box:after{content:"";display:inline-block;height:100%;vertical-align:middle;width:0}.el-message-box.is-draggable .el-message-box__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-message-box__header{padding-bottom:var(--el-messagebox-padding-primary)}.el-message-box__header.show-close{padding-right:calc(var(--el-messagebox-padding-primary) + var(--el-message-close-size, 16px))}.el-message-box__title{color:var(--el-messagebox-title-color);font-size:var(--el-messagebox-font-size);line-height:var(--el-messagebox-font-line-height)}.el-message-box__headerbtn{background:transparent;border:none;cursor:pointer;font-size:var(--el-message-close-size,16px);height:40px;outline:none;padding:0;position:absolute;right:0;top:0;width:40px}.el-message-box__headerbtn .el-message-box__close{color:var(--el-color-info);font-size:inherit}.el-message-box__headerbtn:focus .el-message-box__close,.el-message-box__headerbtn:hover .el-message-box__close{color:var(--el-color-primary)}.el-message-box__content{color:var(--el-messagebox-content-color);font-size:var(--el-messagebox-content-font-size)}.el-message-box__container{align-items:center;display:flex;gap:12px}.el-message-box__input{padding-top:12px}.el-message-box__input div.invalid>input,.el-message-box__input div.invalid>input:focus{border-color:var(--el-color-error)}.el-message-box__status{font-size:24px}.el-message-box__status.el-message-box-icon--primary{--el-messagebox-color:var(--el-color-primary);color:var(--el-messagebox-color)}.el-message-box__status.el-message-box-icon--success{--el-messagebox-color:var(--el-color-success);color:var(--el-messagebox-color)}.el-message-box__status.el-message-box-icon--info{--el-messagebox-color:var(--el-color-info);color:var(--el-messagebox-color)}.el-message-box__status.el-message-box-icon--warning{--el-messagebox-color:var(--el-color-warning);color:var(--el-messagebox-color)}.el-message-box__status.el-message-box-icon--error{--el-messagebox-color:var(--el-color-error);color:var(--el-messagebox-color)}.el-message-box__message{margin:0;min-width:0}.el-message-box__message p{line-height:var(--el-messagebox-font-line-height);margin:0}.el-message-box__errormsg{color:var(--el-color-error);font-size:var(--el-messagebox-error-font-size);line-height:var(--el-messagebox-font-line-height)}.el-message-box__btns{align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-end;padding-top:var(--el-messagebox-padding-primary)}.el-message-box--center .el-message-box__title{align-items:center;display:flex;gap:6px;justify-content:center}.el-message-box--center .el-message-box__status{font-size:inherit}.el-message-box--center .el-message-box__btns,.el-message-box--center .el-message-box__container{justify-content:center}.fade-in-linear-enter-active .el-overlay-message-box{animation:msgbox-fade-in var(--el-transition-duration)}.fade-in-linear-leave-active .el-overlay-message-box{animation:msgbox-fade-in var(--el-transition-duration) reverse}@keyframes msgbox-fade-in{0%{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translateZ(0)}}.el-message{--el-message-bg-color:var(--el-color-info-light-9);--el-message-border-color:var(--el-border-color-lighter);--el-message-padding:11px 15px;--el-message-close-size:16px;--el-message-close-icon-color:var(--el-text-color-placeholder);--el-message-close-hover-color:var(--el-text-color-secondary);align-items:center;background-color:var(--el-message-bg-color);border-color:var(--el-message-border-color);border-radius:var(--el-border-radius-base);border-style:var(--el-border-style);border-width:var(--el-border-width);box-sizing:border-box;display:flex;gap:8px;left:50%;max-width:calc(100% - 32px);padding:var(--el-message-padding);position:fixed;top:20px;transform:translate(-50%);transition:opacity var(--el-transition-duration),transform .4s,top .4s;width:-moz-fit-content;width:fit-content}.el-message.is-plain{background-color:var(--el-bg-color-overlay);border-color:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-message p{margin:0}.el-message--primary{--el-message-bg-color:var(--el-color-primary-light-9);--el-message-border-color:var(--el-color-primary-light-8);--el-message-text-color:var(--el-color-primary)}.el-message--primary .el-message__content{color:var(--el-message-text-color);overflow-wrap:break-word}.el-message .el-message-icon--primary{color:var(--el-message-text-color)}.el-message--success{--el-message-bg-color:var(--el-color-success-light-9);--el-message-border-color:var(--el-color-success-light-8);--el-message-text-color:var(--el-color-success)}.el-message--success .el-message__content{color:var(--el-message-text-color);overflow-wrap:break-word}.el-message .el-message-icon--success{color:var(--el-message-text-color)}.el-message--info{--el-message-bg-color:var(--el-color-info-light-9);--el-message-border-color:var(--el-color-info-light-8);--el-message-text-color:var(--el-color-info)}.el-message--info .el-message__content{color:var(--el-message-text-color);overflow-wrap:break-word}.el-message .el-message-icon--info{color:var(--el-message-text-color)}.el-message--warning{--el-message-bg-color:var(--el-color-warning-light-9);--el-message-border-color:var(--el-color-warning-light-8);--el-message-text-color:var(--el-color-warning)}.el-message--warning .el-message__content{color:var(--el-message-text-color);overflow-wrap:break-word}.el-message .el-message-icon--warning{color:var(--el-message-text-color)}.el-message--error{--el-message-bg-color:var(--el-color-error-light-9);--el-message-border-color:var(--el-color-error-light-8);--el-message-text-color:var(--el-color-error)}.el-message--error .el-message__content{color:var(--el-message-text-color);overflow-wrap:break-word}.el-message .el-message-icon--error{color:var(--el-message-text-color)}.el-message .el-message__badge{position:absolute;right:-8px;top:-8px}.el-message__content{font-size:14px;line-height:1;padding:0}.el-message__content:focus{outline-width:0}.el-message .el-message__closeBtn{color:var(--el-message-close-icon-color);cursor:pointer;font-size:var(--el-message-close-size)}.el-message .el-message__closeBtn:focus{outline-width:0}.el-message .el-message__closeBtn:hover{color:var(--el-message-close-hover-color)}.el-message-fade-enter-from,.el-message-fade-leave-to{opacity:0;transform:translate(-50%,-100%)}.el-notification{--el-notification-width:330px;--el-notification-padding:14px 26px 14px 13px;--el-notification-radius:8px;--el-notification-shadow:var(--el-box-shadow-light);--el-notification-border-color:var(--el-border-color-lighter);--el-notification-icon-size:24px;--el-notification-close-font-size:var(--el-message-close-size,16px);--el-notification-group-margin-left:13px;--el-notification-group-margin-right:8px;--el-notification-content-font-size:var(--el-font-size-base);--el-notification-content-color:var(--el-text-color-regular);--el-notification-title-font-size:16px;--el-notification-title-color:var(--el-text-color-primary);--el-notification-close-color:var(--el-text-color-secondary);--el-notification-close-hover-color:var(--el-text-color-regular);background-color:var(--el-bg-color-overlay);border:1px solid var(--el-notification-border-color);border-radius:var(--el-notification-radius);box-shadow:var(--el-notification-shadow);box-sizing:border-box;display:flex;overflow:hidden;overflow-wrap:break-word;padding:var(--el-notification-padding);position:fixed;transition:opacity var(--el-transition-duration),transform var(--el-transition-duration),left var(--el-transition-duration),right var(--el-transition-duration),top .4s,bottom var(--el-transition-duration);width:var(--el-notification-width);z-index:9999}.el-notification.right{right:16px}.el-notification.left{left:16px}.el-notification__group{flex:1;margin-left:var(--el-notification-group-margin-left);margin-right:var(--el-notification-group-margin-right);min-width:0}.el-notification__title{color:var(--el-notification-title-color);font-size:var(--el-notification-title-font-size);font-weight:700;line-height:var(--el-notification-icon-size);margin:0}.el-notification__content{color:var(--el-notification-content-color);font-size:var(--el-notification-content-font-size);line-height:24px;margin:6px 0 0}.el-notification__content p{margin:0}.el-notification .el-notification__icon{flex-shrink:0;font-size:var(--el-notification-icon-size);height:var(--el-notification-icon-size);width:var(--el-notification-icon-size)}.el-notification .el-notification__closeBtn{color:var(--el-notification-close-color);cursor:pointer;font-size:var(--el-notification-close-font-size);position:absolute;right:15px;top:18px}.el-notification .el-notification__closeBtn:hover{color:var(--el-notification-close-hover-color)}.el-notification .el-notification--primary{--el-notification-icon-color:var(--el-color-primary);color:var(--el-notification-icon-color)}.el-notification .el-notification--success{--el-notification-icon-color:var(--el-color-success);color:var(--el-notification-icon-color)}.el-notification .el-notification--info{--el-notification-icon-color:var(--el-color-info);color:var(--el-notification-icon-color)}.el-notification .el-notification--warning{--el-notification-icon-color:var(--el-color-warning);color:var(--el-notification-icon-color)}.el-notification .el-notification--error{--el-notification-icon-color:var(--el-color-error);color:var(--el-notification-icon-color)}.el-notification-fade-enter-from.right{right:0;transform:translate(100%)}.el-notification-fade-enter-from.left{left:0;transform:translate(-100%)}.el-notification-fade-leave-to{opacity:0}.el-overlay{background-color:var(--el-overlay-color-lighter);height:100%;inset:0;overflow:auto;position:fixed;z-index:2000}.el-overlay .el-overlay-root{height:0}.el-page-header.is-contentful .el-page-header__main{border-top:1px solid var(--el-border-color-light);margin-top:16px}.el-page-header__header{align-items:center;display:flex;justify-content:space-between;line-height:24px}.el-page-header__left{align-items:center;display:flex;margin-right:40px;position:relative}.el-page-header__back{align-items:center;cursor:pointer;display:flex}.el-page-header__left .el-divider--vertical{margin:0 16px}.el-page-header__icon{align-items:center;display:flex;font-size:16px;margin-right:10px}.el-page-header__icon .el-icon{font-size:inherit}.el-page-header__title{font-size:14px;font-weight:500}.el-page-header__content{color:var(--el-text-color-primary);font-size:18px}.el-page-header__breadcrumb{margin-bottom:16px}.el-pagination{--el-pagination-font-size:14px;--el-pagination-bg-color:var(--el-fill-color-blank);--el-pagination-text-color:var(--el-text-color-primary);--el-pagination-border-radius:2px;--el-pagination-button-color:var(--el-text-color-primary);--el-pagination-button-width:32px;--el-pagination-button-height:32px;--el-pagination-button-disabled-color:var(--el-text-color-placeholder);--el-pagination-button-disabled-bg-color:var(--el-fill-color-blank);--el-pagination-button-bg-color:var(--el-fill-color);--el-pagination-hover-color:var(--el-color-primary);--el-pagination-font-size-small:12px;--el-pagination-button-width-small:24px;--el-pagination-button-height-small:24px;--el-pagination-button-width-large:40px;--el-pagination-button-height-large:40px;--el-pagination-item-gap:16px;align-items:center;color:var(--el-pagination-text-color);display:flex;font-size:var(--el-pagination-font-size);font-weight:400;white-space:nowrap}.el-pagination .el-input__inner{-moz-appearance:textfield;text-align:center}.el-pagination .el-select{width:128px}.el-pagination button{align-items:center;background:var(--el-pagination-bg-color);border:none;border-radius:var(--el-pagination-border-radius);box-sizing:border-box;color:var(--el-pagination-button-color);cursor:pointer;display:flex;font-size:var(--el-pagination-font-size);height:var(--el-pagination-button-height);justify-content:center;line-height:var(--el-pagination-button-height);min-width:var(--el-pagination-button-width);padding:0 4px;text-align:center}.el-pagination button *{pointer-events:none}.el-pagination button:focus{outline:none}.el-pagination button.is-active,.el-pagination button:hover{color:var(--el-pagination-hover-color)}.el-pagination button.is-active{cursor:default;font-weight:700}.el-pagination button.is-active.is-disabled{color:var(--el-text-color-secondary);font-weight:700}.el-pagination button.is-disabled,.el-pagination button:disabled{background-color:var(--el-pagination-button-disabled-bg-color);color:var(--el-pagination-button-disabled-color);cursor:not-allowed}.el-pagination button:focus-visible{outline:1px solid var(--el-pagination-hover-color);outline-offset:-1px}.el-pagination .btn-next .el-icon,.el-pagination .btn-prev .el-icon{display:block;font-size:12px;font-weight:700;width:inherit}.el-pagination>.is-first{margin-left:0!important}.el-pagination>.is-last{margin-right:0!important}.el-pagination .btn-prev{margin-left:var(--el-pagination-item-gap)}.el-pagination__sizes,.el-pagination__total{color:var(--el-text-color-regular);font-weight:400;margin-left:var(--el-pagination-item-gap)}.el-pagination__total[disabled=true]{color:var(--el-text-color-placeholder)}.el-pagination__jump{align-items:center;color:var(--el-text-color-regular);display:flex;font-weight:400;margin-left:var(--el-pagination-item-gap)}.el-pagination__jump[disabled=true]{color:var(--el-text-color-placeholder)}.el-pagination__goto{margin-right:8px}.el-pagination__editor{box-sizing:border-box;text-align:center}.el-pagination__editor.el-input{width:56px}.el-pagination__editor .el-input__inner::-webkit-inner-spin-button,.el-pagination__editor .el-input__inner::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.el-pagination__classifier{margin-left:8px}.el-pagination__rightwrapper{align-items:center;display:flex;flex:1;justify-content:flex-end}.el-pagination.is-background .btn-next,.el-pagination.is-background .btn-prev,.el-pagination.is-background .el-pager li{background-color:var(--el-pagination-button-bg-color);margin:0 4px}.el-pagination.is-background .btn-next.is-active,.el-pagination.is-background .btn-prev.is-active,.el-pagination.is-background .el-pager li.is-active{background-color:var(--el-color-primary);color:var(--el-color-white)}.el-pagination.is-background .btn-next.is-disabled,.el-pagination.is-background .btn-next:disabled,.el-pagination.is-background .btn-prev.is-disabled,.el-pagination.is-background .btn-prev:disabled,.el-pagination.is-background .el-pager li.is-disabled,.el-pagination.is-background .el-pager li:disabled{background-color:var(--el-disabled-bg-color);color:var(--el-text-color-placeholder)}.el-pagination.is-background .btn-next.is-disabled.is-active,.el-pagination.is-background .btn-next:disabled.is-active,.el-pagination.is-background .btn-prev.is-disabled.is-active,.el-pagination.is-background .btn-prev:disabled.is-active,.el-pagination.is-background .el-pager li.is-disabled.is-active,.el-pagination.is-background .el-pager li:disabled.is-active{background-color:var(--el-fill-color-dark);color:var(--el-text-color-secondary)}.el-pagination.is-background .btn-prev{margin-left:var(--el-pagination-item-gap)}.el-pagination--small .btn-next,.el-pagination--small .btn-prev,.el-pagination--small .el-pager li{font-size:var(--el-pagination-font-size-small);height:var(--el-pagination-button-height-small);line-height:var(--el-pagination-button-height-small);min-width:var(--el-pagination-button-width-small)}.el-pagination--small button,.el-pagination--small span:not([class*=suffix]){font-size:var(--el-pagination-font-size-small)}.el-pagination--small .el-select{width:100px}.el-pagination--large .btn-next,.el-pagination--large .btn-prev,.el-pagination--large .el-pager li{height:var(--el-pagination-button-height-large);line-height:var(--el-pagination-button-height-large);min-width:var(--el-pagination-button-width-large)}.el-pagination--large .el-select .el-input{width:160px}.el-pager{font-size:0;list-style:none;margin:0;padding:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-pager,.el-pager li{align-items:center;display:flex}.el-pager li{background:var(--el-pagination-bg-color);border:none;border-radius:var(--el-pagination-border-radius);box-sizing:border-box;color:var(--el-pagination-button-color);cursor:pointer;font-size:var(--el-pagination-font-size);height:var(--el-pagination-button-height);justify-content:center;line-height:var(--el-pagination-button-height);min-width:var(--el-pagination-button-width);padding:0 4px;text-align:center}.el-pager li *{pointer-events:none}.el-pager li:focus{outline:none}.el-pager li.is-active,.el-pager li:hover{color:var(--el-pagination-hover-color)}.el-pager li.is-active{cursor:default;font-weight:700}.el-pager li.is-active.is-disabled{color:var(--el-text-color-secondary);font-weight:700}.el-pager li.is-disabled,.el-pager li:disabled{background-color:var(--el-pagination-button-disabled-bg-color);color:var(--el-pagination-button-disabled-color);cursor:not-allowed}.el-pager li:focus-visible{outline:1px solid var(--el-pagination-hover-color);outline-offset:-1px}.el-popconfirm__main{align-items:center;display:flex}.el-popconfirm__icon{margin-right:5px}.el-popconfirm__action{margin-top:8px;text-align:right}.el-popover{--el-popover-bg-color:var(--el-bg-color-overlay);--el-popover-font-size:var(--el-font-size-base);--el-popover-border-color:var(--el-border-color-lighter);--el-popover-padding:12px;--el-popover-padding-large:18px 20px;--el-popover-title-font-size:16px;--el-popover-title-text-color:var(--el-text-color-primary);--el-popover-border-radius:4px}.el-popover.el-popper{background:var(--el-popover-bg-color);border:1px solid var(--el-popover-border-color);border-radius:var(--el-popover-border-radius);box-shadow:var(--el-box-shadow-light);box-sizing:border-box;color:var(--el-text-color-regular);font-size:var(--el-popover-font-size);line-height:1.4;min-width:150px;overflow-wrap:break-word;padding:var(--el-popover-padding);z-index:var(--el-index-popper)}.el-popover.el-popper--plain{padding:var(--el-popover-padding-large)}.el-popover__title{color:var(--el-popover-title-text-color);font-size:var(--el-popover-title-font-size);line-height:1;margin-bottom:12px}.el-popover__reference:focus:hover,.el-popover__reference:focus:not(.focusing){outline-width:0}.el-popover.el-popper.is-dark{--el-popover-bg-color:var(--el-text-color-primary);--el-popover-border-color:var(--el-text-color-primary);--el-popover-title-text-color:var(--el-bg-color);color:var(--el-bg-color)}.el-popover.el-popper:focus,.el-popover.el-popper:focus:active{outline-width:0}.el-progress{align-items:center;display:flex;line-height:1;position:relative}.el-progress__text{color:var(--el-text-color-regular);font-size:14px;line-height:1;margin-left:5px;min-width:50px}.el-progress__text i{display:block;vertical-align:middle}.el-progress--circle,.el-progress--dashboard{display:inline-block}.el-progress--circle .el-progress__text,.el-progress--dashboard .el-progress__text{left:0;margin:0;position:absolute;text-align:center;top:50%;transform:translateY(-50%);width:100%}.el-progress--circle .el-progress__text i,.el-progress--dashboard .el-progress__text i{display:inline-block;vertical-align:middle}.el-progress--without-text .el-progress__text{display:none}.el-progress--without-text .el-progress-bar{display:block;margin-right:0;padding-right:0}.el-progress--text-inside .el-progress-bar{margin-right:0;padding-right:0}.el-progress.is-success .el-progress-bar__inner{background-color:var(--el-color-success)}.el-progress.is-success .el-progress__text{color:var(--el-color-success)}.el-progress.is-warning .el-progress-bar__inner{background-color:var(--el-color-warning)}.el-progress.is-warning .el-progress__text{color:var(--el-color-warning)}.el-progress.is-exception .el-progress-bar__inner{background-color:var(--el-color-danger)}.el-progress.is-exception .el-progress__text{color:var(--el-color-danger)}.el-progress-bar{box-sizing:border-box;flex-grow:1}.el-progress-bar__outer{background-color:var(--el-border-color-lighter);border-radius:100px;height:6px;overflow:hidden;position:relative;vertical-align:middle}.el-progress-bar__inner{background-color:var(--el-color-primary);border-radius:100px;height:100%;left:0;line-height:1;position:absolute;text-align:right;top:0;transition:width .6s ease;white-space:nowrap}.el-progress-bar__inner:after{content:"";display:inline-block;height:100%;vertical-align:middle}.el-progress-bar__inner--indeterminate{animation:indeterminate 3s infinite;transform:translateZ(0)}.el-progress-bar__inner--striped{background-image:linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 0,transparent 50%,rgba(0,0,0,.1) 0,rgba(0,0,0,.1) 75%,transparent 0,transparent);background-size:1.25em 1.25em}.el-progress-bar__inner--striped.el-progress-bar__inner--striped-flow{animation:striped-flow 3s linear infinite}.el-progress-bar__innerText{color:#fff;display:inline-block;font-size:12px;margin:0 5px;vertical-align:middle}@keyframes progress{0%{background-position:0 0}to{background-position:32px 0}}@keyframes indeterminate{0%{left:-100%}to{left:100%}}@keyframes striped-flow{0%{background-position:-100%}to{background-position:100%}}.el-radio-button{--el-radio-button-checked-bg-color:var(--el-color-primary);--el-radio-button-checked-text-color:var(--el-color-white);--el-radio-button-checked-border-color:var(--el-color-primary);--el-radio-button-disabled-checked-fill:var(--el-border-color-extra-light)}.el-radio-button,.el-radio-button__inner{display:inline-block;outline:none;position:relative}.el-radio-button__inner{-webkit-appearance:none;background:var(--el-button-bg-color,var(--el-fill-color-blank));border:var(--el-border);border-left:0;border-radius:0;box-sizing:border-box;color:var(--el-button-text-color,var(--el-text-color-regular));cursor:pointer;font-size:var(--el-font-size-base);font-weight:var(--el-button-font-weight,var(--el-font-weight-primary));line-height:1;margin:0;padding:8px 15px;text-align:center;transition:var(--el-transition-all);-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}.el-radio-button__inner.is-round{padding:8px 15px}.el-radio-button__inner:hover{color:var(--el-color-primary)}.el-radio-button__inner [class*=el-icon-]{line-height:.9}.el-radio-button__inner [class*=el-icon-]+span{margin-left:5px}.el-radio-button:first-child .el-radio-button__inner{border-left:var(--el-border);border-radius:var(--el-border-radius-base) 0 0 var(--el-border-radius-base);box-shadow:none!important}.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled)+.el-radio-button__inner{background-color:var(--el-radio-button-checked-bg-color,var(--el-color-primary));border-color:var(--el-radio-button-checked-border-color,var(--el-color-primary));box-shadow:-1px 0 0 0 var(--el-radio-button-checked-border-color,var(--el-color-primary));color:var(--el-radio-button-checked-text-color,var(--el-color-white))}.el-radio-button__original-radio{opacity:0;outline:none;position:absolute;z-index:-1}.el-radio-button__original-radio:focus-visible+.el-radio-button__inner{border-left:var(--el-border);border-left-color:var(--el-radio-button-checked-border-color,var(--el-color-primary));border-radius:var(--el-border-radius-base);box-shadow:none;outline:2px solid var(--el-radio-button-checked-border-color);outline-offset:1px;z-index:2}.el-radio-button__original-radio:disabled+.el-radio-button__inner{background-color:var(--el-button-disabled-bg-color,var(--el-fill-color-blank));background-image:none;border-color:var(--el-button-disabled-border-color,var(--el-border-color-light));box-shadow:none;color:var(--el-disabled-text-color);cursor:not-allowed}.el-radio-button__original-radio:disabled:checked+.el-radio-button__inner{background-color:var(--el-radio-button-disabled-checked-fill)}.el-radio-button:last-child .el-radio-button__inner{border-radius:0 var(--el-border-radius-base) var(--el-border-radius-base) 0}.el-radio-button:first-child:last-child .el-radio-button__inner{border-radius:var(--el-border-radius-base)}.el-radio-button--large .el-radio-button__inner{border-radius:0;font-size:var(--el-font-size-base);padding:12px 19px}.el-radio-button--large .el-radio-button__inner.is-round{padding:12px 19px}.el-radio-button--small .el-radio-button__inner{border-radius:0;font-size:12px;padding:5px 11px}.el-radio-button--small .el-radio-button__inner.is-round{padding:5px 11px}.el-radio-group{align-items:center;display:inline-flex;flex-wrap:wrap;font-size:0}.el-radio{--el-radio-font-size:var(--el-font-size-base);--el-radio-text-color:var(--el-text-color-regular);--el-radio-font-weight:var(--el-font-weight-primary);--el-radio-input-height:14px;--el-radio-input-width:14px;--el-radio-input-border-radius:var(--el-border-radius-circle);--el-radio-input-bg-color:var(--el-fill-color-blank);--el-radio-input-border:var(--el-border);--el-radio-input-border-color:var(--el-border-color);--el-radio-input-border-color-hover:var(--el-color-primary);align-items:center;color:var(--el-radio-text-color);cursor:pointer;display:inline-flex;font-size:var(--el-font-size-base);font-weight:var(--el-radio-font-weight);height:32px;margin-right:30px;outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap}.el-radio.el-radio--large{height:40px}.el-radio.el-radio--small{height:24px}.el-radio.is-bordered{border:var(--el-border);border-radius:var(--el-border-radius-base);box-sizing:border-box;padding:0 15px 0 9px}.el-radio.is-bordered.is-checked{border-color:var(--el-color-primary)}.el-radio.is-bordered.is-disabled{border-color:var(--el-border-color-lighter);cursor:not-allowed}.el-radio.is-bordered.el-radio--large{border-radius:var(--el-border-radius-base);padding:0 19px 0 11px}.el-radio.is-bordered.el-radio--large .el-radio__label{font-size:var(--el-font-size-base)}.el-radio.is-bordered.el-radio--large .el-radio__inner{height:14px;width:14px}.el-radio.is-bordered.el-radio--small{border-radius:var(--el-border-radius-base);padding:0 11px 0 7px}.el-radio.is-bordered.el-radio--small .el-radio__label{font-size:12px}.el-radio.is-bordered.el-radio--small .el-radio__inner{height:12px;width:12px}.el-radio:last-child{margin-right:0}.el-radio__input{cursor:pointer;display:inline-flex;outline:none;position:relative;vertical-align:middle;white-space:nowrap}.el-radio__input.is-disabled .el-radio__inner{border-color:var(--el-disabled-border-color)}.el-radio__input.is-disabled .el-radio__inner,.el-radio__input.is-disabled .el-radio__inner:after{background-color:var(--el-disabled-bg-color);cursor:not-allowed}.el-radio__input.is-disabled .el-radio__inner+.el-radio__label{cursor:not-allowed}.el-radio__input.is-disabled.is-checked .el-radio__inner{background-color:var(--el-disabled-bg-color);border-color:var(--el-disabled-border-color)}.el-radio__input.is-disabled.is-checked .el-radio__inner:after{background-color:var(--el-text-color-placeholder)}.el-radio__input.is-disabled+span.el-radio__label{color:var(--el-text-color-placeholder);cursor:not-allowed}.el-radio__input.is-checked .el-radio__inner{background:var(--el-color-primary);border-color:var(--el-color-primary)}.el-radio__input.is-checked .el-radio__inner:after{background-color:var(--el-color-white);transform:translate(-50%,-50%) scale(1)}.el-radio__input.is-checked+.el-radio__label{color:var(--el-color-primary)}.el-radio__input.is-focus .el-radio__inner{border-color:var(--el-radio-input-border-color-hover)}.el-radio__inner{background-color:var(--el-radio-input-bg-color);border:var(--el-radio-input-border);border-radius:var(--el-radio-input-border-radius);box-sizing:border-box;cursor:pointer;display:inline-block;height:var(--el-radio-input-height);position:relative;width:var(--el-radio-input-width)}.el-radio__inner:hover{border-color:var(--el-radio-input-border-color-hover)}.el-radio__inner:after{border-radius:var(--el-radio-input-border-radius);content:"";height:4px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%) scale(0);transition:transform .15s ease-in;width:4px}.el-radio__original{inset:0;margin:0;opacity:0;outline:none;position:absolute;z-index:-1}.el-radio__original:focus-visible+.el-radio__inner{border-radius:var(--el-radio-input-border-radius);outline:2px solid var(--el-radio-input-border-color-hover);outline-offset:1px}.el-radio:focus:not(:focus-visible):not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner{box-shadow:0 0 2px 2px var(--el-radio-input-border-color-hover)}.el-radio__label{font-size:var(--el-radio-font-size);padding-left:8px}.el-radio.el-radio--large .el-radio__label{font-size:14px}.el-radio.el-radio--large .el-radio__inner{height:14px;width:14px}.el-radio.el-radio--small .el-radio__label{font-size:12px}.el-radio.el-radio--small .el-radio__inner{height:12px;width:12px}.el-rate{--el-rate-height:20px;--el-rate-font-size:var(--el-font-size-base);--el-rate-icon-size:18px;--el-rate-icon-margin:6px;--el-rate-void-color:var(--el-border-color-darker);--el-rate-fill-color:#f7ba2a;--el-rate-disabled-void-color:var(--el-fill-color);--el-rate-text-color:var(--el-text-color-primary);align-items:center;display:inline-flex;height:32px}.el-rate:active,.el-rate:focus{outline:none}.el-rate__item{color:var(--el-rate-void-color);cursor:pointer;display:inline-block;font-size:0;line-height:normal;position:relative;vertical-align:middle}.el-rate .el-rate__icon{display:inline-block;font-size:var(--el-rate-icon-size);margin-right:var(--el-rate-icon-margin);position:relative;transition:var(--el-transition-duration)}.el-rate .el-rate__icon.hover{transform:scale(1.15)}.el-rate .el-rate__icon .path2{left:0;position:absolute;top:0}.el-rate .el-rate__icon.is-active{color:var(--el-rate-fill-color)}.el-rate__decimal{color:var(--el-rate-fill-color);display:inline-block;overflow:hidden}.el-rate__decimal,.el-rate__decimal--box{left:0;position:absolute;top:0}.el-rate__text{color:var(--el-rate-text-color);font-size:var(--el-rate-font-size);vertical-align:middle}.el-rate--large{height:40px}.el-rate--small{height:24px}.el-rate--small .el-rate__icon{font-size:14px}.el-rate.is-disabled .el-rate__item{color:var(--el-rate-disabled-void-color);cursor:auto}.el-result{--el-result-padding:40px 30px;--el-result-icon-font-size:64px;--el-result-title-font-size:20px;--el-result-title-margin-top:20px;--el-result-subtitle-margin-top:10px;--el-result-extra-margin-top:30px;align-items:center;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:var(--el-result-padding);text-align:center}.el-result__icon svg{height:var(--el-result-icon-font-size);width:var(--el-result-icon-font-size)}.el-result__title{margin-top:var(--el-result-title-margin-top)}.el-result__title p{color:var(--el-text-color-primary);font-size:var(--el-result-title-font-size);line-height:1.3;margin:0}.el-result__subtitle{margin-top:var(--el-result-subtitle-margin-top)}.el-result__subtitle p{color:var(--el-text-color-regular);font-size:var(--el-font-size-base);line-height:1.3;margin:0}.el-result__extra{margin-top:var(--el-result-extra-margin-top)}.el-result .icon-primary{--el-result-color:var(--el-color-primary);color:var(--el-result-color)}.el-result .icon-success{--el-result-color:var(--el-color-success);color:var(--el-result-color)}.el-result .icon-warning{--el-result-color:var(--el-color-warning);color:var(--el-result-color)}.el-result .icon-danger{--el-result-color:var(--el-color-danger);color:var(--el-result-color)}.el-result .icon-error{--el-result-color:var(--el-color-error);color:var(--el-result-color)}.el-result .icon-info{--el-result-color:var(--el-color-info);color:var(--el-result-color)}.el-row{box-sizing:border-box;display:flex;flex-wrap:wrap;position:relative}.el-row.is-justify-center{justify-content:center}.el-row.is-justify-end{justify-content:flex-end}.el-row.is-justify-space-between{justify-content:space-between}.el-row.is-justify-space-around{justify-content:space-around}.el-row.is-justify-space-evenly{justify-content:space-evenly}.el-row.is-align-top{align-items:flex-start}.el-row.is-align-middle{align-items:center}.el-row.is-align-bottom{align-items:flex-end}.el-scrollbar{--el-scrollbar-opacity:.3;--el-scrollbar-bg-color:var(--el-text-color-secondary);--el-scrollbar-hover-opacity:.5;--el-scrollbar-hover-bg-color:var(--el-text-color-secondary);height:100%;overflow:hidden;position:relative}.el-scrollbar__wrap{height:100%;overflow:auto}.el-scrollbar__wrap--hidden-default{scrollbar-width:none}.el-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.el-scrollbar__thumb{background-color:var(--el-scrollbar-bg-color,var(--el-text-color-secondary));border-radius:inherit;cursor:pointer;display:block;height:0;opacity:var(--el-scrollbar-opacity,.3);position:relative;transition:var(--el-transition-duration) background-color;width:0}.el-scrollbar__thumb:hover{background-color:var(--el-scrollbar-hover-bg-color,var(--el-text-color-secondary));opacity:var(--el-scrollbar-hover-opacity,.5)}.el-scrollbar__bar{border-radius:4px;bottom:2px;position:absolute;right:2px;z-index:1}.el-scrollbar__bar.is-vertical{top:2px;width:6px}.el-scrollbar__bar.is-vertical>div{width:100%}.el-scrollbar__bar.is-horizontal{height:6px;left:2px}.el-scrollbar__bar.is-horizontal>div{height:100%}.el-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.el-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.el-scrollbar-fade-enter-from,.el-scrollbar-fade-leave-active{opacity:0}.el-select-dropdown{border-radius:var(--el-border-radius-base);box-sizing:border-box;z-index:calc(var(--el-index-top) + 1)}.el-select-dropdown .el-scrollbar.is-empty .el-select-dropdown__list{padding:0}.el-select-dropdown__empty,.el-select-dropdown__loading{color:var(--el-text-color-secondary);font-size:var(--el-select-font-size);margin:0;padding:10px 0;text-align:center}.el-select-dropdown__wrap{max-height:274px}.el-select-dropdown__list{box-sizing:border-box;list-style:none;margin:0;padding:6px 0}.el-select-dropdown__list.el-vl__window{margin:6px 0;padding:0}.el-select-dropdown__header{border-bottom:1px solid var(--el-border-color-light);padding:10px}.el-select-dropdown__footer{border-top:1px solid var(--el-border-color-light);padding:10px}.el-select-dropdown__item{box-sizing:border-box;color:var(--el-text-color-regular);cursor:pointer;font-size:var(--el-font-size-base);height:34px;line-height:34px;overflow:hidden;padding:0 32px 0 20px;position:relative;text-overflow:ellipsis;white-space:nowrap}.el-select-dropdown__item.is-hovering{background-color:var(--el-fill-color-light)}.el-select-dropdown__item.is-selected{color:var(--el-color-primary);font-weight:700}.el-select-dropdown__item.is-disabled{background-color:unset;color:var(--el-text-color-placeholder);cursor:not-allowed}.el-select-dropdown.is-multiple .el-select-dropdown__item.is-selected:after{background-color:var(--el-color-primary);background-position:50%;background-repeat:no-repeat;border-right:none;border-top:none;content:"";height:12px;mask:url("data:image/svg+xml;utf8,%3Csvg class='icon' width='200' height='200' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' d='M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z'%3E%3C/path%3E%3C/svg%3E") no-repeat;mask-size:100% 100%;-webkit-mask:url("data:image/svg+xml;utf8,%3Csvg class='icon' width='200' height='200' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' d='M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z'%3E%3C/path%3E%3C/svg%3E") no-repeat;-webkit-mask-size:100% 100%;position:absolute;right:20px;top:50%;transform:translateY(-50%);width:12px}.el-select-dropdown.is-multiple .el-select-dropdown__item.is-disabled:after{background-color:var(--el-text-color-placeholder)}.el-select-group{margin:0;padding:0}.el-select-group__wrap{list-style:none;margin:0;padding:0;position:relative}.el-select-group__title{box-sizing:border-box;color:var(--el-color-info);font-size:12px;line-height:34px;overflow:hidden;padding:0 20px;text-overflow:ellipsis;white-space:nowrap}.el-select-group .el-select-dropdown__item{padding-left:20px}.el-select{--el-select-border-color-hover:var(--el-border-color-hover);--el-select-disabled-color:var(--el-disabled-text-color);--el-select-disabled-border:var(--el-disabled-border-color);--el-select-font-size:var(--el-font-size-base);--el-select-close-hover-color:var(--el-text-color-secondary);--el-select-input-color:var(--el-text-color-placeholder);--el-select-multiple-input-color:var(--el-text-color-regular);--el-select-input-focus-border-color:var(--el-color-primary);--el-select-input-font-size:14px;--el-select-width:100%;display:inline-block;position:relative;vertical-align:middle;width:var(--el-select-width)}.el-select__wrapper{align-items:center;background-color:var(--el-fill-color-blank);border-radius:var(--el-border-radius-base);box-shadow:0 0 0 1px var(--el-border-color) inset;box-sizing:border-box;cursor:pointer;display:flex;font-size:14px;gap:6px;line-height:24px;min-height:32px;padding:4px 12px;position:relative;text-align:left;transform:translateZ(0);transition:var(--el-transition-duration)}.el-select__wrapper.is-filterable{cursor:text}.el-select__wrapper.is-focused{box-shadow:0 0 0 1px var(--el-color-primary) inset}.el-select__wrapper.is-hovering:not(.is-focused){box-shadow:0 0 0 1px var(--el-border-color-hover) inset}.el-select__wrapper.is-disabled{background-color:var(--el-fill-color-light);color:var(--el-text-color-placeholder);cursor:not-allowed}.el-select__wrapper.is-disabled,.el-select__wrapper.is-disabled:hover{box-shadow:0 0 0 1px var(--el-select-disabled-border) inset}.el-select__wrapper.is-disabled.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-select__wrapper.is-disabled .el-select__selected-item{color:var(--el-select-disabled-color)}.el-select__wrapper.is-disabled .el-select__caret,.el-select__wrapper.is-disabled .el-tag,.el-select__wrapper.is-disabled input{cursor:not-allowed}.el-select__prefix,.el-select__suffix{align-items:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));display:flex;flex-shrink:0;gap:6px}.el-select__caret{color:var(--el-select-input-color);cursor:pointer;font-size:var(--el-select-input-font-size);transform:rotate(0);transition:var(--el-transition-duration)}.el-select__caret.is-reverse{transform:rotate(180deg)}.el-select__clear{cursor:pointer}.el-select__clear:hover{color:var(--el-select-close-hover-color)}.el-select__selection{align-items:center;display:flex;flex:1;flex-wrap:wrap;gap:6px;min-width:0;position:relative}.el-select__selection.is-near{margin-left:-8px}.el-select__selection .el-tag{border-color:transparent;cursor:pointer}.el-select__selection .el-tag.el-tag--plain{border-color:var(--el-tag-border-color)}.el-select__selection .el-tag .el-tag__content{min-width:0}.el-select__selected-item{display:flex;flex-wrap:wrap;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-select__tags-text{line-height:normal}.el-select__placeholder,.el-select__tags-text{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-select__placeholder{color:var(--el-input-text-color,var(--el-text-color-regular));position:absolute;top:50%;transform:translateY(-50%);width:100%;z-index:-1}.el-select__placeholder.is-transparent{color:var(--el-text-color-placeholder);-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-select__popper.el-popper{background:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-select__popper.el-popper,.el-select__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-border-color-light)}.el-select__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-select__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-select__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-select__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-select__input-wrapper{flex:1}.el-select__input-wrapper.is-hidden{opacity:0;position:absolute;z-index:-1}.el-select__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:none;color:var(--el-select-multiple-input-color);font-family:inherit;font-size:inherit;height:24px;outline:none;padding:0;width:100%}.el-select__input.is-disabled{cursor:not-allowed}.el-select__input-calculator{left:0;max-width:100%;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:pre}.el-select--large .el-select__wrapper{font-size:14px;gap:6px;line-height:24px;min-height:40px;padding:8px 16px}.el-select--large .el-select__selection{gap:6px}.el-select--large .el-select__selection.is-near{margin-left:-8px}.el-select--large .el-select__prefix,.el-select--large .el-select__suffix{gap:6px}.el-select--large .el-select__input{height:24px}.el-select--small .el-select__wrapper{font-size:12px;gap:4px;line-height:20px;min-height:24px;padding:2px 8px}.el-select--small .el-select__selection{gap:4px}.el-select--small .el-select__selection.is-near{margin-left:-6px}.el-select--small .el-select__prefix,.el-select--small .el-select__suffix{gap:4px}.el-select--small .el-select__input{height:20px}.el-skeleton{--el-skeleton-circle-size:var(--el-avatar-size)}.el-skeleton__item{background:var(--el-skeleton-color);border-radius:var(--el-border-radius-base);display:inline-block;height:16px;width:100%}.el-skeleton__circle{border-radius:50%;height:var(--el-skeleton-circle-size);line-height:var(--el-skeleton-circle-size);width:var(--el-skeleton-circle-size)}.el-skeleton__button{border-radius:4px;height:40px;width:64px}.el-skeleton__p{width:100%}.el-skeleton__p.is-last{width:61%}.el-skeleton__p.is-first{width:33%}.el-skeleton__text{height:var(--el-font-size-small);width:100%}.el-skeleton__caption{height:var(--el-font-size-extra-small)}.el-skeleton__h1{height:var(--el-font-size-extra-large)}.el-skeleton__h3{height:var(--el-font-size-large)}.el-skeleton__h5{height:var(--el-font-size-medium)}.el-skeleton__image{align-items:center;border-radius:0;display:flex;justify-content:center;width:unset}.el-skeleton__image svg{color:var(--el-svg-monochrome-grey);fill:currentColor;height:22%;width:22%}.el-skeleton{--el-skeleton-color:var(--el-fill-color);--el-skeleton-to-color:var(--el-fill-color-darker)}@keyframes el-skeleton-loading{0%{background-position:100% 50%}to{background-position:0 50%}}.el-skeleton{width:100%}.el-skeleton__first-line,.el-skeleton__paragraph{background:var(--el-skeleton-color);height:16px;margin-top:16px}.el-skeleton.is-animated .el-skeleton__item{animation:el-skeleton-loading 1.4s ease infinite;background:linear-gradient(90deg,var(--el-skeleton-color) 25%,var(--el-skeleton-to-color) 37%,var(--el-skeleton-color) 63%);background-size:400% 100%}.el-slider{--el-slider-main-bg-color:var(--el-color-primary);--el-slider-runway-bg-color:var(--el-border-color-light);--el-slider-stop-bg-color:var(--el-color-white);--el-slider-disabled-color:var(--el-text-color-placeholder);--el-slider-border-radius:3px;--el-slider-height:6px;--el-slider-button-size:20px;--el-slider-button-wrapper-size:36px;--el-slider-button-wrapper-offset:-15px;align-items:center;display:flex;height:32px;width:100%}.el-slider__runway{background-color:var(--el-slider-runway-bg-color);border-radius:var(--el-slider-border-radius);cursor:pointer;flex:1;height:var(--el-slider-height);position:relative}.el-slider__runway.show-input{margin-right:30px;width:auto}.el-slider__runway.is-disabled{cursor:default}.el-slider__runway.is-disabled .el-slider__bar{background-color:var(--el-slider-disabled-color)}.el-slider__runway.is-disabled .el-slider__button{border-color:var(--el-slider-disabled-color)}.el-slider__runway.is-disabled .el-slider__button-wrapper.dragging,.el-slider__runway.is-disabled .el-slider__button-wrapper.hover,.el-slider__runway.is-disabled .el-slider__button-wrapper:hover{cursor:not-allowed}.el-slider__runway.is-disabled .el-slider__button.dragging,.el-slider__runway.is-disabled .el-slider__button.hover,.el-slider__runway.is-disabled .el-slider__button:hover{transform:scale(1)}.el-slider__runway.is-disabled .el-slider__button.dragging,.el-slider__runway.is-disabled .el-slider__button.hover,.el-slider__runway.is-disabled .el-slider__button:hover{cursor:not-allowed}.el-slider__input{flex-shrink:0;width:130px}.el-slider__bar{background-color:var(--el-slider-main-bg-color);border-bottom-left-radius:var(--el-slider-border-radius);border-top-left-radius:var(--el-slider-border-radius);height:var(--el-slider-height);position:absolute}.el-slider__button-wrapper{background-color:transparent;height:var(--el-slider-button-wrapper-size);line-height:normal;outline:none;position:absolute;text-align:center;top:var(--el-slider-button-wrapper-offset);transform:translate(-50%);-webkit-user-select:none;-moz-user-select:none;user-select:none;width:var(--el-slider-button-wrapper-size);z-index:1}.el-slider__button-wrapper:after{content:"";display:inline-block;height:100%;vertical-align:middle}.el-slider__button-wrapper.hover,.el-slider__button-wrapper:hover{cursor:grab}.el-slider__button-wrapper.dragging{cursor:grabbing}.el-slider__button{background-color:var(--el-color-white);border:2px solid var(--el-slider-main-bg-color);border-radius:50%;box-sizing:border-box;display:inline-block;height:var(--el-slider-button-size);transition:var(--el-transition-duration-fast);-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;width:var(--el-slider-button-size)}.el-slider__button.dragging,.el-slider__button.hover,.el-slider__button:hover{transform:scale(1.2)}.el-slider__button.hover,.el-slider__button:hover{cursor:grab}.el-slider__button.dragging{cursor:grabbing}.el-slider__stop{background-color:var(--el-slider-stop-bg-color);border-radius:var(--el-border-radius-circle);height:var(--el-slider-height);position:absolute;transform:translate(-50%);width:var(--el-slider-height)}.el-slider__marks{height:100%;left:12px;top:0;width:18px}.el-slider__marks-text{color:var(--el-color-info);font-size:14px;margin-top:15px;position:absolute;transform:translate(-50%);white-space:pre}.el-slider.is-vertical{display:inline-flex;flex:0;height:100%;position:relative;width:auto}.el-slider.is-vertical .el-slider__runway{height:100%;margin:0 16px;width:var(--el-slider-height)}.el-slider.is-vertical .el-slider__bar{border-radius:0 0 3px 3px;height:auto;width:var(--el-slider-height)}.el-slider.is-vertical .el-slider__button-wrapper{left:var(--el-slider-button-wrapper-offset);top:auto;transform:translateY(50%)}.el-slider.is-vertical .el-slider__stop{transform:translateY(50%)}.el-slider.is-vertical .el-slider__marks-text{left:15px;margin-top:0;transform:translateY(50%)}.el-slider--large{height:40px}.el-slider--small{height:24px}.el-space{display:inline-flex;vertical-align:top}.el-space__item{display:flex;flex-wrap:wrap}.el-space__item>*{flex:1}.el-space--vertical{flex-direction:column}.el-time-spinner{white-space:nowrap;width:100%}.el-spinner{display:inline-block;vertical-align:middle}.el-spinner-inner{animation:rotate 2s linear infinite;height:50px;width:50px}.el-spinner-inner .path{stroke:var(--el-border-color-lighter);stroke-linecap:round;animation:dash 1.5s ease-in-out infinite}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}.el-step{flex-shrink:1;position:relative}.el-step:last-of-type .el-step__line{display:none}.el-step:last-of-type.is-flex{flex-basis:auto!important;flex-grow:0;flex-shrink:0}.el-step:last-of-type .el-step__description,.el-step:last-of-type .el-step__main{padding-right:0}.el-step__head{position:relative;width:100%}.el-step__head.is-process{border-color:var(--el-text-color-primary);color:var(--el-text-color-primary)}.el-step__head.is-wait{border-color:var(--el-text-color-placeholder);color:var(--el-text-color-placeholder)}.el-step__head.is-success{border-color:var(--el-color-success);color:var(--el-color-success)}.el-step__head.is-error{border-color:var(--el-color-danger);color:var(--el-color-danger)}.el-step__head.is-finish{border-color:var(--el-color-primary);color:var(--el-color-primary)}.el-step__icon{align-items:center;background:var(--el-bg-color);box-sizing:border-box;display:inline-flex;font-size:14px;height:24px;justify-content:center;position:relative;transition:.15s ease-out;width:24px;z-index:1}.el-step__icon.is-text{border:2px solid;border-radius:50%}.el-step__icon.is-icon{width:40px}.el-step__icon-inner{color:inherit;display:inline-block;font-weight:700;line-height:1;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-step__icon-inner[class*=el-icon]:not(.is-status){font-size:25px;font-weight:400}.el-step__icon-inner.is-status{transform:translateY(1px)}.el-step__line{background-color:var(--el-text-color-placeholder);border-color:currentColor;position:absolute}.el-step__line-inner{border:1px solid;box-sizing:border-box;display:block;height:0;transition:.15s ease-out;width:0}.el-step__main{text-align:left;white-space:normal}.el-step__title{font-size:16px;line-height:38px}.el-step__title.is-process{color:var(--el-text-color-primary);font-weight:700}.el-step__title.is-wait{color:var(--el-text-color-placeholder)}.el-step__title.is-success{color:var(--el-color-success)}.el-step__title.is-error{color:var(--el-color-danger)}.el-step__title.is-finish{color:var(--el-color-primary)}.el-step__description{font-size:12px;font-weight:400;line-height:20px;margin-top:-5px;padding-right:10%}.el-step__description.is-process{color:var(--el-text-color-primary)}.el-step__description.is-wait{color:var(--el-text-color-placeholder)}.el-step__description.is-success{color:var(--el-color-success)}.el-step__description.is-error{color:var(--el-color-danger)}.el-step__description.is-finish{color:var(--el-color-primary)}.el-step.is-horizontal{display:inline-block}.el-step.is-horizontal .el-step__line{height:2px;left:0;right:0;top:11px}.el-step.is-vertical{display:flex}.el-step.is-vertical .el-step__head{flex-grow:0;width:24px}.el-step.is-vertical .el-step__main{flex-grow:1;padding-left:10px}.el-step.is-vertical .el-step__title{line-height:24px;padding-bottom:8px}.el-step.is-vertical .el-step__line{bottom:0;left:11px;top:0;width:2px}.el-step.is-vertical .el-step__icon.is-icon{width:24px}.el-step.is-center .el-step__head,.el-step.is-center .el-step__main{text-align:center}.el-step.is-center .el-step__description{padding-left:20%;padding-right:20%}.el-step.is-center .el-step__line{left:50%;right:-50%}.el-step.is-simple{align-items:center;display:flex}.el-step.is-simple .el-step__head{font-size:0;padding-right:10px;width:auto}.el-step.is-simple .el-step__icon{background:transparent;font-size:12px;height:16px;width:16px}.el-step.is-simple .el-step__icon-inner[class*=el-icon]:not(.is-status){font-size:18px}.el-step.is-simple .el-step__icon-inner.is-status{transform:scale(.8) translateY(1px)}.el-step.is-simple .el-step__main{align-items:stretch;display:flex;flex-grow:1;position:relative}.el-step.is-simple .el-step__title{font-size:16px;line-height:20px}.el-step.is-simple:not(:last-of-type) .el-step__title{max-width:50%;overflow-wrap:break-word}.el-step.is-simple .el-step__arrow{align-items:center;display:flex;flex-grow:1;justify-content:center}.el-step.is-simple .el-step__arrow:after,.el-step.is-simple .el-step__arrow:before{background:var(--el-text-color-placeholder);content:"";display:inline-block;height:15px;position:absolute;width:1px}.el-step.is-simple .el-step__arrow:before{transform:rotate(-45deg) translateY(-4px);transform-origin:0 0}.el-step.is-simple .el-step__arrow:after{transform:rotate(45deg) translateY(4px);transform-origin:100% 100%}.el-step.is-simple:last-of-type .el-step__arrow{display:none}.el-steps{display:flex}.el-steps--simple{background:var(--el-fill-color-light);border-radius:4px;padding:13px 8%}.el-steps--horizontal{white-space:nowrap}.el-steps--vertical{flex-flow:column;height:100%}.el-switch{--el-switch-on-color:var(--el-color-primary);--el-switch-off-color:var(--el-border-color);align-items:center;display:inline-flex;font-size:14px;height:32px;line-height:20px;position:relative;vertical-align:middle}.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label{cursor:not-allowed}.el-switch__label{color:var(--el-text-color-primary);cursor:pointer;display:inline-block;font-size:14px;font-weight:500;height:20px;transition:var(--el-transition-duration-fast);vertical-align:middle}.el-switch__label.is-active{color:var(--el-color-primary)}.el-switch__label--left{margin-right:10px}.el-switch__label--right{margin-left:10px}.el-switch__label *{display:inline-block;font-size:14px;line-height:1}.el-switch__label .el-icon{height:inherit}.el-switch__label .el-icon svg{vertical-align:middle}.el-switch__input{height:0;margin:0;opacity:0;position:absolute;width:0}.el-switch__input:focus-visible~.el-switch__core{outline:2px solid var(--el-switch-on-color);outline-offset:1px}.el-switch__core{align-items:center;background:var(--el-switch-off-color);border:1px solid var(--el-switch-border-color,var(--el-switch-off-color));border-radius:10px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:20px;min-width:40px;outline:none;position:relative;transition:border-color var(--el-transition-duration),background-color var(--el-transition-duration)}.el-switch__core .el-switch__inner{align-items:center;display:flex;height:16px;justify-content:center;overflow:hidden;padding:0 4px 0 18px;transition:all var(--el-transition-duration);width:100%}.el-switch__core .el-switch__inner .is-icon,.el-switch__core .el-switch__inner .is-text{color:var(--el-color-white);font-size:12px;overflow:hidden;text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap}.el-switch__core .el-switch__action{align-items:center;background-color:var(--el-color-white);border-radius:var(--el-border-radius-circle);color:var(--el-switch-off-color);display:flex;height:16px;justify-content:center;left:1px;position:absolute;transition:all var(--el-transition-duration);width:16px}.el-switch.is-checked .el-switch__core{background-color:var(--el-switch-on-color);border-color:var(--el-switch-border-color,var(--el-switch-on-color))}.el-switch.is-checked .el-switch__core .el-switch__action{color:var(--el-switch-on-color);left:calc(100% - 17px)}.el-switch.is-checked .el-switch__core .el-switch__inner{padding:0 18px 0 4px}.el-switch.is-disabled{opacity:.6}.el-switch--wide .el-switch__label.el-switch__label--left span{left:10px}.el-switch--wide .el-switch__label.el-switch__label--right span{right:10px}.el-switch .label-fade-enter-from,.el-switch .label-fade-leave-active{opacity:0}.el-switch--large{font-size:14px;height:40px;line-height:24px}.el-switch--large .el-switch__label{font-size:14px;height:24px}.el-switch--large .el-switch__label *{font-size:14px}.el-switch--large .el-switch__core{border-radius:12px;height:24px;min-width:50px}.el-switch--large .el-switch__core .el-switch__inner{height:20px;padding:0 6px 0 22px}.el-switch--large .el-switch__core .el-switch__action{height:20px;width:20px}.el-switch--large.is-checked .el-switch__core .el-switch__action{left:calc(100% - 21px)}.el-switch--large.is-checked .el-switch__core .el-switch__inner{padding:0 22px 0 6px}.el-switch--small{font-size:12px;height:24px;line-height:16px}.el-switch--small .el-switch__label{font-size:12px;height:16px}.el-switch--small .el-switch__label *{font-size:12px}.el-switch--small .el-switch__core{border-radius:8px;height:16px;min-width:30px}.el-switch--small .el-switch__core .el-switch__inner{height:12px;padding:0 2px 0 14px}.el-switch--small .el-switch__core .el-switch__action{height:12px;width:12px}.el-switch--small.is-checked .el-switch__core .el-switch__action{left:calc(100% - 13px)}.el-switch--small.is-checked .el-switch__core .el-switch__inner{padding:0 14px 0 2px}.el-table-column--selection .cell{padding-left:14px;padding-right:14px}.el-table-filter{background-color:#fff;border:1px solid var(--el-border-color-lighter);border-radius:2px;box-shadow:var(--el-box-shadow-light);box-sizing:border-box}.el-table-filter__list{list-style:none;margin:0;min-width:100px;padding:5px 0}.el-table-filter__list-item{cursor:pointer;font-size:var(--el-font-size-base);line-height:36px;padding:0 10px}.el-table-filter__list-item:hover{background-color:var(--el-color-primary-light-9);color:var(--el-color-primary)}.el-table-filter__list-item.is-active{background-color:var(--el-color-primary);color:#fff}.el-table-filter__content{min-width:100px}.el-table-filter__bottom{border-top:1px solid var(--el-border-color-lighter);padding:8px}.el-table-filter__bottom button{background:transparent;border:none;color:var(--el-text-color-regular);cursor:pointer;font-size:var(--el-font-size-small);padding:0 3px}.el-table-filter__bottom button:hover{color:var(--el-color-primary)}.el-table-filter__bottom button:focus{outline:none}.el-table-filter__bottom button.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-table-filter__wrap{max-height:280px}.el-table-filter__checkbox-group{padding:10px}.el-table-filter__checkbox-group label.el-checkbox{align-items:center;display:flex;height:unset;margin-bottom:12px;margin-left:5px;margin-right:5px}.el-table-filter__checkbox-group .el-checkbox:last-child{margin-bottom:0}.el-table{--el-table-border-color:var(--el-border-color-lighter);--el-table-border:1px solid var(--el-table-border-color);--el-table-text-color:var(--el-text-color-regular);--el-table-header-text-color:var(--el-text-color-secondary);--el-table-row-hover-bg-color:var(--el-fill-color-light);--el-table-current-row-bg-color:var(--el-color-primary-light-9);--el-table-header-bg-color:var(--el-bg-color);--el-table-fixed-box-shadow:var(--el-box-shadow-light);--el-table-bg-color:var(--el-fill-color-blank);--el-table-tr-bg-color:var(--el-bg-color);--el-table-expanded-cell-bg-color:var(--el-fill-color-blank);--el-table-fixed-left-column:inset 10px 0 10px -10px rgba(0,0,0,.15);--el-table-fixed-right-column:inset -10px 0 10px -10px rgba(0,0,0,.15);--el-table-index:var(--el-index-normal);background-color:var(--el-table-bg-color);box-sizing:border-box;color:var(--el-table-text-color);font-size:var(--el-font-size-base);height:-moz-fit-content;height:fit-content;max-width:100%;overflow:hidden;position:relative;width:100%}.el-table__inner-wrapper{display:flex;flex-direction:column;height:100%;position:relative}.el-table__inner-wrapper:before{bottom:0;height:1px;left:0}.el-table tbody:focus-visible{outline:none}.el-table.has-footer.el-table--fluid-height tr:last-child td.el-table__cell,.el-table.has-footer.el-table--scrollable-y tr:last-child td.el-table__cell{border-bottom-color:transparent}.el-table__empty-block{align-items:center;display:flex;justify-content:center;left:0;min-height:60px;position:sticky;text-align:center;width:100%}.el-table__empty-text{color:var(--el-text-color-secondary);line-height:60px;width:50%}.el-table__expand-column .cell{padding:0;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-table__expand-icon{color:var(--el-text-color-regular);cursor:pointer;font-size:12px;height:20px;position:relative;transition:transform var(--el-transition-duration-fast) ease-in-out}.el-table__expand-icon--expanded{transform:rotate(90deg)}.el-table__expand-icon>.el-icon{font-size:12px}.el-table__expanded-cell{background-color:var(--el-table-expanded-cell-bg-color)}.el-table__expanded-cell[class*=cell]{padding:20px 50px}.el-table__expanded-cell:hover{background-color:transparent!important}.el-table__placeholder{display:inline-block;width:20px}.el-table__append-wrapper{overflow:hidden}.el-table--fit{border-bottom:0;border-right:0}.el-table--fit .el-table__cell.gutter{border-right-width:1px}.el-table--fit .el-table__inner-wrapper:before{width:100%}.el-table thead{color:var(--el-table-header-text-color)}.el-table thead th{font-weight:600}.el-table thead.is-group th.el-table__cell{background:var(--el-fill-color-light)}.el-table .el-table__cell{box-sizing:border-box;min-width:0;padding:8px 0;position:relative;text-align:left;text-overflow:ellipsis;vertical-align:middle;z-index:var(--el-table-index)}.el-table .el-table__cell.is-center{text-align:center}.el-table .el-table__cell.is-right{text-align:right}.el-table .el-table__cell.gutter{border-bottom-width:0;border-right-width:0;padding:0;width:15px}.el-table .el-table__cell.is-hidden>*{visibility:hidden}.el-table .cell{box-sizing:border-box;line-height:23px;overflow:hidden;overflow-wrap:break-word;padding:0 12px;text-overflow:ellipsis;white-space:normal}.el-table .cell.el-tooltip{min-width:50px;white-space:nowrap}.el-table--large{font-size:var(--el-font-size-base)}.el-table--large .el-table__cell{padding:12px 0}.el-table--large .cell{padding:0 16px}.el-table--default{font-size:var(--el-font-size-base)}.el-table--default .el-table__cell{padding:8px 0}.el-table--default .cell{padding:0 12px}.el-table--small{font-size:var(--el-font-size-extra-small)}.el-table--small .el-table__cell{padding:4px 0}.el-table--small .cell{padding:0 8px}.el-table tr{background-color:var(--el-table-tr-bg-color)}.el-table tr input[type=checkbox]{margin:0}.el-table td.el-table__cell,.el-table th.el-table__cell.is-leaf{border-bottom:var(--el-table-border)}.el-table th.el-table__cell.is-sortable{cursor:pointer}.el-table th.el-table__cell{background-color:var(--el-table-header-bg-color)}.el-table th.el-table__cell>.cell.highlight{color:var(--el-color-primary)}.el-table th.el-table__cell.required>div:before{background:#ff4d51;border-radius:50%;content:"";display:inline-block;height:8px;margin-right:5px;vertical-align:middle;width:8px}.el-table td.el-table__cell div{box-sizing:border-box}.el-table td.el-table__cell.gutter{width:0}.el-table--border .el-table__inner-wrapper:after,.el-table--border:after,.el-table--border:before,.el-table__inner-wrapper:before{background-color:var(--el-table-border-color);content:"";position:absolute;z-index:calc(var(--el-table-index) + 2)}.el-table--border .el-table__inner-wrapper:after{height:1px;left:0;top:0;width:100%;z-index:calc(var(--el-table-index) + 2)}.el-table--border:before{height:100%;left:0;top:-1px;width:1px}.el-table--border:after{height:100%;right:0;top:-1px;width:1px}.el-table--border .el-table__inner-wrapper{border-bottom:none;border-right:none}.el-table--border .el-table__footer-wrapper{flex-shrink:0;position:relative}.el-table--border .el-table__cell{border-right:var(--el-table-border)}.el-table--border th.el-table__cell.gutter:last-of-type{border-bottom:var(--el-table-border);border-bottom-width:1px}.el-table--border th.el-table__cell{border-bottom:var(--el-table-border)}.el-table--hidden{visibility:hidden}.el-table__body-wrapper,.el-table__footer-wrapper,.el-table__header-wrapper{width:100%}.el-table__body-wrapper tr td.el-table-fixed-column--left,.el-table__body-wrapper tr td.el-table-fixed-column--right,.el-table__body-wrapper tr th.el-table-fixed-column--left,.el-table__body-wrapper tr th.el-table-fixed-column--right,.el-table__footer-wrapper tr td.el-table-fixed-column--left,.el-table__footer-wrapper tr td.el-table-fixed-column--right,.el-table__footer-wrapper tr th.el-table-fixed-column--left,.el-table__footer-wrapper tr th.el-table-fixed-column--right,.el-table__header-wrapper tr td.el-table-fixed-column--left,.el-table__header-wrapper tr td.el-table-fixed-column--right,.el-table__header-wrapper tr th.el-table-fixed-column--left,.el-table__header-wrapper tr th.el-table-fixed-column--right{background:inherit;position:sticky!important;z-index:calc(var(--el-table-index) + 1)}.el-table__body-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__body-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__body-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__body-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--right.is-first-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--right.is-last-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--right.is-first-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--right.is-last-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--right.is-first-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--right.is-last-column:before{bottom:-1px;box-shadow:none;content:"";overflow-x:hidden;overflow-y:hidden;pointer-events:none;position:absolute;top:0;touch-action:none;width:10px}.el-table__body-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__body-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--right.is-first-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--right.is-first-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--left.is-first-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--right.is-first-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--left.is-first-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--right.is-first-column:before{left:-10px}.el-table__body-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__body-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__body-wrapper tr th.el-table-fixed-column--right.is-last-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__footer-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__footer-wrapper tr th.el-table-fixed-column--right.is-last-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--left.is-last-column:before,.el-table__header-wrapper tr td.el-table-fixed-column--right.is-last-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--left.is-last-column:before,.el-table__header-wrapper tr th.el-table-fixed-column--right.is-last-column:before{right:-10px}.el-table__body-wrapper tr td.el-table__fixed-right-patch,.el-table__body-wrapper tr th.el-table__fixed-right-patch,.el-table__footer-wrapper tr td.el-table__fixed-right-patch,.el-table__footer-wrapper tr th.el-table__fixed-right-patch,.el-table__header-wrapper tr td.el-table__fixed-right-patch,.el-table__header-wrapper tr th.el-table__fixed-right-patch{background:#fff;position:sticky!important;right:0;z-index:calc(var(--el-table-index) + 1)}.el-table__header-wrapper{flex-shrink:0}.el-table__header-wrapper tr th.el-table-fixed-column--left,.el-table__header-wrapper tr th.el-table-fixed-column--right{background-color:var(--el-table-header-bg-color)}.el-table__body,.el-table__footer,.el-table__header{border-collapse:separate;table-layout:fixed}.el-table__header-wrapper{overflow:hidden}.el-table__header-wrapper tbody td.el-table__cell{background-color:var(--el-table-row-hover-bg-color);color:var(--el-table-text-color)}.el-table__footer-wrapper{flex-shrink:0;overflow:hidden}.el-table__footer-wrapper tfoot td.el-table__cell{background-color:var(--el-table-row-hover-bg-color);color:var(--el-table-text-color)}.el-table__body-wrapper .el-table-column--selection>.cell,.el-table__header-wrapper .el-table-column--selection>.cell{align-items:center;display:inline-flex;height:23px}.el-table__body-wrapper .el-table-column--selection .el-checkbox,.el-table__header-wrapper .el-table-column--selection .el-checkbox{height:unset}.el-table.is-scrolling-left .el-table-fixed-column--right.is-first-column:before{box-shadow:var(--el-table-fixed-right-column)}.el-table.is-scrolling-left.el-table--border .el-table-fixed-column--left.is-last-column.el-table__cell{border-right:var(--el-table-border)}.el-table.is-scrolling-left th.el-table-fixed-column--left{background-color:var(--el-table-header-bg-color)}.el-table.is-scrolling-right .el-table-fixed-column--left.is-last-column:before{box-shadow:var(--el-table-fixed-left-column)}.el-table.is-scrolling-right .el-table-fixed-column--left.is-last-column.el-table__cell{border-right:none}.el-table.is-scrolling-right th.el-table-fixed-column--right{background-color:var(--el-table-header-bg-color)}.el-table.is-scrolling-middle .el-table-fixed-column--left.is-last-column.el-table__cell{border-right:none}.el-table.is-scrolling-middle .el-table-fixed-column--right.is-first-column:before{box-shadow:var(--el-table-fixed-right-column)}.el-table.is-scrolling-middle .el-table-fixed-column--left.is-last-column:before{box-shadow:var(--el-table-fixed-left-column)}.el-table.is-scrolling-none .el-table-fixed-column--left.is-first-column:before,.el-table.is-scrolling-none .el-table-fixed-column--left.is-last-column:before,.el-table.is-scrolling-none .el-table-fixed-column--right.is-first-column:before,.el-table.is-scrolling-none .el-table-fixed-column--right.is-last-column:before{box-shadow:none}.el-table.is-scrolling-none th.el-table-fixed-column--left,.el-table.is-scrolling-none th.el-table-fixed-column--right{background-color:var(--el-table-header-bg-color)}.el-table__body-wrapper{flex:1;overflow:hidden;position:relative}.el-table__body-wrapper .el-scrollbar__bar{z-index:calc(var(--el-table-index) + 2)}.el-table .caret-wrapper{align-items:center;cursor:pointer;display:inline-flex;flex-direction:column;height:14px;overflow:initial;position:relative;vertical-align:middle;width:24px}.el-table .sort-caret{border:5px solid transparent;height:0;left:7px;position:absolute;width:0}.el-table .sort-caret.ascending{border-bottom-color:var(--el-text-color-placeholder);top:-5px}.el-table .sort-caret.descending{border-top-color:var(--el-text-color-placeholder);bottom:-3px}.el-table .ascending .sort-caret.ascending{border-bottom-color:var(--el-color-primary)}.el-table .descending .sort-caret.descending{border-top-color:var(--el-color-primary)}.el-table .hidden-columns{position:absolute;visibility:hidden;z-index:-1}.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{background:var(--el-fill-color-lighter)}.el-table--striped .el-table__body tr.el-table__row--striped.current-row td.el-table__cell{background-color:var(--el-table-current-row-bg-color)}.el-table__body tr.hover-row.current-row>td.el-table__cell,.el-table__body tr.hover-row.el-table__row--striped.current-row>td.el-table__cell,.el-table__body tr.hover-row.el-table__row--striped>td.el-table__cell,.el-table__body tr.hover-row>td.el-table__cell,.el-table__body tr>td.hover-cell{background-color:var(--el-table-row-hover-bg-color)}.el-table__body tr.current-row>td.el-table__cell{background-color:var(--el-table-current-row-bg-color)}.el-table.el-table--scrollable-y .el-table__body-header{position:sticky;top:0;z-index:calc(var(--el-table-index) + 2)}.el-table.el-table--scrollable-y .el-table__body-footer{bottom:0;position:sticky;z-index:calc(var(--el-table-index) + 2)}.el-table__column-resize-proxy{border-left:var(--el-table-border);bottom:0;left:200px;position:absolute;top:0;width:0;z-index:calc(var(--el-table-index) + 9)}.el-table__column-filter-trigger{cursor:pointer;display:inline-block}.el-table__column-filter-trigger i{color:var(--el-color-info);font-size:14px;vertical-align:middle}.el-table__border-left-patch{height:100%;top:0;width:1px}.el-table__border-bottom-patch,.el-table__border-left-patch{background-color:var(--el-table-border-color);left:0;position:absolute;z-index:calc(var(--el-table-index) + 2)}.el-table__border-bottom-patch{height:1px}.el-table__border-right-patch{background-color:var(--el-table-border-color);height:100%;position:absolute;top:0;width:1px;z-index:calc(var(--el-table-index) + 2)}.el-table--enable-row-transition .el-table__body td.el-table__cell{transition:background-color .25s ease}.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{background-color:var(--el-table-row-hover-bg-color)}.el-table [class*=el-table__row--level] .el-table__expand-icon{display:inline-block;height:12px;line-height:12px;margin-right:8px;text-align:center;width:12px}.el-table .el-table.el-table--border .el-table__cell{border-right:var(--el-table-border)}.el-table:not(.el-table--border) .el-table__cell{border-right:none}.el-table:not(.el-table--border)>.el-table__inner-wrapper:after{content:none}.el-table-v2{--el-table-border-color:var(--el-border-color-lighter);--el-table-border:1px solid var(--el-table-border-color);--el-table-text-color:var(--el-text-color-regular);--el-table-header-text-color:var(--el-text-color-secondary);--el-table-row-hover-bg-color:var(--el-fill-color-light);--el-table-current-row-bg-color:var(--el-color-primary-light-9);--el-table-header-bg-color:var(--el-bg-color);--el-table-fixed-box-shadow:var(--el-box-shadow-light);--el-table-bg-color:var(--el-fill-color-blank);--el-table-tr-bg-color:var(--el-bg-color);--el-table-expanded-cell-bg-color:var(--el-fill-color-blank);--el-table-fixed-left-column:inset 10px 0 10px -10px rgba(0,0,0,.15);--el-table-fixed-right-column:inset -10px 0 10px -10px rgba(0,0,0,.15);--el-table-index:var(--el-index-normal);font-size:var(--el-font-size-base)}.el-table-v2 *{box-sizing:border-box}.el-table-v2__root{position:relative}.el-table-v2__root:hover .el-table-v2__main .el-virtual-scrollbar{opacity:1}.el-table-v2__main{background-color:var(--el-bg-color);display:flex;flex-direction:column-reverse;left:0;overflow:hidden;position:absolute;top:0}.el-table-v2__main .el-vl__horizontal,.el-table-v2__main .el-vl__vertical{z-index:2}.el-table-v2__left{background-color:var(--el-bg-color);box-shadow:2px 0 4px #0000000f;display:flex;flex-direction:column-reverse;left:0;overflow:hidden;position:absolute;top:0}.el-table-v2__left .el-virtual-scrollbar{opacity:0}.el-table-v2__left .el-vl__horizontal,.el-table-v2__left .el-vl__vertical{z-index:-1}.el-table-v2__right{background-color:var(--el-bg-color);box-shadow:-2px 0 4px #0000000f;display:flex;flex-direction:column-reverse;overflow:hidden;position:absolute;right:0;top:0}.el-table-v2__right .el-virtual-scrollbar{opacity:0}.el-table-v2__right .el-vl__horizontal,.el-table-v2__right .el-vl__vertical{z-index:-1}.el-table-v2__header-row,.el-table-v2__row{padding-inline-end:var(--el-table-scrollbar-size)}.el-table-v2__header-wrapper{overflow:hidden}.el-table-v2__header{overflow:hidden;position:relative}.el-table-v2__header .el-checkbox{z-index:0}.el-table-v2__footer{bottom:0;overflow:hidden;right:0}.el-table-v2__empty,.el-table-v2__footer,.el-table-v2__overlay{left:0;position:absolute}.el-table-v2__overlay{bottom:0;right:0;top:0;z-index:9999}.el-table-v2__header-row{border-bottom:var(--el-table-border);display:flex}.el-table-v2__header-cell{align-items:center;background-color:var(--el-table-header-bg-color);color:var(--el-table-header-text-color);display:flex;font-weight:700;height:100%;overflow:hidden;padding:0 8px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-table-v2__header-cell.is-align-center{justify-content:center;text-align:center}.el-table-v2__header-cell.is-align-right{justify-content:flex-end;text-align:right}.el-table-v2__header-cell.is-sortable{cursor:pointer}.el-table-v2__header-cell:hover .el-icon{display:block}.el-table-v2__sort-icon{display:none;opacity:.6;transition:opacity,display var(--el-transition-duration)}.el-table-v2__sort-icon.is-sorting{display:block;opacity:1}.el-table-v2__row{align-items:center;border-bottom:var(--el-table-border);display:flex;transition:background-color var(--el-transition-duration)}.el-table-v2__row.is-hovered,.el-table-v2__row:hover{background-color:var(--el-table-row-hover-bg-color)}.el-table-v2__row-cell{align-items:center;display:flex;height:100%;overflow:hidden;padding:0 8px}.el-table-v2__row-cell.is-align-center{justify-content:center;text-align:center}.el-table-v2__row-cell.is-align-right{justify-content:flex-end;text-align:right}.el-table-v2__expand-icon{cursor:pointer;margin:0 4px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-table-v2__expand-icon svg{transition:transform var(--el-transition-duration)}.el-table-v2__expand-icon.is-expanded svg{transform:rotate(90deg)}.el-table-v2:not(.is-dynamic) .el-table-v2__cell-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-table-v2.is-dynamic .el-table-v2__row{align-items:stretch;overflow:hidden}.el-table-v2.is-dynamic .el-table-v2__row .el-table-v2__row-cell{overflow-wrap:break-word}.el-tabs{--el-tabs-header-height:40px;display:flex}.el-tabs__header{align-items:center;display:flex;justify-content:space-between;margin:0 0 15px;padding:0;position:relative}.el-tabs__header-vertical{flex-direction:column}.el-tabs__active-bar{background-color:var(--el-color-primary);bottom:0;height:2px;left:0;list-style:none;position:absolute;transition:width var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier),transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);z-index:1}.el-tabs__new-tab{align-items:center;border:1px solid var(--el-border-color);border-radius:3px;color:var(--el-text-color-primary);cursor:pointer;display:flex;flex-shrink:0;font-size:12px;height:20px;justify-content:center;line-height:20px;margin:10px 0 10px 10px;text-align:center;transition:all .15s;width:20px}.el-tabs__new-tab .is-icon-plus{height:inherit;transform:scale(.8);width:inherit}.el-tabs__new-tab .is-icon-plus svg{vertical-align:middle}.el-tabs__new-tab:hover{color:var(--el-color-primary)}.el-tabs__new-tab-vertical{margin-left:0}.el-tabs__nav-wrap{flex:1 auto;margin-bottom:-1px;overflow:hidden;position:relative}.el-tabs__nav-wrap:after{background-color:var(--el-border-color-light);bottom:0;content:"";height:2px;left:0;position:absolute;width:100%;z-index:var(--el-index-normal)}.el-tabs__nav-wrap.is-scrollable{box-sizing:border-box;padding:0 20px}.el-tabs__nav-scroll{overflow:hidden}.el-tabs__nav-next,.el-tabs__nav-prev{color:var(--el-text-color-secondary);cursor:pointer;font-size:12px;line-height:44px;position:absolute;text-align:center;width:20px}.el-tabs__nav-next{right:0}.el-tabs__nav-prev{left:0}.el-tabs__nav{display:flex;float:left;position:relative;transition:transform var(--el-transition-duration);white-space:nowrap;z-index:calc(var(--el-index-normal) + 1)}.el-tabs__nav.is-stretch{display:flex;min-width:100%}.el-tabs__nav.is-stretch>*{flex:1;text-align:center}.el-tabs__item{align-items:center;box-sizing:border-box;color:var(--el-text-color-primary);display:flex;font-size:var(--el-font-size-base);font-weight:500;height:var(--el-tabs-header-height);justify-content:center;list-style:none;padding:0 20px;position:relative}.el-tabs__item:focus,.el-tabs__item:focus:active{outline:none}.el-tabs__item:focus-visible{border-radius:3px;box-shadow:0 0 2px 2px var(--el-color-primary) inset}.el-tabs__item .is-icon-close{border-radius:50%;margin-left:5px;text-align:center;transition:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier)}.el-tabs__item .is-icon-close:before{display:inline-block;transform:scale(.9)}.el-tabs__item .is-icon-close:hover{background-color:var(--el-text-color-placeholder);color:#fff}.el-tabs__item.is-active,.el-tabs__item:hover{color:var(--el-color-primary)}.el-tabs__item:hover{cursor:pointer}.el-tabs__item.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-tabs__content{flex-grow:1;overflow:hidden;position:relative}.el-tabs--bottom>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top>.el-tabs__header .el-tabs__item:nth-child(2){padding-left:0}.el-tabs--bottom>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top>.el-tabs__header .el-tabs__item:last-child{padding-right:0}.el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2){padding-left:20px}.el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child{padding-right:20px}.el-tabs--card>.el-tabs__header{border-bottom:1px solid var(--el-border-color-light);height:var(--el-tabs-header-height)}.el-tabs--card>.el-tabs__header .el-tabs__nav-wrap:after{content:none}.el-tabs--card>.el-tabs__header .el-tabs__nav{border:1px solid var(--el-border-color-light);border-bottom:none;border-radius:4px 4px 0 0;box-sizing:border-box}.el-tabs--card>.el-tabs__header .el-tabs__active-bar{display:none}.el-tabs--card>.el-tabs__header .el-tabs__item .is-icon-close{font-size:12px;height:14px;overflow:hidden;position:relative;right:-2px;transform-origin:100% 50%;width:0}.el-tabs--card>.el-tabs__header .el-tabs__item{border-bottom:1px solid transparent;border-left:1px solid var(--el-border-color-light);transition:color var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier),padding var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier)}.el-tabs--card>.el-tabs__header .el-tabs__item:first-child{border-left:none}.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover{padding-left:13px;padding-right:13px}.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .is-icon-close{width:14px}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{border-bottom-color:var(--el-bg-color)}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{padding-left:20px;padding-right:20px}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable .is-icon-close{width:14px}.el-tabs--border-card{background:var(--el-bg-color-overlay);border:1px solid var(--el-border-color)}.el-tabs--border-card>.el-tabs__content{padding:15px}.el-tabs--border-card>.el-tabs__header{background-color:var(--el-fill-color-light);border-bottom:1px solid var(--el-border-color-light);margin:0}.el-tabs--border-card>.el-tabs__header .el-tabs__nav-wrap:after{content:none}.el-tabs--border-card>.el-tabs__header .el-tabs__item{border:1px solid transparent;color:var(--el-text-color-secondary);margin-top:-1px;transition:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier)}.el-tabs--border-card>.el-tabs__header .el-tabs__item+.el-tabs__item,.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child{margin-left:-1px}.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{background-color:var(--el-bg-color-overlay);border-left-color:var(--el-border-color);border-right-color:var(--el-border-color);color:var(--el-color-primary)}.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{color:var(--el-color-primary)}.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-disabled{color:var(--el-disabled-text-color)}.el-tabs--border-card>.el-tabs__header .is-scrollable .el-tabs__item:first-child{margin-left:0}.el-tabs--bottom{flex-direction:column}.el-tabs--bottom .el-tabs__header.is-bottom{margin-bottom:0;margin-top:10px}.el-tabs--bottom.el-tabs--border-card .el-tabs__header.is-bottom{border-bottom:0;border-top:1px solid var(--el-border-color)}.el-tabs--bottom.el-tabs--border-card .el-tabs__nav-wrap.is-bottom{margin-bottom:0;margin-top:-1px}.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom:not(.is-active){border:1px solid transparent}.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom{margin:0 -1px -1px}.el-tabs--left,.el-tabs--right{overflow:hidden}.el-tabs--left .el-tabs__header.is-left,.el-tabs--left .el-tabs__header.is-right,.el-tabs--left .el-tabs__nav-scroll,.el-tabs--left .el-tabs__nav-wrap.is-left,.el-tabs--left .el-tabs__nav-wrap.is-right,.el-tabs--right .el-tabs__header.is-left,.el-tabs--right .el-tabs__header.is-right,.el-tabs--right .el-tabs__nav-scroll,.el-tabs--right .el-tabs__nav-wrap.is-left,.el-tabs--right .el-tabs__nav-wrap.is-right{height:100%}.el-tabs--left .el-tabs__active-bar.is-left,.el-tabs--left .el-tabs__active-bar.is-right,.el-tabs--right .el-tabs__active-bar.is-left,.el-tabs--right .el-tabs__active-bar.is-right{bottom:auto;height:auto;top:0;width:2px}.el-tabs--left .el-tabs__nav-wrap.is-left,.el-tabs--left .el-tabs__nav-wrap.is-right,.el-tabs--right .el-tabs__nav-wrap.is-left,.el-tabs--right .el-tabs__nav-wrap.is-right{margin-bottom:0}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev{cursor:pointer;height:30px;line-height:30px;text-align:center;width:100%}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next i,.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev i,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next i,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev i,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next i,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev i,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next i,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev i{transform:rotate(90deg)}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev{left:auto;top:0}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next{bottom:0;right:auto}.el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable,.el-tabs--left .el-tabs__nav-wrap.is-right.is-scrollable,.el-tabs--right .el-tabs__nav-wrap.is-left.is-scrollable,.el-tabs--right .el-tabs__nav-wrap.is-right.is-scrollable{padding:30px 0}.el-tabs--left .el-tabs__nav-wrap.is-left:after,.el-tabs--left .el-tabs__nav-wrap.is-right:after,.el-tabs--right .el-tabs__nav-wrap.is-left:after,.el-tabs--right .el-tabs__nav-wrap.is-right:after{bottom:auto;height:100%;top:0;width:2px}.el-tabs--left .el-tabs__nav.is-left,.el-tabs--left .el-tabs__nav.is-right,.el-tabs--right .el-tabs__nav.is-left,.el-tabs--right .el-tabs__nav.is-right{flex-direction:column}.el-tabs--left .el-tabs__item.is-left,.el-tabs--right .el-tabs__item.is-left{justify-content:flex-end}.el-tabs--left .el-tabs__item.is-right,.el-tabs--right .el-tabs__item.is-right{justify-content:flex-start}.el-tabs--bottom .el-tabs__nav,.el-tabs--top .el-tabs__nav{height:var(--el-tabs-header-height)}.el-tabs--left{flex-direction:row}.el-tabs--left .el-tabs__header.is-left{margin-bottom:0;margin-right:10px}.el-tabs--left .el-tabs__nav-wrap.is-left{margin-right:-1px}.el-tabs--left .el-tabs__active-bar.is-left,.el-tabs--left .el-tabs__nav-wrap.is-left:after{left:auto;right:0}.el-tabs--left .el-tabs__item.is-left{text-align:right}.el-tabs--left.el-tabs--card .el-tabs__active-bar.is-left{display:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left{border-bottom:none;border-left:none;border-right:1px solid var(--el-border-color-light);border-top:1px solid var(--el-border-color-light);text-align:left}.el-tabs--left.el-tabs--card .el-tabs__item.is-left:first-child{border-right:1px solid var(--el-border-color-light);border-top:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active{border:1px solid var(--el-border-color-light);border-bottom:none;border-left:none;border-right:1px solid #fff}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:first-child{border-top:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:last-child{border-bottom:none}.el-tabs--left.el-tabs--card .el-tabs__nav{border-bottom:1px solid var(--el-border-color-light);border-radius:4px 0 0 4px;border-right:none}.el-tabs--left.el-tabs--card .el-tabs__new-tab{float:none}.el-tabs--left.el-tabs--border-card .el-tabs__header.is-left{border-right:1px solid var(--el-border-color)}.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left{border:1px solid transparent;margin:-1px 0 -1px -1px}.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{border-color:rgb(209,219,229) transparent}.el-tabs--left>.el-tabs__content+.el-tabs__header{order:-1}.el-tabs--right .el-tabs__header.is-right{margin-bottom:0;margin-left:10px}.el-tabs--right .el-tabs__nav-wrap.is-right{margin-left:-1px}.el-tabs--right .el-tabs__nav-wrap.is-right:after{left:0;right:auto}.el-tabs--right .el-tabs__active-bar.is-right{left:0}.el-tabs--right.el-tabs--card .el-tabs__active-bar.is-right{display:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right{border-bottom:none;border-top:1px solid var(--el-border-color-light)}.el-tabs--right.el-tabs--card .el-tabs__item.is-right:first-child{border-left:1px solid var(--el-border-color-light);border-top:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active{border:1px solid var(--el-border-color-light);border-bottom:none;border-left:1px solid #fff;border-right:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:first-child{border-top:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:last-child{border-bottom:none}.el-tabs--right.el-tabs--card .el-tabs__nav{border-bottom:1px solid var(--el-border-color-light);border-left:none;border-radius:0 4px 4px 0}.el-tabs--right.el-tabs--border-card .el-tabs__header.is-right{border-left:1px solid var(--el-border-color)}.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right{border:1px solid transparent;margin:-1px -1px -1px 0}.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right.is-active{border-color:rgb(209,219,229) transparent}.el-tabs--top{flex-direction:column}.el-tabs--top>.el-tabs__content+.el-tabs__header{order:-1}.slideInLeft-transition,.slideInRight-transition{display:inline-block}.slideInRight-enter{animation:slideInRight-enter var(--el-transition-duration)}.slideInRight-leave{animation:slideInRight-leave var(--el-transition-duration);left:0;position:absolute;right:0}.slideInLeft-enter{animation:slideInLeft-enter var(--el-transition-duration)}.slideInLeft-leave{animation:slideInLeft-leave var(--el-transition-duration);left:0;position:absolute;right:0}@keyframes slideInRight-enter{0%{opacity:0;transform:translate(100%);transform-origin:0 0}to{opacity:1;transform:translate(0);transform-origin:0 0}}@keyframes slideInRight-leave{0%{opacity:1;transform:translate(0);transform-origin:0 0}to{opacity:0;transform:translate(100%);transform-origin:0 0}}@keyframes slideInLeft-enter{0%{opacity:0;transform:translate(-100%);transform-origin:0 0}to{opacity:1;transform:translate(0);transform-origin:0 0}}@keyframes slideInLeft-leave{0%{opacity:1;transform:translate(0);transform-origin:0 0}to{opacity:0;transform:translate(-100%);transform-origin:0 0}}.el-tag{--el-tag-font-size:12px;--el-tag-border-radius:4px;--el-tag-border-radius-rounded:9999px;align-items:center;background-color:var(--el-tag-bg-color);border-color:var(--el-tag-border-color);border-radius:var(--el-tag-border-radius);border-style:solid;border-width:1px;box-sizing:border-box;color:var(--el-tag-text-color);display:inline-flex;font-size:var(--el-tag-font-size);height:24px;justify-content:center;line-height:1;padding:0 9px;vertical-align:middle;white-space:nowrap;--el-icon-size:14px}.el-tag,.el-tag.el-tag--primary{--el-tag-bg-color:var(--el-color-primary-light-9);--el-tag-border-color:var(--el-color-primary-light-8);--el-tag-hover-color:var(--el-color-primary)}.el-tag.el-tag--success{--el-tag-bg-color:var(--el-color-success-light-9);--el-tag-border-color:var(--el-color-success-light-8);--el-tag-hover-color:var(--el-color-success)}.el-tag.el-tag--warning{--el-tag-bg-color:var(--el-color-warning-light-9);--el-tag-border-color:var(--el-color-warning-light-8);--el-tag-hover-color:var(--el-color-warning)}.el-tag.el-tag--danger{--el-tag-bg-color:var(--el-color-danger-light-9);--el-tag-border-color:var(--el-color-danger-light-8);--el-tag-hover-color:var(--el-color-danger)}.el-tag.el-tag--error{--el-tag-bg-color:var(--el-color-error-light-9);--el-tag-border-color:var(--el-color-error-light-8);--el-tag-hover-color:var(--el-color-error)}.el-tag.el-tag--info{--el-tag-bg-color:var(--el-color-info-light-9);--el-tag-border-color:var(--el-color-info-light-8);--el-tag-hover-color:var(--el-color-info)}.el-tag.is-hit{border-color:var(--el-color-primary)}.el-tag.is-round{border-radius:var(--el-tag-border-radius-rounded)}.el-tag .el-tag__close{color:var(--el-tag-text-color);flex-shrink:0}.el-tag .el-tag__close:hover{background-color:var(--el-tag-hover-color);color:var(--el-color-white)}.el-tag.el-tag--primary{--el-tag-text-color:var(--el-color-primary)}.el-tag.el-tag--success{--el-tag-text-color:var(--el-color-success)}.el-tag.el-tag--warning{--el-tag-text-color:var(--el-color-warning)}.el-tag.el-tag--danger{--el-tag-text-color:var(--el-color-danger)}.el-tag.el-tag--error{--el-tag-text-color:var(--el-color-error)}.el-tag.el-tag--info{--el-tag-text-color:var(--el-color-info)}.el-tag .el-icon{border-radius:50%;cursor:pointer;font-size:calc(var(--el-icon-size) - 2px);height:var(--el-icon-size);width:var(--el-icon-size)}.el-tag .el-tag__close{margin-left:6px}.el-tag--dark{--el-tag-text-color:var(--el-color-white)}.el-tag--dark,.el-tag--dark.el-tag--primary{--el-tag-bg-color:var(--el-color-primary);--el-tag-border-color:var(--el-color-primary);--el-tag-hover-color:var(--el-color-primary-light-3)}.el-tag--dark.el-tag--success{--el-tag-bg-color:var(--el-color-success);--el-tag-border-color:var(--el-color-success);--el-tag-hover-color:var(--el-color-success-light-3)}.el-tag--dark.el-tag--warning{--el-tag-bg-color:var(--el-color-warning);--el-tag-border-color:var(--el-color-warning);--el-tag-hover-color:var(--el-color-warning-light-3)}.el-tag--dark.el-tag--danger{--el-tag-bg-color:var(--el-color-danger);--el-tag-border-color:var(--el-color-danger);--el-tag-hover-color:var(--el-color-danger-light-3)}.el-tag--dark.el-tag--error{--el-tag-bg-color:var(--el-color-error);--el-tag-border-color:var(--el-color-error);--el-tag-hover-color:var(--el-color-error-light-3)}.el-tag--dark.el-tag--info{--el-tag-bg-color:var(--el-color-info);--el-tag-border-color:var(--el-color-info);--el-tag-hover-color:var(--el-color-info-light-3)}.el-tag--dark.el-tag--danger,.el-tag--dark.el-tag--error,.el-tag--dark.el-tag--info,.el-tag--dark.el-tag--primary,.el-tag--dark.el-tag--success,.el-tag--dark.el-tag--warning{--el-tag-text-color:var(--el-color-white)}.el-tag--plain,.el-tag--plain.el-tag--primary{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-primary-light-5);--el-tag-hover-color:var(--el-color-primary)}.el-tag--plain.el-tag--success{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-success-light-5);--el-tag-hover-color:var(--el-color-success)}.el-tag--plain.el-tag--warning{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-warning-light-5);--el-tag-hover-color:var(--el-color-warning)}.el-tag--plain.el-tag--danger{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-danger-light-5);--el-tag-hover-color:var(--el-color-danger)}.el-tag--plain.el-tag--error{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-error-light-5);--el-tag-hover-color:var(--el-color-error)}.el-tag--plain.el-tag--info{--el-tag-bg-color:var(--el-fill-color-blank);--el-tag-border-color:var(--el-color-info-light-5);--el-tag-hover-color:var(--el-color-info)}.el-tag.is-closable{padding-right:5px}.el-tag--large{height:32px;padding:0 11px;--el-icon-size:16px}.el-tag--large .el-tag__close{margin-left:8px}.el-tag--large.is-closable{padding-right:7px}.el-tag--small{height:20px;padding:0 7px;--el-icon-size:12px}.el-tag--small .el-tag__close{margin-left:4px}.el-tag--small.is-closable{padding-right:3px}.el-tag--small .el-icon-close{transform:scale(.8)}.el-tag.el-tag--primary.is-hit{border-color:var(--el-color-primary)}.el-tag.el-tag--success.is-hit{border-color:var(--el-color-success)}.el-tag.el-tag--warning.is-hit{border-color:var(--el-color-warning)}.el-tag.el-tag--danger.is-hit{border-color:var(--el-color-danger)}.el-tag.el-tag--error.is-hit{border-color:var(--el-color-error)}.el-tag.el-tag--info.is-hit{border-color:var(--el-color-info)}.el-text{--el-text-font-size:var(--el-font-size-base);--el-text-color:var(--el-text-color-regular);align-self:center;color:var(--el-text-color);font-size:var(--el-text-font-size);margin:0;overflow-wrap:break-word;padding:0}.el-text.is-truncated{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-text.is-line-clamp{display:-webkit-inline-box;-webkit-box-orient:vertical;overflow:hidden}.el-text--large{--el-text-font-size:var(--el-font-size-medium)}.el-text--default{--el-text-font-size:var(--el-font-size-base)}.el-text--small{--el-text-font-size:var(--el-font-size-extra-small)}.el-text.el-text--primary{--el-text-color:var(--el-color-primary)}.el-text.el-text--success{--el-text-color:var(--el-color-success)}.el-text.el-text--warning{--el-text-color:var(--el-color-warning)}.el-text.el-text--danger{--el-text-color:var(--el-color-danger)}.el-text.el-text--error{--el-text-color:var(--el-color-error)}.el-text.el-text--info{--el-text-color:var(--el-color-info)}.el-text>.el-icon{vertical-align:-2px}.time-select{margin:5px 0;min-width:0}.time-select .el-picker-panel__content{margin:0;max-height:200px}.time-select-item{font-size:14px;line-height:20px;padding:8px 10px}.time-select-item.disabled{color:var(--el-datepicker-border-color);cursor:not-allowed}.time-select-item:hover{background-color:var(--el-fill-color-light);cursor:pointer;font-weight:700}.time-select .time-select-item.selected:not(.disabled){color:var(--el-color-primary);font-weight:700}.el-timeline-item{padding-bottom:20px;position:relative}.el-timeline-item__wrapper{padding-left:28px;position:relative;top:-3px}.el-timeline-item__tail{border-left:2px solid var(--el-timeline-node-color);height:100%;left:4px;position:absolute}.el-timeline-item .el-timeline-item__icon{color:var(--el-color-white);font-size:var(--el-font-size-small)}.el-timeline-item__node{align-items:center;background-color:var(--el-timeline-node-color);border-color:var(--el-timeline-node-color);border-radius:50%;box-sizing:border-box;display:flex;justify-content:center;position:absolute}.el-timeline-item__node--normal{height:var(--el-timeline-node-size-normal);left:-1px;width:var(--el-timeline-node-size-normal)}.el-timeline-item__node--large{height:var(--el-timeline-node-size-large);left:-2px;width:var(--el-timeline-node-size-large)}.el-timeline-item__node.is-hollow{background:var(--el-color-white);border-style:solid;border-width:2px}.el-timeline-item__node--primary{background-color:var(--el-color-primary);border-color:var(--el-color-primary)}.el-timeline-item__node--success{background-color:var(--el-color-success);border-color:var(--el-color-success)}.el-timeline-item__node--warning{background-color:var(--el-color-warning);border-color:var(--el-color-warning)}.el-timeline-item__node--danger{background-color:var(--el-color-danger);border-color:var(--el-color-danger)}.el-timeline-item__node--info{background-color:var(--el-color-info);border-color:var(--el-color-info)}.el-timeline-item__dot{align-items:center;display:flex;justify-content:center;position:absolute}.el-timeline-item__content{color:var(--el-text-color-primary)}.el-timeline-item__timestamp{color:var(--el-text-color-secondary);font-size:var(--el-font-size-small);line-height:1}.el-timeline-item__timestamp.is-top{margin-bottom:8px;padding-top:4px}.el-timeline-item__timestamp.is-bottom{margin-top:8px}.el-timeline{--el-timeline-node-size-normal:12px;--el-timeline-node-size-large:14px;--el-timeline-node-color:var(--el-border-color-light);font-size:var(--el-font-size-base);list-style:none;margin:0}.el-timeline .el-timeline-item:last-child .el-timeline-item__tail{display:none}.el-timeline .el-timeline-item__center{align-items:center;display:flex}.el-timeline .el-timeline-item__center .el-timeline-item__wrapper{width:100%}.el-timeline .el-timeline-item__center .el-timeline-item__tail{top:0}.el-timeline .el-timeline-item__center:first-child .el-timeline-item__tail{height:calc(50% + 10px);top:calc(50% - 10px)}.el-timeline .el-timeline-item__center:last-child .el-timeline-item__tail{display:block;height:calc(50% - 10px)}.el-tooltip-v2__content{--el-tooltip-v2-padding:5px 10px;--el-tooltip-v2-border-radius:4px;--el-tooltip-v2-border-color:var(--el-border-color);background-color:var(--el-color-white);border:1px solid var(--el-border-color);border-radius:var(--el-tooltip-v2-border-radius);color:var(--el-color-black);padding:var(--el-tooltip-v2-padding)}.el-tooltip-v2__arrow{color:var(--el-color-white);height:var(--el-tooltip-v2-arrow-height);left:var(--el-tooltip-v2-arrow-x);pointer-events:none;position:absolute;top:var(--el-tooltip-v2-arrow-y);width:var(--el-tooltip-v2-arrow-width)}.el-tooltip-v2__arrow:after,.el-tooltip-v2__arrow:before{border:var(--el-tooltip-v2-arrow-border-width) solid transparent;content:"";height:0;position:absolute;width:0}.el-tooltip-v2__content[data-side^=top] .el-tooltip-v2__arrow{bottom:0}.el-tooltip-v2__content[data-side^=top] .el-tooltip-v2__arrow:before{border-bottom:0;border-top-color:var(--el-color-white);border-top-width:var(--el-tooltip-v2-arrow-border-width);top:calc(100% - 1px)}.el-tooltip-v2__content[data-side^=top] .el-tooltip-v2__arrow:after{border-bottom:0;border-top-color:var(--el-border-color);border-top-width:var(--el-tooltip-v2-arrow-border-width);top:100%;z-index:-1}.el-tooltip-v2__content[data-side^=bottom] .el-tooltip-v2__arrow{top:0}.el-tooltip-v2__content[data-side^=bottom] .el-tooltip-v2__arrow:before{border-bottom-color:var(--el-color-white);border-bottom-width:var(--el-tooltip-v2-arrow-border-width);border-top:0;bottom:calc(100% - 1px)}.el-tooltip-v2__content[data-side^=bottom] .el-tooltip-v2__arrow:after{border-bottom-color:var(--el-border-color);border-bottom-width:var(--el-tooltip-v2-arrow-border-width);border-top:0;bottom:100%;z-index:-1}.el-tooltip-v2__content[data-side^=left] .el-tooltip-v2__arrow{right:0}.el-tooltip-v2__content[data-side^=left] .el-tooltip-v2__arrow:before{border-left-color:var(--el-color-white);border-left-width:var(--el-tooltip-v2-arrow-border-width);border-right:0;left:calc(100% - 1px)}.el-tooltip-v2__content[data-side^=left] .el-tooltip-v2__arrow:after{border-left-color:var(--el-border-color);border-left-width:var(--el-tooltip-v2-arrow-border-width);border-right:0;left:100%;z-index:-1}.el-tooltip-v2__content[data-side^=right] .el-tooltip-v2__arrow{left:0}.el-tooltip-v2__content[data-side^=right] .el-tooltip-v2__arrow:before{border-left:0;border-right-color:var(--el-color-white);border-right-width:var(--el-tooltip-v2-arrow-border-width);right:calc(100% - 1px)}.el-tooltip-v2__content[data-side^=right] .el-tooltip-v2__arrow:after{border-left:0;border-right-color:var(--el-border-color);border-right-width:var(--el-tooltip-v2-arrow-border-width);right:100%;z-index:-1}.el-tooltip-v2__content.is-dark{--el-tooltip-v2-border-color:transparent;color:var(--el-color-white)}.el-tooltip-v2__content.is-dark,.el-tooltip-v2__content.is-dark .el-tooltip-v2__arrow{background-color:var(--el-color-black);border-color:transparent}.el-transfer{--el-transfer-border-color:var(--el-border-color-lighter);--el-transfer-border-radius:var(--el-border-radius-base);--el-transfer-panel-width:200px;--el-transfer-panel-header-height:40px;--el-transfer-panel-header-bg-color:var(--el-fill-color-light);--el-transfer-panel-footer-height:40px;--el-transfer-panel-body-height:278px;--el-transfer-item-height:30px;--el-transfer-filter-height:32px;font-size:var(--el-font-size-base)}.el-transfer__buttons{display:inline-block;padding:0 30px;vertical-align:middle}.el-transfer__button{vertical-align:top}.el-transfer__button:nth-child(2){margin:0 0 0 10px}.el-transfer__button i,.el-transfer__button span{font-size:14px}.el-transfer__button .el-icon+span{margin-left:0}.el-transfer-panel{background:var(--el-bg-color-overlay);box-sizing:border-box;display:inline-block;max-height:100%;overflow:hidden;position:relative;text-align:left;vertical-align:middle;width:var(--el-transfer-panel-width)}.el-transfer-panel__body{border-bottom:1px solid var(--el-transfer-border-color);border-bottom-left-radius:var(--el-transfer-border-radius);border-bottom-right-radius:var(--el-transfer-border-radius);border-left:1px solid var(--el-transfer-border-color);border-right:1px solid var(--el-transfer-border-color);height:var(--el-transfer-panel-body-height);overflow:hidden}.el-transfer-panel__body.is-with-footer{border-bottom:none;border-bottom-left-radius:0;border-bottom-right-radius:0}.el-transfer-panel__list{box-sizing:border-box;height:var(--el-transfer-panel-body-height);list-style:none;margin:0;overflow:auto;padding:6px 0}.el-transfer-panel__list.is-filterable{height:calc(100% - var(--el-transfer-filter-height) - 30px);padding-top:0}.el-transfer-panel__item{display:block!important;height:var(--el-transfer-item-height);line-height:var(--el-transfer-item-height);padding-left:15px}.el-transfer-panel__item+.el-transfer-panel__item{margin-left:0}.el-transfer-panel__item.el-checkbox{color:var(--el-text-color-regular)}.el-transfer-panel__item:hover{color:var(--el-color-primary)}.el-transfer-panel__item.el-checkbox .el-checkbox__label{box-sizing:border-box;display:block;line-height:var(--el-transfer-item-height);overflow:hidden;padding-left:22px;text-overflow:ellipsis;white-space:nowrap;width:100%}.el-transfer-panel__item .el-checkbox__input{position:absolute;top:8px}.el-transfer-panel__filter{box-sizing:border-box;padding:15px;text-align:center}.el-transfer-panel__filter .el-input__inner{box-sizing:border-box;display:inline-block;font-size:12px;height:var(--el-transfer-filter-height);width:100%}.el-transfer-panel__filter .el-icon-circle-close{cursor:pointer}.el-transfer-panel .el-transfer-panel__header{align-items:center;background:var(--el-transfer-panel-header-bg-color);border:1px solid var(--el-transfer-border-color);border-top-left-radius:var(--el-transfer-border-radius);border-top-right-radius:var(--el-transfer-border-radius);box-sizing:border-box;color:var(--el-color-black);display:flex;height:var(--el-transfer-panel-header-height);margin:0;padding-left:15px}.el-transfer-panel .el-transfer-panel__header .el-checkbox{align-items:center;display:flex;position:relative;width:100%}.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{color:var(--el-text-color-primary);font-size:16px;font-weight:400}.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label span{color:var(--el-text-color-secondary);font-size:12px;font-weight:400;position:absolute;right:15px;top:50%;transform:translate3d(0,-50%,0)}.el-transfer-panel .el-transfer-panel__footer{background:var(--el-bg-color-overlay);border:1px solid var(--el-transfer-border-color);border-bottom-left-radius:var(--el-transfer-border-radius);border-bottom-right-radius:var(--el-transfer-border-radius);height:var(--el-transfer-panel-footer-height);margin:0;padding:0}.el-transfer-panel .el-transfer-panel__footer:after{content:"";display:inline-block;height:100%;vertical-align:middle}.el-transfer-panel .el-transfer-panel__footer .el-checkbox{color:var(--el-text-color-regular);padding-left:20px}.el-transfer-panel .el-transfer-panel__empty{color:var(--el-text-color-secondary);height:var(--el-transfer-item-height);line-height:var(--el-transfer-item-height);margin:0;padding:6px 15px 0;text-align:center}.el-transfer-panel .el-checkbox__label{padding-left:8px}.el-transfer-panel .el-checkbox__inner{border-radius:3px;height:14px;width:14px}.el-transfer-panel .el-checkbox__inner:after{height:6px;left:4px;width:3px}.el-tree{--el-tree-node-content-height:26px;--el-tree-node-hover-bg-color:var(--el-fill-color-light);--el-tree-text-color:var(--el-text-color-regular);--el-tree-expand-icon-color:var(--el-text-color-placeholder);background:var(--el-fill-color-blank);color:var(--el-tree-text-color);cursor:default;font-size:var(--el-font-size-base);position:relative}.el-tree__empty-block{height:100%;min-height:60px;position:relative;text-align:center;width:100%}.el-tree__empty-text{color:var(--el-text-color-secondary);font-size:var(--el-font-size-base);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}.el-tree__drop-indicator{background-color:var(--el-color-primary);height:1px;left:0;position:absolute;right:0}.el-tree-node{outline:none;white-space:nowrap}.el-tree-node:focus>.el-tree-node__content{background-color:var(--el-tree-node-hover-bg-color)}.el-tree-node.is-drop-inner>.el-tree-node__content .el-tree-node__label{background-color:var(--el-color-primary);color:#fff}.el-tree-node__content{--el-checkbox-height:var(--el-tree-node-content-height);align-items:center;cursor:pointer;display:flex;height:var(--el-tree-node-content-height)}.el-tree-node__content>.el-tree-node__expand-icon{box-sizing:content-box;padding:6px}.el-tree-node__content>label.el-checkbox{margin-right:8px}.el-tree-node__content:hover{background-color:var(--el-tree-node-hover-bg-color)}.el-tree.is-dragging .el-tree-node__content{cursor:move}.el-tree.is-dragging .el-tree-node__content *{pointer-events:none}.el-tree.is-dragging.is-drop-not-allow .el-tree-node__content{cursor:not-allowed}.el-tree-node__expand-icon{color:var(--el-tree-expand-icon-color);cursor:pointer;font-size:12px;transform:rotate(0);transition:transform var(--el-transition-duration) ease-in-out}.el-tree-node__expand-icon.expanded{transform:rotate(90deg)}.el-tree-node__expand-icon.is-leaf{color:transparent;cursor:default;visibility:hidden}.el-tree-node__expand-icon.is-hidden{visibility:hidden}.el-tree-node__loading-icon{color:var(--el-tree-expand-icon-color);font-size:var(--el-font-size-base);margin-right:8px}.el-tree-node>.el-tree-node__children{background-color:transparent;overflow:hidden}.el-tree-node.is-expanded>.el-tree-node__children{display:block}.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color:var(--el-color-primary-light-9)}.el-tree-select{--el-tree-node-content-height:26px;--el-tree-node-hover-bg-color:var(--el-fill-color-light);--el-tree-text-color:var(--el-text-color-regular);--el-tree-expand-icon-color:var(--el-text-color-placeholder)}.el-tree-select__popper .el-tree-node__expand-icon{margin-left:8px}.el-tree-select__popper .el-tree-node.is-checked>.el-tree-node__content .el-select-dropdown__item.selected:after{content:none}.el-tree-select__popper .el-select-dropdown__list>.el-select-dropdown__item{padding-left:32px}.el-tree-select__popper .el-select-dropdown__item{background:transparent!important;flex:1;height:20px;line-height:20px;padding-left:0}.el-upload{--el-upload-dragger-padding-horizontal:40px;--el-upload-dragger-padding-vertical:10px;align-items:center;cursor:pointer;display:inline-flex;justify-content:center;outline:none}.el-upload.is-disabled{cursor:not-allowed}.el-upload.is-disabled:focus{color:inherit}.el-upload.is-disabled:focus,.el-upload.is-disabled:focus .el-upload-dragger{border-color:var(--el-border-color-darker)}.el-upload.is-disabled .el-upload-dragger{background-color:var(--el-disabled-bg-color);cursor:not-allowed}.el-upload.is-disabled .el-upload-dragger .el-upload__text{color:var(--el-text-color-placeholder)}.el-upload.is-disabled .el-upload-dragger .el-upload__text em{color:var(--el-disabled-text-color)}.el-upload.is-disabled .el-upload-dragger:hover{border-color:var(--el-border-color-darker)}.el-upload__input{display:none}.el-upload__tip{color:var(--el-text-color-regular);font-size:12px;margin-top:7px}.el-upload iframe{filter:alpha(opacity=0);left:0;opacity:0;position:absolute;top:0;z-index:-1}.el-upload--picture-card{--el-upload-picture-card-size:148px;align-items:center;background-color:var(--el-fill-color-lighter);border:1px dashed var(--el-border-color-darker);border-radius:6px;box-sizing:border-box;cursor:pointer;display:inline-flex;height:var(--el-upload-picture-card-size);justify-content:center;vertical-align:top;width:var(--el-upload-picture-card-size)}.el-upload--picture-card>i{color:var(--el-text-color-secondary);font-size:28px}.el-upload--picture-card:hover{border-color:var(--el-color-primary);color:var(--el-color-primary)}.el-upload.is-drag{display:block}.el-upload:focus{color:var(--el-color-primary)}.el-upload:focus,.el-upload:focus .el-upload-dragger{border-color:var(--el-color-primary)}.el-upload-dragger{background-color:var(--el-fill-color-blank);border:1px dashed var(--el-border-color);border-radius:6px;box-sizing:border-box;cursor:pointer;overflow:hidden;padding:var(--el-upload-dragger-padding-horizontal) var(--el-upload-dragger-padding-vertical);position:relative;text-align:center}.el-upload-dragger .el-icon--upload{color:var(--el-text-color-placeholder);font-size:67px;line-height:50px;margin-bottom:16px}.el-upload-dragger+.el-upload__tip{text-align:center}.el-upload-dragger~.el-upload__files{border-top:var(--el-border);margin-top:7px;padding-top:5px}.el-upload-dragger .el-upload__text{color:var(--el-text-color-regular);font-size:14px;text-align:center}.el-upload-dragger .el-upload__text em{color:var(--el-color-primary);font-style:normal}.el-upload-dragger:hover{border-color:var(--el-color-primary)}.el-upload-dragger.is-dragover{background-color:var(--el-color-primary-light-9);border:2px dashed var(--el-color-primary);padding:calc(var(--el-upload-dragger-padding-horizontal) - 1px) calc(var(--el-upload-dragger-padding-vertical) - 1px)}.el-upload-list{list-style:none;margin:10px 0 0;padding:0;position:relative}.el-upload-list__item{border-radius:4px;box-sizing:border-box;color:var(--el-text-color-regular);font-size:14px;margin-bottom:5px;position:relative;transition:all .5s cubic-bezier(.55,0,.1,1);width:100%}.el-upload-list__item .el-progress{position:absolute;top:20px;width:100%}.el-upload-list__item .el-progress__text{position:absolute;right:0;top:-13px}.el-upload-list__item .el-progress-bar{margin-right:0;padding-right:0}.el-upload-list__item .el-icon--upload-success{color:var(--el-color-success)}.el-upload-list__item .el-icon--close{color:var(--el-text-color-regular);cursor:pointer;display:none;opacity:.75;position:absolute;right:5px;top:50%;transform:translateY(-50%);transition:opacity var(--el-transition-duration)}.el-upload-list__item .el-icon--close:hover{color:var(--el-color-primary);opacity:1}.el-upload-list__item .el-icon--close-tip{color:var(--el-color-primary);cursor:pointer;display:none;font-size:12px;font-style:normal;opacity:1;position:absolute;right:5px;top:1px}.el-upload-list__item:hover{background-color:var(--el-fill-color-light)}.el-upload-list__item:hover .el-icon--close{display:inline-flex}.el-upload-list__item:hover .el-progress__text{display:none}.el-upload-list__item .el-upload-list__item-info{display:inline-flex;flex-direction:column;justify-content:center;margin-left:4px;width:calc(100% - 30px)}.el-upload-list__item.is-success .el-upload-list__item-status-label{display:inline-flex}.el-upload-list__item.is-success .el-upload-list__item-name:focus,.el-upload-list__item.is-success .el-upload-list__item-name:hover{color:var(--el-color-primary);cursor:pointer}.el-upload-list__item.is-success:focus:not(:hover) .el-icon--close-tip{display:inline-block}.el-upload-list__item.is-success:active,.el-upload-list__item.is-success:not(.focusing):focus{outline-width:0}.el-upload-list__item.is-success:active .el-icon--close-tip,.el-upload-list__item.is-success:not(.focusing):focus .el-icon--close-tip{display:none}.el-upload-list__item.is-success:focus .el-upload-list__item-status-label,.el-upload-list__item.is-success:hover .el-upload-list__item-status-label{display:none;opacity:0}.el-upload-list__item-name{align-items:center;color:var(--el-text-color-regular);display:inline-flex;font-size:var(--el-font-size-base);padding:0 4px;text-align:center;transition:color var(--el-transition-duration)}.el-upload-list__item-name .el-icon{color:var(--el-text-color-secondary);margin-right:6px}.el-upload-list__item-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.el-upload-list__item-status-label{align-items:center;display:none;height:100%;justify-content:center;line-height:inherit;position:absolute;right:5px;top:0;transition:opacity var(--el-transition-duration)}.el-upload-list__item-delete{color:var(--el-text-color-regular);display:none;font-size:12px;position:absolute;right:10px;top:0}.el-upload-list__item-delete:hover{color:var(--el-color-primary)}.el-upload-list--picture-card{--el-upload-list-picture-card-size:148px;display:inline-flex;flex-wrap:wrap;margin:0}.el-upload-list--picture-card .el-upload-list__item{background-color:var(--el-fill-color-blank);border:1px solid var(--el-border-color);border-radius:6px;box-sizing:border-box;display:inline-flex;height:var(--el-upload-list-picture-card-size);margin:0 8px 8px 0;overflow:hidden;padding:0;width:var(--el-upload-list-picture-card-size)}.el-upload-list--picture-card .el-upload-list__item .el-icon--check,.el-upload-list--picture-card .el-upload-list__item .el-icon--circle-check{color:#fff}.el-upload-list--picture-card .el-upload-list__item .el-icon--close{display:none}.el-upload-list--picture-card .el-upload-list__item:hover .el-upload-list__item-status-label{display:block;opacity:0}.el-upload-list--picture-card .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture-card .el-upload-list__item .el-upload-list__item-name{display:none}.el-upload-list--picture-card .el-upload-list__item-thumbnail{height:100%;-o-object-fit:contain;object-fit:contain;width:100%}.el-upload-list--picture-card .el-upload-list__item-status-label{background:var(--el-color-success);height:24px;right:-15px;text-align:center;top:-6px;transform:rotate(45deg);width:40px}.el-upload-list--picture-card .el-upload-list__item-status-label i{font-size:12px;margin-top:11px;transform:rotate(-45deg)}.el-upload-list--picture-card .el-upload-list__item-actions{align-items:center;background-color:var(--el-overlay-color-lighter);color:#fff;cursor:default;display:inline-flex;font-size:20px;height:100%;justify-content:center;left:0;opacity:0;position:absolute;top:0;transition:opacity var(--el-transition-duration);width:100%}.el-upload-list--picture-card .el-upload-list__item-actions span{cursor:pointer;display:none}.el-upload-list--picture-card .el-upload-list__item-actions span+span{margin-left:16px}.el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{color:inherit;font-size:inherit;position:static}.el-upload-list--picture-card .el-upload-list__item-actions:hover{opacity:1}.el-upload-list--picture-card .el-upload-list__item-actions:hover span{display:inline-flex}.el-upload-list--picture-card .el-progress{bottom:auto;left:50%;top:50%;transform:translate(-50%,-50%);width:126px}.el-upload-list--picture-card .el-progress .el-progress__text{top:50%}.el-upload-list--picture .el-upload-list__item{align-items:center;background-color:var(--el-fill-color-blank);border:1px solid var(--el-border-color);border-radius:6px;box-sizing:border-box;display:flex;margin-top:10px;overflow:hidden;padding:10px;z-index:0}.el-upload-list--picture .el-upload-list__item .el-icon--check,.el-upload-list--picture .el-upload-list__item .el-icon--circle-check{color:#fff}.el-upload-list--picture .el-upload-list__item:hover .el-upload-list__item-status-label{display:inline-flex;opacity:0}.el-upload-list--picture .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name i{display:none}.el-upload-list--picture .el-upload-list__item .el-icon--close{top:5px;transform:translateY(0)}.el-upload-list--picture .el-upload-list__item-thumbnail{align-items:center;background-color:var(--el-color-white);display:inline-flex;height:70px;justify-content:center;-o-object-fit:contain;object-fit:contain;position:relative;width:70px;z-index:1}.el-upload-list--picture .el-upload-list__item-status-label{background:var(--el-color-success);height:26px;position:absolute;right:-17px;text-align:center;top:-7px;transform:rotate(45deg);width:46px}.el-upload-list--picture .el-upload-list__item-status-label i{font-size:12px;margin-top:12px;transform:rotate(-45deg)}.el-upload-list--picture .el-progress{position:relative;top:-7px}.el-upload-cover{cursor:default;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%;z-index:10}.el-upload-cover:after{content:"";display:inline-block;height:100%;vertical-align:middle}.el-upload-cover img{display:block;height:100%;width:100%}.el-upload-cover__label{background:var(--el-color-success);height:24px;right:-15px;text-align:center;top:-6px;transform:rotate(45deg);width:40px}.el-upload-cover__label i{color:#fff;font-size:12px;margin-top:11px;transform:rotate(-45deg)}.el-upload-cover__progress{display:inline-block;position:static;vertical-align:middle;width:243px}.el-upload-cover__progress+.el-upload__inner{opacity:0}.el-upload-cover__content{height:100%;left:0;position:absolute;top:0;width:100%}.el-upload-cover__interact{background-color:var(--el-overlay-color-light);bottom:0;height:100%;left:0;position:absolute;text-align:center;width:100%}.el-upload-cover__interact .btn{color:#fff;cursor:pointer;display:inline-block;font-size:14px;margin-top:60px;transition:var(--el-transition-md-fade);vertical-align:middle}.el-upload-cover__interact .btn i{margin-top:0}.el-upload-cover__interact .btn span{opacity:0;transition:opacity .15s linear}.el-upload-cover__interact .btn:not(:first-child){margin-left:35px}.el-upload-cover__interact .btn:hover{transform:translateY(-13px)}.el-upload-cover__interact .btn:hover span{opacity:1}.el-upload-cover__interact .btn i{color:#fff;display:block;font-size:24px;line-height:inherit;margin:0 auto 5px}.el-upload-cover__title{background-color:#fff;bottom:0;color:var(--el-text-color-primary);font-size:14px;font-weight:400;height:36px;left:0;line-height:36px;margin:0;overflow:hidden;padding:0 10px;position:absolute;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%}.el-upload-cover+.el-upload__inner{opacity:0;position:relative;z-index:1}.el-vl__wrapper{position:relative}.el-vl__wrapper.always-on .el-virtual-scrollbar,.el-vl__wrapper:hover .el-virtual-scrollbar{opacity:1}.el-vl__window{scrollbar-width:none}.el-vl__window::-webkit-scrollbar{display:none}.el-virtual-scrollbar{opacity:0;transition:opacity .34s ease-out}.el-virtual-scrollbar.always-on{opacity:1}.el-vg__wrapper{position:relative}.el-popper{--el-popper-border-radius:var(--el-popover-border-radius,4px);border-radius:var(--el-popper-border-radius);font-size:12px;line-height:20px;min-width:10px;overflow-wrap:break-word;padding:5px 11px;position:absolute;visibility:visible;word-break:break-all;z-index:2000}.el-popper.is-dark{color:var(--el-bg-color)}.el-popper.is-dark,.el-popper.is-dark>.el-popper__arrow:before{background:var(--el-text-color-primary);border:1px solid var(--el-text-color-primary)}.el-popper.is-dark>.el-popper__arrow:before{right:0}.el-popper.is-light,.el-popper.is-light>.el-popper__arrow:before{background:var(--el-bg-color-overlay);border:1px solid var(--el-border-color-light)}.el-popper.is-light>.el-popper__arrow:before{right:0}.el-popper.is-pure{padding:0}.el-popper__arrow,.el-popper__arrow:before{height:10px;position:absolute;width:10px;z-index:-1}.el-popper__arrow:before{background:var(--el-text-color-primary);box-sizing:border-box;content:" ";transform:rotate(45deg)}.el-popper[data-popper-placement^=top]>.el-popper__arrow{bottom:-5px}.el-popper[data-popper-placement^=top]>.el-popper__arrow:before{border-bottom-right-radius:2px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow{top:-5px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow:before{border-top-left-radius:2px}.el-popper[data-popper-placement^=left]>.el-popper__arrow{right:-5px}.el-popper[data-popper-placement^=left]>.el-popper__arrow:before{border-top-right-radius:2px}.el-popper[data-popper-placement^=right]>.el-popper__arrow{left:-5px}.el-popper[data-popper-placement^=right]>.el-popper__arrow:before{border-bottom-left-radius:2px}.el-popper[data-popper-placement^=top]>.el-popper__arrow:before{border-left-color:transparent!important;border-top-color:transparent!important}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow:before{border-bottom-color:transparent!important;border-right-color:transparent!important}.el-popper[data-popper-placement^=left]>.el-popper__arrow:before{border-bottom-color:transparent!important;border-left-color:transparent!important}.el-popper[data-popper-placement^=right]>.el-popper__arrow:before{border-right-color:transparent!important;border-top-color:transparent!important}.el-statistic{--el-statistic-title-font-weight:400;--el-statistic-title-font-size:var(--el-font-size-extra-small);--el-statistic-title-color:var(--el-text-color-regular);--el-statistic-content-font-weight:400;--el-statistic-content-font-size:var(--el-font-size-extra-large);--el-statistic-content-color:var(--el-text-color-primary)}.el-statistic__head{color:var(--el-statistic-title-color);font-size:var(--el-statistic-title-font-size);font-weight:var(--el-statistic-title-font-weight);line-height:20px;margin-bottom:4px}.el-statistic__content{color:var(--el-statistic-content-color);font-size:var(--el-statistic-content-font-size);font-weight:var(--el-statistic-content-font-weight)}.el-statistic__value{display:inline-block}.el-statistic__prefix{display:inline-block;margin-right:4px}.el-statistic__suffix{display:inline-block;margin-left:4px}.el-tour{--el-tour-width:520px;--el-tour-padding-primary:12px;--el-tour-font-line-height:var(--el-font-line-height-primary);--el-tour-title-font-size:16px;--el-tour-title-text-color:var(--el-text-color-primary);--el-tour-title-font-weight:400;--el-tour-close-color:var(--el-color-info);--el-tour-font-size:14px;--el-tour-color:var(--el-text-color-primary);--el-tour-bg-color:var(--el-bg-color);--el-tour-border-radius:4px}.el-tour__hollow{transition:all var(--el-transition-duration) ease}.el-tour__content{border-radius:var(--el-tour-border-radius);box-shadow:var(--el-box-shadow-light);outline:none;overflow-wrap:break-word;padding:var(--el-tour-padding-primary);width:var(--el-tour-width)}.el-tour__arrow,.el-tour__content{background:var(--el-tour-bg-color);box-sizing:border-box}.el-tour__arrow{height:10px;pointer-events:none;position:absolute;transform:rotate(45deg);width:10px}.el-tour__content[data-side^=top] .el-tour__arrow{border-left-color:transparent;border-top-color:transparent}.el-tour__content[data-side^=bottom] .el-tour__arrow{border-bottom-color:transparent;border-right-color:transparent}.el-tour__content[data-side^=left] .el-tour__arrow{border-bottom-color:transparent;border-left-color:transparent}.el-tour__content[data-side^=right] .el-tour__arrow{border-right-color:transparent;border-top-color:transparent}.el-tour__content[data-side^=top] .el-tour__arrow{bottom:-5px}.el-tour__content[data-side^=bottom] .el-tour__arrow{top:-5px}.el-tour__content[data-side^=left] .el-tour__arrow{right:-5px}.el-tour__content[data-side^=right] .el-tour__arrow{left:-5px}.el-tour__closebtn{background:transparent;border:none;cursor:pointer;font-size:var(--el-message-close-size,16px);height:40px;outline:none;padding:0;position:absolute;right:0;top:0;width:40px}.el-tour__closebtn .el-tour__close{color:var(--el-tour-close-color);font-size:inherit}.el-tour__closebtn:focus .el-tour__close,.el-tour__closebtn:hover .el-tour__close{color:var(--el-color-primary)}.el-tour__header{padding-bottom:var(--el-tour-padding-primary)}.el-tour__header.show-close{padding-right:calc(var(--el-tour-padding-primary) + var(--el-message-close-size, 16px))}.el-tour__title{color:var(--el-tour-title-text-color);font-size:var(--el-tour-title-font-size);font-weight:var(--el-tour-title-font-weight);line-height:var(--el-tour-font-line-height)}.el-tour__body{color:var(--el-tour-text-color);font-size:var(--el-tour-font-size)}.el-tour__body img,.el-tour__body video{max-width:100%}.el-tour__footer{box-sizing:border-box;display:flex;justify-content:space-between;padding-top:var(--el-tour-padding-primary)}.el-tour__content .el-tour-indicators{display:inline-block;flex:1}.el-tour__content .el-tour-indicator{background:var(--el-color-info-light-9);border-radius:50%;display:inline-block;height:6px;margin-right:6px;width:6px}.el-tour__content .el-tour-indicator.is-active{background:var(--el-color-primary)}.el-tour.el-tour--primary{--el-tour-title-text-color:#fff;--el-tour-text-color:#fff;--el-tour-bg-color:var(--el-color-primary);--el-tour-close-color:#fff}.el-tour.el-tour--primary .el-tour__closebtn:focus .el-tour__close,.el-tour.el-tour--primary .el-tour__closebtn:hover .el-tour__close{color:var(--el-tour-title-text-color)}.el-tour.el-tour--primary .el-button--default{background:#fff;border-color:var(--el-color-primary);color:var(--el-color-primary)}.el-tour.el-tour--primary .el-button--primary{border-color:#fff}.el-tour.el-tour--primary .el-tour-indicator{background:#ffffff26}.el-tour.el-tour--primary .el-tour-indicator.is-active{background:#fff}.el-tour-parent--hidden{overflow:hidden}.el-anchor{--el-anchor-bg-color:var(--el-bg-color);--el-anchor-padding-indent:14px;--el-anchor-line-height:22px;--el-anchor-font-size:12px;--el-anchor-color:var(--el-text-color-secondary);--el-anchor-active-color:var(--el-color-primary);--el-anchor-marker-bg-color:var(--el-color-primary);background-color:var(--el-anchor-bg-color);position:relative}.el-anchor__marker{background-color:var(--el-anchor-marker-bg-color);border-radius:4px;opacity:0;position:absolute;z-index:0}.el-anchor.el-anchor--vertical .el-anchor__marker{height:14px;left:0;top:8px;transition:top .25s ease-in-out,opacity .25s;width:4px}.el-anchor.el-anchor--vertical .el-anchor__list{padding-left:var(--el-anchor-padding-indent)}.el-anchor.el-anchor--vertical.el-anchor--underline:before{background-color:#0505050f;content:"";height:100%;left:0;position:absolute;width:2px}.el-anchor.el-anchor--vertical.el-anchor--underline .el-anchor__marker{border-radius:unset;width:2px}.el-anchor.el-anchor--horizontal .el-anchor__marker{bottom:0;height:2px;transition:left .25s ease-in-out,opacity .25s,width .25s;width:20px}.el-anchor.el-anchor--horizontal .el-anchor__list{display:flex;padding-bottom:4px}.el-anchor.el-anchor--horizontal .el-anchor__list .el-anchor__item{padding-left:16px}.el-anchor.el-anchor--horizontal .el-anchor__list .el-anchor__item:first-child{padding-left:0}.el-anchor.el-anchor--horizontal.el-anchor--underline:before{background-color:#0505050f;bottom:0;content:"";height:2px;position:absolute;width:100%}.el-anchor.el-anchor--horizontal.el-anchor--underline .el-anchor__marker{border-radius:unset;height:2px}.el-anchor__item{display:flex;flex-direction:column;overflow:hidden}.el-anchor__link{cursor:pointer;font-size:var(--el-anchor-font-size);line-height:var(--el-anchor-line-height);max-width:100%;outline:none;overflow:hidden;padding:4px 0;text-decoration:none;text-overflow:ellipsis;transition:color var(--el-transition-duration);white-space:nowrap}.el-anchor__link,.el-anchor__link:focus,.el-anchor__link:hover{color:var(--el-anchor-color)}.el-anchor__link.is-active{color:var(--el-anchor-active-color)}.el-anchor .el-anchor__list .el-anchor__item a{display:inline-block}.el-segmented--vertical{flex-direction:column}.el-segmented--vertical .el-segmented__item{padding:11px}.el-segmented{--el-segmented-color:var(--el-text-color-regular);--el-segmented-bg-color:var(--el-fill-color-light);--el-segmented-padding:2px;--el-segmented-item-selected-color:var(--el-color-white);--el-segmented-item-selected-bg-color:var(--el-color-primary);--el-segmented-item-selected-disabled-bg-color:var(--el-color-primary-light-5);--el-segmented-item-hover-color:var(--el-text-color-primary);--el-segmented-item-hover-bg-color:var(--el-fill-color-dark);--el-segmented-item-active-bg-color:var(--el-fill-color-darker);--el-segmented-item-disabled-color:var(--el-text-color-placeholder);align-items:stretch;background:var(--el-segmented-bg-color);border-radius:var(--el-border-radius-base);box-sizing:border-box;color:var(--el-segmented-color);display:inline-flex;font-size:14px;min-height:32px;padding:var(--el-segmented-padding)}.el-segmented__group{align-items:stretch;display:flex;position:relative;width:100%}.el-segmented__item-selected{background:var(--el-segmented-item-selected-bg-color);border-radius:calc(var(--el-border-radius-base) - 2px);height:100%;left:0;pointer-events:none;position:absolute;top:0;transition:all .3s;width:10px}.el-segmented__item-selected.is-disabled{background:var(--el-segmented-item-selected-disabled-bg-color)}.el-segmented__item-selected.is-focus-visible:before{border-radius:inherit;content:"";inset:0;outline:2px solid var(--el-segmented-item-selected-bg-color);outline-offset:1px;position:absolute}.el-segmented__item{align-items:center;border-radius:calc(var(--el-border-radius-base) - 2px);cursor:pointer;display:flex;flex:1;padding:0 11px}.el-segmented__item:not(.is-disabled):not(.is-selected):hover{background:var(--el-segmented-item-hover-bg-color);color:var(--el-segmented-item-hover-color)}.el-segmented__item:not(.is-disabled):not(.is-selected):active{background:var(--el-segmented-item-active-bg-color)}.el-segmented__item.is-selected,.el-segmented__item.is-selected.is-disabled{color:var(--el-segmented-item-selected-color)}.el-segmented__item.is-disabled{color:var(--el-segmented-item-disabled-color);cursor:not-allowed}.el-segmented__item-input{height:0;margin:0;opacity:0;pointer-events:none;position:absolute;width:0}.el-segmented__item-label{flex:1;line-height:normal;overflow:hidden;text-align:center;text-overflow:ellipsis;transition:color .3s;white-space:nowrap;z-index:1}.el-segmented.is-block{display:flex}.el-segmented.is-block .el-segmented__item{min-width:0}.el-segmented--large{border-radius:var(--el-border-radius-base);font-size:16px;min-height:40px}.el-segmented--large .el-segmented__item-selected{border-radius:calc(var(--el-border-radius-base) - 2px)}.el-segmented--large .el-segmented--vertical .el-segmented__item{padding:11px}.el-segmented--large .el-segmented__item{border-radius:calc(var(--el-border-radius-base) - 2px);padding:0 11px}.el-segmented--small{border-radius:calc(var(--el-border-radius-base) - 1px);font-size:14px;min-height:24px}.el-segmented--small .el-segmented__item-selected{border-radius:calc(var(--el-border-radius-base) - 3px)}.el-segmented--small .el-segmented--vertical .el-segmented__item{padding:7px}.el-segmented--small .el-segmented__item{border-radius:calc(var(--el-border-radius-base) - 3px);padding:0 7px}.el-mention{position:relative;width:100%}.el-mention__popper.el-popper{background:var(--el-bg-color-overlay);box-shadow:var(--el-box-shadow-light)}.el-mention__popper.el-popper,.el-mention__popper.el-popper .el-popper__arrow:before{border:1px solid var(--el-border-color-light)}.el-mention__popper.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-left-color:transparent;border-top-color:transparent}.el-mention__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent;border-right-color:transparent}.el-mention__popper.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-bottom-color:transparent;border-left-color:transparent}.el-mention__popper.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent;border-top-color:transparent}.el-mention-dropdown{--el-mention-font-size:var(--el-font-size-base);--el-mention-bg-color:var(--el-bg-color-overlay);--el-mention-shadow:var(--el-box-shadow-light);--el-mention-border:1px solid var(--el-border-color-light);--el-mention-option-color:var(--el-text-color-regular);--el-mention-option-height:34px;--el-mention-option-min-width:100px;--el-mention-option-hover-background:var(--el-fill-color-light);--el-mention-option-selected-color:var(--el-color-primary);--el-mention-option-disabled-color:var(--el-text-color-placeholder);--el-mention-option-loading-color:var(--el-text-color-secondary);--el-mention-option-loading-padding:10px 0;--el-mention-max-height:174px;--el-mention-padding:6px 0;--el-mention-header-padding:10px;--el-mention-footer-padding:10px}.el-mention-dropdown__item{box-sizing:border-box;color:var(--el-mention-option-color);cursor:pointer;font-size:var(--el-mention-font-size);height:var(--el-mention-option-height);line-height:var(--el-mention-option-height);min-width:var(--el-mention-option-min-width);overflow:hidden;padding:0 20px;position:relative;text-overflow:ellipsis;white-space:nowrap}.el-mention-dropdown__item.is-hovering{background-color:var(--el-mention-option-hover-background)}.el-mention-dropdown__item.is-selected{color:var(--el-mention-option-selected-color);font-weight:700}.el-mention-dropdown__item.is-disabled{background-color:unset;color:var(--el-mention-option-disabled-color);cursor:not-allowed}.el-mention-dropdown{border-radius:var(--el-border-radius-base);box-sizing:border-box;z-index:calc(var(--el-index-top) + 1)}.el-mention-dropdown__loading{color:var(--el-mention-option-loading-color);font-size:12px;margin:0;min-width:var(--el-mention-option-min-width);padding:10px 0;text-align:center}.el-mention-dropdown__wrap{max-height:var(--el-mention-max-height)}.el-mention-dropdown__list{box-sizing:border-box;list-style:none;margin:0;padding:var(--el-mention-padding)}.el-mention-dropdown__header{border-bottom:var(--el-mention-border);padding:var(--el-mention-header-padding)}.el-mention-dropdown__footer{border-top:var(--el-mention-border);padding:var(--el-mention-footer-padding)}.el-splitter{display:flex;height:100%;margin:0;padding:0;position:relative;width:100%}.el-splitter__mask{inset:0;position:absolute;z-index:999}.el-splitter__mask-horizontal{cursor:col-resize}.el-splitter__mask-vertical{cursor:row-resize}.el-splitter__horizontal{flex-direction:row}.el-splitter__vertical{flex-direction:column}.el-splitter-bar{flex:none;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}.el-splitter-bar__disable{cursor:auto!important}.el-splitter-bar__disable:before{background-color:var(--el-border-color-light)!important}.el-splitter-bar__dragger{background:transparent;z-index:1}.el-splitter-bar__dragger,.el-splitter-bar__dragger:before{left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}.el-splitter-bar__dragger:before{background-color:var(--el-border-color-light);content:""}.el-splitter-bar__dragger:hover:before{background-color:var(--el-color-primary-light-5)}.el-splitter-bar__dragger-horizontal:before{height:100%;width:2px}.el-splitter-bar__dragger-vertical:before{height:2px;width:100%}.el-splitter-bar__dragger-active:before{background-color:var(--el-color-primary-light-3)}.el-splitter-bar:hover .el-splitter-bar__collapse-icon{opacity:1}.el-splitter-bar__collapse-icon{align-items:center;background:var(--el-border-color-light);border-radius:2px;cursor:pointer;display:flex;justify-content:center;opacity:0;position:absolute;z-index:9}.el-splitter-bar__collapse-icon:hover{background-color:var(--el-color-primary-light-5);opacity:1}.el-splitter-bar__horizontal-collapse-icon-start{height:24px;left:-12px;top:50%;transform:translate(-50%,-50%);width:16px}.el-splitter-bar__horizontal-collapse-icon-end{height:24px;left:12px;top:50%;transform:translate(-50%,-50%);width:16px}.el-splitter-bar__vertical-collapse-icon-start{height:16px;right:50%;top:-12px;transform:translate(50%,-50%);width:24px}.el-splitter-bar__vertical-collapse-icon-end{height:16px;right:50%;top:12px;transform:translate(50%,-50%);width:24px}.el-splitter-panel{box-sizing:border-box;flex-grow:0;overflow:auto;scrollbar-width:thin} `);

(async function (prettier) {
  'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  var key = `__monkeyWindow-` + (() => {
    try {
      return new URL((_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href)).origin;
    } catch {
      return location.origin;
    }
  })();
  var monkeyWindow = document[key] ?? window;
  var unsafeWindow = /* @__PURE__ */ (() => monkeyWindow.unsafeWindow)();
  var GM_addElement = /* @__PURE__ */ (() => monkeyWindow.GM_addElement)();
  var GM_cookie = /* @__PURE__ */ (() => monkeyWindow.GM_cookie)();
  var Ti = Object.create;
  var _e = Object.defineProperty;
  var bi = Object.getOwnPropertyDescriptor;
  var Ai = Object.getOwnPropertyNames;
  var Si = Object.getPrototypeOf, Ei = Object.prototype.hasOwnProperty;
  var Ci = (a, t) => () => (t || a((t = { exports: {} }).exports, t), t.exports), Ue = (a, t) => {
    for (var e in t) _e(a, e, { get: t[e], enumerable: true });
  }, wi = (a, t, e, s) => {
    if (t && typeof t == "object" || typeof t == "function") for (let i of Ai(t)) !Ei.call(a, i) && i !== e && _e(a, i, { get: () => t[i], enumerable: !(s = bi(t, i)) || s.enumerable });
    return a;
  };
  var ls = (a, t, e) => (e = a != null ? Ti(Si(a)) : {}, wi(_e(e, "default", { value: a, enumerable: true }), a));
  var Tt = Ci((Pe) => {
    Object.defineProperty(Pe, "__esModule", { value: true });
    function Ii(a, t) {
      if (a == null) return {};
      var e = {};
      for (var s in a) if ({}.hasOwnProperty.call(a, s)) {
        if (t.indexOf(s) !== -1) continue;
        e[s] = a[s];
      }
      return e;
    }
    var B = class {
      constructor(t, e, s) {
        this.line = void 0, this.column = void 0, this.index = void 0, this.line = t, this.column = e, this.index = s;
      }
    }, se = class {
      constructor(t, e) {
        this.start = void 0, this.end = void 0, this.filename = void 0, this.identifierName = void 0, this.start = t, this.end = e;
      }
    };
    function D(a, t) {
      let { line: e, column: s, index: i } = a;
      return new B(e, s + t, i + t);
    }
    var hs = "BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED", Ni = { ImportMetaOutsideModule: { message: `import.meta may appear only with 'sourceType: "module"'`, code: hs }, ImportOutsideModule: { message: `'import' and 'export' may appear only with 'sourceType: "module"'`, code: hs } }, cs = { ArrayPattern: "array destructuring pattern", AssignmentExpression: "assignment expression", AssignmentPattern: "assignment expression", ArrowFunctionExpression: "arrow function expression", ConditionalExpression: "conditional expression", CatchClause: "catch clause", ForOfStatement: "for-of statement", ForInStatement: "for-in statement", ForStatement: "for-loop", FormalParameters: "function parameter list", Identifier: "identifier", ImportSpecifier: "import specifier", ImportDefaultSpecifier: "import default specifier", ImportNamespaceSpecifier: "import namespace specifier", ObjectPattern: "object destructuring pattern", ParenthesizedExpression: "parenthesized expression", RestElement: "rest element", UpdateExpression: { true: "prefix operation", false: "postfix operation" }, VariableDeclarator: "variable declaration", YieldExpression: "yield expression" }, Se = (a) => a.type === "UpdateExpression" ? cs.UpdateExpression[`${a.prefix}`] : cs[a.type], ki = { AccessorIsGenerator: ({ kind: a }) => `A ${a}ter cannot be a generator.`, ArgumentsInClass: "'arguments' is only allowed in functions and class methods.", AsyncFunctionInSingleStatementContext: "Async functions can only be declared at the top level or inside a block.", AwaitBindingIdentifier: "Can not use 'await' as identifier inside an async function.", AwaitBindingIdentifierInStaticBlock: "Can not use 'await' as identifier inside a static block.", AwaitExpressionFormalParameter: "'await' is not allowed in async function parameters.", AwaitUsingNotInAsyncContext: "'await using' is only allowed within async functions and at the top levels of modules.", AwaitNotInAsyncContext: "'await' is only allowed within async functions and at the top levels of modules.", BadGetterArity: "A 'get' accessor must not have any formal parameters.", BadSetterArity: "A 'set' accessor must have exactly one formal parameter.", BadSetterRestParameter: "A 'set' accessor function argument must not be a rest parameter.", ConstructorClassField: "Classes may not have a field named 'constructor'.", ConstructorClassPrivateField: "Classes may not have a private field named '#constructor'.", ConstructorIsAccessor: "Class constructor may not be an accessor.", ConstructorIsAsync: "Constructor can't be an async function.", ConstructorIsGenerator: "Constructor can't be a generator.", DeclarationMissingInitializer: ({ kind: a }) => `Missing initializer in ${a} declaration.`, DecoratorArgumentsOutsideParentheses: "Decorator arguments must be moved inside parentheses: use '@(decorator(args))' instead of '@(decorator)(args)'.", DecoratorBeforeExport: "Decorators must be placed *before* the 'export' keyword. Remove the 'decoratorsBeforeExport: true' option to use the 'export @decorator class {}' syntax.", DecoratorsBeforeAfterExport: "Decorators can be placed *either* before or after the 'export' keyword, but not in both locations at the same time.", DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?", DecoratorExportClass: "Decorators must be placed *after* the 'export' keyword. Remove the 'decoratorsBeforeExport: false' option to use the '@decorator export class {}' syntax.", DecoratorSemicolon: "Decorators must not be followed by a semicolon.", DecoratorStaticBlock: "Decorators can't be used with a static block.", DeferImportRequiresNamespace: 'Only `import defer * as x from "./module"` is valid.', DeletePrivateField: "Deleting a private field is not allowed.", DestructureNamedImport: "ES2015 named imports do not destructure. Use another statement for destructuring after the import.", DuplicateConstructor: "Duplicate constructor in the same class.", DuplicateDefaultExport: "Only one default export allowed per module.", DuplicateExport: ({ exportName: a }) => `\`${a}\` has already been exported. Exported identifiers must be unique.`, DuplicateProto: "Redefinition of __proto__ property.", DuplicateRegExpFlags: "Duplicate regular expression flag.", ElementAfterRest: "Rest element must be last element.", EscapedCharNotAnIdentifier: "Invalid Unicode escape.", ExportBindingIsString: ({ localName: a, exportName: t }) => `A string literal cannot be used as an exported binding without \`from\`.
- Did you mean \`export { '${a}' as '${t}' } from 'some-module'\`?`, ExportDefaultFromAsIdentifier: "'from' is not allowed as an identifier after 'export default'.", ForInOfLoopInitializer: ({ type: a }) => `'${a === "ForInStatement" ? "for-in" : "for-of"}' loop variable declaration may not have an initializer.`, ForInUsing: "For-in loop may not start with 'using' declaration.", ForOfAsync: "The left-hand side of a for-of loop may not be 'async'.", ForOfLet: "The left-hand side of a for-of loop may not start with 'let'.", GeneratorInSingleStatementContext: "Generators can only be declared at the top level or inside a block.", IllegalBreakContinue: ({ type: a }) => `Unsyntactic ${a === "BreakStatement" ? "break" : "continue"}.`, IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list.", IllegalReturn: "'return' outside of function.", ImportAttributesUseAssert: "The `assert` keyword in import attributes is deprecated and it has been replaced by the `with` keyword. You can enable the `deprecatedImportAssert` parser plugin to suppress this error.", ImportBindingIsString: ({ importName: a }) => `A string literal cannot be used as an imported binding.
- Did you mean \`import { "${a}" as foo }\`?`, ImportCallArity: "`import()` requires exactly one or two arguments.", ImportCallNotNewExpression: "Cannot use new with import(...).", ImportCallSpreadArgument: "`...` is not allowed in `import()`.", ImportJSONBindingNotDefault: "A JSON module can only be imported with `default`.", ImportReflectionHasAssertion: "`import module x` cannot have assertions.", ImportReflectionNotBinding: 'Only `import module x from "./module"` is valid.', IncompatibleRegExpUVFlags: "The 'u' and 'v' regular expression flags cannot be enabled at the same time.", InvalidBigIntLiteral: "Invalid BigIntLiteral.", InvalidCodePoint: "Code point out of bounds.", InvalidCoverInitializedName: "Invalid shorthand property initializer.", InvalidDecimal: "Invalid decimal.", InvalidDigit: ({ radix: a }) => `Expected number in radix ${a}.`, InvalidEscapeSequence: "Bad character escape sequence.", InvalidEscapeSequenceTemplate: "Invalid escape sequence in template.", InvalidEscapedReservedWord: ({ reservedWord: a }) => `Escape sequence in keyword ${a}.`, InvalidIdentifier: ({ identifierName: a }) => `Invalid identifier ${a}.`, InvalidLhs: ({ ancestor: a }) => `Invalid left-hand side in ${Se(a)}.`, InvalidLhsBinding: ({ ancestor: a }) => `Binding invalid left-hand side in ${Se(a)}.`, InvalidLhsOptionalChaining: ({ ancestor: a }) => `Invalid optional chaining in the left-hand side of ${Se(a)}.`, InvalidNumber: "Invalid number.", InvalidOrMissingExponent: "Floating-point numbers require a valid exponent after the 'e'.", InvalidOrUnexpectedToken: ({ unexpected: a }) => `Unexpected character '${a}'.`, InvalidParenthesizedAssignment: "Invalid parenthesized assignment pattern.", InvalidPrivateFieldResolution: ({ identifierName: a }) => `Private name #${a} is not defined.`, InvalidPropertyBindingPattern: "Binding member expression.", InvalidRecordProperty: "Only properties and spread elements are allowed in record definitions.", InvalidRestAssignmentPattern: "Invalid rest operator's argument.", LabelRedeclaration: ({ labelName: a }) => `Label '${a}' is already declared.`, LetInLexicalBinding: "'let' is disallowed as a lexically bound name.", LineTerminatorBeforeArrow: "No line break is allowed before '=>'.", MalformedRegExpFlags: "Invalid regular expression flag.", MissingClassName: "A class name is required.", MissingEqInAssignment: "Only '=' operator can be used for specifying default value.", MissingSemicolon: "Missing semicolon.", MissingPlugin: ({ missingPlugin: a }) => `This experimental syntax requires enabling the parser plugin: ${a.map((t) => JSON.stringify(t)).join(", ")}.`, MissingOneOfPlugins: ({ missingPlugin: a }) => `This experimental syntax requires enabling one of the following parser plugin(s): ${a.map((t) => JSON.stringify(t)).join(", ")}.`, MissingUnicodeEscape: "Expecting Unicode escape sequence \\uXXXX.", MixingCoalesceWithLogical: "Nullish coalescing operator(??) requires parens when mixing with logical operators.", ModuleAttributeDifferentFromType: "The only accepted module attribute is `type`.", ModuleAttributeInvalidValue: "Only string literals are allowed as module attribute values.", ModuleAttributesWithDuplicateKeys: ({ key: a }) => `Duplicate key "${a}" is not allowed in module attributes.`, ModuleExportNameHasLoneSurrogate: ({ surrogateCharCode: a }) => `An export name cannot include a lone surrogate, found '\\u${a.toString(16)}'.`, ModuleExportUndefined: ({ localName: a }) => `Export '${a}' is not defined.`, MultipleDefaultsInSwitch: "Multiple default clauses.", NewlineAfterThrow: "Illegal newline after throw.", NoCatchOrFinally: "Missing catch or finally clause.", NumberIdentifier: "Identifier directly after number.", NumericSeparatorInEscapeSequence: "Numeric separators are not allowed inside unicode escape sequences or hex escape sequences.", ObsoleteAwaitStar: "'await*' has been removed from the async functions proposal. Use Promise.all() instead.", OptionalChainingNoNew: "Constructors in/after an Optional Chain are not allowed.", OptionalChainingNoTemplate: "Tagged Template Literals are not allowed in optionalChain.", OverrideOnConstructor: "'override' modifier cannot appear on a constructor declaration.", ParamDupe: "Argument name clash.", PatternHasAccessor: "Object pattern can't contain getter or setter.", PatternHasMethod: "Object pattern can't contain methods.", PrivateInExpectedIn: ({ identifierName: a }) => `Private names are only allowed in property accesses (\`obj.#${a}\`) or in \`in\` expressions (\`#${a} in obj\`).`, PrivateNameRedeclaration: ({ identifierName: a }) => `Duplicate private name #${a}.`, RecordExpressionBarIncorrectEndSyntaxType: "Record expressions ending with '|}' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.", RecordExpressionBarIncorrectStartSyntaxType: "Record expressions starting with '{|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.", RecordExpressionHashIncorrectStartSyntaxType: "Record expressions starting with '#{' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.", RecordNoProto: "'__proto__' is not allowed in Record expressions.", RestTrailingComma: "Unexpected trailing comma after rest element.", SloppyFunction: "In non-strict mode code, functions can only be declared at top level or inside a block.", SloppyFunctionAnnexB: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement.", SourcePhaseImportRequiresDefault: 'Only `import source x from "./module"` is valid.', StaticPrototype: "Classes may not have static property named prototype.", SuperNotAllowed: "`super()` is only valid inside a class constructor of a subclass. Maybe a typo in the method name ('constructor') or not extending another class?", SuperPrivateField: "Private fields can't be accessed on super.", TrailingDecorator: "Decorators must be attached to a class element.", TupleExpressionBarIncorrectEndSyntaxType: "Tuple expressions ending with '|]' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.", TupleExpressionBarIncorrectStartSyntaxType: "Tuple expressions starting with '[|' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'bar'.", TupleExpressionHashIncorrectStartSyntaxType: "Tuple expressions starting with '#[' are only allowed when the 'syntaxType' option of the 'recordAndTuple' plugin is set to 'hash'.", UnexpectedArgumentPlaceholder: "Unexpected argument placeholder.", UnexpectedAwaitAfterPipelineBody: 'Unexpected "await" after pipeline body; await must have parentheses in minimal proposal.', UnexpectedDigitAfterHash: "Unexpected digit after hash token.", UnexpectedImportExport: "'import' and 'export' may only appear at the top level.", UnexpectedKeyword: ({ keyword: a }) => `Unexpected keyword '${a}'.`, UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.", UnexpectedLexicalDeclaration: "Lexical declaration cannot appear in a single-statement context.", UnexpectedNewTarget: "`new.target` can only be used in functions or class properties.", UnexpectedNumericSeparator: "A numeric separator is only allowed between two digits.", UnexpectedPrivateField: "Unexpected private name.", UnexpectedReservedWord: ({ reservedWord: a }) => `Unexpected reserved word '${a}'.`, UnexpectedSuper: "'super' is only allowed in object methods and classes.", UnexpectedToken: ({ expected: a, unexpected: t }) => `Unexpected token${t ? ` '${t}'.` : ""}${a ? `, expected "${a}"` : ""}`, UnexpectedTokenUnaryExponentiation: "Illegal expression. Wrap left hand side or entire exponentiation in parentheses.", UnexpectedUsingDeclaration: "Using declaration cannot appear in the top level when source type is `script` or in the bare case statement.", UnsupportedBind: "Binding should be performed on object property.", UnsupportedDecoratorExport: "A decorated export must export a class declaration.", UnsupportedDefaultExport: "Only expressions, functions or classes are allowed as the `default` export.", UnsupportedImport: "`import` can only be used in `import()` or `import.meta`.", UnsupportedMetaProperty: ({ target: a, onlyValidPropertyName: t }) => `The only valid meta property for ${a} is ${a}.${t}.`, UnsupportedParameterDecorator: "Decorators cannot be used to decorate parameters.", UnsupportedPropertyDecorator: "Decorators cannot be used to decorate object literal properties.", UnsupportedSuper: "'super' can only be used with function calls (i.e. super()) or in property accesses (i.e. super.prop or super[prop]).", UnterminatedComment: "Unterminated comment.", UnterminatedRegExp: "Unterminated regular expression.", UnterminatedString: "Unterminated string constant.", UnterminatedTemplate: "Unterminated template.", UsingDeclarationExport: "Using declaration cannot be exported.", UsingDeclarationHasBindingPattern: "Using declaration cannot have destructuring patterns.", VarRedeclaration: ({ identifierName: a }) => `Identifier '${a}' has already been declared.`, YieldBindingIdentifier: "Can not use 'yield' as identifier inside a generator.", YieldInParameter: "Yield expression is not allowed in formal parameters.", YieldNotInGeneratorFunction: "'yield' is only allowed within generator functions.", ZeroDigitNumericSeparator: "Numeric separator can not be used after leading 0." }, vi = { StrictDelete: "Deleting local variable in strict mode.", StrictEvalArguments: ({ referenceName: a }) => `Assigning to '${a}' in strict mode.`, StrictEvalArgumentsBinding: ({ bindingName: a }) => `Binding '${a}' in strict mode.`, StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block.", StrictNumericEscape: "The only valid numeric escape in strict mode is '\\0'.", StrictOctalLiteral: "Legacy octal literals are not allowed in strict mode.", StrictWith: "'with' in strict mode." }, Li = { ParseExpressionEmptyInput: "Unexpected parseExpression() input: The input is empty or contains only comments.", ParseExpressionExpectsEOF: ({ unexpected: a }) => `Unexpected parseExpression() input: The input should contain exactly one expression, but the first expression is followed by the unexpected character \`${String.fromCodePoint(a)}\`.` }, Di = /* @__PURE__ */ new Set(["ArrowFunctionExpression", "AssignmentExpression", "ConditionalExpression", "YieldExpression"]), Mi = Object.assign({ PipeBodyIsTighter: "Unexpected yield after pipeline body; any yield expression acting as Hack-style pipe body must be parenthesized due to its loose operator precedence.", PipeTopicRequiresHackPipes: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.', PipeTopicUnbound: "Topic reference is unbound; it must be inside a pipe body.", PipeTopicUnconfiguredToken: ({ token: a }) => `Invalid topic token ${a}. In order to use ${a} as a topic reference, the pipelineOperator plugin must be configured with { "proposal": "hack", "topicToken": "${a}" }.`, PipeTopicUnused: "Hack-style pipe body does not contain a topic reference; Hack-style pipes must use topic at least once.", PipeUnparenthesizedBody: ({ type: a }) => `Hack-style pipe body cannot be an unparenthesized ${Se({ type: a })}; please wrap it in parentheses.` }, { PipelineBodyNoArrow: 'Unexpected arrow "=>" after pipeline body; arrow function in pipeline body must be parenthesized.', PipelineBodySequenceExpression: "Pipeline body may not be a comma-separated sequence expression.", PipelineHeadSequenceExpression: "Pipeline head should not be a comma-separated sequence expression.", PipelineTopicUnused: "Pipeline is in topic style but does not use topic reference.", PrimaryTopicNotAllowed: "Topic reference was used in a lexical context without topic binding.", PrimaryTopicRequiresSmartPipeline: 'Topic reference is used, but the pipelineOperator plugin was not passed a "proposal": "hack" or "smart" option.' }), Oi = ["message"];
    function ps(a, t, e) {
      Object.defineProperty(a, t, { enumerable: false, configurable: true, value: e });
    }
    function Fi({ toMessage: a, code: t, reasonCode: e, syntaxPlugin: s }) {
      let i = e === "MissingPlugin" || e === "MissingOneOfPlugins";
      {
        let r = { AccessorCannotDeclareThisParameter: "AccesorCannotDeclareThisParameter", AccessorCannotHaveTypeParameters: "AccesorCannotHaveTypeParameters", ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference", SetAccessorCannotHaveOptionalParameter: "SetAccesorCannotHaveOptionalParameter", SetAccessorCannotHaveRestParameter: "SetAccesorCannotHaveRestParameter", SetAccessorCannotHaveReturnType: "SetAccesorCannotHaveReturnType" };
        r[e] && (e = r[e]);
      }
      return function r(n, o) {
        let l = new SyntaxError();
        return l.code = t, l.reasonCode = e, l.loc = n, l.pos = n.index, l.syntaxPlugin = s, i && (l.missingPlugin = o.missingPlugin), ps(l, "clone", function(c = {}) {
          var u;
          let { line: f, column: d, index: x } = (u = c.loc) != null ? u : n;
          return r(new B(f, d, x), Object.assign({}, o, c.details));
        }), ps(l, "details", o), Object.defineProperty(l, "message", { configurable: true, get() {
          let h = `${a(o)} (${n.line}:${n.column})`;
          return this.message = h, h;
        }, set(h) {
          Object.defineProperty(this, "message", { value: h, writable: true });
        } }), l;
      };
    }
    function F(a, t) {
      if (Array.isArray(a)) return (s) => F(s, a[0]);
      let e = {};
      for (let s of Object.keys(a)) {
        let i = a[s], r = typeof i == "string" ? { message: () => i } : typeof i == "function" ? { message: i } : i, { message: n } = r, o = Ii(r, Oi), l = typeof n == "string" ? () => n : n;
        e[s] = Fi(Object.assign({ code: "BABEL_PARSER_SYNTAX_ERROR", reasonCode: s, toMessage: l }, t ? { syntaxPlugin: t } : {}, o));
      }
      return e;
    }
    var p = Object.assign({}, F(Ni), F(ki), F(vi), F(Li), F`pipelineOperator`(Mi));
    function Bi() {
      return { sourceType: "script", sourceFilename: void 0, startIndex: 0, startColumn: 0, startLine: 1, allowAwaitOutsideFunction: false, allowReturnOutsideFunction: false, allowNewTargetOutsideFunction: false, allowImportExportEverywhere: false, allowSuperOutsideMethod: false, allowUndeclaredExports: false, allowYieldOutsideFunction: false, plugins: [], strictMode: null, ranges: false, tokens: false, createImportExpressions: false, createParenthesizedExpressions: false, errorRecovery: false, attachComment: true, annexB: true };
    }
    function Ri(a) {
      let t = Bi();
      if (a == null) return t;
      if (a.annexB != null && a.annexB !== false) throw new Error("The `annexB` option can only be set to `false`.");
      for (let e of Object.keys(t)) a[e] != null && (t[e] = a[e]);
      if (t.startLine === 1) a.startIndex == null && t.startColumn > 0 ? t.startIndex = t.startColumn : a.startColumn == null && t.startIndex > 0 && (t.startColumn = t.startIndex);
      else if ((a.startColumn == null || a.startIndex == null) && a.startIndex != null) throw new Error("With a `startLine > 1` you must also specify `startIndex` and `startColumn`.");
      return t;
    }
    var { defineProperty: _i } = Object, us = (a, t) => {
      a && _i(a, t, { enumerable: false, value: a[t] });
    };
    function he(a) {
      return us(a.loc.start, "index"), us(a.loc.end, "index"), a;
    }
    var Ui = (a) => class extends a {
      parse() {
        let e = he(super.parse());
        return this.optionFlags & 256 && (e.tokens = e.tokens.map(he)), e;
      }
      parseRegExpLiteral({ pattern: e, flags: s }) {
        let i = null;
        try {
          i = new RegExp(e, s);
        } catch {
        }
        let r = this.estreeParseLiteral(i);
        return r.regex = { pattern: e, flags: s }, r;
      }
      parseBigIntLiteral(e) {
        let s;
        try {
          s = BigInt(e);
        } catch {
          s = null;
        }
        let i = this.estreeParseLiteral(s);
        return i.bigint = String(i.value || e), i;
      }
      parseDecimalLiteral(e) {
        let i = this.estreeParseLiteral(null);
        return i.decimal = String(i.value || e), i;
      }
      estreeParseLiteral(e) {
        return this.parseLiteral(e, "Literal");
      }
      parseStringLiteral(e) {
        return this.estreeParseLiteral(e);
      }
      parseNumericLiteral(e) {
        return this.estreeParseLiteral(e);
      }
      parseNullLiteral() {
        return this.estreeParseLiteral(null);
      }
      parseBooleanLiteral(e) {
        return this.estreeParseLiteral(e);
      }
      estreeParseChainExpression(e, s) {
        let i = this.startNodeAtNode(e);
        return i.expression = e, this.finishNodeAt(i, "ChainExpression", s);
      }
      directiveToStmt(e) {
        let s = e.value;
        delete e.value, this.castNodeTo(s, "Literal"), s.raw = s.extra.raw, s.value = s.extra.expressionValue;
        let i = this.castNodeTo(e, "ExpressionStatement");
        return i.expression = s, i.directive = s.extra.rawValue, delete s.extra, i;
      }
      fillOptionalPropertiesForTSESLint(e) {
      }
      cloneEstreeStringLiteral(e) {
        let { start: s, end: i, loc: r, range: n, raw: o, value: l } = e, h = Object.create(e.constructor.prototype);
        return h.type = "Literal", h.start = s, h.end = i, h.loc = r, h.range = n, h.raw = o, h.value = l, h;
      }
      initFunction(e, s) {
        super.initFunction(e, s), e.expression = false;
      }
      checkDeclaration(e) {
        e != null && this.isObjectProperty(e) ? this.checkDeclaration(e.value) : super.checkDeclaration(e);
      }
      getObjectOrClassMethodParams(e) {
        return e.value.params;
      }
      isValidDirective(e) {
        var s;
        return e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && !((s = e.expression.extra) != null && s.parenthesized);
      }
      parseBlockBody(e, s, i, r, n) {
        super.parseBlockBody(e, s, i, r, n);
        let o = e.directives.map((l) => this.directiveToStmt(l));
        e.body = o.concat(e.body), delete e.directives;
      }
      parsePrivateName() {
        let e = super.parsePrivateName();
        return this.getPluginOption("estree", "classFeatures") ? this.convertPrivateNameToPrivateIdentifier(e) : e;
      }
      convertPrivateNameToPrivateIdentifier(e) {
        let s = super.getPrivateNameSV(e);
        return e = e, delete e.id, e.name = s, this.castNodeTo(e, "PrivateIdentifier");
      }
      isPrivateName(e) {
        return this.getPluginOption("estree", "classFeatures") ? e.type === "PrivateIdentifier" : super.isPrivateName(e);
      }
      getPrivateNameSV(e) {
        return this.getPluginOption("estree", "classFeatures") ? e.name : super.getPrivateNameSV(e);
      }
      parseLiteral(e, s) {
        let i = super.parseLiteral(e, s);
        return i.raw = i.extra.raw, delete i.extra, i;
      }
      parseFunctionBody(e, s, i = false) {
        super.parseFunctionBody(e, s, i), e.expression = e.body.type !== "BlockStatement";
      }
      parseMethod(e, s, i, r, n, o, l = false) {
        let h = this.startNode();
        h.kind = e.kind, h = super.parseMethod(h, s, i, r, n, o, l), delete h.kind;
        let { typeParameters: c } = e;
        c && (delete e.typeParameters, h.typeParameters = c, this.resetStartLocationFromNode(h, c));
        let u = this.castNodeTo(h, "FunctionExpression");
        return e.value = u, o === "ClassPrivateMethod" && (e.computed = false), o === "ObjectMethod" ? (e.kind === "method" && (e.kind = "init"), e.shorthand = false, this.finishNode(e, "Property")) : this.finishNode(e, "MethodDefinition");
      }
      nameIsConstructor(e) {
        return e.type === "Literal" ? e.value === "constructor" : super.nameIsConstructor(e);
      }
      parseClassProperty(...e) {
        let s = super.parseClassProperty(...e);
        return this.getPluginOption("estree", "classFeatures") && this.castNodeTo(s, "PropertyDefinition"), s;
      }
      parseClassPrivateProperty(...e) {
        let s = super.parseClassPrivateProperty(...e);
        return this.getPluginOption("estree", "classFeatures") && (this.castNodeTo(s, "PropertyDefinition"), s.computed = false), s;
      }
      parseClassAccessorProperty(e) {
        let s = super.parseClassAccessorProperty(e);
        return this.getPluginOption("estree", "classFeatures") && (s.abstract && this.hasPlugin("typescript") ? (delete s.abstract, this.castNodeTo(s, "TSAbstractAccessorProperty")) : this.castNodeTo(s, "AccessorProperty")), s;
      }
      parseObjectProperty(e, s, i, r) {
        let n = super.parseObjectProperty(e, s, i, r);
        return n && (n.kind = "init", this.castNodeTo(n, "Property")), n;
      }
      finishObjectProperty(e) {
        return e.kind = "init", this.finishNode(e, "Property");
      }
      isValidLVal(e, s, i) {
        return e === "Property" ? "value" : super.isValidLVal(e, s, i);
      }
      isAssignable(e, s) {
        return e != null && this.isObjectProperty(e) ? this.isAssignable(e.value, s) : super.isAssignable(e, s);
      }
      toAssignable(e, s = false) {
        if (e != null && this.isObjectProperty(e)) {
          let { key: i, value: r } = e;
          this.isPrivateName(i) && this.classScope.usePrivateName(this.getPrivateNameSV(i), i.loc.start), this.toAssignable(r, s);
        } else super.toAssignable(e, s);
      }
      toAssignableObjectExpressionProp(e, s, i) {
        e.type === "Property" && (e.kind === "get" || e.kind === "set") ? this.raise(p.PatternHasAccessor, e.key) : e.type === "Property" && e.method ? this.raise(p.PatternHasMethod, e.key) : super.toAssignableObjectExpressionProp(e, s, i);
      }
      finishCallExpression(e, s) {
        let i = super.finishCallExpression(e, s);
        if (i.callee.type === "Import") {
          var r, n;
          this.castNodeTo(i, "ImportExpression"), i.source = i.arguments[0], i.options = (r = i.arguments[1]) != null ? r : null, i.attributes = (n = i.arguments[1]) != null ? n : null, delete i.arguments, delete i.callee;
        } else i.type === "OptionalCallExpression" ? this.castNodeTo(i, "CallExpression") : i.optional = false;
        return i;
      }
      toReferencedArguments(e) {
        e.type !== "ImportExpression" && super.toReferencedArguments(e);
      }
      parseExport(e, s) {
        let i = this.state.lastTokStartLoc, r = super.parseExport(e, s);
        switch (r.type) {
          case "ExportAllDeclaration":
            r.exported = null;
            break;
          case "ExportNamedDeclaration":
            r.specifiers.length === 1 && r.specifiers[0].type === "ExportNamespaceSpecifier" && (this.castNodeTo(r, "ExportAllDeclaration"), r.exported = r.specifiers[0].exported, delete r.specifiers);
          case "ExportDefaultDeclaration":
            {
              var n;
              let { declaration: o } = r;
              (o == null ? void 0 : o.type) === "ClassDeclaration" && ((n = o.decorators) == null ? void 0 : n.length) > 0 && o.start === r.start && this.resetStartLocation(r, i);
            }
            break;
        }
        return r;
      }
      stopParseSubscript(e, s) {
        let i = super.stopParseSubscript(e, s);
        return s.optionalChainMember ? this.estreeParseChainExpression(i, e.loc.end) : i;
      }
      parseMember(e, s, i, r, n) {
        let o = super.parseMember(e, s, i, r, n);
        return o.type === "OptionalMemberExpression" ? this.castNodeTo(o, "MemberExpression") : o.optional = false, o;
      }
      isOptionalMemberExpression(e) {
        return e.type === "ChainExpression" ? e.expression.type === "MemberExpression" : super.isOptionalMemberExpression(e);
      }
      hasPropertyAsPrivateName(e) {
        return e.type === "ChainExpression" && (e = e.expression), super.hasPropertyAsPrivateName(e);
      }
      isObjectProperty(e) {
        return e.type === "Property" && e.kind === "init" && !e.method;
      }
      isObjectMethod(e) {
        return e.type === "Property" && (e.method || e.kind === "get" || e.kind === "set");
      }
      castNodeTo(e, s) {
        let i = super.castNodeTo(e, s);
        return this.fillOptionalPropertiesForTSESLint(i), i;
      }
      cloneIdentifier(e) {
        let s = super.cloneIdentifier(e);
        return this.fillOptionalPropertiesForTSESLint(s), s;
      }
      cloneStringLiteral(e) {
        return e.type === "Literal" ? this.cloneEstreeStringLiteral(e) : super.cloneStringLiteral(e);
      }
      finishNodeAt(e, s, i) {
        return he(super.finishNodeAt(e, s, i));
      }
      finishNode(e, s) {
        let i = super.finishNode(e, s);
        return this.fillOptionalPropertiesForTSESLint(i), i;
      }
      resetStartLocation(e, s) {
        super.resetStartLocation(e, s), he(e);
      }
      resetEndLocation(e, s = this.state.lastTokEndLoc) {
        super.resetEndLocation(e, s), he(e);
      }
    }, X = class {
      constructor(t, e) {
        this.token = void 0, this.preserveSpace = void 0, this.token = t, this.preserveSpace = !!e;
      }
    }, C = { brace: new X("{"), j_oTag: new X("<tag"), j_cTag: new X("</tag"), j_expr: new X("<tag>...</tag>", true) };
    C.template = new X("`", true);
    var T = true, m = true, je = true, ce = true, V = true, ji = true, we = class {
      constructor(t, e = {}) {
        this.label = void 0, this.keyword = void 0, this.beforeExpr = void 0, this.startsExpr = void 0, this.rightAssociative = void 0, this.isLoop = void 0, this.isAssign = void 0, this.prefix = void 0, this.postfix = void 0, this.binop = void 0, this.label = t, this.keyword = e.keyword, this.beforeExpr = !!e.beforeExpr, this.startsExpr = !!e.startsExpr, this.rightAssociative = !!e.rightAssociative, this.isLoop = !!e.isLoop, this.isAssign = !!e.isAssign, this.prefix = !!e.prefix, this.postfix = !!e.postfix, this.binop = e.binop != null ? e.binop : null, this.updateContext = null;
      }
    }, pt = /* @__PURE__ */ new Map();
    function E(a, t = {}) {
      t.keyword = a;
      let e = P(a, t);
      return pt.set(a, e), e;
    }
    function L(a, t) {
      return P(a, { beforeExpr: T, binop: t });
    }
    var de = -1, _ = [], ut = [], ft = [], dt = [], mt = [], yt = [];
    function P(a, t = {}) {
      var e, s, i, r;
      return ++de, ut.push(a), ft.push((e = t.binop) != null ? e : -1), dt.push((s = t.beforeExpr) != null ? s : false), mt.push((i = t.startsExpr) != null ? i : false), yt.push((r = t.prefix) != null ? r : false), _.push(new we(a, t)), de;
    }
    function b(a, t = {}) {
      var e, s, i, r;
      return ++de, pt.set(a, de), ut.push(a), ft.push((e = t.binop) != null ? e : -1), dt.push((s = t.beforeExpr) != null ? s : false), mt.push((i = t.startsExpr) != null ? i : false), yt.push((r = t.prefix) != null ? r : false), _.push(new we("name", t)), de;
    }
    var $i = { bracketL: P("[", { beforeExpr: T, startsExpr: m }), bracketHashL: P("#[", { beforeExpr: T, startsExpr: m }), bracketBarL: P("[|", { beforeExpr: T, startsExpr: m }), bracketR: P("]"), bracketBarR: P("|]"), braceL: P("{", { beforeExpr: T, startsExpr: m }), braceBarL: P("{|", { beforeExpr: T, startsExpr: m }), braceHashL: P("#{", { beforeExpr: T, startsExpr: m }), braceR: P("}"), braceBarR: P("|}"), parenL: P("(", { beforeExpr: T, startsExpr: m }), parenR: P(")"), comma: P(",", { beforeExpr: T }), semi: P(";", { beforeExpr: T }), colon: P(":", { beforeExpr: T }), doubleColon: P("::", { beforeExpr: T }), dot: P("."), question: P("?", { beforeExpr: T }), questionDot: P("?."), arrow: P("=>", { beforeExpr: T }), template: P("template"), ellipsis: P("...", { beforeExpr: T }), backQuote: P("`", { startsExpr: m }), dollarBraceL: P("${", { beforeExpr: T, startsExpr: m }), templateTail: P("...`", { startsExpr: m }), templateNonTail: P("...${", { beforeExpr: T, startsExpr: m }), at: P("@"), hash: P("#", { startsExpr: m }), interpreterDirective: P("#!..."), eq: P("=", { beforeExpr: T, isAssign: ce }), assign: P("_=", { beforeExpr: T, isAssign: ce }), slashAssign: P("_=", { beforeExpr: T, isAssign: ce }), xorAssign: P("_=", { beforeExpr: T, isAssign: ce }), moduloAssign: P("_=", { beforeExpr: T, isAssign: ce }), incDec: P("++/--", { prefix: V, postfix: ji, startsExpr: m }), bang: P("!", { beforeExpr: T, prefix: V, startsExpr: m }), tilde: P("~", { beforeExpr: T, prefix: V, startsExpr: m }), doubleCaret: P("^^", { startsExpr: m }), doubleAt: P("@@", { startsExpr: m }), pipeline: L("|>", 0), nullishCoalescing: L("??", 1), logicalOR: L("||", 1), logicalAND: L("&&", 2), bitwiseOR: L("|", 3), bitwiseXOR: L("^", 4), bitwiseAND: L("&", 5), equality: L("==/!=/===/!==", 6), lt: L("</>/<=/>=", 7), gt: L("</>/<=/>=", 7), relational: L("</>/<=/>=", 7), bitShift: L("<</>>/>>>", 8), bitShiftL: L("<</>>/>>>", 8), bitShiftR: L("<</>>/>>>", 8), plusMin: P("+/-", { beforeExpr: T, binop: 9, prefix: V, startsExpr: m }), modulo: P("%", { binop: 10, startsExpr: m }), star: P("*", { binop: 10 }), slash: L("/", 10), exponent: P("**", { beforeExpr: T, binop: 11, rightAssociative: true }), _in: E("in", { beforeExpr: T, binop: 7 }), _instanceof: E("instanceof", { beforeExpr: T, binop: 7 }), _break: E("break"), _case: E("case", { beforeExpr: T }), _catch: E("catch"), _continue: E("continue"), _debugger: E("debugger"), _default: E("default", { beforeExpr: T }), _else: E("else", { beforeExpr: T }), _finally: E("finally"), _function: E("function", { startsExpr: m }), _if: E("if"), _return: E("return", { beforeExpr: T }), _switch: E("switch"), _throw: E("throw", { beforeExpr: T, prefix: V, startsExpr: m }), _try: E("try"), _var: E("var"), _const: E("const"), _with: E("with"), _new: E("new", { beforeExpr: T, startsExpr: m }), _this: E("this", { startsExpr: m }), _super: E("super", { startsExpr: m }), _class: E("class", { startsExpr: m }), _extends: E("extends", { beforeExpr: T }), _export: E("export"), _import: E("import", { startsExpr: m }), _null: E("null", { startsExpr: m }), _true: E("true", { startsExpr: m }), _false: E("false", { startsExpr: m }), _typeof: E("typeof", { beforeExpr: T, prefix: V, startsExpr: m }), _void: E("void", { beforeExpr: T, prefix: V, startsExpr: m }), _delete: E("delete", { beforeExpr: T, prefix: V, startsExpr: m }), _do: E("do", { isLoop: je, beforeExpr: T }), _for: E("for", { isLoop: je }), _while: E("while", { isLoop: je }), _as: b("as", { startsExpr: m }), _assert: b("assert", { startsExpr: m }), _async: b("async", { startsExpr: m }), _await: b("await", { startsExpr: m }), _defer: b("defer", { startsExpr: m }), _from: b("from", { startsExpr: m }), _get: b("get", { startsExpr: m }), _let: b("let", { startsExpr: m }), _meta: b("meta", { startsExpr: m }), _of: b("of", { startsExpr: m }), _sent: b("sent", { startsExpr: m }), _set: b("set", { startsExpr: m }), _source: b("source", { startsExpr: m }), _static: b("static", { startsExpr: m }), _using: b("using", { startsExpr: m }), _yield: b("yield", { startsExpr: m }), _asserts: b("asserts", { startsExpr: m }), _checks: b("checks", { startsExpr: m }), _exports: b("exports", { startsExpr: m }), _global: b("global", { startsExpr: m }), _implements: b("implements", { startsExpr: m }), _intrinsic: b("intrinsic", { startsExpr: m }), _infer: b("infer", { startsExpr: m }), _is: b("is", { startsExpr: m }), _mixins: b("mixins", { startsExpr: m }), _proto: b("proto", { startsExpr: m }), _require: b("require", { startsExpr: m }), _satisfies: b("satisfies", { startsExpr: m }), _keyof: b("keyof", { startsExpr: m }), _readonly: b("readonly", { startsExpr: m }), _unique: b("unique", { startsExpr: m }), _abstract: b("abstract", { startsExpr: m }), _declare: b("declare", { startsExpr: m }), _enum: b("enum", { startsExpr: m }), _module: b("module", { startsExpr: m }), _namespace: b("namespace", { startsExpr: m }), _interface: b("interface", { startsExpr: m }), _type: b("type", { startsExpr: m }), _opaque: b("opaque", { startsExpr: m }), name: P("name", { startsExpr: m }), placeholder: P("%%", { startsExpr: m }), string: P("string", { startsExpr: m }), num: P("num", { startsExpr: m }), bigint: P("bigint", { startsExpr: m }), decimal: P("decimal", { startsExpr: m }), regexp: P("regexp", { startsExpr: m }), privateName: P("#name", { startsExpr: m }), eof: P("eof"), jsxName: P("jsxName"), jsxText: P("jsxText", { beforeExpr: T }), jsxTagStart: P("jsxTagStart", { startsExpr: m }), jsxTagEnd: P("jsxTagEnd") };
    function w(a) {
      return a >= 93 && a <= 133;
    }
    function Vi(a) {
      return a <= 92;
    }
    function M(a) {
      return a >= 58 && a <= 133;
    }
    function Es(a) {
      return a >= 58 && a <= 137;
    }
    function qi(a) {
      return dt[a];
    }
    function ue(a) {
      return mt[a];
    }
    function zi(a) {
      return a >= 29 && a <= 33;
    }
    function fs(a) {
      return a >= 129 && a <= 131;
    }
    function Hi(a) {
      return a >= 90 && a <= 92;
    }
    function xt(a) {
      return a >= 58 && a <= 92;
    }
    function Ki(a) {
      return a >= 39 && a <= 59;
    }
    function Wi(a) {
      return a === 34;
    }
    function Ji(a) {
      return yt[a];
    }
    function Xi(a) {
      return a >= 121 && a <= 123;
    }
    function Gi(a) {
      return a >= 124 && a <= 130;
    }
    function H(a) {
      return ut[a];
    }
    function Ee(a) {
      return ft[a];
    }
    function Yi(a) {
      return a === 57;
    }
    function Ie(a) {
      return a >= 24 && a <= 25;
    }
    function R(a) {
      return _[a];
    }
    _[8].updateContext = (a) => {
      a.pop();
    }, _[5].updateContext = _[7].updateContext = _[23].updateContext = (a) => {
      a.push(C.brace);
    }, _[22].updateContext = (a) => {
      a[a.length - 1] === C.template ? a.pop() : a.push(C.template);
    }, _[143].updateContext = (a) => {
      a.push(C.j_expr, C.j_oTag);
    };
    var Pt = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Cs = "·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", Qi = new RegExp("[" + Pt + "]"), Zi = new RegExp("[" + Pt + Cs + "]");
    Pt = Cs = null;
    var ws = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], er = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function He(a, t) {
      let e = 65536;
      for (let s = 0, i = t.length; s < i; s += 2) {
        if (e += t[s], e > a) return false;
        if (e += t[s + 1], e >= a) return true;
      }
      return false;
    }
    function U(a) {
      return a < 65 ? a === 36 : a <= 90 ? true : a < 97 ? a === 95 : a <= 122 ? true : a <= 65535 ? a >= 170 && Qi.test(String.fromCharCode(a)) : He(a, ws);
    }
    function Z(a) {
      return a < 48 ? a === 36 : a < 58 ? true : a < 65 ? false : a <= 90 ? true : a < 97 ? a === 95 : a <= 122 ? true : a <= 65535 ? a >= 170 && Zi.test(String.fromCharCode(a)) : He(a, ws) || He(a, er);
    }
    var gt = { keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"], strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"], strictBind: ["eval", "arguments"] }, tr = new Set(gt.keyword), sr = new Set(gt.strict), ir = new Set(gt.strictBind);
    function Is(a, t) {
      return t && a === "await" || a === "enum";
    }
    function Ns(a, t) {
      return Is(a, t) || sr.has(a);
    }
    function ks(a) {
      return ir.has(a);
    }
    function vs(a, t) {
      return Ns(a, t) || ks(a);
    }
    function rr(a) {
      return tr.has(a);
    }
    function ar(a, t, e) {
      return a === 64 && t === 64 && U(e);
    }
    var nr = /* @__PURE__ */ new Set(["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "eval", "arguments", "enum", "await"]);
    function or(a) {
      return nr.has(a);
    }
    var me = class {
      constructor(t) {
        this.flags = 0, this.names = /* @__PURE__ */ new Map(), this.firstLexicalName = "", this.flags = t;
      }
    }, ye = class {
      constructor(t, e) {
        this.parser = void 0, this.scopeStack = [], this.inModule = void 0, this.undefinedExports = /* @__PURE__ */ new Map(), this.parser = t, this.inModule = e;
      }
      get inTopLevel() {
        return (this.currentScope().flags & 1) > 0;
      }
      get inFunction() {
        return (this.currentVarScopeFlags() & 2) > 0;
      }
      get allowSuper() {
        return (this.currentThisScopeFlags() & 16) > 0;
      }
      get allowDirectSuper() {
        return (this.currentThisScopeFlags() & 32) > 0;
      }
      get allowNewTarget() {
        return (this.currentThisScopeFlags() & 512) > 0;
      }
      get inClass() {
        return (this.currentThisScopeFlags() & 64) > 0;
      }
      get inClassAndNotInNonArrowFunction() {
        let t = this.currentThisScopeFlags();
        return (t & 64) > 0 && (t & 2) === 0;
      }
      get inStaticBlock() {
        for (let t = this.scopeStack.length - 1; ; t--) {
          let { flags: e } = this.scopeStack[t];
          if (e & 128) return true;
          if (e & 1731) return false;
        }
      }
      get inNonArrowFunction() {
        return (this.currentThisScopeFlags() & 2) > 0;
      }
      get inBareCaseStatement() {
        return (this.currentScope().flags & 256) > 0;
      }
      get treatFunctionsAsVar() {
        return this.treatFunctionsAsVarInScope(this.currentScope());
      }
      createScope(t) {
        return new me(t);
      }
      enter(t) {
        this.scopeStack.push(this.createScope(t));
      }
      exit() {
        return this.scopeStack.pop().flags;
      }
      treatFunctionsAsVarInScope(t) {
        return !!(t.flags & 130 || !this.parser.inModule && t.flags & 1);
      }
      declareName(t, e, s) {
        let i = this.currentScope();
        if (e & 8 || e & 16) {
          this.checkRedeclarationInScope(i, t, e, s);
          let r = i.names.get(t) || 0;
          e & 16 ? r = r | 4 : (i.firstLexicalName || (i.firstLexicalName = t), r = r | 2), i.names.set(t, r), e & 8 && this.maybeExportDefined(i, t);
        } else if (e & 4) for (let r = this.scopeStack.length - 1; r >= 0 && (i = this.scopeStack[r], this.checkRedeclarationInScope(i, t, e, s), i.names.set(t, (i.names.get(t) || 0) | 1), this.maybeExportDefined(i, t), !(i.flags & 1667)); --r) ;
        this.parser.inModule && i.flags & 1 && this.undefinedExports.delete(t);
      }
      maybeExportDefined(t, e) {
        this.parser.inModule && t.flags & 1 && this.undefinedExports.delete(e);
      }
      checkRedeclarationInScope(t, e, s, i) {
        this.isRedeclaredInScope(t, e, s) && this.parser.raise(p.VarRedeclaration, i, { identifierName: e });
      }
      isRedeclaredInScope(t, e, s) {
        if (!(s & 1)) return false;
        if (s & 8) return t.names.has(e);
        let i = t.names.get(e);
        return s & 16 ? (i & 2) > 0 || !this.treatFunctionsAsVarInScope(t) && (i & 1) > 0 : (i & 2) > 0 && !(t.flags & 8 && t.firstLexicalName === e) || !this.treatFunctionsAsVarInScope(t) && (i & 4) > 0;
      }
      checkLocalExport(t) {
        let { name: e } = t;
        this.scopeStack[0].names.has(e) || this.undefinedExports.set(e, t.loc.start);
      }
      currentScope() {
        return this.scopeStack[this.scopeStack.length - 1];
      }
      currentVarScopeFlags() {
        for (let t = this.scopeStack.length - 1; ; t--) {
          let { flags: e } = this.scopeStack[t];
          if (e & 1667) return e;
        }
      }
      currentThisScopeFlags() {
        for (let t = this.scopeStack.length - 1; ; t--) {
          let { flags: e } = this.scopeStack[t];
          if (e & 1731 && !(e & 4)) return e;
        }
      }
    }, Ke = class extends me {
      constructor(...t) {
        super(...t), this.declareFunctions = /* @__PURE__ */ new Set();
      }
    }, We = class extends ye {
      createScope(t) {
        return new Ke(t);
      }
      declareName(t, e, s) {
        let i = this.currentScope();
        if (e & 2048) {
          this.checkRedeclarationInScope(i, t, e, s), this.maybeExportDefined(i, t), i.declareFunctions.add(t);
          return;
        }
        super.declareName(t, e, s);
      }
      isRedeclaredInScope(t, e, s) {
        if (super.isRedeclaredInScope(t, e, s)) return true;
        if (s & 2048 && !t.declareFunctions.has(e)) {
          let i = t.names.get(e);
          return (i & 4) > 0 || (i & 2) > 0;
        }
        return false;
      }
      checkLocalExport(t) {
        this.scopeStack[0].declareFunctions.has(t.name) || super.checkLocalExport(t);
      }
    }, lr = /* @__PURE__ */ new Set(["_", "any", "bool", "boolean", "empty", "extends", "false", "interface", "mixed", "null", "number", "static", "string", "true", "typeof", "void"]), g = F`flow`({ AmbiguousConditionalArrow: "Ambiguous expression: wrap the arrow functions in parentheses to disambiguate.", AmbiguousDeclareModuleKind: "Found both `declare module.exports` and `declare export` in the same module. Modules can only have 1 since they are either an ES module or they are a CommonJS module.", AssignReservedType: ({ reservedType: a }) => `Cannot overwrite reserved type ${a}.`, DeclareClassElement: "The `declare` modifier can only appear on class fields.", DeclareClassFieldInitializer: "Initializers are not allowed in fields with the `declare` modifier.", DuplicateDeclareModuleExports: "Duplicate `declare module.exports` statement.", EnumBooleanMemberNotInitialized: ({ memberName: a, enumName: t }) => `Boolean enum members need to be initialized. Use either \`${a} = true,\` or \`${a} = false,\` in enum \`${t}\`.`, EnumDuplicateMemberName: ({ memberName: a, enumName: t }) => `Enum member names need to be unique, but the name \`${a}\` has already been used before in enum \`${t}\`.`, EnumInconsistentMemberValues: ({ enumName: a }) => `Enum \`${a}\` has inconsistent member initializers. Either use no initializers, or consistently use literals (either booleans, numbers, or strings) for all member initializers.`, EnumInvalidExplicitType: ({ invalidEnumType: a, enumName: t }) => `Enum type \`${a}\` is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${t}\`.`, EnumInvalidExplicitTypeUnknownSupplied: ({ enumName: a }) => `Supplied enum type is not valid. Use one of \`boolean\`, \`number\`, \`string\`, or \`symbol\` in enum \`${a}\`.`, EnumInvalidMemberInitializerPrimaryType: ({ enumName: a, memberName: t, explicitType: e }) => `Enum \`${a}\` has type \`${e}\`, so the initializer of \`${t}\` needs to be a ${e} literal.`, EnumInvalidMemberInitializerSymbolType: ({ enumName: a, memberName: t }) => `Symbol enum members cannot be initialized. Use \`${t},\` in enum \`${a}\`.`, EnumInvalidMemberInitializerUnknownType: ({ enumName: a, memberName: t }) => `The enum member initializer for \`${t}\` needs to be a literal (either a boolean, number, or string) in enum \`${a}\`.`, EnumInvalidMemberName: ({ enumName: a, memberName: t, suggestion: e }) => `Enum member names cannot start with lowercase 'a' through 'z'. Instead of using \`${t}\`, consider using \`${e}\`, in enum \`${a}\`.`, EnumNumberMemberNotInitialized: ({ enumName: a, memberName: t }) => `Number enum members need to be initialized, e.g. \`${t} = 1\` in enum \`${a}\`.`, EnumStringMemberInconsistentlyInitialized: ({ enumName: a }) => `String enum members need to consistently either all use initializers, or use no initializers, in enum \`${a}\`.`, GetterMayNotHaveThisParam: "A getter cannot have a `this` parameter.", ImportReflectionHasImportType: "An `import module` declaration can not use `type` or `typeof` keyword.", ImportTypeShorthandOnlyInPureImport: "The `type` and `typeof` keywords on named imports can only be used on regular `import` statements. It cannot be used with `import type` or `import typeof` statements.", InexactInsideExact: "Explicit inexact syntax cannot appear inside an explicit exact object type.", InexactInsideNonObject: "Explicit inexact syntax cannot appear in class or interface definitions.", InexactVariance: "Explicit inexact syntax cannot have variance.", InvalidNonTypeImportInDeclareModule: "Imports within a `declare module` body must always be `import type` or `import typeof`.", MissingTypeParamDefault: "Type parameter declaration needs a default, since a preceding type parameter declaration has a default.", NestedDeclareModule: "`declare module` cannot be used inside another `declare module`.", NestedFlowComment: "Cannot have a flow comment inside another flow comment.", PatternIsOptional: Object.assign({ message: "A binding pattern parameter cannot be optional in an implementation signature." }, { reasonCode: "OptionalBindingPattern" }), SetterMayNotHaveThisParam: "A setter cannot have a `this` parameter.", SpreadVariance: "Spread properties cannot have variance.", ThisParamAnnotationRequired: "A type annotation is required for the `this` parameter.", ThisParamBannedInConstructor: "Constructors cannot have a `this` parameter; constructors don't bind `this` like other functions.", ThisParamMayNotBeOptional: "The `this` parameter cannot be optional.", ThisParamMustBeFirst: "The `this` parameter must be the first function parameter.", ThisParamNoDefault: "The `this` parameter may not have a default value.", TypeBeforeInitializer: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.", TypeCastInPattern: "The type cast expression is expected to be wrapped with parenthesis.", UnexpectedExplicitInexactInObject: "Explicit inexact syntax must appear at the end of an inexact object.", UnexpectedReservedType: ({ reservedType: a }) => `Unexpected reserved type ${a}.`, UnexpectedReservedUnderscore: "`_` is only allowed as a type argument to call or new.", UnexpectedSpaceBetweenModuloChecks: "Spaces between `%` and `checks` are not allowed here.", UnexpectedSpreadType: "Spread operator cannot appear in class or interface definitions.", UnexpectedSubtractionOperand: 'Unexpected token, expected "number" or "bigint".', UnexpectedTokenAfterTypeParameter: "Expected an arrow function after this type parameter declaration.", UnexpectedTypeParameterBeforeAsyncArrowFunction: "Type parameters must come after the async keyword, e.g. instead of `<T> async () => {}`, use `async <T>() => {}`.", UnsupportedDeclareExportKind: ({ unsupportedExportKind: a, suggestion: t }) => `\`declare export ${a}\` is not supported. Use \`${t}\` instead.`, UnsupportedStatementInDeclareModule: "Only declares and type imports are allowed inside declare module.", UnterminatedFlowComment: "Unterminated flow-comment." });
    function hr(a) {
      return a.type === "DeclareExportAllDeclaration" || a.type === "DeclareExportDeclaration" && (!a.declaration || a.declaration.type !== "TypeAlias" && a.declaration.type !== "InterfaceDeclaration");
    }
    function ds(a) {
      return a.importKind === "type" || a.importKind === "typeof";
    }
    var cr = { const: "declare export var", let: "declare export var", type: "export type", interface: "export interface" };
    function pr(a, t) {
      let e = [], s = [];
      for (let i = 0; i < a.length; i++) (t(a[i], i, a) ? e : s).push(a[i]);
      return [e, s];
    }
    var ur = /\*?\s*@((?:no)?flow)\b/, fr = (a) => class extends a {
      constructor(...e) {
        super(...e), this.flowPragma = void 0;
      }
      getScopeHandler() {
        return We;
      }
      shouldParseTypes() {
        return this.getPluginOption("flow", "all") || this.flowPragma === "flow";
      }
      finishToken(e, s) {
        e !== 134 && e !== 13 && e !== 28 && this.flowPragma === void 0 && (this.flowPragma = null), super.finishToken(e, s);
      }
      addComment(e) {
        if (this.flowPragma === void 0) {
          let s = ur.exec(e.value);
          if (s) if (s[1] === "flow") this.flowPragma = "flow";
          else if (s[1] === "noflow") this.flowPragma = "noflow";
          else throw new Error("Unexpected flow pragma");
        }
        super.addComment(e);
      }
      flowParseTypeInitialiser(e) {
        let s = this.state.inType;
        this.state.inType = true, this.expect(e || 14);
        let i = this.flowParseType();
        return this.state.inType = s, i;
      }
      flowParsePredicate() {
        let e = this.startNode(), s = this.state.startLoc;
        return this.next(), this.expectContextual(110), this.state.lastTokStartLoc.index > s.index + 1 && this.raise(g.UnexpectedSpaceBetweenModuloChecks, s), this.eat(10) ? (e.value = super.parseExpression(), this.expect(11), this.finishNode(e, "DeclaredPredicate")) : this.finishNode(e, "InferredPredicate");
      }
      flowParseTypeAndPredicateInitialiser() {
        let e = this.state.inType;
        this.state.inType = true, this.expect(14);
        let s = null, i = null;
        return this.match(54) ? (this.state.inType = e, i = this.flowParsePredicate()) : (s = this.flowParseType(), this.state.inType = e, this.match(54) && (i = this.flowParsePredicate())), [s, i];
      }
      flowParseDeclareClass(e) {
        return this.next(), this.flowParseInterfaceish(e, true), this.finishNode(e, "DeclareClass");
      }
      flowParseDeclareFunction(e) {
        this.next();
        let s = e.id = this.parseIdentifier(), i = this.startNode(), r = this.startNode();
        this.match(47) ? i.typeParameters = this.flowParseTypeParameterDeclaration() : i.typeParameters = null, this.expect(10);
        let n = this.flowParseFunctionTypeParams();
        return i.params = n.params, i.rest = n.rest, i.this = n._this, this.expect(11), [i.returnType, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), r.typeAnnotation = this.finishNode(i, "FunctionTypeAnnotation"), s.typeAnnotation = this.finishNode(r, "TypeAnnotation"), this.resetEndLocation(s), this.semicolon(), this.scope.declareName(e.id.name, 2048, e.id.loc.start), this.finishNode(e, "DeclareFunction");
      }
      flowParseDeclare(e, s) {
        if (this.match(80)) return this.flowParseDeclareClass(e);
        if (this.match(68)) return this.flowParseDeclareFunction(e);
        if (this.match(74)) return this.flowParseDeclareVariable(e);
        if (this.eatContextual(127)) return this.match(16) ? this.flowParseDeclareModuleExports(e) : (s && this.raise(g.NestedDeclareModule, this.state.lastTokStartLoc), this.flowParseDeclareModule(e));
        if (this.isContextual(130)) return this.flowParseDeclareTypeAlias(e);
        if (this.isContextual(131)) return this.flowParseDeclareOpaqueType(e);
        if (this.isContextual(129)) return this.flowParseDeclareInterface(e);
        if (this.match(82)) return this.flowParseDeclareExportDeclaration(e, s);
        this.unexpected();
      }
      flowParseDeclareVariable(e) {
        return this.next(), e.id = this.flowParseTypeAnnotatableIdentifier(true), this.scope.declareName(e.id.name, 5, e.id.loc.start), this.semicolon(), this.finishNode(e, "DeclareVariable");
      }
      flowParseDeclareModule(e) {
        this.scope.enter(0), this.match(134) ? e.id = super.parseExprAtom() : e.id = this.parseIdentifier();
        let s = e.body = this.startNode(), i = s.body = [];
        for (this.expect(5); !this.match(8); ) {
          let o = this.startNode();
          this.match(83) ? (this.next(), !this.isContextual(130) && !this.match(87) && this.raise(g.InvalidNonTypeImportInDeclareModule, this.state.lastTokStartLoc), super.parseImport(o)) : (this.expectContextual(125, g.UnsupportedStatementInDeclareModule), o = this.flowParseDeclare(o, true)), i.push(o);
        }
        this.scope.exit(), this.expect(8), this.finishNode(s, "BlockStatement");
        let r = null, n = false;
        return i.forEach((o) => {
          hr(o) ? (r === "CommonJS" && this.raise(g.AmbiguousDeclareModuleKind, o), r = "ES") : o.type === "DeclareModuleExports" && (n && this.raise(g.DuplicateDeclareModuleExports, o), r === "ES" && this.raise(g.AmbiguousDeclareModuleKind, o), r = "CommonJS", n = true);
        }), e.kind = r || "CommonJS", this.finishNode(e, "DeclareModule");
      }
      flowParseDeclareExportDeclaration(e, s) {
        if (this.expect(82), this.eat(65)) return this.match(68) || this.match(80) ? e.declaration = this.flowParseDeclare(this.startNode()) : (e.declaration = this.flowParseType(), this.semicolon()), e.default = true, this.finishNode(e, "DeclareExportDeclaration");
        if (this.match(75) || this.isLet() || (this.isContextual(130) || this.isContextual(129)) && !s) {
          let i = this.state.value;
          throw this.raise(g.UnsupportedDeclareExportKind, this.state.startLoc, { unsupportedExportKind: i, suggestion: cr[i] });
        }
        if (this.match(74) || this.match(68) || this.match(80) || this.isContextual(131)) return e.declaration = this.flowParseDeclare(this.startNode()), e.default = false, this.finishNode(e, "DeclareExportDeclaration");
        if (this.match(55) || this.match(5) || this.isContextual(129) || this.isContextual(130) || this.isContextual(131)) return e = this.parseExport(e, null), e.type === "ExportNamedDeclaration" ? (e.default = false, delete e.exportKind, this.castNodeTo(e, "DeclareExportDeclaration")) : this.castNodeTo(e, "DeclareExportAllDeclaration");
        this.unexpected();
      }
      flowParseDeclareModuleExports(e) {
        return this.next(), this.expectContextual(111), e.typeAnnotation = this.flowParseTypeAnnotation(), this.semicolon(), this.finishNode(e, "DeclareModuleExports");
      }
      flowParseDeclareTypeAlias(e) {
        this.next();
        let s = this.flowParseTypeAlias(e);
        return this.castNodeTo(s, "DeclareTypeAlias"), s;
      }
      flowParseDeclareOpaqueType(e) {
        this.next();
        let s = this.flowParseOpaqueType(e, true);
        return this.castNodeTo(s, "DeclareOpaqueType"), s;
      }
      flowParseDeclareInterface(e) {
        return this.next(), this.flowParseInterfaceish(e, false), this.finishNode(e, "DeclareInterface");
      }
      flowParseInterfaceish(e, s) {
        if (e.id = this.flowParseRestrictedIdentifier(!s, true), this.scope.declareName(e.id.name, s ? 17 : 8201, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.extends = [], this.eat(81)) do
          e.extends.push(this.flowParseInterfaceExtends());
        while (!s && this.eat(12));
        if (s) {
          if (e.implements = [], e.mixins = [], this.eatContextual(117)) do
            e.mixins.push(this.flowParseInterfaceExtends());
          while (this.eat(12));
          if (this.eatContextual(113)) do
            e.implements.push(this.flowParseInterfaceExtends());
          while (this.eat(12));
        }
        e.body = this.flowParseObjectType({ allowStatic: s, allowExact: false, allowSpread: false, allowProto: s, allowInexact: false });
      }
      flowParseInterfaceExtends() {
        let e = this.startNode();
        return e.id = this.flowParseQualifiedTypeIdentifier(), this.match(47) ? e.typeParameters = this.flowParseTypeParameterInstantiation() : e.typeParameters = null, this.finishNode(e, "InterfaceExtends");
      }
      flowParseInterface(e) {
        return this.flowParseInterfaceish(e, false), this.finishNode(e, "InterfaceDeclaration");
      }
      checkNotUnderscore(e) {
        e === "_" && this.raise(g.UnexpectedReservedUnderscore, this.state.startLoc);
      }
      checkReservedType(e, s, i) {
        lr.has(e) && this.raise(i ? g.AssignReservedType : g.UnexpectedReservedType, s, { reservedType: e });
      }
      flowParseRestrictedIdentifier(e, s) {
        return this.checkReservedType(this.state.value, this.state.startLoc, s), this.parseIdentifier(e);
      }
      flowParseTypeAlias(e) {
        return e.id = this.flowParseRestrictedIdentifier(false, true), this.scope.declareName(e.id.name, 8201, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.right = this.flowParseTypeInitialiser(29), this.semicolon(), this.finishNode(e, "TypeAlias");
      }
      flowParseOpaqueType(e, s) {
        return this.expectContextual(130), e.id = this.flowParseRestrictedIdentifier(true, true), this.scope.declareName(e.id.name, 8201, e.id.loc.start), this.match(47) ? e.typeParameters = this.flowParseTypeParameterDeclaration() : e.typeParameters = null, e.supertype = null, this.match(14) && (e.supertype = this.flowParseTypeInitialiser(14)), e.impltype = null, s || (e.impltype = this.flowParseTypeInitialiser(29)), this.semicolon(), this.finishNode(e, "OpaqueType");
      }
      flowParseTypeParameter(e = false) {
        let s = this.state.startLoc, i = this.startNode(), r = this.flowParseVariance(), n = this.flowParseTypeAnnotatableIdentifier();
        return i.name = n.name, i.variance = r, i.bound = n.typeAnnotation, this.match(29) ? (this.eat(29), i.default = this.flowParseType()) : e && this.raise(g.MissingTypeParamDefault, s), this.finishNode(i, "TypeParameter");
      }
      flowParseTypeParameterDeclaration() {
        let e = this.state.inType, s = this.startNode();
        s.params = [], this.state.inType = true, this.match(47) || this.match(143) ? this.next() : this.unexpected();
        let i = false;
        do {
          let r = this.flowParseTypeParameter(i);
          s.params.push(r), r.default && (i = true), this.match(48) || this.expect(12);
        } while (!this.match(48));
        return this.expect(48), this.state.inType = e, this.finishNode(s, "TypeParameterDeclaration");
      }
      flowInTopLevelContext(e) {
        if (this.curContext() !== C.brace) {
          let s = this.state.context;
          this.state.context = [s[0]];
          try {
            return e();
          } finally {
            this.state.context = s;
          }
        } else return e();
      }
      flowParseTypeParameterInstantiationInExpression() {
        if (this.reScan_lt() === 47) return this.flowParseTypeParameterInstantiation();
      }
      flowParseTypeParameterInstantiation() {
        let e = this.startNode(), s = this.state.inType;
        return this.state.inType = true, e.params = [], this.flowInTopLevelContext(() => {
          this.expect(47);
          let i = this.state.noAnonFunctionType;
          for (this.state.noAnonFunctionType = false; !this.match(48); ) e.params.push(this.flowParseType()), this.match(48) || this.expect(12);
          this.state.noAnonFunctionType = i;
        }), this.state.inType = s, !this.state.inType && this.curContext() === C.brace && this.reScan_lt_gt(), this.expect(48), this.finishNode(e, "TypeParameterInstantiation");
      }
      flowParseTypeParameterInstantiationCallOrNew() {
        if (this.reScan_lt() !== 47) return;
        let e = this.startNode(), s = this.state.inType;
        for (e.params = [], this.state.inType = true, this.expect(47); !this.match(48); ) e.params.push(this.flowParseTypeOrImplicitInstantiation()), this.match(48) || this.expect(12);
        return this.expect(48), this.state.inType = s, this.finishNode(e, "TypeParameterInstantiation");
      }
      flowParseInterfaceType() {
        let e = this.startNode();
        if (this.expectContextual(129), e.extends = [], this.eat(81)) do
          e.extends.push(this.flowParseInterfaceExtends());
        while (this.eat(12));
        return e.body = this.flowParseObjectType({ allowStatic: false, allowExact: false, allowSpread: false, allowProto: false, allowInexact: false }), this.finishNode(e, "InterfaceTypeAnnotation");
      }
      flowParseObjectPropertyKey() {
        return this.match(135) || this.match(134) ? super.parseExprAtom() : this.parseIdentifier(true);
      }
      flowParseObjectTypeIndexer(e, s, i) {
        return e.static = s, this.lookahead().type === 14 ? (e.id = this.flowParseObjectPropertyKey(), e.key = this.flowParseTypeInitialiser()) : (e.id = null, e.key = this.flowParseType()), this.expect(3), e.value = this.flowParseTypeInitialiser(), e.variance = i, this.finishNode(e, "ObjectTypeIndexer");
      }
      flowParseObjectTypeInternalSlot(e, s) {
        return e.static = s, e.id = this.flowParseObjectPropertyKey(), this.expect(3), this.expect(3), this.match(47) || this.match(10) ? (e.method = true, e.optional = false, e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.loc.start))) : (e.method = false, this.eat(17) && (e.optional = true), e.value = this.flowParseTypeInitialiser()), this.finishNode(e, "ObjectTypeInternalSlot");
      }
      flowParseObjectTypeMethodish(e) {
        for (e.params = [], e.rest = null, e.typeParameters = null, e.this = null, this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), this.expect(10), this.match(78) && (e.this = this.flowParseFunctionTypeParam(true), e.this.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) e.params.push(this.flowParseFunctionTypeParam(false)), this.match(11) || this.expect(12);
        return this.eat(21) && (e.rest = this.flowParseFunctionTypeParam(false)), this.expect(11), e.returnType = this.flowParseTypeInitialiser(), this.finishNode(e, "FunctionTypeAnnotation");
      }
      flowParseObjectTypeCallProperty(e, s) {
        let i = this.startNode();
        return e.static = s, e.value = this.flowParseObjectTypeMethodish(i), this.finishNode(e, "ObjectTypeCallProperty");
      }
      flowParseObjectType({ allowStatic: e, allowExact: s, allowSpread: i, allowProto: r, allowInexact: n }) {
        let o = this.state.inType;
        this.state.inType = true;
        let l = this.startNode();
        l.callProperties = [], l.properties = [], l.indexers = [], l.internalSlots = [];
        let h, c, u = false;
        for (s && this.match(6) ? (this.expect(6), h = 9, c = true) : (this.expect(5), h = 8, c = false), l.exact = c; !this.match(h); ) {
          let d = false, x = null, A = null, N = this.startNode();
          if (r && this.isContextual(118)) {
            let I = this.lookahead();
            I.type !== 14 && I.type !== 17 && (this.next(), x = this.state.startLoc, e = false);
          }
          if (e && this.isContextual(106)) {
            let I = this.lookahead();
            I.type !== 14 && I.type !== 17 && (this.next(), d = true);
          }
          let S = this.flowParseVariance();
          if (this.eat(0)) x != null && this.unexpected(x), this.eat(0) ? (S && this.unexpected(S.loc.start), l.internalSlots.push(this.flowParseObjectTypeInternalSlot(N, d))) : l.indexers.push(this.flowParseObjectTypeIndexer(N, d, S));
          else if (this.match(10) || this.match(47)) x != null && this.unexpected(x), S && this.unexpected(S.loc.start), l.callProperties.push(this.flowParseObjectTypeCallProperty(N, d));
          else {
            let I = "init";
            if (this.isContextual(99) || this.isContextual(104)) {
              let $ = this.lookahead();
              Es($.type) && (I = this.state.value, this.next());
            }
            let W = this.flowParseObjectTypeProperty(N, d, x, S, I, i, n ?? !c);
            W === null ? (u = true, A = this.state.lastTokStartLoc) : l.properties.push(W);
          }
          this.flowObjectTypeSemicolon(), A && !this.match(8) && !this.match(9) && this.raise(g.UnexpectedExplicitInexactInObject, A);
        }
        this.expect(h), i && (l.inexact = u);
        let f = this.finishNode(l, "ObjectTypeAnnotation");
        return this.state.inType = o, f;
      }
      flowParseObjectTypeProperty(e, s, i, r, n, o, l) {
        if (this.eat(21)) return this.match(12) || this.match(13) || this.match(8) || this.match(9) ? (o ? l || this.raise(g.InexactInsideExact, this.state.lastTokStartLoc) : this.raise(g.InexactInsideNonObject, this.state.lastTokStartLoc), r && this.raise(g.InexactVariance, r), null) : (o || this.raise(g.UnexpectedSpreadType, this.state.lastTokStartLoc), i != null && this.unexpected(i), r && this.raise(g.SpreadVariance, r), e.argument = this.flowParseType(), this.finishNode(e, "ObjectTypeSpreadProperty"));
        {
          e.key = this.flowParseObjectPropertyKey(), e.static = s, e.proto = i != null, e.kind = n;
          let h = false;
          return this.match(47) || this.match(10) ? (e.method = true, i != null && this.unexpected(i), r && this.unexpected(r.loc.start), e.value = this.flowParseObjectTypeMethodish(this.startNodeAt(e.loc.start)), (n === "get" || n === "set") && this.flowCheckGetterSetterParams(e), !o && e.key.name === "constructor" && e.value.this && this.raise(g.ThisParamBannedInConstructor, e.value.this)) : (n !== "init" && this.unexpected(), e.method = false, this.eat(17) && (h = true), e.value = this.flowParseTypeInitialiser(), e.variance = r), e.optional = h, this.finishNode(e, "ObjectTypeProperty");
        }
      }
      flowCheckGetterSetterParams(e) {
        let s = e.kind === "get" ? 0 : 1, i = e.value.params.length + (e.value.rest ? 1 : 0);
        e.value.this && this.raise(e.kind === "get" ? g.GetterMayNotHaveThisParam : g.SetterMayNotHaveThisParam, e.value.this), i !== s && this.raise(e.kind === "get" ? p.BadGetterArity : p.BadSetterArity, e), e.kind === "set" && e.value.rest && this.raise(p.BadSetterRestParameter, e);
      }
      flowObjectTypeSemicolon() {
        !this.eat(13) && !this.eat(12) && !this.match(8) && !this.match(9) && this.unexpected();
      }
      flowParseQualifiedTypeIdentifier(e, s) {
        e ?? (e = this.state.startLoc);
        let i = s || this.flowParseRestrictedIdentifier(true);
        for (; this.eat(16); ) {
          let r = this.startNodeAt(e);
          r.qualification = i, r.id = this.flowParseRestrictedIdentifier(true), i = this.finishNode(r, "QualifiedTypeIdentifier");
        }
        return i;
      }
      flowParseGenericType(e, s) {
        let i = this.startNodeAt(e);
        return i.typeParameters = null, i.id = this.flowParseQualifiedTypeIdentifier(e, s), this.match(47) && (i.typeParameters = this.flowParseTypeParameterInstantiation()), this.finishNode(i, "GenericTypeAnnotation");
      }
      flowParseTypeofType() {
        let e = this.startNode();
        return this.expect(87), e.argument = this.flowParsePrimaryType(), this.finishNode(e, "TypeofTypeAnnotation");
      }
      flowParseTupleType() {
        let e = this.startNode();
        for (e.types = [], this.expect(0); this.state.pos < this.length && !this.match(3) && (e.types.push(this.flowParseType()), !this.match(3)); ) this.expect(12);
        return this.expect(3), this.finishNode(e, "TupleTypeAnnotation");
      }
      flowParseFunctionTypeParam(e) {
        let s = null, i = false, r = null, n = this.startNode(), o = this.lookahead(), l = this.state.type === 78;
        return o.type === 14 || o.type === 17 ? (l && !e && this.raise(g.ThisParamMustBeFirst, n), s = this.parseIdentifier(l), this.eat(17) && (i = true, l && this.raise(g.ThisParamMayNotBeOptional, n)), r = this.flowParseTypeInitialiser()) : r = this.flowParseType(), n.name = s, n.optional = i, n.typeAnnotation = r, this.finishNode(n, "FunctionTypeParam");
      }
      reinterpretTypeAsFunctionTypeParam(e) {
        let s = this.startNodeAt(e.loc.start);
        return s.name = null, s.optional = false, s.typeAnnotation = e, this.finishNode(s, "FunctionTypeParam");
      }
      flowParseFunctionTypeParams(e = []) {
        let s = null, i = null;
        for (this.match(78) && (i = this.flowParseFunctionTypeParam(true), i.name = null, this.match(11) || this.expect(12)); !this.match(11) && !this.match(21); ) e.push(this.flowParseFunctionTypeParam(false)), this.match(11) || this.expect(12);
        return this.eat(21) && (s = this.flowParseFunctionTypeParam(false)), { params: e, rest: s, _this: i };
      }
      flowIdentToTypeAnnotation(e, s, i) {
        switch (i.name) {
          case "any":
            return this.finishNode(s, "AnyTypeAnnotation");
          case "bool":
          case "boolean":
            return this.finishNode(s, "BooleanTypeAnnotation");
          case "mixed":
            return this.finishNode(s, "MixedTypeAnnotation");
          case "empty":
            return this.finishNode(s, "EmptyTypeAnnotation");
          case "number":
            return this.finishNode(s, "NumberTypeAnnotation");
          case "string":
            return this.finishNode(s, "StringTypeAnnotation");
          case "symbol":
            return this.finishNode(s, "SymbolTypeAnnotation");
          default:
            return this.checkNotUnderscore(i.name), this.flowParseGenericType(e, i);
        }
      }
      flowParsePrimaryType() {
        let e = this.state.startLoc, s = this.startNode(), i, r, n = false, o = this.state.noAnonFunctionType;
        switch (this.state.type) {
          case 5:
            return this.flowParseObjectType({ allowStatic: false, allowExact: false, allowSpread: true, allowProto: false, allowInexact: true });
          case 6:
            return this.flowParseObjectType({ allowStatic: false, allowExact: true, allowSpread: true, allowProto: false, allowInexact: false });
          case 0:
            return this.state.noAnonFunctionType = false, r = this.flowParseTupleType(), this.state.noAnonFunctionType = o, r;
          case 47: {
            let l = this.startNode();
            return l.typeParameters = this.flowParseTypeParameterDeclaration(), this.expect(10), i = this.flowParseFunctionTypeParams(), l.params = i.params, l.rest = i.rest, l.this = i._this, this.expect(11), this.expect(19), l.returnType = this.flowParseType(), this.finishNode(l, "FunctionTypeAnnotation");
          }
          case 10: {
            let l = this.startNode();
            if (this.next(), !this.match(11) && !this.match(21)) if (w(this.state.type) || this.match(78)) {
              let h = this.lookahead().type;
              n = h !== 17 && h !== 14;
            } else n = true;
            if (n) {
              if (this.state.noAnonFunctionType = false, r = this.flowParseType(), this.state.noAnonFunctionType = o, this.state.noAnonFunctionType || !(this.match(12) || this.match(11) && this.lookahead().type === 19)) return this.expect(11), r;
              this.eat(12);
            }
            return r ? i = this.flowParseFunctionTypeParams([this.reinterpretTypeAsFunctionTypeParam(r)]) : i = this.flowParseFunctionTypeParams(), l.params = i.params, l.rest = i.rest, l.this = i._this, this.expect(11), this.expect(19), l.returnType = this.flowParseType(), l.typeParameters = null, this.finishNode(l, "FunctionTypeAnnotation");
          }
          case 134:
            return this.parseLiteral(this.state.value, "StringLiteralTypeAnnotation");
          case 85:
          case 86:
            return s.value = this.match(85), this.next(), this.finishNode(s, "BooleanLiteralTypeAnnotation");
          case 53:
            if (this.state.value === "-") {
              if (this.next(), this.match(135)) return this.parseLiteralAtNode(-this.state.value, "NumberLiteralTypeAnnotation", s);
              if (this.match(136)) return this.parseLiteralAtNode(-this.state.value, "BigIntLiteralTypeAnnotation", s);
              throw this.raise(g.UnexpectedSubtractionOperand, this.state.startLoc);
            }
            this.unexpected();
            return;
          case 135:
            return this.parseLiteral(this.state.value, "NumberLiteralTypeAnnotation");
          case 136:
            return this.parseLiteral(this.state.value, "BigIntLiteralTypeAnnotation");
          case 88:
            return this.next(), this.finishNode(s, "VoidTypeAnnotation");
          case 84:
            return this.next(), this.finishNode(s, "NullLiteralTypeAnnotation");
          case 78:
            return this.next(), this.finishNode(s, "ThisTypeAnnotation");
          case 55:
            return this.next(), this.finishNode(s, "ExistsTypeAnnotation");
          case 87:
            return this.flowParseTypeofType();
          default:
            if (xt(this.state.type)) {
              let l = H(this.state.type);
              return this.next(), super.createIdentifier(s, l);
            } else if (w(this.state.type)) return this.isContextual(129) ? this.flowParseInterfaceType() : this.flowIdentToTypeAnnotation(e, s, this.parseIdentifier());
        }
        this.unexpected();
      }
      flowParsePostfixType() {
        let e = this.state.startLoc, s = this.flowParsePrimaryType(), i = false;
        for (; (this.match(0) || this.match(18)) && !this.canInsertSemicolon(); ) {
          let r = this.startNodeAt(e), n = this.eat(18);
          i = i || n, this.expect(0), !n && this.match(3) ? (r.elementType = s, this.next(), s = this.finishNode(r, "ArrayTypeAnnotation")) : (r.objectType = s, r.indexType = this.flowParseType(), this.expect(3), i ? (r.optional = n, s = this.finishNode(r, "OptionalIndexedAccessType")) : s = this.finishNode(r, "IndexedAccessType"));
        }
        return s;
      }
      flowParsePrefixType() {
        let e = this.startNode();
        return this.eat(17) ? (e.typeAnnotation = this.flowParsePrefixType(), this.finishNode(e, "NullableTypeAnnotation")) : this.flowParsePostfixType();
      }
      flowParseAnonFunctionWithoutParens() {
        let e = this.flowParsePrefixType();
        if (!this.state.noAnonFunctionType && this.eat(19)) {
          let s = this.startNodeAt(e.loc.start);
          return s.params = [this.reinterpretTypeAsFunctionTypeParam(e)], s.rest = null, s.this = null, s.returnType = this.flowParseType(), s.typeParameters = null, this.finishNode(s, "FunctionTypeAnnotation");
        }
        return e;
      }
      flowParseIntersectionType() {
        let e = this.startNode();
        this.eat(45);
        let s = this.flowParseAnonFunctionWithoutParens();
        for (e.types = [s]; this.eat(45); ) e.types.push(this.flowParseAnonFunctionWithoutParens());
        return e.types.length === 1 ? s : this.finishNode(e, "IntersectionTypeAnnotation");
      }
      flowParseUnionType() {
        let e = this.startNode();
        this.eat(43);
        let s = this.flowParseIntersectionType();
        for (e.types = [s]; this.eat(43); ) e.types.push(this.flowParseIntersectionType());
        return e.types.length === 1 ? s : this.finishNode(e, "UnionTypeAnnotation");
      }
      flowParseType() {
        let e = this.state.inType;
        this.state.inType = true;
        let s = this.flowParseUnionType();
        return this.state.inType = e, s;
      }
      flowParseTypeOrImplicitInstantiation() {
        if (this.state.type === 132 && this.state.value === "_") {
          let e = this.state.startLoc, s = this.parseIdentifier();
          return this.flowParseGenericType(e, s);
        } else return this.flowParseType();
      }
      flowParseTypeAnnotation() {
        let e = this.startNode();
        return e.typeAnnotation = this.flowParseTypeInitialiser(), this.finishNode(e, "TypeAnnotation");
      }
      flowParseTypeAnnotatableIdentifier(e) {
        let s = e ? this.parseIdentifier() : this.flowParseRestrictedIdentifier();
        return this.match(14) && (s.typeAnnotation = this.flowParseTypeAnnotation(), this.resetEndLocation(s)), s;
      }
      typeCastToParameter(e) {
        return e.expression.typeAnnotation = e.typeAnnotation, this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
      }
      flowParseVariance() {
        let e = null;
        return this.match(53) ? (e = this.startNode(), this.state.value === "+" ? e.kind = "plus" : e.kind = "minus", this.next(), this.finishNode(e, "Variance")) : e;
      }
      parseFunctionBody(e, s, i = false) {
        if (s) {
          this.forwardNoArrowParamsConversionAt(e, () => super.parseFunctionBody(e, true, i));
          return;
        }
        super.parseFunctionBody(e, false, i);
      }
      parseFunctionBodyAndFinish(e, s, i = false) {
        if (this.match(14)) {
          let r = this.startNode();
          [r.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), e.returnType = r.typeAnnotation ? this.finishNode(r, "TypeAnnotation") : null;
        }
        return super.parseFunctionBodyAndFinish(e, s, i);
      }
      parseStatementLike(e) {
        if (this.state.strict && this.isContextual(129)) {
          let i = this.lookahead();
          if (M(i.type)) {
            let r = this.startNode();
            return this.next(), this.flowParseInterface(r);
          }
        } else if (this.isContextual(126)) {
          let i = this.startNode();
          return this.next(), this.flowParseEnumDeclaration(i);
        }
        let s = super.parseStatementLike(e);
        return this.flowPragma === void 0 && !this.isValidDirective(s) && (this.flowPragma = null), s;
      }
      parseExpressionStatement(e, s, i) {
        if (s.type === "Identifier") {
          if (s.name === "declare") {
            if (this.match(80) || w(this.state.type) || this.match(68) || this.match(74) || this.match(82)) return this.flowParseDeclare(e);
          } else if (w(this.state.type)) {
            if (s.name === "interface") return this.flowParseInterface(e);
            if (s.name === "type") return this.flowParseTypeAlias(e);
            if (s.name === "opaque") return this.flowParseOpaqueType(e, false);
          }
        }
        return super.parseExpressionStatement(e, s, i);
      }
      shouldParseExportDeclaration() {
        let { type: e } = this.state;
        return e === 126 || fs(e) ? !this.state.containsEsc : super.shouldParseExportDeclaration();
      }
      isExportDefaultSpecifier() {
        let { type: e } = this.state;
        return e === 126 || fs(e) ? this.state.containsEsc : super.isExportDefaultSpecifier();
      }
      parseExportDefaultExpression() {
        if (this.isContextual(126)) {
          let e = this.startNode();
          return this.next(), this.flowParseEnumDeclaration(e);
        }
        return super.parseExportDefaultExpression();
      }
      parseConditional(e, s, i) {
        if (!this.match(17)) return e;
        if (this.state.maybeInArrowParameters) {
          let f = this.lookaheadCharCode();
          if (f === 44 || f === 61 || f === 58 || f === 41) return this.setOptionalParametersError(i), e;
        }
        this.expect(17);
        let r = this.state.clone(), n = this.state.noArrowAt, o = this.startNodeAt(s), { consequent: l, failed: h } = this.tryParseConditionalConsequent(), [c, u] = this.getArrowLikeExpressions(l);
        if (h || u.length > 0) {
          let f = [...n];
          if (u.length > 0) {
            this.state = r, this.state.noArrowAt = f;
            for (let d = 0; d < u.length; d++) f.push(u[d].start);
            (({ consequent: l, failed: h } = this.tryParseConditionalConsequent())), [c, u] = this.getArrowLikeExpressions(l);
          }
          h && c.length > 1 && this.raise(g.AmbiguousConditionalArrow, r.startLoc), h && c.length === 1 && (this.state = r, f.push(c[0].start), this.state.noArrowAt = f, { consequent: l, failed: h } = this.tryParseConditionalConsequent());
        }
        return this.getArrowLikeExpressions(l, true), this.state.noArrowAt = n, this.expect(14), o.test = e, o.consequent = l, o.alternate = this.forwardNoArrowParamsConversionAt(o, () => this.parseMaybeAssign(void 0, void 0)), this.finishNode(o, "ConditionalExpression");
      }
      tryParseConditionalConsequent() {
        this.state.noArrowParamsConversionAt.push(this.state.start);
        let e = this.parseMaybeAssignAllowIn(), s = !this.match(14);
        return this.state.noArrowParamsConversionAt.pop(), { consequent: e, failed: s };
      }
      getArrowLikeExpressions(e, s) {
        let i = [e], r = [];
        for (; i.length !== 0; ) {
          let n = i.pop();
          n.type === "ArrowFunctionExpression" && n.body.type !== "BlockStatement" ? (n.typeParameters || !n.returnType ? this.finishArrowValidation(n) : r.push(n), i.push(n.body)) : n.type === "ConditionalExpression" && (i.push(n.consequent), i.push(n.alternate));
        }
        return s ? (r.forEach((n) => this.finishArrowValidation(n)), [r, []]) : pr(r, (n) => n.params.every((o) => this.isAssignable(o, true)));
      }
      finishArrowValidation(e) {
        var s;
        this.toAssignableList(e.params, (s = e.extra) == null ? void 0 : s.trailingCommaLoc, false), this.scope.enter(518), super.checkParams(e, false, true), this.scope.exit();
      }
      forwardNoArrowParamsConversionAt(e, s) {
        let i;
        return this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(e.start)) ? (this.state.noArrowParamsConversionAt.push(this.state.start), i = s(), this.state.noArrowParamsConversionAt.pop()) : i = s(), i;
      }
      parseParenItem(e, s) {
        let i = super.parseParenItem(e, s);
        if (this.eat(17) && (i.optional = true, this.resetEndLocation(e)), this.match(14)) {
          let r = this.startNodeAt(s);
          return r.expression = i, r.typeAnnotation = this.flowParseTypeAnnotation(), this.finishNode(r, "TypeCastExpression");
        }
        return i;
      }
      assertModuleNodeAllowed(e) {
        e.type === "ImportDeclaration" && (e.importKind === "type" || e.importKind === "typeof") || e.type === "ExportNamedDeclaration" && e.exportKind === "type" || e.type === "ExportAllDeclaration" && e.exportKind === "type" || super.assertModuleNodeAllowed(e);
      }
      parseExportDeclaration(e) {
        if (this.isContextual(130)) {
          e.exportKind = "type";
          let s = this.startNode();
          return this.next(), this.match(5) ? (e.specifiers = this.parseExportSpecifiers(true), super.parseExportFrom(e), null) : this.flowParseTypeAlias(s);
        } else if (this.isContextual(131)) {
          e.exportKind = "type";
          let s = this.startNode();
          return this.next(), this.flowParseOpaqueType(s, false);
        } else if (this.isContextual(129)) {
          e.exportKind = "type";
          let s = this.startNode();
          return this.next(), this.flowParseInterface(s);
        } else if (this.isContextual(126)) {
          e.exportKind = "value";
          let s = this.startNode();
          return this.next(), this.flowParseEnumDeclaration(s);
        } else return super.parseExportDeclaration(e);
      }
      eatExportStar(e) {
        return super.eatExportStar(e) ? true : this.isContextual(130) && this.lookahead().type === 55 ? (e.exportKind = "type", this.next(), this.next(), true) : false;
      }
      maybeParseExportNamespaceSpecifier(e) {
        let { startLoc: s } = this.state, i = super.maybeParseExportNamespaceSpecifier(e);
        return i && e.exportKind === "type" && this.unexpected(s), i;
      }
      parseClassId(e, s, i) {
        super.parseClassId(e, s, i), this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration());
      }
      parseClassMember(e, s, i) {
        let { startLoc: r } = this.state;
        if (this.isContextual(125)) {
          if (super.parseClassMemberFromModifier(e, s)) return;
          s.declare = true;
        }
        super.parseClassMember(e, s, i), s.declare && (s.type !== "ClassProperty" && s.type !== "ClassPrivateProperty" && s.type !== "PropertyDefinition" ? this.raise(g.DeclareClassElement, r) : s.value && this.raise(g.DeclareClassFieldInitializer, s.value));
      }
      isIterator(e) {
        return e === "iterator" || e === "asyncIterator";
      }
      readIterator() {
        let e = super.readWord1(), s = "@@" + e;
        (!this.isIterator(e) || !this.state.inType) && this.raise(p.InvalidIdentifier, this.state.curPosition(), { identifierName: s }), this.finishToken(132, s);
      }
      getTokenFromCode(e) {
        let s = this.input.charCodeAt(this.state.pos + 1);
        e === 123 && s === 124 ? this.finishOp(6, 2) : this.state.inType && (e === 62 || e === 60) ? this.finishOp(e === 62 ? 48 : 47, 1) : this.state.inType && e === 63 ? s === 46 ? this.finishOp(18, 2) : this.finishOp(17, 1) : ar(e, s, this.input.charCodeAt(this.state.pos + 2)) ? (this.state.pos += 2, this.readIterator()) : super.getTokenFromCode(e);
      }
      isAssignable(e, s) {
        return e.type === "TypeCastExpression" ? this.isAssignable(e.expression, s) : super.isAssignable(e, s);
      }
      toAssignable(e, s = false) {
        !s && e.type === "AssignmentExpression" && e.left.type === "TypeCastExpression" && (e.left = this.typeCastToParameter(e.left)), super.toAssignable(e, s);
      }
      toAssignableList(e, s, i) {
        for (let r = 0; r < e.length; r++) {
          let n = e[r];
          (n == null ? void 0 : n.type) === "TypeCastExpression" && (e[r] = this.typeCastToParameter(n));
        }
        super.toAssignableList(e, s, i);
      }
      toReferencedList(e, s) {
        for (let r = 0; r < e.length; r++) {
          var i;
          let n = e[r];
          n && n.type === "TypeCastExpression" && !((i = n.extra) != null && i.parenthesized) && (e.length > 1 || !s) && this.raise(g.TypeCastInPattern, n.typeAnnotation);
        }
        return e;
      }
      parseArrayLike(e, s, i, r) {
        let n = super.parseArrayLike(e, s, i, r);
        return s && !this.state.maybeInArrowParameters && this.toReferencedList(n.elements), n;
      }
      isValidLVal(e, s, i) {
        return e === "TypeCastExpression" || super.isValidLVal(e, s, i);
      }
      parseClassProperty(e) {
        return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassProperty(e);
      }
      parseClassPrivateProperty(e) {
        return this.match(14) && (e.typeAnnotation = this.flowParseTypeAnnotation()), super.parseClassPrivateProperty(e);
      }
      isClassMethod() {
        return this.match(47) || super.isClassMethod();
      }
      isClassProperty() {
        return this.match(14) || super.isClassProperty();
      }
      isNonstaticConstructor(e) {
        return !this.match(14) && super.isNonstaticConstructor(e);
      }
      pushClassMethod(e, s, i, r, n, o) {
        if (s.variance && this.unexpected(s.variance.loc.start), delete s.variance, this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassMethod(e, s, i, r, n, o), s.params && n) {
          let l = s.params;
          l.length > 0 && this.isThisParam(l[0]) && this.raise(g.ThisParamBannedInConstructor, s);
        } else if (s.type === "MethodDefinition" && n && s.value.params) {
          let l = s.value.params;
          l.length > 0 && this.isThisParam(l[0]) && this.raise(g.ThisParamBannedInConstructor, s);
        }
      }
      pushClassPrivateMethod(e, s, i, r) {
        s.variance && this.unexpected(s.variance.loc.start), delete s.variance, this.match(47) && (s.typeParameters = this.flowParseTypeParameterDeclaration()), super.pushClassPrivateMethod(e, s, i, r);
      }
      parseClassSuper(e) {
        if (super.parseClassSuper(e), e.superClass && (this.match(47) || this.match(51)) && (e.superTypeParameters = this.flowParseTypeParameterInstantiationInExpression()), this.isContextual(113)) {
          this.next();
          let s = e.implements = [];
          do {
            let i = this.startNode();
            i.id = this.flowParseRestrictedIdentifier(true), this.match(47) ? i.typeParameters = this.flowParseTypeParameterInstantiation() : i.typeParameters = null, s.push(this.finishNode(i, "ClassImplements"));
          } while (this.eat(12));
        }
      }
      checkGetterSetterParams(e) {
        super.checkGetterSetterParams(e);
        let s = this.getObjectOrClassMethodParams(e);
        if (s.length > 0) {
          let i = s[0];
          this.isThisParam(i) && e.kind === "get" ? this.raise(g.GetterMayNotHaveThisParam, i) : this.isThisParam(i) && this.raise(g.SetterMayNotHaveThisParam, i);
        }
      }
      parsePropertyNamePrefixOperator(e) {
        e.variance = this.flowParseVariance();
      }
      parseObjPropValue(e, s, i, r, n, o, l) {
        e.variance && this.unexpected(e.variance.loc.start), delete e.variance;
        let h;
        this.match(47) && !o && (h = this.flowParseTypeParameterDeclaration(), this.match(10) || this.unexpected());
        let c = super.parseObjPropValue(e, s, i, r, n, o, l);
        return h && ((c.value || c).typeParameters = h), c;
      }
      parseFunctionParamType(e) {
        return this.eat(17) && (e.type !== "Identifier" && this.raise(g.PatternIsOptional, e), this.isThisParam(e) && this.raise(g.ThisParamMayNotBeOptional, e), e.optional = true), this.match(14) ? e.typeAnnotation = this.flowParseTypeAnnotation() : this.isThisParam(e) && this.raise(g.ThisParamAnnotationRequired, e), this.match(29) && this.isThisParam(e) && this.raise(g.ThisParamNoDefault, e), this.resetEndLocation(e), e;
      }
      parseMaybeDefault(e, s) {
        let i = super.parseMaybeDefault(e, s);
        return i.type === "AssignmentPattern" && i.typeAnnotation && i.right.start < i.typeAnnotation.start && this.raise(g.TypeBeforeInitializer, i.typeAnnotation), i;
      }
      checkImportReflection(e) {
        super.checkImportReflection(e), e.module && e.importKind !== "value" && this.raise(g.ImportReflectionHasImportType, e.specifiers[0].loc.start);
      }
      parseImportSpecifierLocal(e, s, i) {
        s.local = ds(e) ? this.flowParseRestrictedIdentifier(true, true) : this.parseIdentifier(), e.specifiers.push(this.finishImportSpecifier(s, i));
      }
      isPotentialImportPhase(e) {
        if (super.isPotentialImportPhase(e)) return true;
        if (this.isContextual(130)) {
          if (!e) return true;
          let s = this.lookaheadCharCode();
          return s === 123 || s === 42;
        }
        return !e && this.isContextual(87);
      }
      applyImportPhase(e, s, i, r) {
        if (super.applyImportPhase(e, s, i, r), s) {
          if (!i && this.match(65)) return;
          e.exportKind = i === "type" ? i : "value";
        } else i === "type" && this.match(55) && this.unexpected(), e.importKind = i === "type" || i === "typeof" ? i : "value";
      }
      parseImportSpecifier(e, s, i, r, n) {
        let o = e.imported, l = null;
        o.type === "Identifier" && (o.name === "type" ? l = "type" : o.name === "typeof" && (l = "typeof"));
        let h = false;
        if (this.isContextual(93) && !this.isLookaheadContextual("as")) {
          let u = this.parseIdentifier(true);
          l !== null && !M(this.state.type) ? (e.imported = u, e.importKind = l, e.local = this.cloneIdentifier(u)) : (e.imported = o, e.importKind = null, e.local = this.parseIdentifier());
        } else {
          if (l !== null && M(this.state.type)) e.imported = this.parseIdentifier(true), e.importKind = l;
          else {
            if (s) throw this.raise(p.ImportBindingIsString, e, { importName: o.value });
            e.imported = o, e.importKind = null;
          }
          this.eatContextual(93) ? e.local = this.parseIdentifier() : (h = true, e.local = this.cloneIdentifier(e.imported));
        }
        let c = ds(e);
        return i && c && this.raise(g.ImportTypeShorthandOnlyInPureImport, e), (i || c) && this.checkReservedType(e.local.name, e.local.loc.start, true), h && !i && !c && this.checkReservedWord(e.local.name, e.loc.start, true, true), this.finishImportSpecifier(e, "ImportSpecifier");
      }
      parseBindingAtom() {
        switch (this.state.type) {
          case 78:
            return this.parseIdentifier(true);
          default:
            return super.parseBindingAtom();
        }
      }
      parseFunctionParams(e, s) {
        let i = e.kind;
        i !== "get" && i !== "set" && this.match(47) && (e.typeParameters = this.flowParseTypeParameterDeclaration()), super.parseFunctionParams(e, s);
      }
      parseVarId(e, s) {
        super.parseVarId(e, s), this.match(14) && (e.id.typeAnnotation = this.flowParseTypeAnnotation(), this.resetEndLocation(e.id));
      }
      parseAsyncArrowFromCallExpression(e, s) {
        if (this.match(14)) {
          let i = this.state.noAnonFunctionType;
          this.state.noAnonFunctionType = true, e.returnType = this.flowParseTypeAnnotation(), this.state.noAnonFunctionType = i;
        }
        return super.parseAsyncArrowFromCallExpression(e, s);
      }
      shouldParseAsyncArrow() {
        return this.match(14) || super.shouldParseAsyncArrow();
      }
      parseMaybeAssign(e, s) {
        var i;
        let r = null, n;
        if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
          if (r = this.state.clone(), n = this.tryParse(() => super.parseMaybeAssign(e, s), r), !n.error) return n.node;
          let { context: h } = this.state, c = h[h.length - 1];
          (c === C.j_oTag || c === C.j_expr) && h.pop();
        }
        if ((i = n) != null && i.error || this.match(47)) {
          var o, l;
          r = r || this.state.clone();
          let h, c = this.tryParse((f) => {
            var d;
            h = this.flowParseTypeParameterDeclaration();
            let x = this.forwardNoArrowParamsConversionAt(h, () => {
              let N = super.parseMaybeAssign(e, s);
              return this.resetStartLocationFromNode(N, h), N;
            });
            (d = x.extra) != null && d.parenthesized && f();
            let A = this.maybeUnwrapTypeCastExpression(x);
            return A.type !== "ArrowFunctionExpression" && f(), A.typeParameters = h, this.resetStartLocationFromNode(A, h), x;
          }, r), u = null;
          if (c.node && this.maybeUnwrapTypeCastExpression(c.node).type === "ArrowFunctionExpression") {
            if (!c.error && !c.aborted) return c.node.async && this.raise(g.UnexpectedTypeParameterBeforeAsyncArrowFunction, h), c.node;
            u = c.node;
          }
          if ((o = n) != null && o.node) return this.state = n.failState, n.node;
          if (u) return this.state = c.failState, u;
          throw (l = n) != null && l.thrown ? n.error : c.thrown ? c.error : this.raise(g.UnexpectedTokenAfterTypeParameter, h);
        }
        return super.parseMaybeAssign(e, s);
      }
      parseArrow(e) {
        if (this.match(14)) {
          let s = this.tryParse(() => {
            let i = this.state.noAnonFunctionType;
            this.state.noAnonFunctionType = true;
            let r = this.startNode();
            return [r.typeAnnotation, e.predicate] = this.flowParseTypeAndPredicateInitialiser(), this.state.noAnonFunctionType = i, this.canInsertSemicolon() && this.unexpected(), this.match(19) || this.unexpected(), r;
          });
          if (s.thrown) return null;
          s.error && (this.state = s.failState), e.returnType = s.node.typeAnnotation ? this.finishNode(s.node, "TypeAnnotation") : null;
        }
        return super.parseArrow(e);
      }
      shouldParseArrow(e) {
        return this.match(14) || super.shouldParseArrow(e);
      }
      setArrowFunctionParameters(e, s) {
        this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(e.start)) ? e.params = s : super.setArrowFunctionParameters(e, s);
      }
      checkParams(e, s, i, r = true) {
        if (!(i && this.state.noArrowParamsConversionAt.includes(this.offsetToSourcePos(e.start)))) {
          for (let n = 0; n < e.params.length; n++) this.isThisParam(e.params[n]) && n > 0 && this.raise(g.ThisParamMustBeFirst, e.params[n]);
          super.checkParams(e, s, i, r);
        }
      }
      parseParenAndDistinguishExpression(e) {
        return super.parseParenAndDistinguishExpression(e && !this.state.noArrowAt.includes(this.sourceToOffsetPos(this.state.start)));
      }
      parseSubscripts(e, s, i) {
        if (e.type === "Identifier" && e.name === "async" && this.state.noArrowAt.includes(s.index)) {
          this.next();
          let r = this.startNodeAt(s);
          r.callee = e, r.arguments = super.parseCallExpressionArguments(11), e = this.finishNode(r, "CallExpression");
        } else if (e.type === "Identifier" && e.name === "async" && this.match(47)) {
          let r = this.state.clone(), n = this.tryParse((l) => this.parseAsyncArrowWithTypeParameters(s) || l(), r);
          if (!n.error && !n.aborted) return n.node;
          let o = this.tryParse(() => super.parseSubscripts(e, s, i), r);
          if (o.node && !o.error) return o.node;
          if (n.node) return this.state = n.failState, n.node;
          if (o.node) return this.state = o.failState, o.node;
          throw n.error || o.error;
        }
        return super.parseSubscripts(e, s, i);
      }
      parseSubscript(e, s, i, r) {
        if (this.match(18) && this.isLookaheadToken_lt()) {
          if (r.optionalChainMember = true, i) return r.stop = true, e;
          this.next();
          let n = this.startNodeAt(s);
          return n.callee = e, n.typeArguments = this.flowParseTypeParameterInstantiationInExpression(), this.expect(10), n.arguments = this.parseCallExpressionArguments(11), n.optional = true, this.finishCallExpression(n, true);
        } else if (!i && this.shouldParseTypes() && (this.match(47) || this.match(51))) {
          let n = this.startNodeAt(s);
          n.callee = e;
          let o = this.tryParse(() => (n.typeArguments = this.flowParseTypeParameterInstantiationCallOrNew(), this.expect(10), n.arguments = super.parseCallExpressionArguments(11), r.optionalChainMember && (n.optional = false), this.finishCallExpression(n, r.optionalChainMember)));
          if (o.node) return o.error && (this.state = o.failState), o.node;
        }
        return super.parseSubscript(e, s, i, r);
      }
      parseNewCallee(e) {
        super.parseNewCallee(e);
        let s = null;
        this.shouldParseTypes() && this.match(47) && (s = this.tryParse(() => this.flowParseTypeParameterInstantiationCallOrNew()).node), e.typeArguments = s;
      }
      parseAsyncArrowWithTypeParameters(e) {
        let s = this.startNodeAt(e);
        if (this.parseFunctionParams(s, false), !!this.parseArrow(s)) return super.parseArrowExpression(s, void 0, true);
      }
      readToken_mult_modulo(e) {
        let s = this.input.charCodeAt(this.state.pos + 1);
        if (e === 42 && s === 47 && this.state.hasFlowComment) {
          this.state.hasFlowComment = false, this.state.pos += 2, this.nextToken();
          return;
        }
        super.readToken_mult_modulo(e);
      }
      readToken_pipe_amp(e) {
        let s = this.input.charCodeAt(this.state.pos + 1);
        if (e === 124 && s === 125) {
          this.finishOp(9, 2);
          return;
        }
        super.readToken_pipe_amp(e);
      }
      parseTopLevel(e, s) {
        let i = super.parseTopLevel(e, s);
        return this.state.hasFlowComment && this.raise(g.UnterminatedFlowComment, this.state.curPosition()), i;
      }
      skipBlockComment() {
        if (this.hasPlugin("flowComments") && this.skipFlowComment()) {
          if (this.state.hasFlowComment) throw this.raise(g.NestedFlowComment, this.state.startLoc);
          this.hasFlowCommentCompletion();
          let e = this.skipFlowComment();
          e && (this.state.pos += e, this.state.hasFlowComment = true);
          return;
        }
        return super.skipBlockComment(this.state.hasFlowComment ? "*-/" : "*/");
      }
      skipFlowComment() {
        let { pos: e } = this.state, s = 2;
        for (; [32, 9].includes(this.input.charCodeAt(e + s)); ) s++;
        let i = this.input.charCodeAt(s + e), r = this.input.charCodeAt(s + e + 1);
        return i === 58 && r === 58 ? s + 2 : this.input.slice(s + e, s + e + 12) === "flow-include" ? s + 12 : i === 58 && r !== 58 ? s : false;
      }
      hasFlowCommentCompletion() {
        if (this.input.indexOf("*/", this.state.pos) === -1) throw this.raise(p.UnterminatedComment, this.state.curPosition());
      }
      flowEnumErrorBooleanMemberNotInitialized(e, { enumName: s, memberName: i }) {
        this.raise(g.EnumBooleanMemberNotInitialized, e, { memberName: i, enumName: s });
      }
      flowEnumErrorInvalidMemberInitializer(e, s) {
        return this.raise(s.explicitType ? s.explicitType === "symbol" ? g.EnumInvalidMemberInitializerSymbolType : g.EnumInvalidMemberInitializerPrimaryType : g.EnumInvalidMemberInitializerUnknownType, e, s);
      }
      flowEnumErrorNumberMemberNotInitialized(e, s) {
        this.raise(g.EnumNumberMemberNotInitialized, e, s);
      }
      flowEnumErrorStringMemberInconsistentlyInitialized(e, s) {
        this.raise(g.EnumStringMemberInconsistentlyInitialized, e, s);
      }
      flowEnumMemberInit() {
        let e = this.state.startLoc, s = () => this.match(12) || this.match(8);
        switch (this.state.type) {
          case 135: {
            let i = this.parseNumericLiteral(this.state.value);
            return s() ? { type: "number", loc: i.loc.start, value: i } : { type: "invalid", loc: e };
          }
          case 134: {
            let i = this.parseStringLiteral(this.state.value);
            return s() ? { type: "string", loc: i.loc.start, value: i } : { type: "invalid", loc: e };
          }
          case 85:
          case 86: {
            let i = this.parseBooleanLiteral(this.match(85));
            return s() ? { type: "boolean", loc: i.loc.start, value: i } : { type: "invalid", loc: e };
          }
          default:
            return { type: "invalid", loc: e };
        }
      }
      flowEnumMemberRaw() {
        let e = this.state.startLoc, s = this.parseIdentifier(true), i = this.eat(29) ? this.flowEnumMemberInit() : { type: "none", loc: e };
        return { id: s, init: i };
      }
      flowEnumCheckExplicitTypeMismatch(e, s, i) {
        let { explicitType: r } = s;
        r !== null && r !== i && this.flowEnumErrorInvalidMemberInitializer(e, s);
      }
      flowEnumMembers({ enumName: e, explicitType: s }) {
        let i = /* @__PURE__ */ new Set(), r = { booleanMembers: [], numberMembers: [], stringMembers: [], defaultedMembers: [] }, n = false;
        for (; !this.match(8); ) {
          if (this.eat(21)) {
            n = true;
            break;
          }
          let o = this.startNode(), { id: l, init: h } = this.flowEnumMemberRaw(), c = l.name;
          if (c === "") continue;
          /^[a-z]/.test(c) && this.raise(g.EnumInvalidMemberName, l, { memberName: c, suggestion: c[0].toUpperCase() + c.slice(1), enumName: e }), i.has(c) && this.raise(g.EnumDuplicateMemberName, l, { memberName: c, enumName: e }), i.add(c);
          let u = { enumName: e, explicitType: s, memberName: c };
          switch (o.id = l, h.type) {
            case "boolean": {
              this.flowEnumCheckExplicitTypeMismatch(h.loc, u, "boolean"), o.init = h.value, r.booleanMembers.push(this.finishNode(o, "EnumBooleanMember"));
              break;
            }
            case "number": {
              this.flowEnumCheckExplicitTypeMismatch(h.loc, u, "number"), o.init = h.value, r.numberMembers.push(this.finishNode(o, "EnumNumberMember"));
              break;
            }
            case "string": {
              this.flowEnumCheckExplicitTypeMismatch(h.loc, u, "string"), o.init = h.value, r.stringMembers.push(this.finishNode(o, "EnumStringMember"));
              break;
            }
            case "invalid":
              throw this.flowEnumErrorInvalidMemberInitializer(h.loc, u);
            case "none":
              switch (s) {
                case "boolean":
                  this.flowEnumErrorBooleanMemberNotInitialized(h.loc, u);
                  break;
                case "number":
                  this.flowEnumErrorNumberMemberNotInitialized(h.loc, u);
                  break;
                default:
                  r.defaultedMembers.push(this.finishNode(o, "EnumDefaultedMember"));
              }
          }
          this.match(8) || this.expect(12);
        }
        return { members: r, hasUnknownMembers: n };
      }
      flowEnumStringMembers(e, s, { enumName: i }) {
        if (e.length === 0) return s;
        if (s.length === 0) return e;
        if (s.length > e.length) {
          for (let r of e) this.flowEnumErrorStringMemberInconsistentlyInitialized(r, { enumName: i });
          return s;
        } else {
          for (let r of s) this.flowEnumErrorStringMemberInconsistentlyInitialized(r, { enumName: i });
          return e;
        }
      }
      flowEnumParseExplicitType({ enumName: e }) {
        if (!this.eatContextual(102)) return null;
        if (!w(this.state.type)) throw this.raise(g.EnumInvalidExplicitTypeUnknownSupplied, this.state.startLoc, { enumName: e });
        let { value: s } = this.state;
        return this.next(), s !== "boolean" && s !== "number" && s !== "string" && s !== "symbol" && this.raise(g.EnumInvalidExplicitType, this.state.startLoc, { enumName: e, invalidEnumType: s }), s;
      }
      flowEnumBody(e, s) {
        let i = s.name, r = s.loc.start, n = this.flowEnumParseExplicitType({ enumName: i });
        this.expect(5);
        let { members: o, hasUnknownMembers: l } = this.flowEnumMembers({ enumName: i, explicitType: n });
        switch (e.hasUnknownMembers = l, n) {
          case "boolean":
            return e.explicitType = true, e.members = o.booleanMembers, this.expect(8), this.finishNode(e, "EnumBooleanBody");
          case "number":
            return e.explicitType = true, e.members = o.numberMembers, this.expect(8), this.finishNode(e, "EnumNumberBody");
          case "string":
            return e.explicitType = true, e.members = this.flowEnumStringMembers(o.stringMembers, o.defaultedMembers, { enumName: i }), this.expect(8), this.finishNode(e, "EnumStringBody");
          case "symbol":
            return e.members = o.defaultedMembers, this.expect(8), this.finishNode(e, "EnumSymbolBody");
          default: {
            let h = () => (e.members = [], this.expect(8), this.finishNode(e, "EnumStringBody"));
            e.explicitType = false;
            let c = o.booleanMembers.length, u = o.numberMembers.length, f = o.stringMembers.length, d = o.defaultedMembers.length;
            if (!c && !u && !f && !d) return h();
            if (!c && !u) return e.members = this.flowEnumStringMembers(o.stringMembers, o.defaultedMembers, { enumName: i }), this.expect(8), this.finishNode(e, "EnumStringBody");
            if (!u && !f && c >= d) {
              for (let x of o.defaultedMembers) this.flowEnumErrorBooleanMemberNotInitialized(x.loc.start, { enumName: i, memberName: x.id.name });
              return e.members = o.booleanMembers, this.expect(8), this.finishNode(e, "EnumBooleanBody");
            } else if (!c && !f && u >= d) {
              for (let x of o.defaultedMembers) this.flowEnumErrorNumberMemberNotInitialized(x.loc.start, { enumName: i, memberName: x.id.name });
              return e.members = o.numberMembers, this.expect(8), this.finishNode(e, "EnumNumberBody");
            } else return this.raise(g.EnumInconsistentMemberValues, r, { enumName: i }), h();
          }
        }
      }
      flowParseEnumDeclaration(e) {
        let s = this.parseIdentifier();
        return e.id = s, e.body = this.flowEnumBody(this.startNode(), s), this.finishNode(e, "EnumDeclaration");
      }
      jsxParseOpeningElementAfterName(e) {
        return this.shouldParseTypes() && (this.match(47) || this.match(51)) && (e.typeArguments = this.flowParseTypeParameterInstantiationInExpression()), super.jsxParseOpeningElementAfterName(e);
      }
      isLookaheadToken_lt() {
        let e = this.nextTokenStart();
        if (this.input.charCodeAt(e) === 60) {
          let s = this.input.charCodeAt(e + 1);
          return s !== 60 && s !== 61;
        }
        return false;
      }
      reScan_lt_gt() {
        let { type: e } = this.state;
        e === 47 ? (this.state.pos -= 1, this.readToken_lt()) : e === 48 && (this.state.pos -= 1, this.readToken_gt());
      }
      reScan_lt() {
        let { type: e } = this.state;
        return e === 51 ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : e;
      }
      maybeUnwrapTypeCastExpression(e) {
        return e.type === "TypeCastExpression" ? e.expression : e;
      }
    }, dr = /\r\n|[\r\n\u2028\u2029]/, be = new RegExp(dr.source, "g");
    function ee(a) {
      switch (a) {
        case 10:
        case 13:
        case 8232:
        case 8233:
          return true;
        default:
          return false;
      }
    }
    function ms(a, t, e) {
      for (let s = t; s < e; s++) if (ee(a.charCodeAt(s))) return true;
      return false;
    }
    var $e = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, Ve = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/g;
    function mr(a) {
      switch (a) {
        case 9:
        case 11:
        case 12:
        case 32:
        case 160:
        case 5760:
        case 8192:
        case 8193:
        case 8194:
        case 8195:
        case 8196:
        case 8197:
        case 8198:
        case 8199:
        case 8200:
        case 8201:
        case 8202:
        case 8239:
        case 8287:
        case 12288:
        case 65279:
          return true;
        default:
          return false;
      }
    }
    var J = F`jsx`({ AttributeIsEmpty: "JSX attributes must only be assigned a non-empty expression.", MissingClosingTagElement: ({ openingTagName: a }) => `Expected corresponding JSX closing tag for <${a}>.`, MissingClosingTagFragment: "Expected corresponding JSX closing tag for <>.", UnexpectedSequenceExpression: "Sequence expressions cannot be directly nested inside JSX. Did you mean to wrap it in parentheses (...)?", UnexpectedToken: ({ unexpected: a, HTMLEntity: t }) => `Unexpected token \`${a}\`. Did you mean \`${t}\` or \`{'${a}'}\`?`, UnsupportedJsxValue: "JSX value should be either an expression or a quoted JSX text.", UnterminatedJsxContent: "Unterminated JSX contents.", UnwrappedAdjacentJSXElements: "Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?" });
    function q(a) {
      return a ? a.type === "JSXOpeningFragment" || a.type === "JSXClosingFragment" : false;
    }
    function Q(a) {
      if (a.type === "JSXIdentifier") return a.name;
      if (a.type === "JSXNamespacedName") return a.namespace.name + ":" + a.name.name;
      if (a.type === "JSXMemberExpression") return Q(a.object) + "." + Q(a.property);
      throw new Error("Node had unexpected type: " + a.type);
    }
    var yr = (a) => class extends a {
      jsxReadToken() {
        let e = "", s = this.state.pos;
        for (; ; ) {
          if (this.state.pos >= this.length) throw this.raise(J.UnterminatedJsxContent, this.state.startLoc);
          let i = this.input.charCodeAt(this.state.pos);
          switch (i) {
            case 60:
            case 123:
              if (this.state.pos === this.state.start) {
                i === 60 && this.state.canStartJSXElement ? (++this.state.pos, this.finishToken(143)) : super.getTokenFromCode(i);
                return;
              }
              e += this.input.slice(s, this.state.pos), this.finishToken(142, e);
              return;
            case 38:
              e += this.input.slice(s, this.state.pos), e += this.jsxReadEntity(), s = this.state.pos;
              break;
            case 62:
            case 125:
            default:
              ee(i) ? (e += this.input.slice(s, this.state.pos), e += this.jsxReadNewLine(true), s = this.state.pos) : ++this.state.pos;
          }
        }
      }
      jsxReadNewLine(e) {
        let s = this.input.charCodeAt(this.state.pos), i;
        return ++this.state.pos, s === 13 && this.input.charCodeAt(this.state.pos) === 10 ? (++this.state.pos, i = e ? `
` : `\r
`) : i = String.fromCharCode(s), ++this.state.curLine, this.state.lineStart = this.state.pos, i;
      }
      jsxReadString(e) {
        let s = "", i = ++this.state.pos;
        for (; ; ) {
          if (this.state.pos >= this.length) throw this.raise(p.UnterminatedString, this.state.startLoc);
          let r = this.input.charCodeAt(this.state.pos);
          if (r === e) break;
          r === 38 ? (s += this.input.slice(i, this.state.pos), s += this.jsxReadEntity(), i = this.state.pos) : ee(r) ? (s += this.input.slice(i, this.state.pos), s += this.jsxReadNewLine(false), i = this.state.pos) : ++this.state.pos;
        }
        s += this.input.slice(i, this.state.pos++), this.finishToken(134, s);
      }
      jsxReadEntity() {
        let e = ++this.state.pos;
        if (this.codePointAtPos(this.state.pos) === 35) {
          ++this.state.pos;
          let s = 10;
          this.codePointAtPos(this.state.pos) === 120 && (s = 16, ++this.state.pos);
          let i = this.readInt(s, void 0, false, "bail");
          if (i !== null && this.codePointAtPos(this.state.pos) === 59) return ++this.state.pos, String.fromCodePoint(i);
        } else {
          let s = 0, i = false;
          for (; s++ < 10 && this.state.pos < this.length && !(i = this.codePointAtPos(this.state.pos) === 59); ) ++this.state.pos;
          if (i) {
            this.input.slice(e, this.state.pos);
            let n = void 0;
            if (++this.state.pos, n) ;
          }
        }
        return this.state.pos = e, "&";
      }
      jsxReadWord() {
        let e, s = this.state.pos;
        do
          e = this.input.charCodeAt(++this.state.pos);
        while (Z(e) || e === 45);
        this.finishToken(141, this.input.slice(s, this.state.pos));
      }
      jsxParseIdentifier() {
        let e = this.startNode();
        return this.match(141) ? e.name = this.state.value : xt(this.state.type) ? e.name = H(this.state.type) : this.unexpected(), this.next(), this.finishNode(e, "JSXIdentifier");
      }
      jsxParseNamespacedName() {
        let e = this.state.startLoc, s = this.jsxParseIdentifier();
        if (!this.eat(14)) return s;
        let i = this.startNodeAt(e);
        return i.namespace = s, i.name = this.jsxParseIdentifier(), this.finishNode(i, "JSXNamespacedName");
      }
      jsxParseElementName() {
        let e = this.state.startLoc, s = this.jsxParseNamespacedName();
        if (s.type === "JSXNamespacedName") return s;
        for (; this.eat(16); ) {
          let i = this.startNodeAt(e);
          i.object = s, i.property = this.jsxParseIdentifier(), s = this.finishNode(i, "JSXMemberExpression");
        }
        return s;
      }
      jsxParseAttributeValue() {
        let e;
        switch (this.state.type) {
          case 5:
            return e = this.startNode(), this.setContext(C.brace), this.next(), e = this.jsxParseExpressionContainer(e, C.j_oTag), e.expression.type === "JSXEmptyExpression" && this.raise(J.AttributeIsEmpty, e), e;
          case 143:
          case 134:
            return this.parseExprAtom();
          default:
            throw this.raise(J.UnsupportedJsxValue, this.state.startLoc);
        }
      }
      jsxParseEmptyExpression() {
        let e = this.startNodeAt(this.state.lastTokEndLoc);
        return this.finishNodeAt(e, "JSXEmptyExpression", this.state.startLoc);
      }
      jsxParseSpreadChild(e) {
        return this.next(), e.expression = this.parseExpression(), this.setContext(C.j_expr), this.state.canStartJSXElement = true, this.expect(8), this.finishNode(e, "JSXSpreadChild");
      }
      jsxParseExpressionContainer(e, s) {
        if (this.match(8)) e.expression = this.jsxParseEmptyExpression();
        else {
          let i = this.parseExpression();
          e.expression = i;
        }
        return this.setContext(s), this.state.canStartJSXElement = true, this.expect(8), this.finishNode(e, "JSXExpressionContainer");
      }
      jsxParseAttribute() {
        let e = this.startNode();
        return this.match(5) ? (this.setContext(C.brace), this.next(), this.expect(21), e.argument = this.parseMaybeAssignAllowIn(), this.setContext(C.j_oTag), this.state.canStartJSXElement = true, this.expect(8), this.finishNode(e, "JSXSpreadAttribute")) : (e.name = this.jsxParseNamespacedName(), e.value = this.eat(29) ? this.jsxParseAttributeValue() : null, this.finishNode(e, "JSXAttribute"));
      }
      jsxParseOpeningElementAt(e) {
        let s = this.startNodeAt(e);
        return this.eat(144) ? this.finishNode(s, "JSXOpeningFragment") : (s.name = this.jsxParseElementName(), this.jsxParseOpeningElementAfterName(s));
      }
      jsxParseOpeningElementAfterName(e) {
        let s = [];
        for (; !this.match(56) && !this.match(144); ) s.push(this.jsxParseAttribute());
        return e.attributes = s, e.selfClosing = this.eat(56), this.expect(144), this.finishNode(e, "JSXOpeningElement");
      }
      jsxParseClosingElementAt(e) {
        let s = this.startNodeAt(e);
        return this.eat(144) ? this.finishNode(s, "JSXClosingFragment") : (s.name = this.jsxParseElementName(), this.expect(144), this.finishNode(s, "JSXClosingElement"));
      }
      jsxParseElementAt(e) {
        let s = this.startNodeAt(e), i = [], r = this.jsxParseOpeningElementAt(e), n = null;
        if (!r.selfClosing) {
          e: for (; ; ) switch (this.state.type) {
            case 143:
              if (e = this.state.startLoc, this.next(), this.eat(56)) {
                n = this.jsxParseClosingElementAt(e);
                break e;
              }
              i.push(this.jsxParseElementAt(e));
              break;
            case 142:
              i.push(this.parseLiteral(this.state.value, "JSXText"));
              break;
            case 5: {
              let o = this.startNode();
              this.setContext(C.brace), this.next(), this.match(21) ? i.push(this.jsxParseSpreadChild(o)) : i.push(this.jsxParseExpressionContainer(o, C.j_expr));
              break;
            }
            default:
              this.unexpected();
          }
          q(r) && !q(n) && n !== null ? this.raise(J.MissingClosingTagFragment, n) : !q(r) && q(n) ? this.raise(J.MissingClosingTagElement, n, { openingTagName: Q(r.name) }) : !q(r) && !q(n) && Q(n.name) !== Q(r.name) && this.raise(J.MissingClosingTagElement, n, { openingTagName: Q(r.name) });
        }
        if (q(r) ? (s.openingFragment = r, s.closingFragment = n) : (s.openingElement = r, s.closingElement = n), s.children = i, this.match(47)) throw this.raise(J.UnwrappedAdjacentJSXElements, this.state.startLoc);
        return q(r) ? this.finishNode(s, "JSXFragment") : this.finishNode(s, "JSXElement");
      }
      jsxParseElement() {
        let e = this.state.startLoc;
        return this.next(), this.jsxParseElementAt(e);
      }
      setContext(e) {
        let { context: s } = this.state;
        s[s.length - 1] = e;
      }
      parseExprAtom(e) {
        return this.match(143) ? this.jsxParseElement() : this.match(47) && this.input.charCodeAt(this.state.pos) !== 33 ? (this.replaceToken(143), this.jsxParseElement()) : super.parseExprAtom(e);
      }
      skipSpace() {
        this.curContext().preserveSpace || super.skipSpace();
      }
      getTokenFromCode(e) {
        let s = this.curContext();
        if (s === C.j_expr) {
          this.jsxReadToken();
          return;
        }
        if (s === C.j_oTag || s === C.j_cTag) {
          if (U(e)) {
            this.jsxReadWord();
            return;
          }
          if (e === 62) {
            ++this.state.pos, this.finishToken(144);
            return;
          }
          if ((e === 34 || e === 39) && s === C.j_oTag) {
            this.jsxReadString(e);
            return;
          }
        }
        if (e === 60 && this.state.canStartJSXElement && this.input.charCodeAt(this.state.pos + 1) !== 33) {
          ++this.state.pos, this.finishToken(143);
          return;
        }
        super.getTokenFromCode(e);
      }
      updateContext(e) {
        let { context: s, type: i } = this.state;
        if (i === 56 && e === 143) s.splice(-2, 2, C.j_cTag), this.state.canStartJSXElement = false;
        else if (i === 143) s.push(C.j_oTag);
        else if (i === 144) {
          let r = s[s.length - 1];
          r === C.j_oTag && e === 56 || r === C.j_cTag ? (s.pop(), this.state.canStartJSXElement = s[s.length - 1] === C.j_expr) : (this.setContext(C.j_expr), this.state.canStartJSXElement = true);
        } else this.state.canStartJSXElement = qi(i);
      }
    }, Je = class extends me {
      constructor(...t) {
        super(...t), this.tsNames = /* @__PURE__ */ new Map();
      }
    }, Xe = class extends ye {
      constructor(...t) {
        super(...t), this.importsStack = [];
      }
      createScope(t) {
        return this.importsStack.push(/* @__PURE__ */ new Set()), new Je(t);
      }
      enter(t) {
        t === 1024 && this.importsStack.push(/* @__PURE__ */ new Set()), super.enter(t);
      }
      exit() {
        let t = super.exit();
        return t === 1024 && this.importsStack.pop(), t;
      }
      hasImport(t, e) {
        let s = this.importsStack.length;
        if (this.importsStack[s - 1].has(t)) return true;
        if (!e && s > 1) {
          for (let i = 0; i < s - 1; i++) if (this.importsStack[i].has(t)) return true;
        }
        return false;
      }
      declareName(t, e, s) {
        if (e & 4096) {
          this.hasImport(t, true) && this.parser.raise(p.VarRedeclaration, s, { identifierName: t }), this.importsStack[this.importsStack.length - 1].add(t);
          return;
        }
        let i = this.currentScope(), r = i.tsNames.get(t) || 0;
        if (e & 1024) {
          this.maybeExportDefined(i, t), i.tsNames.set(t, r | 16);
          return;
        }
        super.declareName(t, e, s), e & 2 && (e & 1 || (this.checkRedeclarationInScope(i, t, e, s), this.maybeExportDefined(i, t)), r = r | 1), e & 256 && (r = r | 2), e & 512 && (r = r | 4), e & 128 && (r = r | 8), r && i.tsNames.set(t, r);
      }
      isRedeclaredInScope(t, e, s) {
        let i = t.tsNames.get(e);
        if ((i & 2) > 0) {
          if (s & 256) {
            let r = !!(s & 512), n = (i & 4) > 0;
            return r !== n;
          }
          return true;
        }
        return s & 128 && (i & 8) > 0 ? t.names.get(e) & 2 ? !!(s & 1) : false : s & 2 && (i & 1) > 0 ? true : super.isRedeclaredInScope(t, e, s);
      }
      checkLocalExport(t) {
        let { name: e } = t;
        if (this.hasImport(e)) return;
        let s = this.scopeStack.length;
        for (let i = s - 1; i >= 0; i--) {
          let n = this.scopeStack[i].tsNames.get(e);
          if ((n & 1) > 0 || (n & 16) > 0) return;
        }
        super.checkLocalExport(t);
      }
    }, Ge = class {
      constructor() {
        this.stacks = [];
      }
      enter(t) {
        this.stacks.push(t);
      }
      exit() {
        this.stacks.pop();
      }
      currentFlags() {
        return this.stacks[this.stacks.length - 1];
      }
      get hasAwait() {
        return (this.currentFlags() & 2) > 0;
      }
      get hasYield() {
        return (this.currentFlags() & 1) > 0;
      }
      get hasReturn() {
        return (this.currentFlags() & 4) > 0;
      }
      get hasIn() {
        return (this.currentFlags() & 8) > 0;
      }
    };
    function Ce(a, t) {
      return (a ? 2 : 0) | (t ? 1 : 0);
    }
    var Ye = class {
      constructor() {
        this.sawUnambiguousESM = false, this.ambiguousScriptDifferentAst = false;
      }
      sourceToOffsetPos(t) {
        return t + this.startIndex;
      }
      offsetToSourcePos(t) {
        return t - this.startIndex;
      }
      hasPlugin(t) {
        if (typeof t == "string") return this.plugins.has(t);
        {
          let [e, s] = t;
          if (!this.hasPlugin(e)) return false;
          let i = this.plugins.get(e);
          for (let r of Object.keys(s)) if ((i == null ? void 0 : i[r]) !== s[r]) return false;
          return true;
        }
      }
      getPluginOption(t, e) {
        var s;
        return (s = this.plugins.get(t)) == null ? void 0 : s[e];
      }
    };
    function Ls(a, t) {
      a.trailingComments === void 0 ? a.trailingComments = t : a.trailingComments.unshift(...t);
    }
    function xr(a, t) {
      a.leadingComments === void 0 ? a.leadingComments = t : a.leadingComments.unshift(...t);
    }
    function xe(a, t) {
      a.innerComments === void 0 ? a.innerComments = t : a.innerComments.unshift(...t);
    }
    function z(a, t, e) {
      let s = null, i = t.length;
      for (; s === null && i > 0; ) s = t[--i];
      s === null || s.start > e.start ? xe(a, e.comments) : Ls(s, e.comments);
    }
    var Qe = class extends Ye {
      addComment(t) {
        this.filename && (t.loc.filename = this.filename);
        let { commentsLen: e } = this.state;
        this.comments.length !== e && (this.comments.length = e), this.comments.push(t), this.state.commentsLen++;
      }
      processComment(t) {
        let { commentStack: e } = this.state, s = e.length;
        if (s === 0) return;
        let i = s - 1, r = e[i];
        r.start === t.end && (r.leadingNode = t, i--);
        let { start: n } = t;
        for (; i >= 0; i--) {
          let o = e[i], l = o.end;
          if (l > n) o.containingNode = t, this.finalizeComment(o), e.splice(i, 1);
          else {
            l === n && (o.trailingNode = t);
            break;
          }
        }
      }
      finalizeComment(t) {
        var e;
        let { comments: s } = t;
        if (t.leadingNode !== null || t.trailingNode !== null) t.leadingNode !== null && Ls(t.leadingNode, s), t.trailingNode !== null && xr(t.trailingNode, s);
        else {
          let { containingNode: i, start: r } = t;
          if (this.input.charCodeAt(this.offsetToSourcePos(r) - 1) === 44) switch (i.type) {
            case "ObjectExpression":
            case "ObjectPattern":
            case "RecordExpression":
              z(i, i.properties, t);
              break;
            case "CallExpression":
            case "OptionalCallExpression":
              z(i, i.arguments, t);
              break;
            case "ImportExpression":
              z(i, [i.source, (e = i.options) != null ? e : null], t);
              break;
            case "FunctionDeclaration":
            case "FunctionExpression":
            case "ArrowFunctionExpression":
            case "ObjectMethod":
            case "ClassMethod":
            case "ClassPrivateMethod":
              z(i, i.params, t);
              break;
            case "ArrayExpression":
            case "ArrayPattern":
            case "TupleExpression":
              z(i, i.elements, t);
              break;
            case "ExportNamedDeclaration":
            case "ImportDeclaration":
              z(i, i.specifiers, t);
              break;
            case "TSEnumDeclaration":
              z(i, i.members, t);
              break;
            case "TSEnumBody":
              z(i, i.members, t);
              break;
            default:
              xe(i, s);
          }
          else xe(i, s);
        }
      }
      finalizeRemainingComments() {
        let { commentStack: t } = this.state;
        for (let e = t.length - 1; e >= 0; e--) this.finalizeComment(t[e]);
        this.state.commentStack = [];
      }
      resetPreviousNodeTrailingComments(t) {
        let { commentStack: e } = this.state, { length: s } = e;
        if (s === 0) return;
        let i = e[s - 1];
        i.leadingNode === t && (i.leadingNode = null);
      }
      takeSurroundingComments(t, e, s) {
        let { commentStack: i } = this.state, r = i.length;
        if (r === 0) return;
        let n = r - 1;
        for (; n >= 0; n--) {
          let o = i[n], l = o.end;
          if (o.start === s) o.leadingNode = t;
          else if (l === e) o.trailingNode = t;
          else if (l < e) break;
        }
      }
    }, Ze = class a {
      constructor() {
        this.flags = 1024, this.startIndex = void 0, this.curLine = void 0, this.lineStart = void 0, this.startLoc = void 0, this.endLoc = void 0, this.errors = [], this.potentialArrowAt = -1, this.noArrowAt = [], this.noArrowParamsConversionAt = [], this.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null }, this.labels = [], this.commentsLen = 0, this.commentStack = [], this.pos = 0, this.type = 140, this.value = null, this.start = 0, this.end = 0, this.lastTokEndLoc = null, this.lastTokStartLoc = null, this.context = [C.brace], this.firstInvalidTemplateEscapePos = null, this.strictErrors = /* @__PURE__ */ new Map(), this.tokensLength = 0;
      }
      get strict() {
        return (this.flags & 1) > 0;
      }
      set strict(t) {
        t ? this.flags |= 1 : this.flags &= -2;
      }
      init({ strictMode: t, sourceType: e, startIndex: s, startLine: i, startColumn: r }) {
        this.strict = t === false ? false : t === true ? true : e === "module", this.startIndex = s, this.curLine = i, this.lineStart = -r, this.startLoc = this.endLoc = new B(i, r, s);
      }
      get maybeInArrowParameters() {
        return (this.flags & 2) > 0;
      }
      set maybeInArrowParameters(t) {
        t ? this.flags |= 2 : this.flags &= -3;
      }
      get inType() {
        return (this.flags & 4) > 0;
      }
      set inType(t) {
        t ? this.flags |= 4 : this.flags &= -5;
      }
      get noAnonFunctionType() {
        return (this.flags & 8) > 0;
      }
      set noAnonFunctionType(t) {
        t ? this.flags |= 8 : this.flags &= -9;
      }
      get hasFlowComment() {
        return (this.flags & 16) > 0;
      }
      set hasFlowComment(t) {
        t ? this.flags |= 16 : this.flags &= -17;
      }
      get isAmbientContext() {
        return (this.flags & 32) > 0;
      }
      set isAmbientContext(t) {
        t ? this.flags |= 32 : this.flags &= -33;
      }
      get inAbstractClass() {
        return (this.flags & 64) > 0;
      }
      set inAbstractClass(t) {
        t ? this.flags |= 64 : this.flags &= -65;
      }
      get inDisallowConditionalTypesContext() {
        return (this.flags & 128) > 0;
      }
      set inDisallowConditionalTypesContext(t) {
        t ? this.flags |= 128 : this.flags &= -129;
      }
      get soloAwait() {
        return (this.flags & 256) > 0;
      }
      set soloAwait(t) {
        t ? this.flags |= 256 : this.flags &= -257;
      }
      get inFSharpPipelineDirectBody() {
        return (this.flags & 512) > 0;
      }
      set inFSharpPipelineDirectBody(t) {
        t ? this.flags |= 512 : this.flags &= -513;
      }
      get canStartJSXElement() {
        return (this.flags & 1024) > 0;
      }
      set canStartJSXElement(t) {
        t ? this.flags |= 1024 : this.flags &= -1025;
      }
      get containsEsc() {
        return (this.flags & 2048) > 0;
      }
      set containsEsc(t) {
        t ? this.flags |= 2048 : this.flags &= -2049;
      }
      get hasTopLevelAwait() {
        return (this.flags & 4096) > 0;
      }
      set hasTopLevelAwait(t) {
        t ? this.flags |= 4096 : this.flags &= -4097;
      }
      curPosition() {
        return new B(this.curLine, this.pos - this.lineStart, this.pos + this.startIndex);
      }
      clone() {
        let t = new a();
        return t.flags = this.flags, t.startIndex = this.startIndex, t.curLine = this.curLine, t.lineStart = this.lineStart, t.startLoc = this.startLoc, t.endLoc = this.endLoc, t.errors = this.errors.slice(), t.potentialArrowAt = this.potentialArrowAt, t.noArrowAt = this.noArrowAt.slice(), t.noArrowParamsConversionAt = this.noArrowParamsConversionAt.slice(), t.topicContext = this.topicContext, t.labels = this.labels.slice(), t.commentsLen = this.commentsLen, t.commentStack = this.commentStack.slice(), t.pos = this.pos, t.type = this.type, t.value = this.value, t.start = this.start, t.end = this.end, t.lastTokEndLoc = this.lastTokEndLoc, t.lastTokStartLoc = this.lastTokStartLoc, t.context = this.context.slice(), t.firstInvalidTemplateEscapePos = this.firstInvalidTemplateEscapePos, t.strictErrors = this.strictErrors, t.tokensLength = this.tokensLength, t;
      }
    }, Pr = function(t) {
      return t >= 48 && t <= 57;
    }, ys = { decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]), hex: /* @__PURE__ */ new Set([46, 88, 95, 120]) }, Ae = { bin: (a) => a === 48 || a === 49, oct: (a) => a >= 48 && a <= 55, dec: (a) => a >= 48 && a <= 57, hex: (a) => a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102 };
    function xs(a, t, e, s, i, r) {
      let n = e, o = s, l = i, h = "", c = null, u = e, { length: f } = t;
      for (; ; ) {
        if (e >= f) {
          r.unterminated(n, o, l), h += t.slice(u, e);
          break;
        }
        let d = t.charCodeAt(e);
        if (gr(a, d, t, e)) {
          h += t.slice(u, e);
          break;
        }
        if (d === 92) {
          h += t.slice(u, e);
          let x = Tr(t, e, s, i, a === "template", r);
          x.ch === null && !c ? c = { pos: e, lineStart: s, curLine: i } : h += x.ch, { pos: e, lineStart: s, curLine: i } = x, u = e;
        } else d === 8232 || d === 8233 ? (++e, ++i, s = e) : d === 10 || d === 13 ? a === "template" ? (h += t.slice(u, e) + `
`, ++e, d === 13 && t.charCodeAt(e) === 10 && ++e, ++i, u = s = e) : r.unterminated(n, o, l) : ++e;
      }
      return { pos: e, str: h, firstInvalidLoc: c, lineStart: s, curLine: i, containsInvalid: !!c };
    }
    function gr(a, t, e, s) {
      return a === "template" ? t === 96 || t === 36 && e.charCodeAt(s + 1) === 123 : t === (a === "double" ? 34 : 39);
    }
    function Tr(a, t, e, s, i, r) {
      let n = !i;
      t++;
      let o = (h) => ({ pos: t, ch: h, lineStart: e, curLine: s }), l = a.charCodeAt(t++);
      switch (l) {
        case 110:
          return o(`
`);
        case 114:
          return o("\r");
        case 120: {
          let h;
          return { code: h, pos: t } = et(a, t, e, s, 2, false, n, r), o(h === null ? null : String.fromCharCode(h));
        }
        case 117: {
          let h;
          return { code: h, pos: t } = Ms(a, t, e, s, n, r), o(h === null ? null : String.fromCodePoint(h));
        }
        case 116:
          return o("	");
        case 98:
          return o("\b");
        case 118:
          return o("\v");
        case 102:
          return o("\f");
        case 13:
          a.charCodeAt(t) === 10 && ++t;
        case 10:
          e = t, ++s;
        case 8232:
        case 8233:
          return o("");
        case 56:
        case 57:
          if (i) return o(null);
          r.strictNumericEscape(t - 1, e, s);
        default:
          if (l >= 48 && l <= 55) {
            let h = t - 1, u = /^[0-7]+/.exec(a.slice(h, t + 2))[0], f = parseInt(u, 8);
            f > 255 && (u = u.slice(0, -1), f = parseInt(u, 8)), t += u.length - 1;
            let d = a.charCodeAt(t);
            if (u !== "0" || d === 56 || d === 57) {
              if (i) return o(null);
              r.strictNumericEscape(h, e, s);
            }
            return o(String.fromCharCode(f));
          }
          return o(String.fromCharCode(l));
      }
    }
    function et(a, t, e, s, i, r, n, o) {
      let l = t, h;
      return { n: h, pos: t } = Ds(a, t, e, s, 16, i, r, false, o, !n), h === null && (n ? o.invalidEscapeSequence(l, e, s) : t = l - 1), { code: h, pos: t };
    }
    function Ds(a, t, e, s, i, r, n, o, l, h) {
      let c = t, u = i === 16 ? ys.hex : ys.decBinOct, f = i === 16 ? Ae.hex : i === 10 ? Ae.dec : i === 8 ? Ae.oct : Ae.bin, d = false, x = 0;
      for (let A = 0, N = r ?? 1 / 0; A < N; ++A) {
        let S = a.charCodeAt(t), I;
        if (S === 95 && o !== "bail") {
          let W = a.charCodeAt(t - 1), $ = a.charCodeAt(t + 1);
          if (o) {
            if (Number.isNaN($) || !f($) || u.has(W) || u.has($)) {
              if (h) return { n: null, pos: t };
              l.unexpectedNumericSeparator(t, e, s);
            }
          } else {
            if (h) return { n: null, pos: t };
            l.numericSeparatorInEscapeSequence(t, e, s);
          }
          ++t;
          continue;
        }
        if (S >= 97 ? I = S - 97 + 10 : S >= 65 ? I = S - 65 + 10 : Pr(S) ? I = S - 48 : I = 1 / 0, I >= i) {
          if (I <= 9 && h) return { n: null, pos: t };
          if (I <= 9 && l.invalidDigit(t, e, s, i)) I = 0;
          else if (n) I = 0, d = true;
          else break;
        }
        ++t, x = x * i + I;
      }
      return t === c || r != null && t - c !== r || d ? { n: null, pos: t } : { n: x, pos: t };
    }
    function Ms(a, t, e, s, i, r) {
      let n = a.charCodeAt(t), o;
      if (n === 123) {
        if (++t, { code: o, pos: t } = et(a, t, e, s, a.indexOf("}", t) - t, true, i, r), ++t, o !== null && o > 1114111) if (i) r.invalidCodePoint(t, e, s);
        else return { code: null, pos: t };
      } else ({ code: o, pos: t } = et(a, t, e, s, 4, false, i, r));
      return { code: o, pos: t };
    }
    function pe(a, t, e) {
      return new B(e, a - t, a);
    }
    var br = /* @__PURE__ */ new Set([103, 109, 115, 105, 121, 117, 100, 118]), O = class {
      constructor(t) {
        let e = t.startIndex || 0;
        this.type = t.type, this.value = t.value, this.start = e + t.start, this.end = e + t.end, this.loc = new se(t.startLoc, t.endLoc);
      }
    }, tt = class extends Qe {
      constructor(t, e) {
        super(), this.isLookahead = void 0, this.tokens = [], this.errorHandlers_readInt = { invalidDigit: (s, i, r, n) => this.optionFlags & 2048 ? (this.raise(p.InvalidDigit, pe(s, i, r), { radix: n }), true) : false, numericSeparatorInEscapeSequence: this.errorBuilder(p.NumericSeparatorInEscapeSequence), unexpectedNumericSeparator: this.errorBuilder(p.UnexpectedNumericSeparator) }, this.errorHandlers_readCodePoint = Object.assign({}, this.errorHandlers_readInt, { invalidEscapeSequence: this.errorBuilder(p.InvalidEscapeSequence), invalidCodePoint: this.errorBuilder(p.InvalidCodePoint) }), this.errorHandlers_readStringContents_string = Object.assign({}, this.errorHandlers_readCodePoint, { strictNumericEscape: (s, i, r) => {
          this.recordStrictModeErrors(p.StrictNumericEscape, pe(s, i, r));
        }, unterminated: (s, i, r) => {
          throw this.raise(p.UnterminatedString, pe(s - 1, i, r));
        } }), this.errorHandlers_readStringContents_template = Object.assign({}, this.errorHandlers_readCodePoint, { strictNumericEscape: this.errorBuilder(p.StrictNumericEscape), unterminated: (s, i, r) => {
          throw this.raise(p.UnterminatedTemplate, pe(s, i, r));
        } }), this.state = new Ze(), this.state.init(t), this.input = e, this.length = e.length, this.comments = [], this.isLookahead = false;
      }
      pushToken(t) {
        this.tokens.length = this.state.tokensLength, this.tokens.push(t), ++this.state.tokensLength;
      }
      next() {
        this.checkKeywordEscapes(), this.optionFlags & 256 && this.pushToken(new O(this.state)), this.state.lastTokEndLoc = this.state.endLoc, this.state.lastTokStartLoc = this.state.startLoc, this.nextToken();
      }
      eat(t) {
        return this.match(t) ? (this.next(), true) : false;
      }
      match(t) {
        return this.state.type === t;
      }
      createLookaheadState(t) {
        return { pos: t.pos, value: null, type: t.type, start: t.start, end: t.end, context: [this.curContext()], inType: t.inType, startLoc: t.startLoc, lastTokEndLoc: t.lastTokEndLoc, curLine: t.curLine, lineStart: t.lineStart, curPosition: t.curPosition };
      }
      lookahead() {
        let t = this.state;
        this.state = this.createLookaheadState(t), this.isLookahead = true, this.nextToken(), this.isLookahead = false;
        let e = this.state;
        return this.state = t, e;
      }
      nextTokenStart() {
        return this.nextTokenStartSince(this.state.pos);
      }
      nextTokenStartSince(t) {
        return $e.lastIndex = t, $e.test(this.input) ? $e.lastIndex : t;
      }
      lookaheadCharCode() {
        return this.lookaheadCharCodeSince(this.state.pos);
      }
      lookaheadCharCodeSince(t) {
        return this.input.charCodeAt(this.nextTokenStartSince(t));
      }
      nextTokenInLineStart() {
        return this.nextTokenInLineStartSince(this.state.pos);
      }
      nextTokenInLineStartSince(t) {
        return Ve.lastIndex = t, Ve.test(this.input) ? Ve.lastIndex : t;
      }
      lookaheadInLineCharCode() {
        return this.input.charCodeAt(this.nextTokenInLineStart());
      }
      codePointAtPos(t) {
        let e = this.input.charCodeAt(t);
        if ((e & 64512) === 55296 && ++t < this.input.length) {
          let s = this.input.charCodeAt(t);
          (s & 64512) === 56320 && (e = 65536 + ((e & 1023) << 10) + (s & 1023));
        }
        return e;
      }
      setStrict(t) {
        this.state.strict = t, t && (this.state.strictErrors.forEach(([e, s]) => this.raise(e, s)), this.state.strictErrors.clear());
      }
      curContext() {
        return this.state.context[this.state.context.length - 1];
      }
      nextToken() {
        if (this.skipSpace(), this.state.start = this.state.pos, this.isLookahead || (this.state.startLoc = this.state.curPosition()), this.state.pos >= this.length) {
          this.finishToken(140);
          return;
        }
        this.getTokenFromCode(this.codePointAtPos(this.state.pos));
      }
      skipBlockComment(t) {
        let e;
        this.isLookahead || (e = this.state.curPosition());
        let s = this.state.pos, i = this.input.indexOf(t, s + 2);
        if (i === -1) throw this.raise(p.UnterminatedComment, this.state.curPosition());
        for (this.state.pos = i + t.length, be.lastIndex = s + 2; be.test(this.input) && be.lastIndex <= i; ) ++this.state.curLine, this.state.lineStart = be.lastIndex;
        if (this.isLookahead) return;
        let r = { type: "CommentBlock", value: this.input.slice(s + 2, i), start: this.sourceToOffsetPos(s), end: this.sourceToOffsetPos(i + t.length), loc: new se(e, this.state.curPosition()) };
        return this.optionFlags & 256 && this.pushToken(r), r;
      }
      skipLineComment(t) {
        let e = this.state.pos, s;
        this.isLookahead || (s = this.state.curPosition());
        let i = this.input.charCodeAt(this.state.pos += t);
        if (this.state.pos < this.length) for (; !ee(i) && ++this.state.pos < this.length; ) i = this.input.charCodeAt(this.state.pos);
        if (this.isLookahead) return;
        let r = this.state.pos, o = { type: "CommentLine", value: this.input.slice(e + t, r), start: this.sourceToOffsetPos(e), end: this.sourceToOffsetPos(r), loc: new se(s, this.state.curPosition()) };
        return this.optionFlags & 256 && this.pushToken(o), o;
      }
      skipSpace() {
        let t = this.state.pos, e = this.optionFlags & 4096 ? [] : null;
        e: for (; this.state.pos < this.length; ) {
          let s = this.input.charCodeAt(this.state.pos);
          switch (s) {
            case 32:
            case 160:
            case 9:
              ++this.state.pos;
              break;
            case 13:
              this.input.charCodeAt(this.state.pos + 1) === 10 && ++this.state.pos;
            case 10:
            case 8232:
            case 8233:
              ++this.state.pos, ++this.state.curLine, this.state.lineStart = this.state.pos;
              break;
            case 47:
              switch (this.input.charCodeAt(this.state.pos + 1)) {
                case 42: {
                  let i = this.skipBlockComment("*/");
                  i !== void 0 && (this.addComment(i), e == null || e.push(i));
                  break;
                }
                case 47: {
                  let i = this.skipLineComment(2);
                  i !== void 0 && (this.addComment(i), e == null || e.push(i));
                  break;
                }
                default:
                  break e;
              }
              break;
            default:
              if (mr(s)) ++this.state.pos;
              else if (s === 45 && !this.inModule && this.optionFlags & 8192) {
                let i = this.state.pos;
                if (this.input.charCodeAt(i + 1) === 45 && this.input.charCodeAt(i + 2) === 62 && (t === 0 || this.state.lineStart > t)) {
                  let r = this.skipLineComment(3);
                  r !== void 0 && (this.addComment(r), e == null || e.push(r));
                } else break e;
              } else if (s === 60 && !this.inModule && this.optionFlags & 8192) {
                let i = this.state.pos;
                if (this.input.charCodeAt(i + 1) === 33 && this.input.charCodeAt(i + 2) === 45 && this.input.charCodeAt(i + 3) === 45) {
                  let r = this.skipLineComment(4);
                  r !== void 0 && (this.addComment(r), e == null || e.push(r));
                } else break e;
              } else break e;
          }
        }
        if ((e == null ? void 0 : e.length) > 0) {
          let s = this.state.pos, i = { start: this.sourceToOffsetPos(t), end: this.sourceToOffsetPos(s), comments: e, leadingNode: null, trailingNode: null, containingNode: null };
          this.state.commentStack.push(i);
        }
      }
      finishToken(t, e) {
        this.state.end = this.state.pos, this.state.endLoc = this.state.curPosition();
        let s = this.state.type;
        this.state.type = t, this.state.value = e, this.isLookahead || this.updateContext(s);
      }
      replaceToken(t) {
        this.state.type = t, this.updateContext();
      }
      readToken_numberSign() {
        if (this.state.pos === 0 && this.readToken_interpreter()) return;
        let t = this.state.pos + 1, e = this.codePointAtPos(t);
        if (e >= 48 && e <= 57) throw this.raise(p.UnexpectedDigitAfterHash, this.state.curPosition());
        if (e === 123 || e === 91 && this.hasPlugin("recordAndTuple")) {
          if (this.expectPlugin("recordAndTuple"), this.getPluginOption("recordAndTuple", "syntaxType") === "bar") throw this.raise(e === 123 ? p.RecordExpressionHashIncorrectStartSyntaxType : p.TupleExpressionHashIncorrectStartSyntaxType, this.state.curPosition());
          this.state.pos += 2, e === 123 ? this.finishToken(7) : this.finishToken(1);
        } else U(e) ? (++this.state.pos, this.finishToken(139, this.readWord1(e))) : e === 92 ? (++this.state.pos, this.finishToken(139, this.readWord1())) : this.finishOp(27, 1);
      }
      readToken_dot() {
        let t = this.input.charCodeAt(this.state.pos + 1);
        if (t >= 48 && t <= 57) {
          this.readNumber(true);
          return;
        }
        t === 46 && this.input.charCodeAt(this.state.pos + 2) === 46 ? (this.state.pos += 3, this.finishToken(21)) : (++this.state.pos, this.finishToken(16));
      }
      readToken_slash() {
        this.input.charCodeAt(this.state.pos + 1) === 61 ? this.finishOp(31, 2) : this.finishOp(56, 1);
      }
      readToken_interpreter() {
        if (this.state.pos !== 0 || this.length < 2) return false;
        let t = this.input.charCodeAt(this.state.pos + 1);
        if (t !== 33) return false;
        let e = this.state.pos;
        for (this.state.pos += 1; !ee(t) && ++this.state.pos < this.length; ) t = this.input.charCodeAt(this.state.pos);
        let s = this.input.slice(e + 2, this.state.pos);
        return this.finishToken(28, s), true;
      }
      readToken_mult_modulo(t) {
        let e = t === 42 ? 55 : 54, s = 1, i = this.input.charCodeAt(this.state.pos + 1);
        t === 42 && i === 42 && (s++, i = this.input.charCodeAt(this.state.pos + 2), e = 57), i === 61 && !this.state.inType && (s++, e = t === 37 ? 33 : 30), this.finishOp(e, s);
      }
      readToken_pipe_amp(t) {
        let e = this.input.charCodeAt(this.state.pos + 1);
        if (e === t) {
          this.input.charCodeAt(this.state.pos + 2) === 61 ? this.finishOp(30, 3) : this.finishOp(t === 124 ? 41 : 42, 2);
          return;
        }
        if (t === 124) {
          if (e === 62) {
            this.finishOp(39, 2);
            return;
          }
          if (this.hasPlugin("recordAndTuple") && e === 125) {
            if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") throw this.raise(p.RecordExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
            this.state.pos += 2, this.finishToken(9);
            return;
          }
          if (this.hasPlugin("recordAndTuple") && e === 93) {
            if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") throw this.raise(p.TupleExpressionBarIncorrectEndSyntaxType, this.state.curPosition());
            this.state.pos += 2, this.finishToken(4);
            return;
          }
        }
        if (e === 61) {
          this.finishOp(30, 2);
          return;
        }
        this.finishOp(t === 124 ? 43 : 45, 1);
      }
      readToken_caret() {
        let t = this.input.charCodeAt(this.state.pos + 1);
        t === 61 && !this.state.inType ? this.finishOp(32, 2) : t === 94 && this.hasPlugin(["pipelineOperator", { proposal: "hack", topicToken: "^^" }]) ? (this.finishOp(37, 2), this.input.codePointAt(this.state.pos) === 94 && this.unexpected()) : this.finishOp(44, 1);
      }
      readToken_atSign() {
        this.input.charCodeAt(this.state.pos + 1) === 64 && this.hasPlugin(["pipelineOperator", { proposal: "hack", topicToken: "@@" }]) ? this.finishOp(38, 2) : this.finishOp(26, 1);
      }
      readToken_plus_min(t) {
        let e = this.input.charCodeAt(this.state.pos + 1);
        if (e === t) {
          this.finishOp(34, 2);
          return;
        }
        e === 61 ? this.finishOp(30, 2) : this.finishOp(53, 1);
      }
      readToken_lt() {
        let { pos: t } = this.state, e = this.input.charCodeAt(t + 1);
        if (e === 60) {
          if (this.input.charCodeAt(t + 2) === 61) {
            this.finishOp(30, 3);
            return;
          }
          this.finishOp(51, 2);
          return;
        }
        if (e === 61) {
          this.finishOp(49, 2);
          return;
        }
        this.finishOp(47, 1);
      }
      readToken_gt() {
        let { pos: t } = this.state, e = this.input.charCodeAt(t + 1);
        if (e === 62) {
          let s = this.input.charCodeAt(t + 2) === 62 ? 3 : 2;
          if (this.input.charCodeAt(t + s) === 61) {
            this.finishOp(30, s + 1);
            return;
          }
          this.finishOp(52, s);
          return;
        }
        if (e === 61) {
          this.finishOp(49, 2);
          return;
        }
        this.finishOp(48, 1);
      }
      readToken_eq_excl(t) {
        let e = this.input.charCodeAt(this.state.pos + 1);
        if (e === 61) {
          this.finishOp(46, this.input.charCodeAt(this.state.pos + 2) === 61 ? 3 : 2);
          return;
        }
        if (t === 61 && e === 62) {
          this.state.pos += 2, this.finishToken(19);
          return;
        }
        this.finishOp(t === 61 ? 29 : 35, 1);
      }
      readToken_question() {
        let t = this.input.charCodeAt(this.state.pos + 1), e = this.input.charCodeAt(this.state.pos + 2);
        t === 63 ? e === 61 ? this.finishOp(30, 3) : this.finishOp(40, 2) : t === 46 && !(e >= 48 && e <= 57) ? (this.state.pos += 2, this.finishToken(18)) : (++this.state.pos, this.finishToken(17));
      }
      getTokenFromCode(t) {
        switch (t) {
          case 46:
            this.readToken_dot();
            return;
          case 40:
            ++this.state.pos, this.finishToken(10);
            return;
          case 41:
            ++this.state.pos, this.finishToken(11);
            return;
          case 59:
            ++this.state.pos, this.finishToken(13);
            return;
          case 44:
            ++this.state.pos, this.finishToken(12);
            return;
          case 91:
            if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
              if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") throw this.raise(p.TupleExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
              this.state.pos += 2, this.finishToken(2);
            } else ++this.state.pos, this.finishToken(0);
            return;
          case 93:
            ++this.state.pos, this.finishToken(3);
            return;
          case 123:
            if (this.hasPlugin("recordAndTuple") && this.input.charCodeAt(this.state.pos + 1) === 124) {
              if (this.getPluginOption("recordAndTuple", "syntaxType") !== "bar") throw this.raise(p.RecordExpressionBarIncorrectStartSyntaxType, this.state.curPosition());
              this.state.pos += 2, this.finishToken(6);
            } else ++this.state.pos, this.finishToken(5);
            return;
          case 125:
            ++this.state.pos, this.finishToken(8);
            return;
          case 58:
            this.hasPlugin("functionBind") && this.input.charCodeAt(this.state.pos + 1) === 58 ? this.finishOp(15, 2) : (++this.state.pos, this.finishToken(14));
            return;
          case 63:
            this.readToken_question();
            return;
          case 96:
            this.readTemplateToken();
            return;
          case 48: {
            let e = this.input.charCodeAt(this.state.pos + 1);
            if (e === 120 || e === 88) {
              this.readRadixNumber(16);
              return;
            }
            if (e === 111 || e === 79) {
              this.readRadixNumber(8);
              return;
            }
            if (e === 98 || e === 66) {
              this.readRadixNumber(2);
              return;
            }
          }
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            this.readNumber(false);
            return;
          case 34:
          case 39:
            this.readString(t);
            return;
          case 47:
            this.readToken_slash();
            return;
          case 37:
          case 42:
            this.readToken_mult_modulo(t);
            return;
          case 124:
          case 38:
            this.readToken_pipe_amp(t);
            return;
          case 94:
            this.readToken_caret();
            return;
          case 43:
          case 45:
            this.readToken_plus_min(t);
            return;
          case 60:
            this.readToken_lt();
            return;
          case 62:
            this.readToken_gt();
            return;
          case 61:
          case 33:
            this.readToken_eq_excl(t);
            return;
          case 126:
            this.finishOp(36, 1);
            return;
          case 64:
            this.readToken_atSign();
            return;
          case 35:
            this.readToken_numberSign();
            return;
          case 92:
            this.readWord();
            return;
          default:
            if (U(t)) {
              this.readWord(t);
              return;
            }
        }
        throw this.raise(p.InvalidOrUnexpectedToken, this.state.curPosition(), { unexpected: String.fromCodePoint(t) });
      }
      finishOp(t, e) {
        let s = this.input.slice(this.state.pos, this.state.pos + e);
        this.state.pos += e, this.finishToken(t, s);
      }
      readRegexp() {
        let t = this.state.startLoc, e = this.state.start + 1, s, i, { pos: r } = this.state;
        for (; ; ++r) {
          if (r >= this.length) throw this.raise(p.UnterminatedRegExp, D(t, 1));
          let h = this.input.charCodeAt(r);
          if (ee(h)) throw this.raise(p.UnterminatedRegExp, D(t, 1));
          if (s) s = false;
          else {
            if (h === 91) i = true;
            else if (h === 93 && i) i = false;
            else if (h === 47 && !i) break;
            s = h === 92;
          }
        }
        let n = this.input.slice(e, r);
        ++r;
        let o = "", l = () => D(t, r + 2 - e);
        for (; r < this.length; ) {
          let h = this.codePointAtPos(r), c = String.fromCharCode(h);
          if (br.has(h)) h === 118 ? o.includes("u") && this.raise(p.IncompatibleRegExpUVFlags, l()) : h === 117 && o.includes("v") && this.raise(p.IncompatibleRegExpUVFlags, l()), o.includes(c) && this.raise(p.DuplicateRegExpFlags, l());
          else if (Z(h) || h === 92) this.raise(p.MalformedRegExpFlags, l());
          else break;
          ++r, o += c;
        }
        this.state.pos = r, this.finishToken(138, { pattern: n, flags: o });
      }
      readInt(t, e, s = false, i = true) {
        let { n: r, pos: n } = Ds(this.input, this.state.pos, this.state.lineStart, this.state.curLine, t, e, s, i, this.errorHandlers_readInt, false);
        return this.state.pos = n, r;
      }
      readRadixNumber(t) {
        let e = this.state.pos, s = this.state.curPosition(), i = false;
        this.state.pos += 2;
        let r = this.readInt(t);
        r == null && this.raise(p.InvalidDigit, D(s, 2), { radix: t });
        let n = this.input.charCodeAt(this.state.pos);
        if (n === 110) ++this.state.pos, i = true;
        else if (n === 109) throw this.raise(p.InvalidDecimal, s);
        if (U(this.codePointAtPos(this.state.pos))) throw this.raise(p.NumberIdentifier, this.state.curPosition());
        if (i) {
          let o = this.input.slice(e, this.state.pos).replace(/[_n]/g, "");
          this.finishToken(136, o);
          return;
        }
        this.finishToken(135, r);
      }
      readNumber(t) {
        let e = this.state.pos, s = this.state.curPosition(), i = false, r = false, n = false, o = false;
        !t && this.readInt(10) === null && this.raise(p.InvalidNumber, this.state.curPosition());
        let l = this.state.pos - e >= 2 && this.input.charCodeAt(e) === 48;
        if (l) {
          let d = this.input.slice(e, this.state.pos);
          if (this.recordStrictModeErrors(p.StrictOctalLiteral, s), !this.state.strict) {
            let x = d.indexOf("_");
            x > 0 && this.raise(p.ZeroDigitNumericSeparator, D(s, x));
          }
          o = l && !/[89]/.test(d);
        }
        let h = this.input.charCodeAt(this.state.pos);
        if (h === 46 && !o && (++this.state.pos, this.readInt(10), i = true, h = this.input.charCodeAt(this.state.pos)), (h === 69 || h === 101) && !o && (h = this.input.charCodeAt(++this.state.pos), (h === 43 || h === 45) && ++this.state.pos, this.readInt(10) === null && this.raise(p.InvalidOrMissingExponent, s), i = true, n = true, h = this.input.charCodeAt(this.state.pos)), h === 110 && ((i || l) && this.raise(p.InvalidBigIntLiteral, s), ++this.state.pos, r = true), h === 109) {
          this.expectPlugin("decimal", this.state.curPosition()), (n || l) && this.raise(p.InvalidDecimal, s), ++this.state.pos;
          var c = true;
        }
        if (U(this.codePointAtPos(this.state.pos))) throw this.raise(p.NumberIdentifier, this.state.curPosition());
        let u = this.input.slice(e, this.state.pos).replace(/[_mn]/g, "");
        if (r) {
          this.finishToken(136, u);
          return;
        }
        if (c) {
          this.finishToken(137, u);
          return;
        }
        let f = o ? parseInt(u, 8) : parseFloat(u);
        this.finishToken(135, f);
      }
      readCodePoint(t) {
        let { code: e, pos: s } = Ms(this.input, this.state.pos, this.state.lineStart, this.state.curLine, t, this.errorHandlers_readCodePoint);
        return this.state.pos = s, e;
      }
      readString(t) {
        let { str: e, pos: s, curLine: i, lineStart: r } = xs(t === 34 ? "double" : "single", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_string);
        this.state.pos = s + 1, this.state.lineStart = r, this.state.curLine = i, this.finishToken(134, e);
      }
      readTemplateContinuation() {
        this.match(8) || this.unexpected(null, 8), this.state.pos--, this.readTemplateToken();
      }
      readTemplateToken() {
        let t = this.input[this.state.pos], { str: e, firstInvalidLoc: s, pos: i, curLine: r, lineStart: n } = xs("template", this.input, this.state.pos + 1, this.state.lineStart, this.state.curLine, this.errorHandlers_readStringContents_template);
        this.state.pos = i + 1, this.state.lineStart = n, this.state.curLine = r, s && (this.state.firstInvalidTemplateEscapePos = new B(s.curLine, s.pos - s.lineStart, this.sourceToOffsetPos(s.pos))), this.input.codePointAt(i) === 96 ? this.finishToken(24, s ? null : t + e + "`") : (this.state.pos++, this.finishToken(25, s ? null : t + e + "${"));
      }
      recordStrictModeErrors(t, e) {
        let s = e.index;
        this.state.strict && !this.state.strictErrors.has(s) ? this.raise(t, e) : this.state.strictErrors.set(s, [t, e]);
      }
      readWord1(t) {
        this.state.containsEsc = false;
        let e = "", s = this.state.pos, i = this.state.pos;
        for (t !== void 0 && (this.state.pos += t <= 65535 ? 1 : 2); this.state.pos < this.length; ) {
          let r = this.codePointAtPos(this.state.pos);
          if (Z(r)) this.state.pos += r <= 65535 ? 1 : 2;
          else if (r === 92) {
            this.state.containsEsc = true, e += this.input.slice(i, this.state.pos);
            let n = this.state.curPosition(), o = this.state.pos === s ? U : Z;
            if (this.input.charCodeAt(++this.state.pos) !== 117) {
              this.raise(p.MissingUnicodeEscape, this.state.curPosition()), i = this.state.pos - 1;
              continue;
            }
            ++this.state.pos;
            let l = this.readCodePoint(true);
            l !== null && (o(l) || this.raise(p.EscapedCharNotAnIdentifier, n), e += String.fromCodePoint(l)), i = this.state.pos;
          } else break;
        }
        return e + this.input.slice(i, this.state.pos);
      }
      readWord(t) {
        let e = this.readWord1(t), s = pt.get(e);
        s !== void 0 ? this.finishToken(s, H(s)) : this.finishToken(132, e);
      }
      checkKeywordEscapes() {
        let { type: t } = this.state;
        xt(t) && this.state.containsEsc && this.raise(p.InvalidEscapedReservedWord, this.state.startLoc, { reservedWord: H(t) });
      }
      raise(t, e, s = {}) {
        let i = e instanceof B ? e : e.loc.start, r = t(i, s);
        if (!(this.optionFlags & 2048)) throw r;
        return this.isLookahead || this.state.errors.push(r), r;
      }
      raiseOverwrite(t, e, s = {}) {
        let i = e instanceof B ? e : e.loc.start, r = i.index, n = this.state.errors;
        for (let o = n.length - 1; o >= 0; o--) {
          let l = n[o];
          if (l.loc.index === r) return n[o] = t(i, s);
          if (l.loc.index < r) break;
        }
        return this.raise(t, e, s);
      }
      updateContext(t) {
      }
      unexpected(t, e) {
        throw this.raise(p.UnexpectedToken, t ?? this.state.startLoc, { expected: e ? H(e) : null });
      }
      expectPlugin(t, e) {
        if (this.hasPlugin(t)) return true;
        throw this.raise(p.MissingPlugin, e ?? this.state.startLoc, { missingPlugin: [t] });
      }
      expectOnePlugin(t) {
        if (!t.some((e) => this.hasPlugin(e))) throw this.raise(p.MissingOneOfPlugins, this.state.startLoc, { missingPlugin: t });
      }
      errorBuilder(t) {
        return (e, s, i) => {
          this.raise(t, pe(e, s, i));
        };
      }
    }, st = class {
      constructor() {
        this.privateNames = /* @__PURE__ */ new Set(), this.loneAccessors = /* @__PURE__ */ new Map(), this.undefinedPrivateNames = /* @__PURE__ */ new Map();
      }
    }, it = class {
      constructor(t) {
        this.parser = void 0, this.stack = [], this.undefinedPrivateNames = /* @__PURE__ */ new Map(), this.parser = t;
      }
      current() {
        return this.stack[this.stack.length - 1];
      }
      enter() {
        this.stack.push(new st());
      }
      exit() {
        let t = this.stack.pop(), e = this.current();
        for (let [s, i] of Array.from(t.undefinedPrivateNames)) e ? e.undefinedPrivateNames.has(s) || e.undefinedPrivateNames.set(s, i) : this.parser.raise(p.InvalidPrivateFieldResolution, i, { identifierName: s });
      }
      declarePrivateName(t, e, s) {
        let { privateNames: i, loneAccessors: r, undefinedPrivateNames: n } = this.current(), o = i.has(t);
        if (e & 3) {
          let l = o && r.get(t);
          if (l) {
            let h = l & 4, c = e & 4, u = l & 3, f = e & 3;
            o = u === f || h !== c, o || r.delete(t);
          } else o || r.set(t, e);
        }
        o && this.parser.raise(p.PrivateNameRedeclaration, s, { identifierName: t }), i.add(t), n.delete(t);
      }
      usePrivateName(t, e) {
        let s;
        for (s of this.stack) if (s.privateNames.has(t)) return;
        s ? s.undefinedPrivateNames.set(t, e) : this.parser.raise(p.InvalidPrivateFieldResolution, e, { identifierName: t });
      }
    }, ie = class {
      constructor(t = 0) {
        this.type = t;
      }
      canBeArrowParameterDeclaration() {
        return this.type === 2 || this.type === 1;
      }
      isCertainlyParameterDeclaration() {
        return this.type === 3;
      }
    }, Ne = class extends ie {
      constructor(t) {
        super(t), this.declarationErrors = /* @__PURE__ */ new Map();
      }
      recordDeclarationError(t, e) {
        let s = e.index;
        this.declarationErrors.set(s, [t, e]);
      }
      clearDeclarationError(t) {
        this.declarationErrors.delete(t);
      }
      iterateErrors(t) {
        this.declarationErrors.forEach(t);
      }
    }, rt = class {
      constructor(t) {
        this.parser = void 0, this.stack = [new ie()], this.parser = t;
      }
      enter(t) {
        this.stack.push(t);
      }
      exit() {
        this.stack.pop();
      }
      recordParameterInitializerError(t, e) {
        let s = e.loc.start, { stack: i } = this, r = i.length - 1, n = i[r];
        for (; !n.isCertainlyParameterDeclaration(); ) {
          if (n.canBeArrowParameterDeclaration()) n.recordDeclarationError(t, s);
          else return;
          n = i[--r];
        }
        this.parser.raise(t, s);
      }
      recordArrowParameterBindingError(t, e) {
        let { stack: s } = this, i = s[s.length - 1], r = e.loc.start;
        if (i.isCertainlyParameterDeclaration()) this.parser.raise(t, r);
        else if (i.canBeArrowParameterDeclaration()) i.recordDeclarationError(t, r);
        else return;
      }
      recordAsyncArrowParametersError(t) {
        let { stack: e } = this, s = e.length - 1, i = e[s];
        for (; i.canBeArrowParameterDeclaration(); ) i.type === 2 && i.recordDeclarationError(p.AwaitBindingIdentifier, t), i = e[--s];
      }
      validateAsPattern() {
        let { stack: t } = this, e = t[t.length - 1];
        e.canBeArrowParameterDeclaration() && e.iterateErrors(([s, i]) => {
          this.parser.raise(s, i);
          let r = t.length - 2, n = t[r];
          for (; n.canBeArrowParameterDeclaration(); ) n.clearDeclarationError(i.index), n = t[--r];
        });
      }
    };
    function Ar() {
      return new ie(3);
    }
    function Sr() {
      return new Ne(1);
    }
    function Er() {
      return new Ne(2);
    }
    function Os() {
      return new ie();
    }
    var at = class extends tt {
      addExtra(t, e, s, i = true) {
        if (!t) return;
        let { extra: r } = t;
        r == null && (r = {}, t.extra = r), i ? r[e] = s : Object.defineProperty(r, e, { enumerable: i, value: s });
      }
      isContextual(t) {
        return this.state.type === t && !this.state.containsEsc;
      }
      isUnparsedContextual(t, e) {
        if (this.input.startsWith(e, t)) {
          let s = this.input.charCodeAt(t + e.length);
          return !(Z(s) || (s & 64512) === 55296);
        }
        return false;
      }
      isLookaheadContextual(t) {
        let e = this.nextTokenStart();
        return this.isUnparsedContextual(e, t);
      }
      eatContextual(t) {
        return this.isContextual(t) ? (this.next(), true) : false;
      }
      expectContextual(t, e) {
        if (!this.eatContextual(t)) {
          if (e != null) throw this.raise(e, this.state.startLoc);
          this.unexpected(null, t);
        }
      }
      canInsertSemicolon() {
        return this.match(140) || this.match(8) || this.hasPrecedingLineBreak();
      }
      hasPrecedingLineBreak() {
        return ms(this.input, this.offsetToSourcePos(this.state.lastTokEndLoc.index), this.state.start);
      }
      hasFollowingLineBreak() {
        return ms(this.input, this.state.end, this.nextTokenStart());
      }
      isLineTerminator() {
        return this.eat(13) || this.canInsertSemicolon();
      }
      semicolon(t = true) {
        (t ? this.isLineTerminator() : this.eat(13)) || this.raise(p.MissingSemicolon, this.state.lastTokEndLoc);
      }
      expect(t, e) {
        this.eat(t) || this.unexpected(e, t);
      }
      tryParse(t, e = this.state.clone()) {
        let s = { node: null };
        try {
          let i = t((r = null) => {
            throw s.node = r, s;
          });
          if (this.state.errors.length > e.errors.length) {
            let r = this.state;
            return this.state = e, this.state.tokensLength = r.tokensLength, { node: i, error: r.errors[e.errors.length], thrown: false, aborted: false, failState: r };
          }
          return { node: i, error: null, thrown: false, aborted: false, failState: null };
        } catch (i) {
          let r = this.state;
          if (this.state = e, i instanceof SyntaxError) return { node: null, error: i, thrown: true, aborted: false, failState: r };
          if (i === s) return { node: s.node, error: null, thrown: false, aborted: true, failState: r };
          throw i;
        }
      }
      checkExpressionErrors(t, e) {
        if (!t) return false;
        let { shorthandAssignLoc: s, doubleProtoLoc: i, privateKeyLoc: r, optionalParametersLoc: n } = t, o = !!s || !!i || !!n || !!r;
        if (!e) return o;
        s != null && this.raise(p.InvalidCoverInitializedName, s), i != null && this.raise(p.DuplicateProto, i), r != null && this.raise(p.UnexpectedPrivateField, r), n != null && this.unexpected(n);
      }
      isLiteralPropertyName() {
        return Es(this.state.type);
      }
      isPrivateName(t) {
        return t.type === "PrivateName";
      }
      getPrivateNameSV(t) {
        return t.id.name;
      }
      hasPropertyAsPrivateName(t) {
        return (t.type === "MemberExpression" || t.type === "OptionalMemberExpression") && this.isPrivateName(t.property);
      }
      isObjectProperty(t) {
        return t.type === "ObjectProperty";
      }
      isObjectMethod(t) {
        return t.type === "ObjectMethod";
      }
      initializeScopes(t = this.options.sourceType === "module") {
        let e = this.state.labels;
        this.state.labels = [];
        let s = this.exportedIdentifiers;
        this.exportedIdentifiers = /* @__PURE__ */ new Set();
        let i = this.inModule;
        this.inModule = t;
        let r = this.scope, n = this.getScopeHandler();
        this.scope = new n(this, t);
        let o = this.prodParam;
        this.prodParam = new Ge();
        let l = this.classScope;
        this.classScope = new it(this);
        let h = this.expressionScope;
        return this.expressionScope = new rt(this), () => {
          this.state.labels = e, this.exportedIdentifiers = s, this.inModule = i, this.scope = r, this.prodParam = o, this.classScope = l, this.expressionScope = h;
        };
      }
      enterInitialScopes() {
        let t = 0;
        (this.inModule || this.optionFlags & 1) && (t |= 2), this.optionFlags & 32 && (t |= 1), this.optionFlags & 2 && (t |= 4);
        let e = 1;
        this.optionFlags & 4 && (e |= 512), this.scope.enter(e), this.prodParam.enter(t);
      }
      checkDestructuringPrivate(t) {
        let { privateKeyLoc: e } = t;
        e !== null && this.expectPlugin("destructuringPrivate", e);
      }
    }, te = class {
      constructor() {
        this.shorthandAssignLoc = null, this.doubleProtoLoc = null, this.privateKeyLoc = null, this.optionalParametersLoc = null;
      }
    }, re = class {
      constructor(t, e, s) {
        this.type = "", this.start = e, this.end = 0, this.loc = new se(s), (t == null ? void 0 : t.optionFlags) & 128 && (this.range = [e, 0]), t != null && t.filename && (this.loc.filename = t.filename);
      }
    }, nt = re.prototype;
    nt.__clone = function() {
      let a = new re(void 0, this.start, this.loc.start), t = Object.keys(this);
      for (let e = 0, s = t.length; e < s; e++) {
        let i = t[e];
        i !== "leadingComments" && i !== "trailingComments" && i !== "innerComments" && (a[i] = this[i]);
      }
      return a;
    };
    var ot = class extends at {
      startNode() {
        let t = this.state.startLoc;
        return new re(this, t.index, t);
      }
      startNodeAt(t) {
        return new re(this, t.index, t);
      }
      startNodeAtNode(t) {
        return this.startNodeAt(t.loc.start);
      }
      finishNode(t, e) {
        return this.finishNodeAt(t, e, this.state.lastTokEndLoc);
      }
      finishNodeAt(t, e, s) {
        return t.type = e, t.end = s.index, t.loc.end = s, this.optionFlags & 128 && (t.range[1] = s.index), this.optionFlags & 4096 && this.processComment(t), t;
      }
      resetStartLocation(t, e) {
        t.start = e.index, t.loc.start = e, this.optionFlags & 128 && (t.range[0] = e.index);
      }
      resetEndLocation(t, e = this.state.lastTokEndLoc) {
        t.end = e.index, t.loc.end = e, this.optionFlags & 128 && (t.range[1] = e.index);
      }
      resetStartLocationFromNode(t, e) {
        this.resetStartLocation(t, e.loc.start);
      }
      castNodeTo(t, e) {
        return t.type = e, t;
      }
      cloneIdentifier(t) {
        let { type: e, start: s, end: i, loc: r, range: n, name: o } = t, l = Object.create(nt);
        return l.type = e, l.start = s, l.end = i, l.loc = r, l.range = n, l.name = o, t.extra && (l.extra = t.extra), l;
      }
      cloneStringLiteral(t) {
        let { type: e, start: s, end: i, loc: r, range: n, extra: o } = t, l = Object.create(nt);
        return l.type = e, l.start = s, l.end = i, l.loc = r, l.range = n, l.extra = o, l.value = t.value, l;
      }
    }, Fs = (a) => a.type === "ParenthesizedExpression" ? Fs(a.expression) : a, lt = class extends ot {
      toAssignable(t, e = false) {
        var s, i;
        let r;
        switch ((t.type === "ParenthesizedExpression" || (s = t.extra) != null && s.parenthesized) && (r = Fs(t), e ? r.type === "Identifier" ? this.expressionScope.recordArrowParameterBindingError(p.InvalidParenthesizedAssignment, t) : r.type !== "MemberExpression" && !this.isOptionalMemberExpression(r) && this.raise(p.InvalidParenthesizedAssignment, t) : this.raise(p.InvalidParenthesizedAssignment, t)), t.type) {
          case "Identifier":
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            break;
          case "ObjectExpression":
            this.castNodeTo(t, "ObjectPattern");
            for (let o = 0, l = t.properties.length, h = l - 1; o < l; o++) {
              var n;
              let c = t.properties[o], u = o === h;
              this.toAssignableObjectExpressionProp(c, u, e), u && c.type === "RestElement" && (n = t.extra) != null && n.trailingCommaLoc && this.raise(p.RestTrailingComma, t.extra.trailingCommaLoc);
            }
            break;
          case "ObjectProperty": {
            let { key: o, value: l } = t;
            this.isPrivateName(o) && this.classScope.usePrivateName(this.getPrivateNameSV(o), o.loc.start), this.toAssignable(l, e);
            break;
          }
          case "SpreadElement":
            throw new Error("Internal @babel/parser error (this is a bug, please report it). SpreadElement should be converted by .toAssignable's caller.");
          case "ArrayExpression":
            this.castNodeTo(t, "ArrayPattern"), this.toAssignableList(t.elements, (i = t.extra) == null ? void 0 : i.trailingCommaLoc, e);
            break;
          case "AssignmentExpression":
            t.operator !== "=" && this.raise(p.MissingEqInAssignment, t.left.loc.end), this.castNodeTo(t, "AssignmentPattern"), delete t.operator, this.toAssignable(t.left, e);
            break;
          case "ParenthesizedExpression":
            this.toAssignable(r, e);
            break;
        }
      }
      toAssignableObjectExpressionProp(t, e, s) {
        if (t.type === "ObjectMethod") this.raise(t.kind === "get" || t.kind === "set" ? p.PatternHasAccessor : p.PatternHasMethod, t.key);
        else if (t.type === "SpreadElement") {
          this.castNodeTo(t, "RestElement");
          let i = t.argument;
          this.checkToRestConversion(i, false), this.toAssignable(i, s), e || this.raise(p.RestTrailingComma, t);
        } else this.toAssignable(t, s);
      }
      toAssignableList(t, e, s) {
        let i = t.length - 1;
        for (let r = 0; r <= i; r++) {
          let n = t[r];
          n && (this.toAssignableListItem(t, r, s), n.type === "RestElement" && (r < i ? this.raise(p.RestTrailingComma, n) : e && this.raise(p.RestTrailingComma, e)));
        }
      }
      toAssignableListItem(t, e, s) {
        let i = t[e];
        if (i.type === "SpreadElement") {
          this.castNodeTo(i, "RestElement");
          let r = i.argument;
          this.checkToRestConversion(r, true), this.toAssignable(r, s);
        } else this.toAssignable(i, s);
      }
      isAssignable(t, e) {
        switch (t.type) {
          case "Identifier":
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            return true;
          case "ObjectExpression": {
            let s = t.properties.length - 1;
            return t.properties.every((i, r) => i.type !== "ObjectMethod" && (r === s || i.type !== "SpreadElement") && this.isAssignable(i));
          }
          case "ObjectProperty":
            return this.isAssignable(t.value);
          case "SpreadElement":
            return this.isAssignable(t.argument);
          case "ArrayExpression":
            return t.elements.every((s) => s === null || this.isAssignable(s));
          case "AssignmentExpression":
            return t.operator === "=";
          case "ParenthesizedExpression":
            return this.isAssignable(t.expression);
          case "MemberExpression":
          case "OptionalMemberExpression":
            return !e;
          default:
            return false;
        }
      }
      toReferencedList(t, e) {
        return t;
      }
      toReferencedListDeep(t, e) {
        this.toReferencedList(t, e);
        for (let s of t) (s == null ? void 0 : s.type) === "ArrayExpression" && this.toReferencedListDeep(s.elements);
      }
      parseSpread(t) {
        let e = this.startNode();
        return this.next(), e.argument = this.parseMaybeAssignAllowIn(t, void 0), this.finishNode(e, "SpreadElement");
      }
      parseRestBinding() {
        let t = this.startNode();
        return this.next(), t.argument = this.parseBindingAtom(), this.finishNode(t, "RestElement");
      }
      parseBindingAtom() {
        switch (this.state.type) {
          case 0: {
            let t = this.startNode();
            return this.next(), t.elements = this.parseBindingList(3, 93, 1), this.finishNode(t, "ArrayPattern");
          }
          case 5:
            return this.parseObjectLike(8, true);
        }
        return this.parseIdentifier();
      }
      parseBindingList(t, e, s) {
        let i = s & 1, r = [], n = true;
        for (; !this.eat(t); ) if (n ? n = false : this.expect(12), i && this.match(12)) r.push(null);
        else {
          if (this.eat(t)) break;
          if (this.match(21)) {
            let o = this.parseRestBinding();
            if ((this.hasPlugin("flow") || s & 2) && (o = this.parseFunctionParamType(o)), r.push(o), !this.checkCommaAfterRest(e)) {
              this.expect(t);
              break;
            }
          } else {
            let o = [];
            if (s & 2) for (this.match(26) && this.hasPlugin("decorators") && this.raise(p.UnsupportedParameterDecorator, this.state.startLoc); this.match(26); ) o.push(this.parseDecorator());
            r.push(this.parseBindingElement(s, o));
          }
        }
        return r;
      }
      parseBindingRestProperty(t) {
        return this.next(), t.argument = this.parseIdentifier(), this.checkCommaAfterRest(125), this.finishNode(t, "RestElement");
      }
      parseBindingProperty() {
        let { type: t, startLoc: e } = this.state;
        if (t === 21) return this.parseBindingRestProperty(this.startNode());
        let s = this.startNode();
        return t === 139 ? (this.expectPlugin("destructuringPrivate", e), this.classScope.usePrivateName(this.state.value, e), s.key = this.parsePrivateName()) : this.parsePropertyName(s), s.method = false, this.parseObjPropValue(s, e, false, false, true, false);
      }
      parseBindingElement(t, e) {
        let s = this.parseMaybeDefault();
        return (this.hasPlugin("flow") || t & 2) && this.parseFunctionParamType(s), e.length && (s.decorators = e, this.resetStartLocationFromNode(s, e[0])), this.parseMaybeDefault(s.loc.start, s);
      }
      parseFunctionParamType(t) {
        return t;
      }
      parseMaybeDefault(t, e) {
        if (t ?? (t = this.state.startLoc), e = e ?? this.parseBindingAtom(), !this.eat(29)) return e;
        let s = this.startNodeAt(t);
        return s.left = e, s.right = this.parseMaybeAssignAllowIn(), this.finishNode(s, "AssignmentPattern");
      }
      isValidLVal(t, e, s) {
        switch (t) {
          case "AssignmentPattern":
            return "left";
          case "RestElement":
            return "argument";
          case "ObjectProperty":
            return "value";
          case "ParenthesizedExpression":
            return "expression";
          case "ArrayPattern":
            return "elements";
          case "ObjectPattern":
            return "properties";
        }
        return false;
      }
      isOptionalMemberExpression(t) {
        return t.type === "OptionalMemberExpression";
      }
      checkLVal(t, e, s = 64, i = false, r = false, n = false) {
        var o;
        let l = t.type;
        if (this.isObjectMethod(t)) return;
        let h = this.isOptionalMemberExpression(t);
        if (h || l === "MemberExpression") {
          h && (this.expectPlugin("optionalChainingAssign", t.loc.start), e.type !== "AssignmentExpression" && this.raise(p.InvalidLhsOptionalChaining, t, { ancestor: e })), s !== 64 && this.raise(p.InvalidPropertyBindingPattern, t);
          return;
        }
        if (l === "Identifier") {
          this.checkIdentifier(t, s, r);
          let { name: A } = t;
          i && (i.has(A) ? this.raise(p.ParamDupe, t) : i.add(A));
          return;
        }
        let c = this.isValidLVal(l, !(n || (o = t.extra) != null && o.parenthesized) && e.type === "AssignmentExpression", s);
        if (c === true) return;
        if (c === false) {
          let A = s === 64 ? p.InvalidLhs : p.InvalidLhsBinding;
          this.raise(A, t, { ancestor: e });
          return;
        }
        let u, f;
        typeof c == "string" ? (u = c, f = l === "ParenthesizedExpression") : [u, f] = c;
        let d = l === "ArrayPattern" || l === "ObjectPattern" ? { type: l } : e, x = t[u];
        if (Array.isArray(x)) for (let A of x) A && this.checkLVal(A, d, s, i, r, f);
        else x && this.checkLVal(x, d, s, i, r, f);
      }
      checkIdentifier(t, e, s = false) {
        this.state.strict && (s ? vs(t.name, this.inModule) : ks(t.name)) && (e === 64 ? this.raise(p.StrictEvalArguments, t, { referenceName: t.name }) : this.raise(p.StrictEvalArgumentsBinding, t, { bindingName: t.name })), e & 8192 && t.name === "let" && this.raise(p.LetInLexicalBinding, t), e & 64 || this.declareNameFromIdentifier(t, e);
      }
      declareNameFromIdentifier(t, e) {
        this.scope.declareName(t.name, e, t.loc.start);
      }
      checkToRestConversion(t, e) {
        switch (t.type) {
          case "ParenthesizedExpression":
            this.checkToRestConversion(t.expression, e);
            break;
          case "Identifier":
          case "MemberExpression":
            break;
          case "ArrayExpression":
          case "ObjectExpression":
            if (e) break;
          default:
            this.raise(p.InvalidRestAssignmentPattern, t);
        }
      }
      checkCommaAfterRest(t) {
        return this.match(12) ? (this.raise(this.lookaheadCharCode() === t ? p.RestTrailingComma : p.ElementAfterRest, this.state.startLoc), true) : false;
      }
    };
    function Cr(a) {
      if (a == null) throw new Error(`Unexpected ${a} value.`);
      return a;
    }
    function Ps(a) {
      if (!a) throw new Error("Assert fail");
    }
    var y = F`typescript`({ AbstractMethodHasImplementation: ({ methodName: a }) => `Method '${a}' cannot have an implementation because it is marked abstract.`, AbstractPropertyHasInitializer: ({ propertyName: a }) => `Property '${a}' cannot have an initializer because it is marked abstract.`, AccessorCannotBeOptional: "An 'accessor' property cannot be declared optional.", AccessorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.", AccessorCannotHaveTypeParameters: "An accessor cannot have type parameters.", ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.", ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.", ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.", ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.", DeclareAccessor: ({ kind: a }) => `'declare' is not allowed in ${a}ters.`, DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.", DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.", DuplicateAccessibilityModifier: ({ modifier: a }) => `Accessibility modifier already seen: '${a}'.`, DuplicateModifier: ({ modifier: a }) => `Duplicate modifier: '${a}'.`, EmptyHeritageClauseType: ({ token: a }) => `'${a}' list cannot be empty.`, EmptyTypeArguments: "Type argument list cannot be empty.", EmptyTypeParameters: "Type parameter list cannot be empty.", ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.", ImportAliasHasImportType: "An import alias can not use 'import type'.", ImportReflectionHasImportType: "An `import module` declaration can not use `type` modifier", IncompatibleModifiers: ({ modifiers: a }) => `'${a[0]}' modifier cannot be used with '${a[1]}' modifier.`, IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.", IndexSignatureHasAccessibility: ({ modifier: a }) => `Index signatures cannot have an accessibility modifier ('${a}').`, IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.", IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.", IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.", InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.", InvalidHeritageClauseType: ({ token: a }) => `'${a}' list can only include identifiers or qualified-names with optional type arguments.`, InvalidModifierOnAwaitUsingDeclaration: (a) => `'${a}' modifier cannot appear on an await using declaration.`, InvalidModifierOnTypeMember: ({ modifier: a }) => `'${a}' modifier cannot appear on a type member.`, InvalidModifierOnTypeParameter: ({ modifier: a }) => `'${a}' modifier cannot appear on a type parameter.`, InvalidModifierOnTypeParameterPositions: ({ modifier: a }) => `'${a}' modifier can only appear on a type parameter of a class, interface or type alias.`, InvalidModifierOnUsingDeclaration: (a) => `'${a}' modifier cannot appear on a using declaration.`, InvalidModifiersOrder: ({ orderedModifiers: a }) => `'${a[0]}' modifier must precede '${a[1]}' modifier.`, InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.", InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.", MissingInterfaceName: "'interface' declarations must be followed by an identifier.", NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.", NonClassMethodPropertyHasAbstractModifier: "'abstract' modifier can only appear on a class, method, or property declaration.", OptionalTypeBeforeRequired: "A required element cannot follow an optional element.", OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.", PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.", PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.", PrivateElementHasAccessibility: ({ modifier: a }) => `Private elements cannot have an accessibility modifier ('${a}').`, ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.", ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.", ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.", SetAccessorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.", SetAccessorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.", SetAccessorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.", SingleTypeParameterWithoutTrailingComma: ({ typeParameterName: a }) => `Single type parameter ${a} should have a trailing comma. Example usage: <${a},>.`, StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.", TupleOptionalAfterType: "A labeled tuple optional element must be declared using a question mark after the name and before the colon (`name?: type`), rather than after the type (`name: type?`).", TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.", TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.", TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.", TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.", UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.", UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.", UnexpectedTypeAnnotation: "Did not expect a type annotation here.", UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.", UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.", UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.", UnsupportedSignatureParameterKind: ({ type: a }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${a}.`, UsingDeclarationInAmbientContext: (a) => `'${a}' declarations are not allowed in ambient contexts.` });
    function wr(a) {
      switch (a) {
        case "any":
          return "TSAnyKeyword";
        case "boolean":
          return "TSBooleanKeyword";
        case "bigint":
          return "TSBigIntKeyword";
        case "never":
          return "TSNeverKeyword";
        case "number":
          return "TSNumberKeyword";
        case "object":
          return "TSObjectKeyword";
        case "string":
          return "TSStringKeyword";
        case "symbol":
          return "TSSymbolKeyword";
        case "undefined":
          return "TSUndefinedKeyword";
        case "unknown":
          return "TSUnknownKeyword";
        default:
          return;
      }
    }
    function gs(a) {
      return a === "private" || a === "public" || a === "protected";
    }
    function Ir(a) {
      return a === "in" || a === "out";
    }
    var Nr = (a) => class extends a {
      constructor(...e) {
        super(...e), this.tsParseInOutModifiers = this.tsParseModifiers.bind(this, { allowedModifiers: ["in", "out"], disallowedModifiers: ["const", "public", "private", "protected", "readonly", "declare", "abstract", "override"], errorTemplate: y.InvalidModifierOnTypeParameter }), this.tsParseConstModifier = this.tsParseModifiers.bind(this, { allowedModifiers: ["const"], disallowedModifiers: ["in", "out"], errorTemplate: y.InvalidModifierOnTypeParameterPositions }), this.tsParseInOutConstModifiers = this.tsParseModifiers.bind(this, { allowedModifiers: ["in", "out", "const"], disallowedModifiers: ["public", "private", "protected", "readonly", "declare", "abstract", "override"], errorTemplate: y.InvalidModifierOnTypeParameter });
      }
      getScopeHandler() {
        return Xe;
      }
      tsIsIdentifier() {
        return w(this.state.type);
      }
      tsTokenCanFollowModifier() {
        return this.match(0) || this.match(5) || this.match(55) || this.match(21) || this.match(139) || this.isLiteralPropertyName();
      }
      tsNextTokenOnSameLineAndCanFollowModifier() {
        return this.next(), this.hasPrecedingLineBreak() ? false : this.tsTokenCanFollowModifier();
      }
      tsNextTokenCanFollowModifier() {
        return this.match(106) ? (this.next(), this.tsTokenCanFollowModifier()) : this.tsNextTokenOnSameLineAndCanFollowModifier();
      }
      tsParseModifier(e, s, i) {
        if (!w(this.state.type) && this.state.type !== 58 && this.state.type !== 75) return;
        let r = this.state.value;
        if (e.includes(r)) {
          if (i && this.match(106) || s && this.tsIsStartOfStaticBlocks()) return;
          if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) return r;
        }
      }
      tsParseModifiers({ allowedModifiers: e, disallowedModifiers: s, stopOnStartOfClassStaticBlock: i, errorTemplate: r = y.InvalidModifierOnTypeMember }, n) {
        let o = (h, c, u, f) => {
          c === u && n[f] && this.raise(y.InvalidModifiersOrder, h, { orderedModifiers: [u, f] });
        }, l = (h, c, u, f) => {
          (n[u] && c === f || n[f] && c === u) && this.raise(y.IncompatibleModifiers, h, { modifiers: [u, f] });
        };
        for (; ; ) {
          let { startLoc: h } = this.state, c = this.tsParseModifier(e.concat(s ?? []), i, n.static);
          if (!c) break;
          gs(c) ? n.accessibility ? this.raise(y.DuplicateAccessibilityModifier, h, { modifier: c }) : (o(h, c, c, "override"), o(h, c, c, "static"), o(h, c, c, "readonly"), n.accessibility = c) : Ir(c) ? (n[c] && this.raise(y.DuplicateModifier, h, { modifier: c }), n[c] = true, o(h, c, "in", "out")) : (hasOwnProperty.call(n, c) ? this.raise(y.DuplicateModifier, h, { modifier: c }) : (o(h, c, "static", "readonly"), o(h, c, "static", "override"), o(h, c, "override", "readonly"), o(h, c, "abstract", "override"), l(h, c, "declare", "override"), l(h, c, "static", "abstract")), n[c] = true), s != null && s.includes(c) && this.raise(r, h, { modifier: c });
        }
      }
      tsIsListTerminator(e) {
        switch (e) {
          case "EnumMembers":
          case "TypeMembers":
            return this.match(8);
          case "HeritageClauseElement":
            return this.match(5);
          case "TupleElementTypes":
            return this.match(3);
          case "TypeParametersOrArguments":
            return this.match(48);
        }
      }
      tsParseList(e, s) {
        let i = [];
        for (; !this.tsIsListTerminator(e); ) i.push(s());
        return i;
      }
      tsParseDelimitedList(e, s, i) {
        return Cr(this.tsParseDelimitedListWorker(e, s, true, i));
      }
      tsParseDelimitedListWorker(e, s, i, r) {
        let n = [], o = -1;
        for (; !this.tsIsListTerminator(e); ) {
          o = -1;
          let l = s();
          if (l == null) return;
          if (n.push(l), this.eat(12)) {
            o = this.state.lastTokStartLoc.index;
            continue;
          }
          if (this.tsIsListTerminator(e)) break;
          i && this.expect(12);
          return;
        }
        return r && (r.value = o), n;
      }
      tsParseBracketedList(e, s, i, r, n) {
        r || (i ? this.expect(0) : this.expect(47));
        let o = this.tsParseDelimitedList(e, s, n);
        return i ? this.expect(3) : this.expect(48), o;
      }
      tsParseImportType() {
        let e = this.startNode();
        return this.expect(83), this.expect(10), this.match(134) ? e.argument = this.parseStringLiteral(this.state.value) : (this.raise(y.UnsupportedImportTypeArgument, this.state.startLoc), e.argument = super.parseExprAtom()), this.eat(12) ? e.options = this.tsParseImportTypeOptions() : e.options = null, this.expect(11), this.eat(16) && (e.qualifier = this.tsParseEntityName(3)), this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSImportType");
      }
      tsParseImportTypeOptions() {
        let e = this.startNode();
        this.expect(5);
        let s = this.startNode();
        return this.isContextual(76) ? (s.method = false, s.key = this.parseIdentifier(true), s.computed = false, s.shorthand = false) : this.unexpected(null, 76), this.expect(14), s.value = this.tsParseImportTypeWithPropertyValue(), e.properties = [this.finishObjectProperty(s)], this.expect(8), this.finishNode(e, "ObjectExpression");
      }
      tsParseImportTypeWithPropertyValue() {
        let e = this.startNode(), s = [];
        for (this.expect(5); !this.match(8); ) {
          let i = this.state.type;
          w(i) || i === 134 ? s.push(super.parsePropertyDefinition(null)) : this.unexpected(), this.eat(12);
        }
        return e.properties = s, this.next(), this.finishNode(e, "ObjectExpression");
      }
      tsParseEntityName(e) {
        let s;
        if (e & 1 && this.match(78)) if (e & 2) s = this.parseIdentifier(true);
        else {
          let i = this.startNode();
          this.next(), s = this.finishNode(i, "ThisExpression");
        }
        else s = this.parseIdentifier(!!(e & 1));
        for (; this.eat(16); ) {
          let i = this.startNodeAtNode(s);
          i.left = s, i.right = this.parseIdentifier(!!(e & 1)), s = this.finishNode(i, "TSQualifiedName");
        }
        return s;
      }
      tsParseTypeReference() {
        let e = this.startNode();
        return e.typeName = this.tsParseEntityName(1), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeReference");
      }
      tsParseThisTypePredicate(e) {
        this.next();
        let s = this.startNodeAtNode(e);
        return s.parameterName = e, s.typeAnnotation = this.tsParseTypeAnnotation(false), s.asserts = false, this.finishNode(s, "TSTypePredicate");
      }
      tsParseThisTypeNode() {
        let e = this.startNode();
        return this.next(), this.finishNode(e, "TSThisType");
      }
      tsParseTypeQuery() {
        let e = this.startNode();
        return this.expect(87), this.match(83) ? e.exprName = this.tsParseImportType() : e.exprName = this.tsParseEntityName(3), !this.hasPrecedingLineBreak() && this.match(47) && (e.typeParameters = this.tsParseTypeArguments()), this.finishNode(e, "TSTypeQuery");
      }
      tsParseTypeParameter(e) {
        let s = this.startNode();
        return e(s), s.name = this.tsParseTypeParameterName(), s.constraint = this.tsEatThenParseType(81), s.default = this.tsEatThenParseType(29), this.finishNode(s, "TSTypeParameter");
      }
      tsTryParseTypeParameters(e) {
        if (this.match(47)) return this.tsParseTypeParameters(e);
      }
      tsParseTypeParameters(e) {
        let s = this.startNode();
        this.match(47) || this.match(143) ? this.next() : this.unexpected();
        let i = { value: -1 };
        return s.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, e), false, true, i), s.params.length === 0 && this.raise(y.EmptyTypeParameters, s), i.value !== -1 && this.addExtra(s, "trailingComma", i.value), this.finishNode(s, "TSTypeParameterDeclaration");
      }
      tsFillSignature(e, s) {
        let i = e === 19, r = "parameters", n = "typeAnnotation";
        s.typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier), this.expect(10), s[r] = this.tsParseBindingListForSignature(), i ? s[n] = this.tsParseTypeOrTypePredicateAnnotation(e) : this.match(e) && (s[n] = this.tsParseTypeOrTypePredicateAnnotation(e));
      }
      tsParseBindingListForSignature() {
        let e = super.parseBindingList(11, 41, 2);
        for (let s of e) {
          let { type: i } = s;
          (i === "AssignmentPattern" || i === "TSParameterProperty") && this.raise(y.UnsupportedSignatureParameterKind, s, { type: i });
        }
        return e;
      }
      tsParseTypeMemberSemicolon() {
        !this.eat(12) && !this.isLineTerminator() && this.expect(13);
      }
      tsParseSignatureMember(e, s) {
        return this.tsFillSignature(14, s), this.tsParseTypeMemberSemicolon(), this.finishNode(s, e);
      }
      tsIsUnambiguouslyIndexSignature() {
        return this.next(), w(this.state.type) ? (this.next(), this.match(14)) : false;
      }
      tsTryParseIndexSignature(e) {
        if (!(this.match(0) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))) return;
        this.expect(0);
        let s = this.parseIdentifier();
        s.typeAnnotation = this.tsParseTypeAnnotation(), this.resetEndLocation(s), this.expect(3), e.parameters = [s];
        let i = this.tsTryParseTypeAnnotation();
        return i && (e.typeAnnotation = i), this.tsParseTypeMemberSemicolon(), this.finishNode(e, "TSIndexSignature");
      }
      tsParsePropertyOrMethodSignature(e, s) {
        if (this.eat(17) && (e.optional = true), this.match(10) || this.match(47)) {
          s && this.raise(y.ReadonlyForMethodSignature, e);
          let i = e;
          i.kind && this.match(47) && this.raise(y.AccessorCannotHaveTypeParameters, this.state.curPosition()), this.tsFillSignature(14, i), this.tsParseTypeMemberSemicolon();
          let r = "parameters", n = "typeAnnotation";
          if (i.kind === "get") i[r].length > 0 && (this.raise(p.BadGetterArity, this.state.curPosition()), this.isThisParam(i[r][0]) && this.raise(y.AccessorCannotDeclareThisParameter, this.state.curPosition()));
          else if (i.kind === "set") {
            if (i[r].length !== 1) this.raise(p.BadSetterArity, this.state.curPosition());
            else {
              let o = i[r][0];
              this.isThisParam(o) && this.raise(y.AccessorCannotDeclareThisParameter, this.state.curPosition()), o.type === "Identifier" && o.optional && this.raise(y.SetAccessorCannotHaveOptionalParameter, this.state.curPosition()), o.type === "RestElement" && this.raise(y.SetAccessorCannotHaveRestParameter, this.state.curPosition());
            }
            i[n] && this.raise(y.SetAccessorCannotHaveReturnType, i[n]);
          } else i.kind = "method";
          return this.finishNode(i, "TSMethodSignature");
        } else {
          let i = e;
          s && (i.readonly = true);
          let r = this.tsTryParseTypeAnnotation();
          return r && (i.typeAnnotation = r), this.tsParseTypeMemberSemicolon(), this.finishNode(i, "TSPropertySignature");
        }
      }
      tsParseTypeMember() {
        let e = this.startNode();
        if (this.match(10) || this.match(47)) return this.tsParseSignatureMember("TSCallSignatureDeclaration", e);
        if (this.match(77)) {
          let i = this.startNode();
          return this.next(), this.match(10) || this.match(47) ? this.tsParseSignatureMember("TSConstructSignatureDeclaration", e) : (e.key = this.createIdentifier(i, "new"), this.tsParsePropertyOrMethodSignature(e, false));
        }
        this.tsParseModifiers({ allowedModifiers: ["readonly"], disallowedModifiers: ["declare", "abstract", "private", "protected", "public", "static", "override"] }, e);
        let s = this.tsTryParseIndexSignature(e);
        return s || (super.parsePropertyName(e), !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.tsTokenCanFollowModifier() && (e.kind = e.key.name, super.parsePropertyName(e), !this.match(10) && !this.match(47) && this.unexpected(null, 10)), this.tsParsePropertyOrMethodSignature(e, !!e.readonly));
      }
      tsParseTypeLiteral() {
        let e = this.startNode();
        return e.members = this.tsParseObjectTypeMembers(), this.finishNode(e, "TSTypeLiteral");
      }
      tsParseObjectTypeMembers() {
        this.expect(5);
        let e = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
        return this.expect(8), e;
      }
      tsIsStartOfMappedType() {
        return this.next(), this.eat(53) ? this.isContextual(122) : (this.isContextual(122) && this.next(), !this.match(0) || (this.next(), !this.tsIsIdentifier()) ? false : (this.next(), this.match(58)));
      }
      tsParseMappedType() {
        let e = this.startNode();
        this.expect(5), this.match(53) ? (e.readonly = this.state.value, this.next(), this.expectContextual(122)) : this.eatContextual(122) && (e.readonly = true), this.expect(0);
        {
          let s = this.startNode();
          s.name = this.tsParseTypeParameterName(), s.constraint = this.tsExpectThenParseType(58), e.typeParameter = this.finishNode(s, "TSTypeParameter");
        }
        return e.nameType = this.eatContextual(93) ? this.tsParseType() : null, this.expect(3), this.match(53) ? (e.optional = this.state.value, this.next(), this.expect(17)) : this.eat(17) && (e.optional = true), e.typeAnnotation = this.tsTryParseType(), this.semicolon(), this.expect(8), this.finishNode(e, "TSMappedType");
      }
      tsParseTupleType() {
        let e = this.startNode();
        e.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), true, false);
        let s = false;
        return e.elementTypes.forEach((i) => {
          let { type: r } = i;
          s && r !== "TSRestType" && r !== "TSOptionalType" && !(r === "TSNamedTupleMember" && i.optional) && this.raise(y.OptionalTypeBeforeRequired, i), s || (s = r === "TSNamedTupleMember" && i.optional || r === "TSOptionalType");
        }), this.finishNode(e, "TSTupleType");
      }
      tsParseTupleElementType() {
        let e = this.state.startLoc, s = this.eat(21), { startLoc: i } = this.state, r, n, o, l, c = M(this.state.type) ? this.lookaheadCharCode() : null;
        if (c === 58) r = true, o = false, n = this.parseIdentifier(true), this.expect(14), l = this.tsParseType();
        else if (c === 63) {
          o = true;
          let u = this.state.value, f = this.tsParseNonArrayType();
          this.lookaheadCharCode() === 58 ? (r = true, n = this.createIdentifier(this.startNodeAt(i), u), this.expect(17), this.expect(14), l = this.tsParseType()) : (r = false, l = f, this.expect(17));
        } else l = this.tsParseType(), o = this.eat(17), r = this.eat(14);
        if (r) {
          let u;
          n ? (u = this.startNodeAt(i), u.optional = o, u.label = n, u.elementType = l, this.eat(17) && (u.optional = true, this.raise(y.TupleOptionalAfterType, this.state.lastTokStartLoc))) : (u = this.startNodeAt(i), u.optional = o, this.raise(y.InvalidTupleMemberLabel, l), u.label = l, u.elementType = this.tsParseType()), l = this.finishNode(u, "TSNamedTupleMember");
        } else if (o) {
          let u = this.startNodeAt(i);
          u.typeAnnotation = l, l = this.finishNode(u, "TSOptionalType");
        }
        if (s) {
          let u = this.startNodeAt(e);
          u.typeAnnotation = l, l = this.finishNode(u, "TSRestType");
        }
        return l;
      }
      tsParseParenthesizedType() {
        let e = this.startNode();
        return this.expect(10), e.typeAnnotation = this.tsParseType(), this.expect(11), this.finishNode(e, "TSParenthesizedType");
      }
      tsParseFunctionOrConstructorType(e, s) {
        let i = this.startNode();
        return e === "TSConstructorType" && (i.abstract = !!s, s && this.next(), this.next()), this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(19, i)), this.finishNode(i, e);
      }
      tsParseLiteralTypeNode() {
        let e = this.startNode();
        switch (this.state.type) {
          case 135:
          case 136:
          case 134:
          case 85:
          case 86:
            e.literal = super.parseExprAtom();
            break;
          default:
            this.unexpected();
        }
        return this.finishNode(e, "TSLiteralType");
      }
      tsParseTemplateLiteralType() {
        {
          let e = this.startNode();
          return e.literal = super.parseTemplate(false), this.finishNode(e, "TSLiteralType");
        }
      }
      parseTemplateSubstitution() {
        return this.state.inType ? this.tsParseType() : super.parseTemplateSubstitution();
      }
      tsParseThisTypeOrThisTypePredicate() {
        let e = this.tsParseThisTypeNode();
        return this.isContextual(116) && !this.hasPrecedingLineBreak() ? this.tsParseThisTypePredicate(e) : e;
      }
      tsParseNonArrayType() {
        switch (this.state.type) {
          case 134:
          case 135:
          case 136:
          case 85:
          case 86:
            return this.tsParseLiteralTypeNode();
          case 53:
            if (this.state.value === "-") {
              let e = this.startNode(), s = this.lookahead();
              return s.type !== 135 && s.type !== 136 && this.unexpected(), e.literal = this.parseMaybeUnary(), this.finishNode(e, "TSLiteralType");
            }
            break;
          case 78:
            return this.tsParseThisTypeOrThisTypePredicate();
          case 87:
            return this.tsParseTypeQuery();
          case 83:
            return this.tsParseImportType();
          case 5:
            return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
          case 0:
            return this.tsParseTupleType();
          case 10:
            return this.tsParseParenthesizedType();
          case 25:
          case 24:
            return this.tsParseTemplateLiteralType();
          default: {
            let { type: e } = this.state;
            if (w(e) || e === 88 || e === 84) {
              let s = e === 88 ? "TSVoidKeyword" : e === 84 ? "TSNullKeyword" : wr(this.state.value);
              if (s !== void 0 && this.lookaheadCharCode() !== 46) {
                let i = this.startNode();
                return this.next(), this.finishNode(i, s);
              }
              return this.tsParseTypeReference();
            }
          }
        }
        this.unexpected();
      }
      tsParseArrayTypeOrHigher() {
        let { startLoc: e } = this.state, s = this.tsParseNonArrayType();
        for (; !this.hasPrecedingLineBreak() && this.eat(0); ) if (this.match(3)) {
          let i = this.startNodeAt(e);
          i.elementType = s, this.expect(3), s = this.finishNode(i, "TSArrayType");
        } else {
          let i = this.startNodeAt(e);
          i.objectType = s, i.indexType = this.tsParseType(), this.expect(3), s = this.finishNode(i, "TSIndexedAccessType");
        }
        return s;
      }
      tsParseTypeOperator() {
        let e = this.startNode(), s = this.state.value;
        return this.next(), e.operator = s, e.typeAnnotation = this.tsParseTypeOperatorOrHigher(), s === "readonly" && this.tsCheckTypeAnnotationForReadOnly(e), this.finishNode(e, "TSTypeOperator");
      }
      tsCheckTypeAnnotationForReadOnly(e) {
        switch (e.typeAnnotation.type) {
          case "TSTupleType":
          case "TSArrayType":
            return;
          default:
            this.raise(y.UnexpectedReadonly, e);
        }
      }
      tsParseInferType() {
        let e = this.startNode();
        this.expectContextual(115);
        let s = this.startNode();
        return s.name = this.tsParseTypeParameterName(), s.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType()), e.typeParameter = this.finishNode(s, "TSTypeParameter"), this.finishNode(e, "TSInferType");
      }
      tsParseConstraintForInferType() {
        if (this.eat(81)) {
          let e = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
          if (this.state.inDisallowConditionalTypesContext || !this.match(17)) return e;
        }
      }
      tsParseTypeOperatorOrHigher() {
        return Xi(this.state.type) && !this.state.containsEsc ? this.tsParseTypeOperator() : this.isContextual(115) ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
      }
      tsParseUnionOrIntersectionType(e, s, i) {
        let r = this.startNode(), n = this.eat(i), o = [];
        do
          o.push(s());
        while (this.eat(i));
        return o.length === 1 && !n ? o[0] : (r.types = o, this.finishNode(r, e));
      }
      tsParseIntersectionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), 45);
      }
      tsParseUnionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), 43);
      }
      tsIsStartOfFunctionType() {
        return this.match(47) ? true : this.match(10) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
      }
      tsSkipParameterStart() {
        if (w(this.state.type) || this.match(78)) return this.next(), true;
        if (this.match(5)) {
          let { errors: e } = this.state, s = e.length;
          try {
            return this.parseObjectLike(8, true), e.length === s;
          } catch {
            return false;
          }
        }
        if (this.match(0)) {
          this.next();
          let { errors: e } = this.state, s = e.length;
          try {
            return super.parseBindingList(3, 93, 1), e.length === s;
          } catch {
            return false;
          }
        }
        return false;
      }
      tsIsUnambiguouslyStartOfFunctionType() {
        return this.next(), !!(this.match(11) || this.match(21) || this.tsSkipParameterStart() && (this.match(14) || this.match(12) || this.match(17) || this.match(29) || this.match(11) && (this.next(), this.match(19))));
      }
      tsParseTypeOrTypePredicateAnnotation(e) {
        return this.tsInType(() => {
          let s = this.startNode();
          this.expect(e);
          let i = this.startNode(), r = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
          if (r && this.match(78)) {
            let l = this.tsParseThisTypeOrThisTypePredicate();
            return l.type === "TSThisType" ? (i.parameterName = l, i.asserts = true, i.typeAnnotation = null, l = this.finishNode(i, "TSTypePredicate")) : (this.resetStartLocationFromNode(l, i), l.asserts = true), s.typeAnnotation = l, this.finishNode(s, "TSTypeAnnotation");
          }
          let n = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
          if (!n) return r ? (i.parameterName = this.parseIdentifier(), i.asserts = r, i.typeAnnotation = null, s.typeAnnotation = this.finishNode(i, "TSTypePredicate"), this.finishNode(s, "TSTypeAnnotation")) : this.tsParseTypeAnnotation(false, s);
          let o = this.tsParseTypeAnnotation(false);
          return i.parameterName = n, i.typeAnnotation = o, i.asserts = r, s.typeAnnotation = this.finishNode(i, "TSTypePredicate"), this.finishNode(s, "TSTypeAnnotation");
        });
      }
      tsTryParseTypeOrTypePredicateAnnotation() {
        if (this.match(14)) return this.tsParseTypeOrTypePredicateAnnotation(14);
      }
      tsTryParseTypeAnnotation() {
        if (this.match(14)) return this.tsParseTypeAnnotation();
      }
      tsTryParseType() {
        return this.tsEatThenParseType(14);
      }
      tsParseTypePredicatePrefix() {
        let e = this.parseIdentifier();
        if (this.isContextual(116) && !this.hasPrecedingLineBreak()) return this.next(), e;
      }
      tsParseTypePredicateAsserts() {
        if (this.state.type !== 109) return false;
        let e = this.state.containsEsc;
        return this.next(), !w(this.state.type) && !this.match(78) ? false : (e && this.raise(p.InvalidEscapedReservedWord, this.state.lastTokStartLoc, { reservedWord: "asserts" }), true);
      }
      tsParseTypeAnnotation(e = true, s = this.startNode()) {
        return this.tsInType(() => {
          e && this.expect(14), s.typeAnnotation = this.tsParseType();
        }), this.finishNode(s, "TSTypeAnnotation");
      }
      tsParseType() {
        Ps(this.state.inType);
        let e = this.tsParseNonConditionalType();
        if (this.state.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(81)) return e;
        let s = this.startNodeAtNode(e);
        return s.checkType = e, s.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType()), this.expect(17), s.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.expect(14), s.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType()), this.finishNode(s, "TSConditionalType");
      }
      isAbstractConstructorSignature() {
        return this.isContextual(124) && this.isLookaheadContextual("new");
      }
      tsParseNonConditionalType() {
        return this.tsIsStartOfFunctionType() ? this.tsParseFunctionOrConstructorType("TSFunctionType") : this.match(77) ? this.tsParseFunctionOrConstructorType("TSConstructorType") : this.isAbstractConstructorSignature() ? this.tsParseFunctionOrConstructorType("TSConstructorType", true) : this.tsParseUnionTypeOrHigher();
      }
      tsParseTypeAssertion() {
        this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(y.ReservedTypeAssertion, this.state.startLoc);
        let e = this.startNode();
        return e.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? this.tsParseTypeReference() : this.tsParseType())), this.expect(48), e.expression = this.parseMaybeUnary(), this.finishNode(e, "TSTypeAssertion");
      }
      tsParseHeritageClause(e) {
        let s = this.state.startLoc, i = this.tsParseDelimitedList("HeritageClauseElement", () => {
          {
            let r = this.startNode();
            return r.expression = this.tsParseEntityName(3), this.match(47) && (r.typeParameters = this.tsParseTypeArguments()), this.finishNode(r, "TSExpressionWithTypeArguments");
          }
        });
        return i.length || this.raise(y.EmptyHeritageClauseType, s, { token: e }), i;
      }
      tsParseInterfaceDeclaration(e, s = {}) {
        if (this.hasFollowingLineBreak()) return null;
        this.expectContextual(129), s.declare && (e.declare = true), w(this.state.type) ? (e.id = this.parseIdentifier(), this.checkIdentifier(e.id, 130)) : (e.id = null, this.raise(y.MissingInterfaceName, this.state.startLoc)), e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers), this.eat(81) && (e.extends = this.tsParseHeritageClause("extends"));
        let i = this.startNode();
        return i.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this)), e.body = this.finishNode(i, "TSInterfaceBody"), this.finishNode(e, "TSInterfaceDeclaration");
      }
      tsParseTypeAliasDeclaration(e) {
        return e.id = this.parseIdentifier(), this.checkIdentifier(e.id, 2), e.typeAnnotation = this.tsInType(() => {
          if (e.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers), this.expect(29), this.isContextual(114) && this.lookaheadCharCode() !== 46) {
            let s = this.startNode();
            return this.next(), this.finishNode(s, "TSIntrinsicKeyword");
          }
          return this.tsParseType();
        }), this.semicolon(), this.finishNode(e, "TSTypeAliasDeclaration");
      }
      tsInTopLevelContext(e) {
        if (this.curContext() !== C.brace) {
          let s = this.state.context;
          this.state.context = [s[0]];
          try {
            return e();
          } finally {
            this.state.context = s;
          }
        } else return e();
      }
      tsInType(e) {
        let s = this.state.inType;
        this.state.inType = true;
        try {
          return e();
        } finally {
          this.state.inType = s;
        }
      }
      tsInDisallowConditionalTypesContext(e) {
        let s = this.state.inDisallowConditionalTypesContext;
        this.state.inDisallowConditionalTypesContext = true;
        try {
          return e();
        } finally {
          this.state.inDisallowConditionalTypesContext = s;
        }
      }
      tsInAllowConditionalTypesContext(e) {
        let s = this.state.inDisallowConditionalTypesContext;
        this.state.inDisallowConditionalTypesContext = false;
        try {
          return e();
        } finally {
          this.state.inDisallowConditionalTypesContext = s;
        }
      }
      tsEatThenParseType(e) {
        if (this.match(e)) return this.tsNextThenParseType();
      }
      tsExpectThenParseType(e) {
        return this.tsInType(() => (this.expect(e), this.tsParseType()));
      }
      tsNextThenParseType() {
        return this.tsInType(() => (this.next(), this.tsParseType()));
      }
      tsParseEnumMember() {
        let e = this.startNode();
        return e.id = this.match(134) ? super.parseStringLiteral(this.state.value) : this.parseIdentifier(true), this.eat(29) && (e.initializer = super.parseMaybeAssignAllowIn()), this.finishNode(e, "TSEnumMember");
      }
      tsParseEnumDeclaration(e, s = {}) {
        return s.const && (e.const = true), s.declare && (e.declare = true), this.expectContextual(126), e.id = this.parseIdentifier(), this.checkIdentifier(e.id, e.const ? 8971 : 8459), this.expect(5), e.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(8), this.finishNode(e, "TSEnumDeclaration");
      }
      tsParseEnumBody() {
        let e = this.startNode();
        return this.expect(5), e.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this)), this.expect(8), this.finishNode(e, "TSEnumBody");
      }
      tsParseModuleBlock() {
        let e = this.startNode();
        return this.scope.enter(0), this.expect(5), super.parseBlockOrModuleBlockBody(e.body = [], void 0, true, 8), this.scope.exit(), this.finishNode(e, "TSModuleBlock");
      }
      tsParseModuleOrNamespaceDeclaration(e, s = false) {
        if (e.id = this.parseIdentifier(), s || this.checkIdentifier(e.id, 1024), this.eat(16)) {
          let i = this.startNode();
          this.tsParseModuleOrNamespaceDeclaration(i, true), e.body = i;
        } else this.scope.enter(1024), this.prodParam.enter(0), e.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit();
        return this.finishNode(e, "TSModuleDeclaration");
      }
      tsParseAmbientExternalModuleDeclaration(e) {
        return this.isContextual(112) ? (e.kind = "global", e.global = true, e.id = this.parseIdentifier()) : this.match(134) ? (e.kind = "module", e.id = super.parseStringLiteral(this.state.value)) : this.unexpected(), this.match(5) ? (this.scope.enter(1024), this.prodParam.enter(0), e.body = this.tsParseModuleBlock(), this.prodParam.exit(), this.scope.exit()) : this.semicolon(), this.finishNode(e, "TSModuleDeclaration");
      }
      tsParseImportEqualsDeclaration(e, s, i) {
        e.isExport = i || false, e.id = s || this.parseIdentifier(), this.checkIdentifier(e.id, 4096), this.expect(29);
        let r = this.tsParseModuleReference();
        return e.importKind === "type" && r.type !== "TSExternalModuleReference" && this.raise(y.ImportAliasHasImportType, r), e.moduleReference = r, this.semicolon(), this.finishNode(e, "TSImportEqualsDeclaration");
      }
      tsIsExternalModuleReference() {
        return this.isContextual(119) && this.lookaheadCharCode() === 40;
      }
      tsParseModuleReference() {
        return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(0);
      }
      tsParseExternalModuleReference() {
        let e = this.startNode();
        return this.expectContextual(119), this.expect(10), this.match(134) || this.unexpected(), e.expression = super.parseExprAtom(), this.expect(11), this.sawUnambiguousESM = true, this.finishNode(e, "TSExternalModuleReference");
      }
      tsLookAhead(e) {
        let s = this.state.clone(), i = e();
        return this.state = s, i;
      }
      tsTryParseAndCatch(e) {
        let s = this.tryParse((i) => e() || i());
        if (!(s.aborted || !s.node)) return s.error && (this.state = s.failState), s.node;
      }
      tsTryParse(e) {
        let s = this.state.clone(), i = e();
        if (i !== void 0 && i !== false) return i;
        this.state = s;
      }
      tsTryParseDeclare(e) {
        if (this.isLineTerminator()) return;
        let s = this.state.type;
        return this.tsInAmbientContext(() => {
          switch (s) {
            case 68:
              return e.declare = true, super.parseFunctionStatement(e, false, false);
            case 80:
              return e.declare = true, this.parseClass(e, true, false);
            case 126:
              return this.tsParseEnumDeclaration(e, { declare: true });
            case 112:
              return this.tsParseAmbientExternalModuleDeclaration(e);
            case 100:
              if (this.state.containsEsc) return;
            case 75:
            case 74:
              return !this.match(75) || !this.isLookaheadContextual("enum") ? (e.declare = true, this.parseVarStatement(e, this.state.value, true)) : (this.expect(75), this.tsParseEnumDeclaration(e, { const: true, declare: true }));
            case 107:
              if (this.hasPlugin("explicitResourceManagement") && this.isUsing()) return this.raise(y.InvalidModifierOnUsingDeclaration, this.state.startLoc, "declare"), e.declare = true, this.parseVarStatement(e, "using", true);
              break;
            case 96:
              if (this.hasPlugin("explicitResourceManagement") && this.isAwaitUsing()) return this.raise(y.InvalidModifierOnAwaitUsingDeclaration, this.state.startLoc, "declare"), e.declare = true, this.next(), this.parseVarStatement(e, "await using", true);
              break;
            case 129: {
              let i = this.tsParseInterfaceDeclaration(e, { declare: true });
              if (i) return i;
            }
            default:
              if (w(s)) return this.tsParseDeclaration(e, this.state.value, true, null);
          }
        });
      }
      tsTryParseExportDeclaration() {
        return this.tsParseDeclaration(this.startNode(), this.state.value, true, null);
      }
      tsParseExpressionStatement(e, s, i) {
        switch (s.name) {
          case "declare": {
            let r = this.tsTryParseDeclare(e);
            return r && (r.declare = true), r;
          }
          case "global":
            if (this.match(5)) {
              this.scope.enter(1024), this.prodParam.enter(0);
              let r = e;
              return r.kind = "global", e.global = true, r.id = s, r.body = this.tsParseModuleBlock(), this.scope.exit(), this.prodParam.exit(), this.finishNode(r, "TSModuleDeclaration");
            }
            break;
          default:
            return this.tsParseDeclaration(e, s.name, false, i);
        }
      }
      tsParseDeclaration(e, s, i, r) {
        switch (s) {
          case "abstract":
            if (this.tsCheckLineTerminator(i) && (this.match(80) || w(this.state.type))) return this.tsParseAbstractDeclaration(e, r);
            break;
          case "module":
            if (this.tsCheckLineTerminator(i)) {
              if (this.match(134)) return this.tsParseAmbientExternalModuleDeclaration(e);
              if (w(this.state.type)) return e.kind = "module", this.tsParseModuleOrNamespaceDeclaration(e);
            }
            break;
          case "namespace":
            if (this.tsCheckLineTerminator(i) && w(this.state.type)) return e.kind = "namespace", this.tsParseModuleOrNamespaceDeclaration(e);
            break;
          case "type":
            if (this.tsCheckLineTerminator(i) && w(this.state.type)) return this.tsParseTypeAliasDeclaration(e);
            break;
        }
      }
      tsCheckLineTerminator(e) {
        return e ? this.hasFollowingLineBreak() ? false : (this.next(), true) : !this.isLineTerminator();
      }
      tsTryParseGenericAsyncArrowFunction(e) {
        if (!this.match(47)) return;
        let s = this.state.maybeInArrowParameters;
        this.state.maybeInArrowParameters = true;
        let i = this.tsTryParseAndCatch(() => {
          let r = this.startNodeAt(e);
          return r.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier), super.parseFunctionParams(r), r.returnType = this.tsTryParseTypeOrTypePredicateAnnotation(), this.expect(19), r;
        });
        if (this.state.maybeInArrowParameters = s, !!i) return super.parseArrowExpression(i, null, true);
      }
      tsParseTypeArgumentsInExpression() {
        if (this.reScan_lt() === 47) return this.tsParseTypeArguments();
      }
      tsParseTypeArguments() {
        let e = this.startNode();
        return e.params = this.tsInType(() => this.tsInTopLevelContext(() => (this.expect(47), this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this))))), e.params.length === 0 ? this.raise(y.EmptyTypeArguments, e) : !this.state.inType && this.curContext() === C.brace && this.reScan_lt_gt(), this.expect(48), this.finishNode(e, "TSTypeParameterInstantiation");
      }
      tsIsDeclarationStart() {
        return Gi(this.state.type);
      }
      isExportDefaultSpecifier() {
        return this.tsIsDeclarationStart() ? false : super.isExportDefaultSpecifier();
      }
      parseBindingElement(e, s) {
        let i = s.length ? s[0].loc.start : this.state.startLoc, r = {};
        this.tsParseModifiers({ allowedModifiers: ["public", "private", "protected", "override", "readonly"] }, r);
        let n = r.accessibility, o = r.override, l = r.readonly;
        !(e & 4) && (n || l || o) && this.raise(y.UnexpectedParameterModifier, i);
        let h = this.parseMaybeDefault();
        e & 2 && this.parseFunctionParamType(h);
        let c = this.parseMaybeDefault(h.loc.start, h);
        if (n || l || o) {
          let u = this.startNodeAt(i);
          return s.length && (u.decorators = s), n && (u.accessibility = n), l && (u.readonly = l), o && (u.override = o), c.type !== "Identifier" && c.type !== "AssignmentPattern" && this.raise(y.UnsupportedParameterPropertyKind, u), u.parameter = c, this.finishNode(u, "TSParameterProperty");
        }
        return s.length && (h.decorators = s), c;
      }
      isSimpleParameter(e) {
        return e.type === "TSParameterProperty" && super.isSimpleParameter(e.parameter) || super.isSimpleParameter(e);
      }
      tsDisallowOptionalPattern(e) {
        for (let s of e.params) s.type !== "Identifier" && s.optional && !this.state.isAmbientContext && this.raise(y.PatternIsOptional, s);
      }
      setArrowFunctionParameters(e, s, i) {
        super.setArrowFunctionParameters(e, s, i), this.tsDisallowOptionalPattern(e);
      }
      parseFunctionBodyAndFinish(e, s, i = false) {
        this.match(14) && (e.returnType = this.tsParseTypeOrTypePredicateAnnotation(14));
        let r = s === "FunctionDeclaration" ? "TSDeclareFunction" : s === "ClassMethod" || s === "ClassPrivateMethod" ? "TSDeclareMethod" : void 0;
        return r && !this.match(5) && this.isLineTerminator() ? this.finishNode(e, r) : r === "TSDeclareFunction" && this.state.isAmbientContext && (this.raise(y.DeclareFunctionHasImplementation, e), e.declare) ? super.parseFunctionBodyAndFinish(e, r, i) : (this.tsDisallowOptionalPattern(e), super.parseFunctionBodyAndFinish(e, s, i));
      }
      registerFunctionStatementId(e) {
        !e.body && e.id ? this.checkIdentifier(e.id, 1024) : super.registerFunctionStatementId(e);
      }
      tsCheckForInvalidTypeCasts(e) {
        e.forEach((s) => {
          (s == null ? void 0 : s.type) === "TSTypeCastExpression" && this.raise(y.UnexpectedTypeAnnotation, s.typeAnnotation);
        });
      }
      toReferencedList(e, s) {
        return this.tsCheckForInvalidTypeCasts(e), e;
      }
      parseArrayLike(e, s, i, r) {
        let n = super.parseArrayLike(e, s, i, r);
        return n.type === "ArrayExpression" && this.tsCheckForInvalidTypeCasts(n.elements), n;
      }
      parseSubscript(e, s, i, r) {
        if (!this.hasPrecedingLineBreak() && this.match(35)) {
          this.state.canStartJSXElement = false, this.next();
          let o = this.startNodeAt(s);
          return o.expression = e, this.finishNode(o, "TSNonNullExpression");
        }
        let n = false;
        if (this.match(18) && this.lookaheadCharCode() === 60) {
          if (i) return r.stop = true, e;
          r.optionalChainMember = n = true, this.next();
        }
        if (this.match(47) || this.match(51)) {
          let o, l = this.tsTryParseAndCatch(() => {
            if (!i && this.atPossibleAsyncArrow(e)) {
              let f = this.tsTryParseGenericAsyncArrowFunction(s);
              if (f) return f;
            }
            let h = this.tsParseTypeArgumentsInExpression();
            if (!h) return;
            if (n && !this.match(10)) {
              o = this.state.curPosition();
              return;
            }
            if (Ie(this.state.type)) {
              let f = super.parseTaggedTemplateExpression(e, s, r);
              return f.typeParameters = h, f;
            }
            if (!i && this.eat(10)) {
              let f = this.startNodeAt(s);
              return f.callee = e, f.arguments = this.parseCallExpressionArguments(11), this.tsCheckForInvalidTypeCasts(f.arguments), f.typeParameters = h, r.optionalChainMember && (f.optional = n), this.finishCallExpression(f, r.optionalChainMember);
            }
            let c = this.state.type;
            if (c === 48 || c === 52 || c !== 10 && ue(c) && !this.hasPrecedingLineBreak()) return;
            let u = this.startNodeAt(s);
            return u.expression = e, u.typeParameters = h, this.finishNode(u, "TSInstantiationExpression");
          });
          if (o && this.unexpected(o, 10), l) return l.type === "TSInstantiationExpression" && ((this.match(16) || this.match(18) && this.lookaheadCharCode() !== 40) && this.raise(y.InvalidPropertyAccessAfterInstantiationExpression, this.state.startLoc), !this.match(16) && !this.match(18) && (l.expression = super.stopParseSubscript(e, r))), l;
        }
        return super.parseSubscript(e, s, i, r);
      }
      parseNewCallee(e) {
        var s;
        super.parseNewCallee(e);
        let { callee: i } = e;
        i.type === "TSInstantiationExpression" && !((s = i.extra) != null && s.parenthesized) && (e.typeParameters = i.typeParameters, e.callee = i.expression);
      }
      parseExprOp(e, s, i) {
        let r;
        if (Ee(58) > i && !this.hasPrecedingLineBreak() && (this.isContextual(93) || (r = this.isContextual(120)))) {
          let n = this.startNodeAt(s);
          return n.expression = e, n.typeAnnotation = this.tsInType(() => (this.next(), this.match(75) ? (r && this.raise(p.UnexpectedKeyword, this.state.startLoc, { keyword: "const" }), this.tsParseTypeReference()) : this.tsParseType())), this.finishNode(n, r ? "TSSatisfiesExpression" : "TSAsExpression"), this.reScan_lt_gt(), this.parseExprOp(n, s, i);
        }
        return super.parseExprOp(e, s, i);
      }
      checkReservedWord(e, s, i, r) {
        this.state.isAmbientContext || super.checkReservedWord(e, s, i, r);
      }
      checkImportReflection(e) {
        super.checkImportReflection(e), e.module && e.importKind !== "value" && this.raise(y.ImportReflectionHasImportType, e.specifiers[0].loc.start);
      }
      checkDuplicateExports() {
      }
      isPotentialImportPhase(e) {
        if (super.isPotentialImportPhase(e)) return true;
        if (this.isContextual(130)) {
          let s = this.lookaheadCharCode();
          return e ? s === 123 || s === 42 : s !== 61;
        }
        return !e && this.isContextual(87);
      }
      applyImportPhase(e, s, i, r) {
        super.applyImportPhase(e, s, i, r), s ? e.exportKind = i === "type" ? "type" : "value" : e.importKind = i === "type" || i === "typeof" ? i : "value";
      }
      parseImport(e) {
        if (this.match(134)) return e.importKind = "value", super.parseImport(e);
        let s;
        if (w(this.state.type) && this.lookaheadCharCode() === 61) return e.importKind = "value", this.tsParseImportEqualsDeclaration(e);
        if (this.isContextual(130)) {
          let i = this.parseMaybeImportPhase(e, false);
          if (this.lookaheadCharCode() === 61) return this.tsParseImportEqualsDeclaration(e, i);
          s = super.parseImportSpecifiersAndAfter(e, i);
        } else s = super.parseImport(e);
        return s.importKind === "type" && s.specifiers.length > 1 && s.specifiers[0].type === "ImportDefaultSpecifier" && this.raise(y.TypeImportCannotSpecifyDefaultAndNamed, s), s;
      }
      parseExport(e, s) {
        if (this.match(83)) {
          let i = e;
          this.next();
          let r = null;
          return this.isContextual(130) && this.isPotentialImportPhase(false) ? r = this.parseMaybeImportPhase(i, false) : i.importKind = "value", this.tsParseImportEqualsDeclaration(i, r, true);
        } else if (this.eat(29)) {
          let i = e;
          return i.expression = super.parseExpression(), this.semicolon(), this.sawUnambiguousESM = true, this.finishNode(i, "TSExportAssignment");
        } else if (this.eatContextual(93)) {
          let i = e;
          return this.expectContextual(128), i.id = this.parseIdentifier(), this.semicolon(), this.finishNode(i, "TSNamespaceExportDeclaration");
        } else return super.parseExport(e, s);
      }
      isAbstractClass() {
        return this.isContextual(124) && this.isLookaheadContextual("class");
      }
      parseExportDefaultExpression() {
        if (this.isAbstractClass()) {
          let e = this.startNode();
          return this.next(), e.abstract = true, this.parseClass(e, true, true);
        }
        if (this.match(129)) {
          let e = this.tsParseInterfaceDeclaration(this.startNode());
          if (e) return e;
        }
        return super.parseExportDefaultExpression();
      }
      parseVarStatement(e, s, i = false) {
        let { isAmbientContext: r } = this.state, n = super.parseVarStatement(e, s, i || r);
        if (!r) return n;
        if (!e.declare && (s === "using" || s === "await using")) return this.raiseOverwrite(y.UsingDeclarationInAmbientContext, e, s), n;
        for (let { id: o, init: l } of n.declarations) l && (s === "var" || s === "let" || o.typeAnnotation ? this.raise(y.InitializerNotAllowedInAmbientContext, l) : vr(l, this.hasPlugin("estree")) || this.raise(y.ConstInitializerMustBeStringOrNumericLiteralOrLiteralEnumReference, l));
        return n;
      }
      parseStatementContent(e, s) {
        if (this.match(75) && this.isLookaheadContextual("enum")) {
          let i = this.startNode();
          return this.expect(75), this.tsParseEnumDeclaration(i, { const: true });
        }
        if (this.isContextual(126)) return this.tsParseEnumDeclaration(this.startNode());
        if (this.isContextual(129)) {
          let i = this.tsParseInterfaceDeclaration(this.startNode());
          if (i) return i;
        }
        return super.parseStatementContent(e, s);
      }
      parseAccessModifier() {
        return this.tsParseModifier(["public", "protected", "private"]);
      }
      tsHasSomeModifiers(e, s) {
        return s.some((i) => gs(i) ? e.accessibility === i : !!e[i]);
      }
      tsIsStartOfStaticBlocks() {
        return this.isContextual(106) && this.lookaheadCharCode() === 123;
      }
      parseClassMember(e, s, i) {
        let r = ["declare", "private", "public", "protected", "override", "abstract", "readonly", "static"];
        this.tsParseModifiers({ allowedModifiers: r, disallowedModifiers: ["in", "out"], stopOnStartOfClassStaticBlock: true, errorTemplate: y.InvalidModifierOnTypeParameterPositions }, s);
        let n = () => {
          this.tsIsStartOfStaticBlocks() ? (this.next(), this.next(), this.tsHasSomeModifiers(s, r) && this.raise(y.StaticBlockCannotHaveModifier, this.state.curPosition()), super.parseClassStaticBlock(e, s)) : this.parseClassMemberWithIsStatic(e, s, i, !!s.static);
        };
        s.declare ? this.tsInAmbientContext(n) : n();
      }
      parseClassMemberWithIsStatic(e, s, i, r) {
        let n = this.tsTryParseIndexSignature(s);
        if (n) {
          e.body.push(n), s.abstract && this.raise(y.IndexSignatureHasAbstract, s), s.accessibility && this.raise(y.IndexSignatureHasAccessibility, s, { modifier: s.accessibility }), s.declare && this.raise(y.IndexSignatureHasDeclare, s), s.override && this.raise(y.IndexSignatureHasOverride, s);
          return;
        }
        !this.state.inAbstractClass && s.abstract && this.raise(y.NonAbstractClassHasAbstractMethod, s), s.override && (i.hadSuperClass || this.raise(y.OverrideNotInSubClass, s)), super.parseClassMemberWithIsStatic(e, s, i, r);
      }
      parsePostMemberNameModifiers(e) {
        this.eat(17) && (e.optional = true), e.readonly && this.match(10) && this.raise(y.ClassMethodHasReadonly, e), e.declare && this.match(10) && this.raise(y.ClassMethodHasDeclare, e);
      }
      parseExpressionStatement(e, s, i) {
        return (s.type === "Identifier" ? this.tsParseExpressionStatement(e, s, i) : void 0) || super.parseExpressionStatement(e, s, i);
      }
      shouldParseExportDeclaration() {
        return this.tsIsDeclarationStart() ? true : super.shouldParseExportDeclaration();
      }
      parseConditional(e, s, i) {
        if (!this.match(17)) return e;
        if (this.state.maybeInArrowParameters) {
          let r = this.lookaheadCharCode();
          if (r === 44 || r === 61 || r === 58 || r === 41) return this.setOptionalParametersError(i), e;
        }
        return super.parseConditional(e, s, i);
      }
      parseParenItem(e, s) {
        let i = super.parseParenItem(e, s);
        if (this.eat(17) && (i.optional = true, this.resetEndLocation(e)), this.match(14)) {
          let r = this.startNodeAt(s);
          return r.expression = e, r.typeAnnotation = this.tsParseTypeAnnotation(), this.finishNode(r, "TSTypeCastExpression");
        }
        return e;
      }
      parseExportDeclaration(e) {
        if (!this.state.isAmbientContext && this.isContextual(125)) return this.tsInAmbientContext(() => this.parseExportDeclaration(e));
        let s = this.state.startLoc, i = this.eatContextual(125);
        if (i && (this.isContextual(125) || !this.shouldParseExportDeclaration())) throw this.raise(y.ExpectedAmbientAfterExportDeclare, this.state.startLoc);
        let n = w(this.state.type) && this.tsTryParseExportDeclaration() || super.parseExportDeclaration(e);
        return n ? ((n.type === "TSInterfaceDeclaration" || n.type === "TSTypeAliasDeclaration" || i) && (e.exportKind = "type"), i && n.type !== "TSImportEqualsDeclaration" && (this.resetStartLocation(n, s), n.declare = true), n) : null;
      }
      parseClassId(e, s, i, r) {
        if ((!s || i) && this.isContextual(113)) return;
        super.parseClassId(e, s, i, e.declare ? 1024 : 8331);
        let n = this.tsTryParseTypeParameters(this.tsParseInOutConstModifiers);
        n && (e.typeParameters = n);
      }
      parseClassPropertyAnnotation(e) {
        e.optional || (this.eat(35) ? e.definite = true : this.eat(17) && (e.optional = true));
        let s = this.tsTryParseTypeAnnotation();
        s && (e.typeAnnotation = s);
      }
      parseClassProperty(e) {
        if (this.parseClassPropertyAnnotation(e), this.state.isAmbientContext && !(e.readonly && !e.typeAnnotation) && this.match(29) && this.raise(y.DeclareClassFieldHasInitializer, this.state.startLoc), e.abstract && this.match(29)) {
          let { key: s } = e;
          this.raise(y.AbstractPropertyHasInitializer, this.state.startLoc, { propertyName: s.type === "Identifier" && !e.computed ? s.name : `[${this.input.slice(this.offsetToSourcePos(s.start), this.offsetToSourcePos(s.end))}]` });
        }
        return super.parseClassProperty(e);
      }
      parseClassPrivateProperty(e) {
        return e.abstract && this.raise(y.PrivateElementHasAbstract, e), e.accessibility && this.raise(y.PrivateElementHasAccessibility, e, { modifier: e.accessibility }), this.parseClassPropertyAnnotation(e), super.parseClassPrivateProperty(e);
      }
      parseClassAccessorProperty(e) {
        return this.parseClassPropertyAnnotation(e), e.optional && this.raise(y.AccessorCannotBeOptional, e), super.parseClassAccessorProperty(e);
      }
      pushClassMethod(e, s, i, r, n, o) {
        let l = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        l && n && this.raise(y.ConstructorHasTypeParameters, l);
        let { declare: h = false, kind: c } = s;
        h && (c === "get" || c === "set") && this.raise(y.DeclareAccessor, s, { kind: c }), l && (s.typeParameters = l), super.pushClassMethod(e, s, i, r, n, o);
      }
      pushClassPrivateMethod(e, s, i, r) {
        let n = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        n && (s.typeParameters = n), super.pushClassPrivateMethod(e, s, i, r);
      }
      declareClassPrivateMethodInScope(e, s) {
        e.type !== "TSDeclareMethod" && (e.type === "MethodDefinition" && e.value.body == null || super.declareClassPrivateMethodInScope(e, s));
      }
      parseClassSuper(e) {
        super.parseClassSuper(e), e.superClass && (this.match(47) || this.match(51)) && (e.superTypeParameters = this.tsParseTypeArgumentsInExpression()), this.eatContextual(113) && (e.implements = this.tsParseHeritageClause("implements"));
      }
      parseObjPropValue(e, s, i, r, n, o, l) {
        let h = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        return h && (e.typeParameters = h), super.parseObjPropValue(e, s, i, r, n, o, l);
      }
      parseFunctionParams(e, s) {
        let i = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        i && (e.typeParameters = i), super.parseFunctionParams(e, s);
      }
      parseVarId(e, s) {
        super.parseVarId(e, s), e.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.eat(35) && (e.definite = true);
        let i = this.tsTryParseTypeAnnotation();
        i && (e.id.typeAnnotation = i, this.resetEndLocation(e.id));
      }
      parseAsyncArrowFromCallExpression(e, s) {
        return this.match(14) && (e.returnType = this.tsParseTypeAnnotation()), super.parseAsyncArrowFromCallExpression(e, s);
      }
      parseMaybeAssign(e, s) {
        var i, r, n, o, l;
        let h, c, u;
        if (this.hasPlugin("jsx") && (this.match(143) || this.match(47))) {
          if (h = this.state.clone(), c = this.tryParse(() => super.parseMaybeAssign(e, s), h), !c.error) return c.node;
          let { context: x } = this.state, A = x[x.length - 1];
          (A === C.j_oTag || A === C.j_expr) && x.pop();
        }
        if (!((i = c) != null && i.error) && !this.match(47)) return super.parseMaybeAssign(e, s);
        (!h || h === this.state) && (h = this.state.clone());
        let f, d = this.tryParse((x) => {
          var A, N;
          f = this.tsParseTypeParameters(this.tsParseConstModifier);
          let S = super.parseMaybeAssign(e, s);
          return (S.type !== "ArrowFunctionExpression" || (A = S.extra) != null && A.parenthesized) && x(), ((N = f) == null ? void 0 : N.params.length) !== 0 && this.resetStartLocationFromNode(S, f), S.typeParameters = f, S;
        }, h);
        if (!d.error && !d.aborted) return f && this.reportReservedArrowTypeParam(f), d.node;
        if (!c && (Ps(!this.hasPlugin("jsx")), u = this.tryParse(() => super.parseMaybeAssign(e, s), h), !u.error)) return u.node;
        if ((r = c) != null && r.node) return this.state = c.failState, c.node;
        if (d.node) return this.state = d.failState, f && this.reportReservedArrowTypeParam(f), d.node;
        if ((n = u) != null && n.node) return this.state = u.failState, u.node;
        throw ((o = c) == null ? void 0 : o.error) || d.error || ((l = u) == null ? void 0 : l.error);
      }
      reportReservedArrowTypeParam(e) {
        var s;
        e.params.length === 1 && !e.params[0].constraint && !((s = e.extra) != null && s.trailingComma) && this.getPluginOption("typescript", "disallowAmbiguousJSXLike") && this.raise(y.ReservedArrowTypeParam, e);
      }
      parseMaybeUnary(e, s) {
        return !this.hasPlugin("jsx") && this.match(47) ? this.tsParseTypeAssertion() : super.parseMaybeUnary(e, s);
      }
      parseArrow(e) {
        if (this.match(14)) {
          let s = this.tryParse((i) => {
            let r = this.tsParseTypeOrTypePredicateAnnotation(14);
            return (this.canInsertSemicolon() || !this.match(19)) && i(), r;
          });
          if (s.aborted) return;
          s.thrown || (s.error && (this.state = s.failState), e.returnType = s.node);
        }
        return super.parseArrow(e);
      }
      parseFunctionParamType(e) {
        this.eat(17) && (e.optional = true);
        let s = this.tsTryParseTypeAnnotation();
        return s && (e.typeAnnotation = s), this.resetEndLocation(e), e;
      }
      isAssignable(e, s) {
        switch (e.type) {
          case "TSTypeCastExpression":
            return this.isAssignable(e.expression, s);
          case "TSParameterProperty":
            return true;
          default:
            return super.isAssignable(e, s);
        }
      }
      toAssignable(e, s = false) {
        switch (e.type) {
          case "ParenthesizedExpression":
            this.toAssignableParenthesizedExpression(e, s);
            break;
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
            s ? this.expressionScope.recordArrowParameterBindingError(y.UnexpectedTypeCastInParameter, e) : this.raise(y.UnexpectedTypeCastInParameter, e), this.toAssignable(e.expression, s);
            break;
          case "AssignmentExpression":
            !s && e.left.type === "TSTypeCastExpression" && (e.left = this.typeCastToParameter(e.left));
          default:
            super.toAssignable(e, s);
        }
      }
      toAssignableParenthesizedExpression(e, s) {
        switch (e.expression.type) {
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
          case "ParenthesizedExpression":
            this.toAssignable(e.expression, s);
            break;
          default:
            super.toAssignable(e, s);
        }
      }
      checkToRestConversion(e, s) {
        switch (e.type) {
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSTypeAssertion":
          case "TSNonNullExpression":
            this.checkToRestConversion(e.expression, false);
            break;
          default:
            super.checkToRestConversion(e, s);
        }
      }
      isValidLVal(e, s, i) {
        switch (e) {
          case "TSTypeCastExpression":
            return true;
          case "TSParameterProperty":
            return "parameter";
          case "TSNonNullExpression":
            return "expression";
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSTypeAssertion":
            return (i !== 64 || !s) && ["expression", true];
          default:
            return super.isValidLVal(e, s, i);
        }
      }
      parseBindingAtom() {
        return this.state.type === 78 ? this.parseIdentifier(true) : super.parseBindingAtom();
      }
      parseMaybeDecoratorArguments(e, s) {
        if (this.match(47) || this.match(51)) {
          let i = this.tsParseTypeArgumentsInExpression();
          if (this.match(10)) {
            let r = super.parseMaybeDecoratorArguments(e, s);
            return r.typeParameters = i, r;
          }
          this.unexpected(null, 10);
        }
        return super.parseMaybeDecoratorArguments(e, s);
      }
      checkCommaAfterRest(e) {
        return this.state.isAmbientContext && this.match(12) && this.lookaheadCharCode() === e ? (this.next(), false) : super.checkCommaAfterRest(e);
      }
      isClassMethod() {
        return this.match(47) || super.isClassMethod();
      }
      isClassProperty() {
        return this.match(35) || this.match(14) || super.isClassProperty();
      }
      parseMaybeDefault(e, s) {
        let i = super.parseMaybeDefault(e, s);
        return i.type === "AssignmentPattern" && i.typeAnnotation && i.right.start < i.typeAnnotation.start && this.raise(y.TypeAnnotationAfterAssign, i.typeAnnotation), i;
      }
      getTokenFromCode(e) {
        if (this.state.inType) {
          if (e === 62) {
            this.finishOp(48, 1);
            return;
          }
          if (e === 60) {
            this.finishOp(47, 1);
            return;
          }
        }
        super.getTokenFromCode(e);
      }
      reScan_lt_gt() {
        let { type: e } = this.state;
        e === 47 ? (this.state.pos -= 1, this.readToken_lt()) : e === 48 && (this.state.pos -= 1, this.readToken_gt());
      }
      reScan_lt() {
        let { type: e } = this.state;
        return e === 51 ? (this.state.pos -= 2, this.finishOp(47, 1), 47) : e;
      }
      toAssignableListItem(e, s, i) {
        let r = e[s];
        r.type === "TSTypeCastExpression" && (e[s] = this.typeCastToParameter(r)), super.toAssignableListItem(e, s, i);
      }
      typeCastToParameter(e) {
        return e.expression.typeAnnotation = e.typeAnnotation, this.resetEndLocation(e.expression, e.typeAnnotation.loc.end), e.expression;
      }
      shouldParseArrow(e) {
        return this.match(14) ? e.every((s) => this.isAssignable(s, true)) : super.shouldParseArrow(e);
      }
      shouldParseAsyncArrow() {
        return this.match(14) || super.shouldParseAsyncArrow();
      }
      canHaveLeadingDecorator() {
        return super.canHaveLeadingDecorator() || this.isAbstractClass();
      }
      jsxParseOpeningElementAfterName(e) {
        if (this.match(47) || this.match(51)) {
          let s = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
          s && (e.typeParameters = s);
        }
        return super.jsxParseOpeningElementAfterName(e);
      }
      getGetterSetterExpectedParamCount(e) {
        let s = super.getGetterSetterExpectedParamCount(e), r = this.getObjectOrClassMethodParams(e)[0];
        return r && this.isThisParam(r) ? s + 1 : s;
      }
      parseCatchClauseParam() {
        let e = super.parseCatchClauseParam(), s = this.tsTryParseTypeAnnotation();
        return s && (e.typeAnnotation = s, this.resetEndLocation(e)), e;
      }
      tsInAmbientContext(e) {
        let { isAmbientContext: s, strict: i } = this.state;
        this.state.isAmbientContext = true, this.state.strict = false;
        try {
          return e();
        } finally {
          this.state.isAmbientContext = s, this.state.strict = i;
        }
      }
      parseClass(e, s, i) {
        let r = this.state.inAbstractClass;
        this.state.inAbstractClass = !!e.abstract;
        try {
          return super.parseClass(e, s, i);
        } finally {
          this.state.inAbstractClass = r;
        }
      }
      tsParseAbstractDeclaration(e, s) {
        if (this.match(80)) return e.abstract = true, this.maybeTakeDecorators(s, this.parseClass(e, true, false));
        if (this.isContextual(129)) {
          if (!this.hasFollowingLineBreak()) return e.abstract = true, this.raise(y.NonClassMethodPropertyHasAbstractModifier, e), this.tsParseInterfaceDeclaration(e);
        } else this.unexpected(null, 80);
      }
      parseMethod(e, s, i, r, n, o, l) {
        let h = super.parseMethod(e, s, i, r, n, o, l);
        if ((h.abstract || h.type === "TSAbstractMethodDefinition") && (this.hasPlugin("estree") ? h.value : h).body) {
          let { key: f } = h;
          this.raise(y.AbstractMethodHasImplementation, h, { methodName: f.type === "Identifier" && !h.computed ? f.name : `[${this.input.slice(this.offsetToSourcePos(f.start), this.offsetToSourcePos(f.end))}]` });
        }
        return h;
      }
      tsParseTypeParameterName() {
        return this.parseIdentifier().name;
      }
      shouldParseAsAmbientContext() {
        return !!this.getPluginOption("typescript", "dts");
      }
      parse() {
        return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = true), super.parse();
      }
      getExpression() {
        return this.shouldParseAsAmbientContext() && (this.state.isAmbientContext = true), super.getExpression();
      }
      parseExportSpecifier(e, s, i, r) {
        return !s && r ? (this.parseTypeOnlyImportExportSpecifier(e, false, i), this.finishNode(e, "ExportSpecifier")) : (e.exportKind = "value", super.parseExportSpecifier(e, s, i, r));
      }
      parseImportSpecifier(e, s, i, r, n) {
        return !s && r ? (this.parseTypeOnlyImportExportSpecifier(e, true, i), this.finishNode(e, "ImportSpecifier")) : (e.importKind = "value", super.parseImportSpecifier(e, s, i, r, i ? 4098 : 4096));
      }
      parseTypeOnlyImportExportSpecifier(e, s, i) {
        let r = s ? "imported" : "local", n = s ? "local" : "exported", o = e[r], l, h = false, c = true, u = o.loc.start;
        if (this.isContextual(93)) {
          let d = this.parseIdentifier();
          if (this.isContextual(93)) {
            let x = this.parseIdentifier();
            M(this.state.type) ? (h = true, o = d, l = s ? this.parseIdentifier() : this.parseModuleExportName(), c = false) : (l = x, c = false);
          } else M(this.state.type) ? (c = false, l = s ? this.parseIdentifier() : this.parseModuleExportName()) : (h = true, o = d);
        } else M(this.state.type) && (h = true, s ? (o = this.parseIdentifier(true), this.isContextual(93) || this.checkReservedWord(o.name, o.loc.start, true, true)) : o = this.parseModuleExportName());
        h && i && this.raise(s ? y.TypeModifierIsUsedInTypeImports : y.TypeModifierIsUsedInTypeExports, u), e[r] = o, e[n] = l;
        let f = s ? "importKind" : "exportKind";
        e[f] = h ? "type" : "value", c && this.eatContextual(93) && (e[n] = s ? this.parseIdentifier() : this.parseModuleExportName()), e[n] || (e[n] = this.cloneIdentifier(e[r])), s && this.checkIdentifier(e[n], h ? 4098 : 4096);
      }
      fillOptionalPropertiesForTSESLint(e) {
        switch (e.type) {
          case "ExpressionStatement":
            e.directive != null || (e.directive = void 0);
            return;
          case "RestElement":
            e.value = void 0;
          case "Identifier":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "ObjectPattern":
            e.decorators != null || (e.decorators = []), e.optional != null || (e.optional = false), e.typeAnnotation != null || (e.typeAnnotation = void 0);
            return;
          case "TSParameterProperty":
            e.accessibility != null || (e.accessibility = void 0), e.decorators != null || (e.decorators = []), e.override != null || (e.override = false), e.readonly != null || (e.readonly = false), e.static != null || (e.static = false);
            return;
          case "TSEmptyBodyFunctionExpression":
            e.body = null;
          case "TSDeclareFunction":
          case "FunctionDeclaration":
          case "FunctionExpression":
          case "ClassMethod":
          case "ClassPrivateMethod":
            e.declare != null || (e.declare = false), e.returnType != null || (e.returnType = void 0), e.typeParameters != null || (e.typeParameters = void 0);
            return;
          case "Property":
            e.optional != null || (e.optional = false);
            return;
          case "TSMethodSignature":
          case "TSPropertySignature":
            e.optional != null || (e.optional = false);
          case "TSIndexSignature":
            e.accessibility != null || (e.accessibility = void 0), e.readonly != null || (e.readonly = false), e.static != null || (e.static = false);
            return;
          case "TSAbstractPropertyDefinition":
          case "PropertyDefinition":
          case "TSAbstractAccessorProperty":
          case "AccessorProperty":
            e.declare != null || (e.declare = false), e.definite != null || (e.definite = false), e.readonly != null || (e.readonly = false), e.typeAnnotation != null || (e.typeAnnotation = void 0);
          case "TSAbstractMethodDefinition":
          case "MethodDefinition":
            e.accessibility != null || (e.accessibility = void 0), e.decorators != null || (e.decorators = []), e.override != null || (e.override = false), e.optional != null || (e.optional = false);
            return;
          case "ClassExpression":
            e.id != null || (e.id = null);
          case "ClassDeclaration":
            e.abstract != null || (e.abstract = false), e.declare != null || (e.declare = false), e.decorators != null || (e.decorators = []), e.implements != null || (e.implements = []), e.superTypeArguments != null || (e.superTypeArguments = void 0), e.typeParameters != null || (e.typeParameters = void 0);
            return;
          case "TSTypeAliasDeclaration":
          case "VariableDeclaration":
            e.declare != null || (e.declare = false);
            return;
          case "VariableDeclarator":
            e.definite != null || (e.definite = false);
            return;
          case "TSEnumDeclaration":
            e.const != null || (e.const = false), e.declare != null || (e.declare = false);
            return;
          case "TSEnumMember":
            e.computed != null || (e.computed = false);
            return;
          case "TSImportType":
            e.qualifier != null || (e.qualifier = null), e.options != null || (e.options = null);
            return;
          case "TSInterfaceDeclaration":
            e.declare != null || (e.declare = false), e.extends != null || (e.extends = []);
            return;
          case "TSModuleDeclaration":
            e.declare != null || (e.declare = false), e.global != null || (e.global = e.kind === "global");
            return;
          case "TSTypeParameter":
            e.const != null || (e.const = false), e.in != null || (e.in = false), e.out != null || (e.out = false);
            return;
        }
      }
    };
    function kr(a) {
      if (a.type !== "MemberExpression") return false;
      let { computed: t, property: e } = a;
      return t && e.type !== "StringLiteral" && (e.type !== "TemplateLiteral" || e.expressions.length > 0) ? false : Rs(a.object);
    }
    function vr(a, t) {
      var e;
      let { type: s } = a;
      if ((e = a.extra) != null && e.parenthesized) return false;
      if (t) {
        if (s === "Literal") {
          let { value: i } = a;
          if (typeof i == "string" || typeof i == "boolean") return true;
        }
      } else if (s === "StringLiteral" || s === "BooleanLiteral") return true;
      return !!(Bs(a, t) || Lr(a, t) || s === "TemplateLiteral" && a.expressions.length === 0 || kr(a));
    }
    function Bs(a, t) {
      return t ? a.type === "Literal" && (typeof a.value == "number" || "bigint" in a) : a.type === "NumericLiteral" || a.type === "BigIntLiteral";
    }
    function Lr(a, t) {
      if (a.type === "UnaryExpression") {
        let { operator: e, argument: s } = a;
        if (e === "-" && Bs(s, t)) return true;
      }
      return false;
    }
    function Rs(a) {
      return a.type === "Identifier" ? true : a.type !== "MemberExpression" || a.computed ? false : Rs(a.object);
    }
    var Ts = F`placeholders`({ ClassNameIsRequired: "A class name is required.", UnexpectedSpace: "Unexpected space in placeholder." }), Dr = (a) => class extends a {
      parsePlaceholder(e) {
        if (this.match(133)) {
          let s = this.startNode();
          return this.next(), this.assertNoSpace(), s.name = super.parseIdentifier(true), this.assertNoSpace(), this.expect(133), this.finishPlaceholder(s, e);
        }
      }
      finishPlaceholder(e, s) {
        let i = e;
        return (!i.expectedNode || !i.type) && (i = this.finishNode(i, "Placeholder")), i.expectedNode = s, i;
      }
      getTokenFromCode(e) {
        e === 37 && this.input.charCodeAt(this.state.pos + 1) === 37 ? this.finishOp(133, 2) : super.getTokenFromCode(e);
      }
      parseExprAtom(e) {
        return this.parsePlaceholder("Expression") || super.parseExprAtom(e);
      }
      parseIdentifier(e) {
        return this.parsePlaceholder("Identifier") || super.parseIdentifier(e);
      }
      checkReservedWord(e, s, i, r) {
        e !== void 0 && super.checkReservedWord(e, s, i, r);
      }
      cloneIdentifier(e) {
        let s = super.cloneIdentifier(e);
        return s.type === "Placeholder" && (s.expectedNode = e.expectedNode), s;
      }
      cloneStringLiteral(e) {
        return e.type === "Placeholder" ? this.cloneIdentifier(e) : super.cloneStringLiteral(e);
      }
      parseBindingAtom() {
        return this.parsePlaceholder("Pattern") || super.parseBindingAtom();
      }
      isValidLVal(e, s, i) {
        return e === "Placeholder" || super.isValidLVal(e, s, i);
      }
      toAssignable(e, s) {
        e && e.type === "Placeholder" && e.expectedNode === "Expression" ? e.expectedNode = "Pattern" : super.toAssignable(e, s);
      }
      chStartsBindingIdentifier(e, s) {
        if (super.chStartsBindingIdentifier(e, s)) return true;
        let i = this.nextTokenStart();
        return this.input.charCodeAt(i) === 37 && this.input.charCodeAt(i + 1) === 37;
      }
      verifyBreakContinue(e, s) {
        e.label && e.label.type === "Placeholder" || super.verifyBreakContinue(e, s);
      }
      parseExpressionStatement(e, s) {
        var i;
        if (s.type !== "Placeholder" || (i = s.extra) != null && i.parenthesized) return super.parseExpressionStatement(e, s);
        if (this.match(14)) {
          let n = e;
          return n.label = this.finishPlaceholder(s, "Identifier"), this.next(), n.body = super.parseStatementOrSloppyAnnexBFunctionDeclaration(), this.finishNode(n, "LabeledStatement");
        }
        this.semicolon();
        let r = e;
        return r.name = s.name, this.finishPlaceholder(r, "Statement");
      }
      parseBlock(e, s, i) {
        return this.parsePlaceholder("BlockStatement") || super.parseBlock(e, s, i);
      }
      parseFunctionId(e) {
        return this.parsePlaceholder("Identifier") || super.parseFunctionId(e);
      }
      parseClass(e, s, i) {
        let r = s ? "ClassDeclaration" : "ClassExpression";
        this.next();
        let n = this.state.strict, o = this.parsePlaceholder("Identifier");
        if (o) if (this.match(81) || this.match(133) || this.match(5)) e.id = o;
        else {
          if (i || !s) return e.id = null, e.body = this.finishPlaceholder(o, "ClassBody"), this.finishNode(e, r);
          throw this.raise(Ts.ClassNameIsRequired, this.state.startLoc);
        }
        else this.parseClassId(e, s, i);
        return super.parseClassSuper(e), e.body = this.parsePlaceholder("ClassBody") || super.parseClassBody(!!e.superClass, n), this.finishNode(e, r);
      }
      parseExport(e, s) {
        let i = this.parsePlaceholder("Identifier");
        if (!i) return super.parseExport(e, s);
        let r = e;
        if (!this.isContextual(98) && !this.match(12)) return r.specifiers = [], r.source = null, r.declaration = this.finishPlaceholder(i, "Declaration"), this.finishNode(r, "ExportNamedDeclaration");
        this.expectPlugin("exportDefaultFrom");
        let n = this.startNode();
        return n.exported = i, r.specifiers = [this.finishNode(n, "ExportDefaultSpecifier")], super.parseExport(r, s);
      }
      isExportDefaultSpecifier() {
        if (this.match(65)) {
          let e = this.nextTokenStart();
          if (this.isUnparsedContextual(e, "from") && this.input.startsWith(H(133), this.nextTokenStartSince(e + 4))) return true;
        }
        return super.isExportDefaultSpecifier();
      }
      maybeParseExportDefaultSpecifier(e, s) {
        var i;
        return (i = e.specifiers) != null && i.length ? true : super.maybeParseExportDefaultSpecifier(e, s);
      }
      checkExport(e) {
        let { specifiers: s } = e;
        s != null && s.length && (e.specifiers = s.filter((i) => i.exported.type === "Placeholder")), super.checkExport(e), e.specifiers = s;
      }
      parseImport(e) {
        let s = this.parsePlaceholder("Identifier");
        if (!s) return super.parseImport(e);
        if (e.specifiers = [], !this.isContextual(98) && !this.match(12)) return e.source = this.finishPlaceholder(s, "StringLiteral"), this.semicolon(), this.finishNode(e, "ImportDeclaration");
        let i = this.startNodeAtNode(s);
        return i.local = s, e.specifiers.push(this.finishNode(i, "ImportDefaultSpecifier")), this.eat(12) && (this.maybeParseStarImportSpecifier(e) || this.parseNamedImportSpecifiers(e)), this.expectContextual(98), e.source = this.parseImportSource(), this.semicolon(), this.finishNode(e, "ImportDeclaration");
      }
      parseImportSource() {
        return this.parsePlaceholder("StringLiteral") || super.parseImportSource();
      }
      assertNoSpace() {
        this.state.start > this.offsetToSourcePos(this.state.lastTokEndLoc.index) && this.raise(Ts.UnexpectedSpace, this.state.lastTokEndLoc);
      }
    }, Mr = (a) => class extends a {
      parseV8Intrinsic() {
        if (this.match(54)) {
          let e = this.state.startLoc, s = this.startNode();
          if (this.next(), w(this.state.type)) {
            let i = this.parseIdentifierName(), r = this.createIdentifier(s, i);
            if (this.castNodeTo(r, "V8IntrinsicIdentifier"), this.match(10)) return r;
          }
          this.unexpected(e);
        }
      }
      parseExprAtom(e) {
        return this.parseV8Intrinsic() || super.parseExprAtom(e);
      }
    }, bs = ["minimal", "fsharp", "hack", "smart"], As = ["^^", "@@", "^", "%", "#"];
    function Or(a) {
      if (a.has("decorators")) {
        if (a.has("decorators-legacy")) throw new Error("Cannot use the decorators and decorators-legacy plugin together");
        let s = a.get("decorators").decoratorsBeforeExport;
        if (s != null && typeof s != "boolean") throw new Error("'decoratorsBeforeExport' must be a boolean, if specified.");
        let i = a.get("decorators").allowCallParenthesized;
        if (i != null && typeof i != "boolean") throw new Error("'allowCallParenthesized' must be a boolean.");
      }
      if (a.has("flow") && a.has("typescript")) throw new Error("Cannot combine flow and typescript plugins.");
      if (a.has("placeholders") && a.has("v8intrinsic")) throw new Error("Cannot combine placeholders and v8intrinsic plugins.");
      if (a.has("pipelineOperator")) {
        var t;
        let s = a.get("pipelineOperator").proposal;
        if (!bs.includes(s)) {
          let i = bs.map((r) => `"${r}"`).join(", ");
          throw new Error(`"pipelineOperator" requires "proposal" option whose value must be one of: ${i}.`);
        }
        if (s === "hack") {
          if (a.has("placeholders")) throw new Error("Cannot combine placeholders plugin and Hack-style pipes.");
          if (a.has("v8intrinsic")) throw new Error("Cannot combine v8intrinsic plugin and Hack-style pipes.");
          let i = a.get("pipelineOperator").topicToken;
          if (!As.includes(i)) {
            let r = As.map((n) => `"${n}"`).join(", ");
            throw new Error(`"pipelineOperator" in "proposal": "hack" mode also requires a "topicToken" option whose value must be one of: ${r}.`);
          }
          {
            var e;
            if (i === "#" && ((e = a.get("recordAndTuple")) == null ? void 0 : e.syntaxType) === "hash") throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "hack", topicToken: "#" }]\` and \`${JSON.stringify(["recordAndTuple", a.get("recordAndTuple")])}\`.`);
          }
        } else if (s === "smart" && ((t = a.get("recordAndTuple")) == null ? void 0 : t.syntaxType) === "hash") throw new Error(`Plugin conflict between \`["pipelineOperator", { proposal: "smart" }]\` and \`${JSON.stringify(["recordAndTuple", a.get("recordAndTuple")])}\`.`);
      }
      if (a.has("moduleAttributes")) {
        if (a.has("deprecatedImportAssert") || a.has("importAssertions")) throw new Error("Cannot combine importAssertions, deprecatedImportAssert and moduleAttributes plugins.");
        if (a.get("moduleAttributes").version !== "may-2020") throw new Error("The 'moduleAttributes' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is 'may-2020'.");
      }
      if (a.has("importAssertions") && a.has("deprecatedImportAssert")) throw new Error("Cannot combine importAssertions and deprecatedImportAssert plugins.");
      if (!a.has("deprecatedImportAssert") && a.has("importAttributes") && a.get("importAttributes").deprecatedAssertSyntax && a.set("deprecatedImportAssert", {}), a.has("recordAndTuple")) {
        let s = a.get("recordAndTuple").syntaxType;
        if (s != null) {
          let i = ["hash", "bar"];
          if (!i.includes(s)) throw new Error("The 'syntaxType' option of the 'recordAndTuple' plugin must be one of: " + i.map((r) => `'${r}'`).join(", "));
        }
      }
      if (a.has("asyncDoExpressions") && !a.has("doExpressions")) {
        let s = new Error("'asyncDoExpressions' requires 'doExpressions', please add 'doExpressions' to parser plugins.");
        throw s.missingPlugins = "doExpressions", s;
      }
      if (a.has("optionalChainingAssign") && a.get("optionalChainingAssign").version !== "2023-07") throw new Error("The 'optionalChainingAssign' plugin requires a 'version' option, representing the last proposal update. Currently, the only supported value is '2023-07'.");
    }
    var _s = { estree: Ui, jsx: yr, flow: fr, typescript: Nr, v8intrinsic: Mr, placeholders: Dr }, Fr = Object.keys(_s), ht = class extends lt {
      checkProto(t, e, s, i) {
        if (t.type === "SpreadElement" || this.isObjectMethod(t) || t.computed || t.shorthand) return s;
        let r = t.key;
        return (r.type === "Identifier" ? r.name : r.value) === "__proto__" ? e ? (this.raise(p.RecordNoProto, r), true) : (s && (i ? i.doubleProtoLoc === null && (i.doubleProtoLoc = r.loc.start) : this.raise(p.DuplicateProto, r)), true) : s;
      }
      shouldExitDescending(t, e) {
        return t.type === "ArrowFunctionExpression" && this.offsetToSourcePos(t.start) === e;
      }
      getExpression() {
        if (this.enterInitialScopes(), this.nextToken(), this.match(140)) throw this.raise(p.ParseExpressionEmptyInput, this.state.startLoc);
        let t = this.parseExpression();
        if (!this.match(140)) throw this.raise(p.ParseExpressionExpectsEOF, this.state.startLoc, { unexpected: this.input.codePointAt(this.state.start) });
        return this.finalizeRemainingComments(), t.comments = this.comments, t.errors = this.state.errors, this.optionFlags & 256 && (t.tokens = this.tokens), t;
      }
      parseExpression(t, e) {
        return t ? this.disallowInAnd(() => this.parseExpressionBase(e)) : this.allowInAnd(() => this.parseExpressionBase(e));
      }
      parseExpressionBase(t) {
        let e = this.state.startLoc, s = this.parseMaybeAssign(t);
        if (this.match(12)) {
          let i = this.startNodeAt(e);
          for (i.expressions = [s]; this.eat(12); ) i.expressions.push(this.parseMaybeAssign(t));
          return this.toReferencedList(i.expressions), this.finishNode(i, "SequenceExpression");
        }
        return s;
      }
      parseMaybeAssignDisallowIn(t, e) {
        return this.disallowInAnd(() => this.parseMaybeAssign(t, e));
      }
      parseMaybeAssignAllowIn(t, e) {
        return this.allowInAnd(() => this.parseMaybeAssign(t, e));
      }
      setOptionalParametersError(t) {
        t.optionalParametersLoc = this.state.startLoc;
      }
      parseMaybeAssign(t, e) {
        let s = this.state.startLoc, i = this.isContextual(108);
        if (i && this.prodParam.hasYield) {
          this.next();
          let l = this.parseYield(s);
          return e && (l = e.call(this, l, s)), l;
        }
        let r;
        t ? r = false : (t = new te(), r = true);
        let { type: n } = this.state;
        (n === 10 || w(n)) && (this.state.potentialArrowAt = this.state.start);
        let o = this.parseMaybeConditional(t);
        if (e && (o = e.call(this, o, s)), zi(this.state.type)) {
          let l = this.startNodeAt(s), h = this.state.value;
          if (l.operator = h, this.match(29)) {
            this.toAssignable(o, true), l.left = o;
            let c = s.index;
            t.doubleProtoLoc != null && t.doubleProtoLoc.index >= c && (t.doubleProtoLoc = null), t.shorthandAssignLoc != null && t.shorthandAssignLoc.index >= c && (t.shorthandAssignLoc = null), t.privateKeyLoc != null && t.privateKeyLoc.index >= c && (this.checkDestructuringPrivate(t), t.privateKeyLoc = null);
          } else l.left = o;
          return this.next(), l.right = this.parseMaybeAssign(), this.checkLVal(o, this.finishNode(l, "AssignmentExpression")), l;
        } else r && this.checkExpressionErrors(t, true);
        if (i) {
          let { type: l } = this.state;
          if ((this.hasPlugin("v8intrinsic") ? ue(l) : ue(l) && !this.match(54)) && !this.isAmbiguousPrefixOrIdentifier()) return this.raiseOverwrite(p.YieldNotInGeneratorFunction, s), this.parseYield(s);
        }
        return o;
      }
      parseMaybeConditional(t) {
        let e = this.state.startLoc, s = this.state.potentialArrowAt, i = this.parseExprOps(t);
        return this.shouldExitDescending(i, s) ? i : this.parseConditional(i, e, t);
      }
      parseConditional(t, e, s) {
        if (this.eat(17)) {
          let i = this.startNodeAt(e);
          return i.test = t, i.consequent = this.parseMaybeAssignAllowIn(), this.expect(14), i.alternate = this.parseMaybeAssign(), this.finishNode(i, "ConditionalExpression");
        }
        return t;
      }
      parseMaybeUnaryOrPrivate(t) {
        return this.match(139) ? this.parsePrivateName() : this.parseMaybeUnary(t);
      }
      parseExprOps(t) {
        let e = this.state.startLoc, s = this.state.potentialArrowAt, i = this.parseMaybeUnaryOrPrivate(t);
        return this.shouldExitDescending(i, s) ? i : this.parseExprOp(i, e, -1);
      }
      parseExprOp(t, e, s) {
        if (this.isPrivateName(t)) {
          let r = this.getPrivateNameSV(t);
          (s >= Ee(58) || !this.prodParam.hasIn || !this.match(58)) && this.raise(p.PrivateInExpectedIn, t, { identifierName: r }), this.classScope.usePrivateName(r, t.loc.start);
        }
        let i = this.state.type;
        if (Ki(i) && (this.prodParam.hasIn || !this.match(58))) {
          let r = Ee(i);
          if (r > s) {
            if (i === 39) {
              if (this.expectPlugin("pipelineOperator"), this.state.inFSharpPipelineDirectBody) return t;
              this.checkPipelineAtInfixOperator(t, e);
            }
            let n = this.startNodeAt(e);
            n.left = t, n.operator = this.state.value;
            let o = i === 41 || i === 42, l = i === 40;
            if (l && (r = Ee(42)), this.next(), i === 39 && this.hasPlugin(["pipelineOperator", { proposal: "minimal" }]) && this.state.type === 96 && this.prodParam.hasAwait) throw this.raise(p.UnexpectedAwaitAfterPipelineBody, this.state.startLoc);
            n.right = this.parseExprOpRightExpr(i, r);
            let h = this.finishNode(n, o || l ? "LogicalExpression" : "BinaryExpression"), c = this.state.type;
            if (l && (c === 41 || c === 42) || o && c === 40) throw this.raise(p.MixingCoalesceWithLogical, this.state.startLoc);
            return this.parseExprOp(h, e, s);
          }
        }
        return t;
      }
      parseExprOpRightExpr(t, e) {
        let s = this.state.startLoc;
        switch (t) {
          case 39:
            switch (this.getPluginOption("pipelineOperator", "proposal")) {
              case "hack":
                return this.withTopicBindingContext(() => this.parseHackPipeBody());
              case "fsharp":
                return this.withSoloAwaitPermittingContext(() => this.parseFSharpPipelineBody(e));
            }
            if (this.getPluginOption("pipelineOperator", "proposal") === "smart") return this.withTopicBindingContext(() => {
              if (this.prodParam.hasYield && this.isContextual(108)) throw this.raise(p.PipeBodyIsTighter, this.state.startLoc);
              return this.parseSmartPipelineBodyInStyle(this.parseExprOpBaseRightExpr(t, e), s);
            });
          default:
            return this.parseExprOpBaseRightExpr(t, e);
        }
      }
      parseExprOpBaseRightExpr(t, e) {
        let s = this.state.startLoc;
        return this.parseExprOp(this.parseMaybeUnaryOrPrivate(), s, Yi(t) ? e - 1 : e);
      }
      parseHackPipeBody() {
        var t;
        let { startLoc: e } = this.state, s = this.parseMaybeAssign();
        return Di.has(s.type) && !((t = s.extra) != null && t.parenthesized) && this.raise(p.PipeUnparenthesizedBody, e, { type: s.type }), this.topicReferenceWasUsedInCurrentContext() || this.raise(p.PipeTopicUnused, e), s;
      }
      checkExponentialAfterUnary(t) {
        this.match(57) && this.raise(p.UnexpectedTokenUnaryExponentiation, t.argument);
      }
      parseMaybeUnary(t, e) {
        let s = this.state.startLoc, i = this.isContextual(96);
        if (i && this.recordAwaitIfAllowed()) {
          this.next();
          let l = this.parseAwait(s);
          return e || this.checkExponentialAfterUnary(l), l;
        }
        let r = this.match(34), n = this.startNode();
        if (Ji(this.state.type)) {
          n.operator = this.state.value, n.prefix = true, this.match(72) && this.expectPlugin("throwExpressions");
          let l = this.match(89);
          if (this.next(), n.argument = this.parseMaybeUnary(null, true), this.checkExpressionErrors(t, true), this.state.strict && l) {
            let h = n.argument;
            h.type === "Identifier" ? this.raise(p.StrictDelete, n) : this.hasPropertyAsPrivateName(h) && this.raise(p.DeletePrivateField, n);
          }
          if (!r) return e || this.checkExponentialAfterUnary(n), this.finishNode(n, "UnaryExpression");
        }
        let o = this.parseUpdate(n, r, t);
        if (i) {
          let { type: l } = this.state;
          if ((this.hasPlugin("v8intrinsic") ? ue(l) : ue(l) && !this.match(54)) && !this.isAmbiguousPrefixOrIdentifier()) return this.raiseOverwrite(p.AwaitNotInAsyncContext, s), this.parseAwait(s);
        }
        return o;
      }
      parseUpdate(t, e, s) {
        if (e) {
          let n = t;
          return this.checkLVal(n.argument, this.finishNode(n, "UpdateExpression")), t;
        }
        let i = this.state.startLoc, r = this.parseExprSubscripts(s);
        if (this.checkExpressionErrors(s, false)) return r;
        for (; Wi(this.state.type) && !this.canInsertSemicolon(); ) {
          let n = this.startNodeAt(i);
          n.operator = this.state.value, n.prefix = false, n.argument = r, this.next(), this.checkLVal(r, r = this.finishNode(n, "UpdateExpression"));
        }
        return r;
      }
      parseExprSubscripts(t) {
        let e = this.state.startLoc, s = this.state.potentialArrowAt, i = this.parseExprAtom(t);
        return this.shouldExitDescending(i, s) ? i : this.parseSubscripts(i, e);
      }
      parseSubscripts(t, e, s) {
        let i = { optionalChainMember: false, maybeAsyncArrow: this.atPossibleAsyncArrow(t), stop: false };
        do
          t = this.parseSubscript(t, e, s, i), i.maybeAsyncArrow = false;
        while (!i.stop);
        return t;
      }
      parseSubscript(t, e, s, i) {
        let { type: r } = this.state;
        if (!s && r === 15) return this.parseBind(t, e, s, i);
        if (Ie(r)) return this.parseTaggedTemplateExpression(t, e, i);
        let n = false;
        if (r === 18) {
          if (s && (this.raise(p.OptionalChainingNoNew, this.state.startLoc), this.lookaheadCharCode() === 40)) return this.stopParseSubscript(t, i);
          i.optionalChainMember = n = true, this.next();
        }
        if (!s && this.match(10)) return this.parseCoverCallAndAsyncArrowHead(t, e, i, n);
        {
          let o = this.eat(0);
          return o || n || this.eat(16) ? this.parseMember(t, e, i, o, n) : this.stopParseSubscript(t, i);
        }
      }
      stopParseSubscript(t, e) {
        return e.stop = true, t;
      }
      parseMember(t, e, s, i, r) {
        let n = this.startNodeAt(e);
        return n.object = t, n.computed = i, i ? (n.property = this.parseExpression(), this.expect(3)) : this.match(139) ? (t.type === "Super" && this.raise(p.SuperPrivateField, e), this.classScope.usePrivateName(this.state.value, this.state.startLoc), n.property = this.parsePrivateName()) : n.property = this.parseIdentifier(true), s.optionalChainMember ? (n.optional = r, this.finishNode(n, "OptionalMemberExpression")) : this.finishNode(n, "MemberExpression");
      }
      parseBind(t, e, s, i) {
        let r = this.startNodeAt(e);
        return r.object = t, this.next(), r.callee = this.parseNoCallExpr(), i.stop = true, this.parseSubscripts(this.finishNode(r, "BindExpression"), e, s);
      }
      parseCoverCallAndAsyncArrowHead(t, e, s, i) {
        let r = this.state.maybeInArrowParameters, n = null;
        this.state.maybeInArrowParameters = true, this.next();
        let o = this.startNodeAt(e);
        o.callee = t;
        let { maybeAsyncArrow: l, optionalChainMember: h } = s;
        l && (this.expressionScope.enter(Er()), n = new te()), h && (o.optional = i), i ? o.arguments = this.parseCallExpressionArguments(11) : o.arguments = this.parseCallExpressionArguments(11, t.type !== "Super", o, n);
        let c = this.finishCallExpression(o, h);
        return l && this.shouldParseAsyncArrow() && !i ? (s.stop = true, this.checkDestructuringPrivate(n), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), c = this.parseAsyncArrowFromCallExpression(this.startNodeAt(e), c)) : (l && (this.checkExpressionErrors(n, true), this.expressionScope.exit()), this.toReferencedArguments(c)), this.state.maybeInArrowParameters = r, c;
      }
      toReferencedArguments(t, e) {
        this.toReferencedListDeep(t.arguments, e);
      }
      parseTaggedTemplateExpression(t, e, s) {
        let i = this.startNodeAt(e);
        return i.tag = t, i.quasi = this.parseTemplate(true), s.optionalChainMember && this.raise(p.OptionalChainingNoTemplate, e), this.finishNode(i, "TaggedTemplateExpression");
      }
      atPossibleAsyncArrow(t) {
        return t.type === "Identifier" && t.name === "async" && this.state.lastTokEndLoc.index === t.end && !this.canInsertSemicolon() && t.end - t.start === 5 && this.offsetToSourcePos(t.start) === this.state.potentialArrowAt;
      }
      finishCallExpression(t, e) {
        if (t.callee.type === "Import") if (t.arguments.length === 0 || t.arguments.length > 2) this.raise(p.ImportCallArity, t);
        else for (let s of t.arguments) s.type === "SpreadElement" && this.raise(p.ImportCallSpreadArgument, s);
        return this.finishNode(t, e ? "OptionalCallExpression" : "CallExpression");
      }
      parseCallExpressionArguments(t, e, s, i) {
        let r = [], n = true, o = this.state.inFSharpPipelineDirectBody;
        for (this.state.inFSharpPipelineDirectBody = false; !this.eat(t); ) {
          if (n) n = false;
          else if (this.expect(12), this.match(t)) {
            s && this.addTrailingCommaExtraToNode(s), this.next();
            break;
          }
          r.push(this.parseExprListItem(false, i, e));
        }
        return this.state.inFSharpPipelineDirectBody = o, r;
      }
      shouldParseAsyncArrow() {
        return this.match(19) && !this.canInsertSemicolon();
      }
      parseAsyncArrowFromCallExpression(t, e) {
        var s;
        return this.resetPreviousNodeTrailingComments(e), this.expect(19), this.parseArrowExpression(t, e.arguments, true, (s = e.extra) == null ? void 0 : s.trailingCommaLoc), e.innerComments && xe(t, e.innerComments), e.callee.trailingComments && xe(t, e.callee.trailingComments), t;
      }
      parseNoCallExpr() {
        let t = this.state.startLoc;
        return this.parseSubscripts(this.parseExprAtom(), t, true);
      }
      parseExprAtom(t) {
        let e, s = null, { type: i } = this.state;
        switch (i) {
          case 79:
            return this.parseSuper();
          case 83:
            return e = this.startNode(), this.next(), this.match(16) ? this.parseImportMetaPropertyOrPhaseCall(e) : this.match(10) ? this.optionFlags & 512 ? this.parseImportCall(e) : this.finishNode(e, "Import") : (this.raise(p.UnsupportedImport, this.state.lastTokStartLoc), this.finishNode(e, "Import"));
          case 78:
            return e = this.startNode(), this.next(), this.finishNode(e, "ThisExpression");
          case 90:
            return this.parseDo(this.startNode(), false);
          case 56:
          case 31:
            return this.readRegexp(), this.parseRegExpLiteral(this.state.value);
          case 135:
            return this.parseNumericLiteral(this.state.value);
          case 136:
            return this.parseBigIntLiteral(this.state.value);
          case 134:
            return this.parseStringLiteral(this.state.value);
          case 84:
            return this.parseNullLiteral();
          case 85:
            return this.parseBooleanLiteral(true);
          case 86:
            return this.parseBooleanLiteral(false);
          case 10: {
            let r = this.state.potentialArrowAt === this.state.start;
            return this.parseParenAndDistinguishExpression(r);
          }
          case 0:
            return this.parseArrayLike(3, true, false, t);
          case 5:
            return this.parseObjectLike(8, false, false, t);
          case 68:
            return this.parseFunctionOrFunctionSent();
          case 26:
            s = this.parseDecorators();
          case 80:
            return this.parseClass(this.maybeTakeDecorators(s, this.startNode()), false);
          case 77:
            return this.parseNewOrNewTarget();
          case 25:
          case 24:
            return this.parseTemplate(false);
          case 15: {
            e = this.startNode(), this.next(), e.object = null;
            let r = e.callee = this.parseNoCallExpr();
            if (r.type === "MemberExpression") return this.finishNode(e, "BindExpression");
            throw this.raise(p.UnsupportedBind, r);
          }
          case 139:
            return this.raise(p.PrivateInExpectedIn, this.state.startLoc, { identifierName: this.state.value }), this.parsePrivateName();
          case 33:
            return this.parseTopicReferenceThenEqualsSign(54, "%");
          case 32:
            return this.parseTopicReferenceThenEqualsSign(44, "^");
          case 37:
          case 38:
            return this.parseTopicReference("hack");
          case 44:
          case 54:
          case 27: {
            let r = this.getPluginOption("pipelineOperator", "proposal");
            if (r) return this.parseTopicReference(r);
            this.unexpected();
            break;
          }
          case 47: {
            let r = this.input.codePointAt(this.nextTokenStart());
            U(r) || r === 62 ? this.expectOnePlugin(["jsx", "flow", "typescript"]) : this.unexpected();
            break;
          }
          default:
            {
              if (i === 137) return this.parseDecimalLiteral(this.state.value);
              if (i === 2 || i === 1) return this.parseArrayLike(this.state.type === 2 ? 4 : 3, false, true);
              if (i === 6 || i === 7) return this.parseObjectLike(this.state.type === 6 ? 9 : 8, false, true);
            }
            if (w(i)) {
              if (this.isContextual(127) && this.lookaheadInLineCharCode() === 123) return this.parseModuleExpression();
              let r = this.state.potentialArrowAt === this.state.start, n = this.state.containsEsc, o = this.parseIdentifier();
              if (!n && o.name === "async" && !this.canInsertSemicolon()) {
                let { type: l } = this.state;
                if (l === 68) return this.resetPreviousNodeTrailingComments(o), this.next(), this.parseAsyncFunctionExpression(this.startNodeAtNode(o));
                if (w(l)) return this.lookaheadCharCode() === 61 ? this.parseAsyncArrowUnaryFunction(this.startNodeAtNode(o)) : o;
                if (l === 90) return this.resetPreviousNodeTrailingComments(o), this.parseDo(this.startNodeAtNode(o), true);
              }
              return r && this.match(19) && !this.canInsertSemicolon() ? (this.next(), this.parseArrowExpression(this.startNodeAtNode(o), [o], false)) : o;
            } else this.unexpected();
        }
      }
      parseTopicReferenceThenEqualsSign(t, e) {
        let s = this.getPluginOption("pipelineOperator", "proposal");
        if (s) return this.state.type = t, this.state.value = e, this.state.pos--, this.state.end--, this.state.endLoc = D(this.state.endLoc, -1), this.parseTopicReference(s);
        this.unexpected();
      }
      parseTopicReference(t) {
        let e = this.startNode(), s = this.state.startLoc, i = this.state.type;
        return this.next(), this.finishTopicReference(e, s, t, i);
      }
      finishTopicReference(t, e, s, i) {
        if (this.testTopicReferenceConfiguration(s, e, i)) return s === "hack" ? (this.topicReferenceIsAllowedInCurrentContext() || this.raise(p.PipeTopicUnbound, e), this.registerTopicReference(), this.finishNode(t, "TopicReference")) : (this.topicReferenceIsAllowedInCurrentContext() || this.raise(p.PrimaryTopicNotAllowed, e), this.registerTopicReference(), this.finishNode(t, "PipelinePrimaryTopicReference"));
        throw this.raise(p.PipeTopicUnconfiguredToken, e, { token: H(i) });
      }
      testTopicReferenceConfiguration(t, e, s) {
        switch (t) {
          case "hack":
            return this.hasPlugin(["pipelineOperator", { topicToken: H(s) }]);
          case "smart":
            return s === 27;
          default:
            throw this.raise(p.PipeTopicRequiresHackPipes, e);
        }
      }
      parseAsyncArrowUnaryFunction(t) {
        this.prodParam.enter(Ce(true, this.prodParam.hasYield));
        let e = [this.parseIdentifier()];
        return this.prodParam.exit(), this.hasPrecedingLineBreak() && this.raise(p.LineTerminatorBeforeArrow, this.state.curPosition()), this.expect(19), this.parseArrowExpression(t, e, true);
      }
      parseDo(t, e) {
        this.expectPlugin("doExpressions"), e && this.expectPlugin("asyncDoExpressions"), t.async = e, this.next();
        let s = this.state.labels;
        return this.state.labels = [], e ? (this.prodParam.enter(2), t.body = this.parseBlock(), this.prodParam.exit()) : t.body = this.parseBlock(), this.state.labels = s, this.finishNode(t, "DoExpression");
      }
      parseSuper() {
        let t = this.startNode();
        return this.next(), this.match(10) && !this.scope.allowDirectSuper && !(this.optionFlags & 16) ? this.raise(p.SuperNotAllowed, t) : !this.scope.allowSuper && !(this.optionFlags & 16) && this.raise(p.UnexpectedSuper, t), !this.match(10) && !this.match(0) && !this.match(16) && this.raise(p.UnsupportedSuper, t), this.finishNode(t, "Super");
      }
      parsePrivateName() {
        let t = this.startNode(), e = this.startNodeAt(D(this.state.startLoc, 1)), s = this.state.value;
        return this.next(), t.id = this.createIdentifier(e, s), this.finishNode(t, "PrivateName");
      }
      parseFunctionOrFunctionSent() {
        let t = this.startNode();
        if (this.next(), this.prodParam.hasYield && this.match(16)) {
          let e = this.createIdentifier(this.startNodeAtNode(t), "function");
          return this.next(), this.match(103) ? this.expectPlugin("functionSent") : this.hasPlugin("functionSent") || this.unexpected(), this.parseMetaProperty(t, e, "sent");
        }
        return this.parseFunction(t);
      }
      parseMetaProperty(t, e, s) {
        t.meta = e;
        let i = this.state.containsEsc;
        return t.property = this.parseIdentifier(true), (t.property.name !== s || i) && this.raise(p.UnsupportedMetaProperty, t.property, { target: e.name, onlyValidPropertyName: s }), this.finishNode(t, "MetaProperty");
      }
      parseImportMetaPropertyOrPhaseCall(t) {
        if (this.next(), this.isContextual(105) || this.isContextual(97)) {
          let e = this.isContextual(105);
          return this.expectPlugin(e ? "sourcePhaseImports" : "deferredImportEvaluation"), this.next(), t.phase = e ? "source" : "defer", this.parseImportCall(t);
        } else {
          let e = this.createIdentifierAt(this.startNodeAtNode(t), "import", this.state.lastTokStartLoc);
          return this.isContextual(101) && (this.inModule || this.raise(p.ImportMetaOutsideModule, e), this.sawUnambiguousESM = true), this.parseMetaProperty(t, e, "meta");
        }
      }
      parseLiteralAtNode(t, e, s) {
        return this.addExtra(s, "rawValue", t), this.addExtra(s, "raw", this.input.slice(this.offsetToSourcePos(s.start), this.state.end)), s.value = t, this.next(), this.finishNode(s, e);
      }
      parseLiteral(t, e) {
        let s = this.startNode();
        return this.parseLiteralAtNode(t, e, s);
      }
      parseStringLiteral(t) {
        return this.parseLiteral(t, "StringLiteral");
      }
      parseNumericLiteral(t) {
        return this.parseLiteral(t, "NumericLiteral");
      }
      parseBigIntLiteral(t) {
        return this.parseLiteral(t, "BigIntLiteral");
      }
      parseDecimalLiteral(t) {
        return this.parseLiteral(t, "DecimalLiteral");
      }
      parseRegExpLiteral(t) {
        let e = this.startNode();
        return this.addExtra(e, "raw", this.input.slice(this.offsetToSourcePos(e.start), this.state.end)), e.pattern = t.pattern, e.flags = t.flags, this.next(), this.finishNode(e, "RegExpLiteral");
      }
      parseBooleanLiteral(t) {
        let e = this.startNode();
        return e.value = t, this.next(), this.finishNode(e, "BooleanLiteral");
      }
      parseNullLiteral() {
        let t = this.startNode();
        return this.next(), this.finishNode(t, "NullLiteral");
      }
      parseParenAndDistinguishExpression(t) {
        let e = this.state.startLoc, s;
        this.next(), this.expressionScope.enter(Sr());
        let i = this.state.maybeInArrowParameters, r = this.state.inFSharpPipelineDirectBody;
        this.state.maybeInArrowParameters = true, this.state.inFSharpPipelineDirectBody = false;
        let n = this.state.startLoc, o = [], l = new te(), h = true, c, u;
        for (; !this.match(11); ) {
          if (h) h = false;
          else if (this.expect(12, l.optionalParametersLoc === null ? null : l.optionalParametersLoc), this.match(11)) {
            u = this.state.startLoc;
            break;
          }
          if (this.match(21)) {
            let x = this.state.startLoc;
            if (c = this.state.startLoc, o.push(this.parseParenItem(this.parseRestBinding(), x)), !this.checkCommaAfterRest(41)) break;
          } else o.push(this.parseMaybeAssignAllowIn(l, this.parseParenItem));
        }
        let f = this.state.lastTokEndLoc;
        this.expect(11), this.state.maybeInArrowParameters = i, this.state.inFSharpPipelineDirectBody = r;
        let d = this.startNodeAt(e);
        return t && this.shouldParseArrow(o) && (d = this.parseArrow(d)) ? (this.checkDestructuringPrivate(l), this.expressionScope.validateAsPattern(), this.expressionScope.exit(), this.parseArrowExpression(d, o, false), d) : (this.expressionScope.exit(), o.length || this.unexpected(this.state.lastTokStartLoc), u && this.unexpected(u), c && this.unexpected(c), this.checkExpressionErrors(l, true), this.toReferencedListDeep(o, true), o.length > 1 ? (s = this.startNodeAt(n), s.expressions = o, this.finishNode(s, "SequenceExpression"), this.resetEndLocation(s, f)) : s = o[0], this.wrapParenthesis(e, s));
      }
      wrapParenthesis(t, e) {
        if (!(this.optionFlags & 1024)) return this.addExtra(e, "parenthesized", true), this.addExtra(e, "parenStart", t.index), this.takeSurroundingComments(e, t.index, this.state.lastTokEndLoc.index), e;
        let s = this.startNodeAt(t);
        return s.expression = e, this.finishNode(s, "ParenthesizedExpression");
      }
      shouldParseArrow(t) {
        return !this.canInsertSemicolon();
      }
      parseArrow(t) {
        if (this.eat(19)) return t;
      }
      parseParenItem(t, e) {
        return t;
      }
      parseNewOrNewTarget() {
        let t = this.startNode();
        if (this.next(), this.match(16)) {
          let e = this.createIdentifier(this.startNodeAtNode(t), "new");
          this.next();
          let s = this.parseMetaProperty(t, e, "target");
          return this.scope.allowNewTarget || this.raise(p.UnexpectedNewTarget, s), s;
        }
        return this.parseNew(t);
      }
      parseNew(t) {
        if (this.parseNewCallee(t), this.eat(10)) {
          let e = this.parseExprList(11);
          this.toReferencedList(e), t.arguments = e;
        } else t.arguments = [];
        return this.finishNode(t, "NewExpression");
      }
      parseNewCallee(t) {
        let e = this.match(83), s = this.parseNoCallExpr();
        t.callee = s, e && (s.type === "Import" || s.type === "ImportExpression") && this.raise(p.ImportCallNotNewExpression, s);
      }
      parseTemplateElement(t) {
        let { start: e, startLoc: s, end: i, value: r } = this.state, n = e + 1, o = this.startNodeAt(D(s, 1));
        r === null && (t || this.raise(p.InvalidEscapeSequenceTemplate, D(this.state.firstInvalidTemplateEscapePos, 1)));
        let l = this.match(24), h = l ? -1 : -2, c = i + h;
        o.value = { raw: this.input.slice(n, c).replace(/\r\n?/g, `
`), cooked: r === null ? null : r.slice(1, h) }, o.tail = l, this.next();
        let u = this.finishNode(o, "TemplateElement");
        return this.resetEndLocation(u, D(this.state.lastTokEndLoc, h)), u;
      }
      parseTemplate(t) {
        let e = this.startNode(), s = this.parseTemplateElement(t), i = [s], r = [];
        for (; !s.tail; ) r.push(this.parseTemplateSubstitution()), this.readTemplateContinuation(), i.push(s = this.parseTemplateElement(t));
        return e.expressions = r, e.quasis = i, this.finishNode(e, "TemplateLiteral");
      }
      parseTemplateSubstitution() {
        return this.parseExpression();
      }
      parseObjectLike(t, e, s, i) {
        s && this.expectPlugin("recordAndTuple");
        let r = this.state.inFSharpPipelineDirectBody;
        this.state.inFSharpPipelineDirectBody = false;
        let n = false, o = true, l = this.startNode();
        for (l.properties = [], this.next(); !this.match(t); ) {
          if (o) o = false;
          else if (this.expect(12), this.match(t)) {
            this.addTrailingCommaExtraToNode(l);
            break;
          }
          let c;
          e ? c = this.parseBindingProperty() : (c = this.parsePropertyDefinition(i), n = this.checkProto(c, s, n, i)), s && !this.isObjectProperty(c) && c.type !== "SpreadElement" && this.raise(p.InvalidRecordProperty, c), c.shorthand && this.addExtra(c, "shorthand", true), l.properties.push(c);
        }
        this.next(), this.state.inFSharpPipelineDirectBody = r;
        let h = "ObjectExpression";
        return e ? h = "ObjectPattern" : s && (h = "RecordExpression"), this.finishNode(l, h);
      }
      addTrailingCommaExtraToNode(t) {
        this.addExtra(t, "trailingComma", this.state.lastTokStartLoc.index), this.addExtra(t, "trailingCommaLoc", this.state.lastTokStartLoc, false);
      }
      maybeAsyncOrAccessorProp(t) {
        return !t.computed && t.key.type === "Identifier" && (this.isLiteralPropertyName() || this.match(0) || this.match(55));
      }
      parsePropertyDefinition(t) {
        let e = [];
        if (this.match(26)) for (this.hasPlugin("decorators") && this.raise(p.UnsupportedPropertyDecorator, this.state.startLoc); this.match(26); ) e.push(this.parseDecorator());
        let s = this.startNode(), i = false, r = false, n;
        if (this.match(21)) return e.length && this.unexpected(), this.parseSpread();
        e.length && (s.decorators = e, e = []), s.method = false, t && (n = this.state.startLoc);
        let o = this.eat(55);
        this.parsePropertyNamePrefixOperator(s);
        let l = this.state.containsEsc;
        if (this.parsePropertyName(s, t), !o && !l && this.maybeAsyncOrAccessorProp(s)) {
          let { key: h } = s, c = h.name;
          c === "async" && !this.hasPrecedingLineBreak() && (i = true, this.resetPreviousNodeTrailingComments(h), o = this.eat(55), this.parsePropertyName(s)), (c === "get" || c === "set") && (r = true, this.resetPreviousNodeTrailingComments(h), s.kind = c, this.match(55) && (o = true, this.raise(p.AccessorIsGenerator, this.state.curPosition(), { kind: c }), this.next()), this.parsePropertyName(s));
        }
        return this.parseObjPropValue(s, n, o, i, false, r, t);
      }
      getGetterSetterExpectedParamCount(t) {
        return t.kind === "get" ? 0 : 1;
      }
      getObjectOrClassMethodParams(t) {
        return t.params;
      }
      checkGetterSetterParams(t) {
        var e;
        let s = this.getGetterSetterExpectedParamCount(t), i = this.getObjectOrClassMethodParams(t);
        i.length !== s && this.raise(t.kind === "get" ? p.BadGetterArity : p.BadSetterArity, t), t.kind === "set" && ((e = i[i.length - 1]) == null ? void 0 : e.type) === "RestElement" && this.raise(p.BadSetterRestParameter, t);
      }
      parseObjectMethod(t, e, s, i, r) {
        if (r) {
          let n = this.parseMethod(t, e, false, false, false, "ObjectMethod");
          return this.checkGetterSetterParams(n), n;
        }
        if (s || e || this.match(10)) return i && this.unexpected(), t.kind = "method", t.method = true, this.parseMethod(t, e, s, false, false, "ObjectMethod");
      }
      parseObjectProperty(t, e, s, i) {
        if (t.shorthand = false, this.eat(14)) return t.value = s ? this.parseMaybeDefault(this.state.startLoc) : this.parseMaybeAssignAllowIn(i), this.finishObjectProperty(t);
        if (!t.computed && t.key.type === "Identifier") {
          if (this.checkReservedWord(t.key.name, t.key.loc.start, true, false), s) t.value = this.parseMaybeDefault(e, this.cloneIdentifier(t.key));
          else if (this.match(29)) {
            let r = this.state.startLoc;
            i != null ? i.shorthandAssignLoc === null && (i.shorthandAssignLoc = r) : this.raise(p.InvalidCoverInitializedName, r), t.value = this.parseMaybeDefault(e, this.cloneIdentifier(t.key));
          } else t.value = this.cloneIdentifier(t.key);
          return t.shorthand = true, this.finishObjectProperty(t);
        }
      }
      finishObjectProperty(t) {
        return this.finishNode(t, "ObjectProperty");
      }
      parseObjPropValue(t, e, s, i, r, n, o) {
        let l = this.parseObjectMethod(t, s, i, r, n) || this.parseObjectProperty(t, e, r, o);
        return l || this.unexpected(), l;
      }
      parsePropertyName(t, e) {
        if (this.eat(0)) t.computed = true, t.key = this.parseMaybeAssignAllowIn(), this.expect(3);
        else {
          let { type: s, value: i } = this.state, r;
          if (M(s)) r = this.parseIdentifier(true);
          else switch (s) {
            case 135:
              r = this.parseNumericLiteral(i);
              break;
            case 134:
              r = this.parseStringLiteral(i);
              break;
            case 136:
              r = this.parseBigIntLiteral(i);
              break;
            case 139: {
              let n = this.state.startLoc;
              e != null ? e.privateKeyLoc === null && (e.privateKeyLoc = n) : this.raise(p.UnexpectedPrivateField, n), r = this.parsePrivateName();
              break;
            }
            default:
              if (s === 137) {
                r = this.parseDecimalLiteral(i);
                break;
              }
              this.unexpected();
          }
          t.key = r, s !== 139 && (t.computed = false);
        }
      }
      initFunction(t, e) {
        t.id = null, t.generator = false, t.async = e;
      }
      parseMethod(t, e, s, i, r, n, o = false) {
        this.initFunction(t, s), t.generator = e, this.scope.enter(530 | (o ? 576 : 0) | (r ? 32 : 0)), this.prodParam.enter(Ce(s, t.generator)), this.parseFunctionParams(t, i);
        let l = this.parseFunctionBodyAndFinish(t, n, true);
        return this.prodParam.exit(), this.scope.exit(), l;
      }
      parseArrayLike(t, e, s, i) {
        s && this.expectPlugin("recordAndTuple");
        let r = this.state.inFSharpPipelineDirectBody;
        this.state.inFSharpPipelineDirectBody = false;
        let n = this.startNode();
        return this.next(), n.elements = this.parseExprList(t, !s, i, n), this.state.inFSharpPipelineDirectBody = r, this.finishNode(n, s ? "TupleExpression" : "ArrayExpression");
      }
      parseArrowExpression(t, e, s, i) {
        this.scope.enter(518);
        let r = Ce(s, false);
        !this.match(5) && this.prodParam.hasIn && (r |= 8), this.prodParam.enter(r), this.initFunction(t, s);
        let n = this.state.maybeInArrowParameters;
        return e && (this.state.maybeInArrowParameters = true, this.setArrowFunctionParameters(t, e, i)), this.state.maybeInArrowParameters = false, this.parseFunctionBody(t, true), this.prodParam.exit(), this.scope.exit(), this.state.maybeInArrowParameters = n, this.finishNode(t, "ArrowFunctionExpression");
      }
      setArrowFunctionParameters(t, e, s) {
        this.toAssignableList(e, s, false), t.params = e;
      }
      parseFunctionBodyAndFinish(t, e, s = false) {
        return this.parseFunctionBody(t, false, s), this.finishNode(t, e);
      }
      parseFunctionBody(t, e, s = false) {
        let i = e && !this.match(5);
        if (this.expressionScope.enter(Os()), i) t.body = this.parseMaybeAssign(), this.checkParams(t, false, e, false);
        else {
          let r = this.state.strict, n = this.state.labels;
          this.state.labels = [], this.prodParam.enter(this.prodParam.currentFlags() | 4), t.body = this.parseBlock(true, false, (o) => {
            let l = !this.isSimpleParamList(t.params);
            o && l && this.raise(p.IllegalLanguageModeDirective, (t.kind === "method" || t.kind === "constructor") && t.key ? t.key.loc.end : t);
            let h = !r && this.state.strict;
            this.checkParams(t, !this.state.strict && !e && !s && !l, e, h), this.state.strict && t.id && this.checkIdentifier(t.id, 65, h);
          }), this.prodParam.exit(), this.state.labels = n;
        }
        this.expressionScope.exit();
      }
      isSimpleParameter(t) {
        return t.type === "Identifier";
      }
      isSimpleParamList(t) {
        for (let e = 0, s = t.length; e < s; e++) if (!this.isSimpleParameter(t[e])) return false;
        return true;
      }
      checkParams(t, e, s, i = true) {
        let r = !e && /* @__PURE__ */ new Set(), n = { type: "FormalParameters" };
        for (let o of t.params) this.checkLVal(o, n, 5, r, i);
      }
      parseExprList(t, e, s, i) {
        let r = [], n = true;
        for (; !this.eat(t); ) {
          if (n) n = false;
          else if (this.expect(12), this.match(t)) {
            i && this.addTrailingCommaExtraToNode(i), this.next();
            break;
          }
          r.push(this.parseExprListItem(e, s));
        }
        return r;
      }
      parseExprListItem(t, e, s) {
        let i;
        if (this.match(12)) t || this.raise(p.UnexpectedToken, this.state.curPosition(), { unexpected: "," }), i = null;
        else if (this.match(21)) {
          let r = this.state.startLoc;
          i = this.parseParenItem(this.parseSpread(e), r);
        } else if (this.match(17)) {
          this.expectPlugin("partialApplication"), s || this.raise(p.UnexpectedArgumentPlaceholder, this.state.startLoc);
          let r = this.startNode();
          this.next(), i = this.finishNode(r, "ArgumentPlaceholder");
        } else i = this.parseMaybeAssignAllowIn(e, this.parseParenItem);
        return i;
      }
      parseIdentifier(t) {
        let e = this.startNode(), s = this.parseIdentifierName(t);
        return this.createIdentifier(e, s);
      }
      createIdentifier(t, e) {
        return t.name = e, t.loc.identifierName = e, this.finishNode(t, "Identifier");
      }
      createIdentifierAt(t, e, s) {
        return t.name = e, t.loc.identifierName = e, this.finishNodeAt(t, "Identifier", s);
      }
      parseIdentifierName(t) {
        let e, { startLoc: s, type: i } = this.state;
        M(i) ? e = this.state.value : this.unexpected();
        let r = Vi(i);
        return t ? r && this.replaceToken(132) : this.checkReservedWord(e, s, r, false), this.next(), e;
      }
      checkReservedWord(t, e, s, i) {
        if (t.length > 10 || !or(t)) return;
        if (s && rr(t)) {
          this.raise(p.UnexpectedKeyword, e, { keyword: t });
          return;
        }
        if ((this.state.strict ? i ? vs : Ns : Is)(t, this.inModule)) {
          this.raise(p.UnexpectedReservedWord, e, { reservedWord: t });
          return;
        } else if (t === "yield") {
          if (this.prodParam.hasYield) {
            this.raise(p.YieldBindingIdentifier, e);
            return;
          }
        } else if (t === "await") {
          if (this.prodParam.hasAwait) {
            this.raise(p.AwaitBindingIdentifier, e);
            return;
          }
          if (this.scope.inStaticBlock) {
            this.raise(p.AwaitBindingIdentifierInStaticBlock, e);
            return;
          }
          this.expressionScope.recordAsyncArrowParametersError(e);
        } else if (t === "arguments" && this.scope.inClassAndNotInNonArrowFunction) {
          this.raise(p.ArgumentsInClass, e);
          return;
        }
      }
      recordAwaitIfAllowed() {
        let t = this.prodParam.hasAwait;
        return t && !this.scope.inFunction && (this.state.hasTopLevelAwait = true), t;
      }
      parseAwait(t) {
        let e = this.startNodeAt(t);
        return this.expressionScope.recordParameterInitializerError(p.AwaitExpressionFormalParameter, e), this.eat(55) && this.raise(p.ObsoleteAwaitStar, e), !this.scope.inFunction && !(this.optionFlags & 1) && (this.isAmbiguousPrefixOrIdentifier() ? this.ambiguousScriptDifferentAst = true : this.sawUnambiguousESM = true), this.state.soloAwait || (e.argument = this.parseMaybeUnary(null, true)), this.finishNode(e, "AwaitExpression");
      }
      isAmbiguousPrefixOrIdentifier() {
        if (this.hasPrecedingLineBreak()) return true;
        let { type: t } = this.state;
        return t === 53 || t === 10 || t === 0 || Ie(t) || t === 102 && !this.state.containsEsc || t === 138 || t === 56 || this.hasPlugin("v8intrinsic") && t === 54;
      }
      parseYield(t) {
        let e = this.startNodeAt(t);
        this.expressionScope.recordParameterInitializerError(p.YieldInParameter, e);
        let s = false, i = null;
        if (!this.hasPrecedingLineBreak()) switch (s = this.eat(55), this.state.type) {
          case 13:
          case 140:
          case 8:
          case 11:
          case 3:
          case 9:
          case 14:
          case 12:
            if (!s) break;
          default:
            i = this.parseMaybeAssign();
        }
        return e.delegate = s, e.argument = i, this.finishNode(e, "YieldExpression");
      }
      parseImportCall(t) {
        if (this.next(), t.source = this.parseMaybeAssignAllowIn(), t.options = null, this.eat(12)) {
          if (this.match(11)) this.addTrailingCommaExtraToNode(t.source);
          else if (t.options = this.parseMaybeAssignAllowIn(), this.eat(12) && (this.addTrailingCommaExtraToNode(t.options), !this.match(11))) {
            do
              this.parseMaybeAssignAllowIn();
            while (this.eat(12) && !this.match(11));
            this.raise(p.ImportCallArity, t);
          }
        }
        return this.expect(11), this.finishNode(t, "ImportExpression");
      }
      checkPipelineAtInfixOperator(t, e) {
        this.hasPlugin(["pipelineOperator", { proposal: "smart" }]) && t.type === "SequenceExpression" && this.raise(p.PipelineHeadSequenceExpression, e);
      }
      parseSmartPipelineBodyInStyle(t, e) {
        if (this.isSimpleReference(t)) {
          let s = this.startNodeAt(e);
          return s.callee = t, this.finishNode(s, "PipelineBareFunction");
        } else {
          let s = this.startNodeAt(e);
          return this.checkSmartPipeTopicBodyEarlyErrors(e), s.expression = t, this.finishNode(s, "PipelineTopicExpression");
        }
      }
      isSimpleReference(t) {
        switch (t.type) {
          case "MemberExpression":
            return !t.computed && this.isSimpleReference(t.object);
          case "Identifier":
            return true;
          default:
            return false;
        }
      }
      checkSmartPipeTopicBodyEarlyErrors(t) {
        if (this.match(19)) throw this.raise(p.PipelineBodyNoArrow, this.state.startLoc);
        this.topicReferenceWasUsedInCurrentContext() || this.raise(p.PipelineTopicUnused, t);
      }
      withTopicBindingContext(t) {
        let e = this.state.topicContext;
        this.state.topicContext = { maxNumOfResolvableTopics: 1, maxTopicIndex: null };
        try {
          return t();
        } finally {
          this.state.topicContext = e;
        }
      }
      withSmartMixTopicForbiddingContext(t) {
        if (this.hasPlugin(["pipelineOperator", { proposal: "smart" }])) {
          let e = this.state.topicContext;
          this.state.topicContext = { maxNumOfResolvableTopics: 0, maxTopicIndex: null };
          try {
            return t();
          } finally {
            this.state.topicContext = e;
          }
        } else return t();
      }
      withSoloAwaitPermittingContext(t) {
        let e = this.state.soloAwait;
        this.state.soloAwait = true;
        try {
          return t();
        } finally {
          this.state.soloAwait = e;
        }
      }
      allowInAnd(t) {
        let e = this.prodParam.currentFlags();
        if (8 & ~e) {
          this.prodParam.enter(e | 8);
          try {
            return t();
          } finally {
            this.prodParam.exit();
          }
        }
        return t();
      }
      disallowInAnd(t) {
        let e = this.prodParam.currentFlags();
        if (8 & e) {
          this.prodParam.enter(e & -9);
          try {
            return t();
          } finally {
            this.prodParam.exit();
          }
        }
        return t();
      }
      registerTopicReference() {
        this.state.topicContext.maxTopicIndex = 0;
      }
      topicReferenceIsAllowedInCurrentContext() {
        return this.state.topicContext.maxNumOfResolvableTopics >= 1;
      }
      topicReferenceWasUsedInCurrentContext() {
        return this.state.topicContext.maxTopicIndex != null && this.state.topicContext.maxTopicIndex >= 0;
      }
      parseFSharpPipelineBody(t) {
        let e = this.state.startLoc;
        this.state.potentialArrowAt = this.state.start;
        let s = this.state.inFSharpPipelineDirectBody;
        this.state.inFSharpPipelineDirectBody = true;
        let i = this.parseExprOp(this.parseMaybeUnaryOrPrivate(), e, t);
        return this.state.inFSharpPipelineDirectBody = s, i;
      }
      parseModuleExpression() {
        this.expectPlugin("moduleBlocks");
        let t = this.startNode();
        this.next(), this.match(5) || this.unexpected(null, 5);
        let e = this.startNodeAt(this.state.endLoc);
        this.next();
        let s = this.initializeScopes(true);
        this.enterInitialScopes();
        try {
          t.body = this.parseProgram(e, 8, "module");
        } finally {
          s();
        }
        return this.finishNode(t, "ModuleExpression");
      }
      parsePropertyNamePrefixOperator(t) {
      }
    }, qe = { kind: 1 }, Br = { kind: 2 }, Rr = /[\uD800-\uDFFF]/u, ze = /in(?:stanceof)?/y;
    function _r(a, t, e) {
      for (let s = 0; s < a.length; s++) {
        let i = a[s], { type: r } = i;
        if (typeof r == "number") {
          {
            if (r === 139) {
              let { loc: n, start: o, value: l, end: h } = i, c = o + 1, u = D(n.start, 1);
              a.splice(s, 1, new O({ type: R(27), value: "#", start: o, end: c, startLoc: n.start, endLoc: u }), new O({ type: R(132), value: l, start: c, end: h, startLoc: u, endLoc: n.end })), s++;
              continue;
            }
            if (Ie(r)) {
              let { loc: n, start: o, value: l, end: h } = i, c = o + 1, u = D(n.start, 1), f;
              t.charCodeAt(o - e) === 96 ? f = new O({ type: R(22), value: "`", start: o, end: c, startLoc: n.start, endLoc: u }) : f = new O({ type: R(8), value: "}", start: o, end: c, startLoc: n.start, endLoc: u });
              let d, x, A, N;
              r === 24 ? (x = h - 1, A = D(n.end, -1), d = l === null ? null : l.slice(1, -1), N = new O({ type: R(22), value: "`", start: x, end: h, startLoc: A, endLoc: n.end })) : (x = h - 2, A = D(n.end, -2), d = l === null ? null : l.slice(1, -2), N = new O({ type: R(23), value: "${", start: x, end: h, startLoc: A, endLoc: n.end })), a.splice(s, 1, f, new O({ type: R(20), value: d, start: c, end: x, startLoc: u, endLoc: A }), N), s += 2;
              continue;
            }
          }
          i.type = R(r);
        }
      }
      return a;
    }
    var ct = class extends ht {
      parseTopLevel(t, e) {
        return t.program = this.parseProgram(e), t.comments = this.comments, this.optionFlags & 256 && (t.tokens = _r(this.tokens, this.input, this.startIndex)), this.finishNode(t, "File");
      }
      parseProgram(t, e = 140, s = this.options.sourceType) {
        if (t.sourceType = s, t.interpreter = this.parseInterpreterDirective(), this.parseBlockBody(t, true, true, e), this.inModule) {
          if (!(this.optionFlags & 64) && this.scope.undefinedExports.size > 0) for (let [r, n] of Array.from(this.scope.undefinedExports)) this.raise(p.ModuleExportUndefined, n, { localName: r });
          this.addExtra(t, "topLevelAwait", this.state.hasTopLevelAwait);
        }
        let i;
        return e === 140 ? i = this.finishNode(t, "Program") : i = this.finishNodeAt(t, "Program", D(this.state.startLoc, -1)), i;
      }
      stmtToDirective(t) {
        let e = this.castNodeTo(t, "Directive"), s = this.castNodeTo(t.expression, "DirectiveLiteral"), i = s.value, r = this.input.slice(this.offsetToSourcePos(s.start), this.offsetToSourcePos(s.end)), n = s.value = r.slice(1, -1);
        return this.addExtra(s, "raw", r), this.addExtra(s, "rawValue", n), this.addExtra(s, "expressionValue", i), e.value = s, delete t.expression, e;
      }
      parseInterpreterDirective() {
        if (!this.match(28)) return null;
        let t = this.startNode();
        return t.value = this.state.value, this.next(), this.finishNode(t, "InterpreterDirective");
      }
      isLet() {
        return this.isContextual(100) ? this.hasFollowingBindingAtom() : false;
      }
      isUsing() {
        if (!this.isContextual(107)) return false;
        let t = this.nextTokenInLineStart(), e = this.codePointAtPos(t);
        return this.chStartsBindingIdentifier(e, t);
      }
      isForUsing() {
        if (!this.isContextual(107)) return false;
        let t = this.nextTokenInLineStart(), e = this.codePointAtPos(t);
        if (this.isUnparsedContextual(t, "of")) {
          let s = this.lookaheadCharCodeSince(t + 2);
          if (s !== 61 && s !== 58 && s !== 59) return false;
        }
        return this.chStartsBindingIdentifier(e, t) ? (this.expectPlugin("explicitResourceManagement"), true) : false;
      }
      isAwaitUsing() {
        if (!this.isContextual(96)) return false;
        let t = this.nextTokenInLineStart();
        if (this.isUnparsedContextual(t, "using")) {
          t = this.nextTokenInLineStartSince(t + 5);
          let e = this.codePointAtPos(t);
          if (this.chStartsBindingIdentifier(e, t)) return this.expectPlugin("explicitResourceManagement"), true;
        }
        return false;
      }
      chStartsBindingIdentifier(t, e) {
        if (U(t)) {
          if (ze.lastIndex = e, ze.test(this.input)) {
            let s = this.codePointAtPos(ze.lastIndex);
            if (!Z(s) && s !== 92) return false;
          }
          return true;
        } else return t === 92;
      }
      chStartsBindingPattern(t) {
        return t === 91 || t === 123;
      }
      hasFollowingBindingAtom() {
        let t = this.nextTokenStart(), e = this.codePointAtPos(t);
        return this.chStartsBindingPattern(e) || this.chStartsBindingIdentifier(e, t);
      }
      hasInLineFollowingBindingIdentifierOrBrace() {
        let t = this.nextTokenInLineStart(), e = this.codePointAtPos(t);
        return e === 123 || this.chStartsBindingIdentifier(e, t);
      }
      allowsUsing() {
        return (this.scope.inModule || !this.scope.inTopLevel) && !this.scope.inBareCaseStatement;
      }
      parseModuleItem() {
        return this.parseStatementLike(15);
      }
      parseStatementListItem() {
        return this.parseStatementLike(6 | (!this.options.annexB || this.state.strict ? 0 : 8));
      }
      parseStatementOrSloppyAnnexBFunctionDeclaration(t = false) {
        let e = 0;
        return this.options.annexB && !this.state.strict && (e |= 4, t && (e |= 8)), this.parseStatementLike(e);
      }
      parseStatement() {
        return this.parseStatementLike(0);
      }
      parseStatementLike(t) {
        let e = null;
        return this.match(26) && (e = this.parseDecorators(true)), this.parseStatementContent(t, e);
      }
      parseStatementContent(t, e) {
        let s = this.state.type, i = this.startNode(), r = !!(t & 2), n = !!(t & 4), o = t & 1;
        switch (s) {
          case 60:
            return this.parseBreakContinueStatement(i, true);
          case 63:
            return this.parseBreakContinueStatement(i, false);
          case 64:
            return this.parseDebuggerStatement(i);
          case 90:
            return this.parseDoWhileStatement(i);
          case 91:
            return this.parseForStatement(i);
          case 68:
            if (this.lookaheadCharCode() === 46) break;
            return n || this.raise(this.state.strict ? p.StrictFunction : this.options.annexB ? p.SloppyFunctionAnnexB : p.SloppyFunction, this.state.startLoc), this.parseFunctionStatement(i, false, !r && n);
          case 80:
            return r || this.unexpected(), this.parseClass(this.maybeTakeDecorators(e, i), true);
          case 69:
            return this.parseIfStatement(i);
          case 70:
            return this.parseReturnStatement(i);
          case 71:
            return this.parseSwitchStatement(i);
          case 72:
            return this.parseThrowStatement(i);
          case 73:
            return this.parseTryStatement(i);
          case 96:
            if (this.isAwaitUsing()) return this.allowsUsing() ? r ? this.recordAwaitIfAllowed() || this.raise(p.AwaitUsingNotInAsyncContext, i) : this.raise(p.UnexpectedLexicalDeclaration, i) : this.raise(p.UnexpectedUsingDeclaration, i), this.next(), this.parseVarStatement(i, "await using");
            break;
          case 107:
            if (this.state.containsEsc || !this.hasInLineFollowingBindingIdentifierOrBrace()) break;
            return this.expectPlugin("explicitResourceManagement"), this.allowsUsing() ? r || this.raise(p.UnexpectedLexicalDeclaration, this.state.startLoc) : this.raise(p.UnexpectedUsingDeclaration, this.state.startLoc), this.parseVarStatement(i, "using");
          case 100: {
            if (this.state.containsEsc) break;
            let c = this.nextTokenStart(), u = this.codePointAtPos(c);
            if (u !== 91 && (!r && this.hasFollowingLineBreak() || !this.chStartsBindingIdentifier(u, c) && u !== 123)) break;
          }
          case 75:
            r || this.raise(p.UnexpectedLexicalDeclaration, this.state.startLoc);
          case 74: {
            let c = this.state.value;
            return this.parseVarStatement(i, c);
          }
          case 92:
            return this.parseWhileStatement(i);
          case 76:
            return this.parseWithStatement(i);
          case 5:
            return this.parseBlock();
          case 13:
            return this.parseEmptyStatement(i);
          case 83: {
            let c = this.lookaheadCharCode();
            if (c === 40 || c === 46) break;
          }
          case 82: {
            !(this.optionFlags & 8) && !o && this.raise(p.UnexpectedImportExport, this.state.startLoc), this.next();
            let c;
            return s === 83 ? c = this.parseImport(i) : c = this.parseExport(i, e), this.assertModuleNodeAllowed(c), c;
          }
          default:
            if (this.isAsyncFunction()) return r || this.raise(p.AsyncFunctionInSingleStatementContext, this.state.startLoc), this.next(), this.parseFunctionStatement(i, true, !r && n);
        }
        let l = this.state.value, h = this.parseExpression();
        return w(s) && h.type === "Identifier" && this.eat(14) ? this.parseLabeledStatement(i, l, h, t) : this.parseExpressionStatement(i, h, e);
      }
      assertModuleNodeAllowed(t) {
        !(this.optionFlags & 8) && !this.inModule && this.raise(p.ImportOutsideModule, t);
      }
      decoratorsEnabledBeforeExport() {
        return this.hasPlugin("decorators-legacy") ? true : this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") !== false;
      }
      maybeTakeDecorators(t, e, s) {
        if (t) {
          var i;
          (i = e.decorators) != null && i.length ? (typeof this.getPluginOption("decorators", "decoratorsBeforeExport") != "boolean" && this.raise(p.DecoratorsBeforeAfterExport, e.decorators[0]), e.decorators.unshift(...t)) : e.decorators = t, this.resetStartLocationFromNode(e, t[0]), s && this.resetStartLocationFromNode(s, e);
        }
        return e;
      }
      canHaveLeadingDecorator() {
        return this.match(80);
      }
      parseDecorators(t) {
        let e = [];
        do
          e.push(this.parseDecorator());
        while (this.match(26));
        if (this.match(82)) t || this.unexpected(), this.decoratorsEnabledBeforeExport() || this.raise(p.DecoratorExportClass, this.state.startLoc);
        else if (!this.canHaveLeadingDecorator()) throw this.raise(p.UnexpectedLeadingDecorator, this.state.startLoc);
        return e;
      }
      parseDecorator() {
        this.expectOnePlugin(["decorators", "decorators-legacy"]);
        let t = this.startNode();
        if (this.next(), this.hasPlugin("decorators")) {
          let e = this.state.startLoc, s;
          if (this.match(10)) {
            let i = this.state.startLoc;
            this.next(), s = this.parseExpression(), this.expect(11), s = this.wrapParenthesis(i, s);
            let r = this.state.startLoc;
            t.expression = this.parseMaybeDecoratorArguments(s, i), this.getPluginOption("decorators", "allowCallParenthesized") === false && t.expression !== s && this.raise(p.DecoratorArgumentsOutsideParentheses, r);
          } else {
            for (s = this.parseIdentifier(false); this.eat(16); ) {
              let i = this.startNodeAt(e);
              i.object = s, this.match(139) ? (this.classScope.usePrivateName(this.state.value, this.state.startLoc), i.property = this.parsePrivateName()) : i.property = this.parseIdentifier(true), i.computed = false, s = this.finishNode(i, "MemberExpression");
            }
            t.expression = this.parseMaybeDecoratorArguments(s, e);
          }
        } else t.expression = this.parseExprSubscripts();
        return this.finishNode(t, "Decorator");
      }
      parseMaybeDecoratorArguments(t, e) {
        if (this.eat(10)) {
          let s = this.startNodeAt(e);
          return s.callee = t, s.arguments = this.parseCallExpressionArguments(11), this.toReferencedList(s.arguments), this.finishNode(s, "CallExpression");
        }
        return t;
      }
      parseBreakContinueStatement(t, e) {
        return this.next(), this.isLineTerminator() ? t.label = null : (t.label = this.parseIdentifier(), this.semicolon()), this.verifyBreakContinue(t, e), this.finishNode(t, e ? "BreakStatement" : "ContinueStatement");
      }
      verifyBreakContinue(t, e) {
        let s;
        for (s = 0; s < this.state.labels.length; ++s) {
          let i = this.state.labels[s];
          if ((t.label == null || i.name === t.label.name) && (i.kind != null && (e || i.kind === 1) || t.label && e)) break;
        }
        if (s === this.state.labels.length) {
          let i = e ? "BreakStatement" : "ContinueStatement";
          this.raise(p.IllegalBreakContinue, t, { type: i });
        }
      }
      parseDebuggerStatement(t) {
        return this.next(), this.semicolon(), this.finishNode(t, "DebuggerStatement");
      }
      parseHeaderExpression() {
        this.expect(10);
        let t = this.parseExpression();
        return this.expect(11), t;
      }
      parseDoWhileStatement(t) {
        return this.next(), this.state.labels.push(qe), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.state.labels.pop(), this.expect(92), t.test = this.parseHeaderExpression(), this.eat(13), this.finishNode(t, "DoWhileStatement");
      }
      parseForStatement(t) {
        this.next(), this.state.labels.push(qe);
        let e = null;
        if (this.isContextual(96) && this.recordAwaitIfAllowed() && (e = this.state.startLoc, this.next()), this.scope.enter(0), this.expect(10), this.match(13)) return e !== null && this.unexpected(e), this.parseFor(t, null);
        let s = this.isContextual(100);
        {
          let l = this.isAwaitUsing(), h = l || this.isForUsing(), c = s && this.hasFollowingBindingAtom() || h;
          if (this.match(74) || this.match(75) || c) {
            let u = this.startNode(), f;
            l ? (f = "await using", this.recordAwaitIfAllowed() || this.raise(p.AwaitUsingNotInAsyncContext, this.state.startLoc), this.next()) : f = this.state.value, this.next(), this.parseVar(u, true, f);
            let d = this.finishNode(u, "VariableDeclaration"), x = this.match(58);
            return x && h && this.raise(p.ForInUsing, d), (x || this.isContextual(102)) && d.declarations.length === 1 ? this.parseForIn(t, d, e) : (e !== null && this.unexpected(e), this.parseFor(t, d));
          }
        }
        let i = this.isContextual(95), r = new te(), n = this.parseExpression(true, r), o = this.isContextual(102);
        if (o && (s && this.raise(p.ForOfLet, n), e === null && i && n.type === "Identifier" && this.raise(p.ForOfAsync, n)), o || this.match(58)) {
          this.checkDestructuringPrivate(r), this.toAssignable(n, true);
          let l = o ? "ForOfStatement" : "ForInStatement";
          return this.checkLVal(n, { type: l }), this.parseForIn(t, n, e);
        } else this.checkExpressionErrors(r, true);
        return e !== null && this.unexpected(e), this.parseFor(t, n);
      }
      parseFunctionStatement(t, e, s) {
        return this.next(), this.parseFunction(t, 1 | (s ? 2 : 0) | (e ? 8 : 0));
      }
      parseIfStatement(t) {
        return this.next(), t.test = this.parseHeaderExpression(), t.consequent = this.parseStatementOrSloppyAnnexBFunctionDeclaration(), t.alternate = this.eat(66) ? this.parseStatementOrSloppyAnnexBFunctionDeclaration() : null, this.finishNode(t, "IfStatement");
      }
      parseReturnStatement(t) {
        return this.prodParam.hasReturn || this.raise(p.IllegalReturn, this.state.startLoc), this.next(), this.isLineTerminator() ? t.argument = null : (t.argument = this.parseExpression(), this.semicolon()), this.finishNode(t, "ReturnStatement");
      }
      parseSwitchStatement(t) {
        this.next(), t.discriminant = this.parseHeaderExpression();
        let e = t.cases = [];
        this.expect(5), this.state.labels.push(Br), this.scope.enter(256);
        let s;
        for (let i; !this.match(8); ) if (this.match(61) || this.match(65)) {
          let r = this.match(61);
          s && this.finishNode(s, "SwitchCase"), e.push(s = this.startNode()), s.consequent = [], this.next(), r ? s.test = this.parseExpression() : (i && this.raise(p.MultipleDefaultsInSwitch, this.state.lastTokStartLoc), i = true, s.test = null), this.expect(14);
        } else s ? s.consequent.push(this.parseStatementListItem()) : this.unexpected();
        return this.scope.exit(), s && this.finishNode(s, "SwitchCase"), this.next(), this.state.labels.pop(), this.finishNode(t, "SwitchStatement");
      }
      parseThrowStatement(t) {
        return this.next(), this.hasPrecedingLineBreak() && this.raise(p.NewlineAfterThrow, this.state.lastTokEndLoc), t.argument = this.parseExpression(), this.semicolon(), this.finishNode(t, "ThrowStatement");
      }
      parseCatchClauseParam() {
        let t = this.parseBindingAtom();
        return this.scope.enter(this.options.annexB && t.type === "Identifier" ? 8 : 0), this.checkLVal(t, { type: "CatchClause" }, 9), t;
      }
      parseTryStatement(t) {
        if (this.next(), t.block = this.parseBlock(), t.handler = null, this.match(62)) {
          let e = this.startNode();
          this.next(), this.match(10) ? (this.expect(10), e.param = this.parseCatchClauseParam(), this.expect(11)) : (e.param = null, this.scope.enter(0)), e.body = this.withSmartMixTopicForbiddingContext(() => this.parseBlock(false, false)), this.scope.exit(), t.handler = this.finishNode(e, "CatchClause");
        }
        return t.finalizer = this.eat(67) ? this.parseBlock() : null, !t.handler && !t.finalizer && this.raise(p.NoCatchOrFinally, t), this.finishNode(t, "TryStatement");
      }
      parseVarStatement(t, e, s = false) {
        return this.next(), this.parseVar(t, false, e, s), this.semicolon(), this.finishNode(t, "VariableDeclaration");
      }
      parseWhileStatement(t) {
        return this.next(), t.test = this.parseHeaderExpression(), this.state.labels.push(qe), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.state.labels.pop(), this.finishNode(t, "WhileStatement");
      }
      parseWithStatement(t) {
        return this.state.strict && this.raise(p.StrictWith, this.state.startLoc), this.next(), t.object = this.parseHeaderExpression(), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.finishNode(t, "WithStatement");
      }
      parseEmptyStatement(t) {
        return this.next(), this.finishNode(t, "EmptyStatement");
      }
      parseLabeledStatement(t, e, s, i) {
        for (let n of this.state.labels) n.name === e && this.raise(p.LabelRedeclaration, s, { labelName: e });
        let r = Hi(this.state.type) ? 1 : this.match(71) ? 2 : null;
        for (let n = this.state.labels.length - 1; n >= 0; n--) {
          let o = this.state.labels[n];
          if (o.statementStart === t.start) o.statementStart = this.sourceToOffsetPos(this.state.start), o.kind = r;
          else break;
        }
        return this.state.labels.push({ name: e, kind: r, statementStart: this.sourceToOffsetPos(this.state.start) }), t.body = i & 8 ? this.parseStatementOrSloppyAnnexBFunctionDeclaration(true) : this.parseStatement(), this.state.labels.pop(), t.label = s, this.finishNode(t, "LabeledStatement");
      }
      parseExpressionStatement(t, e, s) {
        return t.expression = e, this.semicolon(), this.finishNode(t, "ExpressionStatement");
      }
      parseBlock(t = false, e = true, s) {
        let i = this.startNode();
        return t && this.state.strictErrors.clear(), this.expect(5), e && this.scope.enter(0), this.parseBlockBody(i, t, false, 8, s), e && this.scope.exit(), this.finishNode(i, "BlockStatement");
      }
      isValidDirective(t) {
        return t.type === "ExpressionStatement" && t.expression.type === "StringLiteral" && !t.expression.extra.parenthesized;
      }
      parseBlockBody(t, e, s, i, r) {
        let n = t.body = [], o = t.directives = [];
        this.parseBlockOrModuleBlockBody(n, e ? o : void 0, s, i, r);
      }
      parseBlockOrModuleBlockBody(t, e, s, i, r) {
        let n = this.state.strict, o = false, l = false;
        for (; !this.match(i); ) {
          let h = s ? this.parseModuleItem() : this.parseStatementListItem();
          if (e && !l) {
            if (this.isValidDirective(h)) {
              let c = this.stmtToDirective(h);
              e.push(c), !o && c.value.value === "use strict" && (o = true, this.setStrict(true));
              continue;
            }
            l = true, this.state.strictErrors.clear();
          }
          t.push(h);
        }
        r == null || r.call(this, o), n || this.setStrict(false), this.next();
      }
      parseFor(t, e) {
        return t.init = e, this.semicolon(false), t.test = this.match(13) ? null : this.parseExpression(), this.semicolon(false), t.update = this.match(11) ? null : this.parseExpression(), this.expect(11), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.scope.exit(), this.state.labels.pop(), this.finishNode(t, "ForStatement");
      }
      parseForIn(t, e, s) {
        let i = this.match(58);
        return this.next(), i ? s !== null && this.unexpected(s) : t.await = s !== null, e.type === "VariableDeclaration" && e.declarations[0].init != null && (!i || !this.options.annexB || this.state.strict || e.kind !== "var" || e.declarations[0].id.type !== "Identifier") && this.raise(p.ForInOfLoopInitializer, e, { type: i ? "ForInStatement" : "ForOfStatement" }), e.type === "AssignmentPattern" && this.raise(p.InvalidLhs, e, { ancestor: { type: "ForStatement" } }), t.left = e, t.right = i ? this.parseExpression() : this.parseMaybeAssignAllowIn(), this.expect(11), t.body = this.withSmartMixTopicForbiddingContext(() => this.parseStatement()), this.scope.exit(), this.state.labels.pop(), this.finishNode(t, i ? "ForInStatement" : "ForOfStatement");
      }
      parseVar(t, e, s, i = false) {
        let r = t.declarations = [];
        for (t.kind = s; ; ) {
          let n = this.startNode();
          if (this.parseVarId(n, s), n.init = this.eat(29) ? e ? this.parseMaybeAssignDisallowIn() : this.parseMaybeAssignAllowIn() : null, n.init === null && !i && (n.id.type !== "Identifier" && !(e && (this.match(58) || this.isContextual(102))) ? this.raise(p.DeclarationMissingInitializer, this.state.lastTokEndLoc, { kind: "destructuring" }) : (s === "const" || s === "using" || s === "await using") && !(this.match(58) || this.isContextual(102)) && this.raise(p.DeclarationMissingInitializer, this.state.lastTokEndLoc, { kind: s })), r.push(this.finishNode(n, "VariableDeclarator")), !this.eat(12)) break;
        }
        return t;
      }
      parseVarId(t, e) {
        let s = this.parseBindingAtom();
        (e === "using" || e === "await using") && (s.type === "ArrayPattern" || s.type === "ObjectPattern") && this.raise(p.UsingDeclarationHasBindingPattern, s.loc.start), this.checkLVal(s, { type: "VariableDeclarator" }, e === "var" ? 5 : 8201), t.id = s;
      }
      parseAsyncFunctionExpression(t) {
        return this.parseFunction(t, 8);
      }
      parseFunction(t, e = 0) {
        let s = e & 2, i = !!(e & 1), r = i && !(e & 4), n = !!(e & 8);
        this.initFunction(t, n), this.match(55) && (s && this.raise(p.GeneratorInSingleStatementContext, this.state.startLoc), this.next(), t.generator = true), i && (t.id = this.parseFunctionId(r));
        let o = this.state.maybeInArrowParameters;
        return this.state.maybeInArrowParameters = false, this.scope.enter(514), this.prodParam.enter(Ce(n, t.generator)), i || (t.id = this.parseFunctionId()), this.parseFunctionParams(t, false), this.withSmartMixTopicForbiddingContext(() => {
          this.parseFunctionBodyAndFinish(t, i ? "FunctionDeclaration" : "FunctionExpression");
        }), this.prodParam.exit(), this.scope.exit(), i && !s && this.registerFunctionStatementId(t), this.state.maybeInArrowParameters = o, t;
      }
      parseFunctionId(t) {
        return t || w(this.state.type) ? this.parseIdentifier() : null;
      }
      parseFunctionParams(t, e) {
        this.expect(10), this.expressionScope.enter(Ar()), t.params = this.parseBindingList(11, 41, 2 | (e ? 4 : 0)), this.expressionScope.exit();
      }
      registerFunctionStatementId(t) {
        t.id && this.scope.declareName(t.id.name, !this.options.annexB || this.state.strict || t.generator || t.async ? this.scope.treatFunctionsAsVar ? 5 : 8201 : 17, t.id.loc.start);
      }
      parseClass(t, e, s) {
        this.next();
        let i = this.state.strict;
        return this.state.strict = true, this.parseClassId(t, e, s), this.parseClassSuper(t), t.body = this.parseClassBody(!!t.superClass, i), this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression");
      }
      isClassProperty() {
        return this.match(29) || this.match(13) || this.match(8);
      }
      isClassMethod() {
        return this.match(10);
      }
      nameIsConstructor(t) {
        return t.type === "Identifier" && t.name === "constructor" || t.type === "StringLiteral" && t.value === "constructor";
      }
      isNonstaticConstructor(t) {
        return !t.computed && !t.static && this.nameIsConstructor(t.key);
      }
      parseClassBody(t, e) {
        this.classScope.enter();
        let s = { hadConstructor: false, hadSuperClass: t }, i = [], r = this.startNode();
        if (r.body = [], this.expect(5), this.withSmartMixTopicForbiddingContext(() => {
          for (; !this.match(8); ) {
            if (this.eat(13)) {
              if (i.length > 0) throw this.raise(p.DecoratorSemicolon, this.state.lastTokEndLoc);
              continue;
            }
            if (this.match(26)) {
              i.push(this.parseDecorator());
              continue;
            }
            let n = this.startNode();
            i.length && (n.decorators = i, this.resetStartLocationFromNode(n, i[0]), i = []), this.parseClassMember(r, n, s), n.kind === "constructor" && n.decorators && n.decorators.length > 0 && this.raise(p.DecoratorConstructor, n);
          }
        }), this.state.strict = e, this.next(), i.length) throw this.raise(p.TrailingDecorator, this.state.startLoc);
        return this.classScope.exit(), this.finishNode(r, "ClassBody");
      }
      parseClassMemberFromModifier(t, e) {
        let s = this.parseIdentifier(true);
        if (this.isClassMethod()) {
          let i = e;
          return i.kind = "method", i.computed = false, i.key = s, i.static = false, this.pushClassMethod(t, i, false, false, false, false), true;
        } else if (this.isClassProperty()) {
          let i = e;
          return i.computed = false, i.key = s, i.static = false, t.body.push(this.parseClassProperty(i)), true;
        }
        return this.resetPreviousNodeTrailingComments(s), false;
      }
      parseClassMember(t, e, s) {
        let i = this.isContextual(106);
        if (i) {
          if (this.parseClassMemberFromModifier(t, e)) return;
          if (this.eat(5)) {
            this.parseClassStaticBlock(t, e);
            return;
          }
        }
        this.parseClassMemberWithIsStatic(t, e, s, i);
      }
      parseClassMemberWithIsStatic(t, e, s, i) {
        let r = e, n = e, o = e, l = e, h = e, c = r, u = r;
        if (e.static = i, this.parsePropertyNamePrefixOperator(e), this.eat(55)) {
          c.kind = "method";
          let S = this.match(139);
          if (this.parseClassElementName(c), this.parsePostMemberNameModifiers(c), S) {
            this.pushClassPrivateMethod(t, n, true, false);
            return;
          }
          this.isNonstaticConstructor(r) && this.raise(p.ConstructorIsGenerator, r.key), this.pushClassMethod(t, r, true, false, false, false);
          return;
        }
        let f = !this.state.containsEsc && w(this.state.type), d = this.parseClassElementName(e), x = f ? d.name : null, A = this.isPrivateName(d), N = this.state.startLoc;
        if (this.parsePostMemberNameModifiers(u), this.isClassMethod()) {
          if (c.kind = "method", A) {
            this.pushClassPrivateMethod(t, n, false, false);
            return;
          }
          let S = this.isNonstaticConstructor(r), I = false;
          S && (r.kind = "constructor", s.hadConstructor && !this.hasPlugin("typescript") && this.raise(p.DuplicateConstructor, d), S && this.hasPlugin("typescript") && e.override && this.raise(p.OverrideOnConstructor, d), s.hadConstructor = true, I = s.hadSuperClass), this.pushClassMethod(t, r, false, false, S, I);
        } else if (this.isClassProperty()) A ? this.pushClassPrivateProperty(t, l) : this.pushClassProperty(t, o);
        else if (x === "async" && !this.isLineTerminator()) {
          this.resetPreviousNodeTrailingComments(d);
          let S = this.eat(55);
          u.optional && this.unexpected(N), c.kind = "method";
          let I = this.match(139);
          this.parseClassElementName(c), this.parsePostMemberNameModifiers(u), I ? this.pushClassPrivateMethod(t, n, S, true) : (this.isNonstaticConstructor(r) && this.raise(p.ConstructorIsAsync, r.key), this.pushClassMethod(t, r, S, true, false, false));
        } else if ((x === "get" || x === "set") && !(this.match(55) && this.isLineTerminator())) {
          this.resetPreviousNodeTrailingComments(d), c.kind = x;
          let S = this.match(139);
          this.parseClassElementName(r), S ? this.pushClassPrivateMethod(t, n, false, false) : (this.isNonstaticConstructor(r) && this.raise(p.ConstructorIsAccessor, r.key), this.pushClassMethod(t, r, false, false, false, false)), this.checkGetterSetterParams(r);
        } else if (x === "accessor" && !this.isLineTerminator()) {
          this.expectPlugin("decoratorAutoAccessors"), this.resetPreviousNodeTrailingComments(d);
          let S = this.match(139);
          this.parseClassElementName(o), this.pushClassAccessorProperty(t, h, S);
        } else this.isLineTerminator() ? A ? this.pushClassPrivateProperty(t, l) : this.pushClassProperty(t, o) : this.unexpected();
      }
      parseClassElementName(t) {
        let { type: e, value: s } = this.state;
        if ((e === 132 || e === 134) && t.static && s === "prototype" && this.raise(p.StaticPrototype, this.state.startLoc), e === 139) {
          s === "constructor" && this.raise(p.ConstructorClassPrivateField, this.state.startLoc);
          let i = this.parsePrivateName();
          return t.key = i, i;
        }
        return this.parsePropertyName(t), t.key;
      }
      parseClassStaticBlock(t, e) {
        var s;
        this.scope.enter(720);
        let i = this.state.labels;
        this.state.labels = [], this.prodParam.enter(0);
        let r = e.body = [];
        this.parseBlockOrModuleBlockBody(r, void 0, false, 8), this.prodParam.exit(), this.scope.exit(), this.state.labels = i, t.body.push(this.finishNode(e, "StaticBlock")), (s = e.decorators) != null && s.length && this.raise(p.DecoratorStaticBlock, e);
      }
      pushClassProperty(t, e) {
        !e.computed && this.nameIsConstructor(e.key) && this.raise(p.ConstructorClassField, e.key), t.body.push(this.parseClassProperty(e));
      }
      pushClassPrivateProperty(t, e) {
        let s = this.parseClassPrivateProperty(e);
        t.body.push(s), this.classScope.declarePrivateName(this.getPrivateNameSV(s.key), 0, s.key.loc.start);
      }
      pushClassAccessorProperty(t, e, s) {
        !s && !e.computed && this.nameIsConstructor(e.key) && this.raise(p.ConstructorClassField, e.key);
        let i = this.parseClassAccessorProperty(e);
        t.body.push(i), s && this.classScope.declarePrivateName(this.getPrivateNameSV(i.key), 0, i.key.loc.start);
      }
      pushClassMethod(t, e, s, i, r, n) {
        t.body.push(this.parseMethod(e, s, i, r, n, "ClassMethod", true));
      }
      pushClassPrivateMethod(t, e, s, i) {
        let r = this.parseMethod(e, s, i, false, false, "ClassPrivateMethod", true);
        t.body.push(r);
        let n = r.kind === "get" ? r.static ? 6 : 2 : r.kind === "set" ? r.static ? 5 : 1 : 0;
        this.declareClassPrivateMethodInScope(r, n);
      }
      declareClassPrivateMethodInScope(t, e) {
        this.classScope.declarePrivateName(this.getPrivateNameSV(t.key), e, t.key.loc.start);
      }
      parsePostMemberNameModifiers(t) {
      }
      parseClassPrivateProperty(t) {
        return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassPrivateProperty");
      }
      parseClassProperty(t) {
        return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassProperty");
      }
      parseClassAccessorProperty(t) {
        return this.parseInitializer(t), this.semicolon(), this.finishNode(t, "ClassAccessorProperty");
      }
      parseInitializer(t) {
        this.scope.enter(592), this.expressionScope.enter(Os()), this.prodParam.enter(0), t.value = this.eat(29) ? this.parseMaybeAssignAllowIn() : null, this.expressionScope.exit(), this.prodParam.exit(), this.scope.exit();
      }
      parseClassId(t, e, s, i = 8331) {
        if (w(this.state.type)) t.id = this.parseIdentifier(), e && this.declareNameFromIdentifier(t.id, i);
        else if (s || !e) t.id = null;
        else throw this.raise(p.MissingClassName, this.state.startLoc);
      }
      parseClassSuper(t) {
        t.superClass = this.eat(81) ? this.parseExprSubscripts() : null;
      }
      parseExport(t, e) {
        let s = this.parseMaybeImportPhase(t, true), i = this.maybeParseExportDefaultSpecifier(t, s), r = !i || this.eat(12), n = r && this.eatExportStar(t), o = n && this.maybeParseExportNamespaceSpecifier(t), l = r && (!o || this.eat(12)), h = i || n;
        if (n && !o) {
          if (i && this.unexpected(), e) throw this.raise(p.UnsupportedDecoratorExport, t);
          return this.parseExportFrom(t, true), this.sawUnambiguousESM = true, this.finishNode(t, "ExportAllDeclaration");
        }
        let c = this.maybeParseExportNamedSpecifiers(t);
        i && r && !n && !c && this.unexpected(null, 5), o && l && this.unexpected(null, 98);
        let u;
        if (h || c) {
          if (u = false, e) throw this.raise(p.UnsupportedDecoratorExport, t);
          this.parseExportFrom(t, h);
        } else u = this.maybeParseExportDeclaration(t);
        if (h || c || u) {
          var f;
          let d = t;
          if (this.checkExport(d, true, false, !!d.source), ((f = d.declaration) == null ? void 0 : f.type) === "ClassDeclaration") this.maybeTakeDecorators(e, d.declaration, d);
          else if (e) throw this.raise(p.UnsupportedDecoratorExport, t);
          return this.sawUnambiguousESM = true, this.finishNode(d, "ExportNamedDeclaration");
        }
        if (this.eat(65)) {
          let d = t, x = this.parseExportDefaultExpression();
          if (d.declaration = x, x.type === "ClassDeclaration") this.maybeTakeDecorators(e, x, d);
          else if (e) throw this.raise(p.UnsupportedDecoratorExport, t);
          return this.checkExport(d, true, true), this.sawUnambiguousESM = true, this.finishNode(d, "ExportDefaultDeclaration");
        }
        this.unexpected(null, 5);
      }
      eatExportStar(t) {
        return this.eat(55);
      }
      maybeParseExportDefaultSpecifier(t, e) {
        if (e || this.isExportDefaultSpecifier()) {
          this.expectPlugin("exportDefaultFrom", e == null ? void 0 : e.loc.start);
          let s = e || this.parseIdentifier(true), i = this.startNodeAtNode(s);
          return i.exported = s, t.specifiers = [this.finishNode(i, "ExportDefaultSpecifier")], true;
        }
        return false;
      }
      maybeParseExportNamespaceSpecifier(t) {
        if (this.isContextual(93)) {
          var e;
          (e = t).specifiers != null || (e.specifiers = []);
          let i = this.startNodeAt(this.state.lastTokStartLoc);
          return this.next(), i.exported = this.parseModuleExportName(), t.specifiers.push(this.finishNode(i, "ExportNamespaceSpecifier")), true;
        }
        return false;
      }
      maybeParseExportNamedSpecifiers(t) {
        if (this.match(5)) {
          let e = t;
          e.specifiers || (e.specifiers = []);
          let s = e.exportKind === "type";
          return e.specifiers.push(...this.parseExportSpecifiers(s)), e.source = null, this.hasPlugin("importAssertions") ? e.assertions = [] : e.attributes = [], e.declaration = null, true;
        }
        return false;
      }
      maybeParseExportDeclaration(t) {
        return this.shouldParseExportDeclaration() ? (t.specifiers = [], t.source = null, this.hasPlugin("importAssertions") ? t.assertions = [] : t.attributes = [], t.declaration = this.parseExportDeclaration(t), true) : false;
      }
      isAsyncFunction() {
        if (!this.isContextual(95)) return false;
        let t = this.nextTokenInLineStart();
        return this.isUnparsedContextual(t, "function");
      }
      parseExportDefaultExpression() {
        let t = this.startNode();
        if (this.match(68)) return this.next(), this.parseFunction(t, 5);
        if (this.isAsyncFunction()) return this.next(), this.next(), this.parseFunction(t, 13);
        if (this.match(80)) return this.parseClass(t, true, true);
        if (this.match(26)) return this.hasPlugin("decorators") && this.getPluginOption("decorators", "decoratorsBeforeExport") === true && this.raise(p.DecoratorBeforeExport, this.state.startLoc), this.parseClass(this.maybeTakeDecorators(this.parseDecorators(false), this.startNode()), true, true);
        if (this.match(75) || this.match(74) || this.isLet() || this.hasPlugin("explicitResourceManagement") && (this.isUsing() || this.isAwaitUsing())) throw this.raise(p.UnsupportedDefaultExport, this.state.startLoc);
        let e = this.parseMaybeAssignAllowIn();
        return this.semicolon(), e;
      }
      parseExportDeclaration(t) {
        return this.match(80) ? this.parseClass(this.startNode(), true, false) : this.parseStatementListItem();
      }
      isExportDefaultSpecifier() {
        let { type: t } = this.state;
        if (w(t)) {
          if (t === 95 && !this.state.containsEsc || t === 100) return false;
          if ((t === 130 || t === 129) && !this.state.containsEsc) {
            let i = this.nextTokenStart(), r = this.input.charCodeAt(i);
            if (r === 123 || this.chStartsBindingIdentifier(r, i) && !this.input.startsWith("from", i)) return this.expectOnePlugin(["flow", "typescript"]), false;
          }
        } else if (!this.match(65)) return false;
        let e = this.nextTokenStart(), s = this.isUnparsedContextual(e, "from");
        if (this.input.charCodeAt(e) === 44 || w(this.state.type) && s) return true;
        if (this.match(65) && s) {
          let i = this.input.charCodeAt(this.nextTokenStartSince(e + 4));
          return i === 34 || i === 39;
        }
        return false;
      }
      parseExportFrom(t, e) {
        this.eatContextual(98) ? (t.source = this.parseImportSource(), this.checkExport(t), this.maybeParseImportAttributes(t), this.checkJSONModuleImport(t)) : e && this.unexpected(), this.semicolon();
      }
      shouldParseExportDeclaration() {
        let { type: t } = this.state;
        if (t === 26 && (this.expectOnePlugin(["decorators", "decorators-legacy"]), this.hasPlugin("decorators"))) return this.getPluginOption("decorators", "decoratorsBeforeExport") === true && this.raise(p.DecoratorBeforeExport, this.state.startLoc), true;
        if (this.hasPlugin("explicitResourceManagement")) {
          if (this.isUsing()) return this.raise(p.UsingDeclarationExport, this.state.startLoc), true;
          if (this.isAwaitUsing()) return this.raise(p.UsingDeclarationExport, this.state.startLoc), true;
        }
        return t === 74 || t === 75 || t === 68 || t === 80 || this.isLet() || this.isAsyncFunction();
      }
      checkExport(t, e, s, i) {
        if (e) {
          var r;
          if (s) {
            if (this.checkDuplicateExports(t, "default"), this.hasPlugin("exportDefaultFrom")) {
              var n;
              let o = t.declaration;
              o.type === "Identifier" && o.name === "from" && o.end - o.start === 4 && !((n = o.extra) != null && n.parenthesized) && this.raise(p.ExportDefaultFromAsIdentifier, o);
            }
          } else if ((r = t.specifiers) != null && r.length) for (let o of t.specifiers) {
            let { exported: l } = o, h = l.type === "Identifier" ? l.name : l.value;
            if (this.checkDuplicateExports(o, h), !i && o.local) {
              let { local: c } = o;
              c.type !== "Identifier" ? this.raise(p.ExportBindingIsString, o, { localName: c.value, exportName: h }) : (this.checkReservedWord(c.name, c.loc.start, true, false), this.scope.checkLocalExport(c));
            }
          }
          else if (t.declaration) {
            let o = t.declaration;
            if (o.type === "FunctionDeclaration" || o.type === "ClassDeclaration") {
              let { id: l } = o;
              if (!l) throw new Error("Assertion failure");
              this.checkDuplicateExports(t, l.name);
            } else if (o.type === "VariableDeclaration") for (let l of o.declarations) this.checkDeclaration(l.id);
          }
        }
      }
      checkDeclaration(t) {
        if (t.type === "Identifier") this.checkDuplicateExports(t, t.name);
        else if (t.type === "ObjectPattern") for (let e of t.properties) this.checkDeclaration(e);
        else if (t.type === "ArrayPattern") for (let e of t.elements) e && this.checkDeclaration(e);
        else t.type === "ObjectProperty" ? this.checkDeclaration(t.value) : t.type === "RestElement" ? this.checkDeclaration(t.argument) : t.type === "AssignmentPattern" && this.checkDeclaration(t.left);
      }
      checkDuplicateExports(t, e) {
        this.exportedIdentifiers.has(e) && (e === "default" ? this.raise(p.DuplicateDefaultExport, t) : this.raise(p.DuplicateExport, t, { exportName: e })), this.exportedIdentifiers.add(e);
      }
      parseExportSpecifiers(t) {
        let e = [], s = true;
        for (this.expect(5); !this.eat(8); ) {
          if (s) s = false;
          else if (this.expect(12), this.eat(8)) break;
          let i = this.isContextual(130), r = this.match(134), n = this.startNode();
          n.local = this.parseModuleExportName(), e.push(this.parseExportSpecifier(n, r, t, i));
        }
        return e;
      }
      parseExportSpecifier(t, e, s, i) {
        return this.eatContextual(93) ? t.exported = this.parseModuleExportName() : e ? t.exported = this.cloneStringLiteral(t.local) : t.exported || (t.exported = this.cloneIdentifier(t.local)), this.finishNode(t, "ExportSpecifier");
      }
      parseModuleExportName() {
        if (this.match(134)) {
          let t = this.parseStringLiteral(this.state.value), e = Rr.exec(t.value);
          return e && this.raise(p.ModuleExportNameHasLoneSurrogate, t, { surrogateCharCode: e[0].charCodeAt(0) }), t;
        }
        return this.parseIdentifier(true);
      }
      isJSONModuleImport(t) {
        return t.assertions != null ? t.assertions.some(({ key: e, value: s }) => s.value === "json" && (e.type === "Identifier" ? e.name === "type" : e.value === "type")) : false;
      }
      checkImportReflection(t) {
        let { specifiers: e } = t, s = e.length === 1 ? e[0].type : null;
        if (t.phase === "source") s !== "ImportDefaultSpecifier" && this.raise(p.SourcePhaseImportRequiresDefault, e[0].loc.start);
        else if (t.phase === "defer") s !== "ImportNamespaceSpecifier" && this.raise(p.DeferImportRequiresNamespace, e[0].loc.start);
        else if (t.module) {
          var i;
          s !== "ImportDefaultSpecifier" && this.raise(p.ImportReflectionNotBinding, e[0].loc.start), ((i = t.assertions) == null ? void 0 : i.length) > 0 && this.raise(p.ImportReflectionHasAssertion, e[0].loc.start);
        }
      }
      checkJSONModuleImport(t) {
        if (this.isJSONModuleImport(t) && t.type !== "ExportAllDeclaration") {
          let { specifiers: e } = t;
          if (e != null) {
            let s = e.find((i) => {
              let r;
              if (i.type === "ExportSpecifier" ? r = i.local : i.type === "ImportSpecifier" && (r = i.imported), r !== void 0) return r.type === "Identifier" ? r.name !== "default" : r.value !== "default";
            });
            s !== void 0 && this.raise(p.ImportJSONBindingNotDefault, s.loc.start);
          }
        }
      }
      isPotentialImportPhase(t) {
        return t ? false : this.isContextual(105) || this.isContextual(97) || this.isContextual(127);
      }
      applyImportPhase(t, e, s, i) {
        e || (s === "module" ? (this.expectPlugin("importReflection", i), t.module = true) : this.hasPlugin("importReflection") && (t.module = false), s === "source" ? (this.expectPlugin("sourcePhaseImports", i), t.phase = "source") : s === "defer" ? (this.expectPlugin("deferredImportEvaluation", i), t.phase = "defer") : this.hasPlugin("sourcePhaseImports") && (t.phase = null));
      }
      parseMaybeImportPhase(t, e) {
        if (!this.isPotentialImportPhase(e)) return this.applyImportPhase(t, e, null), null;
        let s = this.startNode(), i = this.parseIdentifierName(true), { type: r } = this.state;
        return (M(r) ? r !== 98 || this.lookaheadCharCode() === 102 : r !== 12) ? (this.applyImportPhase(t, e, i, s.loc.start), null) : (this.applyImportPhase(t, e, null), this.createIdentifier(s, i));
      }
      isPrecedingIdImportPhase(t) {
        let { type: e } = this.state;
        return w(e) ? e !== 98 || this.lookaheadCharCode() === 102 : e !== 12;
      }
      parseImport(t) {
        return this.match(134) ? this.parseImportSourceAndAttributes(t) : this.parseImportSpecifiersAndAfter(t, this.parseMaybeImportPhase(t, false));
      }
      parseImportSpecifiersAndAfter(t, e) {
        t.specifiers = [];
        let i = !this.maybeParseDefaultImportSpecifier(t, e) || this.eat(12), r = i && this.maybeParseStarImportSpecifier(t);
        return i && !r && this.parseNamedImportSpecifiers(t), this.expectContextual(98), this.parseImportSourceAndAttributes(t);
      }
      parseImportSourceAndAttributes(t) {
        return t.specifiers != null || (t.specifiers = []), t.source = this.parseImportSource(), this.maybeParseImportAttributes(t), this.checkImportReflection(t), this.checkJSONModuleImport(t), this.semicolon(), this.sawUnambiguousESM = true, this.finishNode(t, "ImportDeclaration");
      }
      parseImportSource() {
        return this.match(134) || this.unexpected(), this.parseExprAtom();
      }
      parseImportSpecifierLocal(t, e, s) {
        e.local = this.parseIdentifier(), t.specifiers.push(this.finishImportSpecifier(e, s));
      }
      finishImportSpecifier(t, e, s = 8201) {
        return this.checkLVal(t.local, { type: e }, s), this.finishNode(t, e);
      }
      parseImportAttributes() {
        this.expect(5);
        let t = [], e = /* @__PURE__ */ new Set();
        do {
          if (this.match(8)) break;
          let s = this.startNode(), i = this.state.value;
          if (e.has(i) && this.raise(p.ModuleAttributesWithDuplicateKeys, this.state.startLoc, { key: i }), e.add(i), this.match(134) ? s.key = this.parseStringLiteral(i) : s.key = this.parseIdentifier(true), this.expect(14), !this.match(134)) throw this.raise(p.ModuleAttributeInvalidValue, this.state.startLoc);
          s.value = this.parseStringLiteral(this.state.value), t.push(this.finishNode(s, "ImportAttribute"));
        } while (this.eat(12));
        return this.expect(8), t;
      }
      parseModuleAttributes() {
        let t = [], e = /* @__PURE__ */ new Set();
        do {
          let s = this.startNode();
          if (s.key = this.parseIdentifier(true), s.key.name !== "type" && this.raise(p.ModuleAttributeDifferentFromType, s.key), e.has(s.key.name) && this.raise(p.ModuleAttributesWithDuplicateKeys, s.key, { key: s.key.name }), e.add(s.key.name), this.expect(14), !this.match(134)) throw this.raise(p.ModuleAttributeInvalidValue, this.state.startLoc);
          s.value = this.parseStringLiteral(this.state.value), t.push(this.finishNode(s, "ImportAttribute"));
        } while (this.eat(12));
        return t;
      }
      maybeParseImportAttributes(t) {
        let e;
        var s = false;
        if (this.match(76)) {
          if (this.hasPrecedingLineBreak() && this.lookaheadCharCode() === 40) return;
          this.next(), this.hasPlugin("moduleAttributes") ? (e = this.parseModuleAttributes(), this.addExtra(t, "deprecatedWithLegacySyntax", true)) : e = this.parseImportAttributes(), s = true;
        } else this.isContextual(94) && !this.hasPrecedingLineBreak() ? (!this.hasPlugin("deprecatedImportAssert") && !this.hasPlugin("importAssertions") && this.raise(p.ImportAttributesUseAssert, this.state.startLoc), this.hasPlugin("importAssertions") || this.addExtra(t, "deprecatedAssertSyntax", true), this.next(), e = this.parseImportAttributes()) : e = [];
        !s && this.hasPlugin("importAssertions") ? t.assertions = e : t.attributes = e;
      }
      maybeParseDefaultImportSpecifier(t, e) {
        if (e) {
          let s = this.startNodeAtNode(e);
          return s.local = e, t.specifiers.push(this.finishImportSpecifier(s, "ImportDefaultSpecifier")), true;
        } else if (M(this.state.type)) return this.parseImportSpecifierLocal(t, this.startNode(), "ImportDefaultSpecifier"), true;
        return false;
      }
      maybeParseStarImportSpecifier(t) {
        if (this.match(55)) {
          let e = this.startNode();
          return this.next(), this.expectContextual(93), this.parseImportSpecifierLocal(t, e, "ImportNamespaceSpecifier"), true;
        }
        return false;
      }
      parseNamedImportSpecifiers(t) {
        let e = true;
        for (this.expect(5); !this.eat(8); ) {
          if (e) e = false;
          else {
            if (this.eat(14)) throw this.raise(p.DestructureNamedImport, this.state.startLoc);
            if (this.expect(12), this.eat(8)) break;
          }
          let s = this.startNode(), i = this.match(134), r = this.isContextual(130);
          s.imported = this.parseModuleExportName();
          let n = this.parseImportSpecifier(s, i, t.importKind === "type" || t.importKind === "typeof", r, void 0);
          t.specifiers.push(n);
        }
      }
      parseImportSpecifier(t, e, s, i, r) {
        if (this.eatContextual(93)) t.local = this.parseIdentifier();
        else {
          let { imported: n } = t;
          if (e) throw this.raise(p.ImportBindingIsString, t, { importName: n.value });
          this.checkReservedWord(n.name, t.loc.start, true, true), t.local || (t.local = this.cloneIdentifier(n));
        }
        return this.finishImportSpecifier(t, "ImportSpecifier", r);
      }
      isThisParam(t) {
        return t.type === "Identifier" && t.name === "this";
      }
    }, ke = class extends ct {
      constructor(t, e, s) {
        t = Ri(t), super(t, e), this.options = t, this.initializeScopes(), this.plugins = s, this.filename = t.sourceFilename, this.startIndex = t.startIndex;
        let i = 0;
        t.allowAwaitOutsideFunction && (i |= 1), t.allowReturnOutsideFunction && (i |= 2), t.allowImportExportEverywhere && (i |= 8), t.allowSuperOutsideMethod && (i |= 16), t.allowUndeclaredExports && (i |= 64), t.allowNewTargetOutsideFunction && (i |= 4), t.allowYieldOutsideFunction && (i |= 32), t.ranges && (i |= 128), t.tokens && (i |= 256), t.createImportExpressions && (i |= 512), t.createParenthesizedExpressions && (i |= 1024), t.errorRecovery && (i |= 2048), t.attachComment && (i |= 4096), t.annexB && (i |= 8192), this.optionFlags = i;
      }
      getScopeHandler() {
        return ye;
      }
      parse() {
        this.enterInitialScopes();
        let t = this.startNode(), e = this.startNode();
        return this.nextToken(), t.errors = null, this.parseTopLevel(t, e), t.errors = this.state.errors, t.comments.length = this.state.commentsLen, t;
      }
    };
    function Ur(a, t) {
      var e;
      if (((e = t) == null ? void 0 : e.sourceType) === "unambiguous") {
        t = Object.assign({}, t);
        try {
          t.sourceType = "module";
          let s = fe(t, a), i = s.parse();
          if (s.sawUnambiguousESM) return i;
          if (s.ambiguousScriptDifferentAst) try {
            return t.sourceType = "script", fe(t, a).parse();
          } catch {
          }
          else i.program.sourceType = "script";
          return i;
        } catch (s) {
          try {
            return t.sourceType = "script", fe(t, a).parse();
          } catch {
          }
          throw s;
        }
      } else return fe(t, a).parse();
    }
    function jr(a, t) {
      let e = fe(t, a);
      return e.options.strictMode && (e.state.strict = true), e.getExpression();
    }
    function $r(a) {
      let t = {};
      for (let e of Object.keys(a)) t[e] = R(a[e]);
      return t;
    }
    var Vr = $r($i);
    function fe(a, t) {
      let e = ke, s = /* @__PURE__ */ new Map();
      if (a != null && a.plugins) {
        for (let i of a.plugins) {
          let r, n;
          typeof i == "string" ? r = i : [r, n] = i, s.has(r) || s.set(r, n || {});
        }
        Or(s), e = qr(s);
      }
      return new e(a, t, s);
    }
    var Ss = /* @__PURE__ */ new Map();
    function qr(a) {
      let t = [];
      for (let i of Fr) a.has(i) && t.push(i);
      let e = t.join("|"), s = Ss.get(e);
      if (!s) {
        s = ke;
        for (let i of t) s = _s[i](s);
        Ss.set(e, s);
      }
      return s;
    }
    Pe.parse = Ur;
    Pe.parseExpression = jr;
    Pe.tokTypes = Vr;
  });
  var Mt = {};
  Ue(Mt, { parsers: () => ja });
  var vt = {};
  Ue(vt, { __babel_estree: () => Ma, __js_expression: () => La, __ts_expression: () => Da, __vue_event_binding: () => ka, __vue_expression: () => La, __vue_ts_event_binding: () => va, __vue_ts_expression: () => Da, babel: () => ka, "babel-flow": () => Pi, "babel-ts": () => va });
  var Fe = ls(Tt());
  function ve(a) {
    return (t, e, s) => {
      let i = !!(s != null && s.backwards);
      if (e === false) return false;
      let { length: r } = t, n = e;
      for (; n >= 0 && n < r; ) {
        let o = t.charAt(n);
        if (a instanceof RegExp) {
          if (!a.test(o)) return n;
        } else if (!a.includes(o)) return n;
        i ? n-- : n++;
      }
      return n === -1 || n === r ? n : false;
    };
  }
  var Us = ve(" 	"), js = ve(/[^\n\r]/u);
  function zr(a, t) {
    if (t === false) return false;
    if (a.charAt(t) === "/" && a.charAt(t + 1) === "*") {
      for (let e = t + 2; e < a.length; ++e) if (a.charAt(e) === "*" && a.charAt(e + 1) === "/") return e + 2;
    }
    return t;
  }
  var $s = zr;
  function Hr(a, t, e) {
    let s = !!(e != null && e.backwards);
    if (t === false) return false;
    let i = a.charAt(t);
    if (s) {
      if (a.charAt(t - 1) === "\r" && i === `
`) return t - 2;
      if (i === `
` || i === "\r" || i === "\u2028" || i === "\u2029") return t - 1;
    } else {
      if (i === "\r" && a.charAt(t + 1) === `
`) return t + 2;
      if (i === `
` || i === "\r" || i === "\u2028" || i === "\u2029") return t + 1;
    }
    return t;
  }
  var Vs = Hr;
  function Kr(a, t) {
    return t === false ? false : a.charAt(t) === "/" && a.charAt(t + 1) === "/" ? js(a, t) : t;
  }
  var qs = Kr;
  function Wr(a, t) {
    let e = null, s = t;
    for (; s !== e; ) e = s, s = Us(a, s), s = $s(a, s), s = qs(a, s), s = Vs(a, s);
    return s;
  }
  var zs = Wr;
  function Jr(a) {
    let t = [];
    for (let e of a) try {
      return e();
    } catch (s) {
      t.push(s);
    }
    throw Object.assign(new Error("All combinations failed"), { errors: t });
  }
  var Hs = Jr;
  function Xr(a) {
    if (!a.startsWith("#!")) return "";
    let t = a.indexOf(`
`);
    return t === -1 ? a : a.slice(0, t);
  }
  var Le = Xr;
  var Gr = (a, t, e) => {
    if (!(a && t == null)) {
      if (t.findLast) return t.findLast(e);
      for (let s = t.length - 1; s >= 0; s--) {
        let i = t[s];
        if (e(i, s, t)) return i;
      }
    }
  }, Ks = Gr;
  var Yr = (a, t, e) => {
    if (!(a && t == null)) return Array.isArray(t) || typeof t == "string" ? t[e < 0 ? t.length + e : e] : t.at(e);
  }, Ws = Yr;
  var Qr = new Proxy(() => {
  }, { get: () => Qr });
  function v(a) {
    var s, i, r;
    let t = ((s = a.range) == null ? void 0 : s[0]) ?? a.start, e = (r = ((i = a.declaration) == null ? void 0 : i.decorators) ?? a.decorators) == null ? void 0 : r[0];
    return e ? Math.min(v(e), t) : t;
  }
  function k(a) {
    var e;
    return ((e = a.range) == null ? void 0 : e[1]) ?? a.end;
  }
  function Zr(a) {
    let t = new Set(a);
    return (e) => t.has(e == null ? void 0 : e.type);
  }
  var ae = Zr;
  function ea(a, t, e) {
    let s = a.originalText.slice(t, e);
    for (let i of a[Symbol.for("comments")]) {
      let r = v(i);
      if (r > e) break;
      let n = k(i);
      if (n < t) continue;
      let o = n - r;
      s = s.slice(0, r - t) + " ".repeat(o) + s.slice(n - t);
    }
    return s;
  }
  var Js = ea;
  var ta = ae(["Block", "CommentBlock", "MultiLine"]), G = ta;
  var sa = ae(["Line", "CommentLine", "SingleLine", "HashbangComment", "HTMLOpen", "HTMLClose", "Hashbang", "InterpreterDirective"]), bt = sa;
  var At = /* @__PURE__ */ new WeakMap();
  function ia(a) {
    return At.has(a) || At.set(a, G(a) && a.value[0] === "*" && /@(?:type|satisfies)\b/u.test(a.value)), At.get(a);
  }
  var Xs = ia;
  function ra(a) {
    if (!G(a)) return false;
    let t = `*${a.value}*`.split(`
`);
    return t.length > 1 && t.every((e) => e.trimStart()[0] === "*");
  }
  var St = /* @__PURE__ */ new WeakMap();
  function aa(a) {
    return St.has(a) || St.set(a, ra(a)), St.get(a);
  }
  var Et = aa;
  function na(a) {
    if (a.length < 2) return;
    let t;
    for (let e = a.length - 1; e >= 0; e--) {
      let s = a[e];
      if (t && k(s) === v(t) && Et(s) && Et(t) && (a.splice(e + 1, 1), s.value += "*//*" + t.value, s.range = [v(s), k(t)]), !bt(s) && !G(s)) throw new TypeError(`Unknown comment type: "${s.type}".`);
      t = s;
    }
  }
  var Gs = na;
  var ge = null;
  function Te(a) {
    if (ge !== null && typeof ge.property) {
      let t = ge;
      return ge = Te.prototype = null, t;
    }
    return ge = Te.prototype = a ?? /* @__PURE__ */ Object.create(null), new Te();
  }
  var oa = 10;
  for (let a = 0; a <= oa; a++) Te();
  function Ct(a) {
    return Te(a);
  }
  function la(a, t = "type") {
    Ct(a);
    function e(s) {
      let i = s[t], r = a[i];
      if (!Array.isArray(r)) throw Object.assign(new Error(`Missing visitor keys for '${i}'.`), { node: s });
      return r;
    }
    return e;
  }
  var Ys = la;
  var Qs = { ArrayExpression: ["elements"], AssignmentExpression: ["left", "right"], BinaryExpression: ["left", "right"], InterpreterDirective: [], Directive: ["value"], DirectiveLiteral: [], BlockStatement: ["directives", "body"], BreakStatement: ["label"], CallExpression: ["callee", "typeParameters", "typeArguments", "arguments"], CatchClause: ["param", "body"], ConditionalExpression: ["test", "consequent", "alternate"], ContinueStatement: ["label"], DebuggerStatement: [], DoWhileStatement: ["body", "test"], EmptyStatement: [], ExpressionStatement: ["expression"], File: ["program"], ForInStatement: ["left", "right", "body"], ForStatement: ["init", "test", "update", "body"], FunctionDeclaration: ["id", "typeParameters", "params", "predicate", "returnType", "body"], FunctionExpression: ["id", "typeParameters", "params", "returnType", "body"], Identifier: ["typeAnnotation", "decorators"], IfStatement: ["test", "consequent", "alternate"], LabeledStatement: ["label", "body"], StringLiteral: [], NumericLiteral: [], NullLiteral: [], BooleanLiteral: [], RegExpLiteral: [], LogicalExpression: ["left", "right"], MemberExpression: ["object", "property"], NewExpression: ["callee", "typeParameters", "typeArguments", "arguments"], Program: ["directives", "body"], ObjectExpression: ["properties"], ObjectMethod: ["decorators", "key", "typeParameters", "params", "returnType", "body"], ObjectProperty: ["decorators", "key", "value"], RestElement: ["argument", "typeAnnotation", "decorators"], ReturnStatement: ["argument"], SequenceExpression: ["expressions"], ParenthesizedExpression: ["expression"], SwitchCase: ["test", "consequent"], SwitchStatement: ["discriminant", "cases"], ThisExpression: [], ThrowStatement: ["argument"], TryStatement: ["block", "handler", "finalizer"], UnaryExpression: ["argument"], UpdateExpression: ["argument"], VariableDeclaration: ["declarations"], VariableDeclarator: ["id", "init"], WhileStatement: ["test", "body"], WithStatement: ["object", "body"], AssignmentPattern: ["left", "right", "decorators", "typeAnnotation"], ArrayPattern: ["elements", "typeAnnotation", "decorators"], ArrowFunctionExpression: ["typeParameters", "params", "predicate", "returnType", "body"], ClassBody: ["body"], ClassExpression: ["decorators", "id", "typeParameters", "superClass", "superTypeParameters", "mixins", "implements", "body", "superTypeArguments"], ClassDeclaration: ["decorators", "id", "typeParameters", "superClass", "superTypeParameters", "mixins", "implements", "body", "superTypeArguments"], ExportAllDeclaration: ["source", "attributes", "exported"], ExportDefaultDeclaration: ["declaration"], ExportNamedDeclaration: ["declaration", "specifiers", "source", "attributes"], ExportSpecifier: ["local", "exported"], ForOfStatement: ["left", "right", "body"], ImportDeclaration: ["specifiers", "source", "attributes"], ImportDefaultSpecifier: ["local"], ImportNamespaceSpecifier: ["local"], ImportSpecifier: ["imported", "local"], ImportExpression: ["source", "options"], MetaProperty: ["meta", "property"], ClassMethod: ["decorators", "key", "typeParameters", "params", "returnType", "body"], ObjectPattern: ["decorators", "properties", "typeAnnotation"], SpreadElement: ["argument"], Super: [], TaggedTemplateExpression: ["tag", "typeParameters", "quasi", "typeArguments"], TemplateElement: [], TemplateLiteral: ["quasis", "expressions"], YieldExpression: ["argument"], AwaitExpression: ["argument"], BigIntLiteral: [], ExportNamespaceSpecifier: ["exported"], OptionalMemberExpression: ["object", "property"], OptionalCallExpression: ["callee", "typeParameters", "typeArguments", "arguments"], ClassProperty: ["decorators", "variance", "key", "typeAnnotation", "value"], ClassAccessorProperty: ["decorators", "key", "typeAnnotation", "value"], ClassPrivateProperty: ["decorators", "variance", "key", "typeAnnotation", "value"], ClassPrivateMethod: ["decorators", "key", "typeParameters", "params", "returnType", "body"], PrivateName: ["id"], StaticBlock: ["body"], ImportAttribute: ["key", "value"], AnyTypeAnnotation: [], ArrayTypeAnnotation: ["elementType"], BooleanTypeAnnotation: [], BooleanLiteralTypeAnnotation: [], NullLiteralTypeAnnotation: [], ClassImplements: ["id", "typeParameters"], DeclareClass: ["id", "typeParameters", "extends", "mixins", "implements", "body"], DeclareFunction: ["id", "predicate"], DeclareInterface: ["id", "typeParameters", "extends", "body"], DeclareModule: ["id", "body"], DeclareModuleExports: ["typeAnnotation"], DeclareTypeAlias: ["id", "typeParameters", "right"], DeclareOpaqueType: ["id", "typeParameters", "supertype"], DeclareVariable: ["id"], DeclareExportDeclaration: ["declaration", "specifiers", "source", "attributes"], DeclareExportAllDeclaration: ["source", "attributes"], DeclaredPredicate: ["value"], ExistsTypeAnnotation: [], FunctionTypeAnnotation: ["typeParameters", "this", "params", "rest", "returnType"], FunctionTypeParam: ["name", "typeAnnotation"], GenericTypeAnnotation: ["id", "typeParameters"], InferredPredicate: [], InterfaceExtends: ["id", "typeParameters"], InterfaceDeclaration: ["id", "typeParameters", "extends", "body"], InterfaceTypeAnnotation: ["extends", "body"], IntersectionTypeAnnotation: ["types"], MixedTypeAnnotation: [], EmptyTypeAnnotation: [], NullableTypeAnnotation: ["typeAnnotation"], NumberLiteralTypeAnnotation: [], NumberTypeAnnotation: [], ObjectTypeAnnotation: ["properties", "indexers", "callProperties", "internalSlots"], ObjectTypeInternalSlot: ["id", "value"], ObjectTypeCallProperty: ["value"], ObjectTypeIndexer: ["variance", "id", "key", "value"], ObjectTypeProperty: ["key", "value", "variance"], ObjectTypeSpreadProperty: ["argument"], OpaqueType: ["id", "typeParameters", "supertype", "impltype"], QualifiedTypeIdentifier: ["qualification", "id"], StringLiteralTypeAnnotation: [], StringTypeAnnotation: [], SymbolTypeAnnotation: [], ThisTypeAnnotation: [], TupleTypeAnnotation: ["types", "elementTypes"], TypeofTypeAnnotation: ["argument", "typeArguments"], TypeAlias: ["id", "typeParameters", "right"], TypeAnnotation: ["typeAnnotation"], TypeCastExpression: ["expression", "typeAnnotation"], TypeParameter: ["bound", "default", "variance"], TypeParameterDeclaration: ["params"], TypeParameterInstantiation: ["params"], UnionTypeAnnotation: ["types"], Variance: [], VoidTypeAnnotation: [], EnumDeclaration: ["id", "body"], EnumBooleanBody: ["members"], EnumNumberBody: ["members"], EnumStringBody: ["members"], EnumSymbolBody: ["members"], EnumBooleanMember: ["id", "init"], EnumNumberMember: ["id", "init"], EnumStringMember: ["id", "init"], EnumDefaultedMember: ["id"], IndexedAccessType: ["objectType", "indexType"], OptionalIndexedAccessType: ["objectType", "indexType"], JSXAttribute: ["name", "value"], JSXClosingElement: ["name"], JSXElement: ["openingElement", "children", "closingElement"], JSXEmptyExpression: [], JSXExpressionContainer: ["expression"], JSXSpreadChild: ["expression"], JSXIdentifier: [], JSXMemberExpression: ["object", "property"], JSXNamespacedName: ["namespace", "name"], JSXOpeningElement: ["name", "typeParameters", "typeArguments", "attributes"], JSXSpreadAttribute: ["argument"], JSXText: [], JSXFragment: ["openingFragment", "children", "closingFragment"], JSXOpeningFragment: [], JSXClosingFragment: [], Noop: [], Placeholder: [], V8IntrinsicIdentifier: [], ArgumentPlaceholder: [], BindExpression: ["object", "callee"], Decorator: ["expression"], DoExpression: ["body"], ExportDefaultSpecifier: ["exported"], ModuleExpression: ["body"], TopicReference: [], PipelineTopicExpression: ["expression"], PipelineBareFunction: ["callee"], PipelinePrimaryTopicReference: [], TSParameterProperty: ["parameter", "decorators"], TSDeclareFunction: ["id", "typeParameters", "params", "returnType", "body"], TSDeclareMethod: ["decorators", "key", "typeParameters", "params", "returnType"], TSQualifiedName: ["left", "right"], TSCallSignatureDeclaration: ["typeParameters", "parameters", "typeAnnotation", "params", "returnType"], TSConstructSignatureDeclaration: ["typeParameters", "parameters", "typeAnnotation", "params", "returnType"], TSPropertySignature: ["key", "typeAnnotation"], TSMethodSignature: ["key", "typeParameters", "parameters", "typeAnnotation", "params", "returnType"], TSIndexSignature: ["parameters", "typeAnnotation"], TSAnyKeyword: [], TSBooleanKeyword: [], TSBigIntKeyword: [], TSIntrinsicKeyword: [], TSNeverKeyword: [], TSNullKeyword: [], TSNumberKeyword: [], TSObjectKeyword: [], TSStringKeyword: [], TSSymbolKeyword: [], TSUndefinedKeyword: [], TSUnknownKeyword: [], TSVoidKeyword: [], TSThisType: [], TSFunctionType: ["typeParameters", "parameters", "typeAnnotation", "params", "returnType"], TSConstructorType: ["typeParameters", "parameters", "typeAnnotation", "params", "returnType"], TSTypeReference: ["typeName", "typeParameters", "typeArguments"], TSTypePredicate: ["parameterName", "typeAnnotation"], TSTypeQuery: ["exprName", "typeParameters", "typeArguments"], TSTypeLiteral: ["members"], TSArrayType: ["elementType"], TSTupleType: ["elementTypes"], TSOptionalType: ["typeAnnotation"], TSRestType: ["typeAnnotation"], TSNamedTupleMember: ["label", "elementType"], TSUnionType: ["types"], TSIntersectionType: ["types"], TSConditionalType: ["checkType", "extendsType", "trueType", "falseType"], TSInferType: ["typeParameter"], TSParenthesizedType: ["typeAnnotation"], TSTypeOperator: ["typeAnnotation"], TSIndexedAccessType: ["objectType", "indexType"], TSMappedType: ["nameType", "typeAnnotation", "key", "constraint"], TSTemplateLiteralType: ["quasis", "types"], TSLiteralType: ["literal"], TSExpressionWithTypeArguments: ["expression", "typeParameters"], TSInterfaceDeclaration: ["id", "typeParameters", "extends", "body"], TSInterfaceBody: ["body"], TSTypeAliasDeclaration: ["id", "typeParameters", "typeAnnotation"], TSInstantiationExpression: ["expression", "typeParameters", "typeArguments"], TSAsExpression: ["expression", "typeAnnotation"], TSSatisfiesExpression: ["expression", "typeAnnotation"], TSTypeAssertion: ["typeAnnotation", "expression"], TSEnumBody: ["members"], TSEnumDeclaration: ["id", "body"], TSEnumMember: ["id", "initializer"], TSModuleDeclaration: ["id", "body"], TSModuleBlock: ["body"], TSImportType: ["argument", "options", "qualifier", "typeParameters", "typeArguments"], TSImportEqualsDeclaration: ["id", "moduleReference"], TSExternalModuleReference: ["expression"], TSNonNullExpression: ["expression"], TSExportAssignment: ["expression"], TSNamespaceExportDeclaration: ["id"], TSTypeAnnotation: ["typeAnnotation"], TSTypeParameterInstantiation: ["params"], TSTypeParameterDeclaration: ["params"], TSTypeParameter: ["constraint", "default", "name"], ChainExpression: ["expression"], ExperimentalRestProperty: ["argument"], ExperimentalSpreadProperty: ["argument"], Literal: [], MethodDefinition: ["decorators", "key", "value"], PrivateIdentifier: [], Property: ["key", "value"], PropertyDefinition: ["decorators", "key", "typeAnnotation", "value", "variance"], AccessorProperty: ["decorators", "key", "typeAnnotation", "value"], TSAbstractAccessorProperty: ["decorators", "key", "typeAnnotation"], TSAbstractKeyword: [], TSAbstractMethodDefinition: ["key", "value"], TSAbstractPropertyDefinition: ["decorators", "key", "typeAnnotation"], TSAsyncKeyword: [], TSClassImplements: ["expression", "typeArguments", "typeParameters"], TSDeclareKeyword: [], TSEmptyBodyFunctionExpression: ["id", "typeParameters", "params", "returnType"], TSExportKeyword: [], TSInterfaceHeritage: ["expression", "typeArguments", "typeParameters"], TSPrivateKeyword: [], TSProtectedKeyword: [], TSPublicKeyword: [], TSReadonlyKeyword: [], TSStaticKeyword: [], AsConstExpression: ["expression"], AsExpression: ["expression", "typeAnnotation"], BigIntLiteralTypeAnnotation: [], BigIntTypeAnnotation: [], ComponentDeclaration: ["id", "params", "body", "typeParameters", "rendersType"], ComponentParameter: ["name", "local"], ComponentTypeAnnotation: ["params", "rest", "typeParameters", "rendersType"], ComponentTypeParameter: ["name", "typeAnnotation"], ConditionalTypeAnnotation: ["checkType", "extendsType", "trueType", "falseType"], DeclareComponent: ["id", "params", "rest", "typeParameters", "rendersType"], DeclareEnum: ["id", "body"], DeclareHook: ["id"], DeclareNamespace: ["id", "body"], EnumBigIntBody: ["members"], EnumBigIntMember: ["id", "init"], HookDeclaration: ["id", "params", "body", "typeParameters", "returnType"], HookTypeAnnotation: ["params", "returnType", "rest", "typeParameters"], InferTypeAnnotation: ["typeParameter"], KeyofTypeAnnotation: ["argument"], ObjectTypeMappedTypeProperty: ["keyTparam", "propType", "sourceType", "variance"], QualifiedTypeofIdentifier: ["qualification", "id"], TupleTypeLabeledElement: ["label", "elementType", "variance"], TupleTypeSpreadElement: ["label", "typeAnnotation"], TypeOperator: ["typeAnnotation"], TypePredicate: ["parameterName", "typeAnnotation", "asserts"], NGChainedExpression: ["expressions"], NGEmptyExpression: [], NGPipeExpression: ["left", "right", "arguments"], NGMicrosyntax: ["body"], NGMicrosyntaxAs: ["key", "alias"], NGMicrosyntaxExpression: ["expression", "alias"], NGMicrosyntaxKey: [], NGMicrosyntaxKeyedExpression: ["key", "expression"], NGMicrosyntaxLet: ["key", "value"], NGRoot: ["node"], JsExpressionRoot: ["node"], JsonRoot: ["node"], TSJSDocAllType: [], TSJSDocUnknownType: [], TSJSDocNullableType: ["typeAnnotation"], TSJSDocNonNullableType: ["typeAnnotation"], NeverTypeAnnotation: [], SatisfiesExpression: ["expression", "typeAnnotation"], UndefinedTypeAnnotation: [], UnknownTypeAnnotation: [] };
  var ha = Ys(Qs), Zs = ha;
  function wt(a, t) {
    if (!(a !== null && typeof a == "object")) return a;
    if (Array.isArray(a)) {
      for (let s = 0; s < a.length; s++) a[s] = wt(a[s], t);
      return a;
    }
    let e = Zs(a);
    for (let s = 0; s < e.length; s++) a[e[s]] = wt(a[e[s]], t);
    return t(a) || a;
  }
  var ei = wt;
  ae(["RegExpLiteral", "BigIntLiteral", "NumericLiteral", "StringLiteral", "DirectiveLiteral", "Literal", "JSXText", "TemplateElement", "StringLiteralTypeAnnotation", "NumberLiteralTypeAnnotation", "BigIntLiteralTypeAnnotation"]);
  function ca(a, t) {
    let { parser: e, text: s } = t, { comments: i } = a, r = e === "oxc" && t.oxcAstType === "ts";
    Gs(i);
    let n;
    a = ei(a, (l) => {
      switch (l.type) {
        case "ParenthesizedExpression": {
          let { expression: h } = l, c = v(l);
          if (h.type === "TypeCastExpression") return h.range = [c, k(l)], h;
          let u = false;
          if (!r) {
            if (!n) {
              n = [];
              for (let d of i) Xs(d) && n.push(k(d));
            }
            let f = Ks(false, n, (d) => d <= c);
            u = f && s.slice(f, c).trim().length === 0;
          }
          if (!u) return h.extra = { ...h.extra, parenthesized: true }, h;
          break;
        }
        case "LogicalExpression":
          if (si(l)) return It(l);
          break;
        case "TemplateLiteral":
          if (l.expressions.length !== l.quasis.length - 1) throw new Error("Malformed template literal.");
          break;
        case "TemplateElement":
          if (e === "flow" || e === "hermes" || e === "espree" || e === "typescript" || r) {
            let h = v(l) + 1, c = k(l) - (l.tail ? 1 : 2);
            l.range = [h, c];
          }
          break;
        case "VariableDeclaration": {
          let h = Ws(false, l.declarations, -1);
          h != null && h.init && s[k(h)] !== ";" && (l.range = [v(l), k(h)]);
          break;
        }
        case "TSParenthesizedType":
          return l.typeAnnotation;
        case "TSTypeParameter":
          ti(l);
          break;
        case "TopicReference":
          a.extra = { ...a.extra, __isUsingHackPipeline: true };
          break;
        case "TSUnionType":
        case "TSIntersectionType":
          if (l.types.length === 1) return l.types[0];
          break;
        case "TSMappedType":
          if (!l.constraint && !l.key) {
            let { name: h, constraint: c } = ti(l.typeParameter);
            l.constraint = c, l.key = h, delete l.typeParameter;
          }
          break;
        case "TSEnumDeclaration":
          if (!l.body) {
            let h = k(l.id), { members: c } = l, u = Js({ originalText: s, [Symbol.for("comments")]: i }, h, c[0] ? v(c[0]) : k(l)), f = h + u.indexOf("{");
            l.body = { type: "TSEnumBody", members: c, range: [f, k(l)] }, delete l.members;
          }
          break;
        case "ImportExpression":
          e === "hermes" && l.attributes && !l.options && (l.options = l.attributes);
          break;
      }
    });
    let o = a.type === "File" ? a.program : a;
    return o.interpreter && (i.unshift(o.interpreter), delete o.interpreter), r && a.hashbang && (i.unshift(a.hashbang), delete a.hashbang), a.type === "Program" && (a.range = [0, s.length]), a;
  }
  function ti(a) {
    if (a.type === "TSTypeParameter" && typeof a.name == "string") {
      let t = v(a);
      a.name = { type: "Identifier", name: a.name, range: [t, t + a.name.length] };
    }
    return a;
  }
  function si(a) {
    return a.type === "LogicalExpression" && a.right.type === "LogicalExpression" && a.operator === a.right.operator;
  }
  function It(a) {
    return si(a) ? It({ type: "LogicalExpression", operator: a.operator, left: It({ type: "LogicalExpression", operator: a.operator, left: a.left, right: a.right.left, range: [v(a.left), k(a.right.left)] }), right: a.right.right, range: [v(a), k(a)] }) : a;
  }
  var ii = ca;
  function pa(a, t) {
    let e = new SyntaxError(a + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
    return Object.assign(e, t);
  }
  var De = pa;
  var ri = "Unexpected parseExpression() input: ";
  function ua(a) {
    let { message: t, loc: e, reasonCode: s } = a;
    if (!e) return a;
    let { line: i, column: r } = e, n = a;
    (s === "MissingPlugin" || s === "MissingOneOfPlugins") && (t = "Unexpected token.", n = void 0);
    let o = ` (${i}:${r})`;
    return t.endsWith(o) && (t = t.slice(0, -o.length)), t.startsWith(ri) && (t = t.slice(ri.length)), De(t, { loc: { start: { line: i, column: r + 1 } }, cause: n });
  }
  var Me = ua;
  var fa = (a, t, e, s) => {
    if (!(a && t == null)) return t.replaceAll ? t.replaceAll(e, s) : e.global ? t.replace(e, s) : t.split(e).join(s);
  }, ne = fa;
  var da = /\*\/$/, ma = /^\/\*\*?/, ya = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/, xa = /(^|\s+)\/\/([^\n\r]*)/g, ai = /^(\r?\n)+/, Pa = /(?:^|\r?\n) *(@[^\n\r]*?) *\r?\n *(?![^\n\r@]*\/\/[^]*)([^\s@][^\n\r@]+?) *\r?\n/g, ni = /(?:^|\r?\n) *@(\S+) *([^\n\r]*)/g, ga = /(\r?\n|^) *\* ?/g, Ta = [];
  function oi(a) {
    let t = a.match(ya);
    return t ? t[0].trimStart() : "";
  }
  function li(a) {
    let t = `
`;
    a = ne(false, a.replace(ma, "").replace(da, ""), ga, "$1");
    let e = "";
    for (; e !== a; ) e = a, a = ne(false, a, Pa, `${t}$1 $2${t}`);
    a = a.replace(ai, "").trimEnd();
    let s = /* @__PURE__ */ Object.create(null), i = ne(false, a, ni, "").replace(ai, "").trimEnd(), r;
    for (; r = ni.exec(a); ) {
      let n = ne(false, r[2], xa, "");
      if (typeof s[r[1]] == "string" || Array.isArray(s[r[1]])) {
        let o = s[r[1]];
        s[r[1]] = [...Ta, ...Array.isArray(o) ? o : [o], n];
      } else s[r[1]] = n;
    }
    return { comments: i, pragmas: s };
  }
  var hi = ["noformat", "noprettier"], ci = ["format", "prettier"];
  function pi(a) {
    let t = Le(a);
    t && (a = a.slice(t.length + 1));
    let e = oi(a), { pragmas: s, comments: i } = li(e);
    return { shebang: t, text: a, pragmas: s, comments: i };
  }
  function ui(a) {
    let { pragmas: t } = pi(a);
    return ci.some((e) => Object.prototype.hasOwnProperty.call(t, e));
  }
  function fi(a) {
    let { pragmas: t } = pi(a);
    return hi.some((e) => Object.prototype.hasOwnProperty.call(t, e));
  }
  function ba(a) {
    return a = typeof a == "function" ? { parse: a } : a, { astFormat: "estree", hasPragma: ui, hasIgnorePragma: fi, locStart: v, locEnd: k, ...a };
  }
  var Y = ba;
  var Nt = "module", kt = "script";
  function di(a) {
    if (typeof a == "string") {
      if (a = a.toLowerCase(), /\.(?:mjs|mts)$/iu.test(a)) return Nt;
      if (/\.(?:cjs|cts)$/iu.test(a)) return kt;
    }
  }
  function Aa(a, t) {
    let { type: e = "JsExpressionRoot", rootMarker: s, text: i } = t, { tokens: r, comments: n } = a;
    return delete a.tokens, delete a.comments, { tokens: r, comments: n, type: e, node: a, range: [0, i.length], rootMarker: s };
  }
  var Oe = Aa;
  var oe = (a) => Y(Ia(a)), Sa = { sourceType: Nt, allowImportExportEverywhere: true, allowReturnOutsideFunction: true, allowNewTargetOutsideFunction: true, allowSuperOutsideMethod: true, allowUndeclaredExports: true, errorRecovery: true, createParenthesizedExpressions: true, createImportExpressions: true, attachComment: false, plugins: ["doExpressions", "exportDefaultFrom", "functionBind", "functionSent", "throwExpressions", "partialApplication", "decorators", "moduleBlocks", "asyncDoExpressions", "destructuringPrivate", "decoratorAutoAccessors", "explicitResourceManagement", "sourcePhaseImports", "deferredImportEvaluation", ["optionalChainingAssign", { version: "2023-07" }]], tokens: false, ranges: false }, mi = "v8intrinsic", yi = [["pipelineOperator", { proposal: "hack", topicToken: "%" }], ["pipelineOperator", { proposal: "fsharp" }]], j = (a, t = Sa) => ({ ...t, plugins: [...t.plugins, ...a] }), Ea = /@(?:no)?flow\b/u;
  function Ca(a, t) {
    if (t != null && t.endsWith(".js.flow")) return true;
    let e = Le(a);
    e && (a = a.slice(e.length));
    let s = zs(a, 0);
    return s !== false && (a = a.slice(0, s)), Ea.test(a);
  }
  function wa(a, t, e) {
    let s = a(t, e), i = s.errors.find((r) => !Na.has(r.reasonCode));
    if (i) throw i;
    return s;
  }
  function Ia({ isExpression: a = false, optionsCombinations: t }) {
    return (e, s = {}) => {
      let { filepath: i } = s;
      if (typeof i != "string" && (i = void 0), (s.parser === "babel" || s.parser === "__babel_estree") && Ca(e, i)) return s.parser = "babel-flow", Pi.parse(e, s);
      let r = t, n = s.__babelSourceType ?? di(i);
      n === kt && (r = r.map((c) => ({ ...c, sourceType: n })));
      let o = /%[A-Z]/u.test(e);
      e.includes("|>") ? r = (o ? [...yi, mi] : yi).flatMap((u) => r.map((f) => j([u], f))) : o && (r = r.map((c) => j([mi], c)));
      let l = a ? Fe.parseExpression : Fe.parse, h;
      try {
        h = Hs(r.map((c) => () => wa(l, e, c)));
      } catch ({ errors: [c] }) {
        throw Me(c);
      }
      return a && (h = Oe(h, { text: e, rootMarker: s.rootMarker })), ii(h, { text: e });
    };
  }
  var Na = /* @__PURE__ */ new Set(["StrictNumericEscape", "StrictWith", "StrictOctalLiteral", "StrictDelete", "StrictEvalArguments", "StrictEvalArgumentsBinding", "StrictFunction", "ForInOfLoopInitializer", "EmptyTypeArguments", "EmptyTypeParameters", "ConstructorHasTypeParameters", "UnsupportedParameterPropertyKind", "DecoratorExportClass", "ParamDupe", "InvalidDecimal", "RestTrailingComma", "UnsupportedParameterDecorator", "UnterminatedJsxContent", "UnexpectedReservedWord", "ModuleAttributesWithDuplicateKeys", "InvalidEscapeSequenceTemplate", "NonAbstractClassHasAbstractMethod", "OptionalTypeBeforeRequired", "PatternIsOptional", "OptionalBindingPattern", "DeclareClassFieldHasInitializer", "TypeImportCannotSpecifyDefaultAndNamed", "ConstructorClassField", "VarRedeclaration", "InvalidPrivateFieldResolution", "DuplicateExport", "ImportAttributesUseAssert", "DeclarationMissingInitializer"]), xi = [j(["jsx"])], ka = oe({ optionsCombinations: xi }), va = oe({ optionsCombinations: [j(["jsx", "typescript"]), j(["typescript"])] }), La = oe({ isExpression: true, optionsCombinations: [j(["jsx"])] }), Da = oe({ isExpression: true, optionsCombinations: [j(["typescript"])] }), Pi = oe({ optionsCombinations: [j(["jsx", ["flow", { all: true }], "flowComments"])] }), Ma = oe({ optionsCombinations: xi.map((a) => j(["estree"], a)) });
  var Dt = {};
  Ue(Dt, { json: () => Ba, "json-stringify": () => Ua, json5: () => Ra, jsonc: () => _a });
  var Be = ls(Tt());
  function Oa(a) {
    return Array.isArray(a) && a.length > 0;
  }
  var Lt = Oa;
  var gi = { tokens: false, ranges: false, attachComment: false, createParenthesizedExpressions: true };
  function Fa(a) {
    let t = (0, Be.parse)(a, gi), { program: e } = t;
    if (e.body.length === 0 && e.directives.length === 0 && !e.interpreter) return t;
  }
  function Re(a, t = {}) {
    let { allowComments: e = true, allowEmpty: s = false } = t, i;
    try {
      i = (0, Be.parseExpression)(a, gi);
    } catch (r) {
      if (s && r.code === "BABEL_PARSER_SYNTAX_ERROR" && r.reasonCode === "ParseExpressionEmptyInput") try {
        i = Fa(a);
      } catch {
      }
      if (!i) throw Me(r);
    }
    if (!e && Lt(i.comments)) throw K(i.comments[0], "Comment");
    return i = Oe(i, { type: "JsonRoot", text: a }), i.node.type === "File" ? delete i.node : le(i.node), i;
  }
  function K(a, t) {
    let [e, s] = [a.loc.start, a.loc.end].map(({ line: i, column: r }) => ({ line: i, column: r + 1 }));
    return De(`${t} is not allowed in JSON.`, { loc: { start: e, end: s } });
  }
  function le(a) {
    switch (a.type) {
      case "ArrayExpression":
        for (let t of a.elements) t !== null && le(t);
        return;
      case "ObjectExpression":
        for (let t of a.properties) le(t);
        return;
      case "ObjectProperty":
        if (a.computed) throw K(a.key, "Computed key");
        if (a.shorthand) throw K(a.key, "Shorthand property");
        a.key.type !== "Identifier" && le(a.key), le(a.value);
        return;
      case "UnaryExpression": {
        let { operator: t, argument: e } = a;
        if (t !== "+" && t !== "-") throw K(a, `Operator '${a.operator}'`);
        if (e.type === "NumericLiteral" || e.type === "Identifier" && (e.name === "Infinity" || e.name === "NaN")) return;
        throw K(e, `Operator '${t}' before '${e.type}'`);
      }
      case "Identifier":
        if (a.name !== "Infinity" && a.name !== "NaN" && a.name !== "undefined") throw K(a, `Identifier '${a.name}'`);
        return;
      case "TemplateLiteral":
        if (Lt(a.expressions)) throw K(a.expressions[0], "'TemplateLiteral' with expression");
        for (let t of a.quasis) le(t);
        return;
      case "NullLiteral":
      case "BooleanLiteral":
      case "NumericLiteral":
      case "StringLiteral":
      case "TemplateElement":
        return;
      default:
        throw K(a, `'${a.type}'`);
    }
  }
  var Ba = Y({ parse: (a) => Re(a), hasPragma: () => true, hasIgnorePragma: () => false }), Ra = Y((a) => Re(a)), _a = Y((a) => Re(a, { allowEmpty: true })), Ua = Y({ parse: (a) => Re(a, { allowComments: false }), astFormat: "estree-json" });
  var ja = { ...vt, ...Dt };
  var Vo = Mt;
  const plugins = [Vo];
  const lang2parser = {
    js: "babel",
    jsx: "babel",
    ts: "babel-ts",
    tsx: "babel-ts",
    json: "json",
    json5: "json5"
  };
  Object.assign(lang2parser, {
    java: "java"
  });
  const formatCode = async (code, lang) => {
    if (lang2parser[lang]) {
      try {
        return prettier.format(code, {
          parser: lang2parser[lang],
          plugins
        });
      } catch {
      }
    }
    return code;
  };
  console.log("document.readyState", document.readyState);
  console.log(monkeyWindow);
  GM_addElement && GM_addElement("div", { innerHTML: "hello" });
  if (unsafeWindow == window) {
    console.log("scope->host");
  } else {
    console.log("scope->monkey");
  }
  GM_cookie?.list({}, (cookies, error) => {
    if (error) {
      console.log(error);
    } else {
      const [cookie] = cookies;
      if (cookie) {
        console.log(cookie);
      }
    }
  });
  console.log("format tsx code");
  const tsxCode = `const App=()=>{return(<div class={styles.App}>
<header class={styles.header}>
<img src={logo} class={styles.logo} alt="logo" />
<p>
Edit <code>src/App.tsx</code> and save to reload.
</p>
<a
class={styles.link}
href="https://github.com/solidjs/solid"
target="_blank"
rel="noopener noreferrer"
>
Learn Solid
</a>
</header>
</div>
);
};`;
  console.log(await( formatCode(tsxCode, "tsx")));

})(prettier);