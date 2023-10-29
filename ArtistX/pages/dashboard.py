"""The dashboard page."""
from ArtistX.templates import template
from ArtistX.state import State

import reflex as rx


# Sample data (this would typically come from your backend/database)
wallet = [
    {"name": "Drakecoin", "symbol": "DRK", "price": State.drake_price, "quantity": 2, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanyethereum", "symbol": "KAN", "price": State.kanye_price, "quantity": 1, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "TayloRP", "symbol": "TAY", "price": State.taylor_price, "quantity": 4, "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"}
    # ... add more cryptocurrencies as needed
]

# Sample balance (this would also come from your backend/database)
balance = 5000  # in USD


@template(route="/dashboard", title="Dashboard")
def dashboard():
    # Calculate total value of all cryptocurrencies in USD
    total_value = sum([coin_data["quantity"] * coin_data["price"] for coin_data in wallet])
    
    # Create a list of components for each cryptocurrency
    crypto_components = []
    for data in wallet:
        crypto_value = data["quantity"] * data["price"]
        component = rx.vstack(rx.image(src=data["url"], width="100px", height="auto"),
        rx.text("-", font_size="0.25em", color="white"), rx.hstack(
            rx.text(f"Name: {data['name']}", font_size="1em"),
            rx.text(f"Quantity: {data['quantity']}", font_size="1em"),
            rx.text(f"Value: ${crypto_value:.2f}", font_size="1em")),
        rx.text("-", font_size="0.5em", color="white")
        )
        crypto_components.append(component)
    
    return rx.vstack(
        rx.hstack(
        rx.link(rx.button("Portfolio"), href="/dashboard"),
        rx.link(rx.button("Trading"), href="/trading")
        ),
        rx.heading(f"Welcome to your ArtistX Wallet!", font_size="2em", color="black"),
        rx.text("-", font_size="1.5em", color="white"),
        rx.hstack(rx.heading(f"Balance: ${balance:.2f}", font_size="1.25em", color="blue"),
                  rx.heading("-----", font_size="1.25em", color="white"),
                  rx.heading(f"Portfolio Value: ${balance:.2f}", font_size="1.25em", color="blue"),
        ),
        rx.text("-", font_size="1.5em", color="white"),
        *crypto_components
    )
