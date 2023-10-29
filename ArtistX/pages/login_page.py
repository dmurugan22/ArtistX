from ArtistX import styles
from ArtistX.templates import template

import reflex as rx


@template(route="/login", title="Login")

def login_page():
    return rx.vstack(
        rx.heading("Login to ArtistX", font_size="2em", color="blue"),
        rx.text("Username:"),
        rx.input(),  # Add more attributes as needed
        rx.text("Password:"),
        rx.input(type="password"),  # Add more attributes as needed
        rx.link(rx.button("Login"), href="/dashboard")  # Define the login_function to handle login logic
    )
