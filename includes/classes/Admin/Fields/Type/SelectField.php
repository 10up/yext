<?php
/**
 * Base functions for creating a field for the admin settings page
 *
 * @package Yext\Admin\Fields
 */

namespace Yext\Admin\Fields\Type;

use Yext\Admin\Fields\Type\AbstractField;

/**
 * Field type select
 */
class SelectField extends AbstractField {

	/**
	 * Array of value => text options for the select
	 *
	 * @var array
	 */
	protected $options = [];


	/**
	 * Field constructor
	 *
	 * @param string $id    Setting id
	 * @param string $title Setting title
	 * @param array  $args  Field args
	 */
	public function __construct( $id, $title, $args ) {
		$this->type = 'select';
		if ( isset( $args['options'] ) ) {
			$this->options = $args['options'];
		}
		parent::__construct( $id, $title, $args );
	}


	/**
	 * Render the field used on settings.
	 *
	 * @return void
	 */
	public function render() {
		printf(
			'<select name="%s" id="%s">%s</select>',
			esc_attr( $this->setting_name( $this->id ) ),
			esc_attr( $this->id ),
			wp_kses( $this->options_html(), $this->allowed_html_tags() )
		);
	}

	/**
	 * Return HTML for the options
	 *
	 * @return string
	 */
	protected function options_html() {
		$html = '';
		foreach ( $this->options as $value => $text ) {
			$html .= sprintf(
				'<option value="%s" %s>%s</option>',
				esc_attr( $value ),
				selected( $this->value, $value, false ),
				esc_attr( $text )
			);
		}
		return $html;
	}

}
