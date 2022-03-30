<template>
	<div id="home">
		<h1 class="title has-text-centered">Anthony Garcia</h1>
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-narrow">
					<div class="buttons">
						<button class="button is-black" @click="openLinkedIn">
							LinkedIn
						</button>
						<button class="button is-black" @click="openGitHub">GitHub</button>
					</div>
				</div>
			</div>
			<div v-if="loading">
				<p>loading</p>
				<progress class="progress is-medium is-dark" max="100"></progress>
			</div>
			<div v-else>
				<div>
					<div class="notification">
						<div class="columns">
							<div class="column is-2">
								{{ getDayByDate(current.startTime) }}
							</div>
							<div class="column">
								<img v-bind:id="current.startTime" src="" />
							</div>
							<div class="column is-5">
								{{ getWordsByCode(current.values.weatherCode) }}
							</div>
							<div class="column">{{ current.values.temperature }}°</div>
							<div class="column is-narrow">
								{{ current.values.windSpeed }} mph
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import weatherCode from "../weatherCode.json";
import iconFileNames from "../icon-file-names.json";

export default {
	data() {
		return {
			loading: true,
			current: {},
		};
	},

	created() {
		document.title = "Home";
	},

	async mounted() {
		await this.getWeather();
		await this.populateImages();
	},

	methods: {
		openLinkedIn() {
			window.open("https://linkedin.com/in/anthonygarcia40");
		},
		openGitHub() {
			window.open("https://github.com/voltra40");
		},

		// tomorrow.io api retrieves weather data for location
		async getWeather() {
			await axios
				.get("https://api.tomorrow.io/v4/timelines", {
					params: {
						apikey: "QRwM6bs40Uflqf130GkBbZdoAq34jVrV",
						location: "42.993697132128034,-78.81725641523629",
						fields: "windSpeed,temperature,weatherCode",
						timesteps: "current,1d",
						units: "imperial",
					},
				})
				.then((result) => {
					// populate current
					this.current = result.data.data.timelines[0].intervals[0];

					console.log("current:", this.current);

					this.loading = false;
				})
				.catch((error) => {
					console.log(error.message);
				});
		},

		// creates unique ids for day's corresponding html image tag
		async populateImages() {
			// check for null
			if (!document.getElementById(this.current.startTime)) {
				console.log("src is null");
				setTimeout(this.populateImages, 250);
			}
			document.getElementById(this.current.startTime).src =
				"/icons/" + this.imageFile(this.current.values.weatherCode);
		},

		// gets weather phrase, ex: "Partly Cloudy"
		getWordsByCode(code) {
			return weatherCode.weatherCode[code];
		},

		// formats date, ex: "Thurs 3/29"
		getDayByDate(date) {
			const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
			const d = new Date(date);
			return weekday[d.getDay()] + " " + (d.getMonth() + 1) + "/" + d.getDate();
		},

		// finds image for weather code
		imageFile(code) {
			// image code regex
			const re = new RegExp(code + "*");
			const match = iconFileNames.files.find((value) => re.test(value));
			return match;
		},
	},
};
</script>

<style>
#home {
	margin: auto;
	margin-top: 5%;
	max-width: 70%;
}
</style>
