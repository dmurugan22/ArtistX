"""The home page of the app."""

from ArtistX import styles
from ArtistX.templates import template

import reflex as rx

#@template(route="/register", title="Register")
def registration_page():
    return rx.vstack(
        rx.heading("Registration", font_size="2em", color="blue"),
        rx.text("Username:"),
        rx.input(),
        rx.text("Password:"),
        rx.input(type="password"),
        rx.text("Confirm Password:"),
        rx.input(type="password"),
        rx.button("Register")  
    )
