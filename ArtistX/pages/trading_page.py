from ArtistX import styles
from ArtistX.templates import template
from ArtistX.state import State
import asyncio
import reflex as rx


cryptos = [
    {"name": "Drake", "symbol": "DRK", "marketcap": State.prices['Drake'] * State.total_coins['Drake'], "price": State.prices['Drake'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanye", "symbol": "KAN", "marketcap": State.prices['Kanye'] * State.total_coins['Kanye'], "price": State.prices['Kanye'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "Taylor", "symbol": "TAY", "marketcap": State.prices['Taylor'] * State.total_coins['Taylor'], "price": State.prices['Taylor'], "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"},
    {"name": "Beyonce", "symbol": "BEY", "marketcap": State.prices['Beyonce'] * State.total_coins['Beyonce'], "price": State.prices['Beyonce'], "url": "https://cdn.britannica.com/51/188751-050-D4E1CFBC/Beyonce-2010.jpg"},
    {"name": "Ed", "symbol": "EDS", "marketcap": State.prices['Ed'] * State.total_coins['Ed'], "price": State.prices['Ed'], "url": "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg"},
    {"name": "Ariana", "symbol": "ARG", "marketcap": State.prices['Ariana'] * State.total_coins['Ariana'], "price": State.prices['Ariana'], "url": "https://www.billboard.com/wp-content/uploads/2023/03/Ariana-Grande-2020-billboard-1548.jpg?w=942&h=623&crop=1"},
    {"name": "Justin", "symbol": "JUB", "marketcap": State.prices['Justin'] * State.total_coins['Justin'], "price": State.prices['Justin'], "url": "https://m.media-amazon.com/images/M/MV5BMjE1NjMxMDUyM15BMl5BanBnXkFtZTgwODMzNDM1NTE@._V1_.jpg"},
    {"name": "Rihanna", "symbol": "RIH", "marketcap": State.prices['Rihanna'] * State.total_coins['Rihanna'], "price": State.prices['Rihanna'], "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/640px-Rihanna_Fenty_2018.png"},
    {"name": "Adele", "symbol": "ADE", "marketcap": State.prices['Adele'] * State.total_coins['Adele'], "price": State.prices['Adele'], "url": "https://upload.wikimedia.org/wikipedia/commons/5/52/Adele_for_Vogue_in_2021.png"},
    {"name": "Shawn", "symbol": "SHM", "marketcap": State.prices['Shawn'] * State.total_coins['Shawn'], "price": State.prices['Shawn'], "url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png"},
]


@template(route="/trading", title="Trading")
def trading_page():
    crypto_list = [crypto_card(crypto) for crypto in cryptos]
    return rx.vstack(
        rx.hstack(
        rx.link(rx.button("Portfolio"), href="/dashboard"),
        rx.link(rx.button("Trading"), href="/trading"),
        rx.link(rx.button("Discover"), href="/discover")
        ),
        rx.heading("Bet on your music taste!", font_size="2em", color="black"),
        rx.text("-", font_size="1.0em", color="white"),
        *crypto_list
    )

def crypto_card(crypto):
    return rx.box(
        rx.image(src=crypto["url"], width="200px", height="auto"),
        rx.text("-", font_size="0.5em", color="white"),
        rx.text(f"{crypto['name']} ({crypto['symbol']}) - ${crypto['price']}"),
        rx.text("-", font_size="0.5em", color="white"),
        rx.text(f"Market cap: ${crypto['marketcap']}", font_size="1.0em"),
        rx.text("-", font_size="0.5em", color="white"),
        rx.form(
        rx.input(value=State.amt, on_change=State.set_amt),
        rx.text("-", font_size="0.5em", color="white"),
        rx.button_group(
        rx.button("Buy", on_click = lambda: State.buy_stock(crypto)),  # Define the buy_function to handle buy logic
        rx.button("Sell", on_click = lambda: State.sell_stock(crypto)),  # Define the sell_function to handle sell logic
        )),
        rx.text("-", font_size="1em", color="white")
    )
