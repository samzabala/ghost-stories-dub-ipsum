<template>
	<div class="template-block template-block-form-control">
		<h1>Ghost Stories Dub Ipsum Generator</h1>
		<hr />
		<form action="get" class="form-grid" @submit.prevent="submitShits">
			<div v-if="errors.length" class="input-errors-list">
				<h4>You have errors, bitch!</h4>
				<ul>
					<li v-for="(error, index) in errors" v-bind:key="index">{{ error }}</li>
				</ul>
			</div>
			<div class="form-group form-group-for-num">
				<div class="input-group" :class="{ invalid: numInvalid }">
					<label for="num"># of paragraphs?</label>
					<input
						v-model.number="num"
						name="num"
						id="num"
						type="number"
						:min="minNum"
						:max="maxNum"
						placeholder="69... or you know, 2 or 3 parapraphs work too."
						:class="{ invalid: numInvalid }"
					/>
				</div>
				<div
					v-if="numFeedback"
					class="input-feedback"
					:class="{ 'input-feedback-error': numInvalid }"
				>
					{{ numFeedback }}
				</div>
			</div>
			<div class="form-group form-group-for-severity">
				<div class="input-group" :class="{ invalid: severity > severityLevels.length - 1 }">
					<label for="severity">How problematic?</label>
					<select
						v-model.number="severity"
						name="severity"
						id="severity"
						:class="{ invalid: severity > severityLevels.length - 1 }"
					>
						<option
							v-for="(text, level) in severityLevels"
							v-bind:key="level"
							:value="level"
							:selected="level == severity"
						>
							{{ getSeverityLabel(level) }}
						</option>
					</select>
				</div>
			</div>
			<div class="form-footer">
				<button
					class="button-special button-is-large"
					type="submit"
					v-html="'Ok... Jackass ' + emojiCode"
				></button>
				<button
					class="button-not-as-special button-is-large"
					type="reset"
					@click.prevent="resetShits"
				>
					Reset
				</button>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	props: {
		severityLevels: {
			type: Array,
			required: true,
		},
		maxNum: {
			type: Number,
			required: true,
		},
		minNum: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			num: 5,
			severity: 0,
			isolateSeverity: false,
			errors: [],
		};
	},
	computed: {
		numInvalid() {
			return this.num < this.minNum || this.num > this.maxNum;
		},
		severityInvalid() {
			return this.severity < 0 || this.severity > this.severityLevels.length - 1;
		},
		numFeedback() {
			let feedback = '';

			if (this.num > this.maxNum) {
				feedback = 'What the dick, if you crash my app I swear to god!';
			} else if (this.num > Math.ceil(this.maxNum * 0.5)) {
				feedback = "Don't make a novel, ass! This might slow down the generator!";
			} else if (this.num < 0) {
				feedback = "Oh har har, you're so funny, you little math nerd.";
			} else if (this.num < this.minNum) {
				feedback = 'Not enough paragraphs, pal. :/';
			}

			return feedback;
		},
		emojiCode() {
			switch (this.severity) {
				case 1:
					return '&#x1F62C;';
				case 2:
					return '&#x1F633;';
				case 3:
					return '&#x1F610;';
				default:
					return '&#x1F44D;';
			}
		},
	},
	methods: {
		resetShits() {
			let shits = {
				num: 0,
				severity: 0,
				isolateSeverity: false,
			};
			this.$emit('shits-submitted', shits);
		},
		submitShits(e) {
			this.errors = [];

			if (this.numInvalid) {
				this.errors.push(
					`Haha jokes on you bitch, you can't crash this shit. I think. Number of paragraphs should be at least ${this.minNum} but no more than  ${this.maxNum}.`
				);
			}
			if (this.severityInvalid) {
				this.errors.push(
					`Sorry, your choice of problematic does not exist. Pick only one of the available levels of fucked up.`
				);
			}

			if (this.errors.length) {
				e.preventDefault();
				return false;
			} else {
				let shits = {
					num: this.num,
					severity: this.severity,
					isolateSeverity: this.isolateSeverity,
					forceUpdate: Math.random(),
				};
				this.$emit('shits-submitted', shits);
			}
		},
		getSeverityLabel(level) {
			return `${level > 0 ? level : 'Whatever'} - ${this.severityLevels[level]}`;
		},
	},
	emits: ['shits-submitted'],
};
</script>
