from typing import Literal
from dataclasses import dataclass


@dataclass
class SetuUrls:
    original: str


@dataclass
class SetuSchema:
    pid: int
    p: int
    uid: int
    title: str
    author: str
    r18: bool
    width: int
    height: int
    tags: list[str]
    ext: str
    aiType: Literal[0, 1, 2]
    uploadDate: int
    urls: SetuUrls

    def __post_init__(self) -> None:
        if self.urls and isinstance(self.urls, dict):
            self.urls = SetuUrls(**self.urls)
