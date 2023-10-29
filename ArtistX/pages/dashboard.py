"""The dashboard page."""
from ArtistX.templates import template

import reflex as rx


# Sample data (this would typically come from your backend/database)
wallet = [
    {"name": "Drakecoin", "symbol": "DRK", "price": 50000, "quantity": 2, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB78TvJChoaYVo_20-U39wygzmZnBFr0lfLQwwfjSTg&s"},
    {"name": "Kanyethereum", "symbol": "KAN", "price": 3000, "quantity": 1, "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-XlOz7n7DnAPOFD3gyMXajoCMpq2LozP5ZSyHJU&s"},
    {"name": "TayloRP", "symbol": "TAY", "price": 5000, "quantity": 4, "url": "http://t1.gstatic.com/images?q=tbn:ANd9GcTIThZ_9MimtX7eh_QJ9waeguPw2Gh0rpzk4FY5JvdZSXPSvC_Aqjt8u8dsOWEVXd-V3PNJ"}
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
        component = rx.hstack(
            rx.text(f"Name: {data['name']}"),
            rx.text(f"Quantity: {data['quantity']}"),
            rx.text(f"Value in USD: ${crypto_value:.2f}")
        )
        crypto_components.append(component)
    
    return rx.vstack(
        rx.hstack(
        rx.link(rx.button("Portfolio"), href="/dashboard"),
        rx.link(rx.button("Trading"), href="/trading")
        ),
        rx.heading(f"Welcome to your CoinTrade Wallet!", font_size="2em", color="blue"),
        rx.text("-", font_size="2.5em", color="white"),
        rx.heading(f"Current Balance: ${balance:.2f}", font_size="1.5em", color="green"),
        rx.text("-", font_size="2.5em", color="white"),
        *crypto_components,
        rx.text("-", font_size="2.5em", color="white"),
        rx.heading(f"Total Value in USD: ${total_value:.2f}", font_size="1.5em", color="green")
    )
