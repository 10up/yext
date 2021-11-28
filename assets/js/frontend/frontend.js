/**
 * External dependencies
 */
import camelcaseKeys from 'camelcase-keys';

const init = () => {
	/**
	 * Bail if our plugin namespace is missing.
	 */
	if (!window.YEXT) {
		throw new Error('Yext: Missing plugin configuration options.');
	}

	/**
	 * Bail if the Answers UI SDK is not loaded.
	 */
	if (!window.ANSWERS) {
		throw new Error('Yext: Answers UI SDK is not loaded.');
	}

	/**
	 * Bail if the Answers UI SDK template bundle is not loaded.
	 */
	if (!window.TemplateBundle) {
		throw new Error('Yext: Answers UI SDK template bundle not loaded.');
	}

	/**
	 * Yext plugin settings object.
	 *
	 * @typedef {Object} YextPluginSettings
	 *
	 * @property {import('./types').YextPluginConfig} config  Config.
	 * @property {import('./types').YextComponents} components Components.
	 */

	/**
	 * @type {YextPluginSettings}
	 */
	const { config, components } = window.YEXT.settings || {};

	/**
	 * Bail if the plugin API is misconfigured.
	 */
	if (!config || !components) {
		throw new Error('Yext: Valid Answers configuration settings not found');
	}

	import(
		/* webpackChunkName: "answers" */
		'./components/answers'
	).then(({ default: Answers }) => {
		/**
		 * Initialize Answers UI SDK using the configuration
		 * provided via plugin settings.
		 */
		const AnswersSDK = Answers({
			config: {
				...camelcaseKeys(config),
				templateBundle: window.TemplateBundle,
			},
			components: camelcaseKeys(components, { deep: true }),
		});

		if (AnswersSDK.error) {
			throw new Error(`Yext: ${AnswersSDK.error}`);
		}

		AnswersSDK.init();
	});
};

/**
 * Initialize Yext
 */
/* eslint-disable-next-line @wordpress/no-global-event-listener */
window.addEventListener('DOMContentLoaded', init);
