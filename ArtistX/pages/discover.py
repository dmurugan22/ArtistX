from ArtistX import styles
from ArtistX.templates import template
from ArtistX.state import State

import reflex as rx



@template(route="/discover", title="Discover")
def discover():
    return rx.vstack(
        rx.heading("Discover Artists", font_size="2em", color="blue"),
        rx.text("Search for your favorite artists:"),
        rx.input(value = State.searchevent, on_change = State.set_searchevent, placeholder="Enter artist name..."),
        rx.text("Search results will appear here..."),
        rx.image(src=State.artistImage, width="300px", height="auto"),
        rx.text(State.artistSearched),
        rx.text(State.spotify[State.artistSearched])
    )

