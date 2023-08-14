#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
minfont.js 的 Python 版，速度比 minfont.js 快，支持可变字体，且生成的字体文件大小更小

MIT License

Copyright (c) 2023 GraiaCommunity

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE

@author Redlnn <w731347477@gmail.com>
@website https://github.com/GraiaCommunity/Docs
"""

import os
from os.path import basename
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

origin_path = Path('docs')
ignore_dirs = ['dist', 'public', '.DS_Store', 'cache']
out_path = Path('docs', 'public', 'fonts')
fonts_path = Path('fonts')
fonts = [
    'HarmonyOS_Sans_SC.ttf',
]

content = ''


def read(path):
    global content
    for root, dirs, files in os.walk(path):
        if basename(root) in ignore_dirs:
            dirs[:] = []  # 忽略当前目录下的子目录
            continue
        for f in files:
            file_path = Path(root, f)
            print(f'正在读取 {file_path}')
            file_content = file_path.read_text(encoding='utf8')
            file_content = (
                file_content.replace('\r\n', '').replace('\n', '').replace('\r', '')
            )
            content += '\n'.join(file_content)
            content += '\n'
    content += ' \n \n \n '


print('读取文件中...')
read(origin_path)

for font in fonts:
    print(f'正在处理 {font}')
    out_path.mkdir(parents=True, exist_ok=True)
    f = TTFont(fonts_path / font)

    subsetter = subset.Subsetter()

    subsetter.populate(text=content.rstrip())
    subsetter.subset(f)
    f.flavor = 'woff2'
    out = out_path / font.replace(".ttf", ".woff2")
    f.save(out)
    print(f'输出路径: {out}')
