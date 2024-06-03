/**
 * Yext plugin settings object.
 *
 * @typedef {object} YextPluginSettings
 *
 * @property {import('./types').YextPluginConfig} config  Config.
 * @property {import('./types').YextComponents} components Components.
 */

interface Window {
	YEXT: {
		defaults: YextPluginSettings;
		settings: YextPluginSettings;
		settings_url: string;
		rest_url: string;
		site_url: string;
		icons: Object;
		iconOptions: Object;
	};
	ANSWERS: {
		init: Function;
		addComponent: Function;
	};
	TemplateBundle: Object;
}
