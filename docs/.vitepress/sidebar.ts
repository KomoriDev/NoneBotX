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
          { text: 'Python 版本的选择', link: '/before/configure_workspace/select_python' },
          { text: 'IDE 的选择', link: '/before/configure_workspace/select_ide' },
          { text: '了解虚拟环境', link: '/before/configure_workspace/learn_virtualenv' },
          { text: '包管理器的选择', link: '/before/configure_workspace/select_package_manager' },
          { text: 'Git 的安装与配置', link: '/before/configure_workspace/git' },
          {
            text: 'Python 及包管理器的安装',
            link: '/before/configure_workspace/install_package_manager'
          },
          {
            text: 'IDE 的安装与配置',
            link: '/before/configure_workspace/install_ide/',
            items: [
              { text: 'PyCharm 的安装与配置', link: '/before/configure_workspace/install_ide/pyc' },
              { text: 'VS Code 的安装与配置', link: '/before/configure_workspace/install_ide/vsc' }
            ]
          }
        ]
      },
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
          { text: 'Novelai', link: '/before/introduction/project/novelai' }
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
      { text: '快速上手', link: '/guide/hello_hibiscus' }
    ]
  }
]

const develop = [
  {
    text: '类型检查',
    items: [
      { text: '类型系统', link: '/develop/types/type_systems' },
      { text: '你好类型', link: '/develop/types/hello_types' },
      { text: '优点和缺点', link: '/develop/types/pros_and_cons' },
      { text: '玩转类型', link: '/develop/types/play_types' }
    ]
  },
  {
    text: 'Alconna',
    items: [{ text: '安装', link: '/develop/alconna/base' }]
  }
]

const appendix = [
  {
    text: '附录',
    items: [
      { text: '鸣谢', link: '/appendix/credit' },
      { text: 'Q&A', link: '/appendix/QA' }
    ]
  },
  {
    text: '写代码的小贴士',
    items: [
      { text: '终端复用', link: '/appendix/tips/terminal_multiplexer' },
      { text: 'Termux 安装 Uvicorn 出错', link: '/appendix/tips/termux-install-uvicon' },
      { text: 'pathlib 为什么是神？路径解析推荐', link: '/appendix/tips/pathlib' }
    ]
  },
  {
    text: '奇奇怪怪的东西',
    items: [{ text: '蜜汁好活 - 论到底需要几个 NoneBot 人换灯泡', link: '/appendix/other/bulb' }]
  }
]

const comment = [{ text: '论坛', link: '/comment' }]

export { before, guide, develop, appendix, comment }
