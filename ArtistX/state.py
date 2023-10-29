"""Base state for the app."""
from typing import Dict
import reflex as rx
from src import api
import nest_asyncio
import asyncio
import xrpl
import random

class State(rx.State):
    """Base state for the app.
    The base state is used to store general vars used throughout the app.
    """
    artistList = ["Ed Sheeran", "Ariana Grande", "Frank Ocean", "Billie Eilish","Zach Bryan", ""]
    artistImages = {"Ed Sheeran": "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg", 
                    "Ariana Grande": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrEAZXkaDi-hKRLyGck4jyTzhcckUOBz1q4St3a1j-QmxMZLam",
                    "Frank Ocean": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Frank_Ocean_2022_Blonded.jpg",
                    "Billie Eilish": "https://www.billieeilish.com/files/2021/04/release_202104_BE-HTE-Title-Cover-1024x1024.jpg",
                    "Zach Bryan": "https://static01.nyt.com/images/2022/09/25/arts/25zach-bryan2/merlin_212965773_e1a11d5e-bac0-49b1-82c5-f227ae60a687-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
                    "": "https://www.htmlcsscolor.com/preview/gallery/FFFFFF.png"}
    artistImage: str = "https://www.htmlcsscolor.com/preview/gallery/FFFFFF.png"
    spotify = {"Ed Sheeran": "76,550,000", 
                    "Ariana Grande": "64,640,000",
                    "Frank Ocean": "28,680,000",
                    "Billie Eilish": "67,810,000",
                    "Zach Bryan": "26,770,000",
                    None: "No Artist Chosen",
                    '': "No Artist Chosen"}
    for a in spotify:
        if a:
            spotify[a] = "Spotify Monthly Listeners: " + spotify[a]
    artistSearched: str = ''
    amt: str = ''
    searchevent: str = ''
    artists = ["Drake", "Kanye", "Taylor", "Ed", "Rihanna", "Beyonce", "Ariana", "Justin", "Adele", "Shawn"]
    total_coins : Dict[str, int] = {artist: random.randint(1000, 20000) for artist in artists}
    prices : Dict[str, int] = {artist: random.randint(1, 20) for artist in artists}
    wallet : Dict[str, int] = {artist: random.randint(0, 10) for artist in artists}

    async def buy_stock(self, crypto):
        print("hi")
        loop = asyncio.get_event_loop()
        nest_asyncio.apply(loop)
        myWallet = xrpl.wallet.Wallet.from_secret("sEdSovbjpbN7pjniF8EuedeYAGuSkpv", 
                                                      master_address = "rJW77xnDVAEbzfpu9MVaczTVG24UJdgbtR")
        res = await api.customer_transaction_buy(myWallet, crypto['symbol'], int(self.amt)/self.prices[crypto['name']], int(self.amt))
        if res:
            self.wallet[crypto['name']] = self.wallet[crypto['name']] + int(self.amt)/self.prices[crypto['name']]
            self.prices[crypto['name']] = self.prices[crypto['name']] + int(self.amt)/(self.prices[crypto['name']] * self.total_coins[crypto['name']])
            print("executed!!")
        loop.run_until_complete()
    async def sell_stock(self, crypto):
        print("hi")
        loop = asyncio.get_event_loop()
        nest_asyncio.apply(loop)
        myWallet = xrpl.wallet.Wallet.from_secret("sEdSovbjpbN7pjniF8EuedeYAGuSkpv", 
                                                      master_address = "rJW77xnDVAEbzfpu9MVaczTVG24UJdgbtR")
        res = await api.customer_transaction_sell(myWallet, crypto['symbol'], int(self.amt)/self.prices[crypto['name']], int(self.amt))
        if res:
            self.wallet[crypto['name']] = self.wallet[crypto['name']] - int(self.amt)/self.prices[crypto['name']]
            self.prices[crypto['name']] = self.prices[crypto['name']] - int(self.amt)/(self.prices[crypto['name']] * self.total_coins[crypto['name']])
            print("executed!!")
        loop.run_until_complete()
    def set_searchevent(self, searchevent: str):
        self.artistSearched = None
        self.searchevent = searchevent
        self.artistImage = "https://imgtr.ee/images/2023/10/29/2fd02d5c047b98eacd3c64300e7ce1d9.jpeg"
        for i in self.artistList:
            if i.lower() == searchevent.lower():
                self.artistSearched = i
                self.artistImage = self.artistImages[i]
