const before = [
  {
    text: '说在前面',
    items: [
      { text: '引言', link: '/before/' },
      { text: '你需要知道的一些事', link: '/before/QA' },
      {
        text: '从零开始的 Python 环境及 IDE 的配置',
        link: '/before/configure_workspace/',
        collapsed: true,
        items: [
          { text: 'Python 环境搭建', link: '/before/configure_workspace/python' },
          {
            text: '代码编辑器的安装及配置',
            link: '/before/configure_workspace/install_editor/',
            collapsed: true,
            items: [
              {
                text: '编辑器的选择',
                link: '/before/configure_workspace/install_editor/select'
              },
              {
                text: 'PyCharm 的安装与配置',
                link: '/before/configure_workspace/install_editor/pyc'
              },
              {
                text: 'VS Code 的安装与配置',
                link: '/before/configure_workspace/install_editor/vsc'
              }
            ]
          },
          {
            text: '虚拟环境 & 包管理器',
            link: 'before/configure_workspace/environment'
          },
          { text: 'Git 的安装与配置', link: '/before/configure_workspace/git' }
        ]
      },
      { text: 'NapCat 的安装与配置', link: '/before/install_napcat' },
      { text: 'Lagrange 的安装与配置', link: '/before/install_lagrange' },
      { text: 'Go-CQHTTP 的安装与配置', link: '/before/install_go-cqhttp' },
      { text: '名词解释', link: '/before/terms' }
    ]
  },
  {
    text: '社区及社区项目介绍',
    items: [
      { text: '社区介绍', link: '/before/introduction/' },
      {
        text: '社区项目',
        link: '/before/introduction/project/',
        items: [
          { text: 'SAA', link: '/before/introduction/project/saa' },
          { text: 'Alconna', link: '/before/introduction/project/alconna' },
          { text: 'KiramiBot', link: '/before/introduction/project/kirami' },
          { text: 'SoraBot', link: '/before/introduction/project/sora' },
          { text: 'Novelai', link: '/before/introduction/project/novelai' },
          { text: 'Nonebot Flutter GUI', link: '/before/introduction/project/nbgui' }
        ]
      }
    ]
  }
]

const guide = [
  {
    text: '手把手教你写机器人',
    items: [
      { text: '要致富，先撸树', link: '/guide/create_env' },
      { text: '东西要分类好', link: '/guide/create_plugin' },
      { text: '快速上手', link: '/guide/hello_hibiscus' },
      { text: '可不是什么人都能看涩图', link: '/guide/event_data' }
    ]
  }
]

const appendix = [
  {
    text: '附录',
    items: [
      { text: '鸣谢', link: '/appendix/credit' },
      { text: 'Q&A', link: '/appendix/QA' },
      { text: '贡献指南', link: '/appendix/CONTRIBUTING' }
    ]
  },
  {
    text: '写代码的小贴士',
    items: [
      { text: '终端复用', link: '/appendix/tips/terminal_multiplexer' },
      { text: 'Termux 下进行部署/开发', link: '/appendix/tips/termux-guide' },
      { text: 'pathlib 为什么是神？路径解析推荐', link: '/appendix/tips/pathlib' }
    ]
  },
  {
    text: '奇奇怪怪的东西',
    items: [{ text: '蜜汁好活 - 论到底需要几个 NoneBot 人换灯泡', link: '/appendix/other/bulb' }]
  }
]

const comment = [{ text: '论坛', link: '/comment' }]

export { appendix, before, comment, guide }
