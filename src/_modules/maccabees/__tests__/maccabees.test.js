'use strict';

import Maccabees from '../maccabees';

describe('Maccabees View', function() {

  beforeEach(() => {
    this.maccabees = new Maccabees();
  });

  it('Should run a few assertions', () => {
    expect(this.maccabees);
  });

});
