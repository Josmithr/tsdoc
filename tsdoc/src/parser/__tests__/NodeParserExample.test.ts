// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { TSDocConfiguration } from '../../configuration/TSDocConfiguration';
import type { ParserContext } from '../ParserContext';
import { TSDocParser } from '../TSDocParser';

function parse(buffer: string, config?: TSDocConfiguration): ParserContext {
  const configuration: TSDocConfiguration = config ?? new TSDocConfiguration();

  // For the parser tests, we use lots of custom tags without bothering to define them
  configuration.validation.ignoreUndefinedTags = true;

  const tsdocParser: TSDocParser = new TSDocParser(configuration);
  return tsdocParser.parseString(buffer);
}

test('00 Example without title', () => {
  const result = parse(['/**', ' * @example', ' * Foo', ' */'].join('\n'));
  console.log(result.docComment.emitAsTsdoc().toString());
  // TODO
});
