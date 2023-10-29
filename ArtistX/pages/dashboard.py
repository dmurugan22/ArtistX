"""The dashboard page."""
from ArtistX.templates import template
from ArtistX.state import State

import reflex as rx


wallet = [
    {"name": "Drakecoin", "symbol": "DRK", "price": State.prices['Drake'], "quantity": State.wallet['Drake'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanyethereum", "symbol": "KAN", "price": State.prices['Kanye'], "quantity": State.wallet['Kanye'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "TayloRP", "symbol": "TAY", "price": State.prices['Taylor'], "quantity": State.wallet['Taylor'], "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"},
    {"name": "Beyoncécoin", "symbol": "BEY", "price": State.prices['Beyonce'], "quantity": State.wallet['Beyonce'], "url": "https://cdn.britannica.com/51/188751-050-D4E1CFBC/Beyonce-2010.jpg"},
    {"name": "Edcoin", "symbol": "EDS", "price": State.prices['Ed'], "quantity": State.wallet['Ed'], "url": "https://cdn.britannica.com/17/249617-050-4575AB4C/Ed-Sheeran-performs-Rockefeller-Plaza-Today-Show-New-York-2023.jpg"},
    {"name": "ArianaCoin", "symbol": "ARG", "price": State.prices['Ariana'], "quantity": State.wallet['Ariana'], "url": "https://www.billboard.com/wp-content/uploads/2023/03/Ariana-Grande-2020-billboard-1548.jpg?w=942&h=623&crop=1"},
    {"name": "Biebercoin", "symbol": "JUB", "price": State.prices['Justin'], "quantity": State.wallet['Justin'], "url": "https://m.media-amazon.com/images/M/MV5BMjE1NjMxMDUyM15BMl5BanBnXkFtZTgwODMzNDM1NTE@._V1_.jpg"},
    {"name": "Rihannacoin", "symbol": "RIH", "price": State.prices['Rihanna'], "quantity": State.wallet['Rihanna'], "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/640px-Rihanna_Fenty_2018.png"},
    {"name": "Adelecoin", "symbol": "ADE", "price": State.prices['Adele'], "quantity": State.wallet['Adele'], "url": "https://upload.wikimedia.org/wikipedia/commons/5/52/Adele_for_Vogue_in_2021.png"},
    {"name": "Shawncoin", "symbol": "SHM", "price": State.prices['Shawn'], "quantity": State.wallet['Shawn'], "url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png"},
]


balance = float(5000.00)  # in USD


@template(route="/dashboard", title="Dashboard")
def dashboard():
    total_value = sum([coin_data["quantity"] * coin_data["price"] for coin_data in wallet])
    
    crypto_components = []
    for data in wallet:
        crypto_value = data["quantity"] * data["price"]
        component = rx.vstack(rx.image(src=data["url"], width="200px", height="auto"),
        rx.text("-", font_size="0.25em", color="white"), rx.hstack(
            rx.text(f"Name: {data['name']}", font_size="1em"),
            rx.text(f"Quantity: {data['quantity']}", font_size="1em"),
            rx.text(f"Value: ${crypto_value}", font_size="1em")),
        rx.text("-", font_size="0.5em", color="white")
        )
        crypto_components.append(component)
    
    return rx.vstack(
        rx.hstack(
        rx.link(rx.button("Portfolio"), href="/dashboard"),
        rx.link(rx.button("Trading"), href="/trading"),
        rx.link(rx.button("Discover"), href="/discover")
        ),
        rx.heading(f"Welcome to your ArtistX Wallet!", font_size="2em", color="black"),
        rx.text("-", font_size="1.5em", color="white"),
        rx.hstack(rx.heading(f"Balance: ${balance}", font_size="1.25em", color="blue"),
                  rx.heading("-----", font_size="1.25em", color="white"),
                  rx.heading(f"Portfolio Value: ${total_value}", font_size="1.25em", color="blue"),
        ),
        rx.text("-", font_size="1.5em", color="white"),
        *crypto_components
    )
