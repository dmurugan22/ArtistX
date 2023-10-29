from ArtistX import styles
from ArtistX.templates import template
from ArtistX.state import State

import reflex as rx

# Placeholder function to simulate searching for artists

# Event handler for the search button

@template(route="/discover", title="Discover")
def discover():
    return rx.vstack(
        rx.heading("Discover Artists", font_size="2em", color="blue"),
        rx.text("Search for your favorite artists:"),
        rx.input(value = State.searchevent, on_change = State.set_searchevent, placeholder="Enter artist name..."),  # Add more attributes as needed
        # Add a section to display the search results
        # For now, let's use a placeholder text
        rx.text("Search results will appear here..."),
        rx.image(src=State.artistImage, width="300px", height="auto"),
        rx.text(State.artistSearched),
        rx.text(State.spotify[State.artistSearched])
    )

