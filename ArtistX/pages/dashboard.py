"""The dashboard page."""
from ArtistX.templates import template
from ArtistX.state import State

import reflex as rx


# Sample data (this would typically come from your backend/database)
wallet = [
    {"name": "Drakecoin", "symbol": "DRK", "price": State.prices['Drake'], "quantity": State.wallet['Drake'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanyethereum", "symbol": "KAN", "price": State.prices['Kanye'], "quantity": State.wallet['Kanye'], "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "TayloRP", "symbol": "TAY", "price": State.prices['Taylor'], "quantity": State.wallet['Taylor'], "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"},
    {"name": "Beyoncécoin", "symbol": "BEY", "price": State.prices['Beyoncé'], "quantity": State.wallet['Beyoncé'], "url": "https://example.com/beyonce-image-url"},
    {"name": "Edcoin", "symbol": "EDS", "price": State.prices['Ed Sheeran'], "quantity": State.wallet['Ed Sheeran'], "url": "https://example.com/ed-sheeran-image-url"},
    {"name": "ArianaCoin", "symbol": "ARG", "price": State.prices['Ariana Grande'], "quantity": State.wallet['Ariana Grande'], "url": "https://example.com/ariana-grande-image-url"},
    {"name": "Biebercoin", "symbol": "JUB", "price": State.prices['Justin Bieber'], "quantity": State.wallet['Justin Bieber'], "url": "https://example.com/justin-bieber-image-url"},
    {"name": "Rihannacoin", "symbol": "RIH", "price": State.prices['Rihanna'], "quantity": State.wallet['Rihanna'], "url": "https://example.com/rihanna-image-url"},
    {"name": "Adelecoin", "symbol": "ADE", "price": State.prices['Adele'], "quantity": State.wallet['Adele'], "url": "https://example.com/adele-image-url"},
    {"name": "Shawncoin", "symbol": "SHM", "price": State.prices['Shawn Mendes'], "quantity": State.wallet['Shawn Mendes'], "url": "https://example.com/shawn-mendes-image-url"},
    # Add more cryptocurrencies as needed
]


# Sample balance (this would also come from your backend/database)
balance = float(5000.00)  # in USD


@template(route="/dashboard", title="Dashboard")
def dashboard():
    # Calculate total value of all cryptocurrencies in USD
    total_value = sum([coin_data["quantity"] * coin_data["price"] for coin_data in wallet])
    
    # Create a list of components for each cryptocurrency
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
