import React from "react";
import {Form, Radio} from "semantic-ui-react";

export function RadioButton({label,value,selectedinGroup, handleChange}) {
	return (
			<Form.Field>
				<Radio
					label={label}
					name={value}
					checked={selectedinGroup === label}
					onChange={handleChange}
				/>
			</Form.Field>
	)
}