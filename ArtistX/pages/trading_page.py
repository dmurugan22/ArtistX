from ArtistX import styles
from ArtistX.templates import template

import reflex as rx

# Sample list of cryptocurrencies. In a real application, this would be fetched from a backend or API.
cryptos = [
    {"name": "Drakecoin", "symbol": "DRK", "price": 50000, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanyethereum", "symbol": "KAN", "price": 3000, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "TayloRP", "symbol": "TAY", "price": 5000, "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"}
    # ... add more cryptocurrencies as needed
]

@template(route="/trading", title="Trading")
def trading_page():
    crypto_list = [crypto_card(crypto) for crypto in cryptos]
    return rx.vstack(
        rx.hstack(
        rx.link(rx.button("Portfolio"), href="/dashboard"),
        rx.link(rx.button("Trading"), href="/trading")
        ),
        rx.heading("Trade Cryptocurrencies", font_size="2em", color="blue"),
        rx.text("-", font_size="1.5em", color="white"),
        *crypto_list
    )

def crypto_card(crypto):
    return rx.box(
        rx.image(src=crypto["url"], width="100px", height="auto"),
        rx.text("-", font_size="0.5em", color="white"),
        rx.text(f"{crypto['name']} ({crypto['symbol']}) - ${crypto['price']}"),
        rx.text("-", font_size="0.5em", color="white"),
        rx.input(placeholder="Enter amount..."),
        rx.text("-", font_size="0.5em", color="white"),
        rx.button("Buy"),  # Define the buy_function to handle buy logic
        rx.button("Sell"),  # Define the sell_function to handle sell logic
        rx.text("-", font_size="1em", color="white")
    )

# Placeholder functions for buy and sell logic. These would need to be implemented.
def buy_function(crypto):
    # Implement the logic to buy the selected cryptocurrency
    pass

def sell_function(crypto):
    # Implement the logic to sell the selected cryptocurrency
    pass
