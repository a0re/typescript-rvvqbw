import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  num: number;
  colour: Colours;
  bodyPart: BodyParts;

  constructor(num: number, colour: Colours, bodyPart: BodyParts) {
    this.num = 0;
    this.colour = colour;
    this.bodyPart = bodyPart;
  }
}
