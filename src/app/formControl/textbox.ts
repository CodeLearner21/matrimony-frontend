import { RegisterInput } from '../_models/register-input.model';

export class Textbox extends RegisterInput<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
       this.type = options['type'] || '';
    }
}
