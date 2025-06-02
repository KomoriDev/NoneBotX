from typing import Literal

import httpx
from yarl import URL

from .schemas import SetuSchema


async def get_lolicon_image(r18: Literal[0, 1], tags: str) -> SetuSchema:
    async with httpx.AsyncClient() as client:
        url = URL("https://api.lolicon.app/setu/v2").with_query(
            {"r18": r18, "tag": tags}
        )
        response = await client.get(str(url))
    return SetuSchema(**response.json()["data"][0])
