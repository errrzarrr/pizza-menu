import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const dateTimeFormatOptions = {
	hour: "2-digit",
	minute: "2-digit",
	hour12: false,
};

/* Language code for spanish for Dominican Republic, per ISO standard 639-1 + 3166-1 Alpha-2) */
const LANG_CODE = "es-DO";

const data = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 310,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 450,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 499,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 510,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 510,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 610,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
	{
		name: "Pizza La Stella",
		ingredients: "Tomato, mozarella, Prosciutto, rucola, burrata",
		price: 725,
		photoName: "pizzas/lastella.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header className="header">
			<h1>Fast React Pizza co.</h1>
		</header>
	);
}

function Menu() {
	// for conditional rendering
	const elementsExists = data && data.length >= 1;
	/* price={10} Pass a price (a number) this way —Moreso, pass anything which is NOT a string this way. */

	return (
		<main className="menu">
			<h2>il nostro menù</h2>

			{elementsExists ? (
				<>
					<ul className="pizzas">
						{data.map((pizza) => (
							<Pizza pizzaData={pizza} key={pizza.name} />
						))}
					</ul>
				</>
			) : (
				<p>
					We are still working on our menu. Please come back later.{" "}
				</p>
			)}
		</main>
	);
}

function Pizza({ pizzaData }) {
	const price = new Intl.NumberFormat(LANG_CODE, {
		style: "currency",
		currency: "DOP",
	}).format(pizzaData.price);

	return (
		<li className={pizzaData.soldOut ? "pizza sold-out" : "pizza"}>
			<img src={pizzaData.photoName} alt={pizzaData.name} />
			<div>
				<h3>{pizzaData.name}</h3>
				<p>{pizzaData.ingredients}</p>
				<span>{pizzaData.soldOut ? "SOLD OUT" : price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const hourNow = new Date().getHours();
	const openHour = 10;
	const closeHour = 22;
	const isOpen = hourNow >= openHour && hourNow <= closeHour;

	const openHourFormatted = new Intl.DateTimeFormat(
		LANG_CODE,
		dateTimeFormatOptions
	).format(new Date(0, 0, 0, openHour, 0, 0, 0));

	const closeHourFormatted = new Intl.DateTimeFormat(
		"es-DO",
		dateTimeFormatOptions
	).format(new Date(0, 0, 0, closeHour, 0, 0, 0));

	// Conditional rendering:
	return (
		<footer className="footer">
			{isOpen ? (
				<Order closeHour={closeHourFormatted} />
			) : (
				<p>
					{`Come vist us or order online from ${openHourFormatted} to ${closeHourFormatted}`}
				</p>
			)}
		</footer>
	);
}

function Order({ closeHour }) {
	return (
		<div className="order">
			<p>
				{`We're currently open until ${closeHour}. Come visit us or order online.`}
			</p>
			<button className="btn">Order</button>
		</div>
	);
}

// React < v18
// React.render(<App />, document.getElementById("root"));

// React >= v18
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
