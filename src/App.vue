<template>
	<div class="template-blocks">
		<form-control
			:severityLevels="severityLevels"
			:minNum="minNum"
			:maxNum="maxNum"
			@shits-submitted="updateShits"
		></form-control>
		<output-text
			:severityLevels="severityLevels"
			:num="num"
			:severity="severity"
			:isolateSeverity="isolateSeverity"
			:forceUpdate="forceUpdate"
		></output-text>
		<app-info
			:heading="heading"
			:description="description"
			:disclaimer="disclaimer"
			:githubUrl="githubUrl"
		></app-info>
	</div>
</template>

<script>
export default {
	data() {
		return {
			num: 0,
			severity: 0,
			isolateSeverity: false,
			forceUpdate: 0,
			maxNum: 5000,
			minNum: 1,
			severityLevels: [
				'just fill the hole, hole filler.',
				// 0, wildcard ones im heavily biased for, fuck your problematic preference
				'PG: Almost like the original anime script.',
				// 1, obscure pop culture references my philippine raised ass mosty doesnt get but also borderline family fun shits
				'NSFW: Inappropriate shits, bitch!',
				// 2, sex n drugs n alcolol bizatchos... and my favorite english words fuck, ass, and others i cant remember
				"????: Fucked up shit that'll get me canceled!",
				// 3, uh offensive, also things that you will either hear or not hear at church, no in between
			],
			heading: '“What the <br /> fizzityuck<br /> is that?',
			description: `
				<p>Let's fizzityucking find out!”</p>
				<p>Ghost Stories, also known as Ghosts at School, is a television series in 1994 and an anime based on a Japanese series of children's novels written by Tōru Tsunemitsu. The series is produced by Studio Pierrot in 2000. It received notoriety in the succeeding years with its official American English dub, which mostly replaced the original script for the series with pop culture references and dark humor.</p>

				<p>Source: <a href="https://en.wikipedia.org/wiki/Ghost_Stories_(Japanese_TV_series)" target="_blank" rel="noopener">Wikipedia bitch!</a></p>

				<p>So now here's a Lorem Ipsum generator, except with the quotes from... that. I'm so sorry I did this.</p>
				`,
			disclaimer:
				'Disclaimer: The contents generated will contain politically incorrect material, including discrimination and stereotypes against various religions, sexual orientations, gender identities, ethnicity, nationality, celebrities, level of income, and disabilities, as well as suggestive themes, slurs, animal cruelty, loss of parent/s, fat-shaming, extreme right-wing views, death threats, substance abuse, verbal abuse, violence, classism, war, alcoholism, drugs, both R words, both F words, the N word, pedophilia, suicide, and blood. Additionally, the jokes included are outdated references from American pop culture in the 2000s or offensive sentiments targeting almost every groups and communities. Please note that this content will not age well and it will be offensive to many. It is generated from direct quotes from the American Dub of Ghost Stories and is not written nor endorsed by the creator of this app, who created it during a caffeine overdose fueled weekend.',
			githubUrl: 'https://github.com/samzabala/ghost-stories-dub-ipsum',
		};
	},
	methods: {
		updateShits(shits) {
			this.num = shits.num;
			this.severity = shits.severity;
			this.isolateSeverity = shits.isolateSeverity;
			this.forceUpdate = shits.forceUpdate;

			this.$root.$emit('render-shits');
		},
	},
};
</script>

<style lang="scss">
@import './scss/style';
</style>
