"""Welcome to Reflex!."""

from ArtistX import styles

# Import all the pages.
from ArtistX.pages import *

from ArtistX import templates
import reflex as rx




app = rx.App()

# Create the app and compile it.
app.compile()
