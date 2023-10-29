"""Base state for the app."""

import reflex as rx


class State(rx.State):
    """Base state for the app.

    The base state is used to store general vars used throughout the app.
    """
    drake_price = 5
    kanye_price = 10
    taylor_price = 8

    drake_coins_tot = 10000
    kanye_coins_tot = 15000
    taylor_coins_tot = 20000
