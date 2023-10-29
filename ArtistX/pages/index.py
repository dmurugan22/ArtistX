"""The home page of the app."""

from ArtistX import styles
from ArtistX.templates import template

import reflex as rx

@template(route="/", title="Home", image="/github.svg")
def index():
    return rx.vstack(
        rx.heading("Welcome to ArtistX!", font_size="2em", color="blue"),
        rx.text("The premier platform for trading your favorite cryptocurrencies.")
    )

"""
def index() -> rx.Component:
"""
"""
    The home page.

    Returns:
        The UI for the home page.
""" 
"""
    with open("README.md", encoding="utf-8") as readme:
        content = readme.read()
    return rx.markdown(content, component_map=styles.markdown_style)
"""
