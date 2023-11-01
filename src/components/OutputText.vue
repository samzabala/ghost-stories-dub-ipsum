<template>
	<div class="template-block template-block-output">
		<div ref="result">
			<template v-if="isNotDoneYet">
				<div
					class="template-block-output-text template-block-output-text-status template-block-output-text-status-loading"
				>
					<blockquote>
						Hold on, give me a sec... But this hurricane? What are we gonna—
					</blockquote>
				</div>
			</template>
			<template v-else>
				<template v-if="num > 0">
					<div class="template-block-output-text">
						<textarea
							class="template-block-output-text-area"
							readonly
							v-model="paragraphs"
							ref="pootpoot"
						></textarea>
						<div class="template-block-output-text-copy">
							<button
								:class="[copied ? 'button-period' : 'button-special']"
								class="button-is-small template-block-output-text-copy-butt"
								@click.prevent="copyShits"
							>
								{{ copied ? "Oh yea, it's copied!" : 'Copy to clipboard' }}
							</button>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="template-block-output-text template-block-output-text-status">
						<blockquote>
							Nothing yet. Gimme something to work with first. See that cute form up
							there? Hell yeah, fill it up bitch.
						</blockquote>
					</div>
				</template>
			</template>
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	props: {
		num: {
			type: Number,
			required: true,
			min: 1,
			default: 5,
		},
		severity: {
			type: Number,
			default: 0,
		},
		isolateSeverity: {
			type: Boolean,
			default: false,
		},
		severityLevels: {
			type: Array,
			required: true,
		},
		forceUpdate: Number,
	},
	data() {
		return {
			dialogues: [],
			paragraphs: '',
			copied: false,
			isNotDoneYet: false,
		};
	},
	watch: {
		forceUpdate() {
			const self = this;
			this.isNotDoneYet = true;
			setTimeout(() => {
				self.buildShits();
			}, 50);
		},
	},
	computed: {
		eligibleDialogues() {
			const self = this; //self.severityLevels.length - 1
			return this.dialogues.filter((dialogue) => {
				return (
					dialogue.text &&
					(!self.severity || !dialogue.severity || dialogue.severity == self.severity)
				);
			});
		},
	},
	methods: {
		wordCount(text) {
			return text.split(' ').length;
		},
		randomNum(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.round(Math.random() * (max - min) + min);
		},
		copyShits() {
			// Copy the text inside the text field
			navigator.clipboard.writeText(this.paragraphs);
			this.$refs.pootpoot.select();

			this.copied = true;
		},
		buildShits() {
			this.paragraphs = [];
			this.copied = false;

			const paragraphs = [];
			const eligibleDialogues = this.eligibleDialogues;

			let i = 0;
			const benched = [];

			while (i < this.num) {
				const paragraph = [];
				const length = this.randomNum(5, 8);

				const ideal = 15;
				let shortCount = 0;
				let reshuffle = 0;

				let j = 0;
				while (j < length) {
					const dialogueIdx = this.randomNum(0, eligibleDialogues.length - 1);
					const dialogue = eligibleDialogues[dialogueIdx];
					const wordCount = this.wordCount(dialogue.text);
					const paragraphWordCount = this.wordCount(paragraph.join(' '));

					let counted = true;
					// console.warn(dialogue.text);

					if (benched.filter((id) => id === dialogueIdx).length) {
						// console.info(`retry ${benchCheck}; ${dialogueIdx} bith is already in this shit, yEET. added diaboi is at ${benched.length} and dialogues are at ${eligibleDialogues.length}`,dialogue.text);

						// benchCheck++;

						if (eligibleDialogues.length <= benched.length) {
							// console.info(`maxed out. everybody get the fuck out of the bench and participate`);
							benched.splice(0, benched.length - 1);
						}

						continue;
					}

					if (paragraphWordCount + wordCount > ideal * 8) {
						// console.info(`${paragraphWordCount} + ${wordCount} = ${paragraphWordCount + wordCount} is too now much k bye`);
						if (reshuffle < 3) {
							// find something shorter then, shit.
							reshuffle++;
							continue;
						} else {
							// fuck it, bye.
							j = length;
						}
					}

					if (wordCount < ideal * 3) {
						shortCount += wordCount;
						// console.info(`bitch too short. doesn't count. shorty quota at ${shortCount}`);

						if (shortCount <= ideal * 3) {
							// console.info(`add more fuck.`);
							counted = false;
						} else if (
							shortCount > ideal * 3 &&
							paragraphWordCount + wordCount > ideal * 8
						) {
							// console.info(shortCount,`ok the short ones' sins have been paid`);
							shortCount = 0;
						}
					}

					// console.log(`ok jury duty complete. u dont have to come back for a while ${benched.length}`);
					benched.push(dialogueIdx);
					paragraph.push(dialogue.text);

					if (counted) {
						j++;
					} else {
						continue;
					}

					// console.log(`${j} out of ${length} count bitch. dingding motherfucker`,paragraphWordCount,wordCount);
				}
				// console.warn(paragraph);

				shortCount = 0;
				paragraphs.push(paragraph.join(' '));
				i++;
			}

			// console.info(`BITCH IM DONE SHITTING ${paragraphs.length} TURDS.`);
			// console.info(paragraphs);
			this.paragraphs = paragraphs.filter((p) => p).join('\r\n\r\n');

			// const self = this;
			// this.paragraphs = this.eligibleDialogues
			// 	.filter(d => {
			// 		// cover my ass
			// 		return d.text && d.severity == self.severity

			// 		// //Checking my own ass
			// 		// return (
			// 		// 	d.text.slice(-1) !== '.' &&
			// 		// 	d.text.slice(-1) !== '!' &&
			// 		// 	d.text.slice(-1) !== '—' &&
			// 		// 	d.text.slice(-1) !== '…' &&
			// 		// 	d.text.slice(-1) !== '?'
			// 		// );
			// 	})
			// 	.map(d => d.text)
			// 	.join('\r\n\r\n');

			this.isNotDoneYet = false;

			console.log( this.$refs.result )

			this.$refs.result.scrollIntoView({
				// block: 'start',
				behavior: 'smooth'
			});
		},
	},
	async created() {
		try {
			const res = await axios.get(`dialogues.json`);
			this.dialogues = res.data;
		} catch (err) {
			throw new Error(err);
		}
	},
};
</script>
